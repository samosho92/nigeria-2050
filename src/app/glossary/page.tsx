import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { GLOSSARY } from "@/content/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions for terms newcomers won't know.",
};

export default function GlossaryPage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Glossary"
        description="Plain-language definitions for terms used across sector pages and the timeline. Built for the curious newcomer."
      />
      <dl className="mt-12 space-y-6">
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
  );
}
