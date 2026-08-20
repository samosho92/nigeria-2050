"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconExternalLink } from "@tabler/icons-react";
import type { ComparatorMetric } from "@/types/content";
import { MorphSlider } from "@/components/compare/MorphSlider";
import { COMPARATOR_LEVER_META, COMPARATOR_LEVERS, getLeversForMetric } from "@/content/comparator-levers";
import { getCoolProjectById } from "@/content/projects";
import { SCENARIO_UI_NOTE } from "@/content/methodology";
import {
  buildTrajectory,
  computeScenario2050,
  leverDeltaForMetric,
  selectedLeversAffectingMetric,
} from "@/lib/comparator-levers";
import { formatComparatorValue } from "@/lib/comparator-format";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface Compare2050ExplorerProps {
  metrics: ComparatorMetric[];
}

const TRAJECTORY_YEARS = [2024, 2030, 2040, 2050] as const;

function TrajectoryChart({
  metric,
  baseline2050,
  adjusted2050,
}: {
  metric: ComparatorMetric;
  baseline2050: number;
  adjusted2050: number;
}) {
  const baselinePoints = buildTrajectory(metric, baseline2050);
  const adjustedPoints = buildTrajectory(metric, adjusted2050);
  const hasDelta = Math.abs(adjusted2050 - baseline2050) > 0.001;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">Trajectory to 2050</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Grey bars show the base scenario path. Green bars add your selected projects.{" "}
        {SCENARIO_UI_NOTE}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {TRAJECTORY_YEARS.map((year) => {
          const baseline = baselinePoints.find((point) => point.year === year)!;
          const adjusted = adjustedPoints.find((point) => point.year === year)!;
          const improved = metric.higherIsBetter !== false
            ? adjusted.value > baseline.value + 0.001
            : adjusted.value < baseline.value - 0.001;

          return (
            <div key={year} className="flex flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end justify-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 rounded-t bg-muted-foreground/35 transition-all duration-300"
                    style={{
                      height: `${Math.max(24, (baseline.value / Math.max(baseline.value, adjusted.value)) * 96)}px`,
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground">Base</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-6 rounded-t transition-all duration-300",
                      improved ? "bg-accent" : "bg-accent/40",
                    )}
                    style={{
                      height: `${Math.max(24, (adjusted.value / Math.max(baseline.value, adjusted.value)) * 96)}px`,
                    }}
                  />
                  <span className="text-[10px] text-accent">Your pick</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-foreground">{year}</p>
              <p className="text-center text-[10px] leading-tight text-muted-foreground">
                {formatComparatorValue(baseline.value, metric.unit)}
              </p>
              {hasDelta && (
                <p className="text-center text-[10px] font-medium leading-tight text-accent">
                  {formatComparatorValue(adjusted.value, metric.unit)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LeverCard({
  title,
  summary,
  href,
  checked,
  relevant,
  impactLabel,
  onToggle,
}: {
  title: string;
  summary: string;
  href?: string;
  checked: boolean;
  relevant: boolean;
  impactLabel?: string;
  onToggle: (checked: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition",
        checked ? "border-accent bg-accent/5" : "border-border bg-card",
        !relevant && !checked && "opacity-70",
      )}
    >
      <label className="flex cursor-pointer gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onToggle(event.target.checked)}
          className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium text-foreground">{title}</span>
            {impactLabel ? (
              <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                {impactLabel}
              </span>
            ) : null}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{summary}</span>
        </span>
      </label>
      {href ? (
        <div className="mt-3 pl-7">
          <Link
            href={href}
            className="inline-flex items-center gap-0.5 text-xs font-medium text-accent hover:underline"
          >
            View on Cool Projects
            <IconExternalLink className="size-3" stroke={1.5} aria-hidden />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function Compare2050Explorer({ metrics }: Compare2050ExplorerProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);

  const metric = metrics[activeMetricIndex];
  const baseline2050 = metric.projected2050;
  const adjusted2050 = useMemo(
    () => computeScenario2050(metric, selected, COMPARATOR_LEVERS),
    [metric, selected],
  );

  const relevantLevers = getLeversForMetric(metric.id);
  const otherLevers = COMPARATOR_LEVERS.filter(
    (lever) => !relevantLevers.some((item) => item.id === lever.id),
  );

  const activeSelections = selectedLeversAffectingMetric(metric.id, selected, COMPARATOR_LEVERS);
  const inactiveSelections = selected.filter(
    (id) => !activeSelections.some((lever) => lever.id === id),
  );

  const toggleLever = (leverId: string, enabled: boolean) => {
    setSelected((current) => {
      if (enabled) {
        if (current.includes(leverId)) return current;
        return [...current, leverId];
      }
      return current.filter((id) => id !== leverId);
    });
    trackEvent({ name: "compare_lever_toggle", leverId, enabled });
  };

  const delta = adjusted2050 - baseline2050;
  const hasDelta = Math.abs(delta) > 0.01;
  const higher = metric.higherIsBetter !== false;

  const impactLabelFor = (leverId: string) => {
    const lever = COMPARATOR_LEVERS.find((item) => item.id === leverId);
    if (!lever) return undefined;
    const deltaValue = leverDeltaForMetric(metric, lever);
    if (Math.abs(deltaValue) < 0.01) return undefined;
    const sign = higher ? (deltaValue > 0 ? "+" : "") : deltaValue < 0 ? "−" : "+";
    return `${sign}${formatComparatorValue(Math.abs(deltaValue), metric.unit)}`;
  };

  return (
    <div className="space-y-10">
      <section aria-labelledby="compare-levers-heading" className="space-y-6">
        <div>
          <h2 id="compare-levers-heading" className="text-lg font-bold text-foreground">
            {COMPARATOR_LEVER_META.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {COMPARATOR_LEVER_META.description}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {metric.label} · 2050 preview
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Base scenario</p>
              <p className="text-2xl font-bold text-foreground">
                {formatComparatorValue(baseline2050, metric.unit)}
              </p>
            </div>
            <div className="pb-1 text-xl text-muted-foreground" aria-hidden>
              →
            </div>
            <div>
              <p className="text-xs text-accent">With your picks</p>
              <p className="text-2xl font-bold text-accent">
                {formatComparatorValue(adjusted2050, metric.unit)}
              </p>
            </div>
          </div>
          {selected.length === 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              Select one or more projects below to see the 2050 number move.
            </p>
          )}
          {selected.length > 0 && !hasDelta && (
            <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
              Your current selections do not move {metric.label}. Try the projects listed below for
              this metric, or switch to another metric tab.
            </p>
          )}
          {hasDelta && (
            <p className="mt-3 text-sm text-foreground">
              {activeSelections.length} project{activeSelections.length === 1 ? "" : "s"} shift this
              metric{" "}
              {higher
                ? `${formatComparatorValue(delta, metric.unit)} above`
                : `${formatComparatorValue(Math.abs(delta), metric.unit)} below`}{" "}
              the base scenario.
            </p>
          )}
          {inactiveSelections.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {inactiveSelections.length} selected project
              {inactiveSelections.length === 1 ? "" : "s"} affect other metrics only.
            </p>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Moves the needle on {metric.label}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {relevantLevers.map((lever) => {
              const project = lever.projectId ? getCoolProjectById(lever.projectId) : undefined;
              const href = project?.mockHref ?? (project ? `/projects#${project.id}` : undefined);
              return (
                <LeverCard
                  key={lever.id}
                  title={lever.title}
                  summary={lever.summary}
                  href={href}
                  checked={selected.includes(lever.id)}
                  relevant
                  impactLabel={impactLabelFor(lever.id)}
                  onToggle={(enabled) => toggleLever(lever.id, enabled)}
                />
              );
            })}
          </div>
        </div>

        {otherLevers.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-accent hover:underline">
              Other projects and policies ({otherLevers.length})
            </summary>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {otherLevers.map((lever) => {
                const project = lever.projectId ? getCoolProjectById(lever.projectId) : undefined;
                const href = project?.mockHref ?? (project ? `/projects#${project.id}` : undefined);
                return (
                  <LeverCard
                    key={lever.id}
                    title={lever.title}
                    summary={lever.summary}
                    href={href}
                    checked={selected.includes(lever.id)}
                    relevant={false}
                    impactLabel={impactLabelFor(lever.id)}
                    onToggle={(enabled) => toggleLever(lever.id, enabled)}
                  />
                );
              })}
            </div>
          </details>
        )}

        <p className="text-center text-xs text-muted-foreground">
          <Link href="/projects" className="font-medium text-accent hover:underline">
            Browse all Cool Projects
          </Link>
        </p>
      </section>

      <MorphSlider
        key={`${metric.id}-${selected.join(",")}`}
        metrics={metrics}
        activeMetricIndex={activeMetricIndex}
        onActiveMetricChange={setActiveMetricIndex}
        scenario2050={adjusted2050}
        baseline2050={baseline2050}
        selectedLeverCount={selected.length}
      />

      <TrajectoryChart
        metric={metric}
        baseline2050={baseline2050}
        adjusted2050={adjusted2050}
      />
    </div>
  );
}
