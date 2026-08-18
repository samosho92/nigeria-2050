import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";

export const metadata: Metadata = {
  title: "The Nigeria Story",
  description: "An interactive timeline of Nigeria's history from pre-colonial era to the reform era.",
};

export default function TimelinePage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="The Nigeria Story"
        description="A scrollytelling timeline with era-specific art direction — from pre-colonial kingdoms through the reform era that sets up the 2050 case."
      />
      <PlaceholderPanel>
        Interactive timeline spine, era portals, and bidirectional sector links will
        be implemented in MVP Sprint 3–4. See <code>docs/MVP_PLAN.md</code>.
      </PlaceholderPanel>
    </Container>
  );
}
