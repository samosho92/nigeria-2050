import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { TitleRegister } from "@/components/projects/TitleRegister";
import { LAND_TITLES_PAGE_META, TITLE_SEED_IDS, TITLE_STANDARD } from "@/content/land-titles";
import { PROJECT_MOCK_UI } from "@/content/projects";

export const metadata: Metadata = {
  title: LAND_TITLES_PAGE_META.seoTitle,
  description: LAND_TITLES_PAGE_META.seoDescription,
};

export default function LandTitlesMockPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_MOCK_UI.eyebrow}
        title={LAND_TITLES_PAGE_META.title}
        description={LAND_TITLES_PAGE_META.description(
          TITLE_SEED_IDS.length,
          TITLE_STANDARD.name,
        )}
        backLink={{ href: LAND_TITLES_PAGE_META.backHref, label: PROJECT_MOCK_UI.backLabel }}
        actions={
          <LinkButton href={LAND_TITLES_PAGE_META.backHref} variant="secondary">
            {PROJECT_MOCK_UI.backCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <TitleRegister />
      </Container>
    </>
  );
}
