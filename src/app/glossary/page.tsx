import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions for terms newcomers won't know.",
};

export default function GlossaryPage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Glossary"
        description="Terms surfaced inline across the site with plain-language definitions."
      />
      <PlaceholderPanel>
        Glossary content and inline surfacing ship in MVP Sprint 5.
      </PlaceholderPanel>
    </Container>
  );
}
