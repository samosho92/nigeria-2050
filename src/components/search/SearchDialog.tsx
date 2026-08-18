"use client";

import { useCallback, useEffect, useState } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { searchContent, type SearchResult } from "@/lib/search";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const TYPE_LABELS = {
  sector: "Sector",
  timeline: "Timeline",
  glossary: "Glossary",
  icon: "Icon",
  project: "Project",
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setResults(searchContent(q));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <IconSearch className="size-5" stroke={1.5} />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-background/80 p-4 pt-[15vh] backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <IconSearch className="size-5 text-muted-foreground" stroke={1.5} aria-hidden />
          <input
            autoFocus
            type="search"
            placeholder="Search sectors, timeline, icons, projects, glossary…"
            value={query}
            maxLength={80}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
          <Button variant="ghost" size="icon" aria-label="Close search" onClick={() => setOpen(false)}>
            <IconX className="size-4" stroke={1.5} />
          </Button>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {query && results.length === 0 && (
            <li className="p-4 text-center text-sm text-muted-foreground">No results found</li>
          )}
          {results.map((result) => (
            <li key={`${result.type}-${result.id}`}>
              <Link
                href={result.href}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-lg p-3 transition hover:bg-muted"
              >
                <span
                  className={cn(
                    "mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase",
                    "bg-accent/15 text-accent",
                  )}
                >
                  {TYPE_LABELS[result.type]}
                </span>
                <div>
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>
              </Link>
            </li>
          ))}
          {!query && (
            <li className="p-4 text-center text-sm text-muted-foreground">
              Try &ldquo;Achebe&rdquo;, &ldquo;Civil War&rdquo;, or &ldquo;fintech&rdquo;
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
