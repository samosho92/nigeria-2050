"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconArrowRight, IconInfoCircle, IconTrendingDown } from "@tabler/icons-react";
import {
  G7_BENCHMARK_METRICS,
  G7_COUNTRY_CODES,
  G7_COUNTRY_LABELS,
  formatBenchmarkValue,
  formatGapLabel,
  g7GapMultiplier,
  getBenchmarkYearRange,
  getG7Average,
  getG7Leader,
  getG7SectorSlugs,
} from "@/content/g7-benchmark";
import { SECTORS } from "@/content/sectors";
import type { G7BenchmarkMetric } from "@/types/content";
import { SourceTooltip } from "@/components/ui/SourceTooltip";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SECTOR_LABELS: Record<string, string> = Object.fromEntries(
  SECTORS.map((s) => [s.slug, s.title]),
);

function performanceScore(metric: G7BenchmarkMetric, value: number): number {
  const leader = getG7Leader(metric);
  const benchmark = metric.higherIsBetter ? leader.value : leader.value;
  if (benchmark <= 0 && value <= 0) return 0;
  if (metric.higherIsBetter) {
    if (benchmark <= 0) return 0;
    return Math.min(100, (value / benchmark) * 100);
  }
  if (value <= 0) return 100;
  return Math.min(100, (benchmark / value) * 100);
}

interface CountryRow {
  id: string;
  label: string;
  value: number;
  isNigeria: boolean;
}

function buildCountryRows(metric: G7BenchmarkMetric): CountryRow[] {
  const rows: CountryRow[] = [
    { id: "NG", label: "Nigeria", value: metric.nigeria, isNigeria: true },
    ...G7_COUNTRY_CODES.map((code) => ({
      id: code,
      label: G7_COUNTRY_LABELS[code],
      value: metric.g7Countries[code],
      isNigeria: false,
    })),
  ];

  return rows.sort((a, b) =>
    metric.higherIsBetter ? b.value - a.value : a.value - b.value,
  );
}

function G7CountryBreakdown({ metric }: { metric: G7BenchmarkMetric }) {
  const rows = buildCountryRows(metric);
  const leader = getG7Leader(metric);

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 border-b border-border bg-muted/50 px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Country</span>
        <span className="text-right">Value ({metric.referenceYear})</span>
        <span className="sr-only">Bar</span>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((row) => {
          const score = performanceScore(metric, row.value);
          const isLeader =
            !row.isNigeria && row.id === leader.code && row.value === leader.value;

          return (
            <li
              key={row.id}
              className={cn(
                "grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-4 py-2.5 text-sm",
                row.isNigeria && "bg-foreground/[0.03]",
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  row.isNigeria ? "text-foreground" : "text-muted-foreground",
                  isLeader && "text-accent",
                )}
              >
                {row.label}
                {row.isNigeria && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    (baseline)
                  </span>
                )}
                {isLeader && (
                  <span className="ml-2 text-xs font-normal text-accent">G7 best</span>
                )}
              </span>
              <span className="tabular-nums text-right font-semibold">
                {formatBenchmarkValue(row.value, metric.unit)}
              </span>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    row.isNigeria ? "bg-foreground/60" : "bg-accent/80",
                  )}
                  style={{ width: `${Math.max(score, row.value > 0 ? 3 : 0)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GapBar({ metric }: { metric: G7BenchmarkMetric }) {
  const g7Average = getG7Average(metric);
  const multiplier = g7GapMultiplier(metric);
  const nigeriaScore = performanceScore(metric, metric.nigeria);
  const g7Score = performanceScore(metric, g7Average);
  const futureScore =
    metric.nigeria2050 !== undefined ? performanceScore(metric, metric.nigeria2050) : null;
  const isGlaring = multiplier >= 5;

  return (
    <article
      className={cn(
        "rounded-xl border p-5 md:p-6",
        isGlaring ? "border-accent/40 bg-accent/5" : "border-border bg-card",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <SourceTooltip
            sourceId={metric.sourceId}
            sourceSeries={metric.sourceSeries}
            referenceYear={metric.referenceYear}
            definition={metric.definition}
          >
            <h3 className="inline-flex cursor-help items-center gap-1.5 font-semibold text-foreground">
              {metric.label}
              <IconInfoCircle
                className="size-4 shrink-0 text-muted-foreground"
                stroke={1.5}
                aria-hidden
              />
              <span className="ml-1 rounded-md bg-muted px-1.5 py-0.5 text-xs font-normal tabular-nums text-muted-foreground">
                {metric.referenceYear}
              </span>
            </h3>
          </SourceTooltip>
          <p className="mt-1 text-xs text-muted-foreground">{metric.definition}</p>
          {metric.context && (
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{metric.context}</p>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-bold tabular-nums",
            isGlaring ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {metric.higherIsBetter ? "G7 avg leads" : "Nigeria worse"} by{" "}
          {formatGapLabel(multiplier)}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-foreground">
              Nigeria · {metric.referenceYear}
            </span>
            <span className="tabular-nums text-muted-foreground">
              {formatBenchmarkValue(metric.nigeria, metric.unit)}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground/70 transition-all duration-500"
              style={{ width: `${Math.max(nigeriaScore, metric.nigeria > 0 ? 2 : 0)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-accent">
              G7 average · {metric.referenceYear}
            </span>
            <span className="tabular-nums text-accent">
              {formatBenchmarkValue(g7Average, metric.unit)}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${g7Score}%` }}
            />
          </div>
        </div>

        {futureScore !== null && metric.nigeria2050 !== undefined && (
          <div>
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">
                Nigeria 2050 projection (not comparable year)
              </span>
              <span className="tabular-nums text-muted-foreground">
                {formatBenchmarkValue(metric.nigeria2050, metric.unit)}
                {metric.higherIsBetter && metric.nigeria2050 < g7Average && (
                  <span className="ml-1 text-accent">
                    — still {formatGapLabel(g7Average / metric.nigeria2050)} behind G7{" "}
                    {metric.referenceYear} avg
                  </span>
                )}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full border border-dashed border-accent bg-accent/25 transition-all duration-500"
                style={{ width: `${futureScore}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <G7CountryBreakdown metric={metric} />
    </article>
  );
}

export function G7GapExplorer() {
  const sectorSlugs = getG7SectorSlugs();
  const [activeSector, setActiveSector] = useState(sectorSlugs[0]);
  const yearRange = getBenchmarkYearRange();

  const sortedByGap = useMemo(
    () => [...G7_BENCHMARK_METRICS].sort((a, b) => g7GapMultiplier(b) - g7GapMultiplier(a)),
    [],
  );

  const topGaps = sortedByGap.slice(0, 3);
  const sectorMetrics = G7_BENCHMARK_METRICS.filter((m) => m.sectorSlug === activeSector).sort(
    (a, b) => g7GapMultiplier(b) - g7GapMultiplier(a),
  );

  const avgGap =
    G7_BENCHMARK_METRICS.reduce((sum, m) => sum + g7GapMultiplier(m), 0) /
    G7_BENCHMARK_METRICS.length;

  return (
    <div className="space-y-12">
      <div className="rounded-2xl border border-accent/30 bg-surface p-6 md:p-10">
        <div className="flex flex-wrap items-start gap-6 md:gap-10">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-accent/15">
            <IconTrendingDown className="size-8 text-accent" stroke={1.5} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              The distance to close
            </p>
            <p className="mt-2 text-3xl font-bold tabular-nums md:text-4xl">
              {formatGapLabel(avgGap)}{" "}
              <span className="text-lg font-normal text-muted-foreground md:text-xl">
                average gap vs G7
              </span>
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {G7_BENCHMARK_METRICS.length} indicators — each uses the{" "}
              <strong className="text-foreground">same definition and reference year</strong> for
              Nigeria and all seven G7 members ({yearRange.earliest}–{yearRange.latest} depending
              on dataset). Hover the{" "}
              <IconInfoCircle className="inline size-3.5 align-text-bottom" stroke={1.5} /> icon
              on any metric for the exact source series.
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-bold md:text-xl">Widest gaps today</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Same-indicator, same-year comparisons only — sorted by distance from G7 average.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {topGaps.map((metric, i) => {
            const g7Average = getG7Average(metric);
            return (
              <SourceTooltip
                key={metric.id}
                sourceId={metric.sourceId}
                sourceSeries={metric.sourceSeries}
                referenceYear={metric.referenceYear}
                definition={metric.definition}
                className="block w-full"
              >
                <div className="cursor-help rounded-xl border border-accent bg-accent p-5 text-accent-foreground">
                  <span className="text-5xl font-bold opacity-20">#{i + 1}</span>
                  <p className="mt-2 text-sm font-medium opacity-90">
                    {metric.label} · {metric.referenceYear}
                  </p>
                  <p className="mt-3 text-3xl font-bold tabular-nums">
                    {formatGapLabel(g7GapMultiplier(metric))} gap
                  </p>
                  <p className="mt-2 text-sm opacity-90">
                    Nigeria: {formatBenchmarkValue(metric.nigeria, metric.unit)} · G7 avg:{" "}
                    {formatBenchmarkValue(g7Average, metric.unit)}
                  </p>
                </div>
              </SourceTooltip>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold md:text-xl">By sector</h2>
        <div
          role="tablist"
          aria-label="Filter by sector"
          className="mt-4 flex flex-wrap gap-2"
        >
          {sectorSlugs.map((slug) => (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={activeSector === slug}
              onClick={() => {
                setActiveSector(slug);
                trackEvent({ name: "g7_sector_filter", sector: slug });
              }}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                activeSector === slug
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {SECTOR_LABELS[slug] ?? slug}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4" role="tabpanel">
          {sectorMetrics.map((metric) => (
            <GapBar key={metric.id} metric={metric} />
          ))}
        </div>

        <Link
          href={`/sectors/${activeSector}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:underline"
        >
          See Nigeria&apos;s 2050 path for {SECTOR_LABELS[activeSector]}
          <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
        </Link>
      </section>
    </div>
  );
}
