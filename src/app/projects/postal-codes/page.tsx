import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { PostalCodeEngine } from "@/components/projects/PostalCodeEngine";
import { POSTAL_CAPITALS, POSTAL_CODES_PAGE_META } from "@/content/postal-code-engine";
import { PROJECT_MOCK_UI } from "@/content/projects";

export const metadata: Metadata = {
  title: POSTAL_CODES_PAGE_META.seoTitle,
  description: POSTAL_CODES_PAGE_META.seoDescription,
};

export default function PostalCodeMockPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_MOCK_UI.eyebrow}
        title={POSTAL_CODES_PAGE_META.title}
        description={POSTAL_CODES_PAGE_META.description(POSTAL_CAPITALS.length)}
        backLink={{ href: POSTAL_CODES_PAGE_META.backHref, label: PROJECT_MOCK_UI.backLabel }}
        actions={
          <LinkButton href={POSTAL_CODES_PAGE_META.backHref} variant="secondary">
            {PROJECT_MOCK_UI.backCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <PostalCodeEngine />
      </Container>
    </>
  );
}
