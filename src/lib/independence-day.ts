import { INDEPENDENCE_DAY_SEASON } from "@/content/independence-day";

const LAGOS_TZ = "Africa/Lagos";

/** Calendar day `YYYY-MM-DD` in Africa/Lagos for the given instant. */
export function lagosCalendarDate(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: LAGOS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * True while the homepage Independence Month module should render.
 * Active 1–31 October 2026 inclusive (Africa/Lagos).
 */
export function isIndependenceDaySeasonActive(now: Date = new Date()): boolean {
  const day = lagosCalendarDate(now);
  return day >= INDEPENDENCE_DAY_SEASON.startDate && day <= INDEPENDENCE_DAY_SEASON.endDate;
}
