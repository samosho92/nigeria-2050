import type { CoolProject } from "@/types/content";

export const COOL_PROJECTS: CoolProject[] = [
  {
    id: "postal-codes",
    title: "A working national postal code",
    summary:
      "Give every street and compound a code people actually use — so parcels, census teams, and ambulances can find a place without a landmark story.",
    detail:
      "Nigeria has postcodes on paper; daily life still runs on “second turning after the mosque.” A used code, at street or building level, is the missing index for last-mile logistics, voter rolls, utility connections, and a census that can be revisited. Start with federal highways and state capitals, publish an open geocoder, and require the code on shipping labels and government forms. The UK’s postcodes, Japan’s 〒 system, and South Korea’s road-name addresses show the same sequence: unique codes, then maps, then habits.",
    inspiredBy: "UK postcodes, Japan’s 〒 system, South Korea’s road-name addresses",
    sectorSlugs: ["transportation", "real-estate", "governance", "financial-inclusion"],
    source: "editorial",
    mockHref: "/projects/postal-codes",
  },
  {
    id: "road-signs",
    title: "A road-sign campaign you can drive by",
    summary:
      "Post speed limits on highways and city roads, and put stop signs at junctions that currently run on luck and shouting.",
    detail:
      "Many federal highways and intra-city roads still lack a posted limit, a stop sign, or a pedestrian warning a stranger could read at night. A national campaign should install: (1) speed-limit plates on every dual carriageway and intercity corridor, (2) stop or yield signs at uncontrolled junctions, (3) school-zone and crossing signs, and (4) consistent kilometre markers. Pair signs with a published standard — Vienna Convention / MUTCD-style — so states do not invent their own shapes. Rwanda’s road-safety programme and the UK’s traffic-sign regulations show that signs first, then enforcement, cuts guesswork. This is not a speed camera programme; it is the unglamorous layer that makes one possible.",
    inspiredBy: "UK traffic signs, US MUTCD, Rwanda’s road-safety programme",
    sectorSlugs: ["transportation", "security", "governance"],
    source: "editorial",
    mockHref: "/projects/road-signs",
  },
  {
    id: "public-libraries",
    title: "A public library within 100 km — then denser",
    summary:
      "A floor of one public library within 100 km of every community, then urban branches within a short walk, with books, power, toilets, and a children’s room.",
    detail:
      "The 100 km rule is a rural floor, not the ambition. In cities, the standard should tighten to a branch within about 2–3 km, or one per 50,000 people — whichever is denser. Every branch needs a minimum kit: a children’s section, study seats, working toilets, electricity, a librarian, and wifi. Add mobile libraries for riverine and pastoral routes, legal-deposit copies of Nigerian publications, and evening hours for workers. Finland’s library law treats this as infrastructure, not charity; Carnegie networks and the UK county system show how a thin grid becomes a habit. Pair buildings with a national catalogue so a title in Makurdi can be requested in Maiduguri.",
    inspiredBy: "Finland’s library law, UK public library network, Carnegie libraries",
    sectorSlugs: ["education", "technology", "creative-economy", "governance"],
    source: "editorial",
    mockHref: "/projects/public-libraries",
  },
  {
    id: "emergency-112",
    title: "One emergency number that actually dispatches",
    summary:
      "A single, remembered number — with trained dispatch that can send police, fire, or an ambulance to a coded address.",
    detail:
      "Emergency response today is a patchwork of state lines, personal phone numbers, and social-media pleas. A national 112-style service only works if it is staffed, mapped, and tied to the address/postcode layer. The EU’s 112 and the US 911 systems are boring on purpose: one number, language support, location, and a handoff to the nearest capable unit. Nigeria’s version should start in a few state clusters, publish response-time reports, and refuse to launch a number that rings into voicemail.",
    inspiredBy: "EU 112, US 911",
    sectorSlugs: ["security", "healthcare", "technology", "governance"],
    source: "editorial",
    mockHref: "/projects/emergency-112",
  },
  {
    id: "civil-registry",
    title: "Birth registration that sticks",
    summary:
      "Register every birth in a civil registry that schools, clinics, and banks can trust — so a child does not need a well-connected uncle to exist on paper.",
    detail:
      "Nordic civil registries and Rwanda’s digitised civil registration show the same prize: a legal identity issued once, used many times, instead of a new affidavit for every exam and SIM card. Tie registration to clinic deliveries and community health workers, issue a number at birth, and let that record unlock school enrolment, immunisation, and later a bank account. The 2050 case for education and financial inclusion assumes we know who is in the room.",
    inspiredBy: "Nordic civil registries, Rwanda’s CRVS digitisation",
    sectorSlugs: ["governance", "healthcare", "education", "financial-inclusion"],
    source: "editorial",
  },
  {
    id: "land-titles",
    title: "Titles you can look up, not queue for",
    summary:
      "Digitise Certificates of Occupancy and make ownership searchable, so mortgages, planning, and inheritance are not a rumour.",
    detail:
      "The Land Use Act already vests urban land in governors; the daily failure is the paper trail. A Torrens-style register — one authoritative record, publicly queryable, with a mapped parcel — is how Australia, New Zealand, and Rwanda made titles usable as collateral. Scan the backlog, georeference parcels, publish a cadastre, and put governor’s-consent status on the same record. Until that exists, housing finance and orderly cities remain speeches.",
    inspiredBy: "Torrens title (Australia/NZ), Rwanda’s land register",
    sectorSlugs: ["real-estate", "governance", "financial-inclusion"],
    source: "editorial",
    mockHref: "/projects/land-titles",
  },
  {
    id: "solar-streetlights",
    title: "Light the street, not just the compound",
    summary:
      "Solar street lighting on corridors, markets, and junctions — public light as a security and mobility service, not a generator in one yard.",
    detail:
      "Dark roads shift risk onto pedestrians, traders, and anyone waiting for a bus. A corridor programme (not scattered vanity poles) with maintained solar lights, numbered for repair, and a public outage map is closer to how many East Asian and increasingly African cities treat lighting: as infrastructure. Start with markets, school routes, and highway junctions. Energy delivery and security both move when the street is visible after 7 p.m.",
    inspiredBy: "Corridor lighting programmes in Kigali, Singapore, and Korean cities",
    sectorSlugs: ["energy", "security", "transportation"],
    source: "editorial",
  },
  {
    id: "primary-care-catchment",
    title: "A clinic you can walk to",
    summary:
      "Define catchment areas so every neighbourhood has a primary-care clinic within a published walking or transit time — not only a teaching hospital in the capital.",
    detail:
      "The NHS and several European systems plan primary care by geography: a list, a building, a nurse, a referral path. Nigeria’s 2050 health case needs the unglamorous layer beneath tertiary hospitals — immunisation, antenatal, hypertension, trauma first response. Publish maps of uncovered wards, staff the gaps, and stop counting hospital beds as if they were access. Pair with the civil registry so a child’s immunisation record is not a cardboard card in a drawer.",
    inspiredBy: "NHS catchment planning, Cuba’s family-doctor model at neighbourhood scale",
    sectorSlugs: ["healthcare", "governance", "education"],
    source: "editorial",
  },
  {
    id: "open-budgets",
    title: "Budgets and contracts in public, in time",
    summary:
      "An open portal for federal and state budgets, tenders, and contract awards — searchable the week they are signed, not years later in a PDF.",
    detail:
      "data.gov, the UK’s contract finder, and several Latin American open-contracting portals made “follow the money” a browser task. Nigeria already publishes some budgets; the gap is timeliness, machine-readable tables, and contract-level detail (who won, for what, at what price). Civic-tech only works if the feed is official. Governance and the economy both improve when a journalist in Jos and a contractor in Aba can see the same line item.",
    inspiredBy: "US data.gov, UK Contracts Finder, Open Contracting Data Standard",
    sectorSlugs: ["governance", "technology", "economy"],
    source: "editorial",
  },
  {
    id: "waste-routes",
    title: "Waste collection that comes on a timetable",
    summary:
      "Numbered routes, published days, and a recycling split — so refuse is a municipal service, not a burning pile at the junction.",
    detail:
      "South Korea’s volume-based waste fee and Germany’s dual system made households sort because collection was reliable and priced. Start simpler: every urban ward gets a collection day, a mapped route, and a complaint number that logs missed streets. Then add a dry/wet split and a landfill that is not an open dump upwind of housing. Healthcare, real estate, and manufacturing (materials recovery) all sit downstream of this unglamorous truck.",
    inspiredBy: "South Korea’s volume-based waste fee, Germany’s dual system",
    sectorSlugs: ["real-estate", "healthcare", "manufacturing"],
    source: "editorial",
  },
  {
    id: "urban-parks",
    title: "A park within a 15-minute walk",
    summary:
      "Treat public green space as a planning standard — shade, a bench, a pitch — not leftover land after the last plot is sold.",
    detail:
      "Singapore’s park connector, London’s metropolitan open-land rules, and many G7 cities set a walking-distance standard for public green space. Nigerian cities still sell the setback. A 2050 real-estate and health case needs published park standards, protection from conversion, and lighting that makes evening use possible. Start with school fields that stay open after hours and river setbacks that remain public.",
    inspiredBy: "Singapore park connectors, London open-space standards",
    sectorSlugs: ["real-estate", "healthcare", "security"],
    source: "editorial",
  },
  {
    id: "school-meals",
    title: "A school meal that shows up",
    summary:
      "A national school-feeding programme with local procurement — so enrolment, nutrition, and farm income move together.",
    detail:
      "Brazil’s PNAE and India’s midday meal tied a plate of food to attendance and to local farmers. Nigeria has run versions of this; the 2050 version needs coverage you can audit (who was fed, from which farm, on which day) and a menu that is actually cooked. Agriculture, education, and health share the same truck: a reliable meal at school.",
    inspiredBy: "Brazil’s PNAE, India’s midday meal scheme",
    sectorSlugs: ["education", "agriculture", "healthcare"],
    source: "editorial",
  },
  {
    id: "grid-outage-map",
    title: "A grid that tells you when the light is coming",
    summary:
      "Live feeder maps and honest outage windows from every Disco — so a clinic, a welder, and a household can plan around power instead of guessing.",
    detail:
      "Nigerians already know the light will go; they do not know when it will return. A national outage layer — feeder by feeder, published by DisCos and TCN, with a timestamp and a restoration window — is the missing customer-facing half of the grid. Pair it with a meter that matches the bill and a complaint that logs. UK network operators and Kenya Power’s prepaid tokens show the sequence: measure, publish, then improve. The 2050 energy and manufacturing cases assume factories can schedule a shift. They cannot if the only forecast is a rumour on a street WhatsApp.",
    inspiredBy: "UK DNO outage maps, Kenya Power prepaid tokens",
    sectorSlugs: ["energy", "technology", "manufacturing", "governance"],
    source: "editorial",
  },
  {
    id: "brt-on-a-map",
    title: "A bus that exists on a map",
    summary:
      "City buses with published routes, fares, and arrival windows — so getting across town is a timetable, not a negotiation at the roadside.",
    detail:
      "Lagos BRT proved a corridor can move people; most Nigerian cities still run danfo economics with no map a visitor could follow. A 2050 transport case needs: numbered routes, a fare card that works across operators, stops that are marked, and a public GTFS feed so a phone can show the next bus. Bogotá’s TransMilenio and London’s bus spider maps are not magic — they are a published network plus enforcement of the lane. Start with one city per geopolitical zone, keep the existing operators in the system, and refuse to call it BRT if the lane is a car park by noon.",
    inspiredBy: "Bogotá TransMilenio, London bus maps, Lagos BRT (the corridor that already works)",
    sectorSlugs: ["transportation", "technology", "real-estate"],
    source: "editorial",
  },
  {
    id: "farm-cold-chain",
    title: "Cold rooms from farm to market",
    summary:
      "A chain of packhouses, refrigerated trucks, and market cold rooms so tomatoes, fish, and vaccines do not die on the road.",
    detail:
      "Nigeria grows enough food to waste a third of it between the farm and the stall. A working cold chain is boring infrastructure: packhouses at production clusters, a few thousand refrigerated trucks on known corridors, and cold rooms at urban markets with a published temperature log. India’s National Centre for Cold-chain Development and Dutch horticulture logistics show that the prize is not a single giant freezer — it is a connected string. Agriculture, manufacturing (processing), and health (vaccines) share the same compressor. Start with tomato, fish, and immunisation, then widen.",
    inspiredBy: "India’s cold-chain programme, Dutch horticulture logistics",
    sectorSlugs: ["agriculture", "manufacturing", "healthcare", "economy"],
    source: "editorial",
  },
  {
    id: "dual-apprenticeship",
    title: "An apprenticeship employers actually hire from",
    summary:
      "A dual training track — classroom plus a paid workplace — whose certificate a factory, hospital, or studio will recognise without a second interview in someone’s uncle’s office.",
    detail:
      "Nigeria already has apprentices in mechanics’ yards and fashion workshops; the state rarely accredits them, and employers rarely trust the polytechnic slip. Germany’s dual system and Singapore’s ITE made the workplace the campus: a contract, a stipend, a standard, and a certificate that is a hiring signal. Pair trade unions, manufacturers, hospitals, and Nollywood guilds with a slim national framework — not another unread curriculum PDF. Education, manufacturing, and the creative economy all stall when skill is real but unreadable on paper.",
    inspiredBy: "Germany’s dual vocational system, Singapore’s Institute of Technical Education",
    sectorSlugs: ["education", "manufacturing", "creative-economy", "economy"],
    source: "editorial",
  },
  {
    id: "published-water",
    title: "Water you can drink — or at least a report",
    summary:
      "Municipal water with a published quality test, a tariff that funds treatment, and a pipe that is not a rumour.",
    detail:
      "Most urban households already pay for water; they pay the tanker, the sachet, and the borehole, not the utility. A 2050 health and housing case needs utilities that publish weekly quality results (coliform, chlorine residual, turbidity), meter what they actually deliver, and repair bursts on a logged ticket. Singapore’s PUB and UK water-company reports are the unglamorous standard: test, publish, fine. Start with state capitals, protect borehole data so we know the aquifer, and stop counting ‘access’ as a tap that ran in 2018.",
    inspiredBy: "Singapore PUB, UK drinking-water quality reports",
    sectorSlugs: ["healthcare", "real-estate", "governance"],
    source: "editorial",
  },
  {
    id: "port-clearance",
    title: "A port that clears cargo in days",
    summary:
      "Single-window customs, published dwell times, and a queue you can see — so a container is not a hostage.",
    detail:
      "Apapa and Onne already move the country’s trade; they also warehouse it. A working port is a clock: electronic single window, joint inspections, a published dwell-time dashboard, and a truck appointment that is not sold at the gate. Singapore, Rotterdam, and Morocco’s Tanger Med made speed a public metric. Manufacturing and the non-oil economy cannot diversify if a generator part sits six weeks in a stack. This is not a new harbour speech; it is the software and the discipline of the one we have.",
    inspiredBy: "Singapore Port, Rotterdam, Tanger Med",
    sectorSlugs: ["economy", "transportation", "manufacturing", "governance"],
    source: "editorial",
  },
  {
    id: "portable-pension",
    title: "A pension that follows the worker",
    summary:
      "One portable pot — informal and formal — that you can look up, add to from a phone, and take to the next job.",
    detail:
      "Nigeria’s RSA system already exists for the formal few; most workers still save in a room, a cooperative, or nothing. A 2050 financial-inclusion case needs a pot that follows a NIN, accepts small mobile contributions, and publishes fees in naira, not footnotes. The UK’s NEST auto-enrolment and Ghana’s three-tier scheme show the sequence: default enrolment, tiny contributions, one dashboard. Do not launch another product name until the existing RSA can be read on a cheap phone without a tout.",
    inspiredBy: "UK NEST auto-enrolment, Ghana’s three-tier pensions",
    sectorSlugs: ["financial-inclusion", "governance", "economy"],
    source: "editorial",
  },
  {
    id: "court-diary",
    title: "Court dates you can look up",
    summary:
      "A public case diary — hearing date, courtroom, adjournment reason — so justice is a calendar, not a rumour from a clerk.",
    detail:
      "Delay is the Nigerian court’s most reliable product. A national e-diary (even if hearings stay in person) with SMS reminders, published adjournment reasons, and a statistic for time-to-judgment is how Rwanda’s Irembo and several UK HMCTS services made the queue visible. Start with magistrate and high-court commercial lists, put the diary online the night before, and stop counting ‘computerisation’ as a donated scanner in a registrar’s office. Governance and security both depend on a date that holds.",
    inspiredBy: "Rwanda Irembo services, UK HMCTS online listings",
    sectorSlugs: ["governance", "technology", "security"],
    source: "editorial",
  },
  {
    id: "honest-market-scales",
    title: "Market scales that are honest",
    summary:
      "Inspected, sealed scales in every major market — so a mudu of grain and a kilo of chicken are the same in Onitsha and in Maiduguri.",
    detail:
      "Trade still runs on cups, tins, and a scale that belongs to the seller. A weights-and-measures campaign — calibrated scales, a hologram seal, surprise inspections, a fine that is collected — is how UK Trading Standards and many EU market regimes made a kilo mean a kilo. Pair with a public list of certified stalls. Agriculture and the everyday economy leak trust at the stall; financial inclusion cannot ‘cashless’ its way around a thumb on the scale. Start with grain, meat, and fuel pumps.",
    inspiredBy: "UK Trading Standards, EU legal metrology for retail scales",
    sectorSlugs: ["agriculture", "economy", "governance"],
    source: "editorial",
  },
  {
    id: "blood-and-oxygen",
    title: "Blood and oxygen that do not run out",
    summary:
      "A national stock map for blood units and medical oxygen — so a night-time emergency is a logistics problem, not a family WhatsApp fundraiser.",
    detail:
      "Hospitals already know how to transfuse and ventilate; they often cannot find the unit or the cylinder. A 2050 health case needs typed blood stocks visible across a state, oxygen plants that publish output, and a dispatch that can move a cylinder before dawn. Rwanda’s drone-supported blood network and India’s post-2021 oxygen-plant push are the analogue: inventory first, then the clever last mile. Pair with the emergency number and the address layer. Do not call it universal health coverage if the blood still has to be bought from a private donor at 2 a.m.",
    inspiredBy: "Rwanda’s blood-delivery network, India’s medical-oxygen scale-up",
    sectorSlugs: ["healthcare", "technology", "security"],
    source: "editorial",
  },
  {
    id: "last-mile-broadband",
    title: "Broadband treated as a utility",
    summary:
      "A public map of which LGA actually has affordable 4G or fibre — and a build-out duty for the ones that do not.",
    detail:
      "Coverage maps already look complete from a laptop in Victoria Island. A utility standard would publish speed, price per GB, and outage hours by LGA, then fund last-mile backhaul the way rural electrification was supposed to work. South Korea’s broadband as infrastructure and Kenya’s national fibre backbone show that the last mile is a policy, not a slogan. Education, tech jobs, and open government all assume a connection that a teacher in Gashua can pay for. Start with schools, PHCs, and local-government secretariats — then the street.",
    inspiredBy: "South Korea’s broadband utility model, Kenya’s national fibre backbone",
    sectorSlugs: ["technology", "education", "economy", "governance"],
    source: "editorial",
  },
  {
    id: "keep-the-drains",
    title: "Drains that are cleared before the rain",
    summary:
      "Mapped, numbered storm drains with a public cleaning calendar — so a wet season is weather, not a drowned street.",
    detail:
      "Every Nigerian city already has drains; many are a dump. A municipal programme that numbers channels, publishes a desilt calendar, fines dumping, and reports flooded junctions is closer to how Japanese river offices and Dutch water boards treat water: as a maintained system. Start with the known flood corridors in Lagos, Port Harcourt, Lokoja, and Maiduguri. Real estate, health, and agriculture (urban farming, access to markets) all sit downstream of a grate that was emptied in May, not August.",
    inspiredBy: "Dutch water boards, Japanese urban river maintenance",
    sectorSlugs: ["real-estate", "healthcare", "agriculture", "governance"],
    source: "editorial",
  },
  {
    id: "artist-royalties",
    title: "Royalties that actually reach the artist",
    summary:
      "Collecting societies with a public payout dashboard — so a song, a film, or a design can earn more than a handshake and a shout-out.",
    detail:
      "Nollywood, Afrobeats, and publishing already export; the money often stops at a middleman. A working collecting society publishes who was paid, for which work, and on what schedule — the way PRS for Music and France’s SACEM made royalties a boring bank transfer. Pair with a cheap, enforceable registration of works and a court that will hear a small claim. The creative-economy 2050 case is not more talent; it is a pipe that carries the fee. Start with radio, streaming, and hotel/public-performance logs that are audited.",
    inspiredBy: "UK PRS for Music, France’s SACEM",
    sectorSlugs: ["creative-economy", "governance", "financial-inclusion"],
    source: "editorial",
  },
  {
    id: "standards-lab",
    title: "A standards lab that can fail a product",
    summary:
      "A funded SON/NAFDAC testing capacity that actually rejects unsafe cement, fuel, drugs, and baby food — in public.",
    detail:
      "Nigeria already has regulators; importers already know which lab is slow. A 2050 manufacturing and health case needs accredited labs that publish pass/fail, a recall that reaches the market stall, and a fee structure that does not make honesty the expensive option. Germany’s PTB and Korea’s KATS treated measurement as industrial policy. Start with fuel quality, cement, and essential medicines — the three products whose failure is a death or a collapsed beam — and put the results online the week of the test.",
    inspiredBy: "Germany’s PTB, Korea’s KATS product-safety regime",
    sectorSlugs: ["manufacturing", "healthcare", "economy", "governance"],
    source: "editorial",
  },
];

export function getCoolProjectById(id: string): CoolProject | undefined {
  return COOL_PROJECTS.find((project) => project.id === id);
}
