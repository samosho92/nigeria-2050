import { Index } from "flexsearch";
import { PULSE_CATEGORIES, PULSE_META, PULSE_POLLS, PULSE_SESSION_SIZE } from "@/content/polls";
import { GLOSSARY } from "@/content/glossary";
import { ICONS } from "@/content/icons";
import { COOL_PROJECTS } from "@/content/projects";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES } from "@/content/timeline";
import { stripControlChars } from "@/lib/ask-guardrails";
import { CONTENT_STATS } from "@/lib/content-stats";

export type SearchResultType = "sector" | "timeline" | "glossary" | "icon" | "project" | "pulse";

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
  ...ICONS.map((figure) => ({
    id: figure.id,
    type: "icon" as const,
    title: figure.name,
    description: figure.achievement,
    href: `/icons#${figure.id}`,
  })),
  ...GLOSSARY.map((g) => ({
    id: g.term,
    type: "glossary" as const,
    title: g.term,
    description: g.definition.slice(0, 120) + "…",
    href: `/glossary#${encodeURIComponent(g.term)}`,
  })),
  ...COOL_PROJECTS.map((project) => ({
    id: project.id,
    type: "project" as const,
    title: project.title,
    description: project.summary,
    href: project.mockHref ?? `/projects#${project.id}`,
  })),
  {
    id: "projects-index",
    type: "project" as const,
    title: "Cool Projects",
    description: `${CONTENT_STATS.projectCount} civic ideas to make Nigeria work better by 2050. Vote and submit.`,
    href: "/projects",
  },
  {
    id: "postal-code-engine",
    type: "project" as const,
    title: "National postal code engine",
    description: "Mock index: 37 capitals, rural clusters to urban street blocks",
    href: "/projects/postal-codes",
  },
  {
    id: "road-sign-campaign",
    type: "project" as const,
    title: "Road-sign campaign",
    description: "Mock: speed, stop, school zone, and km markers on capital corridors",
    href: "/projects/road-signs",
  },
  {
    id: "public-library-floor",
    type: "project" as const,
    title: "Public library floor",
    description: "Mock: 100 km rural floor, urban densify, minimum kit, national catalogue",
    href: "/projects/public-libraries",
  },
  {
    id: "emergency-112-desk",
    type: "project" as const,
    title: "Emergency 112 dispatch",
    description: "Mock desk: postal-code locate, radio ACK, launch gate",
    href: "/projects/emergency-112",
  },
  {
    id: "land-title-register",
    type: "project" as const,
    title: "Land title register",
    description: "Mock folio: C of O, consent, mapped parcel",
    href: "/projects/land-titles",
  },
  {
    id: "grid-outage-watch",
    type: "project" as const,
    title: "Grid outage map",
    description: "Mock hour: generation vs demand, DisCo feeder windows",
    href: "/projects/grid-outage",
  },
  {
    id: "open-budget-portal",
    type: "project" as const,
    title: "Open budgets and contracts",
    description: "Mock portal: 2026 Appropriation Act envelope, MDA tables, sample awards",
    href: "/projects/open-budgets",
  },
  {
    id: "street-pulse",
    type: "pulse" as const,
    title: PULSE_META.name,
    description: `${PULSE_SESSION_SIZE} questions per round from ${PULSE_POLLS.length} in ${PULSE_CATEGORIES.length} categories (pay, commute, meals, till, power, data, ride, basket). Refresh for a new round, then see the crowd.`,
    href: "/pulse",
  },
  {
    id: "g7-compare",
    type: "sector" as const,
    title: "Nigeria vs. G7",
    description: "Compare Nigeria sector baselines against G7 country averages",
    href: "/compare/g7",
  },
  {
    id: "icons-index",
    type: "icon" as const,
    title: "Icons of Nigeria",
    description: `${CONTENT_STATS.iconCount} sourced historical and contemporary Nigerian figures`,
    href: "/icons",
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
  const trimmed = stripControlChars(query).trim().slice(0, 80);
  if (!trimmed) return [];
  const results = getIndex().search(trimmed, { limit: Math.min(limit, 12) });
  return results.map((i) => searchItems[i as number]).filter(Boolean);
}

export function getAllSearchItems(): SearchResult[] {
  return searchItems;
}
