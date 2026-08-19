"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  onAnalyticsConsentChange,
} from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";

export function CookieConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = getAnalyticsConsent();
    setOpen(current === null);

    const onOpen = () => setOpen(true);
    window.addEventListener("naija2050:consent-open", onOpen);
    const stop = onAnalyticsConsentChange(() => {
      const next = getAnalyticsConsent();
      setOpen(next === null);
    });

    return () => {
      window.removeEventListener("naija2050:consent-open", onOpen);
      stop();
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] px-4 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 shadow-lg sm:p-5">
        <p className="text-sm font-semibold text-foreground">Help us improve Naija2050</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We use privacy-friendly analytics to learn which pages are useful. This helps us improve
          the timeline, sectors, and civic tools. No ads, no personal profile, and you can change
          this anytime.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setAnalyticsConsent("accepted");
              trackEvent({ name: "consent_choice", choice: "accepted" });
              setOpen(false);
            }}
          >
            Allow analytics
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              setAnalyticsConsent("declined");
              setOpen(false);
            }}
          >
            Continue without analytics
          </Button>
          <Link href="/privacy" className="ml-1 text-xs font-medium text-accent hover:underline">
            Privacy details
          </Link>
        </div>
      </div>
    </div>
  );
}
