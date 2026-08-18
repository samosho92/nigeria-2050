import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES, TIMELINE_ERAS } from "@/content/timeline";

export const CONTENT_STATS = {
  sectorCount: SECTORS.length,
  timelineEntryCount: TIMELINE_ENTRIES.length,
  eraCount: TIMELINE_ERAS.length,
} as const;
