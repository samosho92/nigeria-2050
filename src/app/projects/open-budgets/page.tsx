import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { OpenBudgetBoard } from "@/components/projects/OpenBudgetBoard";
import { BUDGET_JURISDICTIONS, BUDGET_STANDARD } from "@/content/open-budgets";
import { formatNaira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Open budgets and contracts (mock)",
  description:
    "A schematic portal for the 2026 Appropriation Act envelope and sample awards: who won, for what, at what price, the week they were signed.",
};

export default function OpenBudgetsMockPage() {
  return (
    <>
      <PageHero
        eyebrow="Cool Projects mock"
        title="Budgets and contracts in public, in time"
        description={`${BUDGET_JURISDICTIONS.length} seed jurisdictions. ${BUDGET_STANDARD.name}: ${formatNaira(BUDGET_STANDARD.envelopeNaira.total)} federal envelope, MDA tables, award rows a journalist in Jos can open. A schematic portal of sample contracts.`}
        backLink={{ href: "/projects#open-budgets", label: "Cool Projects" }}
        actions={
          <LinkButton href="/projects#open-budgets" variant="secondary">
            Back to the idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <OpenBudgetBoard />
      </Container>
    </>
  );
}
