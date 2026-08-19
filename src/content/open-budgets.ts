export type AwardLayer = "queryable" | "pdf" | "missing";
export type AwardStatus = "awarded" | "active" | "completed";
export type MdaBucket = "recurrent" | "capital" | "statutory";

export const BUDGET_STANDARD = {
  name: "NG-OC 01",
  inspiredBy: "Open Contracting Data Standard, UK Contracts Finder, US data.gov",
  snapshotLabel: "Illustrative Friday 24 April 2026",
  snapshotIso: "2026-04-24",
  actYear: 2026,
  actTitle: "2026 Appropriation Act",
  assentedOn: "17 April 2026",
  inForceFrom: "1 April 2026",
  priorCapitalExtendedTo: "30 June 2026",
  actUrl:
    "https://statehouse.gov.ng/president-tinubu-assents-to-2026-appropriation-bill-and-2025-budget-extension/",
  envelopeNaira: {
    total: 68_320_000_000_000,
    statutory: 4_799_000_000_000,
    debtService: 15_800_000_000_000,
    recurrent: 15_400_000_000_000,
    capital: 32_200_000_000_000,
  },
  rollout: [
    {
      step: "1",
      title: "Publish the envelope the week it is signed",
      detail:
        "Aggregate spend, statutory transfers, debt service, recurrent, and capital, with the assent date on the same page.",
    },
    {
      step: "2",
      title: "MDA tables in a feed",
      detail:
        "A journalist can sort Works from Defence without opening a scanned PDF. The vintage is the Act, with a timestamp.",
    },
    {
      step: "3",
      title: "Award rows",
      detail:
        "Buyer, supplier class, amount in naira, signed date. One identifier a contractor in Aba can quote on a phone.",
    },
    {
      step: "4",
      title: "Federal and state on the same portal",
      detail:
        "A line item in Jos and a line item in Abuja use the same fields. Civic-tech works when the feed is official.",
    },
  ],
} as const;

export const OPEN_TESTS = [
  {
    id: "dated",
    title: "A signed date",
    detail: "The row carries the day the award was signed. A speech without a date stays a speech.",
  },
  {
    id: "naira",
    title: "Amount in naira",
    detail: "The price sits on the record. Footnotes and dollar asides wait until the naira figure is there.",
  },
  {
    id: "buyer",
    title: "Named buyer",
    detail: "The MDA or state ministry is written here.",
  },
  {
    id: "supplier",
    title: "Supplier on the same page",
    detail: "A class of contractor, or a named firm once the real feed exists. Unknown means the row failed this test.",
  },
  {
    id: "queryable",
    title: "Queryable this week",
    detail: "Machine-readable the week of signature. A 2019 scan can be listed; it does not count as timely.",
  },
] as const;

export const LAYER_LABEL: Record<AwardLayer, string> = {
  queryable: "Queryable",
  pdf: "PDF scan",
  missing: "No award row",
};

export const STATUS_LABEL: Record<AwardStatus, string> = {
  awarded: "Awarded",
  active: "Active",
  completed: "Completed",
};

export interface BudgetJurisdiction {
  id: string;
  name: string;
  kind: "federal" | "state";
  city: string;
  summary: string;
}

export interface MdaLine {
  id: string;
  name: string;
  bucket: MdaBucket;
  naira: number;
  note: string;
}

export interface ContractAward {
  id: string;
  ocid: string;
  jurisdictionId: string;
  buyer: string;
  title: string;
  place: string;
  supplier: string;
  naira: number | null;
  signedOn: string | null;
  status: AwardStatus;
  layer: AwardLayer;
  note: string;
}

export const BUDGET_JURISDICTIONS: BudgetJurisdiction[] = [
  {
    id: "federal",
    name: "Federal Government",
    kind: "federal",
    city: "Abuja",
    summary:
      "2026 Appropriation Act envelope. Capital is about half. Debt service is still a large known quantity.",
  },
  {
    id: "lagos",
    name: "Lagos State",
    kind: "state",
    city: "Ikeja",
    summary: "Corridor spend that a visitor could find on a map: BRT, waste, a clinic kit.",
  },
  {
    id: "kaduna",
    name: "Kaduna State",
    kind: "state",
    city: "Kaduna",
    summary: "Water lab and a school kitchen. One row is typed; one is still a scan.",
  },
  {
    id: "rivers",
    name: "Rivers State",
    kind: "state",
    city: "Port Harcourt",
    summary: "Drains with a date, and a port call-up that lives in a 2025 PDF.",
  },
  {
    id: "plateau",
    name: "Plateau State",
    kind: "state",
    city: "Jos",
    summary: "The journalist-in-Jos test. A market lighting award signed on the snapshot day.",
  },
  {
    id: "abia",
    name: "Abia State",
    kind: "state",
    city: "Umuahia",
    summary: "The contractor-in-Aba test. Meters on an artisan cluster; an older access road has no row.",
  },
];

export const BUDGET_SEED_IDS = BUDGET_JURISDICTIONS.map((item) => item.id);

/** Press totals at National Assembly passage, used as vintage for this schematic. */
export const MDA_LINES: MdaLine[] = [
  {
    id: "def-rec",
    name: "Defence",
    bucket: "recurrent",
    naira: 2_690_000_000_000,
    note: "Largest recurrent share at passage.",
  },
  {
    id: "edu-rec",
    name: "Education",
    bucket: "recurrent",
    naira: 1_380_000_000_000,
    note: "Wage bill plus overheads.",
  },
  {
    id: "pol-rec",
    name: "Police Affairs",
    bucket: "recurrent",
    naira: 1_270_000_000_000,
    note: "Personnel-heavy.",
  },
  {
    id: "hth-rec",
    name: "Health & Social Welfare",
    bucket: "recurrent",
    naira: 1_010_000_000_000,
    note: "Clinics still need the capital kit below.",
  },
  {
    id: "agr-cap",
    name: "Agriculture & Food Security",
    bucket: "capital",
    naira: 3_250_000_000_000,
    note: "Largest capital MDA at passage.",
  },
  {
    id: "works-cap",
    name: "Works",
    bucket: "capital",
    naira: 3_170_000_000_000,
    note: "Duals and corridors.",
  },
  {
    id: "ist-cap",
    name: "Innovation, Science & Technology",
    bucket: "capital",
    naira: 1_830_000_000_000,
    note: "Includes last-mile kit in this mock.",
  },
  {
    id: "hth-cap",
    name: "Health & Social Welfare",
    bucket: "capital",
    naira: 1_220_000_000_000,
    note: "PHC kits sit here.",
  },
];

export const CONTRACT_AWARDS: ContractAward[] = [
  {
    id: "FC-WORKS-2026-0147",
    ocid: "ocds-ng-schematic-2026-0147",
    jurisdictionId: "federal",
    buyer: "Federal Ministry of Works",
    title: "Remaining dual carriageway works, Abuja–Kaduna A2",
    place: "Abuja–Kaduna Dual",
    supplier: "Indigenous Class A civil JV",
    naira: 186_000_000_000,
    signedOn: "2026-04-18",
    status: "awarded",
    layer: "queryable",
    note: "Same corridor as the road-sign campaign. The plate and the pavement should share a kilometre number.",
  },
  {
    id: "FC-AGR-2026-0082",
    ocid: "ocds-ng-schematic-2026-0082",
    jurisdictionId: "federal",
    buyer: "Federal Ministry of Agriculture and Food Security",
    title: "Grain silo cluster, Makurdi peri-urban",
    place: "Makurdi",
    supplier: "Regional agro-storage consortium",
    naira: 41_000_000_000,
    signedOn: "2026-04-21",
    status: "awarded",
    layer: "queryable",
    note: "A cold-chain cousin. Temperature logs would live on a later ticket.",
  },
  {
    id: "FC-PWR-2026-0311",
    ocid: "ocds-ng-schematic-2026-0311",
    jurisdictionId: "federal",
    buyer: "Federal Ministry of Power",
    title: "Feeder rehab, Garki clinic circuit",
    place: "Garki, FCT",
    supplier: "DisCo works contractor class",
    naira: 9_400_000_000,
    signedOn: "2026-04-22",
    status: "active",
    layer: "queryable",
    note: "Pairs with the grid-outage schematic: a named feeder, a restoration window, a ticket.",
  },
  {
    id: "FC-HTH-2026-0190",
    ocid: "ocds-ng-schematic-2026-0190",
    jurisdictionId: "federal",
    buyer: "Federal Ministry of Health and Social Welfare",
    title: "PHC minimum kit, Kwali hinterland",
    place: "Kwali, FCT",
    supplier: "Health commodities supplier class",
    naira: 2_100_000_000,
    signedOn: "2026-04-23",
    status: "awarded",
    layer: "queryable",
    note: "Rural cluster code FC-R04-027 on the postal index. No invented street.",
  },
  {
    id: "FC-IST-2026-0155",
    ocid: "ocds-ng-schematic-2026-0155",
    jurisdictionId: "federal",
    buyer: "Federal Ministry of Innovation, Science and Technology",
    title: "School backhaul, Gashua secretariat and PHC",
    place: "Gashua, Yobe",
    supplier: "ICT systems integrator class",
    naira: 6_800_000_000,
    signedOn: "2026-04-23",
    status: "awarded",
    layer: "queryable",
    note: "Last-mile as a line item a teacher can look up.",
  },
  {
    id: "FC-EDU-2025-4401",
    ocid: "ocds-ng-schematic-2025-4401",
    jurisdictionId: "federal",
    buyer: "Federal Ministry of Education",
    title: "Classroom block, Kano Municipal",
    place: "Kano",
    supplier: "Unknown",
    naira: 1_850_000_000,
    signedOn: "2025-11-12",
    status: "active",
    layer: "pdf",
    note: "Scanned appropriation excerpt. Amount is on page 41 of a 200-page PDF.",
  },
  {
    id: "FC-DEF-2019-088",
    ocid: "ocds-ng-schematic-2019-088",
    jurisdictionId: "federal",
    buyer: "Federal Ministry of Defence",
    title: "Barracks borehole, Maiduguri Metropolitan",
    place: "Maiduguri",
    supplier: "Unknown",
    naira: null,
    signedOn: null,
    status: "awarded",
    layer: "missing",
    note: "Announced in 2019. No award row, no amount, no date on this schematic.",
  },
  {
    id: "LA-WORKS-2026-0055",
    ocid: "ocds-ng-schematic-la-2026-0055",
    jurisdictionId: "lagos",
    buyer: "Lagos State Ministry of Transportation",
    title: "BRT lane posts and enforcement cameras, Ikorodu Road",
    place: "Ikorodu Road, Lagos",
    supplier: "Indigenous Class A civil JV",
    naira: 14_000_000_000,
    signedOn: "2026-04-19",
    status: "awarded",
    layer: "queryable",
    note: "A published lane plus a plate. The corridor already moves people.",
  },
  {
    id: "LA-WST-2024-112",
    ocid: "ocds-ng-schematic-la-2024-112",
    jurisdictionId: "lagos",
    buyer: "Lagos State Waste Management Authority",
    title: "Collection route, Alausa ward",
    place: "Alausa, Ikeja",
    supplier: "Municipal contractor class",
    naira: 420_000_000,
    signedOn: "2024-08-03",
    status: "completed",
    layer: "pdf",
    note: "Route number is in the scan. Missed-street complaints are not in this feed.",
  },
  {
    id: "LA-HTH-2026-0033",
    ocid: "ocds-ng-schematic-la-2026-0033",
    jurisdictionId: "lagos",
    buyer: "Lagos State Ministry of Health",
    title: "Primary-care kit, Ikeja catchment",
    place: "Ikeja",
    supplier: "Health commodities supplier class",
    naira: 1_800_000_000,
    signedOn: "2026-04-20",
    status: "awarded",
    layer: "queryable",
    note: "A clinic you can walk to still needs a kit on a dated row.",
  },
  {
    id: "KD-WAT-2026-0012",
    ocid: "ocds-ng-schematic-kd-2026-0012",
    jurisdictionId: "kaduna",
    buyer: "Kaduna State Ministry of Water Resources",
    title: "Water quality laboratory, Zaria",
    place: "Zaria",
    supplier: "Laboratory fit-out class",
    naira: 3_600_000_000,
    signedOn: "2026-04-22",
    status: "awarded",
    layer: "queryable",
    note: "Coliform, chlorine residual, turbidity. Publish the weekly sheet next.",
  },
  {
    id: "KD-WORKS-2026-0044",
    ocid: "ocds-ng-schematic-kd-2026-0044",
    jurisdictionId: "kaduna",
    buyer: "Kaduna State Ministry of Works",
    title: "Kilometre posts, Zaria bypass",
    place: "Zaria bypass",
    supplier: "Indigenous Class A civil JV",
    naira: 2_400_000_000,
    signedOn: "2026-04-19",
    status: "awarded",
    layer: "queryable",
    note: "A place you can radio. Same shape book as NG-TS 01.",
  },
  {
    id: "KD-EDU-2023-077",
    ocid: "ocds-ng-schematic-kd-2023-077",
    jurisdictionId: "kaduna",
    buyer: "Kaduna State Ministry of Education",
    title: "School-meal kitchen, Kaduna North",
    place: "Kaduna North",
    supplier: "Unknown",
    naira: 310_000_000,
    signedOn: "2023-06-18",
    status: "completed",
    layer: "pdf",
    note: "Who was fed, from which farm, on which day is still off this row.",
  },
  {
    id: "RV-DRAIN-2026-0008",
    ocid: "ocds-ng-schematic-rv-2026-0008",
    jurisdictionId: "rivers",
    buyer: "Rivers State Ministry of Environment",
    title: "Numbered storm drains, Port Harcourt flood corridor",
    place: "Port Harcourt",
    supplier: "Municipal contractor class",
    naira: 7_200_000_000,
    signedOn: "2026-04-18",
    status: "active",
    layer: "queryable",
    note: "A desilt calendar would be the next field on this standard.",
  },
  {
    id: "RV-PORT-2025-201",
    ocid: "ocds-ng-schematic-rv-2025-201",
    jurisdictionId: "rivers",
    buyer: "Rivers State Ministry of Transport",
    title: "Truck appointment system, Onne",
    place: "Onne",
    supplier: "ICT systems integrator class",
    naira: 1_150_000_000,
    signedOn: "2025-09-29",
    status: "active",
    layer: "pdf",
    note: "Dwell time is still a stack. The software row exists as a scan.",
  },
  {
    id: "PL-MKT-2026-0004",
    ocid: "ocds-ng-schematic-pl-2026-0004",
    jurisdictionId: "plateau",
    buyer: "Plateau State Ministry of Commerce",
    title: "Terminus stall lighting, Jos",
    place: "Jos",
    supplier: "Solar corridor contractor class",
    naira: 890_000_000,
    signedOn: "2026-04-24",
    status: "awarded",
    layer: "queryable",
    note: "Signed on the snapshot day. A journalist in Jos can open it the same afternoon.",
  },
  {
    id: "PL-LIB-2024-019",
    ocid: "ocds-ng-schematic-pl-2024-019",
    jurisdictionId: "plateau",
    buyer: "Plateau State Library Board",
    title: "Mobile library van, Jos–Barkin Ladi",
    place: "Jos",
    supplier: "Unknown",
    naira: 95_000_000,
    signedOn: "2024-02-11",
    status: "completed",
    layer: "pdf",
    note: "A title in Makurdi still cannot be requested from this scan.",
  },
  {
    id: "AB-PWR-2026-0011",
    ocid: "ocds-ng-schematic-ab-2026-0011",
    jurisdictionId: "abia",
    buyer: "Abia State Ministry of Power and Public Utilities",
    title: "Artisan cluster meters, Aba",
    place: "Aba",
    supplier: "Metering contractor class",
    naira: 1_400_000_000,
    signedOn: "2026-04-21",
    status: "awarded",
    layer: "queryable",
    note: "A contractor in Aba can quote OCID ocds-ng-schematic-ab-2026-0011.",
  },
  {
    id: "AB-RD-2022-088",
    ocid: "ocds-ng-schematic-ab-2022-088",
    jurisdictionId: "abia",
    buyer: "Abia State Ministry of Works",
    title: "Ariaria access road overlay",
    place: "Aba",
    supplier: "Unknown",
    naira: null,
    signedOn: null,
    status: "awarded",
    layer: "missing",
    note: "Work was visible on the ground. The award row was never typed.",
  },
];

export function getJurisdiction(id: string): BudgetJurisdiction | undefined {
  return BUDGET_JURISDICTIONS.find((item) => item.id === id);
}

export function awardsForJurisdiction(id: string): ContractAward[] {
  return CONTRACT_AWARDS.filter((item) => item.jurisdictionId === id);
}

export function daysSinceSign(award: ContractAward, snapshotIso = BUDGET_STANDARD.snapshotIso): number | null {
  if (!award.signedOn) return null;
  const signed = Date.parse(`${award.signedOn}T00:00:00Z`);
  const snap = Date.parse(`${snapshotIso}T00:00:00Z`);
  return Math.round((snap - signed) / 86_400_000);
}

export function isOpenRow(award: ContractAward): boolean {
  return (
    award.layer === "queryable" &&
    award.naira !== null &&
    award.signedOn !== null &&
    award.supplier !== "Unknown"
  );
}

export function isSignedThisWeek(award: ContractAward): boolean {
  const days = daysSinceSign(award);
  return days !== null && days >= 0 && days <= 7 && award.layer === "queryable";
}

export function searchAwards(query: string): ContractAward[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return CONTRACT_AWARDS.filter((item) => {
    const hay = [
      item.id,
      item.ocid,
      item.buyer,
      item.title,
      item.place,
      item.supplier,
      item.note,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }).slice(0, 8);
}

export function jurisdictionStats(id: string) {
  const rows = awardsForJurisdiction(id);
  return {
    total: rows.length,
    queryable: rows.filter((item) => item.layer === "queryable").length,
    pdf: rows.filter((item) => item.layer === "pdf").length,
    missing: rows.filter((item) => item.layer === "missing").length,
    open: rows.filter(isOpenRow).length,
    thisWeek: rows.filter(isSignedThisWeek).length,
  };
}

export function nationalAwardStats() {
  return {
    total: CONTRACT_AWARDS.length,
    queryable: CONTRACT_AWARDS.filter((item) => item.layer === "queryable").length,
    thisWeek: CONTRACT_AWARDS.filter(isSignedThisWeek).length,
    open: CONTRACT_AWARDS.filter(isOpenRow).length,
  };
}

export function envelopeShare(naira: number): string {
  const pct = (naira / BUDGET_STANDARD.envelopeNaira.total) * 100;
  return `${pct.toFixed(1)}%`;
}
