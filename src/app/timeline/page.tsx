import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TimelineExperience } from "@/components/timeline/TimelineExperience";
import { BackToTop } from "@/components/layout/BackToTop";
import { PageHero } from "@/components/layout/PageHero";
import { TIMELINE_ENTRIES, TIMELINE_PAGE_META } from "@/content/timeline";
import { getSectorTitles } from "@/lib/content";
import { CONTENT_STATS } from "@/lib/content-stats";
import { getAllEraFeaturedIcons } from "@/lib/icons";

export const metadata: Metadata = {
  title: TIMELINE_PAGE_META.seoTitle,
  description: TIMELINE_PAGE_META.seoDescription,
};

export default function TimelinePage() {
  const eraIcons = getAllEraFeaturedIcons();

  return (
    <>
      <PageHero
        eyebrow={TIMELINE_PAGE_META.eyebrow}
        title={TIMELINE_PAGE_META.title}
        description={TIMELINE_PAGE_META.description(CONTENT_STATS.eraCount)}
      />
      <Container className="py-12 md:py-16">
        <TimelineExperience
          entries={TIMELINE_ENTRIES}
          eraIcons={eraIcons}
          sectorTitles={getSectorTitles()}
        />
      </Container>
      <BackToTop />
    </>
  );
}
