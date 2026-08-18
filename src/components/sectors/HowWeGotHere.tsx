import { IconHistory } from "@tabler/icons-react";
import type { HistoricalWaypoint } from "@/types/content";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { FadeIn } from "@/components/motion";

interface HowWeGotHereProps {
  waypoints: HistoricalWaypoint[];
}

export function HowWeGotHere({ waypoints }: HowWeGotHereProps) {
  return (
    <FadeIn>
      <div className="rounded-xl border border-border bg-surface p-6 lg:p-8">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
          <IconHistory className="size-6 text-accent" stroke={1.5} aria-hidden />
          How We Got Here
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {waypoints.map((wp, i) => (
            <TrackedLink
              key={wp.timelineEntryId}
              href={`/timeline#${wp.timelineEntryId}`}
              trackFrom="sector"
              className="group rounded-lg border border-border bg-card p-4 transition hover:border-accent hover:bg-surface-elevated"
            >
              <span className="text-xs font-medium text-accent">Waypoint {i + 1}</span>
              <h3 className="mt-1 font-semibold group-hover:text-accent">{wp.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{wp.summary}</p>
            </TrackedLink>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
