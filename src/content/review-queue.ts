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
    notes: "Abstract CSS placeholders approved for MVP; commissioned/AI art queued for Phase 2.",
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
];

export function getPendingReviews() {
  return REVIEW_QUEUE.filter((item) => item.status === "pending-review");
}
