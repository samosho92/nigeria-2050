import { ICONS } from "@/content/icons";
import { PULSE_CATEGORIES, PULSE_POLLS } from "@/content/polls";
import { COOL_PROJECTS } from "@/content/projects";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES, TIMELINE_ERAS } from "@/content/timeline";

export const CONTENT_STATS = {
  sectorCount: SECTORS.length,
  timelineEntryCount: TIMELINE_ENTRIES.length,
  eraCount: TIMELINE_ERAS.length,
  iconCount: ICONS.length,
  projectCount: COOL_PROJECTS.length,
  pulsePollCount: PULSE_POLLS.length,
  pulseCategoryCount: PULSE_CATEGORIES.length,
} as const;
