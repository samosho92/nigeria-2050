import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { SourceLibrary } from "@/components/sources/SourceLibrary";
import { SOURCES } from "@/content/sources";

export const metadata: Metadata = {
  title: "Source Library",
  description: "Every cited source in one place for independent credibility-checking.",
};

export default function SourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Credibility"
        title="Source Library"
        description="Every quantitative claim on Naija2050 traces back here. Filter by sector or era, then click through to verify independently."
      />
      <Container className="py-12 md:py-16">
        <SourceLibrary sources={SOURCES} />
      </Container>
    </>
  );
}
