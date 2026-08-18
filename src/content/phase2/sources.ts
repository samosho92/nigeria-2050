import type { Source } from "@/types/content";

export const PHASE2_RAW_SOURCES: Source[] = [
  {
    id: "who-nigeria-health",
    title: "Nigeria Health Profile & UHC Monitoring",
    publisher: "World Health Organization",
    year: 2024,
    url: "https://www.who.int/countries/nga",
  },
  {
    id: "fao-nigeria-agriculture",
    title: "Nigeria at a Glance — Food & Agriculture",
    publisher: "FAO",
    year: 2024,
    url: "https://www.fao.org/nigeria",
  },
  {
    id: "unesco-creative-economy",
    title: "Culture & Creative Industries Outlook",
    publisher: "UNESCO",
    year: 2024,
    url: "https://www.unesco.org",
  },
  {
    id: "unido-manufacturing",
    title: "Industrial Development Report — Africa",
    publisher: "UNIDO",
    year: 2023,
    url: "https://www.unido.org",
  },
  {
    id: "world-bank-financial-inclusion",
    title: "Global Findex — Nigeria",
    publisher: "World Bank",
    year: 2024,
    url: "https://www.worldbank.org/en/publication/globalfindex",
  },
  {
    id: "afdb-agriculture",
    title: "Feed Africa Strategy — Nigeria Country Brief",
    publisher: "African Development Bank",
    year: 2023,
    url: "https://www.afdb.org",
  },
  {
    id: "nollywood-industry-report",
    title: "Nigerian Film & Music Industry Economic Impact",
    publisher: "PwC Entertainment & Media Outlook",
    year: 2024,
    url: "https://www.pwc.com/ng",
  },
  {
    id: "cbn-financial-access",
    title: "Financial Inclusion Statistics",
    publisher: "Central Bank of Nigeria",
    year: 2024,
    url: "https://www.cbn.gov.ng",
  },
];

export const PHASE2_SOURCE_META: Record<string, Pick<Source, "sectors" | "eras">> = {
  "who-nigeria-health": { sectors: ["healthcare"] },
  "fao-nigeria-agriculture": { sectors: ["agriculture"], eras: ["pre-colonial", "colonial"] },
  "unesco-creative-economy": { sectors: ["creative-economy"] },
  "unido-manufacturing": { sectors: ["manufacturing"], eras: ["military-rule"] },
  "world-bank-financial-inclusion": { sectors: ["financial-inclusion"], eras: ["reform"] },
  "afdb-agriculture": { sectors: ["agriculture"] },
  "nollywood-industry-report": { sectors: ["creative-economy"], eras: ["democracy"] },
  "cbn-financial-access": { sectors: ["financial-inclusion", "technology"] },
};
