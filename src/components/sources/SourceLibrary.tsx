"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import type { Source } from "@/types/content";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ERAS } from "@/content/timeline";

interface SourceLibraryProps {
  sources: Source[];
}

export function SourceLibrary({ sources }: SourceLibraryProps) {
  const [sectorFilter, setSectorFilter] = useState("all");
  const [eraFilter, setEraFilter] = useState("all");

  const filtered = useMemo(() => {
    return sources.filter((source) => {
      const sectorOk =
        sectorFilter === "all" || source.sectors?.includes(sectorFilter);
      const eraOk = eraFilter === "all" || source.eras?.includes(eraFilter);
      return sectorOk && eraOk;
    });
  }, [sources, sectorFilter, eraFilter]);

  const grouped = filtered.reduce(
    (acc, source) => {
      const pub = source.publisher;
      if (!acc[pub]) acc[pub] = [];
      acc[pub].push(source);
      return acc;
    },
    {} as Record<string, Source[]>,
  );

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Filter by sector</span>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2"
          >
            <option value="all">All sectors</option>
            {SECTORS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Filter by era</span>
          <select
            value={eraFilter}
            onChange={(e) => setEraFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2"
          >
            <option value="all">All eras</option>
            {TIMELINE_ERAS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {sources.length} sources
      </p>

      <div className="mt-8 space-y-10">
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([publisher, pubSources]) => (
            <section key={publisher}>
              <h2 className="mb-4 text-lg font-bold text-accent">{publisher}</h2>
              <ul className="space-y-3">
                {pubSources.map((source) => (
                  <li
                    key={source.id}
                    id={source.id}
                    className="scroll-mt-24 rounded-lg border border-border bg-card p-4"
                  >
                    <p className="font-medium">{source.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {source.publisher} · {source.year}
                    </p>
                    {source.url && (
                      <Link
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        View original
                        <IconExternalLink className="size-3" stroke={1.5} aria-hidden />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </div>
    </>
  );
}
