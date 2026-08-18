import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Editorial Methodology",
  description: "How Naija2050 sources, reviews, and presents content.",
};

export default function MethodologyPage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Editorial Methodology"
        description="Non-partisan, source-transparent, optimistic-not-naive — with explicit uncertainty and subject-matter review."
      />
      <div className="mt-12 space-y-6 text-muted-foreground">
        <p>
          Full methodology page content will be drafted alongside editorial review
          in MVP Sprint 1.
        </p>
      </div>
    </Container>
  );
}
