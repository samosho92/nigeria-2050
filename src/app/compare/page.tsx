import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";

export const metadata: Metadata = {
  title: "Now vs. 2050",
  description: "Compare Nigeria's current baseline with modeled 2050 projections.",
};

export default function ComparePage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Nigeria Now vs. Nigeria 2050"
        description="Side-by-side comparator across GDP per capita, literacy, power capacity, security indices, and more — with the signature morph slider."
      />
      <PlaceholderPanel>
        Morph slider and animated stat reveals ship in MVP Sprint 4. See{" "}
        <code>docs/MVP_PLAN.md</code>.
      </PlaceholderPanel>
    </Container>
  );
}
