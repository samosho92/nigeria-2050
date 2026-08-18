"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { IconExternalLink, IconSearch } from "@tabler/icons-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { IconCategoryId, IconFigure } from "@/types/content";
import { ICON_CATEGORIES, groupIconsByDecade } from "@/content/icons";
import { resolveTimelineRef } from "@/lib/timeline-links";
import { FadeIn } from "@/components/motion";
import { IconAvatar } from "@/components/icons/IconAvatar";
import { Badge } from "@/components/ui/Badge";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

interface IconsTimelineProps {
  figures: IconFigure[];
  sectorTitles?: Record<string, string>;
}

function matchesQuery(figure: IconFigure, query: string): boolean {
  if (!query) return true;
  const haystack = [
    figure.name,
    figure.achievement,
    figure.summary,
    figure.birthplace,
    ...figure.categories,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export function IconsTimeline({ figures, sectorTitles }: IconsTimelineProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<IconCategoryId | "all">("all");
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { enabled: dataSaver } = useDataSaver();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const filtered = useMemo(() => {
    return figures.filter((figure) => {
      const categoryOk = category === "all" || figure.categories.includes(category);
      return categoryOk && matchesQuery(figure, query.trim());
    });
  }, [figures, query, category]);

  const decades = useMemo(() => groupIconsByDecade(filtered), [filtered]);

  return (
    <div>
      <div className="sticky top-20 z-40 space-y-3 rounded-xl border border-border bg-header-background p-3 backdrop-blur-md md:p-4">
        <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <IconSearch className="size-4 shrink-0 text-muted-foreground" stroke={1.5} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search names, places, achievements…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search icons"
          />
        </label>
        <div className="flex gap-1 overflow-x-auto pb-1" role="tablist" aria-label="Filter by field">
          <FilterChip
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="All"
          />
          {ICON_CATEGORIES.map((item) => (
            <FilterChip
              key={item.id}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
              label={item.label}
            />
          ))}
        </div>
        <p className="px-1 text-xs text-muted-foreground">
          Showing {filtered.length} of {figures.length}
          {dataSaver ? " · portraits hidden in data-saver mode" : null}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No figures match that search. Try a name, city, or field — “Kano”, “Nobel”, “fintech”.
        </p>
      ) : (
        <div ref={containerRef} className="relative mt-10 flex gap-8">
          <div className="relative hidden w-8 shrink-0 md:block" aria-hidden>
            <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-border" />
            {mounted && !prefersReducedMotion && !dataSaver ? (
              <motion.div
                className="absolute inset-x-0 top-0 mx-auto w-1 origin-top rounded-full bg-accent"
                style={{ scaleY: spineScale, height: "100%" }}
              />
            ) : null}
          </div>

          <ol className="min-w-0 flex-1 space-y-14">
            {decades.map((decade) => (
              <li key={decade.id} id={decade.id} className="scroll-mt-40">
                <FadeIn>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-accent">
                    {decade.label}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {decade.figures.length} {decade.figures.length === 1 ? "figure" : "figures"}
                  </p>
                </FadeIn>
                <div className="mt-6 space-y-6">
                  {decade.figures.map((figure) => (
                    <IconCard
                      key={figure.id}
                      figure={figure}
                      showPortrait={!dataSaver}
                      sectorTitles={sectorTitles}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function IconCard({
  figure,
  showPortrait,
  sectorTitles,
}: {
  figure: IconFigure;
  showPortrait: boolean;
  sectorTitles?: Record<string, string>;
}) {
  const life = figure.died
    ? `${figure.circa ? "c. " : ""}${figure.born}–${figure.died}`
    : `${figure.circa ? "b. c. " : "b. "}${figure.born}`;
  const categoryLabel = ICON_CATEGORIES.filter((item) => figure.categories.includes(item.id))
    .map((item) => item.label)
    .join(" · ");

  return (
    <FadeIn>
      <article
        id={figure.id}
        className="scroll-mt-40 rounded-xl border border-border bg-card p-5 md:p-7"
      >
        <div className="flex gap-4 md:gap-6">
          <Portrait figure={figure} show={showPortrait} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{life}</p>
            <h3 className="mt-1 font-serif text-xl font-bold tracking-tight md:text-2xl">
              {figure.name}
            </h3>
            {figure.birthplace ? (
              <p className="mt-1 text-sm text-muted-foreground">{figure.birthplace}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {figure.categories.map((id) => (
                <Badge key={id} variant="muted">
                  {ICON_CATEGORIES.find((item) => item.id === id)?.label ?? id}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-foreground">{figure.achievement}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{figure.summary}</p>
            <p className="sr-only">{categoryLabel}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link
                href={figure.citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent hover:underline"
              >
                {figure.citation.publisher}, {figure.citation.year}
                <IconExternalLink className="size-3" stroke={1.5} aria-hidden />
              </Link>
              <Link href={`/sources#icon-${figure.id}`} className="text-muted-foreground hover:text-foreground">
                Source library
              </Link>
            </div>
            {(figure.relatedSectorSlugs.length > 0 || figure.relatedTimelineIds?.length) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {figure.relatedSectorSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/sectors/${slug}`}
                    className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground"
                  >
                    {sectorTitles?.[slug] ?? slug}
                  </Link>
                ))}
                {figure.relatedTimelineIds?.map((id) => {
                  const ref = resolveTimelineRef(id);
                  return (
                    <Link
                      key={id}
                      href={ref.href}
                      className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground"
                    >
                      {ref.label}
                    </Link>
                  );
                })}
              </div>
            )}
            {figure.image && showPortrait ? (
              <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted-foreground">
                Portrait: {figure.image.credit} · {figure.image.license}.{" "}
                <Link
                  href={figure.image.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Wikimedia file
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

function Portrait({ figure, show }: { figure: IconFigure; show: boolean }) {
  return (
    <IconAvatar
      figure={figure}
      size="lg"
      showPhoto={show}
      alt={figure.image?.alt}
      className="ring-2 ring-border"
    />
  );
}
