import type { ReviewItem } from "@/types/content";

export const REVIEW_QUEUE: ReviewItem[] = [
  {
    id: "timeline-civil-war-1967",
    type: "timeline",
    title: "Civil War entry — historian review",
    status: "pending-review",
    reviewer: "Historian (TBD)",
    notes: "Requires multi-source balance check per PRD §12–14 before public launch.",
  },
  {
    id: "sector-economy-projections",
    type: "sector",
    title: "Economy sector 2050 projections — economist review",
    status: "pending-review",
    reviewer: "Economist (TBD)",
    notes: "Validate GDP and diversification assumptions against NBS / World Bank baselines.",
  },
  {
    id: "sector-security-projections",
    type: "sector",
    title: "Security sector projections — subject-matter review",
    status: "pending-review",
    reviewer: "Security analyst (TBD)",
  },
  {
    id: "era-portal-art",
    type: "art",
    title: "Era portal illustrated art — editorial approval",
    status: "pending-review",
    notes: "Abstract CSS placeholders approved for launch; commissioned art pending editorial sign-off.",
  },
  {
    id: "timeline-pre-colonial",
    type: "timeline",
    title: "Pre-colonial plurality framing",
    status: "reviewed",
    reviewer: "Editorial (internal)",
    notes: "Plurality of kingdoms presentation checked against PRD §6.",
  },
  {
    id: "sector-technology",
    type: "sector",
    title: "Technology sector content",
    status: "reviewed",
    reviewer: "Editorial (internal)",
  },
  {
    id: "sector-healthcare-projections",
    type: "sector",
    title: "Healthcare sector 2050 projections — clinician review",
    status: "pending-review",
    reviewer: "Public health specialist (TBD)",
  },
  {
    id: "sector-agriculture-projections",
    type: "sector",
    title: "Agriculture sector projections — economist review",
    status: "pending-review",
    reviewer: "Agricultural economist (TBD)",
  },
  {
    id: "phase2-era-art",
    type: "art",
    title: "Phase 2 era SVG art — editorial approval",
    status: "reviewed",
    reviewer: "Editorial (internal)",
    notes: "Abstract SVG era scenes approved; settings only, no figures.",
  },
  {
    id: "sector-transportation-projections",
    type: "sector",
    title: "Transportation sector 2050 projections — infrastructure review",
    status: "pending-review",
    reviewer: "Transport economist (TBD)",
    notes: "LPI 2023, WDI 2019 air passengers, and WHO GSRRS 2023 road-death rates transcribed from source tables. Port dwell-day baseline withheld until a named series exists.",
  },
  {
    id: "sector-real-estate-projections",
    type: "sector",
    title: "Real estate sector 2050 projections — housing economist review",
    status: "pending-review",
    reviewer: "Housing economist (TBD)",
    notes:
      "WDI 2022 slum share, 2023 density and urban % transcribed from API. Housing deficit kept as CAHF/FMBN 22–28 million range. No G7 house-price row (no common series).",
  },
];

export function getPendingReviews() {
  return REVIEW_QUEUE.filter((item) => item.status === "pending-review");
}
