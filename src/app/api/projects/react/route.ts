import {
  isKnownProjectId,
  setClientReaction,
} from "@/lib/projects-store";
import {
  isProjectReactionId,
  isValidClientId,
  isValidProjectId,
  type ProjectReactionId,
} from "@/lib/projects";
import {
  getClientIp,
  isBrowserMutationRequest,
  jsonError,
  rateLimitDurable,
  readJsonBody,
} from "@/lib/security";

export const runtime = "nodejs";

interface ReactBody {
  clientId?: unknown;
  projectId?: unknown;
  reaction?: unknown;
}

export async function POST(request: Request) {
  if (!isBrowserMutationRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`projects-react:${ip}`, 80, 60_000))) {
    return jsonError("Too many reactions", 429);
  }

  const parsed = await readJsonBody<ReactBody>(request, 2_048);
  if (!parsed.ok) return jsonError(parsed.message, parsed.status);

  const clientId = typeof parsed.data.clientId === "string" ? parsed.data.clientId.trim() : "";
  const projectId =
    typeof parsed.data.projectId === "string" ? parsed.data.projectId.trim() : "";
  const raw = parsed.data.reaction;

  let reaction: ProjectReactionId | null;
  if (typeof raw === "string" && isProjectReactionId(raw)) {
    reaction = raw;
  } else if (raw === null) {
    reaction = null;
  } else {
    return jsonError("Invalid reaction", 400);
  }

  if (!isValidClientId(clientId) || !isValidProjectId(projectId)) {
    return jsonError("Invalid id", 400);
  }

  if (!(await isKnownProjectId(projectId))) {
    return jsonError("Unknown project", 404);
  }

  try {
    const tally = await setClientReaction(clientId, projectId, reaction);
    return Response.json({ ok: true, reaction, tally });
  } catch {
    return jsonError("Could not save reaction", 400);
  }
}
