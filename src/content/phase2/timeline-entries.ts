import type { TimelineEntry } from "@/types/content";

export const PHASE2_TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: "kanem-bornu-trade",
    era: "pre-colonial",
    title: "Kanem-Bornu Trade Networks",
    dateRange: "c. 900–1900",
    summary:
      "Trans-Saharan routes linked Lake Chad to North Africa, moving salt, kola, livestock, and craft goods across a vast commercial empire.",
    content:
      "Long before colonial borders, the Kanem-Bornu state anchored trade across the central Sahel. Caravans carried salt from desert mines southward and returned north with kola nuts, ivory, leather, and enslaved people. Bornu merchants maintained credit relationships and market courts that regulated weights, prices, and disputes. Agriculture supported the empire's towns: millet, sorghum, and cowpea farming along the Komadugu Yobe and Lake Chad floodplains fed urban populations and supplied caravan provisions. Horses imported from North Africa strengthened cavalry power and became a store of wealth. This was an integrated regional economy where farming, pastoralism, and long-distance exchange reinforced each other. British and French partition in the early twentieth century disrupted routes that had functioned for centuries, redirecting commerce toward coastal ports under European control. The legacy persists in northern Nigeria's market towns, cross-border livestock trade, and enduring commercial networks that predate the modern nation-state and still shape regional food and livestock flows today.",
    relatedSectorSlugs: ["economy", "agriculture"],
    sourceIds: ["cbo-nigeria-history", "fao-nigeria-agriculture"],
    artDirection: "pre-colonial",
  },
  {
    id: "colonial-cash-crops",
    era: "colonial",
    title: "Colonial Cash Crops & Food Dependency",
    dateRange: "1900–1960",
    summary:
      "Colonial policy prioritized export crops for European markets, reshaping land use and leaving Nigeria dependent on imported staples by independence.",
    content:
      "British administrators reorganized Nigerian agriculture around commodities Britain needed: cocoa in the west, groundnuts and cotton in the north, palm kernels and rubber in the east. Extension services, grading standards, and rail lines served export zones first. Farmers who adopted cash crops earned cash income but often reduced food plots to meet quota pressure. Local processing of palm oil and groundnuts was discouraged where it competed with British industry. During the Second World War, Nigeria supplied Allied forces with palm products and tin, deepening the export orientation. By the 1950s, the colony imported significant quantities of rice and wheat even as it exported food calories on paper. Nutrition surveys in the final colonial decade documented stunting and seasonal hunger in export-rich regions. Independence in 1960 inherited this structural imbalance: valuable foreign exchange from cash crops, but a food system vulnerable to global price swings and unable to feed a fast-growing urban population without imports. Reversing that dependency remains central to every 2050 agriculture scenario on this site.",
    relatedSectorSlugs: ["agriculture", "economy"],
    sourceIds: ["cbo-nigeria-history", "fao-nigeria-agriculture"],
    artDirection: "colonial",
  },
  {
    id: "nollywood-birth",
    era: "democracy",
    title: "Nollywood Emerges",
    dateRange: "1992–2005",
    summary:
      "Direct-to-video filmmaking in Lagos creates the world's second-largest film industry by output, turning storytelling into a national export.",
    content:
      "Nigeria's film industry did not begin in a studio lot. It began in markets. The 1992 release of Living in Bondage, shot on video for home viewing, proved that Igbo-language stories about ambition, ritual, and urban life could sell hundreds of thousands of VCD copies without cinema distribution. Producers copied the model: low budgets, fast turnaround, sales through Idumota and Alaba electronics hubs. By the early 2000s, Nigeria was releasing over a thousand titles a year, surpassing Hollywood in volume and employing actors, marketers, musicians, and technicians across Lagos, Enugu, and Asaba. Nollywood gave Nigeria a soft-power asset no oil field could match: recognizable narratives consumed across Africa and its diaspora. Distribution moved from VCD to DSTV channels, then to YouTube and streaming apps. Piracy cut margins, but the industry professionalized through guilds, film festivals, and co-production deals. For the creative economy, Nollywood demonstrated that cultural production at scale could generate jobs, foreign earnings, and global brand recognition from domestic talent and domestic audiences first.",
    relatedSectorSlugs: ["creative-economy", "technology", "tourism"],
    sourceIds: ["nollywood-industry-report", "cbo-nigeria-history"],
    artDirection: "democracy",
  },
  {
    id: "ajaokuta-steel",
    era: "military-rule",
    title: "Ajaokuta Steel Mill",
    dateRange: "1979–1990s",
    summary:
      "A Soviet-built integrated steel complex meant to industrialize Nigeria remains unfinished, symbolizing ambitious manufacturing plans that never fully delivered.",
    content:
      "In 1979, Nigeria signed a contract with Tyazhpromexport of the Soviet Union to build an integrated steel plant at Ajaokuta, on the Niger River in Kogi State. The vision was explicit: reduce dependence on imported steel, create upstream jobs in mining and downstream fabrication, and anchor a heavy-industry corridor in the middle belt. Construction progressed through the 1980s oil boom and continued after prices collapsed. By the early 1990s, much of the plant's physical infrastructure stood complete, but commissioning stalled over financing disputes, contract renegotiations, and governance turnover. Successive military and civilian administrations pledged completion; privatization attempts foundered. Decades later, Ajaokuta remains the country's most cited example of white-elephant industrial policy: billions spent, minimal output. Yet the ambition itself mattered. Nigeria's 2050 manufacturing scenarios assume learning from this failure: phased special economic zones, private operators with enforceable contracts, reliable power, and export markets rather than single mega-projects directed from Abuja without operational discipline.",
    relatedSectorSlugs: ["manufacturing", "economy", "transportation"],
    sourceIds: ["unido-manufacturing", "cbo-nigeria-history"],
    artDirection: "military",
  },
  {
    id: "nhis-launch",
    era: "democracy",
    title: "National Health Insurance Scheme",
    dateRange: "1999–2005",
    summary:
      "Nigeria establishes a formal health insurance framework, but low enrollment keeps most citizens paying out of pocket for care.",
    content:
      "The National Health Insurance Scheme Act of 1999 created Nigeria's first statutory pathway toward pooled health financing. Implementation began in 2005 under the NHIS, starting with federal civil servants and gradually expanding toward formal-sector employees through employer-based programs. The design mirrored social health insurance models used elsewhere: contributions fund a benefit package covering primary care, maternity services, and selected hospital procedures. In practice, coverage grew slowly. By the mid-2010s, only a small fraction of Nigerians were enrolled, overwhelmingly in the formal public and private workforce. Informal workers, rural residents, and the unemployed, the majority of the population, remained outside the system, paying cash at point of care. State-level schemes emerged with uneven quality. NHIS nonetheless changed the policy conversation: health financing moved from pure budget allocation toward insurance principles, accreditation of providers, and standardized tariffs. Every 2050 healthcare projection on Naija2050 assumes scaling pooled coverage, whether through NHIS expansion, state insurance hybrids, or digital enrollment linked to national identity systems.",
    relatedSectorSlugs: ["healthcare", "governance"],
    sourceIds: ["who-nigeria-health", "cbo-nigeria-history"],
    artDirection: "democracy",
  },
  {
    id: "agent-banking-boom",
    era: "reform",
    title: "Agent Banking & Mobile Money Scale",
    dateRange: "2013–present",
    summary:
      "CBN agent banking rules and smartphone adoption bring financial services to neighborhoods without bank branches.",
    content:
      "Traditional banks could not profitably serve Nigeria's vast informal and rural economy through branches alone. In 2013, the Central Bank of Nigeria published agent banking guidelines, allowing licensed banks and mobile money operators to recruit retail shops, pharmacists, and market traders as cash-in/cash-out points. Smartphone penetration and USSD codes lowered the technology barrier. Fintechs built agent networks at speed: OPay, Moniepoint, Palmpay, and others competed to sign up millions of agents who processed transfers, bill payments, and small-business collections for commissions. By the early 2020s, agent locations outnumbered bank branches by orders of magnitude, extending formal rails into peri-urban and rural corridors previously served only by cash and informal savings clubs. Regulatory updates tightened know-your-customer rules and capital requirements, but the model proved durable through FX volatility and policy shifts. Agent banking is the operational layer behind Nigeria's financial-inclusion gains: it connects market women, farmers, and gig workers to instant payment infrastructure that 2050 scenarios treat as foundational for tax formalization, social transfers, and digital commerce.",
    relatedSectorSlugs: ["financial-inclusion", "technology"],
    sourceIds: ["world-bank-financial-inclusion", "cbo-nigeria-history"],
    artDirection: "reform",
  },
  {
    id: "lagos-brt",
    era: "democracy",
    title: "Lagos Bus Rapid Transit",
    dateRange: "2008",
    summary:
      "Africa's first full BRT corridor opens on Ikorodu Road, dedicated lanes, prepaid fares, and proof that a Nigerian megacity can move people at scale.",
    content:
      "In March 2008, the Lagos Metropolitan Area Transport Authority launched the BRT-Lite corridor along Ikorodu Road. It was the first bus rapid transit system in sub-Saharan Africa: physically separated lanes, high-capacity buses, and a simple fare collected before boarding. The project was born of necessity. Lagos had already passed 15 million residents; danfo minibuses filled every gap in the road, and average peak commutes stretched past two hours. World Bank and LAMATA planning documents treated the corridor as a demonstration: if dedicated lanes could cut travel time on one arterial, the model could spread. Ridership climbed into the hundreds of thousands of daily trips within a few years. The BRT did not solve Lagos traffic. It showed that the constraint was political and spatial: reclaiming asphalt from mixed traffic. Subsequent expansions and the later Blue Line light rail sit in that lineage. Every 2050 urban-transit scenario on this site assumes cities other than Lagos copy the core idea: protected right-of-way, enforceable lanes, and fares ordinary workers can pay.",
    relatedSectorSlugs: ["transportation", "economy", "governance", "real-estate"],
    sourceIds: ["world-bank-nigeria-overview", "cbo-nigeria-history"],
    artDirection: "democracy",
  },
  {
    id: "standard-gauge-rail",
    era: "reform",
    title: "Standard-Gauge Rail Revival",
    dateRange: "2014–present",
    summary:
      "Abuja–Kaduna and Lagos–Ibadan passenger lines reopen modern rail in Nigeria, two corridors that prove the technology works and how slowly a network still forms.",
    content:
      "Colonial Nigeria built a narrow-gauge grid from interior cash-crop belts to the ports. By the 2000s those lines were largely unusable for passengers. From 2014, successive administrations contracted Chinese and other partners to lay standard-gauge track: Abuja–Kaduna opened to passengers in 2016; Lagos–Ibadan followed in 2021. The new lines cut a Lagos–Ibadan road trip that could take six hours in traffic to under two by rail. They also exposed the unfinished map. Freight paths, last-mile trucking, signalling, and security on the Kaduna corridor lagged the ribbon-cuttings. Bandit attacks on the Abuja–Kaduna service in 2022 forced suspensions that reminded planners: a railway is only as useful as the security and power around it. Completing Lagos–Kano as a freight-and-passenger spine is the hinge assumption in Naija2050's transportation base case. Until containers move north by rail, Apapa trucks will keep grinding the same coastal roads colonial engineers first paved for export.",
    relatedSectorSlugs: ["transportation", "economy", "energy", "security"],
    sourceIds: ["agenda-2050-npc", "world-bank-lpi", "cbo-nigeria-history"],
    artDirection: "reform",
  },
  {
    id: "land-use-act-1978",
    era: "military-rule",
    title: "The Land Use Act",
    dateRange: "1978",
    summary:
      "Military decree vests urban land in state governors, the legal architecture still sitting under today's title delays and soaring urban prices.",
    content:
      "The Land Use Act of 1978, enacted under General Olusegun Obasanjo's military government, nationalized radical title: urban land was vested in state governors, rural land in local governments, to be held in trust. The Act was meant to curb speculation, simplify access, and make land available for development after the oil-boom scramble. In practice it created a consent bottleneck. Governors' consent is required to alienate land; Certificates of Occupancy became the scarce paper that banks will mortgage. World Bank Doing Business 2020 still recorded registering property in Nigeria as a dozen steps, months of waiting, and more than a tenth of the property's value in costs. CAHF and NBS figures show most urban landlords still lack titles. Every 2050 housing scenario on this site assumes states can issue and transfer rights cheaply enough that density does not automatically become slums and 200% rent spikes in Lagos corridors. Repeal is politically radioactive, the Act is entrenched in the 1999 Constitution, so the plausible path is administrative reform: digitized consent, time limits, and lower fees.",
    relatedSectorSlugs: ["real-estate", "governance", "economy", "financial-inclusion"],
    sourceIds: ["cahf-nigeria-housing", "world-bank-doing-business", "cbo-nigeria-history"],
    artDirection: "military",
  },
  {
    id: "osun-osogbo-unesco",
    era: "democracy",
    title: "Sukur and Osun-Osogbo on the World Heritage List",
    dateRange: "1999–2005",
    summary:
      "Nigeria's two UNESCO World Heritage inscriptions: Sukur Cultural Landscape in Adamawa (1999) and the Osun-Osogbo Sacred Grove (2005).",
    content:
      "Sukur Cultural Landscape, on the Mandara Mountains in Adamawa, was inscribed in 1999: terraced farmland, dry-stone architecture, and a still-living Hidi palace culture. The Osun-Osogbo Sacred Grove, along the Osun River in Osun State, followed in 2005, a forest shrine complex restored in the twentieth century and still used for the annual Osun festival. They remain Nigeria's only World Heritage properties. The tentative list has since named Kano's walls, Idanre Hill, Ogbunike Caves, and other sites; none had joined the list by the 47th Committee session in 2025. Calabar Carnival (from 2004) and older festivals such as Argungu sit beside those groves as the living calendar. Every 2050 tourism scenario on this site treats the two inscriptions as a conservation payroll and a visitor path. Further inscriptions are labelled scenarios.",
    relatedSectorSlugs: ["tourism", "creative-economy", "agriculture"],
    sourceIds: ["unesco-world-heritage", "cbo-nigeria-history"],
    artDirection: "democracy",
  },
];
