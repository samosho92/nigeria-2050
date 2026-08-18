import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { PageHero } from "@/components/layout/PageHero";
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

  const sections: StatSnapshotSection[] = [{ heading: "Today", rows: baselineRows }];

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
      <PageHero
        backLink={{ href: "/sectors", label: "All sectors" }}
        eyebrow={`Sector ${sectorNumber} · ${SECTORS.length} flagship projections`}
        title={sector.title}
        description={sector.tagline}
        aside={
          <div className="px-6 pb-10 lg:px-0 lg:pb-0">
            <StatSnapshot sections={buildSnapshotSections(sector)} />
          </div>
        }
        contentClassName="max-w-none lg:col-span-7"
      >
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
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
      </PageHero>
    </FadeIn>
  );
}
