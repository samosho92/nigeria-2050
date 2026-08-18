import type { IconFigure, IconPortrait, Source } from "@/types/content";
import { ICON_COHORT_EARLY } from "./cohort-early";
import { ICON_COHORT_LATER } from "./cohort-later";
import { ICON_COHORT_MODERN } from "./cohort-modern";
import { ICON_PORTRAITS } from "./portraits";

export { ICON_CATEGORIES } from "./categories";

const DRAFTS = [...ICON_COHORT_EARLY, ...ICON_COHORT_MODERN, ...ICON_COHORT_LATER];

export const ICONS: IconFigure[] = DRAFTS.map((figure) => {
  const portrait: IconPortrait | undefined = ICON_PORTRAITS[figure.id];
  return {
    ...figure,
    image: portrait,
    reviewStatus: "pending-review" as const,
  };
}).sort((a, b) => a.born - b.born || a.name.localeCompare(b.name));

export const ICON_SOURCES: Source[] = ICONS.map((figure) => ({
  id: `icon-${figure.id}`,
  title: figure.citation.title,
  publisher: figure.citation.publisher,
  year: figure.citation.year,
  url: figure.citation.url,
  accessedAt: "2026-08-18",
  sectors: figure.relatedSectorSlugs,
}));

export function getIconById(id: string): IconFigure | undefined {
  return ICONS.find((figure) => figure.id === id);
}

export interface IconDecadeGroup {
  id: string;
  label: string;
  startYear: number;
  figures: IconFigure[];
}

export function groupIconsByDecade(figures: IconFigure[]): IconDecadeGroup[] {
  const buckets = new Map<number, IconFigure[]>();

  for (const figure of figures) {
    const startYear = figure.born < 1800 ? Math.floor(figure.born / 100) * 100 : Math.floor(figure.born / 10) * 10;
    const list = buckets.get(startYear) ?? [];
    list.push(figure);
    buckets.set(startYear, list);
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => a - b)
    .map(([startYear, group]) => ({
      id: `decade-${startYear}`,
      label: `${startYear}s`,
      startYear,
      figures: group,
    }));
}
