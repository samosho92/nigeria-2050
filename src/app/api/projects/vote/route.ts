import { isKnownProjectId, setClientVote } from "@/lib/projects-store";
import { isValidClientId, isValidProjectId, type ProjectVote } from "@/lib/projects";
import {
  getClientIp,
  isBrowserMutationRequest,
  jsonError,
  rateLimitDurable,
  readJsonBody,
} from "@/lib/security";

export const runtime = "nodejs";

interface VoteBody {
  clientId?: unknown;
  projectId?: unknown;
  vote?: unknown;
}

export async function POST(request: Request) {
  if (!isBrowserMutationRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`projects-vote:${ip}`, 60, 60_000))) {
    return jsonError("Too many votes", 429);
  }

  const parsed = await readJsonBody<VoteBody>(request, 2_048);
  if (!parsed.ok) return jsonError(parsed.message, parsed.status);

  const clientId = typeof parsed.data.clientId === "string" ? parsed.data.clientId.trim() : "";
  const projectId = typeof parsed.data.projectId === "string" ? parsed.data.projectId.trim() : "";
  const rawVote = parsed.data.vote;
  let vote: ProjectVote | null;
  if (rawVote === "up" || rawVote === "down") {
    vote = rawVote;
  } else if (rawVote === null) {
    vote = null;
  } else {
    return jsonError("Invalid vote", 400);
  }

  if (!isValidClientId(clientId) || !isValidProjectId(projectId)) {
    return jsonError("Invalid id", 400);
  }

  if (!(await isKnownProjectId(projectId))) {
    return jsonError("Unknown project", 404);
  }

  try {
    const tally = await setClientVote(clientId, projectId, vote);
    return Response.json({ ok: true, tally });
  } catch {
    return jsonError("Could not save vote", 400);
  }
}
