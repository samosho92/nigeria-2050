import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { AutoGlossary } from "@/components/ui/GlossaryTerm";
import { StatSnapshot, type StatSnapshotSection } from "@/components/ui/StatSnapshot";
import { FadeIn } from "@/components/motion";
import { SECTORS } from "@/lib/content";
import { formatMetricKey, formatScenarioValue } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Sector } from "@/types/content";

interface SectorHeroProps {
  sector: Sector;
}

const REVIEW_LABELS: Record<NonNullable<Sector["reviewStatus"]>, string> = {
  reviewed: "Editorially reviewed",
  "pending-review": "Pending review",
  draft: "Draft",
};

function buildSnapshotSections(sector: Sector): StatSnapshotSection[] {
  const baselineRows = Object.entries(sector.baseline)
    .slice(0, 4)
    .map(([key, value]) => ({
      label: formatMetricKey(key),
      value: String(value),
    }));

  const sections: StatSnapshotSection[] = [
    { heading: "Today", rows: baselineRows },
  ];

  const primaryScenario = sector.scenarioRanges?.[0];
  if (primaryScenario) {
    sections.push({
      heading: "2050 base case",
      caption: primaryScenario.label,
      accent: true,
      rows: [
        {
          label: "Projection",
          value: formatScenarioValue(primaryScenario, primaryScenario.base),
        },
      ],
    });
  }

  return sections;
}

export function SectorHero({ sector }: SectorHeroProps) {
  const sectorIndex = SECTORS.findIndex((entry) => entry.slug === sector.slug);
  const sectorNumber = String(sectorIndex + 1).padStart(2, "0");

  return (
    <FadeIn>
      <header>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Sector {sectorNumber}
            <span className="mx-2 font-normal text-border">·</span>
            {SECTORS.length} flagship projections
          </p>
          {sector.reviewStatus && (
            <p
              className={cn(
                "text-xs font-medium",
                sector.reviewStatus === "reviewed"
                  ? "text-accent"
                  : "text-muted-foreground",
              )}
            >
              {REVIEW_LABELS[sector.reviewStatus]}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:leading-[1.08]">
              {sector.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-snug text-muted-foreground md:text-xl">
              {sector.tagline}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg md:leading-8">
              <AutoGlossary text={sector.headline2050} />
            </p>
            <Link
              href="/methodology"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-accent"
            >
              How we model projections
              <IconArrowRight className="size-3.5" stroke={1.5} aria-hidden />
            </Link>
          </div>

          <StatSnapshot sections={buildSnapshotSections(sector)} />
        </div>
      </header>
    </FadeIn>
  );
}
