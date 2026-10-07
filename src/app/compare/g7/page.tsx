import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { G7GapExplorer } from "@/components/compare/G7GapExplorer";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { getG7PageMeta } from "@/content/compare-meta";
import { G7_BENCHMARK_METRICS } from "@/content/g7-benchmark";
import { getSourcesByIds } from "@/content/sources";

const g7Meta = getG7PageMeta();

export const metadata: Metadata = {
  title: g7Meta.title,
  description: g7Meta.description,
};

export default function G7ComparePage() {
  const sourceIds = [...new Set(G7_BENCHMARK_METRICS.map((m) => m.sourceId))];
  const sources = getSourcesByIds(sourceIds);
  const meta = getG7PageMeta();

  return (
    <>
      <PageHero
        backLink={{ href: "/compare", label: "Now vs. 2050" }}
        eyebrow={meta.eyebrow}
        title={meta.pageTitle}
        description={meta.pageDescription}
      />
      <Container className="py-12 md:py-16">
        <G7GapExplorer />
        <div className="mt-16">
          <SourcePanel sources={sources} title={meta.sourcesTitle} />
        </div>
      </Container>
    </>
  );
}
