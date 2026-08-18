export interface ScenarioRange {
  label: string;
  unit?: string;
  low: number | string;
  base: number | string;
  high: number | string;
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  year: number;
  url?: string;
  accessedAt?: string;
  sectors?: string[];
  eras?: string[];
}

export interface HistoricalWaypoint {
  timelineEntryId: string;
  title: string;
  summary: string;
}

export interface ScenarioAssumption {
  title: string;
  detail: string;
}

export interface ScenarioRisk {
  title: string;
  detail: string;
}

export interface SectorProjection {
  year: 2030 | 2040 | 2050;
  headline: string;
  narrative: string;
  metrics: Record<string, number | string>;
}

export interface Sector {
  slug: string;
  title: string;
  tagline: string;
  headline2050: string;
  baseline: Record<string, number | string>;
  scenarioRanges?: ScenarioRange[];
  projections: SectorProjection[];
  historicalWaypoints: HistoricalWaypoint[];
  assumptions: ScenarioAssumption[];
  risks: ScenarioRisk[];
  sourceIds: string[];
  reviewStatus?: "draft" | "pending-review" | "reviewed";
}

export interface TimelineEntry {
  id: string;
  era: string;
  title: string;
  dateRange: string;
  summary: string;
  content: string;
  relatedSectorSlugs: string[];
  sourceIds: string[];
  artDirection: "pre-colonial" | "colonial" | "independence" | "conflict" | "military" | "democracy" | "reform";
  reviewStatus?: "draft" | "pending-review" | "reviewed";
  lastReviewed?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SectorQuiz {
  sectorSlug: string;
  title: string;
  questions: QuizQuestion[];
}

export interface CorrectionSubmission {
  id: string;
  pageUrl: string;
  claim: string;
  counterSource: string;
  email?: string;
  submittedAt: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedSlugs?: string[];
}

export interface ComparatorMetric {
  id: string;
  label: string;
  unit: string;
  current: number;
  projected2050: number;
  projected2050Low?: number;
  projected2050High?: number;
  sourceId: string;
}

export type G7CountryCode = "CA" | "FR" | "DE" | "IT" | "JP" | "GB" | "US";

export interface G7BenchmarkMetric {
  id: string;
  sectorSlug: string;
  label: string;
  /** Exact indicator definition — same methodology for Nigeria and all G7 members. */
  definition: string;
  unit: string;
  /** Reference year for Nigeria + all G7 values (apples-to-apples). */
  referenceYear: number;
  nigeria: number;
  g7Countries: Record<G7CountryCode, number>;
  nigeria2050?: number;
  /** When false, lower values are better (e.g. corruption rank). */
  higherIsBetter: boolean;
  sourceId: string;
  /** Dataset series name / table ID for traceability. */
  sourceSeries: string;
  context?: string;
}

export type ReviewItem = {
  id: string;
  type: "sector" | "timeline" | "art" | "correction" | "icons";
  title: string;
  status: "pending-review" | "reviewed";
  reviewer?: string;
  notes?: string;
};

export const ICON_CATEGORY_IDS = [
  "leadership",
  "enterprise",
  "literature",
  "arts",
  "activism",
  "science",
  "sport",
] as const;

export type IconCategoryId = (typeof ICON_CATEGORY_IDS)[number];

export interface IconCitation {
  title: string;
  publisher: string;
  year: number;
  url: string;
}

export interface IconPortrait {
  src: string;
  alt: string;
  credit: string;
  license: string;
  sourceUrl: string;
}

export interface IconFigure {
  id: string;
  name: string;
  born: number;
  died?: number;
  circa?: boolean;
  birthplace?: string;
  categories: IconCategoryId[];
  relatedSectorSlugs: string[];
  relatedTimelineIds?: string[];
  /** One-sentence achievement used on cards and in search. */
  achievement: string;
  summary: string;
  citation: IconCitation;
  /** Wikipedia page title used only to fetch a freely licensed portrait. */
  wikipediaTitle: string;
  image?: IconPortrait;
  reviewStatus?: "draft" | "pending-review" | "reviewed";
}
