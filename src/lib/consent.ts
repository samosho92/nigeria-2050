"use client";

export type AnalyticsConsent = "accepted" | "declined";

export const ANALYTICS_CONSENT_KEY = "naija2050-analytics-consent";
const CONSENT_EVENT = "naija2050:consent-change";

function readConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (raw === "accepted" || raw === "declined") return raw;
  return null;
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  return readConsent();
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === "accepted";
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { analytics: value } }));
}

export function onAnalyticsConsentChange(handler: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const callback = () => handler();
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("naija2050:consent-open"));
}
