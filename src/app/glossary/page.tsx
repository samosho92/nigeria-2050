import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BackToTop } from "@/components/layout/BackToTop";
import { GlossaryList } from "@/components/glossary/GlossaryList";
import { GLOSSARY } from "@/content/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: `${GLOSSARY.length} plain-language definitions for terms used across Naija2050. Searchable.`,
};

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        eyebrow="Reference"
        title="Glossary"
        description={`${GLOSSARY.length} plain-language definitions for terms used on sector pages, the timeline, and Cool Projects.`}
      />
      <Container size="narrow" className="py-12 md:py-16">
        <GlossaryList terms={GLOSSARY} />
      </Container>
      <BackToTop />
    </>
  );
}
