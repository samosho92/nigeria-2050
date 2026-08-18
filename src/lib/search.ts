import { Index } from "flexsearch";
import { GLOSSARY } from "@/content/glossary";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES } from "@/content/timeline";

export type SearchResultType = "sector" | "timeline" | "glossary";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
}

const searchItems: SearchResult[] = [
  ...SECTORS.map((s) => ({
    id: s.slug,
    type: "sector" as const,
    title: s.title,
    description: s.tagline,
    href: `/sectors/${s.slug}`,
  })),
  ...TIMELINE_ENTRIES.map((e) => ({
    id: e.id,
    type: "timeline" as const,
    title: e.title,
    description: e.summary,
    href: `/timeline#${e.id}`,
  })),
  ...GLOSSARY.map((g) => ({
    id: g.term,
    type: "glossary" as const,
    title: g.term,
    description: g.definition.slice(0, 120) + "…",
    href: `/glossary#${encodeURIComponent(g.term)}`,
  })),
  {
    id: "g7-compare",
    type: "sector" as const,
    title: "Nigeria vs. G7",
    description: "Compare Nigeria sector baselines against G7 country averages",
    href: "/compare/g7",
  },
  {
    id: "methodology",
    type: "sector" as const,
    title: "Editorial Methodology",
    description: "Sourcing standards, projection methodology, G7 benchmarks, AI guardrails",
    href: "/methodology",
  },
];

let index: Index | null = null;

function getIndex(): Index {
  if (!index) {
    index = new Index({ tokenize: "forward", resolution: 9 });
    searchItems.forEach((item, i) => {
      index!.add(i, `${item.title} ${item.description}`);
    });
  }
  return index;
}

export function searchContent(query: string, limit = 8): SearchResult[] {
  if (!query.trim()) return [];
  const results = getIndex().search(query, { limit });
  return results.map((i) => searchItems[i as number]).filter(Boolean);
}

export function getAllSearchItems(): SearchResult[] {
  return searchItems;
}
