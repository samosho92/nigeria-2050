import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { G7GapExplorer } from "@/components/compare/G7GapExplorer";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { G7_BENCHMARK_METRICS, G7_COUNTRY_LABELS, getBenchmarkYearRange } from "@/content/g7-benchmark";
import { getSourcesByIds } from "@/content/sources";

export const metadata: Metadata = {
  title: "Nigeria vs. G7",
  description:
    "Same-indicator, same-year benchmarks: Nigeria against each G7 country across all sector tabs.",
};

export default function G7ComparePage() {
  const sourceIds = [...new Set(G7_BENCHMARK_METRICS.map((m) => m.sourceId))];
  const sources = getSourcesByIds(sourceIds);
  const { earliest, latest } = getBenchmarkYearRange();
  const g7List = Object.values(G7_COUNTRY_LABELS).join(", ");

  return (
    <>
      <PageHero
        backLink={{ href: "/compare", label: "Now vs. 2050" }}
        eyebrow="International benchmarks"
        title="Nigeria vs. the G7"
        description={`Apples-to-apples only: each row uses one indicator definition and one reference year (${earliest}–${latest}) for Nigeria and all G7 members (${g7List}). Hover any metric title for the exact dataset and series ID. 2050 figures are projections and are never mixed into cross-country baselines.`}
      />
      <Container className="py-12 md:py-16">
        <G7GapExplorer />
        <div className="mt-16">
          <SourcePanel sources={sources} title="Benchmark Data Sources" />
        </div>
      </Container>
    </>
  );
}
