"use client";

import { useState } from "react";
import Link from "next/link";
import { getGlossaryTerm } from "@/content/glossary";
import { cn } from "@/lib/utils";

interface GlossaryTermProps {
  term: string;
  className?: string;
}

export function GlossaryTerm({ term, className }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const entry = getGlossaryTerm(term);

  if (!entry) {
    return <span className={className}>{term}</span>;
  }

  return (
    <span className="relative inline">
      <button
        type="button"
        className={cn(
          "cursor-help border-b border-dotted border-accent text-accent underline-offset-2",
          className,
        )}
        aria-describedby={open ? `glossary-${term}` : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {term}
      </button>
      {open && (
        <span
          id={`glossary-${term}`}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-3 text-left text-xs font-normal text-foreground shadow-lg"
        >
          {entry.definition}
          <Link href={`/glossary#${encodeURIComponent(term)}`} className="mt-2 block text-accent hover:underline">
            Full definition →
          </Link>
        </span>
      )}
    </span>
  );
}

interface AutoGlossaryProps {
  text: string;
  className?: string;
}

export function AutoGlossary({ text, className }: AutoGlossaryProps) {
  const terms = ["GDP", "Amalgamation", "Biafra", "brain drain", "fintech", "NBS", "informal economy"];
  const pattern = new RegExp(`\\b(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi");
  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const match = terms.find((t) => t.toLowerCase() === part.toLowerCase());
        if (match) return <GlossaryTerm key={`${match}-${i}`} term={match} />;
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
