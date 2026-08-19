import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { GLOSSARY } from "@/content/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions for terms used across Naija2050.",
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
        <dl className="space-y-6">
          {GLOSSARY.map((term) => (
            <div
              key={term.term}
              id={term.term}
              className="scroll-mt-24 rounded-xl border border-border bg-card p-6"
            >
              <dt className="text-lg font-bold text-accent">{term.term}</dt>
              <dd className="mt-2 text-muted-foreground">{term.definition}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
