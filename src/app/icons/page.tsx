import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BackToTop } from "@/components/layout/BackToTop";
import { IconsTimeline } from "@/components/icons/IconsTimeline";
import { ICONS } from "@/content/icons";
import { CONTENT_STATS } from "@/lib/content-stats";
import { getSectorTitles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Icons",
  description: `${CONTENT_STATS.iconCount} Nigerians — past and present — whose work shaped the country’s political, economic, and cultural life. Searchable, chronological, and sourced.`,
};

export default function IconsPage() {
  const portraits = ICONS.filter((figure) => figure.image).length;

  return (
    <>
      <PageHero
        eyebrow="People"
        title="Icons of Nigeria"
        description={`A chronological register of ${CONTENT_STATS.iconCount} figures — writers, organisers, builders, athletes, and public servants — whose work is part of the national story. Sitting Nigerian officeholders are not listed while in office. Portraits are Wikimedia Commons headshots with a free license, never AI-generated likenesses or statue stand-ins.`}
        rail={[
          { year: "c.1533", label: "Amina", href: "#queen-amina" },
          { year: "1864", label: "Macaulay", href: "#herbert-macaulay" },
          { year: "1934", label: "Soyinka", href: "#wole-soyinka" },
          { year: "1957", label: "Dangote", href: "#aliko-dangote" },
        ]}
      />
      <Container className="py-12 md:py-16">
        <p className="mb-8 text-sm text-muted-foreground">
          {ICONS.length} people · {portraits} face portraits (free license) · remaining cards use initials
          when no Commons headshot exists. Each achievement links to a named source.
        </p>
        <IconsTimeline figures={ICONS} sectorTitles={getSectorTitles()} />
      </Container>
      <BackToTop />
    </>
  );
}
