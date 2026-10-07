import { PROJECT_ENGAGEMENT } from "@/content/projects";
import { checkCommentGuardrails } from "@/lib/ask-guardrails";
import { isValidClientId, isValidProjectId } from "@/lib/projects";
import {
  addProjectComment,
  deleteProjectComment,
  getProjectCommentsMap,
  isKnownProjectId,
} from "@/lib/projects-store";
import {
  getClientIp,
  isBrowserMutationRequest,
  jsonError,
  rateLimitDurable,
  readJsonBody,
} from "@/lib/security";

export const runtime = "nodejs";

interface CommentBody {
  clientId?: unknown;
  projectId?: unknown;
  commentId?: unknown;
  body?: unknown;
}

export async function POST(request: Request) {
  if (!isBrowserMutationRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`projects-comment-burst:${ip}`, 4, 60_000))) {
    return jsonError(PROJECT_ENGAGEMENT.commentTooMany, 429);
  }
  if (!(await rateLimitDurable(`projects-comment:${ip}`, 12, 60 * 60_000))) {
    return jsonError(PROJECT_ENGAGEMENT.commentTooMany, 429);
  }

  const parsed = await readJsonBody<CommentBody>(request, 2_048);
  if (!parsed.ok) return jsonError(parsed.message, parsed.status);

  const clientId = typeof parsed.data.clientId === "string" ? parsed.data.clientId.trim() : "";
  const projectId =
    typeof parsed.data.projectId === "string" ? parsed.data.projectId.trim() : "";
  const body = typeof parsed.data.body === "string" ? parsed.data.body : "";

  if (!isValidClientId(clientId) || !isValidProjectId(projectId)) {
    return jsonError("Invalid id", 400);
  }

  if (!(await isKnownProjectId(projectId))) {
    return jsonError("Unknown project", 404);
  }

  const guardrail = checkCommentGuardrails(body);
  if (!guardrail.allowed) {
    return Response.json(
      {
        ok: false,
        refused: true,
        reason: guardrail.reason,
        message: guardrail.message || PROJECT_ENGAGEMENT.commentRefusedFallback,
      },
      { status: 422 },
    );
  }

  if (!(await rateLimitDurable(`projects-comment-client:${clientId}`, 8, 60 * 60_000))) {
    return jsonError(PROJECT_ENGAGEMENT.commentTooMany, 429);
  }

  try {
    const comment = await addProjectComment(clientId, projectId, body);
    const commentsMap = await getProjectCommentsMap(clientId);
    return Response.json({
      ok: true,
      comment,
      comments: commentsMap[projectId] ?? [comment],
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code === "Client comment cap" || code === "Comment cap" || code === "Duplicate comment") {
      return jsonError(PROJECT_ENGAGEMENT.commentTooMany, 429);
    }
    return jsonError(PROJECT_ENGAGEMENT.commentRefusedFallback, 400);
  }
}

export async function DELETE(request: Request) {
  if (!isBrowserMutationRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`projects-comment-delete:${ip}`, 20, 60_000))) {
    return jsonError(PROJECT_ENGAGEMENT.commentTooMany, 429);
  }

  const parsed = await readJsonBody<CommentBody>(request, 1_024);
  if (!parsed.ok) return jsonError(parsed.message, parsed.status);

  const clientId = typeof parsed.data.clientId === "string" ? parsed.data.clientId.trim() : "";
  const projectId =
    typeof parsed.data.projectId === "string" ? parsed.data.projectId.trim() : "";
  const commentId =
    typeof parsed.data.commentId === "string" ? parsed.data.commentId.trim() : "";

  if (!isValidClientId(clientId) || !isValidProjectId(projectId) || !commentId) {
    return jsonError("Invalid id", 400);
  }

  try {
    const comments = await deleteProjectComment(clientId, projectId, commentId);
    return Response.json({ ok: true, comments });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code === "Missing comment") {
      return jsonError(PROJECT_ENGAGEMENT.commentDeleteMissing, 404);
    }
    if (code === "Not owner") {
      return jsonError(PROJECT_ENGAGEMENT.commentDeleteForbidden, 403);
    }
    return jsonError(PROJECT_ENGAGEMENT.commentDeleteFailed, 400);
  }
}
