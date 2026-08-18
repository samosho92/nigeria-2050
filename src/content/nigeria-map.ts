export interface NigeriaMapCity {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface NigeriaMapRegion {
  id: string;
  code: string;
  label: string;
  states: string[];
  summary: string;
  sectorSlugs: string[];
  path: string;
  labelX: number;
  labelY: number;
}

/**
 * Six geopolitical zones projected from lon/lat (2.5–15°E, 4–14°N)
 * into SVG viewBox 0 0 400 480. Shared vertices so the country tessellates.
 */
export const NIGERIA_MAP_REGIONS: NigeriaMapRegion[] = [
  {
    id: "north-west",
    code: "NW",
    label: "North West",
    states: ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
    summary:
      "Sahel trade corridors, the Kano–Kaduna industrial axis, and the security challenge that frames every 2050 projection from this belt.",
    sectorSlugs: ["security", "agriculture", "education"],
    path: "M 50.2 36.3 L 195.7 48.9 L 194.2 179.1 L 146.7 221.1 L 76.2 237.9 L 47.4 139.2 Z",
    labelX: 118,
    labelY: 128,
  },
  {
    id: "north-east",
    code: "NE",
    label: "North East",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
    summary:
      "Lake Chad, recovery from insurgency, and a food-and-health rebuild that has to hold if national human-capital targets are real.",
    sectorSlugs: ["security", "agriculture", "healthcare"],
    path: "M 195.7 48.9 L 326.7 41.8 L 355.5 69.9 L 344 160.2 L 326.7 267.3 L 276.3 284.1 L 220.2 223.2 L 194.2 179.1 Z",
    labelX: 280,
    labelY: 148,
  },
  {
    id: "north-central",
    code: "NC",
    label: "North Central",
    states: ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau", "FCT"],
    summary:
      "The Middle Belt and Abuja — federal power, the food basket, and the farmer–herder fault line at the center of the map.",
    sectorSlugs: ["governance", "agriculture", "education"],
    path: "M 47.4 139.2 L 76.2 237.9 L 146.7 221.1 L 194.2 179.1 L 220.2 223.2 L 276.3 284.1 L 246.1 330.3 L 177 317.7 L 133.8 300.9 L 90.6 271.5 L 50.2 258.9 L 44.5 206.4 Z",
    labelX: 142,
    labelY: 248,
  },
  {
    id: "south-west",
    code: "SW",
    label: "South West",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
    summary:
      "Lagos and the Yoruba hinterland — tech, finance, ports, and the densest 2050 economic case on the map.",
    sectorSlugs: ["technology", "economy", "financial-inclusion", "creative-economy"],
    path: "M 50.2 258.9 L 90.6 271.5 L 133.8 300.9 L 107.8 355.5 L 45.3 348.4 L 25.2 350 L 28.1 300.9 Z",
    labelX: 72,
    labelY: 308,
  },
  {
    id: "south-east",
    code: "SE",
    label: "South East",
    states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
    summary:
      "Trade, manufacturing, and a dense commercial culture — the industrial piece of the 2050 diversification story.",
    sectorSlugs: ["manufacturing", "technology", "economy"],
    path: "M 133.8 300.9 L 177 317.7 L 246.1 330.3 L 194.2 376.5 L 153.9 389.1 L 133.8 359.7 Z",
    labelX: 178,
    labelY: 342,
  },
  {
    id: "south-south",
    code: "SS",
    label: "South South",
    states: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
    summary:
      "The Niger Delta — oil, gas, ports, and the energy transition Nigeria has to make without stranding the region that funded the state.",
    sectorSlugs: ["energy", "economy", "healthcare"],
    path: "M 107.8 355.5 L 133.8 359.7 L 153.9 389.1 L 194.2 376.5 L 246.1 330.3 L 214.4 368.1 L 191.4 413 L 125.1 438.7 L 90.6 384.9 Z",
    labelX: 155,
    labelY: 388,
  },
];

export const NIGERIA_MAP_CITIES: NigeriaMapCity[] = [
  { id: "lagos", label: "Lagos", x: 45.3, y: 344.2 },
  { id: "ibadan", label: "Ibadan", x: 60.3, y: 308 },
  { id: "abuja", label: "Abuja", x: 163.7, y: 236.6 },
  { id: "kaduna", label: "Kaduna", x: 162.3, y: 176.2 },
  { id: "kano", label: "Kano", x: 193.4, y: 114 },
  { id: "maiduguri", label: "Maiduguri", x: 327, y: 121.1 },
  { id: "enugu", label: "Enugu", x: 164.3, y: 347.5 },
  { id: "port-harcourt", label: "Port Harcourt", x: 149.9, y: 415.6 },
];

export const NIGERIA_MAP_VIEWBOX = "0 0 400 480";
