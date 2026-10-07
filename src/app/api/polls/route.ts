import { PULSE_META, PULSE_POLLS } from "@/content/polls";
import { isNigeriaPulseRequest } from "@/lib/polls-geo";
import { isPulseProfile } from "@/lib/polls";
import { getClientPulseState, recordPulseAnswer } from "@/lib/polls-store";
import { isValidClientId } from "@/lib/projects";
import {
  getClientIp,
  isBrowserMutationRequest,
  isSafeWebhookUrl,
  isTrustedBrowserRequest,
  jsonError,
  rateLimitDurable,
  readJsonBody,
} from "@/lib/security";

export const runtime = "nodejs";

interface AnswerBody {
  clientId?: unknown;
  pollId?: unknown;
  optionId?: unknown;
  age?: unknown;
  gender?: unknown;
  zone?: unknown;
}

function emptyPulsePayload(eligible: boolean) {
  return {
    ok: true as const,
    eligible,
    pollCount: PULSE_POLLS.length,
    voted: {},
    tallies: {},
  };
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`polls-get:${ip}`, 60, 60_000))) {
    return jsonError("Too many requests", 429);
  }

  const eligible = isNigeriaPulseRequest(request);
  const clientId = new URL(request.url).searchParams.get("clientId")?.trim() ?? "";

  // Vote state and tallies stay behind same-origin browser checks.
  if (!isTrustedBrowserRequest(request) || !isValidClientId(clientId)) {
    return Response.json(emptyPulsePayload(eligible));
  }

  if (!(await rateLimitDurable(`polls-get-client:${clientId}`, 30, 60_000))) {
    return jsonError("Too many requests", 429);
  }

  const state = eligible
    ? await getClientPulseState(clientId)
    : { voted: {}, tallies: {} };
  return Response.json({ ok: true, eligible, pollCount: PULSE_POLLS.length, ...state });
}

export async function POST(request: Request) {
  if (!isBrowserMutationRequest(request)) {
    return jsonError("Forbidden", 403);
  }

  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`polls-burst:${ip}`, 4, 10_000))) {
    return jsonError("Too many answers", 429);
  }
  if (!(await rateLimitDurable(`polls-answer:${ip}`, 20, 60_000))) {
    return jsonError("Too many answers", 429);
  }

  if (!isNigeriaPulseRequest(request)) {
    return jsonError(PULSE_META.outsideApiMessage, 403);
  }

  const parsed = await readJsonBody<AnswerBody>(request, 2_048);
  if (!parsed.ok) return jsonError(parsed.message, parsed.status);

  const clientId = typeof parsed.data.clientId === "string" ? parsed.data.clientId.trim() : "";
  const pollId = typeof parsed.data.pollId === "string" ? parsed.data.pollId.trim() : "";
  const optionId = typeof parsed.data.optionId === "string" ? parsed.data.optionId.trim() : "";
  const profile = {
    age: typeof parsed.data.age === "string" ? parsed.data.age : "",
    gender: typeof parsed.data.gender === "string" ? parsed.data.gender : "",
    zone: typeof parsed.data.zone === "string" ? parsed.data.zone : "",
  };

  if (!isValidClientId(clientId) || !isPulseProfile(profile)) {
    return jsonError("Invalid profile", 400);
  }

  if (!(await rateLimitDurable(`polls-answer-client:${clientId}`, 24, 60 * 60_000))) {
    return jsonError("Too many answers", 429);
  }

  try {
    const result = await recordPulseAnswer(clientId, pollId, optionId, profile);
    const webhook = process.env.POLLS_WEBHOOK_URL;
    if (result.first && webhook && isSafeWebhookUrl(webhook)) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recordedAt: result.row.recordedAt,
            pollId: result.row.pollId,
            category: result.row.category,
            question: result.row.question,
            optionId: result.row.optionId,
            optionLabel: result.row.optionLabel,
            age: result.row.age,
            gender: result.row.gender,
            zone: result.row.zone,
            n: result.tally.n,
            respondentHash: result.row.respondentHash || undefined,
          }),
        });
      } catch {
        // Tally already saved; webhook is best-effort.
      }
    }
    return Response.json({
      ok: true,
      optionId: result.optionId,
      tally: result.tally,
      first: result.first,
    });
  } catch {
    return jsonError("Could not save answer", 400);
  }
}
