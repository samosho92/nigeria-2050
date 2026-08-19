"use client";

import type { GuardrailReason } from "@/lib/ask-guardrails";
import { hasAnalyticsConsent } from "@/lib/consent";
import { gaEvent, gaPageView } from "@/lib/gtag";
import type { SearchResultType } from "@/lib/search";

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
  | { name: "consent_choice"; choice: "accepted" | "declined" }
  | { name: "consent_preferences_open" }
  | { name: "search_open"; method: "button" | "shortcut" }
  | { name: "search_select"; resultType: SearchResultType; href: string }
  | { name: "data_saver_toggle"; enabled: boolean }
  | { name: "theme_toggle"; theme: "light" | "dark" }
  | { name: "ask_suggested_click"; question: string }
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

function mirrorPlausible(event: AnalyticsEvent) {
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
    case "consent_choice":
      window.plausible("Consent Choice", { props: { choice: event.choice } });
      break;
    case "consent_preferences_open":
      window.plausible("Consent Preferences Open");
      break;
    case "search_open":
      window.plausible("Search Open", { props: { method: event.method } });
      break;
    case "search_select":
      window.plausible("Search Select", {
        props: { resultType: event.resultType, href: event.href },
      });
      break;
    case "data_saver_toggle":
      window.plausible("Data Saver Toggle", { props: { enabled: event.enabled } });
      break;
    case "theme_toggle":
      window.plausible("Theme Toggle", { props: { theme: event.theme } });
      break;
    case "ask_suggested_click":
      window.plausible("Ask Suggested Click", { props: { question: event.question } });
      break;
    case "page_view":
      window.plausible("pageview");
      break;
  }
}

function mirrorGa4(event: AnalyticsEvent) {
  switch (event.name) {
    case "cross_pillar_nav":
      gaEvent("cross_pillar_nav", {
        from: event.from,
        to: event.to,
        target_type: event.targetType,
      });
      break;
    case "morph_slider_use":
      gaEvent("morph_slider_use", { metric: event.metric });
      break;
    case "milestone_select":
      gaEvent("milestone_select", { year: event.year });
      break;
    case "g7_sector_filter":
      gaEvent("g7_sector_filter", { sector: event.sector });
      break;
    case "ask_archive_query":
      gaEvent("ask_archive_query", { grounded: event.grounded });
      break;
    case "ask_archive_blocked":
      gaEvent("ask_archive_blocked", { reason: event.reason });
      break;
    case "quiz_complete":
      gaEvent("quiz_complete", {
        quiz_id: event.quizId,
        score: event.score,
        total: event.total,
      });
      break;
    case "your_2050_complete":
      gaEvent("your_2050_complete", { sectors: event.sectors });
      break;
    case "correction_submit":
      gaEvent("correction_submit", { page_url: event.pageUrl });
      break;
    case "map_region_select":
      gaEvent("map_region_select", { region: event.region });
      break;
    case "project_vote":
      gaEvent("project_vote", { project_id: event.projectId, vote: event.vote });
      break;
    case "project_submit":
      gaEvent("project_submit", { sectors: event.sectors });
      break;
    case "pulse_spin":
      gaEvent("pulse_spin", { poll_id: event.pollId });
      break;
    case "pulse_answer":
      gaEvent("pulse_answer", { poll_id: event.pollId });
      break;
    case "consent_choice":
      gaEvent("consent_choice", { choice: event.choice });
      break;
    case "consent_preferences_open":
      gaEvent("consent_preferences_open");
      break;
    case "search_open":
      gaEvent("search_open", { method: event.method });
      break;
    case "search_select":
      gaEvent("search_select", { result_type: event.resultType, href: event.href });
      break;
    case "data_saver_toggle":
      gaEvent("data_saver_toggle", { enabled: event.enabled });
      break;
    case "theme_toggle":
      gaEvent("theme_toggle", { theme: event.theme });
      break;
    case "ask_suggested_click":
      gaEvent("ask_suggested_click", { question: event.question });
      break;
    case "page_view":
      gaPageView(event.path);
      break;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const payload = { ...event, ts: Date.now() };

  window.dispatchEvent(new CustomEvent("naija2050:analytics", { detail: payload }));
  mirrorPlausible(event);
  mirrorGa4(event);

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
