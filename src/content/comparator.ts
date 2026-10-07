import type { ComparatorMetric } from "@/types/content";

/**
 * Headline Now → 2050 metrics.
 * Baselines prefer Tier-1 series (UIS, NERC, WDI, GSMA, UN WPP).
 * 2050 base cases are editorial mid scenarios between multilateral projections
 * and national ambition (Agenda 2050 / ETP); low/high bounds are required where
 * no official 2050 series exists.
 */
export const COMPARATOR_METRICS: ComparatorMetric[] = [
  {
    id: "gdp-per-capita",
    label: "GDP per Capita",
    unit: "USD",
    /** Same WDI NY.GDP.PCAP.CD vintage as the G7 benchmark row (2022). */
    current: 2162,
    projected2050: 12500,
    projected2050Low: 8000,
    /** Nigeria Agenda 2050 aspirational end-period income. */
    projected2050High: 33300,
    sourceId: "world-bank-gdp-current-usd",
  },
  {
    id: "literacy-rate",
    label: "Adult Literacy Rate",
    unit: "%",
    current: 70.4,
    projected2050: 94,
    projected2050Low: 88,
    projected2050High: 97,
    sourceId: "unesco-literacy-nigeria",
  },
  {
    id: "power-capacity",
    label: "Installed Power Capacity",
    unit: "GW",
    current: 13.6,
    /** Mid path between IEA-style delivery build-out and ETP-scale ambition. */
    projected2050: 85,
    projected2050Low: 55,
    /** Energy Transition Plan solar-class ambition by 2050 (~209 GW solar). */
    projected2050High: 210,
    sourceId: "nerc-quarterly",
  },
  {
    id: "internet-penetration",
    label: "Regular Mobile Internet Use",
    unit: "%",
    current: 29,
    projected2050: 85,
    projected2050Low: 70,
    projected2050High: 95,
    sourceId: "gsma-nigeria-digital",
  },
  {
    id: "manufacturing-gdp",
    label: "Manufacturing Share of GDP",
    unit: "%",
    /** Same WDI NV.IND.MANF.ZS vintage as the G7 benchmark row (2022). */
    current: 8.9,
    projected2050: 22,
    projected2050Low: 15,
    projected2050High: 28,
    sourceId: "unido-manufacturing",
  },
  {
    id: "tertiary-enrollment",
    label: "Tertiary Enrollment Rate",
    unit: "%",
    /** Latest solid UIS/WDI observation for Nigeria (series is sparse after 2011). */
    current: 10.2,
    projected2050: 45,
    projected2050Low: 32,
    projected2050High: 55,
    sourceId: "unesco-tertiary-enrollment",
  },
  {
    id: "renewable-energy",
    label: "Renewable Energy Share",
    unit: "%",
    current: 18,
    projected2050: 65,
    projected2050Low: 50,
    /** Nigeria ETP renewable share by 2050 (excluding hydrogen). */
    projected2050High: 82,
    sourceId: "iea-nigeria-energy",
  },
  {
    id: "population",
    label: "Population",
    unit: "M",
    current: 238,
    /** UN WPP 2024 medium variant (~359.2M). */
    projected2050: 359,
    projected2050Low: 340,
    /** National high framing (NPC / Agenda / older federal materials). */
    projected2050High: 400,
    sourceId: "un-wpp-2024",
  },
  {
    id: "logistics-performance",
    label: "Logistics Performance Index",
    unit: "LPI",
    current: 2.6,
    projected2050: 3.5,
    projected2050Low: 2.9,
    projected2050High: 3.9,
    sourceId: "world-bank-lpi",
  },
  {
    id: "urban-slum-share",
    label: "Urban Population in Slums",
    unit: "%",
    current: 48.5,
    projected2050: 25,
    projected2050Low: 38,
    projected2050High: 15,
    sourceId: "world-bank-g7-indicators",
    higherIsBetter: false,
  },
  {
    id: "tourism-receipts",
    label: "International Tourism Receipts",
    unit: "USD bn",
    current: 1.47,
    projected2050: 12,
    projected2050Low: 6,
    projected2050High: 22,
    sourceId: "world-bank-tourism",
  },
];
