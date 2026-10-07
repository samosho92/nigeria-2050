import { G7_COUNTRY_LABELS, getBenchmarkYearRange } from "@/content/g7-benchmark";

export const COMPARE_PAGE_META = {
  title: "Now vs. 2050",
  description: "Compare Nigeria's sourced baseline with labeled 2050 scenarios.",
  eyebrow: "Baseline vs. scenario",
  pageTitle: "Nigeria Now vs. Nigeria 2050",
  pageDescription:
    "Pick civic projects, then watch the 2050 trajectory shift. Drag the morph slider to explore the path. Left side is sourced baseline; right side is a labeled scenario.",
  g7TeaserTitle: "Nigeria vs. the G7",
  g7TeaserDescription:
    "See how wide the gap is today, sector by sector, indicator by indicator.",
  sourcesTitle: "Comparator Data Sources",
} as const;

export const G7_EXPLORER_META = {
  scenarioLabel: "Nigeria 2050 scenario",
  countryColumn: "Country",
  valueColumn: (year: number) => `Value (${year})`,
  barColumnAria: "Bar",
  baselineTag: "(baseline)",
  g7BestTag: "G7 best",
  gapLeads: "G7 avg leads",
  gapWorse: "Nigeria worse",
  gapBy: "by",
  nigeriaYear: (year: number) => `Nigeria · ${year}`,
  g7AverageYear: (year: number) => `G7 average · ${year}`,
  stillBehind: (gap: string, year: number) => `, still ${gap} behind G7 ${year} avg`,
  distanceEyebrow: "The distance to close",
  averageGapSuffix: "average gap vs G7",
  indicatorsLead: (count: number, earliest: number, latest: number) =>
    `${count} indicators, each uses the same definition and reference year for Nigeria and all seven G7 members (${earliest}–${latest} depending on dataset). Hover the info icon on any metric for the exact source series.`,
  widestTitle: "Widest gaps today",
  widestLead: "Same-indicator, same-year comparisons only, sorted by distance from G7 average.",
  gapCard: (gap: string) => `${gap} gap`,
  nigeriaVsAvg: (nigeria: string, avg: string) => `Nigeria: ${nigeria} · G7 avg: ${avg}`,
  bySectorTitle: "By sector",
  sectorFilterAria: "Filter by sector",
  sectorPathCta: (sectorLabel: string) => `See Nigeria's 2050 path for ${sectorLabel}`,
} as const;

export function getG7PageMeta() {
  const { earliest, latest } = getBenchmarkYearRange();
  const g7List = Object.values(G7_COUNTRY_LABELS).join(", ");
  return {
    title: "Nigeria vs. G7",
    description:
      "Same-indicator, same-year benchmarks: Nigeria against each G7 country across all sector tabs.",
    eyebrow: "International benchmarks",
    pageTitle: "Nigeria vs. the G7",
    pageDescription: `Apples-to-apples only: each row uses one indicator definition and one reference year (${earliest}–${latest}) for Nigeria and all G7 members (${g7List}). Hover any metric title for the exact dataset and series ID. 2050 figures are Nigeria2050 scenarios. They are never mixed into the same-year cross-country baselines.`,
    sourcesTitle: "Benchmark Data Sources",
    scenarioLabel: G7_EXPLORER_META.scenarioLabel,
  } as const;
}

export const COMPARE_EXPLORER_META = {
  noDelta: (metricLabel: string) =>
    `Your current selections do not move ${metricLabel}. Try the projects listed below for this metric, or switch to another metric tab.`,
  previewLabel: (metricLabel: string) => `${metricLabel} · 2050 preview`,
  baseScenario: "Base scenario",
  withPicks: "With your picks",
  selectProjects: "Select one or more projects below to see the 2050 number move.",
  shiftAbove: (count: number, amount: string) =>
    `${count} project${count === 1 ? "" : "s"} shift this metric ${amount} above the base scenario.`,
  shiftBelow: (count: number, amount: string) =>
    `${count} project${count === 1 ? "" : "s"} shift this metric ${amount} below the base scenario.`,
  otherMetricsOnly: (count: number) =>
    `${count} selected project${count === 1 ? "" : "s"} affect other metrics only.`,
  movesNeedle: (metricLabel: string) => `Moves the needle on ${metricLabel}`,
  otherProjects: (count: number) => `Other projects and policies (${count})`,
  browseProjects: "Browse all Cool Projects",
  viewOnProjects: "View on Cool Projects",
  trajectoryTitle: "Trajectory to 2050",
  trajectoryLead:
    "Grey bars show the base scenario path. Green bars add your selected projects.",
  trajectoryBase: "Base",
  trajectoryPick: "Your pick",
  morphNow: "Now",
  morph2050WithProjects: "2050 with projects",
  morph2050Scenario: "2050 scenario",
  morphBasePrefix: "Base:",
  morphDragLead: (metricLabel: string, year: number) =>
    `Drag to morph, ${metricLabel} at ${year}`,
  morphProjectsSelected: (count: number) =>
    `${count} project${count === 1 ? "" : "s"} selected`,
  morphTrackNow: "Nigeria now (sourced)",
  morphTrack2050: "2050 with your picks",
  morphAria: (metricLabel: string) => `Morph slider for ${metricLabel}`,
};
