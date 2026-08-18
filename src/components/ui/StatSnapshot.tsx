import { cn } from "@/lib/utils";

export interface StatSnapshotRow {
  label: string;
  value: string;
}

export interface StatSnapshotSection {
  heading: string;
  caption?: string;
  rows: StatSnapshotRow[];
  accent?: boolean;
}

interface StatSnapshotProps {
  sections: StatSnapshotSection[];
  className?: string;
}

export function StatSnapshot({ sections, className }: StatSnapshotProps) {
  return (
    <div className={cn("divide-y divide-border rounded-lg border border-border bg-card", className)}>
      {sections.map((section) => (
        <div
          key={section.heading}
          className={cn("p-5", section.accent && "bg-surface")}
        >
          <p
            className={cn(
              "text-[0.6875rem] font-semibold uppercase tracking-[0.15em]",
              section.accent ? "text-accent" : "text-muted-foreground",
            )}
          >
            {section.heading}
          </p>
          {section.caption && (
            <p className="mt-1 text-xs leading-snug text-muted-foreground">{section.caption}</p>
          )}
          <dl className="mt-4 space-y-3">
            {section.rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-muted-foreground">{row.label}</dt>
                <dd className="text-right text-sm font-semibold tabular-nums text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
