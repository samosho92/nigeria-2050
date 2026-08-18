"use client";

import Script from "next/script";

/** Optional Plausible Analytics, set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in production. */
export function ProductionAnalytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.tagged-events.js"
      strategy="afterInteractive"
    />
  );
}
