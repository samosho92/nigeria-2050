export interface Source {
  id: string;
  title: string;
  publisher: string;
  year: number;
  url?: string;
  accessedAt?: string;
}

export interface HistoricalWaypoint {
  timelineEntryId: string;
  title: string;
  summary: string;
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
  projections: SectorProjection[];
  historicalWaypoints: HistoricalWaypoint[];
  assumptions: string[];
  risks: string[];
  sourceIds: string[];
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
  sourceId: string;
}
