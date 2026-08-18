import { getPostalCapital } from "@/content/postal-code-engine";

export type TitleKind = "c-of-o" | "r-of-o" | "customary" | "none";
export type ConsentStatus = "granted" | "pending" | "missing" | "not-required";
export type RegisterLayer = "paper" | "scanned" | "queryable";
export type SurveyStatus = "unmapped" | "sketch" | "mapped";
export type Encumbrance = "clear" | "mortgage" | "caveat" | "dispute";

export const TITLE_STANDARD = {
  name: "NG-TR 01",
  inspiredBy: "Torrens title (Australia / New Zealand), Rwanda’s land register",
  rollout: [
    {
      step: "1",
      title: "One folio, one parcel",
      detail:
        "A plot has a single authoritative record. Photocopies in three ministries do not make a title. The folio is the title.",
    },
    {
      step: "2",
      title: "Map it",
      detail:
        "Georeference the parcel against the same street zone as the postal index. A C of O with no shape is a letter.",
    },
    {
      step: "3",
      title: "Scan the backlog, then make it queryable",
      detail:
        "A PDF on a drive is scanned. Queryable means a stranger can look it up this week. Until then, the queue is still the register.",
    },
    {
      step: "4",
      title: "Consent on the same record",
      detail:
        "Governor’s (or FCT minister’s) consent lives on the folio. Do not send a buyer to another window to learn if an assignment is legal.",
    },
  ],
} as const;

export const TITLE_KIND_LABEL: Record<TitleKind, string> = {
  "c-of-o": "Certificate of Occupancy",
  "r-of-o": "Right of Occupancy",
  customary: "Customary holding",
  none: "No instrument",
};

export const CONSENT_LABEL: Record<ConsentStatus, string> = {
  granted: "Consent granted",
  pending: "Consent pending",
  missing: "Consent missing",
  "not-required": "Consent not required",
};

export const REGISTER_LABEL: Record<RegisterLayer, string> = {
  paper: "Paper only",
  scanned: "Scanned",
  queryable: "Queryable",
};

export const SURVEY_LABEL: Record<SurveyStatus, string> = {
  unmapped: "Unmapped",
  sketch: "Sketch only",
  mapped: "Mapped",
};

export const ENCUMBRANCE_LABEL: Record<Encumbrance, string> = {
  clear: "Clear",
  mortgage: "Mortgage noted",
  caveat: "Caveat",
  dispute: "Dispute",
};

export const BANKABLE_RULES = [
  {
    id: "queryable",
    title: "Queryable folio",
    detail: "A lender, a planner, and an heir look at the same record in a browser.",
  },
  {
    id: "mapped",
    title: "Mapped parcel",
    detail: "A surveyed shape tied to a postal street zone. Odd plots on Independence Avenue are not the even side.",
  },
  {
    id: "instrument",
    title: "C of O or R of O",
    detail: "Customary occupation can be real and still unreadable as collateral until it is brought onto the folio.",
  },
  {
    id: "consent",
    title: "Consent on the folio",
    detail: "Granted, pending, missing, or not required, written here. A receipt from another office does not count.",
  },
  {
    id: "quiet",
    title: "No open dispute",
    detail: "A mortgage can sit on a bankable title. A caveat or a fight cannot. The register says which.",
  },
] as const;

export interface LandParcel {
  id: string;
  capitalId: string;
  postalCode: string;
  street: string;
  plot: string;
  folio: string;
  holder: string;
  titleKind: TitleKind;
  consent: ConsentStatus;
  register: RegisterLayer;
  survey: SurveyStatus;
  encumbrance: Encumbrance;
  note: string;
}

export const LAND_PARCELS: LandParcel[] = [
  {
    id: "fc-ind-17",
    capitalId: "abuja",
    postalCode: "FC-U01-001",
    street: "Independence Avenue (odd)",
    plot: "17",
    folio: "FC-C/2014/1108",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "queryable",
    survey: "mapped",
    encumbrance: "clear",
    note: "The boring success: one folio, a shape, consent on the same record. A mortgage desk can read this without a queue.",
  },
  {
    id: "fc-ind-18",
    capitalId: "abuja",
    postalCode: "FC-U01-002",
    street: "Independence Avenue (even)",
    plot: "18",
    folio: "FC-C/2009/0441",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "pending",
    register: "scanned",
    survey: "mapped",
    encumbrance: "clear",
    note: "The even side is a different street zone. Scanned only. Consent for the last assignment is still a separate window.",
  },
  {
    id: "fc-ssw-a",
    capitalId: "abuja",
    postalCode: "FC-U01-003",
    street: "Shehu Shagari Way",
    plot: "Block C",
    folio: "FC-G/1998/0004",
    holder: "FCDA / public",
    titleKind: "c-of-o",
    consent: "not-required",
    register: "queryable",
    survey: "mapped",
    encumbrance: "clear",
    note: "Public folio. Consent not required for occupation by the authority that already holds it. Still needs a shape so planning can see the setback.",
  },
  {
    id: "fc-air-9",
    capitalId: "abuja",
    postalCode: "FC-P02-118",
    street: "Airport Road frontage (odd)",
    plot: "9",
    folio: "FC-C/2018/6620",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "scanned",
    survey: "sketch",
    encumbrance: "mortgage",
    note: "A bank already wrote a charge. The shape is a sketch. The scan is still a PDF.",
  },
  {
    id: "fc-kwali-1",
    capitalId: "abuja",
    postalCode: "FC-R04-027",
    street: "Kwali hinterland",
    plot: "Cluster",
    folio: "n/a",
    holder: "Family holding (undivided)",
    titleKind: "customary",
    consent: "missing",
    register: "paper",
    survey: "unmapped",
    encumbrance: "clear",
    note: "No street zone until roads are gazetted. Occupation can be real while the folio stays empty. Inventing plots would be a lie.",
  },
  {
    id: "la-awa-11",
    capitalId: "ikeja",
    postalCode: "LA-U01-001",
    street: "Obafemi Awolowo Way (odd)",
    plot: "11",
    folio: "LA-C/2011/3088",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "queryable",
    survey: "mapped",
    encumbrance: "clear",
    note: "Alausa stretch. Queryable in this schematic. Lagos still has a paper mountain behind the seed street.",
  },
  {
    id: "la-allen-40",
    capitalId: "ikeja",
    postalCode: "LA-U01-003",
    street: "Allen Avenue",
    plot: "40",
    folio: "LA-C/2006/1190",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "queryable",
    survey: "mapped",
    encumbrance: "dispute",
    note: "The folio is online and the shape is mapped, and still not bankable. Two claimants. The register should say so, loudly.",
  },
  {
    id: "la-isaac-8",
    capitalId: "ikeja",
    postalCode: "LA-U01-004",
    street: "Isaac John Street (GRA)",
    plot: "8",
    folio: "LA-C/1999/0771",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "missing",
    register: "paper",
    survey: "sketch",
    encumbrance: "caveat",
    note: "GRA paper in a cabinet. Assignment happened; consent never reached the folio. A caveat sits on a photocopy.",
  },
  {
    id: "la-epe-1",
    capitalId: "ikeja",
    postalCode: "LA-R04-064",
    street: "Epe creekside",
    plot: "Landing",
    folio: "n/a",
    holder: "Family holding (undivided)",
    titleKind: "customary",
    consent: "missing",
    register: "paper",
    survey: "unmapped",
    encumbrance: "clear",
    note: "Riverine holding. No C of O, no polygon. The postal cluster exists; the cadastre does not.",
  },
  {
    id: "kn-fr-22",
    capitalId: "kano",
    postalCode: "KN-U01-005",
    street: "France Road",
    plot: "22",
    folio: "KN-R/2004/055",
    holder: "Family holding (undivided)",
    titleKind: "r-of-o",
    consent: "pending",
    register: "scanned",
    survey: "sketch",
    encumbrance: "clear",
    note: "Sabon Gari. A right of occupancy was scanned. Shares are undivided. Consent for a sale would have nowhere clean to sit.",
  },
  {
    id: "kn-mm-7",
    capitalId: "kano",
    postalCode: "KN-U01-003",
    street: "Murtala Mohammed Way (odd)",
    plot: "7",
    folio: "KN-C/2016/2214",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "queryable",
    survey: "mapped",
    encumbrance: "mortgage",
    note: "Queryable, mapped, mortgage noted. Still bankable, the charge is the point of a register a lender can see.",
  },
  {
    id: "kn-gez-1",
    capitalId: "kano",
    postalCode: "KN-R04-056",
    street: "Gezawa cluster",
    plot: "Cluster",
    folio: "n/a",
    holder: "Unknown, instrument missing",
    titleKind: "none",
    consent: "missing",
    register: "paper",
    survey: "unmapped",
    encumbrance: "clear",
    note: "Hinterland. No instrument on the schematic. Occupation continues; the folio does not.",
  },
  {
    id: "en-okp-15",
    capitalId: "enugu",
    postalCode: "EN-U01-003",
    street: "Okpara Avenue (odd)",
    plot: "15",
    folio: "EN-C/2012/0881",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "queryable",
    survey: "mapped",
    encumbrance: "clear",
    note: "Independence Layout stretch. This is what ‘look it up’ should mean in a state capital.",
  },
  {
    id: "en-agb-1",
    capitalId: "enugu",
    postalCode: "EN-P02-129",
    street: "Thinkers Corner / Agbani road",
    plot: "3",
    folio: "EN-C/2001/0199",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "pending",
    register: "paper",
    survey: "sketch",
    encumbrance: "caveat",
    note: "Paper C of O, consent pending, caveat from a boundary argument. The peri-urban band is where the backlog hides.",
  },
  {
    id: "ri-aba-28",
    capitalId: "port-harcourt",
    postalCode: "RI-U01-002",
    street: "Aba Road (odd)",
    plot: "28",
    folio: "RI-C/2010/4502",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "queryable",
    survey: "mapped",
    encumbrance: "mortgage",
    note: "Aba Road odd. Charge is on the folio. A second lender can see the first, that is the product.",
  },
  {
    id: "ri-forces-4",
    capitalId: "port-harcourt",
    postalCode: "RI-U01-004",
    street: "Forces Avenue",
    plot: "4",
    folio: "RI-C/1995/0088",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "scanned",
    survey: "mapped",
    encumbrance: "clear",
    note: "Old GRA. Mapped and scanned; not yet queryable. The clerk still has to fetch the PDF.",
  },
  {
    id: "kd-abw-12",
    capitalId: "kaduna",
    postalCode: "KD-U01-006",
    street: "Ahmadu Bello Way (odd)",
    plot: "12",
    folio: "KD-C/2015/1730",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "granted",
    register: "queryable",
    survey: "mapped",
    encumbrance: "clear",
    note: "Kaduna North seed. Queryable on this schematic. The western bypass is still a sketch belt.",
  },
  {
    id: "kd-rig-1",
    capitalId: "kaduna",
    postalCode: "KD-P02-124",
    street: "Western bypass frontage",
    plot: "1",
    folio: "KD-C/2019/9001",
    holder: "Private holder",
    titleKind: "c-of-o",
    consent: "pending",
    register: "paper",
    survey: "unmapped",
    encumbrance: "dispute",
    note: "Rail corridor. Paper C of O, no polygon, two stories about the fence. A bank should not treat this as a title.",
  },
];

export const TITLE_SEED_IDS = [...new Set(LAND_PARCELS.map((parcel) => parcel.capitalId))];

export function getLandParcel(id: string): LandParcel | undefined {
  return LAND_PARCELS.find((parcel) => parcel.id === id);
}

export function parcelsForCapital(capitalId: string): LandParcel[] {
  return LAND_PARCELS.filter((parcel) => parcel.capitalId === capitalId);
}

export function isBankable(parcel: LandParcel): boolean {
  const instrument = parcel.titleKind === "c-of-o" || parcel.titleKind === "r-of-o";
  const consentOk = parcel.consent === "granted" || parcel.consent === "not-required";
  const quiet = parcel.encumbrance !== "dispute" && parcel.encumbrance !== "caveat";
  return parcel.register === "queryable" && parcel.survey === "mapped" && instrument && consentOk && quiet;
}

export function bankableGaps(parcel: LandParcel): string[] {
  const gaps: string[] = [];
  if (parcel.register !== "queryable") gaps.push("Not queryable");
  if (parcel.survey !== "mapped") gaps.push("Not mapped");
  if (parcel.titleKind !== "c-of-o" && parcel.titleKind !== "r-of-o") gaps.push("No C of O / R of O");
  if (parcel.consent !== "granted" && parcel.consent !== "not-required") gaps.push("Consent not on the folio");
  if (parcel.encumbrance === "dispute" || parcel.encumbrance === "caveat") {
    gaps.push(ENCUMBRANCE_LABEL[parcel.encumbrance]);
  }
  return gaps;
}

export function registryStats(capitalId: string): {
  total: number;
  queryable: number;
  bankable: number;
  paper: number;
} {
  const rows = parcelsForCapital(capitalId);
  return {
    total: rows.length,
    queryable: rows.filter((row) => row.register === "queryable").length,
    bankable: rows.filter(isBankable).length,
    paper: rows.filter((row) => row.register === "paper").length,
  };
}

export function searchParcels(query: string, limit = 8): LandParcel[] {
  const raw = query.trim().toLowerCase();
  if (raw.length < 2) return [];
  const compact = raw.replace(/\s+/g, "").replace(/-/g, "");

  const scored = LAND_PARCELS.map((parcel) => {
    const city = getPostalCapital(parcel.capitalId);
    const hay =
      `${parcel.postalCode} ${parcel.street} ${parcel.plot} ${parcel.folio} ${parcel.holder} ${city?.capital ?? ""} ${city?.state ?? ""}`.toLowerCase();
    let score = 0;
    if (parcel.postalCode.toLowerCase().replace(/-/g, "").includes(compact)) score += 8;
    if (parcel.folio.toLowerCase().replace(/-/g, "").includes(compact)) score += 7;
    if (hay.includes(raw)) score += 4;
    if (parcel.street.toLowerCase().includes(raw)) score += 6;
    if (city?.capital.toLowerCase().startsWith(raw)) score += 5;
    return { parcel, score };
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((row) => row.parcel);
}
