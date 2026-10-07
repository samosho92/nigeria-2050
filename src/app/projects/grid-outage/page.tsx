import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { GridOutageBoard } from "@/components/projects/GridOutageBoard";
import { DISCO_CLUSTERS, GRID_PAGE_META, GRID_STANDARD } from "@/content/grid-outage";
import { PROJECT_MOCK_UI } from "@/content/projects";

export const metadata: Metadata = {
  title: GRID_PAGE_META.seoTitle,
  description: GRID_PAGE_META.seoDescription,
};

export default function GridOutageMockPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_MOCK_UI.eyebrow}
        title={GRID_PAGE_META.title}
        description={GRID_PAGE_META.description(
          DISCO_CLUSTERS.length,
          GRID_STANDARD.name,
          GRID_STANDARD.snapshotLabel,
        )}
        backLink={{ href: GRID_PAGE_META.backHref, label: PROJECT_MOCK_UI.backLabel }}
        actions={
          <LinkButton href={GRID_PAGE_META.backHref} variant="secondary">
            {PROJECT_MOCK_UI.backCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <GridOutageBoard />
      </Container>
    </>
  );
}
