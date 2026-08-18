import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SourceLibrary } from "@/components/sources/SourceLibrary";
import { SOURCES } from "@/content/sources";

export const metadata: Metadata = {
  title: "Source Library",
  description: "Every cited source in one place for independent credibility-checking.",
};

export default function SourcesPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Source Library"
        description="Every quantitative claim on Naija2050 traces back here. Filter by sector or era, then click through to verify independently."
      />
      <SourceLibrary sources={SOURCES} />
    </Container>
  );
}
