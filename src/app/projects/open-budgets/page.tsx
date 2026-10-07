import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { OpenBudgetBoard } from "@/components/projects/OpenBudgetBoard";
import {
  BUDGET_JURISDICTIONS,
  BUDGET_STANDARD,
  OPEN_BUDGETS_PAGE_META,
} from "@/content/open-budgets";
import { PROJECT_MOCK_UI } from "@/content/projects";
import { formatNaira } from "@/lib/format";

export const metadata: Metadata = {
  title: OPEN_BUDGETS_PAGE_META.seoTitle,
  description: OPEN_BUDGETS_PAGE_META.seoDescription,
};

export default function OpenBudgetsMockPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_MOCK_UI.eyebrow}
        title={OPEN_BUDGETS_PAGE_META.title}
        description={OPEN_BUDGETS_PAGE_META.description(
          BUDGET_JURISDICTIONS.length,
          BUDGET_STANDARD.name,
          formatNaira(BUDGET_STANDARD.envelopeNaira.total),
        )}
        backLink={{ href: OPEN_BUDGETS_PAGE_META.backHref, label: PROJECT_MOCK_UI.backLabel }}
        actions={
          <LinkButton href={OPEN_BUDGETS_PAGE_META.backHref} variant="secondary">
            {PROJECT_MOCK_UI.backCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <OpenBudgetBoard />
      </Container>
    </>
  );
}
