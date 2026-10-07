import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { PageHero } from "@/components/layout/PageHero";
import { AutoGlossary } from "@/components/ui/GlossaryTerm";
import { StatSnapshot, type StatSnapshotSection } from "@/components/ui/StatSnapshot";
import { FadeIn } from "@/components/motion";
import { SECTOR_DETAIL_UI } from "@/content/sectors";
import { SECTORS } from "@/lib/content";
import { formatMetricKey, formatScenarioValue } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Sector } from "@/types/content";

interface SectorHeroProps {
  sector: Sector;
}

function buildSnapshotSections(sector: Sector): StatSnapshotSection[] {
  const ui = SECTOR_DETAIL_UI;
  const baselineRows = Object.entries(sector.baseline)
    .slice(0, 4)
    .map(([key, value]) => ({
      label: formatMetricKey(key),
      value: String(value),
    }));

  const sections: StatSnapshotSection[] = [{ heading: ui.snapshotToday, rows: baselineRows }];

  const primaryScenario = sector.scenarioRanges?.[0];
  if (primaryScenario) {
    sections.push({
      heading: ui.snapshotScenario,
      caption: ui.snapshotScenarioCaption(primaryScenario.label),
      accent: true,
      rows: [
        {
          label: ui.snapshotProjection,
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
  const ui = SECTOR_DETAIL_UI;

  return (
    <FadeIn>
      <PageHero
        backLink={{ href: "/sectors", label: ui.backLabel }}
        eyebrow={ui.eyebrow(sectorNumber, SECTORS.length)}
        title={sector.title}
        description={sector.tagline}
        aside={
          <div className="px-6 pb-10 lg:px-8 lg:py-16">
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
              {ui.reviewLabels[sector.reviewStatus]}
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
          {ui.methodologyCta}
          <IconArrowRight className="size-3.5" stroke={1.5} aria-hidden />
        </Link>
      </PageHero>
    </FadeIn>
  );
}
