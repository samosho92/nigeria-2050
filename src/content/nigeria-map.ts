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
 * Six geopolitical zones traced from the reference zone map
 * (outer silhouette + zone joins), then simplified for interaction.
 * SVG viewBox matches the traced crop: 400 × 330.
 */
export const NIGERIA_MAP_REGIONS: NigeriaMapRegion[] = [
  {
    id: "north-west",
    code: "NW",
    label: "North West",
    states: ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
    summary:
      "Sahel trade corridors, the Kano–Kaduna industrial axis, and the security challenge that frames every 2050 projection from this belt.",
    sectorSlugs: ["security", "agriculture", "education", "transportation", "real-estate"],
    path: "M 75.8 0.0 L 113.7 0.0 L 133.3 5.6 L 147.4 22.5 L 155.8 16.8 L 192.3 16.8 L 221.8 33.7 L 235.8 35.1 L 251.2 29.5 L 255.4 35.1 L 262.5 35.1 L 263.9 46.3 L 255.4 47.7 L 247.0 63.2 L 233.0 68.8 L 241.4 82.8 L 255.4 88.4 L 255.4 92.6 L 240.0 96.8 L 235.8 87.0 L 214.7 84.2 L 202.1 95.4 L 204.9 106.7 L 196.5 141.8 L 200.7 151.6 L 197.9 160.0 L 192.3 162.8 L 186.7 157.2 L 179.6 161.4 L 175.4 153.0 L 151.6 151.6 L 153.0 130.5 L 140.4 127.7 L 144.6 119.3 L 141.8 113.7 L 126.3 109.5 L 113.7 115.1 L 115.1 98.2 L 110.9 92.6 L 91.2 96.8 L 85.6 84.2 L 73.0 87.0 L 80.0 94.0 L 80.0 103.9 L 71.6 108.1 L 73.0 120.7 L 61.8 124.9 L 60.4 110.9 L 66.0 98.2 L 25.3 91.2 L 30.9 33.7 L 44.9 18.2 L 47.7 4.2 L 74.4 1.4 Z",
    labelX: 137,
    labelY: 62,
  },
  {
    id: "north-east",
    code: "NE",
    label: "North East",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
    summary:
      "Lake Chad, recovery from insurgency, and a food-and-health rebuild that has to hold if national human-capital targets are real.",
    sectorSlugs: ["security", "agriculture", "healthcare", "real-estate"],
    path: "M 345.3 2.8 L 371.9 2.8 L 380.4 12.6 L 384.6 36.5 L 398.6 49.1 L 398.6 85.6 L 388.8 87.0 L 369.1 108.1 L 360.7 130.5 L 352.3 138.9 L 352.3 150.2 L 341.1 161.4 L 338.2 175.4 L 318.6 195.1 L 317.2 209.1 L 296.1 248.4 L 275.1 248.4 L 261.1 234.4 L 244.2 242.8 L 233.0 242.8 L 233.0 228.8 L 240.0 220.4 L 240.0 211.9 L 228.8 200.7 L 216.1 200.7 L 221.8 192.3 L 220.4 185.3 L 237.2 182.5 L 261.1 167.0 L 265.3 157.2 L 259.6 144.6 L 240.0 134.7 L 233.0 144.6 L 220.4 143.2 L 216.1 130.5 L 200.7 116.5 L 200.7 95.4 L 217.5 82.8 L 238.6 87.0 L 242.8 95.4 L 254.0 91.2 L 241.4 85.6 L 231.6 67.4 L 245.6 61.8 L 251.2 49.1 L 262.5 43.5 L 262.5 37.9 L 248.4 29.5 L 233.0 35.1 L 233.0 19.6 L 256.8 14.0 L 307.4 15.4 L 318.6 19.6 L 343.9 4.2 Z",
    labelX: 310,
    labelY: 108,
  },
  {
    id: "north-central",
    code: "NC",
    label: "North Central",
    states: ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau", "FCT"],
    summary:
      "The Middle Belt and Abuja, federal power, the food basket, and the farmer–herder fault line at the center of the map.",
    sectorSlugs: ["governance", "agriculture", "education", "transportation", "real-estate"],
    path: "M 82.8 82.8 L 88.4 84.2 L 95.4 96.8 L 112.3 91.2 L 116.5 115.1 L 122.1 109.5 L 138.9 108.1 L 146.0 117.9 L 141.8 126.3 L 153.0 127.7 L 154.4 151.6 L 176.8 150.2 L 181.1 160.0 L 189.5 157.2 L 193.7 161.4 L 199.3 153.0 L 195.1 143.2 L 202.1 116.5 L 207.7 116.5 L 223.2 143.2 L 233.0 143.2 L 241.4 133.3 L 263.9 146.0 L 265.3 165.6 L 238.6 183.9 L 223.2 185.3 L 223.2 193.7 L 217.5 197.9 L 231.6 200.7 L 241.4 210.5 L 233.0 233.0 L 233.0 248.4 L 226.0 248.4 L 218.9 240.0 L 209.1 240.0 L 204.9 233.0 L 171.2 244.2 L 171.2 235.8 L 157.2 226.0 L 131.9 245.6 L 130.5 220.4 L 113.7 214.7 L 92.6 195.1 L 60.4 195.1 L 51.9 181.1 L 50.5 165.6 L 39.3 157.2 L 26.7 168.4 L 0.0 178.2 L 0.0 157.2 L 28.1 119.3 L 33.7 91.2 L 64.6 95.4 L 67.4 106.7 L 60.4 113.7 L 64.6 122.1 L 73.0 116.5 L 70.2 106.7 L 78.6 102.5 L 78.6 95.4 L 70.2 91.2 L 70.2 85.6 L 81.4 84.2 Z",
    labelX: 95,
    labelY: 165,
  },
  {
    id: "south-west",
    code: "SW",
    label: "South West",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
    summary:
      "Lagos and the Yoruba hinterland, tech, finance, ports, soaring housing costs, and the densest 2050 economic case on the map.",
    sectorSlugs: ["technology", "economy", "financial-inclusion", "creative-economy", "transportation", "real-estate"],
    path: "M 36.5 155.8 L 54.7 162.8 L 53.3 178.2 L 63.2 193.7 L 94.0 192.3 L 112.3 207.7 L 102.5 235.8 L 94.0 238.6 L 89.8 233.0 L 80.0 240.0 L 78.6 265.3 L 63.2 266.7 L 42.1 249.8 L 0.0 251.2 L 0.0 176.8 L 35.1 157.2 Z",
    labelX: 48,
    labelY: 214,
  },
  {
    id: "south-east",
    code: "SE",
    label: "South East",
    states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
    summary:
      "Trade, manufacturing, and a dense commercial culture, the industrial piece of the 2050 diversification story.",
    sectorSlugs: ["manufacturing", "technology", "economy", "transportation", "real-estate"],
    path: "M 154.4 224.6 L 172.6 233.0 L 175.4 240.0 L 186.7 235.8 L 192.3 247.0 L 186.7 261.1 L 172.6 269.5 L 175.4 283.5 L 165.6 280.7 L 160.0 300.4 L 148.8 300.4 L 150.2 290.5 L 136.1 289.1 L 130.5 272.3 L 134.7 258.2 L 131.9 244.2 L 153.0 226.0 Z",
    labelX: 162,
    labelY: 256,
  },
  {
    id: "south-south",
    code: "SS",
    label: "South South",
    states: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
    summary:
      "The Niger Delta, oil, gas, ports, and the energy transition Nigeria has to make without stranding the region that funded the state.",
    sectorSlugs: ["energy", "economy", "healthcare", "transportation", "real-estate"],
    path: "M 109.5 210.5 L 134.7 221.8 L 131.9 238.6 L 136.1 259.6 L 131.9 277.9 L 140.4 289.1 L 153.0 289.1 L 151.6 298.9 L 158.6 298.9 L 164.2 279.3 L 172.6 279.3 L 175.4 262.5 L 183.9 261.1 L 189.5 252.6 L 186.7 238.6 L 202.1 231.6 L 226.0 244.2 L 226.0 261.1 L 207.7 279.3 L 202.1 306.0 L 164.2 317.2 L 95.4 318.6 L 87.0 294.7 L 77.2 282.1 L 80.0 258.2 L 75.8 251.2 L 82.8 233.0 L 101.1 235.8 L 108.1 211.9 Z",
    labelX: 155,
    labelY: 298,
  },
];

export const NIGERIA_MAP_CITIES: NigeriaMapCity[] = [
  { id: "sokoto", label: "Sokoto", x: 85.3, y: 27.7 },
  { id: "kano", label: "Kano", x: 194.8, y: 63.1 },
  { id: "maiduguri", label: "Maiduguri", x: 349.4, y: 68.8 },
  { id: "kaduna", label: "Kaduna", x: 158.9, y: 112.6 },
  { id: "jos", label: "Jos", x: 207.2, y: 132.3 },
  { id: "abuja", label: "Abuja", x: 160.5, y: 160.7 },
  { id: "ibadan", label: "Ibadan", x: 41.0, y: 217.5 },
  { id: "lagos", label: "Lagos", x: 23.6, y: 246.2 },
  { id: "benin-city", label: "Benin City", x: 97.9, y: 252.2 },
  { id: "enugu", label: "Enugu", x: 161.2, y: 248.9 },
  { id: "port-harcourt", label: "Port Harcourt", x: 144.5, y: 303.0 },
  { id: "calabar", label: "Calabar", x: 188.2, y: 298.7 },
];

export const NIGERIA_MAP_VIEWBOX = "0 0 400 330";
