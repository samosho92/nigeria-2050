export type GuardrailReason = "abusive" | "nsfw" | "spam";

export interface GuardrailBlock {
  allowed: false;
  reason: GuardrailReason;
  message: string;
}

export interface GuardrailPass {
  allowed: true;
}

export type GuardrailResult = GuardrailBlock | GuardrailPass;

/** User-facing copy — firm, respectful, no echo of flagged input. */
export const GUARDRAIL_MESSAGES: Record<GuardrailReason, string> = {
  abusive:
    "I can't respond to abusive or harassing language. Naija2050 is a respectful civic resource about Nigerian history and credible 2050 scenarios. If you have a genuine question, please rephrase it or choose a suggested prompt below.",
  nsfw:
    "I can't discuss explicit or adult content. This guide is scoped to Nigerian history and sourced 2050 sector projections. Try a suggested question below, or leave this page to explore the timeline and sectors.",
  spam:
    "Please ask one clear question at a time about Nigerian history or 2050 projections. Very long or repetitive messages can't be processed.",
};

/**
 * Blocklist uses whole-word matching on normalized input.
 * Kept in a dedicated module so editorial can extend without touching UI code.
 */
const ABUSIVE_TERMS = [
  "bastard",
  "bitch",
  "bullshit",
  "cunt",
  "dickhead",
  "fuck",
  "fucking",
  "motherfucker",
  "nigga",
  "nigger",
  "retard",
  "retarded",
  "shit",
  "shithead",
  "twat",
  "wanker",
  "whore",
];

const NSFW_TERMS = [
  "blowjob",
  "boob",
  "boobs",
  "cock",
  "cum",
  "cumming",
  "dick",
  "dildo",
  "horny",
  "nudes",
  "onlyfans",
  "orgasm",
  "penis",
  "porn",
  "porno",
  "pussy",
  "sext",
  "tits",
  "vagina",
  "xxx",
];

const ABUSIVE_PHRASES = [
  "kill yourself",
  "kys",
  "go die",
  "fuck you",
  "fuck off",
  "shut up",
];

const NSFW_PHRASES = ["send nudes", "hook up"];

function normalizeForModeration(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[@4]/g, "a")
    .replace(/3/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/0/g, "o")
    .replace(/[$5]/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/(.)\1{2,}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function containsTerm(normalized: string, term: string): boolean {
  if (term.includes(" ")) {
    return normalized.includes(term);
  }
  return new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(
    normalized,
  );
}

function matchesAny(normalized: string, terms: string[]): boolean {
  return terms.some((term) => containsTerm(normalized, term));
}

function isSpam(raw: string, normalized: string): boolean {
  if (raw.length > 1200) return true;
  if (/(.)\1{8,}/.test(normalized.replace(/\s/g, ""))) return true;
  if ((raw.match(/https?:\/\//gi) ?? []).length > 2) return true;
  return false;
}

export function checkAskGuardrails(input: string): GuardrailResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { allowed: true };
  }

  const normalized = normalizeForModeration(trimmed);

  if (isSpam(trimmed, normalized)) {
    return {
      allowed: false,
      reason: "spam",
      message: GUARDRAIL_MESSAGES.spam,
    };
  }

  if (matchesAny(normalized, ABUSIVE_TERMS) || matchesAny(normalized, ABUSIVE_PHRASES)) {
    return {
      allowed: false,
      reason: "abusive",
      message: GUARDRAIL_MESSAGES.abusive,
    };
  }

  if (matchesAny(normalized, NSFW_TERMS) || matchesAny(normalized, NSFW_PHRASES)) {
    return {
      allowed: false,
      reason: "nsfw",
      message: GUARDRAIL_MESSAGES.nsfw,
    };
  }

  return { allowed: true };
}
