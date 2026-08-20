import type { ComparatorLever, ComparatorMetric } from "@/types/content";

export interface TrajectoryPoint {
  year: number;
  value: number;
}

function metricHigherIsBetter(metric: ComparatorMetric): boolean {
  return metric.higherIsBetter !== false;
}

function stretchTarget2050(metric: ComparatorMetric): number {
  const baseline = metric.projected2050;
  const higher = metricHigherIsBetter(metric);

  if (metric.projected2050High !== undefined) {
    return metric.projected2050High;
  }

  if (higher) {
    return baseline + (baseline - metric.current) * 0.25;
  }

  return baseline - (metric.current - baseline) * 0.25;
}

function clampScenario(metric: ComparatorMetric, value: number): number {
  const higher = metricHigherIsBetter(metric);
  const baseline = metric.projected2050;
  const stretch = stretchTarget2050(metric);

  if (higher) {
    const floor = baseline;
    const ceiling = Math.max(stretch, baseline);
    return Math.min(Math.max(value, floor), ceiling);
  }

  const ceiling = baseline;
  const floor = Math.min(stretch, baseline);
  return Math.max(Math.min(value, ceiling), floor);
}

export function totalGapShareForMetric(
  metricId: string,
  selectedLeverIds: readonly string[],
  levers: ComparatorLever[],
): number {
  const selected = new Set(selectedLeverIds);
  let share = 0;

  for (const lever of levers) {
    if (!selected.has(lever.id)) continue;
    for (const impact of lever.impacts) {
      if (impact.metricId === metricId) share += impact.gapShare;
    }
  }

  return Math.min(share, 1);
}

export function computeScenario2050(
  metric: ComparatorMetric,
  selectedLeverIds: readonly string[],
  levers: ComparatorLever[],
): number {
  const share = totalGapShareForMetric(metric.id, selectedLeverIds, levers);
  const baseline = metric.projected2050;

  if (share === 0) return baseline;

  const stretch = stretchTarget2050(metric);
  const higher = metricHigherIsBetter(metric);

  if (higher) {
    return clampScenario(metric, baseline + (stretch - baseline) * share);
  }

  return clampScenario(metric, baseline - (baseline - stretch) * share);
}

export function leverDeltaForMetric(
  metric: ComparatorMetric,
  lever: ComparatorLever,
): number {
  const impact = lever.impacts.find((item) => item.metricId === metric.id);
  if (!impact) return 0;

  const baseline = metric.projected2050;
  const stretch = stretchTarget2050(metric);
  const higher = metricHigherIsBetter(metric);

  if (higher) {
    return (stretch - baseline) * impact.gapShare;
  }

  return -((baseline - stretch) * impact.gapShare);
}

export function selectedLeversAffectingMetric(
  metricId: string,
  selectedLeverIds: readonly string[],
  levers: ComparatorLever[],
): ComparatorLever[] {
  const selected = new Set(selectedLeverIds);
  return levers.filter(
    (lever) =>
      selected.has(lever.id) &&
      lever.impacts.some((impact) => impact.metricId === metricId),
  );
}

export function buildTrajectory(
  metric: ComparatorMetric,
  target2050: number,
  startYear = 2024,
  endYear = 2050,
): TrajectoryPoint[] {
  const milestones = [startYear, 2030, 2040, endYear];
  const span = endYear - startYear;

  return milestones.map((year) => {
    const t = (year - startYear) / span;
    const value = metric.current + (target2050 - metric.current) * t;
    return { year, value };
  });
}
