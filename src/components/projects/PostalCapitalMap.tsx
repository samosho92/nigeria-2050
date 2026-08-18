"use client";

import { NIGERIA_MAP_REGIONS, NIGERIA_MAP_VIEWBOX } from "@/content/nigeria-map";
import { POSTAL_CAPITALS } from "@/content/postal-code-engine";
import { cn } from "@/lib/utils";

interface PostalCapitalMapProps {
  selectedId: string;
  onSelect: (id: string) => void;
  ariaLabel?: string;
}

export function PostalCapitalMap({
  selectedId,
  onSelect,
  ariaLabel = "State capitals of Nigeria. Select a capital to inspect its rural-to-urban codes.",
}: PostalCapitalMapProps) {
  const selected = POSTAL_CAPITALS.find((city) => city.id === selectedId);

  return (
    <svg
      viewBox={NIGERIA_MAP_VIEWBOX}
      className="h-full w-full"
      role="img"
      aria-label={ariaLabel}
    >
      <title>Nigeria state capitals</title>
      {NIGERIA_MAP_REGIONS.map((region) => {
        const isActive = selected?.zoneId === region.id;
        return (
          <path
            key={region.id}
            d={region.path}
            className={cn(
              "stroke-background stroke-[1.6]",
              isActive ? "fill-accent/35" : "fill-accent/12",
            )}
          />
        );
      })}
      {POSTAL_CAPITALS.map((city) => {
        const isSelected = city.id === selectedId;
        return (
          <g key={city.id}>
            <circle
              cx={city.x}
              cy={city.y}
              r={isSelected ? 7 : 4.2}
              className={cn(
                "cursor-pointer stroke-background stroke-[1.2] transition-colors",
                isSelected ? "fill-accent" : "fill-foreground/70 hover:fill-accent",
              )}
              tabIndex={0}
              role="button"
              aria-label={`${city.capital}, capital of ${city.state}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(city.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(city.id);
                }
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
