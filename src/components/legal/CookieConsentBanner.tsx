"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { COOKIE_CONSENT_COPY } from "@/content/legal";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  onAnalyticsConsentChange,
  type AnalyticsConsent,
} from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function CookieConsentBanner() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"first" | "preferences">("first");
  const [current, setCurrent] = useState<AnalyticsConsent | null>(null);

  useEffect(() => {
    const sync = () => {
      const next = getAnalyticsConsent();
      setCurrent(next);
      if (next === null) {
        setMode("first");
        setOpen(true);
      }
    };

    sync();

    const onOpen = () => {
      const next = getAnalyticsConsent();
      setCurrent(next);
      setMode(next === null ? "first" : "preferences");
      setOpen(true);
    };

    window.addEventListener("nigeria2050:consent-open", onOpen);
    const stop = onAnalyticsConsentChange(sync);

    return () => {
      window.removeEventListener("nigeria2050:consent-open", onOpen);
      stop();
    };
  }, []);

  if (!open) return null;

  const isPreferences = mode === "preferences";
  const copy = COOKIE_CONSENT_COPY;

  const accept = () => {
    setAnalyticsConsent("accepted");
    trackEvent({ name: "consent_choice", choice: "accepted" });
    setOpen(false);
  };

  const decline = () => {
    setAnalyticsConsent("declined");
    trackEvent({ name: "consent_choice", choice: "declined" });
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] px-4 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 shadow-lg sm:p-5">
        <p className="text-sm font-semibold text-foreground">
          {isPreferences ? copy.preferencesTitle : copy.title}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isPreferences ? copy.preferencesBody : copy.body}
        </p>
        <div
          className={cn(
            "mt-4 flex flex-wrap items-center gap-2",
            !isPreferences && "sm:gap-3",
          )}
        >
          <Button type="button" size="sm" className="min-h-11 min-w-[7rem] sm:min-h-9" onClick={accept}>
            {copy.accept}
          </Button>
          {isPreferences ? (
            <>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="min-h-11 sm:min-h-9"
                onClick={decline}
              >
                {copy.decline}
              </Button>
              {current ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="min-h-11 sm:min-h-9"
                  onClick={() => setOpen(false)}
                >
                  {copy.keepCurrent}
                </Button>
              ) : null}
            </>
          ) : (
            <button
              type="button"
              onClick={decline}
              className="min-h-11 px-2 py-2 text-sm text-muted-foreground transition hover:text-foreground sm:min-h-0"
            >
              {copy.decline}
            </button>
          )}
          <Link
            href="/privacy"
            className="ml-auto inline-flex min-h-11 items-center text-xs font-medium text-accent hover:underline sm:ml-1 sm:min-h-0"
          >
            {copy.privacy}
          </Link>
        </div>
      </div>
    </div>
  );
}
