import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";

interface AssumptionsPanelProps {
  assumptions: { title: string; detail: string }[];
  risks: { title: string; detail: string }[];
}

export function AssumptionsPanel({ assumptions, risks }: AssumptionsPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-6 lg:p-8">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
          <IconCircleCheck className="size-4" stroke={1.5} aria-hidden />
          What Would Have to Be True
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Specific conditions the base-case 2050 projection depends on — not predictions,
          but prerequisites.
        </p>
        <ul className="space-y-5">
          {assumptions.map((item) => (
            <li key={item.title} className="border-l-2 border-accent/30 pl-4">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-surface p-6 lg:p-8">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          <IconAlertTriangle className="size-4" stroke={1.5} aria-hidden />
          Risks to This Scenario
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Known ways the base case could fail — reflected in the low end of scenario ranges
          where applicable.
        </p>
        <ul className="space-y-5">
          {risks.map((item) => (
            <li key={item.title} className="border-l-2 border-border pl-4">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
