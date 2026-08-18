import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProjectsBoard } from "@/components/projects/ProjectsBoard";
import { COOL_PROJECTS } from "@/content/projects";
import { getSectorTitles } from "@/lib/content";
import { CONTENT_STATS } from "@/lib/content-stats";

export const metadata: Metadata = {
  title: "Cool Projects",
  description: `Civic ideas that would make Nigeria work better by 2050. Vote, filter by sector, and submit your own. ${CONTENT_STATS.projectCount} starter proposals.`,
};

export default function ProjectsPage() {
  const sectorTitles = getSectorTitles();

  return (
    <>
      <PageHero
        eyebrow="Civic bets"
        title="Cool Projects"
        description="Concrete initiatives (postal codes, road signs, libraries, clinics) that would make daily life work better by 2050. Vote them up or down. Add yours. Each card names the sectors it would move most."
        actions={
          <LinkButton href="#submit-idea" variant="secondary">
            Submit an idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <ProjectsBoard editorial={COOL_PROJECTS} sectorTitles={sectorTitles} />
      </Container>
    </>
  );
}
