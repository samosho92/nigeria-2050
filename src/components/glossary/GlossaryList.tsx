"use client";

import { useMemo, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import type { GlossaryTerm } from "@/types/content";

interface GlossaryListProps {
  terms: GlossaryTerm[];
}

function matchesQuery(entry: GlossaryTerm, query: string): boolean {
  if (!query) return true;
  const haystack = [entry.term, entry.definition, ...(entry.relatedSlugs ?? [])]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export function GlossaryList({ terms }: GlossaryListProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => terms.filter((entry) => matchesQuery(entry, query.trim())),
    [terms, query],
  );

  return (
    <div>
      <div className="sticky top-20 z-40 rounded-xl border border-border bg-header-background p-3 backdrop-blur-md md:p-4">
        <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <IconSearch className="size-4 shrink-0 text-muted-foreground" stroke={1.5} aria-hidden />
          <input
            type="search"
            value={query}
            maxLength={80}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search terms and definitions…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search glossary"
          />
        </label>
        <p className="mt-2 px-1 text-xs text-muted-foreground">
          Showing {filtered.length} of {terms.length}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">No terms match that search.</p>
      ) : (
        <dl className="mt-6 space-y-6">
          {filtered.map((entry) => (
            <div
              key={entry.term}
              id={entry.term}
              className="scroll-mt-36 rounded-xl border border-border bg-card p-6"
            >
              <dt className="text-lg font-bold text-accent">{entry.term}</dt>
              <dd className="mt-2 text-muted-foreground">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
