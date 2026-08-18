"use client";

import { useCallback, useId, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { MetricStrip } from "@/components/ui/MetricChips";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { SectorProjection } from "@/types/content";

interface MilestoneTimelineProps {
  projections: SectorProjection[];
}

function MilestoneRail({
  projections,
  activeIndex,
  onSelect,
  groupId,
}: {
  projections: SectorProjection[];
  activeIndex: number;
  onSelect: (index: number) => void;
  groupId: string;
}) {
  const progress =
    projections.length > 1 ? (activeIndex / (projections.length - 1)) * 100 : 100;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSelect(Math.min(activeIndex + 1, projections.length - 1));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSelect(Math.max(activeIndex - 1, 0));
    }
    if (event.key === "Home") {
      event.preventDefault();
      onSelect(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      onSelect(projections.length - 1);
    }
  };

  return (
    <div className="relative mb-10 md:mb-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-[1.125rem] h-0.5 bg-border md:top-5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 top-[1.125rem] h-0.5 bg-accent transition-[width] duration-300 ease-out md:top-5"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <div
        role="tablist"
        aria-label="Select a projection year"
        className="relative flex justify-between gap-2"
        onKeyDown={handleKeyDown}
      >
        {projections.map((projection, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={projection.year}
              type="button"
              role="tab"
              id={`${groupId}-tab-${projection.year}`}
              aria-selected={isActive}
              aria-controls={`${groupId}-panel-${projection.year}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(index)}
              className={cn(
                "group flex flex-1 flex-col items-center gap-2 rounded-lg px-2 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive ? "text-accent" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "size-4 rounded-full border-2 transition-all duration-200 md:size-[1.125rem]",
                  isActive
                    ? "scale-125 border-accent bg-accent shadow-sm"
                    : "border-border bg-background group-hover:border-accent/50",
                )}
                aria-hidden
              />
              <span
                className={cn(
                  "text-xs font-bold tabular-nums md:text-sm",
                  isActive && "text-accent",
                )}
              >
                {projection.year}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MilestoneDetail({
  projection,
  groupId,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: {
  projection: SectorProjection;
  groupId: string;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}) {
  return (
    <article
      role="tabpanel"
      id={`${groupId}-panel-${projection.year}`}
      aria-labelledby={`${groupId}-tab-${projection.year}`}
      className="milestone-panel-enter relative border-t-2 border-accent pt-8 md:pt-10"
    >
      <p
        className="pointer-events-none absolute top-2 right-0 select-none text-7xl font-bold tabular-nums text-accent/10 md:text-8xl"
        aria-hidden
      >
        {projection.year}
      </p>

      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {projection.year} scenario
          </p>
          <h3 className="mt-2 text-2xl font-bold text-balance md:text-3xl">
            {projection.headline}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8">
            {projection.narrative}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 self-start md:flex-col md:gap-2">
          <button
            type="button"
            onClick={onPrevious}
            disabled={!hasPrevious}
            aria-label="Previous milestone"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <IconChevronLeft className="size-4" stroke={1.5} aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next milestone"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <IconChevronRight className="size-4" stroke={1.5} aria-hidden />
          </button>
        </div>
      </div>

      <MetricStrip metrics={projection.metrics} className="mt-8" />
    </article>
  );
}

export function MilestoneTimeline({ projections }: MilestoneTimelineProps) {
  const groupId = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projections[activeIndex];

  const selectMilestone = useCallback(
    (index: number) => {
      setActiveIndex(index);
      trackEvent({ name: "milestone_select", year: projections[index].year });
    },
    [projections],
  );

  if (!active) return null;

  return (
    <div>
      <MilestoneRail
        projections={projections}
        activeIndex={activeIndex}
        onSelect={selectMilestone}
        groupId={groupId}
      />
      <MilestoneDetail
        key={active.year}
        projection={active}
        groupId={groupId}
        hasPrevious={activeIndex > 0}
        hasNext={activeIndex < projections.length - 1}
        onPrevious={() => selectMilestone(activeIndex - 1)}
        onNext={() => selectMilestone(activeIndex + 1)}
      />
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Use arrow keys to move between milestones. Metric chips are scenario values, not sourced
        2030/2040/2050 datasets.
      </p>
    </div>
  );
}
