import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Compare2050Explorer } from "@/components/compare/Compare2050Explorer";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { COMPARATOR_METRICS } from "@/content/comparator";
import { COMPARE_PAGE_META } from "@/content/compare-meta";
import { getSourcesByIds } from "@/content/sources";

export const metadata: Metadata = {
  title: COMPARE_PAGE_META.title,
  description: COMPARE_PAGE_META.description,
};

export default function ComparePage() {
  const sourceIds = [...new Set(COMPARATOR_METRICS.map((m) => m.sourceId))];
  const sources = getSourcesByIds(sourceIds);

  return (
    <>
      <PageHero
        eyebrow={COMPARE_PAGE_META.eyebrow}
        title={COMPARE_PAGE_META.pageTitle}
        description={COMPARE_PAGE_META.pageDescription}
      />
      <Container size="narrow" className="py-12 md:py-16">
        <Link
          href="/compare/g7"
          className="flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent/5 px-5 py-4 transition hover:border-accent hover:bg-accent/10"
        >
          <div>
            <p className="font-semibold text-foreground">{COMPARE_PAGE_META.g7TeaserTitle}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {COMPARE_PAGE_META.g7TeaserDescription}
            </p>
          </div>
          <IconArrowRight className="size-5 shrink-0 text-accent" stroke={1.5} aria-hidden />
        </Link>
        <div className="mt-12">
          <Compare2050Explorer metrics={COMPARATOR_METRICS} />
        </div>
        <div className="mt-12">
          <SourcePanel sources={sources} title={COMPARE_PAGE_META.sourcesTitle} />
        </div>
      </Container>
    </>
  );
}
