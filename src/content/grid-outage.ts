import { getPostalCapital } from "@/content/postal-code-engine";

export type FuelKind = "gas" | "hydro" | "solar" | "import";
export type FeederStatus = "on" | "shed" | "fault" | "unknown";

export const GRID_STANDARD = {
  name: "NG-GX 01",
  inspiredBy: "UK DNO outage maps, Kenya Power prepaid tokens, public dashboards such as Ontario Gridwatch",
  snapshotLabel: "Illustrative Wednesday 19:00 WAT",
  generatedMw: 4780,
  unconstrainedDemandMw: 8640,
  importMw: 80,
  exportMw: 0,
  rollout: [
    {
      step: "1",
      title: "Publish the hour",
      detail:
        "TCN posts generated MW, unconstrained demand, and fuel mix every hour, with a timestamp. A WhatsApp rumour does not count as a forecast.",
    },
    {
      step: "2",
      title: "Name the feeder",
      detail:
        "Every street zone in the postal index sits on a numbered feeder. Load-shedding is a named circuit.",
    },
    {
      step: "3",
      title: "Give a window",
      detail:
        "If the feeder is off, the DisCo owes a restoration window. No window means the status is unknown, do not invent 8 p.m.",
    },
    {
      step: "4",
      title: "Log the complaint",
      detail:
        "A ticket against the feeder ID. Pair with a meter that matches the bill.",
    },
  ],
} as const;

export const FUEL_LABEL: Record<FuelKind, string> = {
  gas: "Gas",
  hydro: "Hydro",
  solar: "Solar",
  import: "Import",
};

export const FEEDER_STATUS_LABEL: Record<FeederStatus, string> = {
  on: "On",
  shed: "Load-shed",
  fault: "Fault",
  unknown: "Unknown",
};

export interface FuelSlice {
  id: FuelKind;
  mw: number;
}

export interface GridPlant {
  id: string;
  name: string;
  fuel: FuelKind;
  capabilityMw: number;
  outputMw: number;
  note: string;
}

export interface HourPoint {
  hour: number;
  generatedMw: number;
  demandMw: number;
}

export interface GridFeeder {
  id: string;
  name: string;
  postalCode: string;
  place: string;
  status: FeederStatus;
  window: string;
  lastPing: string;
  note: string;
  priority?: "clinic" | "water" | "industry";
}

export interface DiscoCluster {
  id: string;
  capitalId: string;
  disco: string;
  publishes: boolean;
  summary: string;
  feeders: GridFeeder[];
}

/** Frozen schematic hour. */
export const GRID_FUEL: FuelSlice[] = [
  { id: "gas", mw: 3130 },
  { id: "hydro", mw: 1570 },
  { id: "solar", mw: 0 },
  { id: "import", mw: 80 },
];

export const GRID_PLANTS: GridPlant[] = [
  { id: "egbin", name: "Egbin", fuel: "gas", capabilityMw: 1320, outputMw: 1040, note: "Steam. Derated burners; still the largest single block on this hour." },
  { id: "kainji", name: "Kainji", fuel: "hydro", capabilityMw: 760, outputMw: 410, note: "Seasonal head. Honest output versus nameplate." },
  { id: "jebba", name: "Jebba", fuel: "hydro", capabilityMw: 578, outputMw: 320, note: "Paired with Kainji on the Niger." },
  { id: "shiroro", name: "Shiroro", fuel: "hydro", capabilityMw: 600, outputMw: 340, note: "Kaduna river. Night peak holds." },
  { id: "zungeru", name: "Zungeru", fuel: "hydro", capabilityMw: 700, outputMw: 500, note: "Newer plant; still ramping crews." },
  { id: "azura", name: "Azura-Edo", fuel: "gas", capabilityMw: 461, outputMw: 430, note: "Close to capability. Gas pressure held." },
  { id: "geregu", name: "Geregu", fuel: "gas", capabilityMw: 434, outputMw: 360, note: "One block off for maintenance on this schematic." },
  { id: "delta", name: "Delta (Ughelli)", fuel: "gas", capabilityMw: 900, outputMw: 440, note: "Old steam and gas. Output is what the pipes allow." },
  { id: "okpai", name: "Okpai", fuel: "gas", capabilityMw: 480, outputMw: 380, note: "Anambra River. Stable on this hour." },
  { id: "olorunsogo", name: "Olorunsogo", fuel: "gas", capabilityMw: 754, outputMw: 250, note: "Far below capability: gas and evacuation." },
  { id: "alaoji", name: "Alaoji", fuel: "gas", capabilityMw: 504, outputMw: 230, note: "South-east offtake constrained." },
  { id: "fct-solar", name: "FCT solar (seed)", fuel: "solar", capabilityMw: 50, outputMw: 0, note: "19:00 WAT. Solar is zero. The night peak is gas and hydro." },
];

/** 24-hour schematic, WAT. Evening peak is the story. */
export const GRID_DAY: HourPoint[] = [
  { hour: 0, generatedMw: 3920, demandMw: 6100 },
  { hour: 1, generatedMw: 3680, demandMw: 5400 },
  { hour: 2, generatedMw: 3510, demandMw: 4980 },
  { hour: 3, generatedMw: 3440, demandMw: 4720 },
  { hour: 4, generatedMw: 3380, demandMw: 4550 },
  { hour: 5, generatedMw: 3620, demandMw: 5100 },
  { hour: 6, generatedMw: 4010, demandMw: 6400 },
  { hour: 7, generatedMw: 4280, demandMw: 7200 },
  { hour: 8, generatedMw: 4410, demandMw: 7800 },
  { hour: 9, generatedMw: 4520, demandMw: 8100 },
  { hour: 10, generatedMw: 4490, demandMw: 7980 },
  { hour: 11, generatedMw: 4380, demandMw: 7700 },
  { hour: 12, generatedMw: 4210, demandMw: 7400 },
  { hour: 13, generatedMw: 4090, demandMw: 7150 },
  { hour: 14, generatedMw: 4180, demandMw: 7320 },
  { hour: 15, generatedMw: 4360, demandMw: 7680 },
  { hour: 16, generatedMw: 4510, demandMw: 8200 },
  { hour: 17, generatedMw: 4640, demandMw: 8480 },
  { hour: 18, generatedMw: 4720, demandMw: 8600 },
  { hour: 19, generatedMw: 4780, demandMw: 8640 },
  { hour: 20, generatedMw: 4690, demandMw: 8500 },
  { hour: 21, generatedMw: 4520, demandMw: 8100 },
  { hour: 22, generatedMw: 4280, demandMw: 7200 },
  { hour: 23, generatedMw: 4050, demandMw: 6500 },
];

export const DISCO_CLUSTERS: DiscoCluster[] = [
  {
    id: "abuja",
    capitalId: "abuja",
    disco: "AEDC",
    publishes: true,
    summary:
      "FCT seed. Central Area is on. Garki clinic is shed with a window. Kwali is a fault with an honest dawn ETA.",
    feeders: [
      {
        id: "aedc-central",
        name: "Central Area 33 kV",
        postalCode: "FC-U01-001",
        place: "Independence Avenue (odd)",
        status: "on",
        window: "On since 18:10",
        lastPing: "18:58",
        note: "Restored after evening shed. Timestamp is the product.",
      },
      {
        id: "aedc-garki",
        name: "Garki clinic 11 kV",
        postalCode: "FC-U01-Garki",
        place: "Garki Area 3",
        status: "shed",
        window: "20:00–22:00 WAT",
        lastPing: "18:55",
        priority: "clinic",
        note: "Priority clinic. Shed with a window so a night ward can plan oxygen and the 112 desk.",
      },
      {
        id: "aedc-wuse",
        name: "Wuse II 11 kV",
        postalCode: "FC-U01-Wuse",
        place: "Aminu Kano Crescent",
        status: "on",
        window: "On since 17:40",
        lastPing: "18:59",
        note: "Holding. A welder on this feeder can finish a job.",
      },
      {
        id: "aedc-kubwa",
        name: "Kubwa 33 kV",
        postalCode: "FC-P02-118",
        place: "Airport Road frontage",
        status: "shed",
        window: "21:00–23:30 WAT",
        lastPing: "18:52",
        note: "Corridor shed. Window published.",
      },
      {
        id: "aedc-kwali",
        name: "Kwali 11 kV",
        postalCode: "FC-R04-027",
        place: "Kwali hinterland",
        status: "fault",
        window: "Crew ETA 06:00 WAT",
        lastPing: "17:20",
        note: "Broken jumpers. A long ETA is still a window. Rural cluster, no invented street.",
      },
    ],
  },
  {
    id: "ikeja",
    capitalId: "ikeja",
    disco: "Ikeja Electric",
    publishes: true,
    summary: "Lagos State capital. Alausa is on. Allen is shed. Ojodu is a fault. A missing ping is unknown.",
    feeders: [
      {
        id: "ie-alausa",
        name: "Alausa 33 kV",
        postalCode: "LA-U01-001",
        place: "Obafemi Awolowo Way (odd)",
        status: "on",
        window: "On since 16:05",
        lastPing: "18:57",
        note: "Secretariat stretch. Holding through the peak so far.",
      },
      {
        id: "ie-allen",
        name: "Allen Avenue 11 kV",
        postalCode: "LA-U01-003",
        place: "Allen Avenue",
        status: "shed",
        window: "19:30–21:30 WAT",
        lastPing: "18:54",
        note: "Shops close around a published window.",
      },
      {
        id: "ie-ojodu",
        name: "Ojodu 11 kV",
        postalCode: "LA-P02-156",
        place: "Berger / Lagos–Ibadan fringe",
        status: "fault",
        window: "Crew ETA 22:00 WAT",
        lastPing: "18:10",
        note: "Jumper down on the express fringe. Fault.",
      },
      {
        id: "ie-alimosho",
        name: "Alimosho 11 kV",
        postalCode: "LA-U01-Alimosho",
        place: "Ikotun–Egbe axis",
        status: "unknown",
        window: "No window published",
        lastPing: "14:02",
        note: "Ping older than four hours. Treat as unknown. Do not tell the street 9 p.m.",
      },
    ],
  },
  {
    id: "kano",
    capitalId: "kano",
    disco: "KEDCO",
    publishes: true,
    summary: "Municipal on. France Road shed for the market close. Gezawa hinterland is unknown, the rural ping died at noon.",
    feeders: [
      {
        id: "ked-muni",
        name: "Municipal 33 kV",
        postalCode: "KN-U01-003",
        place: "Murtala Mohammed Way (odd)",
        status: "on",
        window: "On since 15:50",
        lastPing: "18:56",
        note: "City wall axis holding.",
      },
      {
        id: "ked-france",
        name: "Sabon Gari 11 kV",
        postalCode: "KN-U01-005",
        place: "France Road",
        status: "shed",
        window: "20:00–23:00 WAT",
        lastPing: "18:50",
        note: "Market feeder. Window after close.",
      },
      {
        id: "ked-gezawa",
        name: "Gezawa 11 kV",
        postalCode: "KN-R04-056",
        place: "Gezawa cluster",
        status: "unknown",
        window: "No window published",
        lastPing: "12:18",
        note: "Hinterland radio silent. Unknown until a ping returns.",
      },
    ],
  },
  {
    id: "enugu",
    capitalId: "enugu",
    disco: "EEDC",
    publishes: true,
    summary: "Independence Layout on. Ogui shed with a window. Agbani peri-urban is a fault.",
    feeders: [
      {
        id: "eedc-layout",
        name: "Independence Layout 33 kV",
        postalCode: "EN-U01-003",
        place: "Okpara Avenue (odd)",
        status: "on",
        window: "On since 17:15",
        lastPing: "18:59",
        note: "Holding. A studio can finish a shift.",
      },
      {
        id: "eedc-ogui",
        name: "Ogui 11 kV",
        postalCode: "EN-U01-Ogui",
        place: "Ogui Road",
        status: "shed",
        window: "19:45–21:15 WAT",
        lastPing: "18:48",
        note: "Short window. Better than silence.",
      },
      {
        id: "eedc-agbani",
        name: "Agbani 11 kV",
        postalCode: "EN-P02-129",
        place: "Thinkers Corner / Agbani road",
        status: "fault",
        window: "Crew ETA 23:30 WAT",
        lastPing: "18:02",
        note: "Pole down. Fault ticket.",
      },
    ],
  },
  {
    id: "port-harcourt",
    capitalId: "port-harcourt",
    disco: "PHED",
    publishes: true,
    summary: "Aba Road industry feeder is on, a factory can schedule. GRA is shed. Diobu ping is stale.",
    feeders: [
      {
        id: "phed-aba",
        name: "Aba Road industry 33 kV",
        postalCode: "RI-U01-002",
        place: "Aba Road (odd)",
        status: "on",
        window: "On since 14:00",
        lastPing: "18:57",
        priority: "industry",
        note: "This is the 2050 manufacturing case: a shift you can schedule because the feeder said so.",
      },
      {
        id: "phed-gra",
        name: "GRA 11 kV",
        postalCode: "RI-U01-004",
        place: "Forces Avenue",
        status: "shed",
        window: "20:30–22:30 WAT",
        lastPing: "18:51",
        note: "Shed with a window.",
      },
      {
        id: "phed-diobu",
        name: "Diobu 11 kV",
        postalCode: "RI-U01-Diobu",
        place: "Mile 1 / Aggrey Road",
        status: "unknown",
        window: "No window published",
        lastPing: "11:40",
        note: "Stale ping. Unknown. Do not pretend it is on.",
      },
    ],
  },
  {
    id: "kaduna",
    capitalId: "kaduna",
    disco: "KAEDCO",
    publishes: true,
    summary: "Ahmadu Bello Way on. Bypass is shed. Waterworks feeder is on and marked.",
    feeders: [
      {
        id: "kaed-abw",
        name: "Kaduna North 33 kV",
        postalCode: "KD-U01-006",
        place: "Ahmadu Bello Way (odd)",
        status: "on",
        window: "On since 16:40",
        lastPing: "18:55",
        note: "Holding through the peak.",
      },
      {
        id: "kaed-water",
        name: "Waterworks 11 kV",
        postalCode: "KD-U01-Water",
        place: "Treatment plant",
        status: "on",
        window: "On (priority)",
        lastPing: "18:58",
        priority: "water",
        note: "Priority water. The rota skips this feeder on purpose, and says so.",
      },
      {
        id: "kaed-bypass",
        name: "Western bypass 11 kV",
        postalCode: "KD-P02-124",
        place: "Rigasa rail corridor",
        status: "shed",
        window: "21:00–00:30 WAT",
        lastPing: "18:47",
        note: "Long window. Published is still better than a street rumour.",
      },
    ],
  },
  {
    id: "maiduguri",
    capitalId: "maiduguri",
    disco: "Yola Disco (Borno offtake)",
    publishes: false,
    summary:
      "The map is dark on purpose. No feeder timestamps, no windows. A public grid watch does not invent 9 p.m. for Maiduguri.",
    feeders: [
      {
        id: "yola-metro",
        name: "Metropolitan 33 kV",
        postalCode: "BO-U01",
        place: "Monday Market axis",
        status: "unknown",
        window: "Not published",
        lastPing: "n/a",
        note: "No ping on this schematic. Unknown is the honest status.",
      },
      {
        id: "yola-bama",
        name: "Bama axis 11 kV",
        postalCode: "BO-R04",
        place: "Bama axis",
        status: "unknown",
        window: "Not published",
        lastPing: "n/a",
        note: "Until the DisCo posts a timestamp, restoration stays unknown.",
      },
    ],
  },
];

export function formatMw(mw: number): string {
  return `${mw.toLocaleString("en-NG")} MW`;
}

export function fuelShare(slice: FuelSlice): number {
  const total = GRID_FUEL.reduce((sum, item) => sum + item.mw, 0);
  if (total === 0) return 0;
  return Math.round((slice.mw / total) * 100);
}

export function unservedMw(): number {
  return Math.max(0, GRID_STANDARD.unconstrainedDemandMw - GRID_STANDARD.generatedMw);
}

export function dayRange(key: "generatedMw" | "demandMw"): { low: number; high: number; avg: number } {
  const values = GRID_DAY.map((row) => row[key]);
  const sum = values.reduce((a, b) => a + b, 0);
  return {
    low: Math.min(...values),
    high: Math.max(...values),
    avg: Math.round(sum / values.length),
  };
}

export function getDisco(id: string): DiscoCluster | undefined {
  return DISCO_CLUSTERS.find((cluster) => cluster.id === id);
}

export function discoSeedIds(): string[] {
  return DISCO_CLUSTERS.map((cluster) => cluster.capitalId);
}

export function discoCityName(cluster: DiscoCluster): string {
  return getPostalCapital(cluster.capitalId)?.capital ?? cluster.capitalId;
}

export function feederCounts(cluster: DiscoCluster): Record<FeederStatus, number> {
  return {
    on: cluster.feeders.filter((item) => item.status === "on").length,
    shed: cluster.feeders.filter((item) => item.status === "shed").length,
    fault: cluster.feeders.filter((item) => item.status === "fault").length,
    unknown: cluster.feeders.filter((item) => item.status === "unknown").length,
  };
}

export function plantUtilisation(plant: GridPlant): number {
  if (plant.capabilityMw === 0) return 0;
  return Math.round((plant.outputMw / plant.capabilityMw) * 100);
}
