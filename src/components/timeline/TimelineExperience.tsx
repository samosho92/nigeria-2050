"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { AutoGlossary } from "@/components/ui/GlossaryTerm";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { TimelineEntry } from "@/types/content";
import { TIMELINE_ERAS } from "@/content/timeline";
import { FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";

const ERA_STYLES: Record<string, string> = {
  "pre-colonial": "era-pre-colonial",
  colonial: "era-colonial",
  independence: "era-independence",
  conflict: "era-conflict",
  military: "era-military",
  democracy: "era-democracy",
  reform: "era-reform",
};

interface TimelineExperienceProps {
  entries: TimelineEntry[];
}

export function TimelineExperience({ entries }: TimelineExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEra, setActiveEra] = useState<string>(TIMELINE_ERAS[0].id);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (entry.isIntersecting) {
            const era = entry.target.getAttribute("data-era");
            if (era) setActiveEra(era);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    document.querySelectorAll("[data-era-portal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Era scrubber */}
      <nav
        className="sticky top-20 z-40 mb-8 overflow-x-auto rounded-xl border border-border bg-header-background p-2 backdrop-blur-md"
        aria-label="Timeline eras"
      >
        <div className="flex min-w-max gap-1">
          {TIMELINE_ERAS.map((era) => (
            <a
              key={era.id}
              href={`#era-${era.id}`}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-medium transition",
                activeEra === era.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {era.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative flex gap-8">
        {/* Animated spine */}
        <div className="relative hidden w-8 shrink-0 md:block" aria-hidden>
          <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-border" />
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-x-0 top-0 mx-auto w-1 origin-top rounded-full bg-accent"
              style={{ scaleY: spineScale, height: "100%" }}
            />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-16">
          {TIMELINE_ERAS.map((era) => {
            const eraEntries = entries.filter((e) => e.era === era.id);
            if (eraEntries.length === 0) return null;

            return (
              <div key={era.id} id={`era-${era.id}`} data-era-portal data-era={era.id}>
                {/* Era portal hero */}
                <FadeIn>
                  <div
                    className={cn(
                      "relative mb-10 overflow-hidden rounded-2xl border border-border p-8 lg:p-12",
                      ERA_STYLES[era.artDirection],
                    )}
                  >
                    <div className="era-portal-pattern absolute inset-0 opacity-30" aria-hidden />
                    <div className="relative">
                      <p className="text-sm font-medium uppercase tracking-widest text-accent">
                        {era.period}
                      </p>
                      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{era.label}</h2>
                      <p className="mt-3 max-w-2xl text-muted-foreground">{era.description}</p>
                      <p className="mt-4 text-xs text-muted-foreground italic">
                        Abstract illustrated scene — AI-assisted art, settings only (no historical
                        figures depicted)
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* Entries */}
                <div className="space-y-8">
                  {eraEntries.map((entry) => (
                    <TimelineEntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TimelineEntryCard({ entry }: { entry: TimelineEntry }) {
  return (
    <FadeIn>
      <article
        id={entry.id}
        className="scroll-mt-32 rounded-xl border border-border bg-card p-6 lg:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <time className="text-sm font-medium text-accent">{entry.dateRange}</time>
            <h3 className="mt-1 text-xl font-bold">{entry.title}</h3>
          </div>
        </div>
        <p className="mt-2 font-medium text-muted-foreground">{entry.summary}</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
          <AutoGlossary text={entry.content} />
        </p>

        {entry.relatedSectorSlugs.length > 0 && (
          <div className="mt-6 border-t border-border pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Why this matters for 2050
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.relatedSectorSlugs.map((slug) => (
                <TrackedLink
                  key={slug}
                  href={`/sectors/${slug}`}
                  trackFrom="timeline"
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-xs font-medium capitalize transition hover:bg-accent hover:text-accent-foreground"
                >
                  {slug}
                  <IconChevronRight className="size-3" stroke={1.5} aria-hidden />
                </TrackedLink>
              ))}
            </div>
          </div>
        )}
      </article>
    </FadeIn>
  );
}
