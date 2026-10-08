import Link from "next/link";
import { IconArrowRight, IconBulb } from "@tabler/icons-react";
import { FadeIn } from "@/components/motion";
import { SECTOR_DETAIL_UI } from "@/content/sectors";
import type { CoolProject } from "@/types/content";

interface SectorRelatedIdeasProps {
  projects: CoolProject[];
}

export function SectorRelatedIdeas({ projects }: SectorRelatedIdeasProps) {
  const ui = SECTOR_DETAIL_UI;
  if (projects.length === 0) return null;

  return (
    <FadeIn>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <IconBulb className="size-6 text-accent" stroke={1.5} aria-hidden />
            {ui.relatedIdeasTitle}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{ui.relatedIdeasLead}</p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:underline"
        >
          {ui.relatedIdeasCta}
          <IconArrowRight className="size-3.5" stroke={1.5} aria-hidden />
        </Link>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={project.mockHref ?? `/projects#${project.id}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition hover:border-accent hover:bg-surface-elevated"
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
                {ui.relatedIdeasEyebrow}
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold tracking-tight group-hover:text-accent">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                {ui.relatedIdeasOpen}
                <IconArrowRight
                  className="size-3.5 transition group-hover:translate-x-0.5"
                  stroke={1.5}
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}
