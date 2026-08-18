"use client";

type AnalyticsEvent =
  | { name: "cross_pillar_nav"; from: string; to: string; targetType: "sector" | "timeline" }
  | { name: "morph_slider_use"; metric: string }
  | { name: "milestone_select"; year: number }
  | { name: "ask_archive_query"; grounded: boolean }
  | { name: "page_view"; path: string };

const STORAGE_KEY = "naija2050-analytics";

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  const payload = { ...event, ts: Date.now() };

  window.dispatchEvent(new CustomEvent("naija2050:analytics", { detail: payload }));

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as AnalyticsEvent[];
    existing.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-200)));
  } catch {
    // ignore quota errors
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[naija2050 analytics]", event);
  }
}

export function trackCrossPillarNav(from: string, to: string, targetType: "sector" | "timeline") {
  trackEvent({ name: "cross_pillar_nav", from, to, targetType });
}

export function getAnalyticsSummary() {
  if (typeof window === "undefined") return { crossPillar: 0, total: 0 };
  try {
    const events = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as AnalyticsEvent[];
    return {
      crossPillar: events.filter((e) => e.name === "cross_pillar_nav").length,
      total: events.length,
    };
  } catch {
    return { crossPillar: 0, total: 0 };
  }
}
