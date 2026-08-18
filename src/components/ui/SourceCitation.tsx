import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import type { Source } from "@/types/content";

interface SourceCitationProps {
  source: Source;
  compact?: boolean;
}

export function SourceCitation({ source, compact }: SourceCitationProps) {
  return (
    <cite className="not-italic">
      <span className="text-muted-foreground">
        {source.publisher}, {source.year}
        {source.accessedAt && ` (accessed ${source.accessedAt})`}
        {!compact && ` — ${source.title}`}
      </span>
      {source.url && (
        <Link
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1.5 inline-flex items-center gap-0.5 text-accent hover:underline"
        >
          <IconExternalLink className="size-3" stroke={1.5} aria-hidden />
          <span className="sr-only">Open source</span>
        </Link>
      )}
    </cite>
  );
}

interface SourcePanelProps {
  sources: Source[];
  title?: string;
}

export function SourcePanel({ sources, title = "Sources & Citations" }: SourcePanelProps) {
  if (sources.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
        {title}
      </h3>
      <ul className="space-y-3">
        {sources.map((source) => (
          <li key={source.id} className="text-sm">
            <Link
              href={`/sources#${source.id}`}
              className="font-medium text-foreground hover:text-accent"
            >
              {source.title}
            </Link>
            <div className="mt-0.5">
              <SourceCitation source={source} compact />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
