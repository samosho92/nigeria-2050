import { getEraById, getTimelineEntryById } from "@/content/timeline";

export function resolveTimelineRef(id: string): { href: string; label: string } {
  const entry = getTimelineEntryById(id);
  if (entry) return { href: `/timeline#${entry.id}`, label: entry.title };

  const era = getEraById(id);
  if (era) return { href: `/timeline#era-${era.id}`, label: era.label };

  return { href: `/timeline#${id}`, label: "Timeline" };
}
