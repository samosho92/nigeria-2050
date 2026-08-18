export { SECTORS, getSectorBySlug, getAllSectorSlugs } from "@/content/sectors";

export type SectorSlug = (typeof import("@/content/sectors").SECTORS)[number]["slug"];
