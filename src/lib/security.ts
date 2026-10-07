import { createHash, timingSafeEqual } from "node:crypto";
import { Redis } from "@upstash/redis";
import { siteUrl } from "@/lib/site";

const buckets = new Map<string, { count: number; resetAt: number }>();

function pruneBuckets(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 64);
}

/** Returns true when the request is allowed to proceed. In-memory; per-instance only. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  pruneBuckets(now);
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

function redisRateLimitAvailable(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

/**
 * Cross-instance rate limit when Upstash is configured; otherwise in-memory.
 * Prefer this on public write and scrape-sensitive read routes.
 */
export async function rateLimitDurable(
  key: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  if (!redisRateLimitAvailable()) {
    return rateLimit(key, limit, windowMs);
  }

  try {
    const redis = Redis.fromEnv();
    const windowId = Math.floor(Date.now() / windowMs);
    const bucketKey = `rl:${key}:${windowId}`;
    const count = await redis.incr(bucketKey);
    if (count === 1) {
      await redis.pexpire(bucketKey, windowMs + 1_000);
    }
    return count <= limit;
  } catch {
    return rateLimit(key, limit, windowMs);
  }
}

function allowedOrigins(): Set<string> {
  const origins = new Set<string>(["http://localhost:3500", "http://127.0.0.1:3500"]);
  try {
    origins.add(new URL(siteUrl).origin);
  } catch {
    origins.add("https://nigeria2050.com");
  }
  const vercel = process.env.VERCEL_URL;
  if (vercel) origins.add(`https://${vercel.replace(/^https?:\/\//, "")}`);
  return origins;
}

function originAllowed(request: Request): boolean {
  const allowed = allowedOrigins();
  const origin = request.headers.get("origin");
  if (origin) return allowed.has(origin);
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return allowed.has(new URL(referer).origin);
  } catch {
    return false;
  }
}

/** Same-site browser navigation or fetch with a matching Origin/Referer. */
export function isTrustedBrowserRequest(request: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const site = (request.headers.get("sec-fetch-site") ?? "").toLowerCase();
  if (site === "cross-site") return false;
  return originAllowed(request);
}

/**
 * Mutating API calls from the site itself.
 * Requires Sec-Fetch-Site so forged Origin alone is not enough in production.
 */
export function isBrowserMutationRequest(request: Request): boolean {
  if (!isTrustedBrowserRequest(request)) return false;
  if (process.env.NODE_ENV !== "production") return true;
  const site = (request.headers.get("sec-fetch-site") ?? "").toLowerCase();
  if (site !== "same-origin" && site !== "same-site") return false;
  const mode = (request.headers.get("sec-fetch-mode") ?? "").toLowerCase();
  return mode === "" || mode === "cors" || mode === "same-origin";
}

function isPrivateHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (host === "0.0.0.0" || host === "::1") return true;
  if (/^10\.\d+\.\d+\.\d+$/.test(host)) return true;
  if (/^127\.\d+\.\d+\.\d+$/.test(host)) return true;
  if (/^192\.168\.\d+\.\d+$/.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/.test(host)) return true;
  return false;
}

export function isSafeWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    if (parsed.username || parsed.password) return false;
    return !isPrivateHostname(parsed.hostname);
  } catch {
    return false;
  }
}

export function isAllowedPageUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    const allowedHosts = new Set(["localhost", "127.0.0.1"]);
    try {
      allowedHosts.add(new URL(siteUrl).hostname);
    } catch {
      allowedHosts.add("nigeria2050.com");
    }
    return allowedHosts.has(parsed.hostname);
  } catch {
    return false;
  }
}

export async function readJsonBody<T>(
  request: Request,
  maxBytes: number,
): Promise<{ ok: true; data: T } | { ok: false; status: number; message: string }> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, status: 415, message: "Unsupported media type" };
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declared) && declared > maxBytes) {
    return { ok: false, status: 413, message: "Payload too large" };
  }

  const text = await request.text();
  if (text.length > maxBytes) {
    return { ok: false, status: 413, message: "Payload too large" };
  }

  try {
    return { ok: true, data: JSON.parse(text) as T };
  } catch {
    return { ok: false, status: 400, message: "Invalid JSON" };
  }
}

export function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

export function secretsMatch(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function hashWithSecret(value: string, secret: string): string {
  if (!secret) return "";
  return createHash("sha256").update(`${secret}:${value}`).digest("hex").slice(0, 16);
}

/** Stable Redis hash field for a Pulse client id (not reversible to the UUID). */
export function ballotStorageField(clientId: string): string {
  const salt =
    process.env.POLLS_EXPORT_SECRET ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    "n2050-ballot-v1";
  const digest = createHash("sha256").update(`${salt}:${clientId}`).digest("hex").slice(0, 32);
  return `b:${digest}`;
}
