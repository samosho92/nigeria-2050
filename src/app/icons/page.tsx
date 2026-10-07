import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BackToTop } from "@/components/layout/BackToTop";
import { IconsTimeline } from "@/components/icons/IconsTimeline";
import { ICONS, ICONS_PAGE_META } from "@/content/icons";
import { CONTENT_STATS } from "@/lib/content-stats";
import { getSectorTitles } from "@/lib/content";

export const metadata: Metadata = {
  title: ICONS_PAGE_META.seoTitle,
  description: ICONS_PAGE_META.seoDescription(CONTENT_STATS.iconCount),
};

export default function IconsPage() {
  const portraits = ICONS.filter((figure) => figure.image).length;

  return (
    <>
      <PageHero
        eyebrow={ICONS_PAGE_META.eyebrow}
        title={ICONS_PAGE_META.title}
        description={ICONS_PAGE_META.description(CONTENT_STATS.iconCount)}
        rail={[...ICONS_PAGE_META.rail]}
      />
      <Container className="py-12 md:py-16">
        <p className="mb-8 text-sm text-muted-foreground">
          {ICONS_PAGE_META.inventory(ICONS.length, portraits)}
        </p>
        <IconsTimeline figures={ICONS} sectorTitles={getSectorTitles()} />
      </Container>
      <BackToTop />
    </>
  );
}
