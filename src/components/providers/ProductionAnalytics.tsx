"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getAnalyticsConsent, onAnalyticsConsentChange } from "@/lib/consent";
import {
  configureGa,
  GA_MEASUREMENT_ID,
  gaPageView,
  grantGaConsent,
  initGtagConsentDefaults,
  isGaConfigured,
} from "@/lib/gtag";

/** Optional Plausible + GA4. Both load only after analytics consent is accepted. */
export function ProductionAnalytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const [enabled, setEnabled] = useState(false);
  const [gaReady, setGaReady] = useState(false);
  const pathname = usePathname();
  const sentInitialGaPageView = useRef(false);

  useEffect(() => {
    const refresh = () => setEnabled(getAnalyticsConsent() === "accepted");
    refresh();
    return onAnalyticsConsentChange(refresh);
  }, []);

  useEffect(() => {
    if (enabled && isGaConfigured()) {
      initGtagConsentDefaults();
    }
  }, [enabled]);

  useEffect(() => {
    if (!gaReady || !enabled || sentInitialGaPageView.current) return;
    gaPageView(pathname);
    sentInitialGaPageView.current = true;
  }, [gaReady, enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="afterInteractive"
        />
      ) : null}
      {isGaConfigured() ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
            onLoad={() => {
              grantGaConsent();
              configureGa();
              setGaReady(true);
            }}
          />
        </>
      ) : null}
    </>
  );
}
