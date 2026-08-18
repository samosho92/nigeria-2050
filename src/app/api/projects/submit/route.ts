import { getAllSectorSlugs } from "@/content/sectors";
import { checkSubmissionGuardrails } from "@/lib/ask-guardrails";
import { addCommunityProject } from "@/lib/projects-store";
import { isValidProjectId, stripProjectText } from "@/lib/projects";
import {
  getClientIp,
  isSafeWebhookUrl,
  isTrustedBrowserRequest,
  jsonError,
  rateLimit,
  readJsonBody,
} from "@/lib/security";
import type { CoolProject } from "@/types/content";

export const runtime = "nodejs";

interface SubmitBody {
  title?: unknown;
  summary?: unknown;
  detail?: unknown;
  inspiredBy?: unknown;
  sectorSlugs?: unknown;
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return base || "idea";
}

export async function POST(request: Request) {
  if (!isTrustedBrowserRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!rateLimit(`projects-submit:${ip}`, 5, 10 * 60_000)) {
    return jsonError("Too many submissions. Please wait before adding another idea.", 429);
  }

  const parsed = await readJsonBody<SubmitBody>(request, 8_192);
  if (!parsed.ok) return jsonError(parsed.message, parsed.status);

  const title = typeof parsed.data.title === "string" ? stripProjectText(parsed.data.title, 80) : "";
  const summary =
    typeof parsed.data.summary === "string" ? stripProjectText(parsed.data.summary, 280) : "";
  const detail = typeof parsed.data.detail === "string" ? stripProjectText(parsed.data.detail, 1200) : "";
  const inspiredBy =
    typeof parsed.data.inspiredBy === "string" ? stripProjectText(parsed.data.inspiredBy, 120) : "";
  const allowedSlugs = new Set(getAllSectorSlugs());
  const sectorSlugs = Array.isArray(parsed.data.sectorSlugs)
    ? [
        ...new Set(
          parsed.data.sectorSlugs.filter(
            (slug): slug is string => typeof slug === "string" && allowedSlugs.has(slug),
          ),
        ),
      ]
    : [];

  if (title.length < 8 || summary.length < 24) {
    return jsonError("Title or summary is too short", 400);
  }

  if (sectorSlugs.length < 1 || sectorSlugs.length > 3) {
    return jsonError("Pick 1–3 sectors", 400);
  }

  const guardrail = checkSubmissionGuardrails(`${title} ${summary} ${detail} ${inspiredBy}`);
  if (!guardrail.allowed) {
    return jsonError("That submission doesn’t meet our community guidelines. Please rephrase.", 400);
  }

  const id = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;
  if (!isValidProjectId(id)) {
    return jsonError("Could not create an id", 400);
  }

  const project: CoolProject = {
    id,
    title,
    summary,
    detail: detail || summary,
    inspiredBy: inspiredBy || "Reader proposal",
    sectorSlugs,
    source: "community",
    submittedAt: new Date().toISOString(),
  };

  const saved = await addCommunityProject(project);

  const webhook = process.env.PROJECTS_WEBHOOK_URL;
  if (webhook && isSafeWebhookUrl(webhook)) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saved),
      });
    } catch {
      // Board already has the idea; webhook is best-effort.
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[project submission]", saved.id);
  }

  return Response.json({ ok: true, project: saved });
}
