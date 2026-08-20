import type { ComparatorLever } from "@/types/content";

export const COMPARATOR_LEVER_META = {
  title: "Move the needle",
  description:
    "Pick civic projects and policy moves from Cool Projects. See how they shift the 2050 trajectory for the metric you are viewing.",
};

export const COMPARATOR_LEVERS: ComparatorLever[] = [
  {
    id: "postal-codes",
    title: "National postal code engine",
    summary: "Street-level codes so logistics, ambulances, and census teams can find a place.",
    projectId: "postal-codes",
    sectorSlugs: ["transportation", "governance"],
    impacts: [{ metricId: "logistics-performance", gapShare: 0.14 }],
  },
  {
    id: "road-signs",
    title: "Road-sign campaign",
    summary: "Posted limits, stop signs, and km markers on corridors people already drive.",
    projectId: "road-signs",
    sectorSlugs: ["transportation", "security"],
    impacts: [{ metricId: "logistics-performance", gapShare: 0.08 }],
  },
  {
    id: "port-clearance",
    title: "Port that clears cargo in days",
    summary: "Single-window customs and published dwell times at Apapa and Onne.",
    projectId: "port-clearance",
    sectorSlugs: ["economy", "transportation", "manufacturing"],
    impacts: [
      { metricId: "logistics-performance", gapShare: 0.16 },
      { metricId: "manufacturing-gdp", gapShare: 0.1 },
      { metricId: "gdp-per-capita", gapShare: 0.06 },
    ],
  },
  {
    id: "grid-outage-map",
    title: "Grid outage map",
    summary: "Feeder-level outage windows so factories and clinics can plan a shift.",
    projectId: "grid-outage",
    sectorSlugs: ["energy", "manufacturing"],
    impacts: [
      { metricId: "power-capacity", gapShare: 0.1 },
      { metricId: "renewable-energy", gapShare: 0.05 },
      { metricId: "manufacturing-gdp", gapShare: 0.08 },
    ],
  },
  {
    id: "solar-streetlights",
    title: "Solar street lighting",
    summary: "Maintained corridor lights at markets, schools, and junctions.",
    projectId: "solar-streetlights",
    sectorSlugs: ["energy", "security"],
    impacts: [
      { metricId: "renewable-energy", gapShare: 0.14 },
      { metricId: "power-capacity", gapShare: 0.06 },
    ],
  },
  {
    id: "last-mile-broadband",
    title: "Broadband as a utility",
    summary: "Published LGA coverage maps and a build-out duty for uncovered wards.",
    projectId: "last-mile-broadband",
    sectorSlugs: ["technology", "education"],
    impacts: [
      { metricId: "internet-penetration", gapShare: 0.18 },
      { metricId: "tertiary-enrollment", gapShare: 0.05 },
    ],
  },
  {
    id: "public-libraries",
    title: "Public library floor",
    summary: "A library within 100 km, then urban branches with books, power, and wifi.",
    projectId: "public-libraries",
    sectorSlugs: ["education", "technology"],
    impacts: [
      { metricId: "literacy-rate", gapShare: 0.1 },
      { metricId: "tertiary-enrollment", gapShare: 0.09 },
    ],
  },
  {
    id: "school-meals",
    title: "School meals that show up",
    summary: "Audited national feeding tied to local farms and attendance.",
    projectId: "school-meals",
    sectorSlugs: ["education", "agriculture", "healthcare"],
    impacts: [
      { metricId: "literacy-rate", gapShare: 0.07 },
      { metricId: "tertiary-enrollment", gapShare: 0.06 },
    ],
  },
  {
    id: "dual-apprenticeship",
    title: "Dual apprenticeship track",
    summary: "Classroom plus paid workplace with a certificate employers recognise.",
    projectId: "dual-apprenticeship",
    sectorSlugs: ["education", "manufacturing", "economy"],
    impacts: [
      { metricId: "manufacturing-gdp", gapShare: 0.14 },
      { metricId: "tertiary-enrollment", gapShare: 0.11 },
      { metricId: "gdp-per-capita", gapShare: 0.05 },
    ],
  },
  {
    id: "farm-cold-chain",
    title: "Cold chain from farm to market",
    summary: "Packhouses, refrigerated trucks, and market cold rooms on known corridors.",
    projectId: "farm-cold-chain",
    sectorSlugs: ["agriculture", "manufacturing"],
    impacts: [
      { metricId: "manufacturing-gdp", gapShare: 0.11 },
      { metricId: "gdp-per-capita", gapShare: 0.04 },
    ],
  },
  {
    id: "land-titles",
    title: "Searchable land titles",
    summary: "Torrens-style register with mapped parcels and governor consent on one record.",
    projectId: "land-titles",
    sectorSlugs: ["real-estate", "financial-inclusion"],
    impacts: [
      { metricId: "urban-slum-share", gapShare: 0.14 },
      { metricId: "gdp-per-capita", gapShare: 0.05 },
    ],
  },
  {
    id: "urban-parks",
    title: "Park within a 15-minute walk",
    summary: "Published green-space standard with lighting for evening use.",
    projectId: "urban-parks",
    sectorSlugs: ["real-estate", "healthcare"],
    impacts: [{ metricId: "urban-slum-share", gapShare: 0.07 }],
  },
  {
    id: "open-budgets",
    title: "Open budgets and contracts",
    summary: "Machine-readable budgets and contract awards the week they are signed.",
    projectId: "open-budgets",
    sectorSlugs: ["governance", "economy"],
    impacts: [{ metricId: "gdp-per-capita", gapShare: 0.07 }],
  },
  {
    id: "heritage-circuit",
    title: "Bookable heritage circuit",
    summary: "One calendar for parks, groves, and festivals with rangers and rooms that hold.",
    projectId: "heritage-circuit",
    sectorSlugs: ["tourism", "creative-economy"],
    impacts: [{ metricId: "tourism-receipts", gapShare: 0.22 }],
  },
  {
    id: "standards-lab",
    title: "Standards lab that can fail a product",
    summary: "Funded SON/NAFDAC testing with public pass/fail and recalls.",
    projectId: "standards-lab",
    sectorSlugs: ["manufacturing", "healthcare"],
    impacts: [{ metricId: "manufacturing-gdp", gapShare: 0.09 }],
  },
  {
    id: "brt-on-a-map",
    title: "Bus that exists on a map",
    summary: "Published routes, fares, and GTFS feeds in pilot cities.",
    projectId: "brt-on-a-map",
    sectorSlugs: ["transportation", "real-estate"],
    impacts: [{ metricId: "logistics-performance", gapShare: 0.1 }],
  },
  {
    id: "policy-skills-fund",
    title: "National skills fund (policy)",
    summary: "Federal matching grants for sector skills boards in manufacturing, health, and tech.",
    sectorSlugs: ["education", "economy"],
    impacts: [
      { metricId: "gdp-per-capita", gapShare: 0.06 },
      { metricId: "tertiary-enrollment", gapShare: 0.07 },
    ],
  },
  {
    id: "policy-renewables-mandate",
    title: "Renewables procurement mandate (policy)",
    summary: "DisCo purchase obligations for utility-scale solar and hydro with published tariffs.",
    sectorSlugs: ["energy", "governance"],
    impacts: [
      { metricId: "renewable-energy", gapShare: 0.12 },
      { metricId: "power-capacity", gapShare: 0.08 },
    ],
  },
];

export function getLeversForMetric(metricId: string): ComparatorLever[] {
  return COMPARATOR_LEVERS.filter((lever) =>
    lever.impacts.some((impact) => impact.metricId === metricId),
  );
}
