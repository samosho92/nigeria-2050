import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";

interface AssumptionsPanelProps {
  assumptions: string[];
  risks: string[];
}

export function AssumptionsPanel({ assumptions, risks }: AssumptionsPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
          <IconCircleCheck className="size-4" stroke={1.5} aria-hidden />
          What Would Have to Be True
        </h3>
        <ul className="space-y-2">
          {assumptions.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          <IconAlertTriangle className="size-4" stroke={1.5} aria-hidden />
          Risks to This Scenario
        </h3>
        <ul className="space-y-2">
          {risks.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
