import { NextResponse } from "next/server";
import { checkSubmissionGuardrails, sanitizePlainText } from "@/lib/ask-guardrails";
import {
  getClientIp,
  isAllowedPageUrl,
  isSafeWebhookUrl,
  isTrustedBrowserRequest,
  jsonError,
  rateLimit,
  readJsonBody,
} from "@/lib/security";

export const runtime = "nodejs";

interface CorrectionBody {
  pageUrl?: unknown;
  claim?: unknown;
  counterSource?: unknown;
  email?: unknown;
}

export async function POST(request: Request) {
  if (!isTrustedBrowserRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!rateLimit(`corrections:${ip}`, 5, 10 * 60_000)) {
    return jsonError("Too many submissions. Please try later or email corrections.", 429);
  }

  const parsed = await readJsonBody<CorrectionBody>(request, 8_192);
  if (!parsed.ok) return jsonError(parsed.message, parsed.status);

  const pageUrl = typeof parsed.data.pageUrl === "string" ? parsed.data.pageUrl.trim() : "";
  const claim = typeof parsed.data.claim === "string" ? sanitizePlainText(parsed.data.claim, 2000) : "";
  const counterSource =
    typeof parsed.data.counterSource === "string"
      ? sanitizePlainText(parsed.data.counterSource, 2000)
      : "";
  const emailRaw = typeof parsed.data.email === "string" ? parsed.data.email.trim() : "";

  if (!pageUrl || !claim || !counterSource) {
    return jsonError("Missing required fields", 400);
  }

  if (!isAllowedPageUrl(pageUrl)) {
    return jsonError("Page URL must be a Naija2050 address", 400);
  }

  if (claim.length < 12 || counterSource.length < 12) {
    return jsonError("Please include a specific claim and a counter-source", 400);
  }

  const guardrail = checkSubmissionGuardrails(`${claim} ${counterSource}`);
  if (!guardrail.allowed) {
    return jsonError("That report doesn’t meet our community guidelines. Please rephrase.", 400);
  }

  if (emailRaw && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    return jsonError("Invalid email", 400);
  }

  const submission = {
    id: crypto.randomUUID(),
    pageUrl,
    claim,
    counterSource,
    email: emailRaw || undefined,
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.CORRECTIONS_WEBHOOK_URL;
  if (webhook) {
    if (!isSafeWebhookUrl(webhook)) {
      return jsonError("Server misconfigured", 500);
    }
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch {
      return jsonError("Could not forward submission", 502);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[correction submission]", { id: submission.id, pageUrl: submission.pageUrl });
  }

  return NextResponse.json({ ok: true });
}
