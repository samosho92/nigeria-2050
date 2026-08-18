import type { ComparatorMetric } from "@/types/content";

export function formatComparatorValue(value: number, unit: string): string {
  const formatted = value.toLocaleString();
  if (unit === "USD") return `$${formatted}`;
  if (unit === "M") return `${formatted}M`;
  if (unit === "GW") return `${formatted} GW`;
  if (unit === "%") return `${formatted}%`;
  if (unit === "LPI") return `${formatted} LPI`;
  return `${formatted} ${unit}`;
}

export function formatComparatorBaseline(metric: ComparatorMetric): string {
  return formatComparatorValue(metric.current, metric.unit);
}

export function comparatorCounterProps(metric: ComparatorMetric) {
  if (metric.unit === "USD") return { prefix: "$", suffix: "" };
  if (metric.unit === "M") return { prefix: "", suffix: "M" };
  if (metric.unit === "GW") return { prefix: "", suffix: " GW" };
  if (metric.unit === "%") return { prefix: "", suffix: "%" };
  if (metric.unit === "LPI") return { prefix: "", suffix: " LPI" };
  return { prefix: "", suffix: ` ${metric.unit}` };
}
