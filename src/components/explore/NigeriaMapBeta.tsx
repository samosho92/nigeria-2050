"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SECTORS } from "@/content/sectors";
import { cn } from "@/lib/utils";

/** Simplified geo regions for interactive sector exploration (static fallback + beta label). */
const REGIONS: { id: string; label: string; sectors: string[]; x: number; y: number }[] = [
  { id: "north-west", label: "North West", sectors: ["agriculture", "security"], x: 28, y: 22 },
  { id: "north-east", label: "North East", sectors: ["agriculture", "healthcare"], x: 62, y: 18 },
  { id: "north-central", label: "North Central", sectors: ["agriculture", "governance"], x: 45, y: 35 },
  { id: "south-west", label: "South West", sectors: ["technology", "creative-economy", "financial-inclusion"], x: 22, y: 68 },
  { id: "south-east", label: "South East", sectors: ["manufacturing", "technology"], x: 58, y: 72 },
  { id: "south-south", label: "South South", sectors: ["energy", "economy"], x: 42, y: 82 },
  { id: "lagos", label: "Lagos", sectors: ["technology", "creative-economy", "financial-inclusion"], x: 12, y: 78 },
];

export function NigeriaMapBeta() {
  const [active, setActive] = useState<string | null>(null);
  const region = REGIONS.find((r) => r.id === active);

  const sectorDetails = useMemo(
    () =>
      region
        ? region.sectors
            .map((slug) => SECTORS.find((s) => s.slug === slug))
            .filter(Boolean)
        : [],
    [region],
  );

  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold">Explore Nigeria by region</h2>
        <Badge variant="accent">Beta</Badge>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Hover a region to see which sector visions connect to its economic story. Full 3D state map
        coming later; this beta uses sourced sector links only.
      </p>

      <div className="relative mx-auto mt-8 aspect-[4/3] max-w-2xl rounded-xl border border-border bg-surface">
        <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Map of Nigeria regions">
          <rect width="100" height="100" fill="#e6f9ef" />
          {REGIONS.map((r) => (
            <circle
              key={r.id}
              cx={r.x}
              cy={r.y}
              r={active === r.id ? 9 : 7}
              className={cn(
                "cursor-pointer transition-all",
                active === r.id ? "fill-accent" : "fill-foreground/30 hover:fill-accent/60",
              )}
              onMouseEnter={() => setActive(r.id)}
              onFocus={() => setActive(r.id)}
              tabIndex={0}
              aria-label={r.label}
            />
          ))}
        </svg>
      </div>

      {region && (
        <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h3 className="font-semibold">{region.label}</h3>
          <ul className="mt-3 space-y-2">
            {sectorDetails.map((sector) =>
              sector ? (
                <li key={sector.slug}>
                  <Link href={`/sectors/${sector.slug}`} className="text-sm font-medium text-accent hover:underline">
                    {sector.title}
                  </Link>
                  <span className="text-sm text-muted-foreground"> · {sector.tagline}</span>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
