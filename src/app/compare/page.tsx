import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
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
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Nigeria Now vs. Nigeria 2050"
        description="Drag the morph slider to travel through time. Every metric is sourced — optimistic, not naive."
      />
      <div className="mt-12">
        <MorphSlider metrics={COMPARATOR_METRICS} />
      </div>
      <div className="mt-12">
        <SourcePanel sources={sources} title="Comparator Data Sources" />
      </div>
    </Container>
  );
}
