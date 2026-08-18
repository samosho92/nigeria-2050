export type PostalBand = "U" | "P" | "R";
export type StreetSide = "odd" | "even" | "both";
export type PostalZoneId =
  | "north-west"
  | "north-east"
  | "north-central"
  | "south-west"
  | "south-east"
  | "south-south";

export interface PostalStreetZone {
  name: string;
  unit: string;
  side: StreetSide;
  stretch: string;
  sample: string;
}

export interface PostalPlace {
  name: string;
  band: PostalBand;
  district: string;
  unit: string;
  landmark: string;
}

export interface PostalCapital {
  id: string;
  state: string;
  capital: string;
  plate: string;
  zoneId: PostalZoneId;
  x: number;
  y: number;
  urban: PostalPlace;
  periurban: PostalPlace;
  rural: PostalPlace;
}

export const POSTAL_BANDS: Record<PostalBand, { label: string; density: string }> = {
  R: { label: "Rural", density: "No street zones yet, one code for a settlement cluster until roads are gazetted." },
  P: { label: "Peri-urban", density: "Corridor frontage begins to split into odd/even street zones." },
  U: { label: "Urban", density: "Named street zones: one code per segment and side, about 50–200 addresses." },
};

export const POSTAL_CODE_SCHEME = {
  pattern: "AA-B##-###",
  example: "FC-U01-001",
  parts: [
    {
      id: "state",
      token: "AA",
      label: "State plate",
      detail: "Two-letter code people already know from number plates (LA, KN, FC). The capital is district 01.",
    },
    {
      id: "band",
      token: "B",
      label: "Density band",
      detail: "R rural cluster, P peri-urban fringe, U urban block. The prefix stays stable as a place densifies.",
    },
    {
      id: "district",
      token: "##",
      label: "District",
      detail: "01 is always the state capital. Higher numbers are hinterland LGAs seeded after the capital.",
    },
    {
      id: "unit",
      token: "###",
      label: "Street zone",
      detail:
        "Urban: a named street segment, odd or even side. Peri-urban: highway frontage, then a service lane. Rural: still a cluster, streets are not invented until they exist.",
    },
  ],
  rollout: [
    {
      step: "1",
      title: "Seed the capitals",
      detail:
        "Issue district 01 for each of the 36 state capitals plus Abuja. That is this mock: a used code on the buildings people already navigate to.",
    },
    {
      step: "2",
      title: "Give the hinterland a stable cluster",
      detail:
        "Every rural ward around that capital gets an R-band code, one number for a group of compounds. Same state prefix as the capital.",
    },
    {
      step: "3",
      title: "Gazette street zones",
      detail:
        "Inside district 01, split the urban unit into named streets, odd side, even side, then the next street. A plot on Independence Avenue does not share a code with Ahmadu Bello Way.",
    },
    {
      step: "4",
      title: "Require it on labels",
      detail:
        "Open geocoder, then shipping labels, clinic forms, and voter rolls. Paper NIPOST codes already exist; this mock is the habit layer that starts in capitals.",
    },
  ],
} as const;

function u(name: string, unit: string, landmark: string): PostalPlace {
  return { name, band: "U", district: "01", unit, landmark };
}

function p(name: string, unit: string, landmark: string): PostalPlace {
  return { name, band: "P", district: "02", unit, landmark };
}

function r(name: string, unit: string, landmark: string): PostalPlace {
  return { name, band: "R", district: "04", unit, landmark };
}

/** Schematic positions on the home-map viewBox (400 × 330). */
export const POSTAL_CAPITALS: PostalCapital[] = [
  {
    id: "sokoto",
    state: "Sokoto",
    capital: "Sokoto",
    plate: "SO",
    zoneId: "north-west",
    x: 85.3,
    y: 27.7,
    urban: u("Sokoto North", "014", "Central market / Sultan’s palace approach"),
    periurban: p("Gidan Igwai fringe", "102", "Eastern bypass compounds"),
    rural: r("Kware hinterland", "031", "Farm hamlets off the Argungu road"),
  },
  {
    id: "gusau",
    state: "Zamfara",
    capital: "Gusau",
    plate: "ZA",
    zoneId: "north-west",
    x: 128,
    y: 52,
    urban: u("Gusau Central", "008", "Sani Abacha Way / old GRA"),
    periurban: p("Samaru fringe", "090", "Kaduna-road ribbon"),
    rural: r("Tsafe cluster", "044", "Compound groups without street names"),
  },
  {
    id: "katsina",
    state: "Katsina",
    capital: "Katsina",
    plate: "KT",
    zoneId: "north-west",
    x: 176,
    y: 30,
    urban: u("Katsina City", "011", "Kofar Soro / GRA"),
    periurban: p("Dutsin-Ma road", "088", "Peri-urban workshops"),
    rural: r("Batagarawa farms", "022", "Dispersed compounds, one cluster code"),
  },
  {
    id: "kano",
    state: "Kano",
    capital: "Kano",
    plate: "KN",
    zoneId: "north-west",
    x: 194.8,
    y: 63.1,
    urban: u("Kano Municipal", "003", "Sabon Gari / city wall gates"),
    periurban: p("Ungogo corridor", "141", "Zaria road fringe"),
    rural: r("Gezawa cluster", "056", "Village wards east of the ring"),
  },
  {
    id: "kaduna",
    state: "Kaduna",
    capital: "Kaduna",
    plate: "KD",
    zoneId: "north-west",
    x: 158.9,
    y: 112.6,
    urban: u("Kaduna North", "006", "Ahmadu Bello Way / Independence Way"),
    periurban: p("Rigasa fringe", "124", "Western rail corridor"),
    rural: r("Chikun hinterland", "037", "Farm settlements south of the city"),
  },
  {
    id: "birnin-kebbi",
    state: "Kebbi",
    capital: "Birnin Kebbi",
    plate: "KE",
    zoneId: "north-west",
    x: 52,
    y: 72,
    urban: u("Gwadangwaji", "009", "Emir’s palace / Central Mosque"),
    periurban: p("Jega road", "077", "South-east ribbon"),
    rural: r("Kalgo cluster", "019", "Riverine compounds"),
  },
  {
    id: "dutse",
    state: "Jigawa",
    capital: "Dutse",
    plate: "JI",
    zoneId: "north-west",
    x: 228,
    y: 58,
    urban: u("Dutse Central", "007", "New GRA / secretariat"),
    periurban: p("Sakwaya fringe", "081", "Kano-road edge"),
    rural: r("Birnin Kudu hinterland", "028", "Rock-outcrop villages"),
  },
  {
    id: "maiduguri",
    state: "Borno",
    capital: "Maiduguri",
    plate: "BO",
    zoneId: "north-east",
    x: 349.4,
    y: 68.8,
    urban: u("Maiduguri Metropolitan", "002", "Monday Market / Shehu’s palace"),
    periurban: p("Khaddamari fringe", "115", "Kano-Maiduguri dual carriageway"),
    rural: r("Konduga cluster", "041", "Settlements on the Bama axis"),
  },
  {
    id: "damaturu",
    state: "Yobe",
    capital: "Damaturu",
    plate: "YO",
    zoneId: "north-east",
    x: 302,
    y: 64,
    urban: u("Damaturu Central", "010", "Potiskum road / GRA"),
    periurban: p("Pompomari fringe", "093", "Maiduguri-road edge"),
    rural: r("Gujba hinterland", "033", "Dispersed sahel compounds"),
  },
  {
    id: "bauchi",
    state: "Bauchi",
    capital: "Bauchi",
    plate: "BA",
    zoneId: "north-east",
    x: 248,
    y: 102,
    urban: u("Bauchi Metropolis", "012", "Yakubu Bauchi Way / old town"),
    periurban: p("Miri fringe", "099", "Jos-road ribbon"),
    rural: r("Alkaleri cluster", "025", "Hill-foot villages"),
  },
  {
    id: "gombe",
    state: "Gombe",
    capital: "Gombe",
    plate: "GO",
    zoneId: "north-east",
    x: 286,
    y: 128,
    urban: u("Gombe Central", "015", "Tudun Wada / GRA"),
    periurban: p("Pantami fringe", "108", "Airport-road edge"),
    rural: r("Akko hinterland", "039", "Farm clusters toward Billiri"),
  },
  {
    id: "yola",
    state: "Adamawa",
    capital: "Yola",
    plate: "AD",
    zoneId: "north-east",
    x: 318,
    y: 176,
    urban: u("Jimeta", "004", "Jimeta modern market / Ribadu Square"),
    periurban: p("Yola town fringe", "121", "Between Jimeta and old Yola"),
    rural: r("Fufore cluster", "046", "Benue-valley settlements"),
  },
  {
    id: "jalingo",
    state: "Taraba",
    capital: "Jalingo",
    plate: "TA",
    zoneId: "north-east",
    x: 274,
    y: 186,
    urban: u("Jalingo Central", "016", "Hamidu Hamman Street / GRA"),
    periurban: p("Kona fringe", "086", "Wukari-road edge"),
    rural: r("Ardo Kola hinterland", "030", "Farm hamlets in the foothills"),
  },
  {
    id: "jos",
    state: "Plateau",
    capital: "Jos",
    plate: "PL",
    zoneId: "north-central",
    x: 207.2,
    y: 132.3,
    urban: u("Jos North", "005", "Ahmadu Bello Way / Terminus"),
    periurban: p("Bukuru corridor", "132", "South along the mining belt"),
    rural: r("Barkin Ladi cluster", "048", "Plateau villages off the ring"),
  },
  {
    id: "abuja",
    state: "FCT",
    capital: "Abuja",
    plate: "FC",
    zoneId: "north-central",
    x: 160.5,
    y: 160.7,
    urban: u("Central Area", "001", "Three Arms Zone / Aso Rock approach"),
    periurban: p("Kubwa corridor", "118", "Airport Road / Kubwa express"),
    rural: r("Kwali hinterland", "027", "Unnumbered compounds west of the city"),
  },
  {
    id: "minna",
    state: "Niger",
    capital: "Minna",
    plate: "NI",
    zoneId: "north-central",
    x: 124,
    y: 154,
    urban: u("Minna Central", "013", "Bosso Road / GRA"),
    periurban: p("Chanchaga fringe", "097", "Suleja-road ribbon"),
    rural: r("Paiko cluster", "034", "Farm settlements toward Bida"),
  },
  {
    id: "lokoja",
    state: "Kogi",
    capital: "Lokoja",
    plate: "KO",
    zoneId: "north-central",
    x: 116,
    y: 196,
    urban: u("Lokoja Core", "018", "Murtala Mohammed Road / confluence view"),
    periurban: p("Ganaja fringe", "104", "Ajaokuta-road edge"),
    rural: r("Koton Karfe hinterland", "042", "Riverine compounds"),
  },
  {
    id: "ilorin",
    state: "Kwara",
    capital: "Ilorin",
    plate: "KW",
    zoneId: "north-central",
    x: 72,
    y: 186,
    urban: u("Ilorin West", "007", "Emir’s palace / Challenge"),
    periurban: p("Tanke fringe", "126", "University corridor"),
    rural: r("Asa hinterland", "029", "Villages off the Ogbomosho road"),
  },
  {
    id: "lafia",
    state: "Nasarawa",
    capital: "Lafia",
    plate: "NA",
    zoneId: "north-central",
    x: 194,
    y: 176,
    urban: u("Lafia Central", "017", "Shendam Road / GRA"),
    periurban: p("Doma road fringe", "091", "Southern ribbon"),
    rural: r("Keana cluster", "038", "Salt-village hinterland"),
  },
  {
    id: "makurdi",
    state: "Benue",
    capital: "Makurdi",
    plate: "BE",
    zoneId: "north-central",
    x: 204,
    y: 206,
    urban: u("Makurdi North", "008", "High Level / Wurukum"),
    periurban: p("North Bank fringe", "113", "Across the Benue bridge"),
    rural: r("Guma hinterland", "051", "River-farm settlements"),
  },
  {
    id: "ikeja",
    state: "Lagos",
    capital: "Ikeja",
    plate: "LA",
    zoneId: "south-west",
    x: 23.6,
    y: 246.2,
    urban: u("Alausa / Ikeja GRA", "001", "State secretariat / Allen Avenue"),
    periurban: p("Ojodu–Berger", "156", "Lagos–Ibadan express fringe"),
    rural: r("Epe creekside", "064", "Lagoon settlements still run on landmarks"),
  },
  {
    id: "ibadan",
    state: "Oyo",
    capital: "Ibadan",
    plate: "OY",
    zoneId: "south-west",
    x: 41.0,
    y: 217.5,
    urban: u("Ibadan North", "002", "Dugbe / Agodi GRA"),
    periurban: p("Moniya corridor", "138", "Oyo-road expansion"),
    rural: r("Akinyele hinterland", "047", "Farm towns north of the ring"),
  },
  {
    id: "abeokuta",
    state: "Ogun",
    capital: "Abeokuta",
    plate: "OG",
    zoneId: "south-west",
    x: 32,
    y: 232,
    urban: u("Abeokuta South", "009", "Ibara / Oke-Ilewo"),
    periurban: p("Sango-Ota road", "119", "Lagos-bound ribbon"),
    rural: r("Obafemi-Owode cluster", "036", "Villages toward Ijebu"),
  },
  {
    id: "osogbo",
    state: "Osun",
    capital: "Osogbo",
    plate: "OS",
    zoneId: "south-west",
    x: 58,
    y: 210,
    urban: u("Olorunda", "011", "Old garage / GRA"),
    periurban: p("Ikirun road", "084", "Northern fringe"),
    rural: r("Egbedore hinterland", "023", "Farm hamlets west of the city"),
  },
  {
    id: "ado-ekiti",
    state: "Ekiti",
    capital: "Ado-Ekiti",
    plate: "EK",
    zoneId: "south-west",
    x: 84,
    y: 216,
    urban: u("Ado Central", "014", "Iworoko Road / secretariat"),
    periurban: p("Ikere road", "076", "Southern ribbon"),
    rural: r("Irepodun hinterland", "021", "Hill towns without street indices"),
  },
  {
    id: "akure",
    state: "Ondo",
    capital: "Akure",
    plate: "ON",
    zoneId: "south-west",
    x: 94,
    y: 228,
    urban: u("Akure South", "010", "Alagbaka / Oba Adesida Road"),
    periurban: p("Oda road fringe", "101", "Owo-bound edge"),
    rural: r("Ifedore cluster", "035", "Cocoa-belt villages"),
  },
  {
    id: "enugu",
    state: "Enugu",
    capital: "Enugu",
    plate: "EN",
    zoneId: "south-east",
    x: 161.2,
    y: 248.9,
    urban: u("Enugu North", "003", "Independence Layout / Ogbete"),
    periurban: p("Thinkers Corner", "129", "Abakpa–Emene corridor"),
    rural: r("Nkanu hinterland", "043", "Towns off the Awgu road"),
  },
  {
    id: "awka",
    state: "Anambra",
    capital: "Awka",
    plate: "AN",
    zoneId: "south-east",
    x: 144,
    y: 254,
    urban: u("Awka South", "012", "Aroma / Government House"),
    periurban: p("Amansea fringe", "095", "Onitsha-road edge"),
    rural: r("Njikoka cluster", "026", "Towns without a used street code"),
  },
  {
    id: "abakaliki",
    state: "Ebonyi",
    capital: "Abakaliki",
    plate: "EB",
    zoneId: "south-east",
    x: 186,
    y: 244,
    urban: u("Abakaliki Capital", "019", "Presco / Kpirikpiri"),
    periurban: p("Nkaliki fringe", "087", "Afikpo-road ribbon"),
    rural: r("Izzi hinterland", "032", "Farm settlements north of town"),
  },
  {
    id: "owerri",
    state: "Imo",
    capital: "Owerri",
    plate: "IM",
    zoneId: "south-east",
    x: 147,
    y: 273,
    urban: u("Owerri Municipal", "006", "Douglas Road / Amakohia"),
    periurban: p("Nekede fringe", "117", "Okigwe-road edge"),
    rural: r("Mbaitoli cluster", "040", "Village groups west of the city"),
  },
  {
    id: "umuahia",
    state: "Abia",
    capital: "Umuahia",
    plate: "AB",
    zoneId: "south-east",
    x: 156,
    y: 282,
    urban: u("Umuahia North", "013", "BCA / secretariat"),
    periurban: p("Umuopara fringe", "098", "Aba-road ribbon"),
    rural: r("Ikwuano hinterland", "045", "Farm towns toward Ikot Ekpene"),
  },
  {
    id: "benin-city",
    state: "Edo",
    capital: "Benin City",
    plate: "ED",
    zoneId: "south-south",
    x: 97.9,
    y: 252.2,
    urban: u("Oredo", "004", "Ring Road / Government House"),
    periurban: p("Ekenwan corridor", "134", "Western expansion"),
    rural: r("Ovia hinterland", "052", "Forest-edge settlements"),
  },
  {
    id: "asaba",
    state: "Delta",
    capital: "Asaba",
    plate: "DE",
    zoneId: "south-south",
    x: 128,
    y: 256,
    urban: u("Asaba Core", "015", "Nnebisi Road / Summit junction"),
    periurban: p("Okpanam fringe", "109", "Benin-road edge"),
    rural: r("Oshimili hinterland", "024", "Anioma villages north of the Niger"),
  },
  {
    id: "yenagoa",
    state: "Bayelsa",
    capital: "Yenagoa",
    plate: "BY",
    zoneId: "south-south",
    x: 126,
    y: 296,
    urban: u("Yenagoa Central", "020", "Imgbi Road / Government House"),
    periurban: p("Igbogene fringe", "082", "Mbiama-road ribbon"),
    rural: r("Southern Ijaw cluster", "058", "Creek communities, one code per landing"),
  },
  {
    id: "port-harcourt",
    state: "Rivers",
    capital: "Port Harcourt",
    plate: "RI",
    zoneId: "south-south",
    x: 144.5,
    y: 303.0,
    urban: u("Old GRA", "002", "Aba Road / Forces Avenue"),
    periurban: p("Rumuokoro corridor", "147", "East-West Road fringe"),
    rural: r("Etche cluster", "061", "Farm settlements north of the city"),
  },
  {
    id: "uyo",
    state: "Akwa Ibom",
    capital: "Uyo",
    plate: "AK",
    zoneId: "south-south",
    x: 168,
    y: 302,
    urban: u("Uyo Capital", "008", "Ibom Plaza / Wellington Bassey"),
    periurban: p("Nwaniba fringe", "111", "Airport-road edge"),
    rural: r("Ibesikpo hinterland", "049", "Villages toward Eket"),
  },
  {
    id: "calabar",
    state: "Cross River",
    capital: "Calabar",
    plate: "CR",
    zoneId: "south-south",
    x: 188.2,
    y: 298.7,
    urban: u("Calabar Municipal", "005", "Marina / Watt Market"),
    periurban: p("Tinapa corridor", "122", "Northern bypass fringe"),
    rural: r("Akpabuyo cluster", "053", "Creek-side settlements"),
  },
];

function padUnit(n: number): string {
  return String(n).padStart(3, "0");
}

function street(
  name: string,
  unit: number | string,
  side: StreetSide,
  stretch: string,
  sample: string,
): PostalStreetZone {
  return {
    name,
    unit: typeof unit === "number" ? padUnit(unit) : unit,
    side,
    stretch,
    sample,
  };
}

const STREET_OVERRIDES: Record<string, { urban: PostalStreetZone[]; periurban: PostalStreetZone[] }> = {
  abuja: {
    urban: [
      street("Independence Avenue (odd)", "001", "odd", "Three Arms Zone → Eagle Square", "Plots 1–49"),
      street("Independence Avenue (even)", "002", "even", "Eagle Square → Three Arms Zone", "Plots 2–50"),
      street("Shehu Shagari Way", "003", "both", "Central Area loop, both sides", "Ministries / Block A–D"),
      street("Ahmadu Bello Way (Central)", "004", "both", "Aso Drive junction to Tafawa Balewa", "Compounds 1–24"),
    ],
    periurban: [
      street("Airport Road frontage (odd)", "118", "odd", "Kubwa express, city-bound", "Plots 1–39"),
      street("Airport Road frontage (even)", "119", "even", "Kubwa express, airport-bound", "Plots 2–40"),
    ],
  },
  ikeja: {
    urban: [
      street("Obafemi Awolowo Way (odd)", "001", "odd", "Alausa secretariat stretch", "Plots 1–61"),
      street("Obafemi Awolowo Way (even)", "002", "even", "Alausa opposite secretariat", "Plots 2–62"),
      street("Allen Avenue", "003", "both", "Opebi junction to Toyin", "Shops 1–80"),
      street("Isaac John Street (GRA)", "004", "both", "Ikeja GRA inner loop", "Houses 1–36"),
    ],
    periurban: [
      street("Lagos–Ibadan express frontage (odd)", "156", "odd", "Ojodu–Berger, outbound", "Warehouses 1–20"),
      street("Berger service lane", "157", "both", "Inner collector behind the express", "Compounds 1–28"),
    ],
  },
  kano: {
    urban: [
      street("Murtala Mohammed Way (odd)", "003", "odd", "Sabon Gari to city wall", "Plots 1–55"),
      street("Murtala Mohammed Way (even)", "004", "even", "City wall to Sabon Gari", "Plots 2–56"),
      street("France Road", "005", "both", "Sabon Gari market streets", "Stalls 1–120"),
      street("Kofar Mata inner", "006", "both", "Inside the wall, palace approach", "Compounds A–L"),
    ],
    periurban: [
      street("Zaria Road frontage (odd)", "141", "odd", "Ungogo corridor, outbound", "Plots 1–33"),
      street("Zaria Road frontage (even)", "142", "even", "Ungogo corridor, inbound", "Plots 2–34"),
    ],
  },
  kaduna: {
    urban: [
      street("Ahmadu Bello Way (odd)", "006", "odd", "Kaduna North, southbound", "Plots 1–47"),
      street("Ahmadu Bello Way (even)", "007", "even", "Kaduna North, northbound", "Plots 2–48"),
      street("Independence Way", "008", "both", "Secretariat to stadium", "Blocks 1–18"),
      street("Yakubu Gowon Way", "009", "both", "GRA inner collector", "Houses 1–40"),
    ],
    periurban: [
      street("Western bypass frontage", "124", "both", "Rigasa rail corridor", "Compounds 1–30"),
      street("Rigasa service lane", "125", "both", "Inner lane off the bypass", "Plots 1–22"),
    ],
  },
  "port-harcourt": {
    urban: [
      street("Aba Road (odd)", "002", "odd", "Old GRA to Rumuola", "Plots 1–71"),
      street("Aba Road (even)", "003", "even", "Rumuola to Old GRA", "Plots 2–72"),
      street("Forces Avenue", "004", "both", "Old GRA inner", "Houses 1–32"),
      street("Azikiwe Road", "005", "both", "Town to harbour approach", "Shops 1–48"),
    ],
    periurban: [
      street("East-West Road frontage (odd)", "147", "odd", "Rumuokoro outbound", "Plots 1–41"),
      street("East-West Road frontage (even)", "148", "even", "Rumuokoro inbound", "Plots 2–42"),
    ],
  },
  ibadan: {
    urban: [
      street("Queen Elizabeth Road (odd)", "002", "odd", "Agodi toward Dugbe", "Plots 1–45"),
      street("Queen Elizabeth Road (even)", "003", "even", "Dugbe toward Agodi", "Plots 2–46"),
      street("Lebanon Street", "004", "both", "Dugbe market grid", "Stalls 1–90"),
      street("Iwo Road inner GRA", "005", "both", "Agodi GRA loop", "Houses 1–28"),
    ],
    periurban: [
      street("Oyo Road frontage (odd)", "138", "odd", "Moniya corridor outbound", "Plots 1–35"),
      street("Oyo Road frontage (even)", "139", "even", "Moniya corridor inbound", "Plots 2–36"),
    ],
  },
  enugu: {
    urban: [
      street("Okpara Avenue (odd)", "003", "odd", "Independence Layout stretch", "Plots 1–51"),
      street("Okpara Avenue (even)", "004", "even", "Opposite Independence Layout", "Plots 2–52"),
      street("Ogui Road", "005", "both", "Ogbete market approach", "Shops 1–64"),
      street("Rangers Avenue", "006", "both", "GRA inner", "Houses 1–24"),
    ],
    periurban: [
      street("Abakpa–Emene Road (odd)", "129", "odd", "Thinkers Corner outbound", "Plots 1–37"),
      street("Abakpa–Emene Road (even)", "130", "even", "Thinkers Corner inbound", "Plots 2–38"),
    ],
  },
  maiduguri: {
    urban: [
      street("Baga Road (odd)", "002", "odd", "Monday Market stretch", "Plots 1–43"),
      street("Baga Road (even)", "003", "even", "Opposite Monday Market", "Plots 2–44"),
      street("Shehu Laminu Way", "004", "both", "Palace approach", "Compounds 1–20"),
      street("Lagos Street", "005", "both", "GRA inner", "Houses 1–30"),
    ],
    periurban: [
      street("Kano–Maiduguri dual (odd)", "115", "odd", "Khaddamari outbound", "Plots 1–29"),
      street("Kano–Maiduguri dual (even)", "116", "even", "Khaddamari inbound", "Plots 2–30"),
    ],
  },
};

function defaultUrbanStreets(city: PostalCapital): PostalStreetZone[] {
  const base = Number(city.urban.unit);
  const [first, second] = city.urban.landmark.split(" / ").map((part) => part.trim());
  return [
    street(`${first} (odd)`, base, "odd", `${first}, city-bound plots`, "Plots 1–49"),
    street(`${first} (even)`, base + 1, "even", `${first}, outbound plots`, "Plots 2–50"),
    street(second ?? `${city.capital} GRA inner`, base + 2, "both", `${second ?? "GRA loop"}, both sides`, "Compounds A–H"),
    street(`${city.urban.name} market street`, base + 3, "both", "Market / motor-park frontage", "Stalls 1–80"),
  ];
}

function defaultPeriStreets(city: PostalCapital): PostalStreetZone[] {
  const base = Number(city.periurban.unit);
  const label = city.periurban.landmark.split(" / ")[0]?.trim() ?? city.periurban.name;
  return [
    street(`${label} (odd)`, base, "odd", `${city.periurban.name}, outbound frontage`, "Plots 1–31"),
    street(`${label} (even)`, base + 1, "even", `${city.periurban.name}, inbound frontage`, "Plots 2–32"),
  ];
}

/** Street zones for a density band. Rural returns none until roads are gazetted. */
export function streetZonesFor(city: PostalCapital, band: PostalBand): PostalStreetZone[] {
  if (band === "R") return [];
  const override = STREET_OVERRIDES[city.id];
  if (band === "U") return override?.urban ?? defaultUrbanStreets(city);
  return override?.periurban ?? defaultPeriStreets(city);
}

export function formatPostalCode(plate: string, place: PostalPlace): string {
  return `${plate}-${place.band}${place.district}-${place.unit}`;
}

export function formatStreetCode(plate: string, band: PostalBand, district: string, unit: string): string {
  return `${plate}-${band}${district}-${unit}`;
}

export function getPostalCapital(id: string): PostalCapital | undefined {
  return POSTAL_CAPITALS.find((city) => city.id === id);
}
