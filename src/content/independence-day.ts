/**
 * Seasonal Independence Month module (homepage).
 * REMOVE after 2026-10-31: delete this file, `src/lib/independence-day.ts`,
 * `src/components/home/IndependenceDayCommemorative.tsx`, homepage import,
 * analytics event `independence_day_cta`, and the BUILD_PLAN seasonal note.
 * The date gate already hides the UI after that day in Africa/Lagos.
 */
export const INDEPENDENCE_DAY_SEASON = {
  /** Inclusive start (Africa/Lagos calendar day). */
  startDate: "2026-10-01",
  /** Inclusive end (Africa/Lagos calendar day). Delete code after this day. */
  endDate: "2026-10-31",
  independenceYear: 1960,
  anniversaryYear: 2026,
  yearsSinceIndependence: 66,
  yearsTo2050: 24,
} as const;

export const INDEPENDENCE_DAY_COPY = {
  eyebrow: "Independence Month · October 2026",
  titleYearsLabel: "years since",
  titleDate: "1 October 1960",
  yearsTo2050Label: (years: number) => `${years} years from now to 2050`,
  lead: (yearsTo2050: number) =>
    `Nigeria became a sovereign federation on this day. This month we open from that hour on the timeline, then look at the ${yearsTo2050} years still between now and 2050.`,
  beats: [
    {
      id: "independence",
      year: "1960",
      label: "Independence",
      detail: "1 October. The green-white-green rises over a new federation.",
      href: "/timeline#independence-1960",
    },
    {
      id: "today",
      year: "2026",
      label: "Today",
      detail: "Sourced baselines for power, income, literacy, and logistics.",
      href: "/compare",
    },
    {
      id: "case-2050",
      year: "2050",
      label: "The case",
      detail: "Sector visions for the next quarter-century of the republic.",
      href: "/sectors",
    },
  ],
  primaryCta: {
    label: "Read Independence on the timeline",
    href: "/timeline#era-independence",
  },
  secondaryCta: {
    label: "Now vs. 2050",
    href: "/compare",
  },
} as const;
