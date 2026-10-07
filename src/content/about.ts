export interface AboutSection {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
}

export interface AboutPathway {
  id: string;
  href: string;
  label: string;
  description: string;
}

export interface AboutStat {
  id: string;
  label: string;
  valueKey: "eraCount" | "timelineEntryCount" | "sectorCount" | "iconCount" | "projectCount";
}

export const ABOUT_META = {
  seoTitle: "About Us",
  seoDescription:
    "Independent civic media that puts Nigerian history beside sourced 2050 sector scenarios. Built for the skeptic.",
  eyebrow: "About Nigeria2050",
  titleLine1: "History",
  titleLine2: "beside the case for 2050.",
  description:
    "Independent, non-partisan, source-transparent civic media. Baselines you can check. Scenarios with assumptions you can read.",
  primaryCta: "Open the timeline",
  secondaryCta: "Browse sectors",
  asideEyebrow: "In the archive",
  asideNote: "Counts update as the public library grows.",
  principlesTitle: "How we work",
  pathwaysTitle: "Start anywhere",
  pathwaysLead: "Pick a door. Every path keeps the citations with you.",
  correctionsTitle: "Found an error?",
  correctionsBody:
    "Send the page URL, the claim, and a counter-source. Corrections and methodology stay public.",
  correctionsCta: "Methodology and corrections",
} as const;

export const ABOUT_RAIL = [
  { year: "c. 1180", label: "Kingdoms", href: "/timeline", accent: false },
  { year: "1960", label: "Independence", href: "/timeline", accent: false },
  { year: "2026", label: "Today", href: "/compare", accent: false },
  { year: "2050", label: "The case", href: "/sectors", accent: true },
] as const;

export const ABOUT_STATS: AboutStat[] = [
  { id: "eras", label: "Eras", valueKey: "eraCount" },
  { id: "entries", label: "Timeline entries", valueKey: "timelineEntryCount" },
  { id: "sectors", label: "Sector visions", valueKey: "sectorCount" },
  { id: "icons", label: "Icons", valueKey: "iconCount" },
];

export const ABOUT_PRINCIPLES = [
  {
    id: "optimistic",
    title: "Optimistic, with receipts",
    body: "Stated assumptions. Ranges. No guarantees dressed up as destiny.",
  },
  {
    id: "nonpartisan",
    title: "Non-partisan",
    body: "No current officeholders, parties, or campaign imagery on the public spine.",
  },
  {
    id: "sourced",
    title: "Show the data",
    body: "Big claims sit next to named sources in the public library.",
  },
  {
    id: "skeptic",
    title: "Built for the skeptic",
    body: "Methodology, review notes, and corrections stay in the open.",
  },
] as const;

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    id: "what",
    title: "What this is",
    summary: "One site for past and possible futures.",
    paragraphs: [
      "Nigeria2050 puts interactive history beside sourced sector scenarios to 2050. Timeline entries, icons, Nigeria in Literature, sector pages, comparators, Cool Projects, and Street Pulse share one spine so you can move without losing the citations.",
      "2050 figures are scenarios under stated assumptions. They show what could happen. They are not guarantees.",
    ],
    links: [
      { href: "/timeline", label: "Timeline" },
      { href: "/literature", label: "Nigeria in Literature" },
      { href: "/sectors", label: "Sectors" },
      { href: "/sources", label: "Sources" },
    ],
  },
  {
    id: "audience",
    title: "Who it is for",
    summary: "Readers who want checkable numbers and plain language.",
    paragraphs: [
      "Written for diaspora Nigerians, young people in Nigeria, curious outsiders, educators, and policy-adjacent readers.",
      "Present-day problems stay on the page. Credibility depends on naming them on the way to an optimistic case.",
    ],
  },
  {
    id: "tools",
    title: "What you can do",
    summary: "Read, compare, vote, answer, ask.",
    paragraphs: [
      "Walk the history spine, icons register, and Nigeria in Literature shelf. Compare today’s baselines with 2050 cases and G7 averages. Rank civic project ideas. Answer Street Pulse questions. Ask the Archive from curated content only.",
    ],
  },
];

export const ABOUT_PATHWAYS: AboutPathway[] = [
  {
    id: "timeline",
    href: "/timeline",
    label: "Timeline",
    description: "Eras and entries from kingdoms to now.",
  },
  {
    id: "icons",
    href: "/icons",
    label: "Icons",
    description: "Writers, organisers, builders, athletes.",
  },
  {
    id: "literature",
    href: "/literature",
    label: "Nigeria in Literature",
    description: "Novels, memoirs, plays, and films by era.",
  },
  {
    id: "sectors",
    href: "/sectors",
    label: "Sectors",
    description: "Sourced baselines and 2050 milestone cases.",
  },
  {
    id: "compare",
    href: "/compare",
    label: "Now vs. 2050",
    description: "Slide the gap between today and the base case.",
  },
  {
    id: "projects",
    href: "/projects",
    label: "Cool Projects",
    description: "Vote, react, and comment on civic bets.",
  },
  {
    id: "pulse",
    href: "/pulse",
    label: "Street Pulse",
    description: "Anonymous answers about daily life in Nigeria.",
  },
  {
    id: "ask",
    href: "/ask",
    label: "Ask the Archive",
    description: "Questions grounded in this site’s content.",
  },
  {
    id: "methodology",
    href: "/methodology",
    label: "Methodology",
    description: "Sourcing rules, ranges, AI guardrails, corrections.",
  },
];
