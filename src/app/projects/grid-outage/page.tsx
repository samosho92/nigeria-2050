import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { GridOutageBoard } from "@/components/projects/GridOutageBoard";
import { DISCO_CLUSTERS, GRID_STANDARD } from "@/content/grid-outage";

export const metadata: Metadata = {
  title: "Grid outage map (mock)",
  description:
    "A schematic national hour: generated MW versus demand, fuel mix, plants, and DisCo feeders with restoration windows.",
};

export default function GridOutageMockPage() {
  return (
    <>
      <PageHero
        eyebrow="Cool Projects mock"
        title="A grid that tells you when the light is coming"
        description={`${DISCO_CLUSTERS.length} DisCo seeds. ${GRID_STANDARD.name}: publish the hour, name the feeder, give a restoration window. ${GRID_STANDARD.snapshotLabel}. A frozen schematic hour with named feeders.`}
        backLink={{ href: "/projects#grid-outage-map", label: "Cool Projects" }}
        actions={
          <LinkButton href="/projects#grid-outage-map" variant="secondary">
            Back to the idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <GridOutageBoard />
      </Container>
    </>
  );
}
