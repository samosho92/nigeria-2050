import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { SourceLibrary } from "@/components/sources/SourceLibrary";
import { SOURCES, SOURCES_PAGE_META } from "@/content/sources";

export const metadata: Metadata = {
  title: SOURCES_PAGE_META.seoTitle,
  description: SOURCES_PAGE_META.seoDescription,
};

export default function SourcesPage() {
  return (
    <>
      <PageHero
        eyebrow={SOURCES_PAGE_META.eyebrow}
        title={SOURCES_PAGE_META.title}
        description={SOURCES_PAGE_META.description}
      />
      <Container className="py-12 md:py-16">
        <SourceLibrary sources={SOURCES} />
      </Container>
    </>
  );
}
