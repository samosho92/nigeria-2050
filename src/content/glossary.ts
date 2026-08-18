import type { GlossaryTerm } from "@/types/content";

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "GDP",
    definition:
      "Gross Domestic Product — the total value of goods and services produced in a country in a year. Often divided by population to get GDP per capita, a rough measure of average economic output per person.",
  },
  {
    term: "Amalgamation",
    definition:
      "The 1914 merger of the Northern and Southern Protectorates of Nigeria by British colonial authorities, creating the geographic entity that became independent Nigeria in 1960.",
  },
  {
    term: "Biafra",
    definition:
      "The secessionist state declared in 1967 in Nigeria's southeast during the Civil War (1967–1970). The conflict ended with federal victory; the name remains politically and emotionally significant.",
  },
  {
    term: "Brain drain",
    definition:
      "The emigration of highly educated or skilled workers to other countries. Nigeria has experienced significant brain drain; the 2050 scenario assumes partial reversal as domestic opportunities expand.",
  },
  {
    term: "NBS",
    definition:
      "National Bureau of Statistics — Nigeria's official statistical agency, responsible for GDP, inflation, employment, and demographic data.",
  },
  {
    term: "Informal economy",
    definition:
      "Economic activity not regulated or taxed by the state — street vendors, unregistered businesses, cash-only trade. Estimates suggest 50–65% of Nigeria's workforce operates informally.",
  },
  {
    term: "Fintech",
    definition:
      "Financial technology — digital payment, lending, and banking services. Nigeria's fintech sector (Paystack, Flutterwave, OPay) is among Africa's largest.",
  },
  {
    term: "Grid capacity",
    definition:
      "The maximum amount of electricity Nigeria's power infrastructure can generate and distribute at once. Chronic shortfall between installed capacity and actual delivery is a major constraint.",
  },
  {
    term: "Scenario projection",
    definition:
      "A modeled future outcome based on stated assumptions — not a prediction. Naija2050 projections show what could happen if specific reforms and trends continue.",
  },
  {
    term: "Structural reform",
    definition:
      "Deep changes to institutions, regulations, or economic architecture — not one-off policies. Examples include exchange-rate unification, subsidy removal, and civil service digitization.",
  },
  {
    term: "Diversification",
    definition:
      "Reducing dependence on a single revenue source (historically oil for Nigeria) by growing agriculture, manufacturing, services, and technology exports.",
  },
  {
    term: "Civic-tech",
    definition:
      "Technology tools that improve citizen engagement with government — election monitoring apps, budget transparency portals, and digital public service delivery.",
  },
  {
    term: "LPI",
    definition:
      "Logistics Performance Index — a World Bank score (1–5) combining customs, infrastructure, international shipments, logistics quality, tracking, and timeliness. Nigeria scored 2.6 in the 2023 LPI (rank 88). The transportation 2050 figure of 3.5 is a Naija2050 scenario, not a World Bank forecast.",
    relatedSlugs: ["transportation", "economy"],
  },
  {
    term: "BRT",
    definition:
      "Bus Rapid Transit — high-capacity buses on dedicated lanes with prepaid fares. Lagos launched Africa's first full BRT in 2008; 2050 urban-transit scenarios assume similar protected corridors in Abuja and Kano.",
    relatedSlugs: ["transportation"],
  },
  {
    term: "Standard-gauge rail",
    definition:
      "Railway built to the 1,435 mm international gauge, as opposed to the colonial narrow-gauge network. Abuja–Kaduna (2016) and Lagos–Ibadan (2021) are Nigeria's modern standard-gauge passenger lines; the 2050 case assumes a Lagos–Kano freight-and-passenger spine.",
    relatedSlugs: ["transportation", "energy"],
  },
];

export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
  return GLOSSARY.find((g) => g.term.toLowerCase() === term.toLowerCase());
}
