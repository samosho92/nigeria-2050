"use client";

import type { GuardrailReason } from "@/lib/ask-guardrails";

type AnalyticsEvent =
  | { name: "cross_pillar_nav"; from: string; to: string; targetType: "sector" | "timeline" }
  | { name: "morph_slider_use"; metric: string }
  | { name: "milestone_select"; year: number }
  | { name: "g7_sector_filter"; sector: string }
  | { name: "ask_archive_query"; grounded: boolean }
  | { name: "ask_archive_blocked"; reason: GuardrailReason }
  | { name: "quiz_complete"; quizId: string; score: number; total: number }
  | { name: "your_2050_complete"; sectors: string }
  | { name: "correction_submit"; pageUrl: string }
  | { name: "map_region_select"; region: string }
  | { name: "project_vote"; projectId: string; vote: "up" | "down" | "none" }
  | { name: "project_submit"; sectors: string }
  | { name: "pulse_spin"; pollId: string }
  | { name: "pulse_answer"; pollId: string }
  | { name: "page_view"; path: string };

const STORAGE_KEY = "naija2050-analytics";

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

function mirrorProductionAnalytics(event: AnalyticsEvent) {
  if (typeof window === "undefined" || !window.plausible) return;

  switch (event.name) {
    case "cross_pillar_nav":
      window.plausible("Cross Pillar Nav", {
        props: { from: event.from, to: event.to, targetType: event.targetType },
      });
      break;
    case "morph_slider_use":
      window.plausible("Morph Slider", { props: { metric: event.metric } });
      break;
    case "milestone_select":
      window.plausible("Milestone Select", { props: { year: event.year } });
      break;
    case "g7_sector_filter":
      window.plausible("G7 Sector Filter", { props: { sector: event.sector } });
      break;
    case "ask_archive_query":
      window.plausible("Ask Archive", { props: { grounded: event.grounded } });
      break;
    case "ask_archive_blocked":
      window.plausible("Ask Archive Blocked", { props: { reason: event.reason } });
      break;
    case "quiz_complete":
      window.plausible("Quiz Complete", {
        props: { quizId: event.quizId, score: event.score, total: event.total },
      });
      break;
    case "your_2050_complete":
      window.plausible("Your 2050 Complete", { props: { sectors: event.sectors } });
      break;
    case "correction_submit":
      window.plausible("Correction Submit", { props: { pageUrl: event.pageUrl } });
      break;
    case "map_region_select":
      window.plausible("Map Region Select", { props: { region: event.region } });
      break;
    case "project_vote":
      window.plausible("Project Vote", { props: { projectId: event.projectId, vote: event.vote } });
      break;
    case "project_submit":
      window.plausible("Project Submit", { props: { sectors: event.sectors } });
      break;
    case "pulse_spin":
      window.plausible("Pulse Spin", { props: { pollId: event.pollId } });
      break;
    case "pulse_answer":
      window.plausible("Pulse Answer", { props: { pollId: event.pollId } });
      break;
    case "page_view":
      window.plausible("pageview");
      break;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  const payload = { ...event, ts: Date.now() };

  window.dispatchEvent(new CustomEvent("naija2050:analytics", { detail: payload }));
  mirrorProductionAnalytics(event);

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
