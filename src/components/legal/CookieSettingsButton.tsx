"use client";

import { openConsentPreferences } from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent({ name: "consent_preferences_open" });
        openConsentPreferences();
      }}
      className="transition hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
