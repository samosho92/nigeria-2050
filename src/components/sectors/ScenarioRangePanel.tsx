import type { ScenarioRange } from "@/types/content";
import { FadeIn } from "@/components/motion";
import { SECTOR_DETAIL_UI } from "@/content/sectors";
import { formatScenarioValue, scenarioBasePositionPercent } from "@/lib/format";

interface ScenarioRangePanelProps {
  ranges: ScenarioRange[];
}

export function ScenarioRangePanel({ ranges }: ScenarioRangePanelProps) {
  const ui = SECTOR_DETAIL_UI;

  return (
    <FadeIn>
      <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
        <h2 className="text-2xl font-bold">{ui.scenarioRangesTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{ui.scenarioRangesLead}</p>

        <ul className="mt-8 space-y-8">
          {ranges.map((range) => {
            const marker = scenarioBasePositionPercent(range.low, range.base, range.high);

            return (
              <li key={range.label}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-foreground">{range.label}</p>
                  {range.unit ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {range.unit}
                    </p>
                  ) : null}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-lg bg-muted/80 px-3 py-3">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {ui.low}
                    </p>
                    <p className="mt-1 font-serif text-lg font-bold tabular-nums">
                      {formatScenarioValue(range, range.low)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-accent bg-accent/10 px-3 py-3">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent">
                      {ui.base}
                    </p>
                    <p className="mt-1 font-serif text-lg font-bold tabular-nums text-accent">
                      {formatScenarioValue(range, range.base)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/80 px-3 py-3">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {ui.high}
                    </p>
                    <p className="mt-1 font-serif text-lg font-bold tabular-nums">
                      {formatScenarioValue(range, range.high)}
                    </p>
                  </div>
                </div>

                {marker !== null ? (
                  <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-accent/25"
                      style={{ width: `${marker}%` }}
                      aria-hidden
                    />
                    <span
                      className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-accent bg-background shadow-sm"
                      style={{ left: `calc(${marker}% - 0.375rem)` }}
                      aria-hidden
                    />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </FadeIn>
  );
}
