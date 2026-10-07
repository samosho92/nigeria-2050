import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { RoadSignCampaign } from "@/components/projects/RoadSignCampaign";
import { ROAD_SIGN_CORRIDORS, ROAD_SIGNS_PAGE_META } from "@/content/road-signs";
import { PROJECT_MOCK_UI } from "@/content/projects";

export const metadata: Metadata = {
  title: ROAD_SIGNS_PAGE_META.seoTitle,
  description: ROAD_SIGNS_PAGE_META.seoDescription,
};

export default function RoadSignsMockPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_MOCK_UI.eyebrow}
        title={ROAD_SIGNS_PAGE_META.title}
        description={ROAD_SIGNS_PAGE_META.description(ROAD_SIGN_CORRIDORS.length)}
        backLink={{ href: ROAD_SIGNS_PAGE_META.backHref, label: PROJECT_MOCK_UI.backLabel }}
        actions={
          <LinkButton href={ROAD_SIGNS_PAGE_META.backHref} variant="secondary">
            {PROJECT_MOCK_UI.backCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <RoadSignCampaign />
      </Container>
    </>
  );
}
