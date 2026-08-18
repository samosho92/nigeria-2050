import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";

export const metadata: Metadata = {
  title: "Source Library",
  description: "Every cited source in one place for independent credibility-checking.",
};

export default function SourcesPage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Source Library"
        description="A single page listing every cited source — World Bank, NBS, McKinsey, PwC, and more."
      />
      <PlaceholderPanel>
        Structured source data will live in <code>src/content/sources/</code>. See MVP
        Sprint 1.
      </PlaceholderPanel>
    </Container>
  );
}
