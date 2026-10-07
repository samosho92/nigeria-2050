import { answerArchiveQuestion } from "@/lib/ask-archive";
import {
  getClientIp,
  isBrowserMutationRequest,
  jsonError,
  rateLimitDurable,
  readJsonBody,
} from "@/lib/security";

export const runtime = "nodejs";

interface AskBody {
  question?: unknown;
}

export async function POST(request: Request) {
  if (!isBrowserMutationRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`ask:${ip}`, 20, 60_000))) {
    return jsonError("Too many questions. Please wait a moment.", 429);
  }

  const body = await readJsonBody<AskBody>(request, 4_096);
  if (!body.ok) return jsonError(body.message, body.status);

  const question = typeof body.data.question === "string" ? body.data.question : "";
  const result = answerArchiveQuestion(question);

  return Response.json({ ok: true, ...result });
}
