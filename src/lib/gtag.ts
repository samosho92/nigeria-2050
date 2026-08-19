"use client";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "";

export function isGaConfigured(): boolean {
  return GA_MEASUREMENT_ID.startsWith("G-");
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function callGtag(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(...args);
}

export function initGtagConsentDefaults() {
  if (typeof window === "undefined" || !isGaConfigured()) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  callGtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function grantGaConsent() {
  callGtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function configureGa() {
  if (!isGaConfigured()) return;
  callGtag("js", new Date());
  callGtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

export function gaPageView(path: string) {
  if (!isGaConfigured()) return;
  callGtag("event", "page_view", { page_path: path });
}

export function gaEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (!isGaConfigured()) return;
  callGtag("event", name, params);
}
