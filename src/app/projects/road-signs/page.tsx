import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { RoadSignCampaign } from "@/components/projects/RoadSignCampaign";
import { ROAD_SIGN_CORRIDORS } from "@/content/road-signs";

export const metadata: Metadata = {
  title: "Road-sign campaign (mock)",
  description:
    "A schematic campaign to post speed limits, stop signs, school zones, and kilometre markers on corridors between Nigerian capitals.",
};

export default function RoadSignsMockPage() {
  return (
    <>
      <PageHero
        eyebrow="Cool Projects mock"
        title="A road-sign campaign you can drive by"
        description={`Start on ${ROAD_SIGN_CORRIDORS.length} capital-to-capital corridors. One national shape book, speed, stop, yield, school zone, kilometre marker. A campaign schematic for those corridors.`}
        backLink={{ href: "/projects#road-signs", label: "Cool Projects" }}
        actions={
          <LinkButton href="/projects#road-signs" variant="secondary">
            Back to the idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <RoadSignCampaign />
      </Container>
    </>
  );
}
