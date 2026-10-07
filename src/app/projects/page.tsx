import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProjectsBoard } from "@/components/projects/ProjectsBoard";
import { COOL_PROJECTS, PROJECTS_PAGE_META } from "@/content/projects";
import { getSectorTitles } from "@/lib/content";
import { CONTENT_STATS } from "@/lib/content-stats";

export const metadata: Metadata = {
  title: PROJECTS_PAGE_META.seoTitle,
  description: PROJECTS_PAGE_META.seoDescription(CONTENT_STATS.projectCount),
};

export default function ProjectsPage() {
  const sectorTitles = getSectorTitles();

  return (
    <>
      <PageHero
        eyebrow={PROJECTS_PAGE_META.eyebrow}
        title={PROJECTS_PAGE_META.title}
        description={PROJECTS_PAGE_META.description}
        actions={
          <LinkButton href="#submit-idea" variant="secondary">
            {PROJECTS_PAGE_META.submitCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <ProjectsBoard editorial={COOL_PROJECTS} sectorTitles={sectorTitles} />
      </Container>
    </>
  );
}
