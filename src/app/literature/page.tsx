import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LiteratureBoard } from "@/components/literature/LiteratureBoard";
import { Container } from "@/components/ui/Container";
import { getLiteratureHeroRail, LITERATURE_PAGE_META } from "@/content/literature";

export const metadata: Metadata = {
  title: LITERATURE_PAGE_META.seoTitle,
  description: LITERATURE_PAGE_META.seoDescription,
};

export default function LiteraturePage() {
  return (
    <>
      <PageHero
        eyebrow={LITERATURE_PAGE_META.eyebrow}
        title={LITERATURE_PAGE_META.title}
        description={LITERATURE_PAGE_META.description}
        rail={getLiteratureHeroRail()}
      />
      <Container className="py-12 md:py-16">
        <LiteratureBoard />
      </Container>
    </>
  );
}
