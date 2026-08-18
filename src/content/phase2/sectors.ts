import type { Sector } from "@/types/content";

export const PHASE2_SECTORS: Sector[] = [
  {
    slug: "healthcare",
    title: "Healthcare & Public Health",
    tagline: "Primary care, maternal health, and a resilient public system",
    headline2050:
      "Universal health coverage for 400 million people, with life expectancy matching upper-middle-income peers and a domestic pharmaceutical base.",
    baseline: {
      lifeExpectancy: "55 years",
      healthSpendingGdp: "3.2%",
      physiciansPer10k: "3.8",
      maternalMortality: "1,047 / 100k",
      uhcIndex: "42/100",
    },
    scenarioRanges: [
      { label: "Life expectancy (2050)", unit: "years", low: 62, base: 68, high: 72 },
      { label: "UHC service coverage (2050)", unit: "index", low: 55, base: 72, high: 82 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "Primary Care on Every Ward",
        narrative:
          "Basic Health Care Provision Fund reaches all 774 LGAs. 5,000 new primary health centers operational. Maternal mortality falls below 600 per 100,000. National Health Insurance Authority enrolls 80M citizens through employer and informal-sector schemes.",
        metrics: {
          healthCenters: "15,000+",
          insuredPopulation: "80M",
          maternalMortality: "580 / 100k",
        },
      },
      {
        year: 2040,
        headline: "Regional Referral Networks",
        narrative:
          "Six zonal medical centers anchor specialist care. Local vaccine and essential-drug production covers 60% of domestic demand. Telemedicine links rural clinics to urban specialists. Health spending rises to 5% of GDP with reduced out-of-pocket burden.",
        metrics: {
          healthSpendingGdp: "5.1%",
          domesticDrugShare: "60%",
          physiciansPer10k: "12",
        },
      },
      {
        year: 2050,
        headline: "Health Security for a Continental Power",
        narrative:
          "Life expectancy reaches 68 years. Nigeria trains 15,000 new health workers annually and exports medical talent while retaining enough to serve 400M at home. Outbreak response infrastructure meets WHO benchmarks. UHC index crosses 72, comparable to Brazil or Indonesia today.",
        metrics: {
          lifeExpectancy: "68 years",
          uhcIndex: "72/100",
          healthWorkersTrainedAnnually: "15,000",
        },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "structural-adjustment",
        title: "Health Under Austerity",
        summary: "SAP-era cuts to public health spending that hollowed out rural clinics and drove the brain drain of doctors abroad.",
      },
      {
        timelineEntryId: "democracy-1999",
        title: "Democracy and Health Reform",
        summary: "The Fourth Republic opened space for NHIS legislation, donor partnerships, and civil society pressure on maternal mortality.",
      },
      {
        timelineEntryId: "telecom-revolution",
        title: "Digital Health Foundations",
        summary: "Mobile connectivity that enabled telemedicine pilots, health hotlines, and SMS-based maternal reminders at national scale.",
      },
    ],
    assumptions: [
      {
        title: "Primary care scale-up",
        detail:
          "Federal and state governments co-fund 5,000 net-new primary health centers by 2030, with at least one functional facility per ward. BHCPF disbursements reach 90% of LGAs without major leakage by 2032.",
      },
      {
        title: "Health insurance expansion",
        detail:
          "NHIA and state schemes enroll 80M people by 2030 and 250M by 2050 through mandatory employer contributions, subsidized premiums for the poor, and informal-sector micro-insurance linked to NIN.",
      },
      {
        title: "Workforce pipeline",
        detail:
          "Medical and nursing school capacity doubles by 2035. Residency slots expand in six zonal centers. Emigration of doctors stabilizes at net-zero by 2040 as domestic pay, equipment, and career paths improve.",
      },
      {
        title: "Domestic pharmaceutical capacity",
        detail:
          "Local production of essential medicines, vaccines, and IV fluids rises from under 20% today to 60% by 2040 through industrial parks in Lagos, Kaduna, and Enugu with stable power and NAFDAC quality enforcement.",
      },
      {
        title: "Public health infrastructure",
        detail:
          "NCDC and state epidemiology units maintain cold-chain coverage for 95% of the population. Gene sequencing and surveillance hubs in Abuja and Lagos meet WHO tier-2 standards by 2035.",
      },
      {
        title: "Health financing growth",
        detail:
          "Total health expenditure rises from 3.2% of GDP to 5% by 2040 and 5.5% by 2050, split across government, insurance, and private spend, with out-of-pocket share falling from 70% to under 40%.",
      },
    ],
    risks: [
      {
        title: "Brain drain acceleration",
        detail:
          "If physician emigration exceeds 2,000 net departures annually without matching training output, specialist ratios remain stuck at current levels regardless of facility construction.",
      },
      {
        title: "BHCPF disbursement failures",
        detail:
          "Delayed or diverted primary-care funds would leave rural wards without staff or drugs, repeating the gap between policy and delivery seen in prior NHIS rollouts.",
      },
      {
        title: "Outbreak overwhelm",
        detail:
          "A pandemic or regional epidemic before surveillance and ICU capacity scale could collapse trust in the public system and push the middle class entirely into unregulated private care.",
      },
      {
        title: "Fake drugs and weak regulation",
        detail:
          "NAFDAC enforcement gaps would undermine domestic manufacturing goals and expose patients to substandard medicines, especially in informal markets.",
      },
      {
        title: "Security disrupting rural clinics",
        detail:
          "Conflict in the northwest and north-central could close hundreds of PHCs and reverse maternal-mortality gains in the most underserved zones.",
      },
      {
        title: "Fiscal squeeze on health budgets",
        detail:
          "An oil revenue shock or debt crisis that caps federal spending below 4% of GDP on health would delay UHC enrollment and keep out-of-pocket costs punitive for most families.",
      },
    ],
    sourceIds: ["who-nigeria-health", "world-bank-financial-inclusion"],
  },
  {
    slug: "agriculture",
    title: "Agriculture & Food Security",
    tagline: "Smallholders, irrigation, and feeding a continent-sized population",
    headline2050:
      "Africa's breadbasket: a mechanized, climate-resilient farm economy that feeds 400M at home and exports processed foods across West Africa.",
    baseline: {
      agGdpShare: "24%",
      smallholderShare: "80%",
      postHarvestLoss: "40%",
      irrigatedLandShare: "1.8%",
      foodImportBill: "$10B+",
    },
    scenarioRanges: [
      { label: "Food self-sufficiency ratio (2050)", unit: "%", low: 85, base: 95, high: 105 },
      { label: "Agro-processing export value (2050)", unit: "USD B", low: 18, base: 35, high: 55 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "Mechanization at the Ward Level",
        narrative:
          "Tractor-hiring hubs serve 500,000 smallholders. Fertilizer subsidy shifts to e-wallet delivery, cutting diversion. Rice self-sufficiency crosses 80%. Post-harvest loss falls to 28% through rural aggregation centers.",
        metrics: {
          irrigatedLandShare: "4.5%",
          postHarvestLoss: "28%",
          riceSelfSufficiency: "82%",
        },
      },
      {
        year: 2040,
        headline: "Agro-Processing Corridors",
        narrative:
          "Value chains for cassava, cocoa, tomatoes, and livestock anchor industrial parks in Kaduna, Oyo, and Benue. Nigeria becomes a net exporter of processed foods to ECOWAS. Irrigated farmland triples from 2024 levels.",
        metrics: {
          agroExportValue: "$18B",
          irrigatedLandShare: "8%",
          agGdpShare: "18%",
        },
      },
      {
        year: 2050,
        headline: "Continental Food Power",
        narrative:
          "Nigeria produces enough staples and protein for 400M with a 95% self-sufficiency ratio. Agro-industry employs 25M in processing, logistics, and inputs. Climate-smart varieties cover 70% of cropland in the north.",
        metrics: {
          foodSelfSufficiency: "95%",
          agroExportValue: "$35B",
          agroProcessingJobs: "25M",
        },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "colonial-economy",
        title: "Cash Crops & Extraction",
        summary: "Colonial agriculture built for export, not food security, leaving a legacy of underinvestment in domestic processing.",
      },
      {
        timelineEntryId: "structural-adjustment",
        title: "SAP and the Farm Sector",
        summary: "Subsidy removal and naira collapse hurt input access but forced experimentation with market-led extension services.",
      },
      {
        timelineEntryId: "agenda-2050",
        title: "Agenda 2050 Food Targets",
        summary: "The NPC's long-range plan that treats agriculture as the primary non-oil growth and employment engine through 2050.",
      },
    ],
    assumptions: [
      {
        title: "Irrigation and water management",
        detail:
          "Irrigated area expands from 300,000 ha to 1.2M ha by 2030 and 2.5M ha by 2050 through dam rehabilitation, solar pumps, and River Basin Development Authority partnerships with private operators.",
      },
      {
        title: "Input access and subsidy reform",
        detail:
          "Fertilizer and seed subsidies delivered via biometric e-wallets reach 12M farmers by 2030. Average maize and rice yields rise 40% from 2024 baselines through improved varieties and extension.",
      },
      {
        title: "Post-harvest infrastructure",
        detail:
          "Cold storage, drying, and aggregation centers within 30 km of major production zones cut post-harvest loss from 40% to 15% by 2050. Rural roads upgraded under federal and state matching funds.",
      },
      {
        title: "Land tenure clarity",
        detail:
          "State-level land registry pilots in 15 states by 2035 reduce disputes and enable collateralized farm credit. Communal land rights respected with documented lease frameworks for investors.",
      },
      {
        title: "Climate adaptation",
        detail:
          "Drought-tolerant and early-maturing varieties deployed across the Sahel belt. Farmer insurance indexed to rainfall covers 20M smallholders by 2040 through NAIC and private syndicates.",
      },
      {
        title: "AfCFTA food exports",
        detail:
          "Processed food exports to ECOWAS grow 10% annually from 2030 as rules of origin and SPS harmonization improve. Nigeria captures 35% of regional packaged-food trade by 2050.",
      },
    ],
    risks: [
      {
        title: "Farmer-herder conflict",
        detail:
          "Escalating violence in the middle belt could displace millions of farmers and destroy cropland, making self-sufficiency targets unreachable in the low scenario.",
      },
      {
        title: "Climate shocks",
        detail:
          "Repeated droughts or floods in the north before irrigation scales would trigger food-price spikes and import dependency regardless of policy intent.",
      },
      {
        title: "Input subsidy corruption",
        detail:
          "If e-wallet reforms fail and fertilizer continues to be diverted, yield gains stall and smallholders remain trapped at subsistence levels.",
      },
      {
        title: "Import competition",
        detail:
          "Cheap subsidized imports from global producers could undercut domestic rice and poultry farmers, discouraging processing investment.",
      },
      {
        title: "Inadequate rural power",
        detail:
          "Cold chains and processing plants require reliable electricity. If grid delivery lags, post-harvest loss targets remain aspirational.",
      },
      {
        title: "Land grabbing and displacement",
        detail:
          "Large-scale acquisitions without community consent could spark conflict and undermine the smallholder base that still produces most national food output.",
      },
    ],
    sourceIds: ["fao-nigeria-agriculture", "afdb-agriculture"],
  },
  {
    slug: "creative-economy",
    title: "Creative Economy",
    tagline: "Nollywood, Afrobeats, fashion, and cultural exports",
    headline2050:
      "The world's most influential Black cultural exporter, with creative industries contributing more to GDP than oil and employing millions across film, music, fashion, and gaming.",
    baseline: {
      nollywoodOutput: "2,500+ films/year",
      musicExportRevenue: "$500M+",
      creativeGdpShare: "1.8%",
      creativeJobs: "4M+",
      streamingPenetration: "35%",
    },
    scenarioRanges: [
      { label: "Creative sector GDP share (2050)", unit: "%", low: 5, base: 8, high: 12 },
      { label: "Cultural export revenue (2050)", unit: "USD B", low: 8, base: 22, high: 40 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "Global Streaming Breakout",
        narrative:
          "Afrobeats and Nollywood titles rank in global top-10 charts weekly. Nigerian creators earn $2B from streaming, licensing, and live events. Three major studio complexes open in Lagos and Enugu with international co-production deals.",
        metrics: {
          creativeExportRevenue: "$2.5B",
          streamingPenetration: "62%",
          creativeJobs: "8M",
        },
      },
      {
        year: 2040,
        headline: "IP Economy Matures",
        narrative:
          "Copyright enforcement and collective licensing generate $800M annually for creators. Fashion weeks in Lagos and Abuja anchor a $5B design export market. Gaming studios ship titles to 200M players across Africa.",
        metrics: {
          creativeGdpShare: "5.5%",
          copyrightRevenue: "$800M",
          gamingRevenue: "$3B",
        },
      },
      {
        year: 2050,
        headline: "Culture as Economic Pillar",
        narrative:
          "Creative industries contribute 8% of GDP and $22B in exports. Nigeria sets global trends in music, film, and fashion. A generation of creators builds wealth at home rather than relocating to London or Atlanta.",
        metrics: {
          creativeGdpShare: "8%",
          culturalExportRevenue: "$22B",
          creativeJobs: "18M",
        },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "democracy-1999",
        title: "Nollywood's Democratic Boom",
        summary: "Return to civilian rule coincided with home-video explosion that made Nigeria the world's second-largest film producer by volume.",
      },
      {
        timelineEntryId: "telecom-revolution",
        title: "Mobile Distribution",
        summary: "Cheap phones and mobile data let artists reach audiences directly, bypassing gatekeepers and fueling Afrobeats' global rise.",
      },
      {
        timelineEntryId: "fintech-boom",
        title: "Creator Monetization",
        summary: "Digital payments and diaspora remittance rails that turned fan support into repeatable revenue for independent artists and filmmakers.",
      },
    ],
    assumptions: [
      {
        title: "Copyright and licensing reform",
        detail:
          "NCC and COSON-style collective management organizations enforce royalties on radio, TV, and streaming by 2030. International PRO reciprocity agreements cover 80% of Nigerian catalog revenue by 2040.",
      },
      {
        title: "Production infrastructure",
        detail:
          "Three world-class studio complexes with sound stages, post-production, and tax incentives operational by 2032. Film location permits standardized across 20 states.",
      },
      {
        title: "Streaming and distribution access",
        detail:
          "Broadband penetration above 75% by 2030 and affordable data bundles let creators reach 150M domestic and 500M diaspora-plus-African audiences without piracy as the default channel.",
      },
      {
        title: "Creative education pipeline",
        detail:
          "Film, music, animation, and fashion programs in 40 universities and 200 vocational centers produce 100,000 skilled creatives annually by 2035.",
      },
      {
        title: "Diaspora as amplifier",
        detail:
          "Nigerian diaspora of 15M+ acts as distribution and investment channel. Co-production treaties with UK, US, South Africa, and France unlock $1B+ in external capital by 2040.",
      },
      {
        title: "Brand Nigeria globally",
        detail:
          "Government and private sector co-invest in cultural diplomacy, festival circuits, and export promotion without censoring artistic freedom. Afrobeats and Nollywood remain primary soft-power assets.",
      },
    ],
    risks: [
      {
        title: "Piracy and revenue leakage",
        detail:
          "Weak enforcement could leave creators capturing less than 30% of potential royalties, pushing talent abroad where IP protection is stronger.",
      },
      {
        title: "Censorship and creative chill",
        detail:
          "Arbitrary content bans or punitive licensing would drive productions offshore and reduce Nigeria's cultural export competitiveness.",
      },
      {
        title: "Infrastructure costs",
        detail:
          "Unreliable power and expensive studio rents could keep production costs 40% above South African or Ghanaian competitors, limiting co-production appeal.",
      },
      {
        title: "Talent relocation",
        detail:
          "If top artists and filmmakers consistently relocate to London, Atlanta, or Johannesburg for contracts and safety, domestic industry growth caps regardless of domestic audience size.",
      },
      {
        title: "Platform dependency",
        detail:
          "Over-reliance on foreign streaming algorithms and payment rails could expose creators to sudden policy changes, as seen with FX restrictions affecting tech startups.",
      },
      {
        title: "Underinvestment in fashion and gaming",
        detail:
          "Focus on music and film alone would leave half the creative GDP potential unrealized if fashion manufacturing and game development lack capital and IP frameworks.",
      },
    ],
    sourceIds: ["unesco-creative-economy", "nollywood-industry-report"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing & Industrialization",
    tagline: "Factories, special economic zones, and made-in-Nigeria",
    headline2050:
      "Manufacturing reaches 25% of GDP as Nigeria becomes West Africa's industrial hub, producing steel, autos, pharmaceuticals, and consumer goods for 500M regional consumers.",
    baseline: {
      manufacturingGdpShare: "9%",
      industrialJobs: "5M",
      sezCount: "4 active",
      capacityUtilization: "~55%",
      manufacturingExportValue: "$8B",
    },
    scenarioRanges: [
      { label: "Manufacturing share of GDP (2050)", unit: "%", low: 15, base: 22, high: 28 },
      { label: "Manufacturing jobs (2050)", unit: "M", low: 12, base: 20, high: 28 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "SEZ Momentum Builds",
        narrative:
          "Lekki, Calabar, and Kano special economic zones attract $8B in FDI. Steel and cement capacity expands. Local assembly of vehicles and electronics crosses 500,000 units annually. Manufacturing share rises to 12% of GDP.",
        metrics: {
          manufacturingGdpShare: "12%",
          sezJobs: "400,000",
          capacityUtilization: "68%",
        },
      },
      {
        year: 2040,
        headline: "Regional Factory Floor",
        narrative:
          "Nigeria supplies processed metals, textiles, and packaged goods across ECOWAS. Industrial clusters link to stable gas and solar power. Manufacturing exports hit $45B. Two million new factory jobs since 2024.",
        metrics: {
          manufacturingExportValue: "$45B",
          manufacturingGdpShare: "18%",
          industrialJobs: "12M",
        },
      },
      {
        year: 2050,
        headline: "Industrial Powerhouse",
        narrative:
          "Manufacturing contributes 22% of GDP with 20M jobs. Nigeria produces autos, pharmaceuticals, and machinery for domestic and regional markets. Import substitution is strategic, not protectionist, with quality standards enforced.",
        metrics: {
          manufacturingGdpShare: "22%",
          manufacturingExportValue: "$80B",
          industrialJobs: "20M",
        },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "colonial-economy",
        title: "Extractive Legacy",
        summary: "Colonial infrastructure built to move raw materials to ports, not to connect factories to markets or power.",
      },
      {
        timelineEntryId: "oil-discovery",
        title: "Dutch Disease",
        summary: "Oil revenue that crowded out manufacturing investment and made imports cheaper than local production for decades.",
      },
      {
        timelineEntryId: "agenda-2050",
        title: "Industrial Policy Blueprint",
        summary: "Agenda 2050 targets that treat manufacturing as the bridge between raw commodities and a diversified $4T economy.",
      },
    ],
    assumptions: [
      {
        title: "Reliable industrial power",
        detail:
          "Dedicated industrial feeders and captive gas/solar deliver 20+ hours/day of power to SEZs by 2030 and 22+ hours by 2040. Grid capacity reaches 85 GW by 2050 per cross-sector energy assumptions.",
      },
      {
        title: "SEZ and tax incentive stability",
        detail:
          "At least six operational SEZs with 10-year tax clarity, one-stop customs, and lease frameworks that survive election cycles. Cumulative SEZ investment exceeds $25B by 2040.",
      },
      {
        title: "Skills and apprenticeship",
        detail:
          "ITF and university partnerships produce 200,000 certified technicians and engineers annually by 2035. German-style dual education models scale in Kano, Ogun, and Rivers states.",
      },
      {
        title: "Local content enforcement",
        detail:
          "NCDMB, NAFDAC, and SON standards applied consistently so local assembly of vehicles, drugs, and steel meets regional quality benchmarks without blanket import bans.",
      },
      {
        title: "AfCFTA manufacturing exports",
        detail:
          "Rules-of-origin compliance and trade corridors to Niger, Benin, and Cameroon enable manufacturing exports to grow 12% annually from 2030. Regional market of 500M consumers absorbs Nigerian output.",
      },
      {
        title: "Capital access for SMEs",
        detail:
          "Development finance and BOI lending expand to $5B annually for mid-tier manufacturers by 2035, with credit bureaus covering 40M formal and informal enterprises.",
      },
    ],
    risks: [
      {
        title: "Power underdelivery",
        detail:
          "If industrial zones receive fewer than 12 hours/day of reliable power through 2035, SEZ occupancy stays below 50% and FDI targets collapse toward the low scenario.",
      },
      {
        title: "Policy flip-flop on protectionism",
        detail:
          "Sudden import bans without domestic capacity create shortages and smuggling, repeating 2010s rice and cement policy failures.",
      },
      {
        title: "Infrastructure bottlenecks",
        detail:
          "Port congestion and rail gaps could add 25% to logistics costs, making Nigerian goods uncompetitive against Asian imports in ECOWAS markets.",
      },
      {
        title: "Security and theft",
        detail:
          "Pipeline vandalism, kidnapping on trade routes, and factory theft in the southeast and north could raise insurance costs above viable margins for mid-size firms.",
      },
      {
        title: "FX volatility",
        detail:
          "Naira instability makes imported inputs unpredictable. Manufacturers without forward-cover or local sourcing above 60% face margin collapse during sharp devaluations.",
      },
      {
        title: "Low productivity trap",
        detail:
          "Without skills investment, labor productivity stays at one-third of Malaysian levels, limiting export competitiveness even with cheap wages.",
      },
    ],
    sourceIds: ["unido-manufacturing", "afdb-agriculture", "world-bank-financial-inclusion"],
  },
  {
    slug: "financial-inclusion",
    title: "Financial Inclusion",
    tagline: "Banking the unbanked, digital payments, and credit for SMEs",
    headline2050:
      "Near-universal financial access: 95% of adults with regulated accounts, deep credit markets for SMEs, and digital rails that formalize the informal economy.",
    baseline: {
      bankedAdultShare: "56%",
      mobileMoneyUsers: "85M",
      creditToPrivateSector: "12% of GDP",
      smeCreditGap: "$100B+",
      agentBankingOutlets: "1.2M",
    },
    scenarioRanges: [
      { label: "Adults with regulated accounts (2050)", unit: "%", low: 88, base: 95, high: 98 },
      { label: "SME credit as share of GDP (2050)", unit: "%", low: 18, base: 28, high: 38 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "Digital Rails Universal",
        narrative:
          "Instant payment volume exceeds 20B transactions annually. 75% of adults hold a regulated account linked to NIN. Agent banking reaches every ward. Microfinance and fintech credit serves 15M SMEs.",
        metrics: {
          bankedAdultShare: "75%",
          instantPaymentVolume: "20B txns",
          smeBorrowers: "15M",
        },
      },
      {
        year: 2040,
        headline: "Credit Depth Expands",
        narrative:
          "Credit bureaus cover 80M borrowers. Warehouse receipt financing and invoice discounting mainstream for agriculture and trade. Insurance penetration doubles. Pension auto-enrollment includes informal workers.",
        metrics: {
          bankedAdultShare: "88%",
          creditToPrivateSector: "22% of GDP",
          insurancePenetration: "4.2%",
        },
      },
      {
        year: 2050,
        headline: "Inclusive Financial System",
        narrative:
          "95% of adults banked through regulated institutions. SME credit gap narrows to $20B. Cross-border remittances and AfCFTA trade settle on Nigerian-led instant payment rails. Informal savings largely formalized.",
        metrics: {
          bankedAdultShare: "95%",
          creditToPrivateSector: "28% of GDP",
          smeCreditGap: "$20B",
        },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "structural-adjustment",
        title: "Informal Economy Legacy",
        summary: "SAP-era collapse of formal banking for the poor pushed commerce into cash and esusu, a pattern inclusion policy still works to reverse.",
      },
      {
        timelineEntryId: "telecom-revolution",
        title: "Mobile Money Preconditions",
        summary: "GSM penetration that created the agent network and phone ownership base for agent banking and mobile wallets.",
      },
      {
        timelineEntryId: "fintech-boom",
        title: "The Fintech Explosion",
        summary: "Paystack, OPay, and Moniepoint proved that Nigerians would adopt digital finance at scale when UX and agent density met market demand.",
      },
    ],
    assumptions: [
      {
        title: "NIN-linked account mandate",
        detail:
          "All regulated accounts linked to NIN by 2028, enabling KYC portability across banks, MFBs, and fintechs. Duplicate and ghost accounts purged from the financial system.",
      },
      {
        title: "Agent banking density",
        detail:
          "Agent outlets grow from 1.2M to 2.5M by 2030 with at least one active agent per ward. CBN agent guidelines remain stable with fair commission structures.",
      },
      {
        title: "Open banking and credit data",
        detail:
          "Credit bureaus and open-banking APIs share repayment histories for 80M borrowers by 2040. POS and utility payment data supplement thin-file lending for SMEs.",
      },
      {
        title: "CBN instant payment leadership",
        detail:
          "NIBSS rails process 50B+ transactions annually by 2040 with sub-second settlement. Cross-border linkages with ECOWAS partners enable regional remittance and trade payments.",
      },
      {
        title: "Microfinance and cooperative scale",
        detail:
          "Licensed MFBs and cooperatives serve 30M active borrowers by 2035 with transparent pricing caps and linkage to deposit insurance.",
      },
      {
        title: "Consumer protection and stability",
        detail:
          "CBN maintains predictable FX and licensing rules for fintechs. Deposit insurance covers MFB deposits. Fraud and cyber standards enforced without shutting down innovation.",
      },
    ],
    risks: [
      {
        title: "Regulatory whiplash",
        detail:
          "Sudden crypto bans, FX restrictions, or licensing freezes without transition periods could collapse fintech balance sheets and set inclusion back 5 years.",
      },
      {
        title: "Agent network collapse",
        detail:
          "If agent commissions become unviable or cash shortages persist, last-mile access reverts to informal handlers outside regulatory oversight.",
      },
      {
        title: "Credit bubble and defaults",
        detail:
          "Aggressive unsecured lending to SMEs without bureau data could trigger a 2030s NPL crisis that dries up credit for legitimate borrowers.",
      },
      {
        title: "Cyber fraud at scale",
        detail:
          "Large-scale SIM swap or payment-rail breaches would erode trust in digital finance, especially among older and rural users.",
      },
      {
        title: "Persistent gender gap",
        detail:
          "If women remain 15+ percentage points less banked than men, half the population stays partially excluded from credit and insurance products.",
      },
      {
        title: "Dollarization of savings",
        detail:
          "Naira instability could push middle-class savings into crypto or foreign accounts, starving domestic banks of deposit base for SME lending.",
      },
    ],
    sourceIds: ["world-bank-financial-inclusion", "cbn-financial-access"],
  },
  {
    slug: "transportation",
    title: "Transportation & Logistics",
    tagline: "Roads, rail, ports, and the cost of moving people and goods",
    headline2050:
      "A connected federation — standard-gauge rail from Lagos to Kano, 24-hour ports, and urban transit that makes 400 million people mobile without wasting a generation in traffic.",
    baseline: {
      logisticsPerformanceIndex: "2.6 / 5",
      airPassengersPer1000: "31",
      roadDeathsPer100k: "17.2",
      standardGaugePassengerLines: "2 in service",
    },
    scenarioRanges: [
      { label: "Logistics Performance Index (2050 scenario)", unit: "score 1–5", low: 2.9, base: 3.5, high: 3.9 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "Corridors That Actually Connect",
        narrative:
          "Lagos–Ibadan and Abuja–Kaduna standard-gauge passenger services run daily. Lagos Metro Blue Line carries peak commuters. Cargo clearing at the Lagos ports is treated as a days-not-weeks problem — scanners, barge feeders, and a working truck call-up. BRT or equivalent busways operate in Lagos, Abuja, and Kano.",
        metrics: {
          logisticsPerformanceIndex: "2.8 / 5",
          airPassengersPer1000: "80",
          standardGaugePassengerLines: "Lagos–Ibadan + Abuja–Kaduna daily",
        },
      },
      {
        year: 2040,
        headline: "The North–South Spine",
        narrative:
          "Standard-gauge freight and passenger rail links Lagos–Abuja–Kano, with spurs toward Warri and Port Harcourt. Inland dry ports in Kano and Kaduna take pressure off the coast. Urban rail or BRT reaches six state capitals. Highway concessions keep the Lagos–Ibadan and Abuja–Keffi corridors in maintainable condition.",
        metrics: {
          logisticsPerformanceIndex: "3.2 / 5",
          airPassengersPer1000: "180",
          northSouthSpine: "Lagos–Abuja–Kano freight + passenger",
        },
      },
      {
        year: 2050,
        headline: "A Logistics Country, Not a Queue",
        narrative:
          "Nigeria's logistics score approaches today's Italy (LPI 3.7 in 2023). Coastal shipping and rail move bulk cargo; trucks handle last mile. Lagos, Abuja, and Kano have functioning urban rail. The colonial extractive map — rails to the sea, not to each other — is finally reversed.",
        metrics: {
          logisticsPerformanceIndex: "3.5 / 5",
          airPassengersPer1000: "400",
          roadDeathsPer100k: "8.0",
        },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "colonial-economy",
        title: "Rails Built to Extract",
        summary: "Colonial railways ran interior to port, not region to region — a map the 2050 network is designed to invert.",
      },
      {
        timelineEntryId: "lagos-brt",
        title: "Lagos BRT",
        summary: "Africa's first full BRT showed that Nigerian cities could move people at scale when lanes are protected and fares are simple.",
      },
      {
        timelineEntryId: "standard-gauge-rail",
        title: "Standard-Gauge Revival",
        summary: "Lagos–Ibadan and Abuja–Kaduna lines proved modern rail is possible — and how slowly one corridor still becomes a network.",
      },
    ],
    assumptions: [
      {
        title: "Standard-gauge completion, not just announcements",
        detail:
          "Lagos–Kano passenger and freight standard-gauge is fully operational by 2038, with Warri and Port Harcourt spurs by 2045. Contracts include maintenance set-asides so new lines do not decay within a decade of opening.",
      },
      {
        title: "Port clearing in days, not weeks",
        detail:
          "The scenario assumes Lagos port cargo leaves the terminals in days rather than remaining stacked for weeks — through 24-hour gates, scanners, barge feeders, and a functioning truck call-up. We do not publish a current dwell-day baseline: World Bank LPI and CPPI do not report Apapa cargo dwell, and unpublished operator figures should not be presented as a sourced series.",
      },
      {
        title: "Urban transit in the three largest metros",
        detail:
          "Lagos Metro (Blue and Red lines) plus BRT carry 1M+ daily trips by 2040. Abuja and Kano run dedicated busways or light rail on at least one high-demand corridor each by 2035.",
      },
      {
        title: "Road asset management, not only new tarmac",
        detail:
          "WHO GSRRS 2023 records 84,000 paved kilometres in Nigeria (2019). The scenario is condition and safety of that network — FERMA and state PPPs keeping most federal paved roads in good or fair condition by 2035, with axle-load enforcement so the same stretches are not rebuilt every few years.",
      },
      {
        title: "Inland dry ports and multimodal freight",
        detail:
          "Kano and Kaduna inland ports handle 30%+ of northern import containers by 2040, moving boxes by rail from the coast instead of 1,000 km of overloaded trucks.",
      },
      {
        title: "Power and security on the corridors",
        detail:
          "Signalling, scanners, and night running require the energy-sector delivery path (12 GW by 2030). Highway and rail security in the northwest and north-central is good enough for overnight freight — otherwise the spine exists on paper only.",
      },
      {
        title: "Coastal and inland waterways",
        detail:
          "Lagos–Warri–Port Harcourt coastal barges and Niger/Benue dredging take bulk off the roads by 2040, cutting tanker and cement truck volumes on the southwest–south-south axis.",
      },
    ],
    risks: [
      {
        title: "White-elephant rail without freight",
        detail:
          "Passenger-only prestige lines that never carry containers would repeat Ajaokuta: capital spent, logistics unchanged. 2050 LPI gains require freight paths and last-mile trucking reform, not stations alone.",
      },
      {
        title: "Port capture and trucking cartels",
        detail:
          "If call-up, scanning, and barge rules are captured by incumbents, cargo still sits in the terminals for weeks regardless of new cranes — the pattern that has survived every 'ease of doing business' announcement.",
      },
      {
        title: "Insecurity on highways and rail",
        detail:
          "Kidnapping and vandalism on Abuja–Kaduna and northern highways would keep cargo on expensive air and escorted convoys, wiping out the cost advantage of a completed spine.",
      },
      {
        title: "Urban sprawl without transit",
        detail:
          "If Lagos and Kano keep expanding without dedicated lanes, metro ridership never substitutes for danfo and okada, and commute times worsen even as GDP rises.",
      },
      {
        title: "FX and contractor arrears",
        detail:
          "Imported rolling stock, signalling, and cranes stall when naira convertibility fails or government arrears pile up — the stop-start cycle that stretched Lagos–Ibadan over a decade.",
      },
      {
        title: "Climate and flooding",
        detail:
          "Lagos coastal flooding and Niger Delta inundation can close ports and the Lagos–Ibadan corridor for days. Without drainage and elevation standards, 2050 assets sit below the waterline.",
      },
    ],
    sourceIds: [
      "world-bank-lpi",
      "who-road-safety",
      "afdb-industrialization",
      "agenda-2050-npc",
      "world-bank-nigeria-overview",
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate & Housing",
    tagline: "Density, land tenure, and the cost of a roof as the population heads toward 400 million",
    headline2050:
      "A country that can house 400 million people — denser cities with titled plots, mortgages that work, and rents that no longer swallow half a paycheck.",
    baseline: {
      populationDensity: "250 per km²",
      urbanShare: "62%",
      urbanInSlums: "48.5%",
      housingDeficitRange: "22–28 million units",
      mortgagesToGdp: "0.6%",
    },
    scenarioRanges: [
      { label: "Urban population in slums (2050 scenario)", unit: "%", low: 38, base: 25, high: 15 },
      { label: "Urban share of population (2050 scenario)", unit: "%", low: 66, base: 70, high: 74 },
    ],
    reviewStatus: "pending-review",
    projections: [
      {
        year: 2030,
        headline: "Titles Before Towers",
        narrative:
          "Population is still climbing fast. The binding constraint is not empty land — national density already matches Germany — but who holds a Certificate of Occupancy in Lagos, Kano, Abuja, and Onitsha. States digitize consent and cut the cost of registering property. Incremental upgrading reaches a first wave of informal settlements instead of demolition-only. Mortgage refinance starts to move off the National Housing Fund's tiny book.",
        metrics: {
          urbanInSlums: "42%",
          urbanShare: "65%",
          populationDensity: "~290 per km²",
        },
      },
      {
        year: 2040,
        headline: "Supply Catches a Fraction of Demand",
        narrative:
          "Annual formal completions are no longer a rounding error against household formation. New towns along the Lagos–Ibadan and Abuja–Kaduna corridors — tied to the transportation spine — take pressure off the densest cores. Rent as a share of urban wages stops rising. Construction still imports too much cement chemistry, but local materials hubs cut the 2019–2024 cost spike from becoming a permanent tax on every wall.",
        metrics: {
          urbanInSlums: "33%",
          urbanShare: "68%",
          populationDensity: "~360 per km²",
        },
      },
      {
        year: 2050,
        headline: "Dense, Titled, and Livable",
        narrative:
          "Four hundred million people on the same land mass means roughly 430 people per square kilometre — denser than today's United Kingdom. That only works if housing supply, transit, and power move together. The base case is not a G7 mortgage market. It is slum share down to about a quarter of urban residents, most urban land transactable, and rents that leave room for food. Speculative Lekki pricing still exists; it no longer defines how a nurse or teacher lives.",
        metrics: {
          urbanInSlums: "25%",
          urbanShare: "70%",
          populationDensity: "~430 per km²",
        },
      },
    ],
    historicalWaypoints: [
      {
        timelineEntryId: "colonial-economy",
        title: "Colonial Towns, Extractive Land",
        summary: "Lagos and the rail-head towns were built to move crops to ports — density without a housing system.",
      },
      {
        timelineEntryId: "land-use-act-1978",
        title: "The Land Use Act",
        summary: "1978 vested urban land in state governors. Forty years later, titles are still the bottleneck that inflates prices.",
      },
      {
        timelineEntryId: "structural-adjustment",
        title: "Naira Shock and Housing Costs",
        summary: "Devaluation made imported building materials and urban rent a larger share of shrinking real wages — a pattern that returned in 2023–24.",
      },
    ],
    assumptions: [
      {
        title: "Population and density are the demand engine",
        detail:
          "NPC's published path toward ~400 million people by 2050, on ~924,000 km² of land, implies national density rising from 250 per km² (WDI 2023) to about 430. That is not a G7-style empty-continent problem: Nigeria is already as dense as Germany. Housing stress concentrates where people actually move — Lagos, Kano, Ibadan, Abuja, Onitsha, Port Harcourt — so prices and rents rise fastest in those agglomerations.",
      },
      {
        title: "Urbanization still has a long way to run",
        detail:
          "WDI 2023: 62% urban versus ~80% in most G7 members. As the urban share rises toward a 70% 2050 scenario, more households compete for titled plots in the same cities. Without supply, density becomes overcrowding and slum growth, not productive agglomeration.",
      },
      {
        title: "Informal urban housing is the measured gap",
        detail:
          "WDI / UN-Habitat: 48.5% of Nigeria's urban population lived in slums in 2022, against ~0–2% in G7 members. The 2050 base case (25%) still leaves tens of millions in inadequate housing — optimistic relative to today, not a claim that Lagos will look like Tokyo.",
      },
      {
        title: "Deficit figures are a range, not a census",
        detail:
          "CAHF (2024 Yearbook) cites ~28 million missing units in 2023 (up from ~14 million in 2010). AFP fact-check reporting notes FMBN has used ~22 million. We treat 22–28 million as the sourced range and do not use larger political figures. Closing it requires on the order of hundreds of thousands of formal units a year; CAHF reports combined government-plus-private delivery around 50,000 versus ~700,000 needed.",
      },
      {
        title: "House prices and rents are an inflation-plus-scarcity story",
        detail:
          "CAHF 2024 reports Lekki and Ikeja rents up more than 200% since 2019, and that many urban households spend over 50% of salary on rent — well above the 30% affordability rule of thumb. Cement prices in the same profile rose several-fold over 2019–2024. The scenario assumes naira stabilization plus titled supply so that rent-to-income stops climbing even as density rises. There is no WDI house-price index that includes Nigeria and the G7, so we do not invent a cross-country price-to-income row.",
      },
      {
        title: "Land Use Act reform and cheaper registration",
        detail:
          "World Bank Doing Business 2020: registering property in Nigeria took 12 procedures, ~92 days, and over 11% of property value. CAHF notes NBS 2018: most landlords lack titles; C-of-O coverage is in the single digits. The 2030 path assumes states cut consent time and cost so land can be collateral — otherwise mortgages cannot scale past CAHF's 0.6% of GDP (2021).",
      },
      {
        title: "Transit and power are housing policy",
        detail:
          "If the transportation spine and 12 GW-by-2030 energy delivery fail, new housing on the urban edge is a generator-and-okada tax. Commute time is part of housing cost. Real-estate scenarios assume those sector pages' base cases hold.",
      },
    ],
    risks: [
      {
        title: "Inflation reprices every wall",
        detail:
          "Another naira slide repeats 2023–24: cement, granite, and dollar-linked finishes jump, developers freeze, and landlords pass costs into rent. Density then shows up as more people per room, not more buildings.",
      },
      {
        title: "Title reform captured by insiders",
        detail:
          "Digitized C-of-O that only serves connected applicants would formalize speculation, not affordability — raising listed prices without shrinking slums.",
      },
      {
        title: "Demolition without replacement",
        detail:
          "Clearing waterfront or highway-setback settlements without equivalent units elsewhere displaces households into farther slums and can raise, not lower, the urban slum share.",
      },
      {
        title: "Prestige supply, missing middle",
        detail:
          "If completions stay concentrated in Lekki, Banana Island, and Maitama, median prices keep soaring while the 22–28 million unit gap is filled only by informal building.",
      },
      {
        title: "Climate and flooding",
        detail:
          "Lagos and Delta flood risk can wipe out low-lying stock and insurance appetite. Building in the path of water makes 2050 density lethal rather than productive.",
      },
      {
        title: "Insecurity and stalled new towns",
        detail:
          "Banditry on peri-urban corridors and farmer–herder conflict in the middle belt can freeze satellite-city land, forcing even more people into already expensive cores.",
      },
    ],
    sourceIds: [
      "world-bank-g7-indicators",
      "cahf-nigeria-housing",
      "npc-population-projection",
      "world-bank-doing-business",
      "world-bank-nigeria-overview",
    ],
  },
];
