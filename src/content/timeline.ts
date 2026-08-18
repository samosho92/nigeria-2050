import type { TimelineEntry } from "@/types/content";

export const TIMELINE_ERAS = [
  {
    id: "pre-colonial",
    label: "Pre-colonial",
    period: "Before 1800s",
    artDirection: "pre-colonial" as const,
    description: "A plurality of kingdoms, empires, and city-states — not a single nation, but a rich tapestry of civilizations.",
  },
  {
    id: "colonial",
    label: "Colonial & Amalgamation",
    period: "1861–1960",
    artDirection: "colonial" as const,
    description: "British conquest, indirect rule, and the 1914 amalgamation that stitched north and south into one colony.",
  },
  {
    id: "independence",
    label: "Independence",
    period: "1960–1966",
    artDirection: "independence" as const,
    description: "Freedom at last — and the fragile optimism of Africa's most populous new republic.",
  },
  {
    id: "first-republic",
    label: "First Republic & Coups",
    period: "1966–1967",
    artDirection: "conflict" as const,
    description: "Political turbulence, ethnic tensions, and military intervention that shattered the young democracy.",
  },
  {
    id: "civil-war",
    label: "Civil War",
    period: "1967–1970",
    artDirection: "conflict" as const,
    description: "The Biafran conflict — a wound that still shapes Nigerian identity and politics.",
  },
  {
    id: "military-rule",
    label: "Military Rule",
    period: "1970–1999",
    artDirection: "military" as const,
    description: "Decades of coups, oil booms, busts, and deferred dreams under uniformed leadership.",
  },
  {
    id: "democracy",
    label: "Return to Democracy",
    period: "1999–2015",
    artDirection: "democracy" as const,
    description: "Civilian rule restored — imperfect, but enduring. A generation grew up knowing only elections.",
  },
  {
    id: "reform",
    label: "Reform Era",
    period: "2015–present",
    artDirection: "reform" as const,
    description: "Structural reforms, digital leapfrogging, and the foundations of the 2050 case.",
  },
] as const;

export type EraId = (typeof TIMELINE_ERAS)[number]["id"];

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: "benin-kingdom",
    era: "pre-colonial",
    title: "The Benin Kingdom",
    dateRange: "c. 1180–1897",
    summary: "One of West Africa's most sophisticated states, famed for bronze casting and urban planning.",
    content:
      "The Benin Kingdom (in present-day Edo State) was a highly organized monarchy with a capital city featuring wide streets and moats. Its bronze and brass artworks — many now in museums worldwide — represent one of Africa's greatest artistic traditions. Benin traded pepper, ivory, and palm products with European merchants long before colonial rule. The 1897 British punitive expedition destroyed much of the palace and looted thousands of artifacts — a loss still contested in restitution debates today.",
    relatedSectorSlugs: ["economy", "governance"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "pre-colonial",
  },
  {
    id: "sokoto-caliphate",
    era: "pre-colonial",
    title: "The Sokoto Caliphate",
    dateRange: "1804–1903",
    summary: "A vast Islamic empire spanning much of northern Nigeria, governing through emirates.",
    content:
      "Founded after the Fulani jihad led by Usman dan Fodio, the Sokoto Caliphate became one of the largest states in nineteenth-century Africa. It administered through a network of emirs, with Sharia courts, taxation systems, and trade routes connecting to North Africa. British colonial forces conquered the caliphate by 1903, but its institutional legacy — emirate governance, Islamic scholarship — persists in northern Nigerian politics and culture.",
    relatedSectorSlugs: ["governance", "education"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "pre-colonial",
  },
  {
    id: "oyo-empire",
    era: "pre-colonial",
    title: "The Oyo Empire",
    dateRange: "c. 1300–1836",
    summary: "A Yoruba empire whose cavalry and political sophistication dominated southwest Nigeria.",
    content:
      "Oyo was a constitutional monarchy with checks on royal power — the Alafin ruled alongside a council of nobles (Oyo Mesi) who could demand the king's suicide through ritual suicide (apo). Its cavalry dominated trade routes. The empire's collapse in the 1830s created power vacuums that reshaped Yorubaland, contributing to the conditions colonial Britain later exploited.",
    relatedSectorSlugs: ["governance", "security"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "pre-colonial",
  },
  {
    id: "1914-amalgamation",
    era: "colonial",
    title: "The 1914 Amalgamation",
    dateRange: "1914",
    summary: "Lord Lugard merges northern and southern protectorates into one colony — Nigeria is born on paper.",
    content:
      "British Governor-General Frederick Lugard combined the Colony and Protectorate of Southern Nigeria with the Protectorate of Northern Nigeria for administrative convenience and cost savings. The territories had different legal systems, education levels, and colonial experiences. No Nigerian was consulted. The amalgamation created the geographic Nigeria but not a unified national identity — a tension that echoes through every era since.",
    relatedSectorSlugs: ["governance", "economy"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "colonial",
  },
  {
    id: "colonial-economy",
    era: "colonial",
    title: "Colonial Economy & Cash Crops",
    dateRange: "1900–1960",
    summary: "Railways, cocoa, groundnuts, and palm oil — infrastructure built to extract, not develop.",
    content:
      "Colonial Nigeria's economy was structured for raw material export: cocoa from the west, groundnuts and cotton from the north, palm oil from the east. Railways ran from interior to ports, not connecting Nigerian regions to each other. Western education was limited; northern indirect rule preserved emirate structures. By independence, Nigeria had institutions designed for extraction — a pattern the 2050 diversification scenario explicitly seeks to reverse.",
    relatedSectorSlugs: ["economy", "energy"],
    sourceIds: ["world-bank-nigeria-overview", "cbo-nigeria-history"],
    artDirection: "colonial",
  },
  {
    id: "independence-1960",
    era: "independence",
    title: "Independence — October 1, 1960",
    dateRange: "1960",
    summary: "Nigeria becomes a sovereign federation. Nnamdi Azikiwe sworn in as Governor-General.",
    content:
      "On October 1, 1960, Nigeria gained independence from Britain as a federal republic of three regions (North, East, West) plus the Lagos Federal Territory. The moment was celebrated across the country and the diaspora — Africa's most populous nation was free. The First Republic's constitution balanced regional autonomy with a weak center, a design that would prove unstable as oil wealth and ethnic competition intensified.",
    relatedSectorSlugs: ["governance", "economy"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "independence",
  },
  {
    id: "oil-discovery",
    era: "independence",
    title: "Commercial Oil Discovery",
    dateRange: "1956–1970s",
    summary: "Oil transforms Nigeria's economic calculus — blessing and curse in one.",
    content:
      "Commercial quantities of oil were discovered in Oloibiri, Bayelsa State, in 1956. By the 1970s oil boom, petroleum dominated federal revenue — rising from under 10% of exports in 1960 to over 80% by 1975. Oil concentrated wealth at the federal center, reduced incentive to diversify, and fueled corruption and conflict in the Niger Delta. Every 2050 economic scenario assumes breaking this dependency.",
    relatedSectorSlugs: ["economy", "energy", "security"],
    sourceIds: ["world-bank-nigeria-overview", "nbs-gdp-report-2024"],
    artDirection: "independence",
  },
  {
    id: "1966-coups",
    era: "first-republic",
    title: "The 1966 Coups",
    dateRange: "January–July 1966",
    summary: "Two coups in six months end the First Republic and trigger a chain of violence.",
    content:
      "In January 1966, Major Kaduna Nzeogwu led a coup killing Prime Minister Abubakar Tafawa Balewa and northern leaders. General Aguiyi-Ironsi took power but was overthrown in July by northern officers. The coups were interpreted through ethnic lenses — Igbo officers in the first, northern officers in the second — and pogroms against Igbo people in the north followed. An estimated 30,000–100,000 people were killed. The republic was dead; the road to war had opened.",
    relatedSectorSlugs: ["governance", "security"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "conflict",
  },
  {
    id: "civil-war-1967",
    era: "civil-war",
    title: "The Civil War Begins",
    dateRange: "1967–1970",
    summary: "Biafra declares independence. Three years of war, blockade, and humanitarian crisis.",
    content:
      "In May 1967, Colonel Odumegwu Ojukwu declared the Republic of Biafra in Nigeria's southeast, citing Igbo safety and self-determination. Federal forces blockaded Biafra; famine killed an estimated 1–3 million people, many children. The war ended in January 1970 with federal victory and a 'no victor, no vanquished' policy. Naija2050 presents this history with gravity: multiple credible sources, acknowledgment of human cost, and no adoption of a single partisan narrative.",
    relatedSectorSlugs: ["security", "governance"],
    sourceIds: ["cbo-nigeria-history", "sipri-security-africa"],
    artDirection: "conflict",
    reviewStatus: "pending-review",
  },
  {
    id: "post-war-reconstruction",
    era: "civil-war",
    title: "Post-War Reconstruction",
    dateRange: "1970–1975",
    summary: "Gowon's reconciliation policy and the oil boom that followed.",
    content:
      "General Yakubu Gowon's '3Rs' — Reconstruction, Rehabilitation, Reintegration — aimed to heal divisions. The 1970s oil boom flooded the treasury: the 'Udoji Award' doubled civil service salaries overnight. But infrastructure investment lagged, import dependency grew, and industrial policy was inconsistent. The seeds of today's governance challenges — patronage networks, weak institutions — were planted in this era of apparent abundance.",
    relatedSectorSlugs: ["economy", "governance"],
    sourceIds: ["world-bank-nigeria-overview"],
    artDirection: "conflict",
  },
  {
    id: "military-decades",
    era: "military-rule",
    title: "Decades Under Military Rule",
    dateRange: "1975–1999",
    summary: "A succession of coups, dictators, and aborted transitions.",
    content:
      "From Murtala Mohammed's brief reformist interlude to Babangida's structural adjustment and Abacha's brutal dictatorship, Nigeria spent most of 1975–1999 under military governments. Elections were cancelled (1993's June 12 election being the most consequential). Civil society was suppressed. Yet this era also saw the emergence of a bold press, pro-democracy movements, and diaspora activism that would prove decisive in the return to civilian rule.",
    relatedSectorSlugs: ["governance", "security"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "military",
  },
  {
    id: "structural-adjustment",
    era: "military-rule",
    title: "Structural Adjustment (SAP)",
    dateRange: "1986–1990s",
    summary: "IMF-mandated reforms bite — devaluation, subsidy cuts, social pain.",
    content:
      "Under Babangida, Nigeria adopted IMF/World Bank Structural Adjustment Programs: currency devaluation, removal of agricultural subsidies, privatization of state enterprises. The naira collapsed; middle-class savings evaporated; universities deteriorated. The reforms were economically rational by textbook standards but socially devastating — fueling the brain drain and informal economy that 2050 scenarios assume gradually formalizing.",
    relatedSectorSlugs: ["economy", "education"],
    sourceIds: ["world-bank-nigeria-overview", "mckinsey-nigeria-2050"],
    artDirection: "military",
  },
  {
    id: "democracy-1999",
    era: "democracy",
    title: "Return to Civilian Rule",
    dateRange: "1999",
    summary: "Olusegun Obasanjo elected president. The Fourth Republic begins.",
    content:
      "After Abacha's death in 1998, General Abdulsalami Abubakar handed power to civilians. Olusegun Obasanjo — a former military head of state turned democrat — won the 1999 election. For the first time in a generation, Nigerians could vote out their leaders. The transition was imperfect: military elites retained influence, electoral fraud persisted, but the principle of civilian supremacy held for 25+ years — a precondition for every governance projection on this site.",
    relatedSectorSlugs: ["governance", "security"],
    sourceIds: ["cbo-nigeria-history"],
    artDirection: "democracy",
  },
  {
    id: "telecom-revolution",
    era: "democracy",
    title: "The Mobile Revolution",
    dateRange: "2001–2010",
    summary: "GSM licenses unleash Africa's largest mobile market.",
    content:
      "Nigeria's 2001 GSM auction broke NITEL's monopoly. Within a decade, mobile subscriptions exceeded 100 million — leapfrogging fixed-line infrastructure entirely. Mobile money, social media, and e-commerce followed. This digital foundation — built without waiting for legacy infrastructure — is the template for the technology sector's 2050 vision and explains why fintech, not factories, led Nigeria's first tech wave.",
    relatedSectorSlugs: ["technology", "economy"],
    sourceIds: ["gsma-nigeria-digital"],
    artDirection: "democracy",
  },
  {
    id: "reform-era",
    era: "reform",
    title: "The Reform Era Begins",
    dateRange: "2015–2020",
    summary: "Exchange rate unification attempts, subsidy debates, and institutional rebuilding.",
    content:
      "Multiple administrations pursued structural reforms: Treasury Single Account (TSA), bank verification (BVN), ghost worker purges, and partial fuel subsidy removal. Progress was uneven and politically costly — but the direction was clear: Nigeria could not reach 2050 targets without fixing fiscal leakages, power sector bottlenecks, and regulatory uncertainty. These reforms, however incomplete, anchor the 'base case' scenario assumptions.",
    relatedSectorSlugs: ["governance", "economy", "energy"],
    sourceIds: ["agenda-2050-npc", "heritage-economic-freedom"],
    artDirection: "reform",
  },
  {
    id: "fintech-boom",
    era: "reform",
    title: "The Fintech Explosion",
    dateRange: "2016–present",
    summary: "Paystack, Flutterwave, and a generation of builders put Nigeria on the global tech map.",
    content:
      "Nigeria became Africa's startup capital: fintech unicorns, Y Combinator alumni, and VC inflows exceeding $1B annually at peak. Paystack's acquisition by Stripe in 2020 signaled global recognition. The sector faces headwinds — FX scarcity, regulatory shifts — but the talent base, diaspora networks, and domestic market size make technology the most credible non-oil growth story in every major 2050 projection.",
    relatedSectorSlugs: ["technology", "economy", "education"],
    sourceIds: ["gsma-nigeria-digital", "mckinsey-nigeria-2050"],
    artDirection: "reform",
  },
  {
    id: "agenda-2050",
    era: "reform",
    title: "Nigeria Agenda 2050",
    dateRange: "2022",
    summary: "The government's own long-range plan — top-20 economy, $4T GDP.",
    content:
      "The National Planning Commission published Agenda 2050, targeting a $4.5 trillion economy and top-20 global ranking by 2050. The plan assumes 7%+ sustained growth, massive infrastructure investment, and human capital development. Naija2050 treats this as one input among many — not gospel — and stress-tests its assumptions against World Bank, McKinsey, and PwC scenarios, which range from optimistic to cautious.",
    relatedSectorSlugs: ["economy", "energy", "education", "governance"],
    sourceIds: ["agenda-2050-npc", "mckinsey-nigeria-2050", "pwc-nigeria-2050"],
    artDirection: "reform",
  },
];

export function getTimelineEntryById(id: string): TimelineEntry | undefined {
  return TIMELINE_ENTRIES.find((e) => e.id === id);
}

export function getTimelineEntriesByEra(eraId: string): TimelineEntry[] {
  return TIMELINE_ENTRIES.filter((e) => e.era === eraId);
}

export function getEraById(id: string) {
  return TIMELINE_ERAS.find((e) => e.id === id);
}
