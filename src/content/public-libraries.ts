import { getPostalCapital } from "@/content/postal-code-engine";

export type KitStatus = "present" | "missing" | "broken";
export type BranchKind = "central" | "urban" | "hinterland" | "mobile";

export const LIBRARY_STANDARD = {
  name: "NG-LIB 01",
  inspiredBy: "Finland’s library law, UK county libraries, Carnegie networks",
  ruralFloorKm: 100,
  urbanWalkKm: 3,
  urbanPerPeople: 50_000,
  rollout: [
    {
      step: "1",
      title: "A rural floor",
      detail:
        "Every community is within 100 km of a staffed public library. That is a floor, not a boast — the distance a motorbike can do and still get home.",
    },
    {
      step: "2",
      title: "Then denser in cities",
      detail:
        "In built-up capitals the standard tightens to a branch within about 2–3 km, or one per 50,000 people — whichever is denser. A teaching-hospital reading room is not a neighbourhood library.",
    },
    {
      step: "3",
      title: "A minimum kit",
      detail:
        "Children’s section, study seats, working toilets, electricity, a librarian, wifi. A locked room of donated books is not a branch.",
    },
    {
      step: "4",
      title: "Catalogue and mobile",
      detail:
        "Legal-deposit copies of Nigerian titles, evening hours, and vans or boats for riverine and pastoral routes. A book in Makurdi can be requested in Maiduguri.",
    },
  ],
} as const;

export const LIBRARY_KIT = [
  {
    id: "children",
    title: "Children’s section",
    detail: "Low shelves, a floor mat, books a child can reach without an adult’s permission.",
  },
  {
    id: "seats",
    title: "Study seats",
    detail: "Chairs that stay in the room. Exam season should not mean sitting on the veranda.",
  },
  {
    id: "toilets",
    title: "Working toilets",
    detail: "Water, a door that locks, a cleaner on the roster. Without this, half the city will not stay.",
  },
  {
    id: "power",
    title: "Electricity",
    detail: "Light after 4 p.m. A generator that dies at closing time is not a service.",
  },
  {
    id: "librarian",
    title: "A librarian",
    detail: "Someone on a salary who can find a title and keep the room open. Volunteers are a bonus, not the staff plan.",
  },
  {
    id: "wifi",
    title: "Wifi",
    detail: "A connection students can use without buying a new SIM at the gate.",
  },
] as const;

export type KitId = (typeof LIBRARY_KIT)[number]["id"];

export interface LibraryBranch {
  id: string;
  name: string;
  kind: BranchKind;
  place: string;
  kmFromCentre: number;
  note: string;
  kit: Record<KitId, KitStatus>;
}

export interface LibrarySystem {
  capitalId: string;
  summary: string;
  hinterlandKm: number;
  hinterlandPlace: string;
  branches: LibraryBranch[];
}

export interface CatalogueTitle {
  id: string;
  title: string;
  author: string;
  heldAt: string[];
}

const full: Record<KitId, KitStatus> = {
  children: "present",
  seats: "present",
  toilets: "present",
  power: "present",
  librarian: "present",
  wifi: "present",
};

function kit(patch: Partial<Record<KitId, KitStatus>> = {}): Record<KitId, KitStatus> {
  return { ...full, ...patch };
}

export const LIBRARY_SYSTEMS: LibrarySystem[] = [
  {
    capitalId: "abuja",
    summary:
      "The capital has a central and two walkable branches. Kubwa is still a commute, not a walk. Kwali is inside the 100 km floor by a mobile stop.",
    hinterlandKm: 55,
    hinterlandPlace: "Kwali hinterland",
    branches: [
      {
        id: "abj-central",
        name: "Central Area",
        kind: "central",
        place: "Three Arms Zone approach",
        kmFromCentre: 0,
        note: "The seed branch. Kit is up; evening hours are the next fight.",
        kit: kit(),
      },
      {
        id: "abj-garki",
        name: "Garki",
        kind: "urban",
        place: "Area 3 / Moshood Abiola Way",
        kmFromCentre: 4,
        note: "Walkable on a good day. Wifi is the missing plate.",
        kit: kit({ wifi: "missing" }),
      },
      {
        id: "abj-wuse",
        name: "Wuse II",
        kind: "urban",
        place: "Aminu Kano Crescent",
        kmFromCentre: 3,
        note: "Meets the urban walk. Children’s corner is a rug and a box — still a corner.",
        kit: kit(),
      },
      {
        id: "abj-kubwa",
        name: "Kubwa",
        kind: "urban",
        place: "Airport Road corridor",
        kmFromCentre: 22,
        note: "Inside the city story, outside a 3 km walk. Densify here before another ceremonial wing.",
        kit: kit({ children: "missing", wifi: "missing" }),
      },
      {
        id: "abj-kwali",
        name: "Kwali stop",
        kind: "mobile",
        place: "Kwali hinterland",
        kmFromCentre: 55,
        note: "A van on a Thursday. Toilets and wifi stay in town.",
        kit: kit({ toilets: "missing", wifi: "missing", power: "broken" }),
      },
    ],
  },
  {
    capitalId: "ikeja",
    summary:
      "Lagos State’s capital is dense and still thin. A few walkable rooms in Ikeja do not cover Alimosho or the creeks. Epe is on a boat day.",
    hinterlandKm: 64,
    hinterlandPlace: "Epe creekside",
    branches: [
      {
        id: "ike-central",
        name: "Alausa",
        kind: "central",
        place: "State secretariat / Ikeja GRA",
        kmFromCentre: 0,
        note: "The room government already knows. Workers need evening hours more than another plaque.",
        kit: kit(),
      },
      {
        id: "ike-allen",
        name: "Allen Avenue",
        kind: "urban",
        place: "Allen / Opebi",
        kmFromCentre: 2,
        note: "Inside the 3 km walk. Seats fill by 5 p.m.; the kit is otherwise up.",
        kit: kit(),
      },
      {
        id: "ike-ojodu",
        name: "Ojodu",
        kind: "urban",
        place: "Berger / Lagos–Ibadan fringe",
        kmFromCentre: 8,
        note: "A corridor branch, not a walk from Alausa. Children’s section is a promise.",
        kit: kit({ children: "missing", wifi: "broken" }),
      },
      {
        id: "ike-alimosho",
        name: "Alimosho",
        kind: "urban",
        place: "Ikotun–Egbe axis",
        kmFromCentre: 14,
        note: "Population enough for several branches. This schematic still has one.",
        kit: kit({ toilets: "broken", wifi: "missing" }),
      },
      {
        id: "ike-epe",
        name: "Epe boat",
        kind: "mobile",
        place: "Epe creekside",
        kmFromCentre: 64,
        note: "Riverine route. The floor is a landing, not a building.",
        kit: kit({ toilets: "missing", power: "missing", wifi: "missing" }),
      },
    ],
  },
  {
    capitalId: "kano",
    summary:
      "A municipal central and one walkable branch. Power at Sabon Gari is the kit failure. The eastern hinterland is still a rumour of a room.",
    hinterlandKm: 88,
    hinterlandPlace: "Gezawa cluster",
    branches: [
      {
        id: "kn-central",
        name: "Kano Municipal",
        kind: "central",
        place: "City wall / post office axis",
        kmFromCentre: 0,
        note: "The seed. Catalogue desk is staffed; wifi drops in the afternoon.",
        kit: kit({ wifi: "broken" }),
      },
      {
        id: "kn-sabon",
        name: "Sabon Gari",
        kind: "urban",
        place: "France Road / market edge",
        kmFromCentre: 3,
        note: "Walkable. Power is the reason students leave at dusk.",
        kit: kit({ power: "broken", wifi: "missing" }),
      },
      {
        id: "kn-nassarawa",
        name: "Nassarawa GRA",
        kind: "urban",
        place: "Airport Road GRA",
        kmFromCentre: 6,
        note: "Outside a short walk. Kit is closer to complete than the market branch.",
        kit: kit({ children: "missing" }),
      },
      {
        id: "kn-gezawa",
        name: "Gezawa stop",
        kind: "hinterland",
        place: "Gezawa cluster",
        kmFromCentre: 88,
        note: "Inside the 100 km floor by a few kilometres. No librarian on Fridays.",
        kit: kit({ librarian: "missing", toilets: "broken", wifi: "missing" }),
      },
    ],
  },
  {
    capitalId: "enugu",
    summary:
      "Independence Layout plus a walkable Ogui room. Trans-Ekulu is a bus, not a walk. Agbani is the hinterland test.",
    hinterlandKm: 25,
    hinterlandPlace: "Agbani road join",
    branches: [
      {
        id: "en-central",
        name: "Independence Layout",
        kind: "central",
        place: "Garden Avenue / secretariat",
        kmFromCentre: 0,
        note: "Holds legal-deposit copies on this schematic. Evening hours still a memo.",
        kit: kit(),
      },
      {
        id: "en-ogui",
        name: "Ogui",
        kind: "urban",
        place: "Ogui Road",
        kmFromCentre: 2,
        note: "Meets the urban walk. Children’s section is real.",
        kit: kit(),
      },
      {
        id: "en-transekulu",
        name: "Trans-Ekulu",
        kind: "urban",
        place: "Thinkers Corner axis",
        kmFromCentre: 7,
        note: "Densify before the next ring-road branch.",
        kit: kit({ wifi: "missing", toilets: "broken" }),
      },
      {
        id: "en-agbani",
        name: "Agbani",
        kind: "hinterland",
        place: "Agbani road join",
        kmFromCentre: 25,
        note: "Floor is comfortable. Kit is a table and a lock.",
        kit: kit({ children: "missing", wifi: "missing", power: "broken" }),
      },
    ],
  },
  {
    capitalId: "port-harcourt",
    summary:
      "GRA central, a strained Diobu room, and a far Rumuokoro stop. The floor holds; the walk does not.",
    hinterlandKm: 42,
    hinterlandPlace: "Igwuruta fringe",
    branches: [
      {
        id: "ph-central",
        name: "Port Harcourt GRA",
        kind: "central",
        place: "Aba Road / GRA",
        kmFromCentre: 0,
        note: "The room that photographs well. Catalogue requests leave from here.",
        kit: kit(),
      },
      {
        id: "ph-diobu",
        name: "Diobu",
        kind: "urban",
        place: "Mile 1 / Aggrey Road",
        kmFromCentre: 4,
        note: "Just outside a short walk. Toilets are why women do not stay.",
        kit: kit({ toilets: "broken", wifi: "missing" }),
      },
      {
        id: "ph-rumuokoro",
        name: "Rumuokoro",
        kind: "urban",
        place: "East-West Road junction",
        kmFromCentre: 12,
        note: "A junction branch. Children’s kit is missing.",
        kit: kit({ children: "missing", librarian: "missing" }),
      },
      {
        id: "ph-igwuruta",
        name: "Igwuruta stop",
        kind: "hinterland",
        place: "Igwuruta fringe",
        kmFromCentre: 42,
        note: "Inside the floor. Open two days a week on this schematic.",
        kit: kit({ power: "missing", wifi: "missing" }),
      },
    ],
  },
  {
    capitalId: "maiduguri",
    summary:
      "One metropolitan room. No second urban branch. The Bama axis sits beyond 100 km — the floor fails. A title can still be requested here if a desk is staffed.",
    hinterlandKm: 145,
    hinterlandPlace: "Bama axis",
    branches: [
      {
        id: "mi-central",
        name: "Maiduguri Metropolitan",
        kind: "central",
        place: "Monday Market / Shehu’s palace axis",
        kmFromCentre: 0,
        note: "Receives catalogue vans. Toilets and wifi are down; the desk still exists.",
        kit: kit({ toilets: "broken", wifi: "missing" }),
      },
      {
        id: "mi-khaddamari",
        name: "Khaddamari",
        kind: "urban",
        place: "Kano–Maiduguri dual",
        kmFromCentre: 11,
        note: "Not a walk. The city still has one real branch.",
        kit: kit({ children: "missing", seats: "missing", wifi: "missing" }),
      },
      {
        id: "mi-konduga",
        name: "Konduga",
        kind: "hinterland",
        place: "Konduga cluster",
        kmFromCentre: 35,
        note: "Closer than Bama, still not a second city library.",
        kit: kit({ librarian: "missing", toilets: "missing", power: "broken", wifi: "missing" }),
      },
      {
        id: "mi-pastoral",
        name: "Pastoral van",
        kind: "mobile",
        place: "Bama axis",
        kmFromCentre: 145,
        note: "The floor is missed. A van that does not run this month is not coverage.",
        kit: kit({
          children: "missing",
          seats: "missing",
          toilets: "missing",
          power: "missing",
          librarian: "missing",
          wifi: "missing",
        }),
      },
    ],
  },
  {
    capitalId: "makurdi",
    summary:
      "High Level holds the catalogue node named in the idea: a title here can be requested in Maiduguri. North Bank is almost a walk. Guma is inside the floor.",
    hinterlandKm: 42,
    hinterlandPlace: "Guma hinterland",
    branches: [
      {
        id: "mk-central",
        name: "High Level",
        kind: "central",
        place: "High Level / Wurukum approach",
        kmFromCentre: 0,
        note: "Legal-deposit shelf on this schematic. The van to Maiduguri leaves from the back door.",
        kit: kit(),
      },
      {
        id: "mk-wurukum",
        name: "Wurukum",
        kind: "urban",
        place: "Wurukum roundabout",
        kmFromCentre: 3,
        note: "On the edge of a 3 km walk. Kit is up except wifi.",
        kit: kit({ wifi: "broken" }),
      },
      {
        id: "mk-northbank",
        name: "North Bank",
        kind: "urban",
        place: "Across the Benue bridge",
        kmFromCentre: 5,
        note: "A bridge is not a walk for a child. Densify this bank.",
        kit: kit({ children: "missing" }),
      },
      {
        id: "mk-guma",
        name: "Guma",
        kind: "hinterland",
        place: "Guma hinterland",
        kmFromCentre: 42,
        note: "River-farm settlements. Floor met; kit is a locker.",
        kit: kit({ toilets: "missing", wifi: "missing", power: "broken" }),
      },
    ],
  },
  {
    capitalId: "yenagoa",
    summary:
      "A creek capital. The floor is a boat as much as a road. Swali is the walkable room; Sabagreia is a landing.",
    hinterlandKm: 48,
    hinterlandPlace: "Sabagreia landing",
    branches: [
      {
        id: "ye-central",
        name: "Yenagoa Central",
        kind: "central",
        place: "Ox-Bow Lake / secretariat",
        kmFromCentre: 0,
        note: "The dry-land seed. Evening hours matter for civil servants who close at 4.",
        kit: kit({ wifi: "broken" }),
      },
      {
        id: "ye-swali",
        name: "Swali",
        kind: "urban",
        place: "Swali market edge",
        kmFromCentre: 2,
        note: "Walkable. Toilets are the kit gap.",
        kit: kit({ toilets: "broken" }),
      },
      {
        id: "ye-boat",
        name: "Sabagreia boat",
        kind: "mobile",
        place: "Sabagreia landing",
        kmFromCentre: 48,
        note: "Riverine route. Power is a battery; wifi does not board.",
        kit: kit({ power: "broken", wifi: "missing", toilets: "missing" }),
      },
    ],
  },
];

export const LIBRARY_CATALOGUE: CatalogueTitle[] = [
  {
    id: "tfa",
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    heldAt: ["makurdi", "enugu", "ikeja"],
  },
  {
    id: "hibiscus",
    title: "Purple Hibiscus",
    author: "Chimamanda Ngozi Adichie",
    heldAt: ["abuja", "enugu"],
  },
  {
    id: "ake",
    title: "Aké: The Years of Childhood",
    author: "Wole Soyinka",
    heldAt: ["ikeja"],
  },
  {
    id: "joys",
    title: "The Joys of Motherhood",
    author: "Buchi Emecheta",
    heldAt: ["port-harcourt", "ikeja"],
  },
  {
    id: "tuesday",
    title: "Born on a Tuesday",
    author: "Elnathan John",
    heldAt: ["kano", "maiduguri", "makurdi"],
  },
];

export const KIT_STATUS_LABEL: Record<KitStatus, string> = {
  present: "Present",
  missing: "Missing",
  broken: "Broken",
};

export const BRANCH_KIND_LABEL: Record<BranchKind, string> = {
  central: "Central",
  urban: "Urban branch",
  hinterland: "Hinterland",
  mobile: "Mobile",
};

export function getLibrarySystem(capitalId: string): LibrarySystem | undefined {
  return LIBRARY_SYSTEMS.find((system) => system.capitalId === capitalId);
}

export function librarySeedIds(): string[] {
  return LIBRARY_SYSTEMS.map((system) => system.capitalId);
}

export function kitComplete(branch: LibraryBranch): boolean {
  return LIBRARY_KIT.every((item) => branch.kit[item.id] === "present");
}

export function kitGaps(branch: LibraryBranch): number {
  return LIBRARY_KIT.filter((item) => branch.kit[item.id] !== "present").length;
}

export function walkableBranches(system: LibrarySystem): number {
  return system.branches.filter(
    (branch) =>
      (branch.kind === "central" || branch.kind === "urban") &&
      branch.kmFromCentre <= LIBRARY_STANDARD.urbanWalkKm,
  ).length;
}

export function floorMet(system: LibrarySystem): boolean {
  return system.hinterlandKm <= LIBRARY_STANDARD.ruralFloorKm;
}

export function systemLabel(system: LibrarySystem): string {
  return getPostalCapital(system.capitalId)?.capital ?? system.capitalId;
}

export function holdingsFor(titleId: string): { title: CatalogueTitle; systems: LibrarySystem[] } | undefined {
  const title = LIBRARY_CATALOGUE.find((item) => item.id === titleId);
  if (!title) return undefined;
  return {
    title,
    systems: title.heldAt
      .map((id) => getLibrarySystem(id))
      .filter((system): system is LibrarySystem => Boolean(system)),
  };
}
