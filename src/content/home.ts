export interface HomeRailItem {
  year: string;
  label: string;
  href: string;
  accent?: boolean;
}

/** Homepage hero, pillars, teasers. Pages compose; they do not redefine this copy. */
export const HOME_HERO = {
  titleLine1: "25 years",
  titleLine2: "will decide this country.",
  description: (eraCount: number, sectorCount: number) =>
    `${eraCount} eras of Nigerian history. ${sectorCount} sector visions to 2050. Every number cited, every scenario ranged. Built for the skeptic.`,
  primaryCta: "Explore the Timeline",
  secondaryCta: "Now vs. 2050",
  asideEyebrow: "Base case, 2050",
  asideMethodology: "How we model this",
  asideFromToday: (baseline: string) => `from ${baseline} today`,
  heroStatIds: ["gdp-per-capita", "population", "power-capacity"] as const,
  rail: [
    { year: "c. 1180", label: "Kingdoms", href: "/timeline", accent: false },
    { year: "1960", label: "Independence", href: "/timeline", accent: false },
    { year: "2026", label: "Today", href: "/compare", accent: false },
    { year: "2050", label: "The case", href: "/sectors", accent: true },
  ] satisfies HomeRailItem[],
} as const;

export const HOME_SECTIONS = {
  pillarsTitle: "Two Co-equal Pillars",
  pillarsLead: "History and future vision, fused by bidirectional links.",
  storyTitle: "The Nigeria Story",
  storyDescription: (eraCount: number, entryCount: number, iconCount: number) =>
    `${eraCount} eras · ${entryCount} entries · ${iconCount} icons · scrollytelling spine with sector cross-links.`,
  storyTimelineCta: "View timeline",
  storyIconsCta: "View icons",
  sectorsPillarTitle: "Sector Visions to 2050",
  sectorsPillarDescription: (sectorCount: number) =>
    `${sectorCount} sectors with sourced projections, milestone narratives, and “How we got here” modules.`,
  sectorsPillarCta: "Browse sectors",
  allSectorsTitle: "All Sector Visions",
  projectsTitle: "Cool Projects",
  projectsBody:
    "Vote on civic ideas, postal codes, road signs, libraries, and submit the initiative you think Nigeria should build by 2050.",
  projectsCta: "Rank the ideas",
  askTitle: "Ask the Archive",
  askBody:
    "Ask about Nigerian history or 2050 projections. Grounded in curated content, with guardrails for respectful use.",
  askCta: "Try it now",
} as const;

export const HOME_ICONS_TEASER = {
  eyebrow: "People",
  title: (iconCount: number) => `${iconCount} icons. One register.`,
  body: "Writers, organisers, builders, and athletes, sourced, chronological, and searchable. The timeline tells what happened. The icons page tells who carried it.",
  cta: "Browse the icons",
} as const;
