export type SignKind = "speed" | "stop" | "yield" | "school" | "km";
export type PostStatus = "installed" | "missing" | "damaged";

export interface RoadSignSpec {
  id: string;
  kind: SignKind;
  code: string;
  title: string;
  legend: string;
  detail: string;
  value?: string;
}

export interface CorridorPost {
  id: string;
  km: number;
  place: string;
  signId: string;
  status: PostStatus;
  note: string;
}

export interface SignCorridor {
  id: string;
  name: string;
  highway: string;
  fromId: string;
  toId: string;
  km: number;
  summary: string;
  posts: CorridorPost[];
}

export const ROAD_SIGN_STANDARD = {
  name: "NG-TS 01",
  inspiredBy: "Vienna Convention shapes + MUTCD layout discipline",
  rollout: [
    {
      step: "1",
      title: "Speed on the duals",
      detail: "Every dual carriageway and intercity corridor gets a posted limit a stranger can read at night. No more guessing 80 or 120.",
    },
    {
      step: "2",
      title: "Stop and yield at junctions",
      detail: "Uncontrolled crossings get a stop or a yield — one shape book, not a different triangle in every state.",
    },
    {
      step: "3",
      title: "School and pedestrian",
      detail: "School-zone and crossing signs on the routes children actually walk, not only on the ceremonial avenue.",
    },
    {
      step: "4",
      title: "Kilometre markers",
      detail: "Consistent km posts so a broken-down bus, an ambulance, and a maintenance crew can name the same place.",
    },
  ],
} as const;

export const ROAD_SIGN_CATALOG: RoadSignSpec[] = [
  {
    id: "speed-100",
    kind: "speed",
    code: "NG-R-100",
    title: "Speed limit 100",
    legend: "km/h",
    value: "100",
    detail: "Default on dual carriageways once the surface can hold it. Circular red ring — Vienna shape, so a driver from Kano or Cotonou reads the same sign.",
  },
  {
    id: "speed-80",
    kind: "speed",
    code: "NG-R-080",
    title: "Speed limit 80",
    legend: "km/h",
    value: "80",
    detail: "Single carriageway and city approach. Posted before the limit changes, not after the first wreck.",
  },
  {
    id: "speed-50",
    kind: "speed",
    code: "NG-R-050",
    title: "Speed limit 50",
    legend: "km/h",
    value: "50",
    detail: "Built-up capital streets. The number is on a plate, not in a by-law nobody has in the car.",
  },
  {
    id: "stop",
    kind: "stop",
    code: "NG-R-STOP",
    title: "Stop",
    legend: "STOP",
    detail: "Octagon at uncontrolled junctions. Same red, same word, every state — this is not a speed-camera programme; it is the layer that makes one possible.",
  },
  {
    id: "yield",
    kind: "yield",
    code: "NG-R-YIELD",
    title: "Yield",
    legend: "YIELD",
    detail: "Inverted triangle where a full stop is excessive but luck is currently the rule. Give way, then merge.",
  },
  {
    id: "school",
    kind: "school",
    code: "NG-W-SCH",
    title: "School zone",
    legend: "SCHOOL",
    detail: "Warning diamond on school routes. Pair with a 50 plate. Children should not be the first sign a driver sees.",
  },
  {
    id: "km",
    kind: "km",
    code: "NG-M-KM",
    title: "Kilometre marker",
    legend: "KM",
    detail: "Numbered post every 2 km on federal corridors. A place you can radio, not “after the burnt trailer.”",
  },
];

export const ROAD_SIGN_CORRIDORS: SignCorridor[] = [
  {
    id: "lagos-ibadan",
    name: "Lagos–Ibadan Expressway",
    highway: "E1",
    fromId: "ikeja",
    toId: "ibadan",
    km: 120,
    summary: "The busiest intercity dual in the south-west. Speed plates exist in spots; junctions and school routes still run on shouting.",
    posts: [
      { id: "li-1", km: 2, place: "Ikeja interchange", signId: "speed-80", status: "missing", note: "City leaves at 50; the dual starts with no plate." },
      { id: "li-2", km: 14, place: "Berger / Ojodu", signId: "school", status: "missing", note: "School run crosses the service lane." },
      { id: "li-3", km: 28, place: "Arepo", signId: "speed-100", status: "damaged", note: "Plate is there; the number is shot out." },
      { id: "li-4", km: 36, place: "Arepo junction", signId: "stop", status: "missing", note: "Service-road T-junction, no stop." },
      { id: "li-5", km: 48, place: "Mowe", signId: "km", status: "installed", note: "One of the few km posts still standing." },
      { id: "li-6", km: 72, place: "Ibafo", signId: "speed-100", status: "installed", note: "Replaced after the last resurfacing." },
      { id: "li-7", km: 96, place: "Ibadan approach", signId: "speed-80", status: "missing", note: "Limit should drop before the urban edge." },
      { id: "li-8", km: 118, place: "Ibadan North", signId: "speed-50", status: "missing", note: "Built-up; still reads as a highway." },
    ],
  },
  {
    id: "abuja-kaduna",
    name: "Abuja–Kaduna Dual",
    highway: "A2",
    fromId: "abuja",
    toId: "kaduna",
    km: 163,
    summary: "Newer dual, better plates than most — the gaps are junctions and village crossings, not the main line.",
    posts: [
      { id: "ak-1", km: 4, place: "Airport Road merge", signId: "speed-80", status: "installed", note: "Posted on the Kubwa-side merge." },
      { id: "ak-2", km: 22, place: "Zuba", signId: "yield", status: "missing", note: "Ramp give-way is a painted rumour." },
      { id: "ak-3", km: 48, place: "Gwagwalada crossing", signId: "school", status: "missing", note: "Children cross to the roadside market." },
      { id: "ak-4", km: 80, place: "Dangara", signId: "km", status: "installed", note: "Km 80 post is readable at night." },
      { id: "ak-5", km: 110, place: "Kaduna approach", signId: "speed-100", status: "installed", note: "Dual limit held after rehabilitation." },
      { id: "ak-6", km: 148, place: "Rigasa fringe", signId: "speed-80", status: "damaged", note: "Bent; faces the wrong carriageway." },
      { id: "ak-7", km: 160, place: "Kaduna North", signId: "speed-50", status: "missing", note: "Urban start is unmarked." },
    ],
  },
  {
    id: "kaduna-kano",
    name: "Kaduna–Kano",
    highway: "A2",
    fromId: "kaduna",
    toId: "kano",
    km: 220,
    summary: "Long A2 north. Km posts are the exception; speed and stop signs are still a campaign, not a grid.",
    posts: [
      { id: "kk-1", km: 8, place: "Kaduna North exit", signId: "speed-80", status: "missing", note: "Leaves town without a posted limit." },
      { id: "kk-2", km: 40, place: "Jaji", signId: "km", status: "missing", note: "No marker for a 40 km radio call." },
      { id: "kk-3", km: 95, place: "Zaria bypass", signId: "speed-100", status: "installed", note: "Bypass dual has plates." },
      { id: "kk-4", km: 96, place: "Zaria service T", signId: "stop", status: "missing", note: "Junction still on luck." },
      { id: "kk-5", km: 140, place: "Makarfi", signId: "school", status: "missing", note: "School on the old alignment." },
      { id: "kk-6", km: 200, place: "Kano approach", signId: "speed-80", status: "damaged", note: "Faded to a grey disc." },
      { id: "kk-7", km: 218, place: "Kano Municipal", signId: "speed-50", status: "missing", note: "City wall area, no urban plate." },
    ],
  },
  {
    id: "enugu-ph",
    name: "Enugu–Port Harcourt",
    highway: "A3",
    fromId: "enugu",
    toId: "port-harcourt",
    km: 210,
    summary: "South-east to the port. A3 has stretches of good asphalt and long unsigned junctions.",
    posts: [
      { id: "ep-1", km: 6, place: "Enugu South exit", signId: "speed-80", status: "installed", note: "Posted leaving Independence Layout." },
      { id: "ep-2", km: 35, place: "Agbani road join", signId: "yield", status: "missing", note: "Merge has no give-way." },
      { id: "ep-3", km: 70, place: "Umuahia approach", signId: "km", status: "missing", note: "Crews describe this as “near the filling station.”" },
      { id: "ep-4", km: 88, place: "Umuahia school route", signId: "school", status: "missing", note: "Children use the shoulder." },
      { id: "ep-5", km: 140, place: "Aba fringe", signId: "speed-100", status: "damaged", note: "Plate turned 90 degrees." },
      { id: "ep-6", km: 168, place: "Aba–PH junction", signId: "stop", status: "missing", note: "Uncontrolled, high conflict." },
      { id: "ep-7", km: 205, place: "Port Harcourt GRA", signId: "speed-50", status: "installed", note: "Urban 50 is up on Aba Road." },
    ],
  },
  {
    id: "kano-maiduguri",
    name: "Kano–Maiduguri",
    highway: "A3",
    fromId: "kano",
    toId: "maiduguri",
    km: 580,
    summary: "Long north-east haul. The campaign starts with km posts and a handful of limits — not a full MUTCD overnight.",
    posts: [
      { id: "km-1", km: 12, place: "Gezawa road", signId: "speed-80", status: "missing", note: "Leaves Kano on landmarks." },
      { id: "km-2", km: 90, place: "Wudil", signId: "km", status: "installed", note: "Rare standing km post." },
      { id: "km-3", km: 180, place: "Potiskum approach", signId: "school", status: "missing", note: "Town crossing unmarked." },
      { id: "km-4", km: 280, place: "Damaturu", signId: "speed-80", status: "missing", note: "Capital approach has no plate." },
      { id: "km-5", km: 400, place: "Benisheikh", signId: "stop", status: "missing", note: "Junction with no stop." },
      { id: "km-6", km: 520, place: "Maiduguri approach", signId: "speed-80", status: "damaged", note: "Sand-blasted blank." },
      { id: "km-7", km: 575, place: "Maiduguri Metropolitan", signId: "speed-50", status: "missing", note: "Urban edge unmarked." },
    ],
  },
];

export const POST_STATUS_LABEL: Record<PostStatus, string> = {
  installed: "Installed",
  missing: "Missing",
  damaged: "Damaged",
};

export function getRoadSign(id: string): RoadSignSpec | undefined {
  return ROAD_SIGN_CATALOG.find((sign) => sign.id === id);
}

export function getSignCorridor(id: string): SignCorridor | undefined {
  return ROAD_SIGN_CORRIDORS.find((corridor) => corridor.id === id);
}

export function corridorCoverage(corridor: SignCorridor): { installed: number; missing: number; damaged: number; total: number } {
  return {
    installed: corridor.posts.filter((post) => post.status === "installed").length,
    missing: corridor.posts.filter((post) => post.status === "missing").length,
    damaged: corridor.posts.filter((post) => post.status === "damaged").length,
    total: corridor.posts.length,
  };
}
