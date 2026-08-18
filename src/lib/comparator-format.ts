import type { ComparatorMetric } from "@/types/content";

export function formatComparatorBaseline(metric: ComparatorMetric): string {
  const value = metric.current.toLocaleString();
  if (metric.unit === "USD") return `$${value}`;
  if (metric.unit === "M") return `${value}M`;
  if (metric.unit === "GW") return `${value} GW`;
  if (metric.unit === "%") return `${value}%`;
  if (metric.unit === "LPI") return `${value} LPI`;
  return `${value} ${metric.unit}`;
}

export function comparatorCounterProps(metric: ComparatorMetric) {
  if (metric.unit === "USD") return { prefix: "$", suffix: "" };
  if (metric.unit === "M") return { prefix: "", suffix: "M" };
  if (metric.unit === "GW") return { prefix: "", suffix: " GW" };
  if (metric.unit === "%") return { prefix: "", suffix: "%" };
  if (metric.unit === "LPI") return { prefix: "", suffix: " LPI" };
  return { prefix: "", suffix: ` ${metric.unit}` };
}
