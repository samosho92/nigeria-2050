import type { ScenarioRange } from "@/types/content";
import { FadeIn } from "@/components/motion";
import { formatScenarioValue } from "@/lib/format";

interface ScenarioRangePanelProps {
  ranges: ScenarioRange[];
}

export function ScenarioRangePanel({ ranges }: ScenarioRangePanelProps) {
  return (
    <FadeIn>
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
          2050 Scenario Ranges
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Low / base / high bands where the sector page supports a range. These are scenarios with stated assumptions.
        </p>
        <div className="space-y-6">
          {ranges.map((range) => (
            <div key={range.label}>
              <p className="mb-2 font-medium">{range.label}</p>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs uppercase text-muted-foreground">Low</p>
                  <p className="mt-1 font-bold">{formatScenarioValue(range, range.low)}</p>
                </div>
                <div className="rounded-lg border border-accent bg-accent/10 p-3">
                  <p className="text-xs uppercase text-accent">Base</p>
                  <p className="mt-1 font-bold text-accent">
                    {formatScenarioValue(range, range.base)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs uppercase text-muted-foreground">High</p>
                  <p className="mt-1 font-bold">{formatScenarioValue(range, range.high)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
