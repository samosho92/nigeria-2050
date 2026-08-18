import type { Sector } from "@/types/content";

export const SECTORS: Sector[] = [
  {
    slug: "economy",
    title: "Economy & GDP",
    tagline: "Growth, diversification, and the shift beyond oil",
    headline2050:
      "Africa's largest economy by output — diversified, industrialized, and no longer hostage to oil prices.",
    baseline: {
      gdp: "$450B",
      gdpPerCapita: "$2,200",
      oilShareOfExports: "85%",
      manufacturingShare: "9%",
      informalEconomyShare: "~58%",
    },
    scenarioRanges: [
      { label: "GDP per capita (2050)", unit: "USD", low: 8000, base: 12500, high: 18000 },
      { label: "Total GDP (2050)", unit: "USD T", low: "2.8", base: "4.2", high: "5.5" },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "The Diversification Decade Begins",
        narrative:
          "Non-oil exports exceed 40% of total for the first time. Agriculture processing and fintech services lead growth. GDP crosses $800B as population hits 280M.",
        metrics: { gdp: "$820B", gdpPerCapita: "$2,900", manufacturingShare: "12%" },
      },
      {
        year: 2040,
        headline: "Industrial Base Takes Shape",
        narrative:
          "Special economic zones in Lagos, Kano, and Port Harcourt anchor a manufacturing corridor. Services and industry each contribute more to GDP than oil. Per-capita income triples from 2024 levels.",
        metrics: { gdp: "$1.8T", gdpPerCapita: "$5,800", manufacturingShare: "18%" },
      },
      {
        year: 2050,
        headline: "Top-15 Global Economy",
        narrative:
          "Nigeria ranks among the world's 15 largest economies. Oil is less than 15% of exports. A growing middle class of 120M+ drives domestic consumption. Informal sector largely formalized through digital payments and simplified tax regimes.",
        metrics: { gdp: "$4.2T", gdpPerCapita: "$12,500", manufacturingShare: "22%" },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "oil-discovery",
        title: "Oil Discovery & Dependency",
        summary: "How a 1956 find in Oloibiri shaped — and constrained — every economic decision since.",
      },
      {
        timelineEntryId: "structural-adjustment",
        title: "Structural Adjustment",
        summary: "The 1980s–90s reforms that hurt in the short term but planted seeds of a market economy.",
      },
      {
        timelineEntryId: "fintech-boom",
        title: "The Fintech Explosion",
        summary: "Digital finance as the first credible non-oil growth engine at scale.",
      },
    ],
    assumptions: [
      "Sustained GDP growth of 6–8% annually for two decades",
      "Successful power sector reform enabling industrial growth",
      "Continued FDI in manufacturing and technology",
      "Exchange rate policy that rewards exporters",
      "Formalization of 50%+ of the informal economy via digital rails",
    ],
    risks: [
      "Oil price collapse before diversification completes",
      "Security crises disrupting agricultural and industrial zones",
      "Policy reversals on subsidy reform and trade openness",
      "Population growth outpacing job creation",
    ],
    sourceIds: [
      "world-bank-nigeria-overview",
      "nbs-gdp-report-2024",
      "mckinsey-nigeria-2050",
      "pwc-nigeria-2050",
      "agenda-2050-npc",
    ],
  },
  {
    slug: "technology",
    title: "Technology & Innovation",
    tagline: "Lagos/Abuja tech ecosystem, fintech, and digital infrastructure",
    headline2050:
      "Africa's Silicon Valley — exporting software, fintech, and AI talent to the world while serving 400M at home.",
    baseline: {
      techHubRank: "#1 in Africa",
      startupFunding2024: "$1.2B",
      developers: "120,000+",
      internetPenetration: "55%",
      fintechUsers: "70M+",
    },
    scenarioRanges: [
      { label: "Internet penetration (2050)", unit: "%", low: 92, base: 98, high: 99 },
      { label: "Tech contribution to GDP (2050)", unit: "%", low: 12, base: 18, high: 24 },
    ],
    reviewStatus: "reviewed",
    projections: [
      {
        year: 2030,
        headline: "The Infrastructure Catch-Up",
        narrative:
          "5G covers all state capitals. Data costs drop 60%. Nigeria produces 50,000 new software engineers annually. Three more unicorns emerge in health-tech and climate-tech.",
        metrics: { internetPenetration: "78%", developers: "350,000", startupFunding: "$3.5B" },
      },
      {
        year: 2040,
        headline: "Export Engine",
        narrative:
          "Nigerian SaaS companies serve global markets. Remote work reverses brain drain — diaspora engineers build from Lagos, London, and Toronto simultaneously. AI training data and compute hubs established.",
        metrics: { internetPenetration: "92%", developers: "800,000", techExportRevenue: "$45B" },
      },
      {
        year: 2050,
        headline: "Global Tech Powerhouse",
        narrative:
          "Nigeria ranks in the global top 10 for developer talent. Digital public infrastructure (identity, payments, health records) is world-class. Technology contributes 18% of GDP — more than oil.",
        metrics: { internetPenetration: "98%", developers: "2M+", techContributionToGdp: "18%" },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "telecom-revolution",
        title: "The Mobile Revolution",
        summary: "2001 GSM licenses that leapfrogged fixed-line infrastructure entirely.",
      },
      {
        timelineEntryId: "fintech-boom",
        title: "The Fintech Explosion",
        summary: "Paystack, Flutterwave, and the generation that proved Nigeria could build globally.",
      },
      {
        timelineEntryId: "reform-era",
        title: "Digital Reforms",
        summary: "BVN, TSA, and e-government as the institutional backbone for a digital economy.",
      },
    ],
    assumptions: [
      "Stable regulatory framework for fintech and data",
      "Reliable power for data centers and remote work",
      "Continued diaspora investment and mentorship networks",
      "STEM education expansion at secondary and tertiary levels",
    ],
    risks: [
      "Regulatory overreach stifling innovation",
      "FX controls limiting startup access to global markets",
      "Continued brain drain without reversal mechanisms",
    ],
    sourceIds: ["gsma-nigeria-digital", "mckinsey-nigeria-2050", "world-bank-nigeria-overview"],
  },
  {
    slug: "governance",
    title: "Governance & Institutions",
    tagline: "Electoral integrity, anti-corruption, and civic-tech",
    headline2050:
      "Institutions that work — transparent budgets, credible elections, and citizens who trust the system enough to invest in the future.",
    baseline: {
      corruptionIndexRank: "145/180",
      voterTurnout2023: "27%",
      eGovIndex: "Low-middle",
      civilServiceDigitalization: "~35%",
    },
    scenarioRanges: [
      { label: "Corruption index rank (2050)", unit: "global rank", low: 80, base: 50, high: 35 },
      { label: "Voter turnout (2050)", unit: "%", low: 50, base: 65, high: 75 },
    ],
    reviewStatus: "reviewed",
    projections: [
      {
        year: 2030,
        headline: "Digital Government Takes Hold",
        narrative:
          "All federal services online. Open budget portal tracks every naira. Local government elections become genuinely competitive in 20+ states.",
        metrics: { eGovIndex: "Rising", civilServiceDigital: "75%", openDataScore: "65/100" },
      },
      {
        year: 2040,
        headline: "Institutional Maturity",
        narrative:
          "Judicial reforms reduce case backlog by 70%. Anti-corruption convictions include senior officials without ethnic pattern. Fiscal federalism debate resolved with clearer revenue-sharing.",
        metrics: { corruptionIndexRank: "Top 80", voterTurnout: "55%", judicialCaseBacklog: "-70%" },
      },
      {
        year: 2050,
        headline: "Trusted Republic",
        narrative:
          "Nigeria's governance indicators match upper-middle-income peers. Election results accepted by all major parties. Diaspora invest confidently because contracts are enforceable.",
        metrics: { corruptionIndexRank: "Top 50", voterTurnout: "65%", eGovIndex: "Top quartile" },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "1914-amalgamation",
        title: "The 1914 Amalgamation",
        summary: "Colonial borders that still shape federalism debates today.",
      },
      {
        timelineEntryId: "democracy-1999",
        title: "Return to Civilian Rule",
        summary: "The 1999 transition that made every subsequent projection possible.",
      },
      {
        timelineEntryId: "reform-era",
        title: "The Reform Era",
        summary: "TSA, BVN, and ghost worker purges as proof that institutions can change.",
      },
    ],
    assumptions: [
      "No military interruption of civilian rule",
      "Independent electoral commission with teeth",
      "Judicial independence strengthened over time",
      "Civic-tech adoption by watchdog organizations",
    ],
    risks: [
      "Electoral violence delegitimizing results",
      "Elite capture of reform institutions",
      "Ethno-regional polarization blocking consensus",
    ],
    sourceIds: [
      "transparency-corruption-index",
      "heritage-economic-freedom",
      "agenda-2050-npc",
      "cbo-nigeria-history",
    ],
  },
  {
    slug: "education",
    title: "Talent, Education & Human Capital",
    tagline: "Literacy, tertiary education, and brain-drain reversal",
    headline2050:
      "400 million minds — the world's largest young workforce, educated at home and building at home.",
    baseline: {
      literacyRate: "62%",
      outOfSchoolChildren: "20M",
      tertiaryEnrollment: "12%",
      doctorsPer1000: "0.4",
      annualGraduates: "600,000",
    },
    scenarioRanges: [
      { label: "Adult literacy (2050)", unit: "%", low: 88, base: 94, high: 97 },
      { label: "Tertiary enrollment (2050)", unit: "%", low: 32, base: 45, high: 55 },
    ],
    reviewStatus: "reviewed",
    projections: [
      {
        year: 2030,
        headline: "Universal Basic Education Achieved",
        narrative:
          "Literacy crosses 80%. Out-of-school children halved through conditional cash transfers and community schools. Technical colleges revived in every geopolitical zone.",
        metrics: { literacyRate: "82%", tertiaryEnrollment: "22%", outOfSchool: "8M" },
      },
      {
        year: 2040,
        headline: "Brain Gain Begins",
        narrative:
          "Net migration of skilled professionals turns positive for the first time. Nigerian universities rank in global top 500. STEM graduates exceed 200,000 annually.",
        metrics: { literacyRate: "90%", tertiaryEnrollment: "35%", netBrainMigration: "Positive" },
      },
      {
        year: 2050,
        headline: "Human Capital Superpower",
        narrative:
          "Literacy above 94%. Tertiary enrollment matches Brazil. Nigeria exports education services across West Africa. Diaspora returnees lead research labs and startups.",
        metrics: { literacyRate: "94%", tertiaryEnrollment: "45%", annualGraduates: "2.5M" },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "structural-adjustment",
        title: "SAP & University Collapse",
        summary: "How 1980s austerity gutted the education system and fueled emigration.",
      },
      {
        timelineEntryId: "telecom-revolution",
        title: "Mobile Learning",
        summary: "Phones as classrooms — ed-tech filling gaps the state couldn't.",
      },
      {
        timelineEntryId: "fintech-boom",
        title: "Talent Pipeline",
        summary: "Bootcamps and self-taught developers as an alternative credentialing path.",
      },
    ],
    assumptions: [
      "Education spending reaches 6%+ of GDP sustained",
      "Teacher training and pay reforms retain talent",
      "Diaspora mentorship and scholarship programs scale",
      "Curriculum modernization including digital literacy from primary level",
    ],
    risks: [
      "Insecurity closing schools in northern regions",
      "Funding volatility with oil revenue swings",
      "Credential inflation without quality improvement",
    ],
    sourceIds: ["unesco-literacy-nigeria", "undp-hdi-nigeria", "npc-population-projection"],
  },
  {
    slug: "energy",
    title: "Energy & Infrastructure",
    tagline: "Power grid, renewables, transport, and urban infrastructure",
    headline2050:
      "24/7 power for 400 million — a grid rebuilt on gas, solar, and the political will that finally arrived.",
    baseline: {
      installedCapacity: "13 GW",
      actualDelivery: "~4 GW",
      gridAccess: "62%",
      renewableShare: "18%",
      perCapitaConsumption: "150 kWh/yr",
    },
    scenarioRanges: [
      { label: "Grid delivery (2050)", unit: "GW", low: 55, base: 85, high: 110 },
      { label: "Renewable share (2050)", unit: "%", low: 50, base: 65, high: 78 },
    ],
    reviewStatus: "reviewed",
    projections: [
      {
        year: 2030,
        headline: "The Turning Point",
        narrative:
          "Grid delivery triples to 12 GW through privatization fixes and gas pipeline completion. Mini-grids serve 5,000 rural communities. Lagos metro Line 1 operational.",
        metrics: { gridDelivery: "12 GW", gridAccess: "80%", renewableShare: "30%" },
      },
      {
        year: 2040,
        headline: "Renewable Majority",
        narrative:
          "Solar and hydro exceed 50% of generation. Cross-border West African power pool integrated. High-speed rail connects Lagos-Abuja-Kano.",
        metrics: { gridDelivery: "45 GW", renewableShare: "52%", perCapitaConsumption: "800 kWh" },
      },
      {
        year: 2050,
        headline: "Energy Abundance",
        narrative:
          "85 GW installed — enough for industrialization. Per-capita consumption approaches middle-income norms. Nigeria exports power to neighbors. Cities run on smart grids.",
        metrics: { gridDelivery: "85 GW", renewableShare: "65%", perCapitaConsumption: "2,400 kWh" },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "colonial-economy",
        title: "Colonial Infrastructure",
        summary: "Railways built for export, not connection — a pattern power policy repeated.",
      },
      {
        timelineEntryId: "oil-discovery",
        title: "Oil Without Power",
        summary: "The paradox of an energy superpower where homes go dark.",
      },
      {
        timelineEntryId: "reform-era",
        title: "Power Sector Reforms",
        summary: "Privatization, tariff adjustments, and the slow climb out of darkness.",
      },
    ],
    assumptions: [
      "Gas supply agreements secured for baseload generation",
      "Renewable investment of $3B+ annually from 2028",
      "Distribution company reforms completed",
      "Urban planning keeps pace with population growth",
    ],
    risks: [
      "Pipeline vandalism in Niger Delta",
      "Climate change affecting hydro capacity",
      "Underinvestment in transmission infrastructure",
    ],
    sourceIds: ["iea-nigeria-energy", "agenda-2050-npc", "world-bank-nigeria-overview"],
  },
  {
    slug: "security",
    title: "Security & Law and Order",
    tagline: "Crime trends, justice reform, and the path to a 2050 baseline",
    headline2050:
      "Safe enough to invest, walk, and raise children — not perfect peace, but a credible baseline of order.",
    baseline: {
      conflictFatalities2024: "High",
      policePer100k: "187",
      prisonOccupancy: "73,000+",
      kidnappingIncidents: "Elevated",
      justiceCaseBacklog: "Millions",
    },
    scenarioRanges: [
      { label: "Global Peace Index rank (2050)", unit: "rank", low: 120, base: 100, high: 75 },
      { label: "Police per 100k (2050)", unit: "officers", low: 350, base: 450, high: 550 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "Stabilization",
        narrative:
          "Farmer-herder conflicts decline through grazing reserves and state policing reforms. Kidnapping drops 40% in northwest. Community policing pilots expand to 15 states.",
        metrics: { conflictZones: "3→1 regions", kidnappingTrend: "-40%", policeTrainingBudget: "+100%" },
      },
      {
        year: 2040,
        headline: "Justice System Rebuilt",
        narrative:
          "Case backlog cut by half through ADR and digital courts. Police accountability boards in every state. Border security integrated with ECOWAS protocols.",
        metrics: { caseBacklog: "-50%", policePer100k: "350", conflictFatalities: "-70%" },
      },
      {
        year: 2050,
        headline: "Credible Baseline",
        narrative:
          "Security indicators match peer nations at similar income levels. Nigerians report feeling safe in major cities. Investment flows no longer discount a 'security premium.'",
        metrics: { globalPeaceIndex: "Top 100", policePer100k: "450", conflictFatalities: "Minimal" },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "civil-war-1967",
        title: "The Civil War",
        summary: "The wound that reminds Nigeria what unchecked conflict costs.",
      },
      {
        timelineEntryId: "1966-coups",
        title: "The 1966 Coups",
        summary: "When political violence became normalized — and how long it took to unlearn.",
      },
      {
        timelineEntryId: "military-decades",
        title: "Military Rule & Militarization",
        summary: "Decades that shaped a security culture built on force, not trust.",
      },
    ],
    assumptions: [
      "Community policing replaces pure militarization in civilian areas",
      "Judicial reforms reduce impunity for all ethnic groups",
      "Economic opportunity reduces recruitment into armed groups",
      "Regional cooperation on cross-border terrorism",
    ],
    risks: [
      "Climate-driven resource conflicts intensifying",
      "Weapons proliferation from regional conflicts",
      "Justice system reforms stalling under political pressure",
    ],
    sourceIds: ["sipri-security-africa", "undp-hdi-nigeria", "world-bank-nigeria-overview"],
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

export function getAllSectorSlugs(): string[] {
  return SECTORS.map((s) => s.slug);
}
