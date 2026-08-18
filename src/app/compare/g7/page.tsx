import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { G7GapExplorer } from "@/components/compare/G7GapExplorer";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { G7_BENCHMARK_METRICS, G7_COUNTRY_LABELS, getBenchmarkYearRange } from "@/content/g7-benchmark";
import { getSourcesByIds } from "@/content/sources";

export const metadata: Metadata = {
  title: "Nigeria vs. G7",
  description:
    "Same-indicator, same-year benchmarks: Nigeria against each G7 country across six sectors.",
};

export default function G7ComparePage() {
  const sourceIds = [...new Set(G7_BENCHMARK_METRICS.map((m) => m.sourceId))];
  const sources = getSourcesByIds(sourceIds);
  const { earliest, latest } = getBenchmarkYearRange();
  const g7List = Object.values(G7_COUNTRY_LABELS).join(", ");

  return (
    <Container className="py-16">
      <Link
        href="/compare"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <IconArrowLeft className="size-4" stroke={1.5} aria-hidden />
        Now vs. 2050
      </Link>

      <PageHeader
        title="Nigeria vs. the G7"
        description={`Apples-to-apples only: each row uses one indicator definition and one reference year (${earliest}–${latest}) for Nigeria and all G7 members (${g7List}). Hover any metric title for the exact dataset and series ID. 2050 figures are projections — not mixed into cross-country baselines.`}
      />

      <div className="mt-12">
        <G7GapExplorer />
      </div>

      <div className="mt-16">
        <SourcePanel sources={sources} title="Benchmark Data Sources" />
      </div>
    </Container>
  );
}
