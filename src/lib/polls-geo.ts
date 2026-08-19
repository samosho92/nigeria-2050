import { getClientIp } from "@/lib/security";

const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
] as const;

const UNKNOWN_COUNTRY = new Set(["", "XX", "T1", "A1", "A2"]);

function isLoopbackIp(ip: string): boolean {
  const value = ip.toLowerCase();
  if (value === "::1" || value === "127.0.0.1") return true;
  if (value.startsWith("127.")) return true;
  if (value.startsWith("::ffff:127.")) return true;
  return false;
}

function parseCountryCode(raw: string | null): string | null {
  const code = raw?.trim().toUpperCase().slice(0, 2) ?? "";
  if (!code || UNKNOWN_COUNTRY.has(code)) return null;
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

/** ISO 3166-1 alpha-2 from the edge, or null when the host did not send one. */
export function getRequestCountryCode(request: Request): string | null {
  if (process.env.VERCEL) {
    return parseCountryCode(request.headers.get("x-vercel-ip-country"));
  }
  for (const header of COUNTRY_HEADERS) {
    const code = parseCountryCode(request.headers.get(header));
    if (code) return code;
  }
  return null;
}

function isLocalPulseHost(request: Request): boolean {
  if (process.env.VERCEL) return false;
  return process.env.NODE_ENV !== "production" || isLoopbackIp(getClientIp(request));
}

/**
 * Street Pulse ballots are in-country only.
 * Vercel sets `x-vercel-ip-country`; that value is the gate in production.
 * Local/e2e have no edge country: loopback or `next dev` may vote; injected NG/US headers still apply.
 */
export function isNigeriaPulseRequest(request: Request): boolean {
  const country = getRequestCountryCode(request);
  const local = isLocalPulseHost(request);

  if (process.env.VERCEL) return country === "NG";
  if (country === "NG") return local;
  if (country) return false;
  return local;
}
