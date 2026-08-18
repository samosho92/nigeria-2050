import type { G7BenchmarkMetric, G7CountryCode } from "@/types/content";
import { PHASE2_G7_METRICS } from "./phase2/g7-metrics";

export const G7_COUNTRY_CODES: G7CountryCode[] = ["CA", "FR", "DE", "IT", "JP", "GB", "US"];

export const G7_COUNTRY_LABELS: Record<G7CountryCode, string> = {
  CA: "Canada",
  FR: "France",
  DE: "Germany",
  IT: "Italy",
  JP: "Japan",
  GB: "United Kingdom",
  US: "United States",
};

/** @deprecated Use G7_COUNTRY_LABELS — kept for prose copy. */
export const G7_COUNTRIES = G7_COUNTRY_CODES.map((code) => G7_COUNTRY_LABELS[code]);

export function computeG7Average(g7Countries: Record<G7CountryCode, number>): number {
  const values = G7_COUNTRY_CODES.map((code) => g7Countries[code]);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function getG7Average(metric: G7BenchmarkMetric): number {
  return computeG7Average(metric.g7Countries);
}

export function getG7Leader(metric: G7BenchmarkMetric): {
  code: G7CountryCode;
  value: number;
} {
  let leader: G7CountryCode = "CA";
  let leaderValue = metric.g7Countries[leader];

  for (const code of G7_COUNTRY_CODES) {
    const value = metric.g7Countries[code];
    const isBetter = metric.higherIsBetter
      ? value > leaderValue
      : value < leaderValue;
    if (isBetter) {
      leader = code;
      leaderValue = value;
    }
  }

  return { code: leader, value: leaderValue };
}

/**
 * Nigeria vs G7 — one indicator definition, one reference year per row.
 * Values are rounded from public datasets (World Bank WDI, UNESCO, IEA, etc.).
 */
export const G7_BENCHMARK_METRICS: G7BenchmarkMetric[] = [
  // ── Economy (World Bank WDI, reference year 2022) ───────────────────────────
  {
    id: "gdp-per-capita",
    sectorSlug: "economy",
    label: "GDP per Capita",
    definition: "GDP per capita, current US dollars — same WDI series for all countries.",
    unit: "USD",
    referenceYear: 2022,
    nigeria: 2162,
    g7Countries: { CA: 55252, FR: 42659, DE: 48718, IT: 35551, JP: 34017, GB: 46125, US: 76399 },
    nigeria2050: 12500,
    higherIsBetter: true,
    sourceId: "world-bank-g7-indicators",
    sourceSeries: "WDI · NY.GDP.PCAP.CD",
    context: "Even Nigeria's 2050 base-case projection sits below Italy's 2022 level.",
  },
  {
    id: "manufacturing-share",
    sectorSlug: "economy",
    label: "Manufacturing Value Added",
    definition: "Manufacturing, value added (% of GDP) — identical national-accounts definition.",
    unit: "% of GDP",
    referenceYear: 2022,
    nigeria: 8.9,
    g7Countries: { CA: 9.8, FR: 9.5, DE: 18.7, IT: 15.1, JP: 19.4, GB: 8.7, US: 10.9 },
    nigeria2050: 22,
    higherIsBetter: true,
    sourceId: "world-bank-g7-indicators",
    sourceSeries: "WDI · NV.IND.MANF.ZS",
  },
  {
    id: "exports-gdp",
    sectorSlug: "economy",
    label: "Exports of Goods & Services",
    definition: "Exports of goods and services (% of GDP) — total trade openness, comparable across oil and non-oil economies.",
    unit: "% of GDP",
    referenceYear: 2022,
    nigeria: 14.2,
    g7Countries: { CA: 33.5, FR: 31.5, DE: 47.9, IT: 31.8, JP: 18.4, GB: 33.0, US: 11.5 },
    higherIsBetter: true,
    sourceId: "world-bank-g7-indicators",
    sourceSeries: "WDI · NE.EXP.GNFS.ZS",
    context: "Same indicator for all — not oil-specific; captures overall trade integration.",
  },

  // ── Technology ─────────────────────────────────────────────────────────────
  {
    id: "internet-penetration",
    sectorSlug: "technology",
    label: "Individuals Using the Internet",
    definition: "Individuals using the Internet (% of population) — ITU/World Bank harmonized series.",
    unit: "%",
    referenceYear: 2022,
    nigeria: 55.4,
    g7Countries: { CA: 93.9, FR: 85.3, DE: 92.5, IT: 84.6, JP: 83.1, GB: 96.4, US: 92.0 },
    nigeria2050: 98,
    higherIsBetter: true,
    sourceId: "world-bank-g7-indicators",
    sourceSeries: "WDI · IT.NET.USER.ZS",
  },
  {
    id: "fixed-broadband",
    sectorSlug: "technology",
    label: "Fixed Broadband Subscriptions",
    definition: "Fixed broadband subscriptions per 100 inhabitants — ITU standard definition.",
    unit: "per 100 people",
    referenceYear: 2022,
    nigeria: 1.9,
    g7Countries: { CA: 38.1, FR: 46.2, DE: 42.0, IT: 30.5, JP: 33.8, GB: 40.7, US: 37.9 },
    higherIsBetter: true,
    sourceId: "itu-digital-indicators",
    sourceSeries: "ITU · Fixed broadband subscriptions",
    context: "Mobile leapfrogging masks a fixed-line infrastructure chasm.",
  },
  {
    id: "rd-spending",
    sectorSlug: "technology",
    label: "R&D Expenditure",
    definition: "Research and development expenditure (% of GDP) — UNESCO/OECD harmonized; 2021 is the latest common reporting year for all eight countries.",
    unit: "% of GDP",
    referenceYear: 2021,
    nigeria: 0.13,
    g7Countries: { CA: 1.71, FR: 2.22, DE: 3.13, IT: 1.46, JP: 3.27, GB: 2.9, US: 3.45 },
    higherIsBetter: true,
    sourceId: "world-bank-g7-indicators",
    sourceSeries: "WDI · GB.XPD.RSDV.GD.ZS",
    context: "Nigeria invests roughly 1/20th of the G7 average in research.",
  },

  // ── Governance ─────────────────────────────────────────────────────────────
  {
    id: "corruption-index",
    sectorSlug: "governance",
    label: "Corruption Perceptions Index Rank",
    definition: "Transparency International CPI rank (1 = least corrupt) — 2023 edition, all countries measured in the same survey wave.",
    unit: "global rank",
    referenceYear: 2023,
    nigeria: 145,
    g7Countries: { CA: 12, FR: 20, DE: 9, IT: 42, JP: 18, GB: 20, US: 24 },
    nigeria2050: 50,
    higherIsBetter: false,
    sourceId: "transparency-corruption-index",
    sourceSeries: "Transparency International · CPI 2023",
    context: "Lower rank is better. Every G7 nation sits in the top quartile; Nigeria in the bottom third.",
  },
  {
    id: "govt-effectiveness",
    sectorSlug: "governance",
    label: "Government Effectiveness",
    definition: "World Bank Worldwide Governance Indicators — government effectiveness estimate (range −2.5 to +2.5), 2022 percentile data.",
    unit: "WGI score",
    referenceYear: 2022,
    nigeria: -0.85,
    g7Countries: { CA: 1.7, FR: 1.28, DE: 1.55, IT: 0.38, JP: 1.74, GB: 1.52, US: 1.09 },
    higherIsBetter: true,
    sourceId: "world-bank-g7-indicators",
    sourceSeries: "WGI · Government Effectiveness Estimate",
  },
  {
    id: "open-budget-index",
    sectorSlug: "governance",
    label: "Open Budget Index Score",
    definition: "International Budget Partnership Open Budget Survey score (/100) — 2021 survey round, identical questionnaire for all countries.",
    unit: "/100",
    referenceYear: 2021,
    nigeria: 45,
    g7Countries: { CA: 86, FR: 79, DE: 81, IT: 74, JP: 60, GB: 79, US: 89 },
    higherIsBetter: true,
    sourceId: "international-budget-partnership",
    sourceSeries: "IBP · Open Budget Survey 2021",
  },

  // ── Education & human capital ────────────────────────────────────────────
  {
    id: "literacy",
    sectorSlug: "education",
    label: "Adult Literacy Rate",
    definition: "Literacy rate, adult total (% of people ages 15 and above) — UNESCO UIS harmonized series.",
    unit: "%",
    referenceYear: 2022,
    nigeria: 62,
    g7Countries: { CA: 99, FR: 99, DE: 99, IT: 99, JP: 99, GB: 99, US: 99 },
    nigeria2050: 94,
    higherIsBetter: true,
    sourceId: "unesco-literacy-nigeria",
    sourceSeries: "UIS · SE.ADT.LITR.ZS",
    context: "Roughly 80 million Nigerian adults lack functional literacy at today's rate.",
  },
  {
    id: "tertiary-enrollment",
    sectorSlug: "education",
    label: "Gross Tertiary Enrollment",
    definition: "School enrollment, tertiary (% gross) — same UNESCO definition including all tertiary institutions.",
    unit: "% gross",
    referenceYear: 2022,
    nigeria: 12.3,
    g7Countries: { CA: 68, FR: 65, DE: 70, IT: 62, JP: 63, GB: 66, US: 88 },
    nigeria2050: 45,
    higherIsBetter: true,
    sourceId: "undp-hdi-nigeria",
    sourceSeries: "UIS · SE.TER.ENRR",
  },
  {
    id: "doctors-per-capita",
    sectorSlug: "education",
    label: "Physicians per 1,000 People",
    definition: "Physicians per 1,000 people — WHO Global Health Workforce Statistics, same clinical definition.",
    unit: "physicians",
    referenceYear: 2022,
    nigeria: 0.38,
    g7Countries: { CA: 2.48, FR: 3.34, DE: 4.28, IT: 4.09, JP: 2.61, GB: 3.08, US: 2.64 },
    higherIsBetter: true,
    sourceId: "who-health-workforce",
    sourceSeries: "WHO · Health workforce density",
    context: "Nigeria would need 350,000+ additional doctors to match the G7 average ratio.",
  },
  {
    id: "education-spending",
    sectorSlug: "education",
    label: "Public Education Spending",
    definition: "Government expenditure on education, total (% of GDP) — UNESCO Institute for Statistics, 2021 latest common year.",
    unit: "% of GDP",
    referenceYear: 2021,
    nigeria: 1.68,
    g7Countries: { CA: 5.0, FR: 5.4, DE: 4.7, IT: 4.1, JP: 3.1, GB: 5.2, US: 5.0 },
    higherIsBetter: true,
    sourceId: "unesco-education-spending",
    sourceSeries: "UIS · SE.XPD.TOTL.GD.ZS",
  },

  // ── Energy & infrastructure ────────────────────────────────────────────────
  {
    id: "electricity-per-capita",
    sectorSlug: "energy",
    label: "Electric Power Consumption per Capita",
    definition: "Electric power consumption (kWh per capita) — IEA/World Bank harmonized; 2021 latest common year.",
    unit: "kWh/year",
    referenceYear: 2021,
    nigeria: 150,
    g7Countries: { CA: 14700, FR: 7100, DE: 6800, IT: 4800, JP: 7800, GB: 4600, US: 12000 },
    nigeria2050: 2400,
    higherIsBetter: true,
    sourceId: "iea-nigeria-energy",
    sourceSeries: "WDI · EG.USE.ELEC.KH.PC",
    context: "A Nigerian uses less power in a year than a G7 citizen uses in two weeks.",
  },
  {
    id: "grid-access",
    sectorSlug: "energy",
    label: "Access to Electricity",
    definition: "Access to electricity (% of population) — World Bank ESMAP harmonized definition.",
    unit: "%",
    referenceYear: 2022,
    nigeria: 62,
    g7Countries: { CA: 100, FR: 100, DE: 100, IT: 100, JP: 100, GB: 100, US: 100 },
    nigeria2050: 98,
    higherIsBetter: true,
    sourceId: "world-bank-g7-indicators",
    sourceSeries: "WDI · EG.ELC.ACCS.ZS",
  },
  {
    id: "renewable-share",
    sectorSlug: "energy",
    label: "Renewable Electricity Output",
    definition: "Renewable electricity output (% of total electricity output) — same IEA/WDI series.",
    unit: "%",
    referenceYear: 2022,
    nigeria: 18,
    g7Countries: { CA: 67, FR: 25, DE: 46, IT: 42, JP: 22, GB: 42, US: 21 },
    nigeria2050: 65,
    higherIsBetter: true,
    sourceId: "iea-nigeria-energy",
    sourceSeries: "WDI · EG.ELC.RNEW.ZS",
  },

  // ── Security ─────────────────────────────────────────────────────────────
  {
    id: "peace-index",
    sectorSlug: "security",
    label: "Global Peace Index Rank",
    definition: "Institute for Economics & Peace GPI rank (1 = most peaceful) — 2024 edition, all countries in the same release.",
    unit: "global rank",
    referenceYear: 2024,
    nigeria: 144,
    g7Countries: { CA: 11, FR: 62, DE: 22, IT: 33, JP: 17, GB: 28, US: 131 },
    nigeria2050: 100,
    higherIsBetter: false,
    sourceId: "global-peace-index",
    sourceSeries: "IEP · Global Peace Index 2024",
    context: "Lower is better. The US ranks lower than other G7 peers on this index.",
  },
  {
    id: "homicide-rate",
    sectorSlug: "security",
    label: "Homicide Rate",
    definition: "Intentional homicides per 100,000 population — UNODC harmonized crime statistics, 2021 reporting year for all countries.",
    unit: "per 100k",
    referenceYear: 2021,
    nigeria: 9.4,
    g7Countries: { CA: 2.1, FR: 1.3, DE: 0.8, IT: 0.5, JP: 0.2, GB: 1.2, US: 6.4 },
    higherIsBetter: false,
    sourceId: "unodc-crime-stats",
    sourceSeries: "UNODC · Intentional homicide rate",
  },
  ...PHASE2_G7_METRICS,
];

export function getG7MetricsBySector(sectorSlug: string): G7BenchmarkMetric[] {
  return G7_BENCHMARK_METRICS.filter((metric) => metric.sectorSlug === sectorSlug);
}

export function getG7SectorSlugs(): string[] {
  return [...new Set(G7_BENCHMARK_METRICS.map((m) => m.sectorSlug))];
}

/** Multiplier showing how far Nigeria is from G7 average (always ≥ 1). */
export function g7GapMultiplier(metric: G7BenchmarkMetric): number {
  const g7Average = getG7Average(metric);
  if (metric.nigeria === 0 && g7Average === 0) return 1;
  if (metric.higherIsBetter) {
    if (metric.nigeria <= 0) return 99;
    return g7Average / metric.nigeria;
  }
  if (g7Average <= 0) return 99;
  return metric.nigeria / g7Average;
}

export function formatBenchmarkValue(value: number, unit: string): string {
  if (unit === "USD") return `$${Math.round(value).toLocaleString()}`;
  if (unit === "%" || unit === "% of GDP" || unit === "% gross") return `${value}%`;
  if (unit === "WGI score") return value.toFixed(2);
  if (unit === "/100") return `${value}/100`;
  if (unit === "global rank") return `#${Math.round(value)}`;
  if (unit === "per 100k") return `${value} per 100k`;
  if (unit === "kWh/year") return `${Math.round(value).toLocaleString()} kWh`;
  if (unit === "physicians") return value.toFixed(2);
  if (unit === "per 100 people") return `${value} per 100`;
  if (unit === "per 1,000 people") return `${Math.round(value).toLocaleString()} per 1,000`;
  if (unit === "score 1–5") return value.toFixed(1);
  return `${value.toLocaleString()} ${unit}`;
}

export function formatGapLabel(multiplier: number): string {
  if (multiplier >= 10) return `${Math.round(multiplier)}×`;
  if (multiplier >= 2) return `${multiplier.toFixed(1)}×`;
  return `${multiplier.toFixed(2)}×`;
}

/** All rows in a dataset share this reference year — shown in page header. */
export function getBenchmarkYearRange(): { earliest: number; latest: number } {
  const years = G7_BENCHMARK_METRICS.map((m) => m.referenceYear);
  return { earliest: Math.min(...years), latest: Math.max(...years) };
}
