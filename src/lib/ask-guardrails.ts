/**
 * Shared text safety for Ask the Archive, Cool Projects, corrections, and Your 2050.
 * Blocklists are phrase-first so civic questions (“who was killed”, “Civil War”) still pass.
 */

export type GuardrailReason =
  | "abusive"
  | "nsfw"
  | "spam"
  | "injection"
  | "self-harm"
  | "scam"
  | "pii"
  | "off-topic";

export interface GuardrailBlock {
  allowed: false;
  reason: GuardrailReason;
  message: string;
}

export interface GuardrailPass {
  allowed: true;
}

export type GuardrailResult = GuardrailBlock | GuardrailPass;

export interface GuardrailOptions {
  maxLength?: number;
  maxUrls?: number;
  checkInjection?: boolean;
  checkSelfHarm?: boolean;
  checkScam?: boolean;
  checkPii?: boolean;
  checkOffTopic?: boolean;
}

/** Ask the Archive refusals: short, actionable, no lecture. */
export const GUARDRAIL_MESSAGES: Record<GuardrailReason, string> = {
  abusive:
    "That wording can’t be answered here. Rephrase without insults or swear words.",
  nsfw: "Adult or explicit topics are outside this guide. Ask about Nigerian history or a 2050 sector.",
  spam: "Ask one short, clear question about Nigerian history or a 2050 projection.",
  injection: "Ask about Nigerian history or a sourced 2050 sector. Role or instruction changes are ignored.",
  "self-harm":
    "If you are in crisis, contact someone you trust or local emergency services. This guide only covers Nigerian history and 2050 scenarios.",
  scam: "Messages about money transfers, giveaways, or personal financial details can’t be accepted.",
  pii: "Leave out email addresses, phone numbers, and other personal contact details.",
  "off-topic":
    "Medical, legal, criminal, and personal investment questions are outside this guide. Ask about Nigerian history or a 2050 projection.",
};

/** Cool Projects comment refusals. */
export const COMMENT_GUARDRAIL_MESSAGES: Record<GuardrailReason, string> = {
  abusive: "Remove the insult or swear word and try again.",
  nsfw: "Keep the comment civic and non-sexual, then try again.",
  spam: "Write one short civic sentence (a bit longer than that).",
  injection: "Stick to the civic idea and try again.",
  "self-harm":
    "If you are in crisis, contact someone you trust or local emergency services.",
  scam: "Comments that solicit money or look like scams can’t be published.",
  pii: "Leave out email addresses, phone numbers, and other personal contact details.",
  "off-topic": "Keep the comment on the civic idea.",
};

const ABUSIVE_TERMS = [
  "asshole",
  "bastard",
  "bitch",
  "bullshit",
  "cunt",
  "dick",
  "dickhead",
  "faggot",
  "fuck",
  "fucker",
  "fucking",
  "motherfucker",
  "nigga",
  "nigger",
  "piss",
  "prick",
  "retard",
  "retarded",
  "shit",
  "shithead",
  "shitty",
  "slut",
  "twat",
  "wanker",
  "whore",
];

const NSFW_TERMS = [
  "anal",
  "blowjob",
  "boob",
  "boobs",
  "cock",
  "cum",
  "cumming",
  "cunnilingus",
  "dildo",
  "ejaculate",
  "ejaculation",
  "handjob",
  "hentai",
  "horny",
  "masturbate",
  "masturbation",
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

const NSFW_PHRASES = ["send nudes", "hook up", "jerk off"];

const INJECTION_PHRASES = [
  "ignore previous instructions",
  "ignore all instructions",
  "ignore your instructions",
  "disregard previous",
  "forget your instructions",
  "you are now",
  "you are dan",
  "do anything now",
  "developer mode",
  "jailbreak",
  "reveal your prompt",
  "reveal the system prompt",
  "show your system prompt",
  "print your instructions",
  "new instructions",
  "override your rules",
  "no restrictions",
  "without any restrictions",
  "act as an uncensored",
  "pretend you have no rules",
  "<|system|>",
  "[inst]",
  "system prompt",
];

const SELF_HARM_PHRASES = [
  "kill myself",
  "killing myself",
  "want to die",
  "end my life",
  "commit suicide",
  "suicidal",
  "self harm",
  "self-harm",
  "cut myself",
  "hang myself",
];

const SCAM_PHRASES = [
  "send bitcoin",
  "send btc",
  "wire transfer",
  "gift card",
  "western union",
  "click this link to claim",
  "double your money",
  "whatsapp me for investment",
  "crypto giveaway",
  "send your bvn",
  "send your nin",
  "account number to credit",
];

const OFF_TOPIC_PHRASES = [
  "how to make a bomb",
  "how to build a bomb",
  "how to make a weapon",
  "how to hack",
  "write malware",
  "steal a credit card",
  "credit card number",
  "social security number",
  "give me a prescription",
  "diagnose my",
  "what medicine should i",
  "should i invest in",
  "which stock should i buy",
  "how to launder",
  "how to evade tax",
];

const EMAIL_RE = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i;
const PHONE_RE = /\b(?:\+?234|0)[1-9]\d{7,10}\b/;

export function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export function sanitizePlainText(value: string, max: number): string {
  return stripControlChars(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function redactPii(value: string): string {
  return value.replace(EMAIL_RE, "").replace(PHONE_RE, "").replace(/\s+/g, " ").trim();
}

export function containsPii(value: string): boolean {
  return EMAIL_RE.test(value) || PHONE_RE.test(value);
}

export function isInternalPath(href: string): boolean {
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\")) return false;
  if (href.includes("://") || href.toLowerCase().startsWith("javascript:")) return false;
  return true;
}

export function normalizeForModeration(text: string): string {
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
  if (term.includes(" ")) return normalized.includes(term);
  return new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(normalized);
}

function matchesAny(normalized: string, terms: string[]): boolean {
  return terms.some((term) => containsTerm(normalized, term));
}

function isSpam(raw: string, normalized: string, maxLength: number, maxUrls: number): boolean {
  if (raw.length > maxLength) return true;
  if (/(.)\1{8,}/.test(normalized.replace(/\s/g, ""))) return true;
  if ((raw.match(/https?:\/\//gi) ?? []).length > maxUrls) return true;
  if (/<script/i.test(raw) || /javascript:/i.test(raw)) return true;
  return false;
}

function block(reason: GuardrailReason): GuardrailBlock {
  return { allowed: false, reason, message: GUARDRAIL_MESSAGES[reason] };
}

export function checkModeration(input: string, options: GuardrailOptions = {}): GuardrailResult {
  const {
    maxLength = 1200,
    maxUrls = 2,
    checkInjection = false,
    checkSelfHarm = false,
    checkScam = false,
    checkPii = false,
    checkOffTopic = false,
  } = options;

  const trimmed = stripControlChars(input).trim();
  if (!trimmed) return { allowed: true };

  const normalized = normalizeForModeration(trimmed);

  if (isSpam(trimmed, normalized, maxLength, maxUrls)) return block("spam");
  if (checkSelfHarm && matchesAny(normalized, SELF_HARM_PHRASES)) return block("self-harm");
  if (checkInjection && matchesAny(normalized, INJECTION_PHRASES)) return block("injection");
  if (matchesAny(normalized, ABUSIVE_TERMS) || matchesAny(normalized, ABUSIVE_PHRASES)) {
    return block("abusive");
  }
  if (matchesAny(normalized, NSFW_TERMS) || matchesAny(normalized, NSFW_PHRASES)) {
    return block("nsfw");
  }
  if (checkScam && matchesAny(normalized, SCAM_PHRASES)) return block("scam");
  if (checkOffTopic && matchesAny(normalized, OFF_TOPIC_PHRASES)) return block("off-topic");
  if (checkPii && containsPii(trimmed)) return block("pii");

  return { allowed: true };
}

/** Ask the Archive, tight length, no URLs, injection and crisis checks. */
export function checkAskGuardrails(input: string): GuardrailResult {
  return checkModeration(input, {
    maxLength: 500,
    maxUrls: 0,
    checkInjection: true,
    checkSelfHarm: true,
    checkOffTopic: true,
  });
}

/** Cool Projects / corrections body text. */
export function checkSubmissionGuardrails(input: string): GuardrailResult {
  return checkModeration(input, {
    maxLength: 2000,
    maxUrls: 2,
    checkInjection: true,
    checkSelfHarm: true,
    checkScam: true,
    checkPii: true,
  });
}

/**
 * Cool Projects card comments: shorter, no URLs, automatic refuse on policy breach.
 * Empty or near-empty strings are treated as spam so the API can return a clear refusal.
 */
export function checkCommentGuardrails(input: string): GuardrailResult {
  const trimmed = stripControlChars(input).trim();
  if (trimmed.length < 12) {
    return {
      allowed: false,
      reason: "spam",
      message: COMMENT_GUARDRAIL_MESSAGES.spam,
    };
  }

  const letters = (trimmed.match(/[A-Za-zÀ-ÿ]/g) ?? []).length;
  if (letters < 8) {
    return {
      allowed: false,
      reason: "spam",
      message: COMMENT_GUARDRAIL_MESSAGES.spam,
    };
  }

  const result = checkModeration(trimmed, {
    maxLength: 400,
    maxUrls: 0,
    checkInjection: true,
    checkSelfHarm: true,
    checkScam: true,
    checkPii: true,
  });

  if (!result.allowed) {
    return {
      allowed: false,
      reason: result.reason,
      message: COMMENT_GUARDRAIL_MESSAGES[result.reason],
    };
  }

  return result;
}

/** Optional first name on Your 2050. */
export function checkDisplayName(input: string): GuardrailResult {
  return checkModeration(input, {
    maxLength: 40,
    maxUrls: 0,
    checkInjection: true,
    checkSelfHarm: true,
    checkPii: true,
  });
}

const DISPLAY_NAME_RE = /^[\p{L}][\p{L}\s'.-]{0,31}$/u;

export function sanitizeDisplayName(name: string | undefined): string | undefined {
  const cleaned = sanitizePlainText(name ?? "", 32);
  if (!cleaned) return undefined;
  if (!checkDisplayName(cleaned).allowed) return undefined;
  if (!DISPLAY_NAME_RE.test(cleaned)) return undefined;
  return cleaned;
}
