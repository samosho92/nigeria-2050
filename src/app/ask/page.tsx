import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";

export const metadata: Metadata = {
  title: "Ask the Archive",
  description: "A conversational guide into Naija2050's sourced content.",
};

export default function AskPage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Ask the Archive"
        description="RAG-scoped AI chat grounded in the site's own sourced content — not open-ended speculation."
      />
      <PlaceholderPanel>
        AI chat API and UI ship in MVP Sprint 6. Requires content library to be
        populated first.
      </PlaceholderPanel>
    </Container>
  );
}
