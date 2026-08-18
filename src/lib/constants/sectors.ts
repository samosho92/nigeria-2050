export const SECTORS = [
  {
    slug: "economy",
    title: "Economy & GDP",
    tagline: "Growth, diversification, and the shift beyond oil",
  },
  {
    slug: "security",
    title: "Security & Law and Order",
    tagline: "Crime trends, justice reform, and the path to a 2050 baseline",
  },
  {
    slug: "governance",
    title: "Governance & Institutions",
    tagline: "Electoral integrity, anti-corruption, and civic-tech",
  },
  {
    slug: "education",
    title: "Talent, Education & Human Capital",
    tagline: "Literacy, tertiary education, and brain-drain reversal",
  },
  {
    slug: "technology",
    title: "Technology & Innovation",
    tagline: "Lagos/Abuja tech ecosystem, fintech, and digital infrastructure",
  },
  {
    slug: "energy",
    title: "Energy & Infrastructure",
    tagline: "Power grid, renewables, transport, and urban infrastructure",
  },
] as const;

export type SectorSlug = (typeof SECTORS)[number]["slug"];

export const TIMELINE_ERAS = [
  "Pre-colonial",
  "Colonial & Amalgamation",
  "Independence",
  "First Republic & Coups",
  "Civil War",
  "Military Rule",
  "Return to Democracy",
  "Reform Era",
] as const;

export const APP_NAME = "Naija2050";
export const APP_TAGLINE = "Where Nigeria's History Meets Its Future";
