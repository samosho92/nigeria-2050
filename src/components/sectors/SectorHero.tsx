import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { PageHero } from "@/components/layout/PageHero";
import { AutoGlossary } from "@/components/ui/GlossaryTerm";
import { FadeIn } from "@/components/motion";
import { getSectorHeroRail, SECTOR_DETAIL_UI } from "@/content/sectors";
import { SECTORS } from "@/lib/content";
import type { Sector } from "@/types/content";

interface SectorHeroProps {
  sector: Sector;
}

export function SectorHero({ sector }: SectorHeroProps) {
  const sectorIndex = SECTORS.findIndex((entry) => entry.slug === sector.slug);
  const sectorNumber = String(sectorIndex + 1).padStart(2, "0");
  const ui = SECTOR_DETAIL_UI;
  const hasScenarios = Boolean(sector.scenarioRanges?.length);

  return (
    <FadeIn>
      <PageHero
        backLink={{ href: "/sectors", label: ui.backLabel }}
        eyebrow={ui.eyebrow(sectorNumber, SECTORS.length)}
        title={sector.title}
        description={sector.tagline}
        rail={getSectorHeroRail(hasScenarios)}
      >
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
