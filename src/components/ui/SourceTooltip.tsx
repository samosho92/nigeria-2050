import { getSourceById } from "@/content/sources";

interface SourceTooltipProps {
  sourceId: string;
  sourceSeries: string;
  referenceYear: number;
  definition: string;
  children: React.ReactNode;
  className?: string;
}

export function SourceTooltip({
  sourceId,
  sourceSeries,
  referenceYear,
  definition,
  children,
  className,
}: SourceTooltipProps) {
  const source = getSourceById(sourceId);

  return (
    <span className={`group/source relative inline-flex ${className ?? ""}`}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-72 rounded-lg border border-border bg-card p-3 text-left text-xs leading-relaxed text-muted-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/source:opacity-100 group-focus-within/source:opacity-100"
      >
        <span className="block font-semibold text-foreground">
          {source?.publisher ?? "Source"} · {referenceYear}
        </span>
        {source && <span className="mt-1 block">{source.title}</span>}
        <span className="mt-2 block text-[0.6875rem] uppercase tracking-wider text-accent">
          {sourceSeries}
        </span>
        <span className="mt-2 block">{definition}</span>
        {source?.url && (
          <span className="mt-2 block truncate text-accent">{source.url}</span>
        )}
      </span>
    </span>
  );
}
