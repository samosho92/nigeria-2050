"use client";

import { useMemo, useState } from "react";
import {
  IconArrowDown,
  IconBuildingSkyscraper,
  IconMapPin,
  IconRoad,
  IconSearch,
  IconTrees,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PostalCapitalMap } from "@/components/projects/PostalCapitalMap";
import {
  POSTAL_BANDS,
  POSTAL_CAPITALS,
  POSTAL_CODE_SCHEME,
  formatPostalCode,
  formatStreetCode,
  getPostalCapital,
  streetZonesFor,
  type PostalBand,
  type PostalStreetZone,
} from "@/content/postal-code-engine";
import { capitalsByZone, searchPostalIndex, transectFor } from "@/lib/postal-codes";
import { cn } from "@/lib/utils";

const BAND_ICON = {
  R: IconTrees,
  P: IconRoad,
  U: IconBuildingSkyscraper,
} as const;

const DEFAULT_CITY = "abuja";

export function PostalCodeEngine() {
  const [selectedId, setSelectedId] = useState(DEFAULT_CITY);
  const [query, setQuery] = useState("");
  const city = getPostalCapital(selectedId) ?? POSTAL_CAPITALS[0];
  const groups = useMemo(() => capitalsByZone(), []);
  const transect = useMemo(() => transectFor(city), [city]);
  const results = useMemo(() => searchPostalIndex(query), [query]);

  return (
    <div className="space-y-12">
      <section aria-labelledby="scheme-heading">
        <h2 id="scheme-heading" className="font-serif text-2xl font-bold tracking-tight">
          How a code is built
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          One string, four layers. District <span className="font-medium text-foreground">01</span> is
          always the state capital, that is the seed. Hinterland numbers come later, on the same
          prefix.
        </p>
        <p className="mt-4 font-mono text-2xl font-semibold tracking-wide text-accent md:text-3xl">
          {POSTAL_CODE_SCHEME.example}
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {POSTAL_CODE_SCHEME.parts.map((part) => (
            <li key={part.id} className="rounded-xl border border-border bg-card p-4">
              <p className="font-mono text-sm font-semibold text-accent">{part.token}</p>
              <p className="mt-1 text-sm font-semibold">{part.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{part.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="rollout-heading">
        <h2 id="rollout-heading" className="font-serif text-2xl font-bold tracking-tight">
          Rural cluster to capital street
        </h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {POSTAL_CODE_SCHEME.rollout.map((item) => (
            <li key={item.step} className="rounded-xl border border-border bg-card p-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Step {item.step}
              </p>
              <p className="mt-2 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="lookup-heading" className="space-y-3">
        <h2 id="lookup-heading" className="font-serif text-2xl font-bold tracking-tight">
          Look up a sample place
        </h2>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <IconSearch className="size-5 shrink-0 text-muted-foreground" stroke={1.5} aria-hidden />
          <input
            type="search"
            value={query}
            maxLength={80}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Independence Avenue, Allen Avenue, FC-U01-001…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search sample postal codes"
          />
        </div>
        {query.trim().length >= 2 ? (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {results.length === 0 ? (
              <li className="p-4 text-sm text-muted-foreground">No sample match in this mock index.</li>
            ) : (
              results.map((hit) => (
                <li key={hit.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(hit.capitalId);
                      setQuery("");
                    }}
                    className="flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-muted"
                  >
                    <span className="font-mono text-sm font-semibold text-accent">{hit.code}</span>
                    <span className="text-sm">
                      {hit.street ? hit.street.name : hit.place.name}, {hit.capital}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {hit.street ? hit.street.stretch : hit.place.landmark}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </section>

      <section aria-labelledby="capitals-heading" className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="capitals-heading" className="font-serif text-2xl font-bold tracking-tight">
            {POSTAL_CAPITALS.length} capitals, district 01
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Dots are schematic, enough to pick a capital. Select a city to
            walk the hinterland → fringe → core transect.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/40 p-2">
            <PostalCapitalMap selectedId={city.id} onSelect={setSelectedId} />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Card className="p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {city.state} · {city.plate}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{city.capital}</h3>
              </div>
              <Badge>District 01 seeded</Badge>
            </div>

            <ol className="mt-6 space-y-3">
              {transect.map((hit, index) => {
                const Icon = BAND_ICON[hit.place.band as PostalBand];
                return (
                  <li key={hit.id}>
                    {index > 0 ? (
                      <p className="flex justify-center py-1 text-muted-foreground" aria-hidden>
                        <IconArrowDown className="size-4" stroke={1.5} />
                      </p>
                    ) : null}
                    <div className="flex gap-3 rounded-xl border border-border bg-background p-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/15">
                        <Icon className="size-5 text-accent" stroke={1.5} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-mono text-sm font-semibold text-accent">{hit.code}</p>
                          <Badge variant="muted" className="normal-case tracking-normal">
                            {POSTAL_BANDS[hit.place.band].label}
                          </Badge>
                        </div>
                        <p className="mt-1 font-semibold">{hit.place.name}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{hit.place.landmark}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {POSTAL_BANDS[hit.place.band].density}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <IconMapPin className="mt-0.5 size-3.5 shrink-0" stroke={1.5} aria-hidden />
              Same plate ({city.plate}). Rural has no street zones yet. The capital core splits into
              named streets, odd side, even side, then the next street.
            </p>
          </Card>

          <StreetZoneBoard
            className="mt-4"
            title={`Street zones · ${city.urban.name}`}
            caption="Each tile is a deliverable street segment. Odd and even sides get different codes, like a UK sector, so a rider is not sent to the wrong kerb."
            plate={city.plate}
            band="U"
            district={city.urban.district}
            zones={streetZonesFor(city, "U")}
          />
          <StreetZoneBoard
            title={`Corridor frontage · ${city.periurban.name}`}
            caption="Peri-urban is not fully gazetted. The highway splits first; inner streets wait until the fringe fills in."
            plate={city.plate}
            band="P"
            district={city.periurban.district}
            zones={streetZonesFor(city, "P")}
            className="mt-4"
          />
        </div>
      </section>

      <section aria-labelledby="directory-heading">
        <h2 id="directory-heading" className="font-serif text-2xl font-bold tracking-tight">
          Capital directory
        </h2>
        <div className="mt-6 space-y-8">
          {groups.map((group) => (
            <div key={group.zoneId}>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {group.label}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.cities.map((item) => {
                  const active = item.id === city.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={cn(
                          "flex w-full items-baseline justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                          active
                            ? "border-accent bg-accent/10"
                            : "border-border bg-card hover:border-accent/50",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-semibold">{item.capital}</span>
                          <span className="text-xs text-muted-foreground">{item.state}</span>
                        </span>
                        <span className="font-mono text-xs font-semibold text-accent">
                          {formatPostalCode(item.plate, item.urban)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const SIDE_LABEL: Record<PostalStreetZone["side"], string> = {
  odd: "Odd side",
  even: "Even side",
  both: "Both sides",
};

function StreetZoneBoard({
  title,
  caption,
  plate,
  band,
  district,
  zones,
  className,
}: {
  title: string;
  caption: string;
  plate: string;
  band: PostalBand;
  district: string;
  zones: PostalStreetZone[];
  className?: string;
}) {
  if (zones.length === 0) return null;

  return (
    <Card className={cn("p-5 md:p-6", className)}>
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/15">
          <IconRoad className="size-5 text-accent" stroke={1.5} aria-hidden />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{caption}</p>
        </div>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {zones.map((zone) => (
          <li key={zone.unit} className="rounded-xl border border-border bg-background p-3">
            <p className="font-mono text-xs font-semibold text-accent">
              {formatStreetCode(plate, band, district, zone.unit)}
            </p>
            <p className="mt-1 text-sm font-semibold">{zone.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{zone.stretch}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge variant="muted" className="normal-case tracking-normal">
                {SIDE_LABEL[zone.side]}
              </Badge>
              <Badge variant="muted" className="normal-case tracking-normal">
                {zone.sample}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
