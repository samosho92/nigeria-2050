import { formatMetricKey } from "@/lib/format";
import { cn } from "@/lib/utils";

interface MetricChipsProps {
  metrics: Record<string, number | string>;
  className?: string;
}

export function MetricChips({ metrics }: MetricChipsProps) {
  const entries = Object.entries(metrics);
  if (entries.length === 0) return null;

  return (
    <dl className="flex flex-wrap gap-2">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="rounded-md bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground"
        >
          <dt className="sr-only">{formatMetricKey(key)}</dt>
          <dd>
            <span className="text-muted-foreground">{formatMetricKey(key)}:</span> {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Horizontal stat strip for milestone detail panels. */
export function MetricStrip({ metrics, className }: MetricChipsProps) {
  const entries = Object.entries(metrics);
  if (entries.length === 0) return null;

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3",
        className,
      )}
    >
      {entries.map(([key, value]) => (
        <div key={key} className="bg-surface px-4 py-3">
          <dt className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
            {formatMetricKey(key)}
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
