import { COMPARATOR_METRICS } from "@/content/comparator";
import { SECTORS } from "@/content/sectors";

export const METHODOLOGY_META = {
  lastUpdated: "October 4, 2026",
};

export interface MethodologyLink {
  href: string;
  label: string;
}

export interface MethodologySection {
  id: string;
  title: string;
  summary: string;
  points: string[];
  links?: MethodologyLink[];
}

export const METHODOLOGY_PRINCIPLES = [
  "Optimistic, with stated assumptions and no guarantees.",
  "Non-partisan. No current officeholders, parties, or campaign imagery.",
  "Show the data. Every big claim is sourced and traceable.",
  "Built for the skeptic. Methodology, ranges, and corrections are public.",
];

/** Shown on sector milestones, scenario ranges, and the Now vs. 2050 slider. */
export const SCENARIO_UI_NOTE =
  "2030–2050 figures are base-case scenarios with stated assumptions. Low/high bounds sit between multilateral projections and national ambition documents.";

function comparatorById(id: string) {
  const metric = COMPARATOR_METRICS.find((row) => row.id === id);
  if (!metric) throw new Error(`Missing comparator metric: ${id}`);
  return metric;
}

function projectionExamples(): string {
  const population = comparatorById("population");
  const literacy = comparatorById("literacy-rate");
  const internet = comparatorById("internet-penetration");
  const power = comparatorById("power-capacity");
  const energy = SECTORS.find((sector) => sector.slug === "energy");
  const available = energy?.baseline.availableCapacity ?? "~5.4 GW";
  return `Examples from the comparator and energy baseline: population base ~${population.projected2050}M (UN WPP 2024 medium) with high near ${population.projected2050High}M; literacy baseline ${literacy.current}% (UIS 2024); regular mobile internet use ~${internet.current}% (GSMA); installed power ~${power.current} GW with ${available} available (NERC).`;
}

function comparatorMetricList(): string {
  return COMPARATOR_METRICS.map((metric) => metric.label).join(", ");
}

export const METHODOLOGY_SECTIONS: MethodologySection[] = [
  {
    id: "positioning",
    title: "What Nigeria2050 Is",
    summary: "Independent civic media.",
    points: [
      "Two co-equal pillars at launch: interactive history and sourced 2050 sector visions, fused by bidirectional cross-links.",
      "Written for diaspora Nigerians, curious outsiders, young Nigerians, educators, and policy-adjacent professionals.",
      "We acknowledge present-day problems honestly. Credibility depends on not glossing over them en route to the optimistic case.",
    ],
    links: [{ href: "/timeline", label: "Explore the timeline" }],
  },
  {
    id: "sourcing",
    title: "Sourcing Standards",
    summary: "Every quantitative claim must be checkable against a named source.",
    points: [
      "All cited sources live in the public Source Library with publisher, year, and URL where available.",
      "We prioritize primary and multilateral data: World Bank WDI, UN WPP, NBS, UNESCO UIS, NERC, IEA, GSMA, WHO, UNDP, Transparency International, and peer-reviewed academic work.",
      "Baselines prefer series with codes (for example UIS SE.ADT.LITR.ZS, NERC installed capacity, UN WPP medium).",
      "Narrative copy that cannot be tied to a specific source is labeled as editorial synthesis.",
      "Sector and era tags on each source show where it is used across the site.",
    ],
    links: [{ href: "/sources", label: "Source Library" }],
  },
  {
    id: "projections",
    title: "2050 Projection Methodology",
    summary:
      "Sector visions are scenarios, structured narratives built on baselines, milestones, and explicit assumptions.",
    points: [
      "Each sector page shows a sourced current baseline, then milestone narratives for 2030 / 2040 / 2050 labeled as scenarios.",
      "Headline comparator metrics carry low / base / high 2050 bounds. Base cases sit between multilateral projections (UN WPP, IEA, PwC) and national ambition (Agenda 2050, Energy Transition Plan).",
      projectionExamples(),
      "2050 numbers are internally consistent within a sector (assumptions → milestones → ranges). Nigeria2050 does not run econometric models.",
      "Cross-sector dependencies are stated explicitly (e.g. economic industrialization assumes energy delivery targets).",
    ],
    links: [{ href: "/sectors/economy", label: "Example sector page" }],
  },
  {
    id: "g7-benchmarks",
    title: "G7 Benchmark Comparisons",
    summary: "Apples-to-apples only, one indicator definition, one reference year per row.",
    points: [
      "Each G7 comparison uses the same international series for Nigeria and all seven G7 members (Canada, France, Germany, Italy, Japan, United Kingdom, United States).",
      "Reference years are fixed per indicator (typically 2021–2024 depending on dataset lag). Nigeria and every G7 country are measured in the same survey wave or WDI vintage.",
      "Series IDs (e.g. WDI · NY.GDP.PCAP.CD) are shown on hover, no mixing oil-specific metrics with general trade indicators.",
      "G7 average = simple arithmetic mean of the seven members for that indicator and year.",
      "Nigeria 2050 scenario values appear separately and are never blended into cross-country baseline tables.",
    ],
    links: [{ href: "/compare/g7", label: "Nigeria vs. G7" }],
  },
  {
    id: "comparator",
    title: "Now vs. 2050 Comparator",
    summary: "The morph slider interpolates between sourced baseline and base-case 2050 values.",
    points: [
      `${COMPARATOR_METRICS.length} headline metrics with named sources: ${comparatorMetricList()}.`,
      "The slider interpolates between a sourced baseline and a labeled 2050 base-case scenario for illustration.",
      "Low and high 2050 bounds are published on the comparator where no single official 2050 series exists, and on sector pages via scenario ranges.",
    ],
    links: [{ href: "/compare", label: "Now vs. 2050" }],
  },
  {
    id: "history",
    title: "Historical Content",
    summary: "Contested history is presented with gravity, plurality, and multiple sources.",
    points: [
      "The Civil War, coups, and military rule are covered factually without adopting a purely federal-government or purely secessionist framing.",
      "Pre-colonial eras present a plurality of kingdoms and polities.",
      "Timeline entries are 150–300 words at a “smart newcomer” reading level, with links to deeper sources.",
      "The Icons register lists 150 historical and contemporary figures with a named citation each. Sitting Nigerian public officeholders are omitted while in office (non-partisan policy). Portraits are Wikimedia Commons headshots with a free license only, never AI-generated likenesses, and never statues or body-only photographs standing in for a face.",
      "Sensitive entries carry editorial review status in the internal review queue until subject-matter sign-off.",
    ],
    links: [
      { href: "/timeline", label: "Interactive timeline" },
      { href: "/icons", label: "Icons of Nigeria" },
    ],
  },
  {
    id: "ai",
    title: "AI & Interactive Tools",
    summary: "AI features are scoped, labeled, and grounded in our curated content store.",
    points: [
      "Ask the Archive retrieves answers only from Nigeria2050’s own timeline, sector, glossary, icons, and source content. Questions are rate-limited on the server. They are not stored as transcripts and are not sent to third-party AI providers. Out-of-scope, abusive, explicit, self-harm, scam, and prompt-injection messages are declined before retrieval.",
      "Out-of-scope questions are declined rather than hallucinated; answers include links back to source pages.",
      "All AI-assisted UI is labeled. Era portal art uses abstract CSS placeholders for settings only, with no depictions of real historical figures.",
      "AI-generated media promoted into the permanent library requires human editorial review before publication.",
    ],
    links: [{ href: "/ask", label: "Ask the Archive" }],
  },
  {
    id: "fusion",
    title: "Cross-Pillar Fusion",
    summary: "The product mechanism that links history and future vision.",
    points: [
      "Every sector page includes a “How We Got Here” module with 2–3 historical waypoints linking to timeline entries.",
      "Every timeline entry with sector relevance includes a “Why this matters for 2050” link back to sector pages.",
      "Cross-pillar navigation is tracked anonymously to measure whether the fused design is working.",
    ],
  },
  {
    id: "review",
    title: "Review, Corrections & Updates",
    summary: "Subject-matter review is a real dependency.",
    points: [
      "Each sector page, timeline era entry, and promoted AI asset is flagged in the editorial review queue until signed off.",
      "Corrections are published with a dated note when a material error is confirmed.",
      "Baseline data is refreshed on a quarterly manual cadence.",
      "G7 and comparator datasets are updated when upstream publishers release new vintages; reference years on each row will change accordingly.",
    ],
    links: [{ href: "/editorial/review", label: "Editorial review queue" }],
  },
];

export const METHODOLOGY_NON_GOALS = [
  "Independent civic media.",
  "A long-horizon archive of history and 2050 scenarios.",
  "Honest about present-day problems on the way to the optimistic case.",
  "Core material stays public.",
];

export const CORRECTIONS_EMAIL = "corrections@nigeria2050.com";
