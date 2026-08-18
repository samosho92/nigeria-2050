import type { Sector } from "@/types/content";
import { PHASE2_SECTORS } from "./phase2/sectors";

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
      {
        title: "GDP growth path",
        detail:
          "Real GDP grows 6–8% annually from 2025–2035, then moderates to 5–6% through 2050 as the economy matures — consistent with McKinsey/PwC upper-middle scenarios and requiring no sustained boom beyond peer-country experience.",
      },
      {
        title: "Population & labor force",
        detail:
          "NPC medium-variant population projection: ~230M (2024) → ~280M (2030) → ~340M (2040) → ~400M (2050). The working-age share stays above 60%; at least 3M net new formal jobs created annually from 2030 onward.",
      },
      {
        title: "Oil dependency unwind",
        detail:
          "Oil falls from ~85% of exports (2024) to under 40% by 2030 and under 15% by 2050. Base-case Brent crude averages $70–90/bbl — not a price collapse, but reduced fiscal reliance through non-oil revenue growth.",
      },
      {
        title: "Power for industrialization",
        detail:
          "Grid-delivered power rises from ~4 GW today to 12 GW (2030), 45 GW (2040), and 85 GW (2050) per energy-sector assumptions. Industrial zones receive 20+ hours/day of reliable supply by 2040, enabling manufacturing share to reach 22%.",
      },
      {
        title: "Exchange rate & trade policy",
        detail:
          "A transparent, unified FX window rewards exporters. AfCFTA rules of origin are implemented; non-oil export volume grows 8%+ annually in the 2030s. Import substitution is targeted (fertilizer, steel, processed foods), not blanket protectionism.",
      },
      {
        title: "Informal economy formalization",
        detail:
          "Over 50% of informal activity is registered by 2045 through NIN-linked accounts, digital payments (CBN instant payment rails), and simplified SME tax thresholds — raising the taxable base without mass enforcement shocks.",
      },
      {
        title: "Capital inflows",
        detail:
          "FDI averages $12–18B annually from 2030 (manufacturing, agro-processing, data centers). Domestic pension and insurance assets allocate 15%+ to infrastructure and corporate bonds; diaspora remittances ($20B+) increasingly channel into productive investment, not consumption alone.",
      },
      {
        title: "Fiscal discipline",
        detail:
          "Fuel subsidy remains eliminated; targeted social transfers replace blanket subsidies. Federal debt-to-GDP stays below 50%; capital spending prioritizes power, transport, and education over recurrent leakage.",
      },
    ],
    risks: [
      {
        title: "Oil price shock before diversification",
        detail:
          "A sustained sub-$50/bbl period in the 2020s–2030s before non-oil exports scale would compress fiscal space and delay infrastructure spend — the primary driver of the low-case GDP per capita ($8,000) scenario.",
      },
      {
        title: "Security disrupting production belts",
        detail:
          "Escalating conflict in the northwest, north-central, or Niger Delta could disrupt farming, logistics, and oil infrastructure — historically shaving 1–2 percentage points off annual growth during acute phases.",
      },
      {
        title: "Policy reversal on reforms",
        detail:
          "Reintroduction of FX controls, import bans, or fuel subsidies would undermine investor confidence and formalization — patterns seen after prior reform cycles in the 1980s and 2010s.",
      },
      {
        title: "Demographic pressure without jobs",
        detail:
          "If formal job creation falls below 2M/year net, youth unemployment and emigration accelerate, reducing domestic consumption growth and tax revenue — independent of macro GDP numbers.",
      },
      {
        title: "Power underdelivery",
        detail:
          "If grid delivery remains below 25 GW by 2040, manufacturing and agro-processing targets are unreachable; the base-case industrialization narrative collapses toward the low scenario.",
      },
      {
        title: "Debt distress",
        detail:
          "External debt service above 25% of revenue would crowd out education and infrastructure — repeating the SAP-era constraint on human capital and capital formation.",
      },
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
      {
        title: "Connectivity expansion",
        detail:
          "Internet penetration rises from ~55% (2024) to 78% (2030), 92% (2040), and 98% (2050) via 4G/5G rollout, fiber backhaul in state capitals, and satellite coverage for rural gaps — aligned with GSMA Africa connectivity forecasts.",
      },
      {
        title: "Affordable data",
        detail:
          "Average mobile data cost falls 60% by 2030 (from ~$2/GB toward sub-$0.50/GB in real terms) through spectrum allocation, infrastructure sharing, and competition among at least four national carriers.",
      },
      {
        title: "Regulatory stability",
        detail:
          "CBN, NCC, and NDPC maintain predictable rules for fintech licensing, open banking, and cross-border data flows. No repeat of abrupt FX or crypto restrictions that freeze startup treasury operations without transition periods.",
      },
      {
        title: "Power for digital infrastructure",
        detail:
          "Data centers and fiber nodes receive prioritized grid or captive solar/gas power — minimum 18 hours/day uptime in Lagos, Abuja, and Port Harcourt clusters by 2030, scaling nationally by 2040.",
      },
      {
        title: "Talent pipeline",
        detail:
          "50,000+ new software engineers annually by 2030 through university CS programs, Andela-style bootcamps, and NPower-Tech scale-up; total developer pool exceeds 2M by 2050 with 30%+ women in technical roles.",
      },
      {
        title: "Diaspora capital & networks",
        detail:
          "Diaspora engineers and investors maintain dual presence (Lagos + London/Toronto/Atlanta). Startup funding grows from ~$1.2B (2024) to $3.5B (2030) and $8B+ (2040), with 40%+ from African and diaspora LPs.",
      },
      {
        title: "Digital public infrastructure",
        detail:
          "NIN, BVN, NIBSS instant payments, and eNaira (or successor rails) interoperate as national DPI — enabling identity-verified services across health, education, and government without duplicate silos.",
      },
      {
        title: "Export-oriented product economy",
        detail:
          "By 2040, Nigerian B2B SaaS, fintech APIs, and creative-tech IP generate $45B+ in export revenue — requiring IP protection, double-taxation treaties, and remote-work visa clarity.",
      },
    ],
    risks: [
      {
        title: "Regulatory overreach",
        detail:
          "Sudden licensing freezes, social-media levies, or data-localization mandates without grandfather clauses could stall the startup ecosystem — as seen in peer markets during election cycles.",
      },
      {
        title: "FX & capital controls",
        detail:
          "Restrictions on repatriating startup revenue or accessing foreign VC would cap growth at domestic market size — historically pushing founders to incorporate abroad.",
      },
      {
        title: "Persistent brain drain",
        detail:
          "If net emigration of senior engineers exceeds 15,000/year without return pathways, the 2050 '2M developers' target requires impossible training throughput alone.",
      },
      {
        title: "Power & connectivity gaps",
        detail:
          "Rural and peri-urban areas left at sub-40% broadband penetration would exclude 100M+ from the digital economy, dragging down GDP contribution metrics.",
      },
      {
        title: "Cybersecurity & trust failures",
        detail:
          "Large-scale breaches of BVN/NIN or payment rails would erode adoption of digital public infrastructure — a single major incident could set adoption back 3–5 years.",
      },
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
      {
        title: "Uninterrupted civilian rule",
        detail:
          "No military coup or extra-constitutional transition through 2050 — 26+ consecutive years of civilian rule (from 1999) extend to 50+, building the institutional memory that peer democracies required.",
      },
      {
        title: "Electoral integrity",
        detail:
          "INEC operates with independent funding (≥0.5% of federal budget), biometric voter register maintained, and results transmitted electronically from 80%+ of polling units by 2030. Voter turnout recovers from 27% (2023) to 55% (2040) and 65% (2050) as credibility returns.",
      },
      {
        title: "Judicial independence & speed",
        detail:
          "Case backlog reduced 70% by 2040 through ADR, digital filing, and increased judge appointments. Supreme Court and appellate decisions on electoral and corruption cases delivered within 12 months on average.",
      },
      {
        title: "Anti-corruption with due process",
        detail:
          "EFCC/ICPC secure convictions of senior officials across regions without ethnic skew. Corruption Perceptions Index rank improves from 145/180 to top 80 (2040) and top 50 (2050) — matching upper-middle-income peers, not Scandinavian outliers.",
      },
      {
        title: "Digital government & open data",
        detail:
          "100% of federal services online by 2030; state-level parity by 2040. Open budget portal publishes obligation, cash release, and project status at LG, state, and federal levels — civil service digitalization reaches 90%+.",
      },
      {
        title: "Fiscal federalism clarity",
        detail:
          "Revenue-sharing formula revised by 2035 to reflect derivation, population, and development indices without zero-sum ethnic bargaining. LG autonomy strengthened with direct allocation and audited accounts.",
      },
      {
        title: "Civic-tech ecosystem",
        detail:
          "Watchdog NGOs (BudgIT, Dataphyte, etc.) and parliamentary oversight committees routinely use open data — creating feedback loops that punish non-compliance in procurement and payroll.",
      },
    ],
    risks: [
      {
        title: "Electoral violence & disputed results",
        detail:
          "A contested presidential election with widespread violence could reset turnout and trust metrics — as in 2011 and 2023 tensions — delaying reform timelines by a full electoral cycle (4–8 years).",
      },
      {
        title: "Elite capture of institutions",
        detail:
          "If anti-corruption agencies become instruments of factional warfare rather than neutral enforcement, CPI improvements stall regardless of digital transparency tools.",
      },
      {
        title: "Ethno-regional polarization",
        detail:
          "Federal character debates that block merit-based appointments in judiciary, military, and civil service would undermine the 'trusted republic' 2050 narrative.",
      },
      {
        title: "State fragility at LG level",
        detail:
          "If local governments remain non-functional capture points, citizens won't experience governance improvements despite federal digital reforms — eroding turnout recovery.",
      },
      {
        title: "Information disorder",
        detail:
          "Unregulated misinformation during elections could suppress participation and delegitimize results even when INEC processes are sound — requiring media literacy, not censorship, as mitigation.",
      },
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
      {
        title: "Education funding scale-up",
        detail:
          "Combined federal + state education spending reaches 6–7% of GDP by 2030 and is sustained — UNESCO benchmark for rapid literacy gains. UBEC matching-grant reforms ensure states co-fund primary education.",
      },
      {
        title: "Universal basic education",
        detail:
          "Out-of-school children fall from ~20M (2024) to under 8M (2030) and under 2M (2040) via conditional cash transfers (like existing social programs scaled), community schools in insecure areas, and girl-child enrollment campaigns.",
      },
      {
        title: "Literacy trajectory",
        detail:
          "Adult literacy rises from 62% → 82% (2030) → 90% (2040) → 94% (2050) through primary completion rates above 85% and adult literacy programs in local languages.",
      },
      {
        title: "Tertiary expansion with quality",
        detail:
          "Gross tertiary enrollment rises from 12% to 22% (2030), 35% (2040), and 45% (2050) — adding ~500 accredited programs with accreditation audits every 5 years to prevent credential inflation.",
      },
      {
        title: "Teacher workforce",
        detail:
          "Teacher pay reaches 150% of minimum wage by 2030; 100,000 teachers retrained annually in pedagogy and digital literacy; pupil-teacher ratio below 35:1 in primary nationwide.",
      },
      {
        title: "STEM & vocational parity",
        detail:
          "40% of secondary students in STEM or technical tracks by 2035; technical colleges revived in all six geopolitical zones with industry apprenticeship mandates.",
      },
      {
        title: "Brain-drain reversal",
        detail:
          "Net skilled migration turns positive by 2040 through remote-work visas, research grants (TETFund scale-up), and diaspora fellowship programs — requiring governance and security assumptions to hold.",
      },
      {
        title: "Health-education linkage",
        detail:
          "Doctors per 1,000 rise from 0.4 toward 1.2 by 2050 as medical school output triples and retention improves — cross-dependent with security and economic opportunity assumptions.",
      },
    ],
    risks: [
      {
        title: "Insecurity closing schools",
        detail:
          "Banditry and kidnapping in northwest/north-central could keep 5M+ children out of school regardless of funding — the single largest threat to literacy targets.",
      },
      {
        title: "Funding volatility",
        detail:
          "Oil revenue swings or debt pressure could cut UBEC and TETFund allocations mid-decade, repeating the 1980s–90s university collapse pattern.",
      },
      {
        title: "Quality vs. quantity",
        detail:
          "Expanding enrollment without accreditation enforcement produces graduates without skills — visible in today's unemployment among degree-holders.",
      },
      {
        title: "Regional inequality",
        detail:
          "If southern states invest 3× northern per-pupil spending indefinitely, national averages mask persistent gaps that fuel migration and conflict.",
      },
      {
        title: "Emigration of educators",
        detail:
          "Continued departure of trained teachers and professors to UK/Canada/Gulf would require 2× training pipeline throughput to hit workforce targets.",
      },
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
      {
        title: "Generation capacity build-out",
        detail:
          "Installed capacity rises from 13 GW to 25 GW (2030), 60 GW (2040), and 110 GW (2050); grid-delivered power reaches 12 GW → 45 GW → 85 GW as transmission bottlenecks are cleared — the gap between installed and delivered closes from ~70% loss to under 25%.",
      },
      {
        title: "Gas baseload supply",
        detail:
          "Domestic gas supply agreements deliver 3.5+ BCF/day to power plants by 2030 via AKK pipeline completion and Niger Delta processing — gas remains 35–45% of generation mix through 2040 before renewables dominate.",
      },
      {
        title: "Renewable acceleration",
        detail:
          "Solar and hydro grow from 18% to 30% (2030), 52% (2040), and 65% (2050) of generation — requiring $3B+ annual renewable investment from 2028 and clear PPA frameworks for private developers.",
      },
      {
        title: "Distribution reform",
        detail:
          "DisCo financial restructuring completed by 2030 with loss reduction from 40%+ to under 20%; prepaid metering in 90% of urban connections; rural mini-grids serve 5,000+ communities by 2030 and 20,000+ by 2040.",
      },
      {
        title: "Per-capita consumption",
        detail:
          "Per-capita electricity consumption rises from ~150 kWh/year toward 800 kWh (2040) and 2,400 kWh (2050) — still below South Africa today but sufficient for middle-income household and SME use.",
      },
      {
        title: "Transport infrastructure",
        detail:
          "Lagos metro Line 1 operational by 2030; Lagos–Abuja high-speed rail by 2040; port automation at Apapa/Tin Can reduces cargo dwell time from weeks to days — unlocking industrial input costs assumed in economic projections.",
      },
      {
        title: "Regional power trade",
        detail:
          "West African Power Pool integration allows Nigeria to export 2–5 GW surplus by 2050 after domestic demand is met — requiring harmonized grid codes with Ghana, Benin, and Niger.",
      },
    ],
    risks: [
      {
        title: "Pipeline vandalism & Delta instability",
        detail:
          "Gas supply interruptions could keep delivered power below 8 GW through the 2030s — the historical pattern that has blocked every prior recovery plan.",
      },
      {
        title: "Transmission underinvestment",
        detail:
          "Generation without TCN expansion repeats today's constraint: plants idle while cities brown out. Transmission needs $2B+ annually through 2040.",
      },
      {
        title: "DisCo insolvency loop",
        detail:
          "If tariff cost-reflectivity stalls for political reasons, private generation investment stops — freezing the sector at current ~4 GW delivered.",
      },
      {
        title: "Climate impacts on hydro",
        detail:
          "Reduced rainfall in the Niger basin could cut Kainji/Jebba output 15–25% in drought years — requiring overbuilding solar to compensate.",
      },
      {
        title: "Urban sprawl without planning",
        detail:
          "Lagos and Kano expanding without transit and grid planning would leave 80M+ in underserved informal settlements regardless of national GW totals.",
      },
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
      {
        title: "Community policing transition",
        detail:
          "By 2035, state-level community policing models (not pure military deployment) cover 25+ states. Police-to-population ratio rises from 187/100k toward 350 (2040) and 450 (2050) — still below UN recommended 500 but with better training and accountability.",
      },
      {
        title: "Farmer–herder conflict reduction",
        detail:
          "Grazing reserves, ranching pilots, and early-warning systems reduce north-central fatalities 60%+ by 2030. Land-use planning separates agricultural and pastoral zones in six pilot states scaling nationally by 2040.",
      },
      {
        title: "Kidnapping & banditry decline",
        detail:
          "Northwest kidnapping incidents fall 40% by 2030 and 75% by 2040 through combined kinetic operations, amnesty-with-disarmament programs, and economic alternatives in former bandit corridors.",
      },
      {
        title: "Justice system throughput",
        detail:
          "Case backlog cut 50% by 2040 via ADR, virtual courts, and 5,000+ additional judges and magistrates. Pre-trial detention falls from 70%+ of prison population to under 40%.",
      },
      {
        title: "Police accountability",
        detail:
          "Independent police complaint boards in all 36 states by 2035; body-worn cameras in urban units; dismissal rates for documented abuse rise 10× from 2024 baseline.",
      },
      {
        title: "Economic opportunity reduces recruitment",
        detail:
          "Youth unemployment in conflict-affected states falls from 40%+ toward 20% as education and agro-industrial jobs scale — security improvements depend on economy and governance assumptions holding.",
      },
      {
        title: "Regional counter-terrorism",
        detail:
          "Lake Chad and Sahel coordination with Niger, Chad, and Cameroon contains Boko Haram/ISWAP to non-population-center areas. Cross-border weapons flows reduced 50% by 2040.",
      },
      {
        title: "Global Peace Index trajectory",
        detail:
          "GPI rank improves from bottom quartile to top 100 (2050) — 'credible baseline' means peer-comparable for lower-middle-income countries, not OECD-level peace.",
      },
    ],
    risks: [
      {
        title: "Climate-driven resource conflict",
        detail:
          "Desertification and Lake Chad shrinkage could expand farmer–herder competition beyond current zones — affecting 15M+ people in the Sahel belt.",
      },
      {
        title: "Weapons proliferation",
        detail:
          "Libya/Sahel arms pipelines and local craft manufacturing could outpace disarmament — keeping bandit groups armed regardless of economic programs.",
      },
      {
        title: "Justice reform stall",
        detail:
          "Political protection of vested interests in police and judiciary could block accountability reforms — preserving impunity and recruitment into non-state groups.",
      },
      {
        title: "Militarization relapse",
        detail:
          "Repeated deployment of military in civilian policing without oversight reverses trust gains and increases human-rights violations documented by civil society.",
      },
      {
        title: "Urban crime & cult violence",
        detail:
          "South-south and southeast cult and oil-theft violence could persist independently of north-focused banditry — requiring region-specific strategies not captured in national averages.",
      },
      {
        title: "Election-cycle violence",
        detail:
          "2027, 2031, and subsequent election cycles pose spike risks; failure to professionalize security forces during transitions could reset decade-long trend lines in a single year.",
      },
    ],
    sourceIds: ["sipri-security-africa", "undp-hdi-nigeria", "world-bank-nigeria-overview"],
  },
  ...PHASE2_SECTORS,
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

export function getAllSectorSlugs(): string[] {
  return SECTORS.map((s) => s.slug);
}
