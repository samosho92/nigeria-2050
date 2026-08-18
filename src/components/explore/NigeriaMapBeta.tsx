"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import {
  NIGERIA_MAP_CITIES,
  NIGERIA_MAP_REGIONS,
  NIGERIA_MAP_VIEWBOX,
  type NigeriaMapRegion,
} from "@/content/nigeria-map";
import { SECTORS } from "@/content/sectors";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function NigeriaMapSvg({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <svg
      viewBox={NIGERIA_MAP_VIEWBOX}
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Interactive map of Nigeria's six geopolitical zones"
    >
      <title>Map of Nigeria</title>
      <ellipse
        cx="200"
        cy="322"
        rx="148"
        ry="14"
        className="fill-accent/15"
        aria-hidden
      />

      <g className="pointer-events-none" aria-hidden>
        {NIGERIA_MAP_REGIONS.map((region) => (
          <path
            key={`${region.id}-extrude`}
            d={region.path}
            className="fill-accent"
            transform="translate(5 14)"
            opacity={0.35}
          />
        ))}
      </g>

      {NIGERIA_MAP_REGIONS.map((region) => {
        const isActive = region.id === activeId;
        return (
          <path
            key={region.id}
            d={region.path}
            tabIndex={0}
            role="button"
            aria-pressed={isActive}
            aria-label={`${region.label}: ${region.states.join(", ")}`}
            className={cn(
              "cursor-pointer stroke-background stroke-[1.8] outline-none transition-colors duration-200",
              isActive
                ? "fill-accent"
                : "fill-accent/25 hover:fill-accent/50 focus-visible:fill-accent/50",
            )}
            onMouseEnter={() => onSelect(region.id)}
            onFocus={() => onSelect(region.id)}
            onClick={() => onSelect(region.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(region.id);
              }
            }}
          />
        );
      })}

      {NIGERIA_MAP_REGIONS.map((region) => (
        <text
          key={`${region.id}-label`}
          x={region.labelX}
          y={region.labelY}
          textAnchor="middle"
          className={cn(
            "pointer-events-none select-none text-[13px] font-bold tracking-widest",
            region.id === activeId ? "fill-accent-foreground" : "fill-foreground/70",
          )}
        >
          {region.code}
        </text>
      ))}

      {NIGERIA_MAP_CITIES.map((city) => (
        <g key={city.id} className="pointer-events-none">
          <circle
            cx={city.x}
            cy={city.y}
            r={city.id === "abuja" || city.id === "lagos" ? 3.4 : 2.4}
            className="fill-foreground stroke-background stroke-[1.2]"
          />
        </g>
      ))}
    </svg>
  );
}

function RegionDetail({ region }: { region: NigeriaMapRegion }) {
  const sectors = useMemo(
    () =>
      region.sectorSlugs
        .map((slug) => SECTORS.find((sector) => sector.slug === slug))
        .filter((sector): sector is NonNullable<typeof sector> => Boolean(sector)),
    [region],
  );

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 md:p-6">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
        {region.code} · {region.states.filter((state) => state !== "FCT").length} states
        {region.states.includes("FCT") ? " + FCT" : ""}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-bold">{region.label}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{region.summary}</p>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{region.states.join(" · ")}</p>

      <ul className="mt-6 space-y-2 border-t border-border pt-5">
        {sectors.map((sector) => (
          <li key={sector.slug}>
            <Link
              href={`/sectors/${sector.slug}`}
              className="group flex items-start justify-between gap-3 rounded-lg px-2 py-2 transition hover:bg-accent/10"
            >
              <span>
                <span className="block text-sm font-semibold text-foreground group-hover:text-accent">
                  {sector.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{sector.tagline}</span>
              </span>
              <IconChevronRight
                className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-accent"
                stroke={1.5}
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NigeriaMapBeta() {
  const [activeId, setActiveId] = useState("south-west");
  const prefersReducedMotion = useReducedMotion();
  const { enabled: dataSaver } = useDataSaver();
  const tilt = !prefersReducedMotion && !dataSaver;

  const region =
    NIGERIA_MAP_REGIONS.find((entry) => entry.id === activeId) ?? NIGERIA_MAP_REGIONS[3];

  const selectRegion = (id: string) => {
    setActiveId(id);
    trackEvent({ name: "map_region_select", region: id });
  };

  const cycle = (direction: 1 | -1) => {
    const index = NIGERIA_MAP_REGIONS.findIndex((entry) => entry.id === activeId);
    const next = NIGERIA_MAP_REGIONS[(index + direction + NIGERIA_MAP_REGIONS.length) % NIGERIA_MAP_REGIONS.length];
    selectRegion(next.id);
  };

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold md:text-3xl">Nigeria, zone by zone</h2>
            <Badge variant="accent">3D map</Badge>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Hover or select a geopolitical zone. Outline and zones are traced from Nigeria&apos;s
            six-zone map — 36 states and the FCT, grouped as they are governed.
          </p>
        </div>
      </div>

      <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)]">
        <div
          className="relative overflow-hidden rounded-2xl border border-border bg-card px-4 py-8 md:px-8 md:py-10"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              event.preventDefault();
              cycle(1);
            }
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
              event.preventDefault();
              cycle(-1);
            }
          }}
        >
          <div className="nigeria-map-stage mx-auto aspect-[400/330] w-full max-w-2xl">
            <div className={cn("nigeria-map-scene h-full w-full", !tilt && "nigeria-map-scene-flat")}>
              <NigeriaMapSvg activeId={activeId} onSelect={selectRegion} />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {tilt
              ? "Tilted 3D view · arrow keys move between zones"
              : "Flat view (data-saver / reduced motion) · arrow keys move between zones"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {NIGERIA_MAP_REGIONS.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => selectRegion(entry.id)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide transition",
                  entry.id === activeId
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {entry.code}
              </button>
            ))}
          </div>
          <RegionDetail region={region} />
        </div>
      </div>
    </section>
  );
}
