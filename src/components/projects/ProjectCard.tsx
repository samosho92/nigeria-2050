"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProjectIcon } from "@/components/projects/ProjectIcon";
import { ProjectVoteControls } from "@/components/projects/ProjectVoteControls";
import type { ProjectTally, ProjectVote } from "@/lib/projects";
import type { CoolProject } from "@/types/content";

interface ProjectCardProps {
  project: CoolProject;
  sectorTitles: Record<string, string>;
  tally: ProjectTally | undefined;
  myVote: ProjectVote | undefined;
  onVote: (vote: ProjectVote) => void;
  disabled?: boolean;
}

export function ProjectCard({
  project,
  sectorTitles,
  tally,
  myVote,
  onVote,
  disabled,
}: ProjectCardProps) {
  const [primary, ...rest] = project.sectorSlugs;

  return (
    <Card id={project.id} className="scroll-mt-32 p-5 md:p-6">
      <div className="flex gap-4">
        <ProjectVoteControls tally={tally} myVote={myVote} onVote={onVote} disabled={disabled} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <ProjectIcon projectId={project.id} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-xl font-bold tracking-tight md:text-2xl">
                  {project.title}
                </h2>
                {project.source === "community" ? (
                  <Badge variant="muted">Reader idea</Badge>
                ) : null}
              </div>
              <p className="mt-2 text-foreground">{project.summary}</p>
            </div>
          </div>
          {primary ? (
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Moves most:{" "}
              <Link href={`/sectors/${primary}`} className="text-accent hover:underline">
                {sectorTitles[primary] ?? primary}
              </Link>
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {rest.map((slug) => (
              <Link key={slug} href={`/sectors/${slug}`}>
                <Badge variant="muted" className="normal-case tracking-normal">
                  {sectorTitles[slug] ?? slug}
                </Badge>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Seen in: {project.inspiredBy}
          </p>
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-medium text-accent">
              How it would work
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.detail}</p>
          </details>
          {project.mockHref ? (
            <LinkButton href={project.mockHref} variant="secondary" className="mt-4 gap-1.5 px-4 py-2 text-xs">
              Open the mock
              <IconArrowRight className="size-3.5" stroke={1.5} aria-hidden />
            </LinkButton>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
