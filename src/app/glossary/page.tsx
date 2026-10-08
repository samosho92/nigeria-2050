import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { GlossaryList } from "@/components/glossary/GlossaryList";
import { GLOSSARY, GLOSSARY_PAGE_META } from "@/content/glossary";

export const metadata: Metadata = {
  title: GLOSSARY_PAGE_META.seoTitle,
  description: GLOSSARY_PAGE_META.seoDescription(GLOSSARY.length),
};

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        eyebrow={GLOSSARY_PAGE_META.eyebrow}
        title={GLOSSARY_PAGE_META.title}
        description={GLOSSARY_PAGE_META.description(GLOSSARY.length)}
      />
      <Container size="narrow" className="py-12 md:py-16">
        <GlossaryList terms={GLOSSARY} />
      </Container>
    </>
  );
}
