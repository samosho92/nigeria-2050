export interface NigeriaBasicFact {
  id: string;
  title: string;
  value: string;
  summary: string;
  href: string;
  sourceIds: string[];
  aliases: string[];
}

export const NIGERIA_BASICS_META = {
  title: "Nigeria quick facts",
  updated: "2026-08-19",
};

export const NIGERIA_BASIC_FACTS: NigeriaBasicFact[] = [
  {
    id: "country-name",
    title: "Official name",
    value: "Federal Republic of Nigeria",
    summary: "Nigeria's official name is the Federal Republic of Nigeria.",
    href: "/sources",
    sourceIds: ["nigeria-constitution-1999"],
    aliases: ["official name", "full name", "country name", "federal republic"],
  },
  {
    id: "state-count",
    title: "Number of states",
    value: "36 states and the Federal Capital Territory",
    summary:
      "Nigeria has 36 states and one Federal Capital Territory, Abuja.",
    href: "/sources",
    sourceIds: ["nigeria-constitution-1999"],
    aliases: ["how many states", "states", "fct", "federal capital territory"],
  },
  {
    id: "capital-city",
    title: "Capital city",
    value: "Abuja",
    summary: "Nigeria's capital city is Abuja.",
    href: "/sources",
    sourceIds: ["nigeria-constitution-1999"],
    aliases: ["capital", "capital city", "abuja"],
  },
  {
    id: "population",
    title: "Population",
    value: "About 227 million people (2024 estimate)",
    summary:
      "World Bank estimates Nigeria's 2024 population at about 227 million people.",
    href: "/sources",
    sourceIds: ["world-bank-population-total"],
    aliases: ["population", "how many people", "populous", "population size"],
  },
  {
    id: "gdp-current-usd",
    title: "GDP (current US dollars)",
    value: "See latest annual value on the World Bank indicator page",
    summary:
      "Nigeria's GDP is tracked yearly by the World Bank in current US dollars.",
    href: "/sources",
    sourceIds: ["world-bank-gdp-current-usd", "nbs-gdp-report-2024"],
    aliases: ["gdp", "economy size", "gross domestic product", "economic output"],
  },
  {
    id: "leadership",
    title: "Current federal leadership",
    value: "President Bola Ahmed Tinubu and Vice President Kashim Shettima",
    summary:
      "Current federal leadership is President Bola Ahmed Tinubu and Vice President Kashim Shettima.",
    href: "/sources",
    sourceIds: ["state-house-president-profile", "state-house-vice-president-profile"],
    aliases: ["president", "vice president", "current leadership", "leader", "government head"],
  },
];
