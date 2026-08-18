import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { MorphSlider } from "@/components/compare/MorphSlider";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { COMPARATOR_METRICS } from "@/content/comparator";
import { getSourcesByIds } from "@/content/sources";

export const metadata: Metadata = {
  title: "Now vs. 2050",
  description: "Compare Nigeria's current baseline with modeled 2050 projections.",
};

export default function ComparePage() {
  const sourceIds = [...new Set(COMPARATOR_METRICS.map((m) => m.sourceId))];
  const sources = getSourcesByIds(sourceIds);

  return (
    <>
      <PageHero
        eyebrow="Baseline vs. projection"
        title="Nigeria Now vs. Nigeria 2050"
        description="Drag the morph slider to travel through time. Every metric is sourced. Optimistic, not naive."
      />
      <Container size="narrow" className="py-12 md:py-16">
        <Link
          href="/compare/g7"
          className="flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent/5 px-5 py-4 transition hover:border-accent hover:bg-accent/10"
        >
          <div>
            <p className="font-semibold text-foreground">Nigeria vs. the G7</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              See how wide the gap is today, sector by sector, indicator by indicator.
            </p>
          </div>
          <IconArrowRight className="size-5 shrink-0 text-accent" stroke={1.5} aria-hidden />
        </Link>
        <div className="mt-12">
          <MorphSlider metrics={COMPARATOR_METRICS} />
        </div>
        <div className="mt-12">
          <SourcePanel sources={sources} title="Comparator Data Sources" />
        </div>
      </Container>
    </>
  );
}
