"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PostalCapitalMap } from "@/components/projects/PostalCapitalMap";
import { getPostalCapital, POSTAL_CAPITALS } from "@/content/postal-code-engine";
import {
  BANKABLE_RULES,
  CONSENT_LABEL,
  ENCUMBRANCE_LABEL,
  LAND_PARCELS,
  REGISTER_LABEL,
  SURVEY_LABEL,
  TITLE_KIND_LABEL,
  TITLE_SEED_IDS,
  TITLE_STANDARD,
  bankableGaps,
  isBankable,
  parcelsForCapital,
  registryStats,
  searchParcels,
  type LandParcel,
} from "@/content/land-titles";
import { cn } from "@/lib/utils";

const DEFAULT_CITY = "abuja";
const DEFAULT_PARCEL = "fc-ind-17";

export function TitleRegister() {
  const [capitalId, setCapitalId] = useState(DEFAULT_CITY);
  const [parcelId, setParcelId] = useState(DEFAULT_PARCEL);
  const [query, setQuery] = useState("");

  const seeded = TITLE_SEED_IDS.includes(capitalId);
  const capital = getPostalCapital(capitalId) ?? POSTAL_CAPITALS[0];
  const cityParcels = parcelsForCapital(seeded ? capitalId : "");
  const parcel =
    LAND_PARCELS.find((item) => item.id === parcelId && item.capitalId === capitalId) ??
    cityParcels[0];
  const stats = seeded ? registryStats(capitalId) : undefined;
  const results = useMemo(() => searchParcels(query), [query]);

  const onCapital = (id: string) => {
    setCapitalId(id);
    const next = parcelsForCapital(id)[0];
    setParcelId(next?.id ?? "");
  };

  return (
    <div className="space-y-12">
      <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Schematic parcels, not AGIS, not a state GIS, not legal advice. Holder labels are classes —
        not named people. A bankable badge on this page is an editorial test of the folio, not a
        valuation.
      </p>

      <section aria-labelledby="torrens-heading">
        <h2 id="torrens-heading" className="font-serif text-2xl font-bold tracking-tight">
          How the folio works
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {TITLE_STANDARD.name} — {TITLE_STANDARD.inspiredBy}. The Land Use Act already vests urban
          land in governors. The failure is the paper trail. One record, mapped, queryable, with
          consent on the same page.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {TITLE_STANDARD.rollout.map((item) => (
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

      <section aria-labelledby="bankable-heading">
        <h2 id="bankable-heading" className="font-serif text-2xl font-bold tracking-tight">
          When a title is bankable
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Five tests. Fail one and a mortgage is a rumour. A mortgage noted on a clean folio still
          passes — that charge is the point of a public register.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {BANKABLE_RULES.map((item) => (
            <li key={item.id} className="rounded-xl border border-border bg-card p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="lookup-heading" className="space-y-3">
        <h2 id="lookup-heading" className="font-serif text-2xl font-bold tracking-tight">
          Look up a sample folio
        </h2>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <IconSearch className="size-5 shrink-0 text-muted-foreground" stroke={1.5} aria-hidden />
          <input
            type="search"
            value={query}
            maxLength={80}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Independence Avenue, FC-U01-001, Allen Avenue, FC-C/2014/1108…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search sample land titles"
          />
        </div>
        {query.trim().length >= 2 ? (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {results.length === 0 ? (
              <li className="p-4 text-sm text-muted-foreground">No sample match in this mock register.</li>
            ) : (
              results.map((hit) => {
                const city = getPostalCapital(hit.capitalId);
                return (
                  <li key={hit.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setCapitalId(hit.capitalId);
                        setParcelId(hit.id);
                        setQuery("");
                      }}
                      className="flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-muted"
                    >
                      <span className="font-mono text-sm font-semibold text-accent">{hit.postalCode}</span>
                      <span className="text-sm">
                        {hit.street}, plot {hit.plot}
                        {city ? ` · ${city.capital}` : ""}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {hit.folio} · {isBankable(hit) ? "Bankable on this test" : "Not bankable"}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        ) : null}
      </section>

      <section aria-labelledby="registries-heading" className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="registries-heading" className="font-serif text-2xl font-bold tracking-tight">
            {TITLE_SEED_IDS.length} seed registries
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Same capital dots as the postal mock. Streets reuse that index. A title without a code is
            still a landmark story.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/40 p-2">
            <PostalCapitalMap
              selectedId={capitalId}
              seedIds={TITLE_SEED_IDS}
              ariaLabel="State capitals of Nigeria. Seeded title registries are marked. Select a capital to inspect sample folios."
              onSelect={onCapital}
            />
          </div>
          <ul className="mt-4 space-y-2">
            {TITLE_SEED_IDS.map((id) => {
              const city = getPostalCapital(id);
              const row = registryStats(id);
              const active = id === capitalId;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onCapital(id)}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                      active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{city?.capital}</span>
                      <span className="text-xs text-muted-foreground">
                        {row.bankable}/{row.total} bankable · {row.queryable} queryable
                      </span>
                    </span>
                    <span className="font-mono text-xs text-accent">{row.paper} paper</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {seeded && parcel && stats ? (
            <FolioCard
              capitalName={capital.capital}
              stateName={capital.state}
              stats={stats}
              parcels={cityParcels}
              parcel={parcel}
              onSelect={setParcelId}
            />
          ) : (
            <Card className="p-5 md:p-6">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {capital.state}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{capital.capital}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Not seeded on this mock. The same folio still applies: one record, a mapped shape, a
                queryable layer, consent written here. Six registries are drawn; the other capitals
                wait on the same backlog.
              </p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

function FolioCard({
  capitalName,
  stateName,
  stats,
  parcels,
  parcel,
  onSelect,
}: {
  capitalName: string;
  stateName: string;
  stats: ReturnType<typeof registryStats>;
  parcels: LandParcel[];
  parcel: LandParcel;
  onSelect: (id: string) => void;
}) {
  const bankable = isBankable(parcel);
  const gaps = bankableGaps(parcel);

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {stateName}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{capitalName}</h3>
        </div>
        <Badge>
          {stats.bankable} bankable / {stats.total} folios
        </Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {stats.queryable} queryable, {stats.paper} still paper. Illustrative backlog — not a live
        lands bureau count.
      </p>

      <ul className="mt-5 space-y-2">
        {parcels.map((item) => {
          const active = item.id === parcel.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left transition",
                  active ? "border-accent bg-accent/10" : "border-border bg-background hover:border-accent/40",
                )}
              >
                <span>
                  <span className="block font-mono text-xs font-semibold text-accent">{item.postalCode}</span>
                  <span className="mt-1 block text-sm font-semibold">
                    {item.street} · plot {item.plot}
                  </span>
                </span>
                <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {isBankable(item) ? "Bankable" : "Not bankable"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 rounded-xl border border-border bg-background p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-sm font-semibold text-accent">{parcel.postalCode}</p>
            <p className="mt-1 font-semibold">
              {parcel.street}, plot {parcel.plot}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Folio {parcel.folio}</p>
          </div>
          <Badge variant={bankable ? "accent" : "muted"}>{bankable ? "Bankable" : "Not bankable"}</Badge>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{parcel.note}</p>
        <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
          <FolioStat label="Holder" value={parcel.holder} />
          <FolioStat label="Instrument" value={TITLE_KIND_LABEL[parcel.titleKind]} />
          <FolioStat label="Register" value={REGISTER_LABEL[parcel.register]} />
          <FolioStat label="Survey" value={SURVEY_LABEL[parcel.survey]} />
          <FolioStat label="Consent" value={CONSENT_LABEL[parcel.consent]} />
          <FolioStat label="Encumbrance" value={ENCUMBRANCE_LABEL[parcel.encumbrance]} />
        </dl>
        {gaps.length > 0 ? (
          <p className="mt-3 text-xs text-muted-foreground">Gaps: {gaps.join(" · ")}</p>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            Passes the five tests on this schematic. Still not a live valuation.
          </p>
        )}
        <p className="mt-4 text-sm">
          <Link href="/projects/postal-codes" className="font-medium text-accent underline-offset-4 hover:underline">
            Open the postal code for this street
          </Link>
        </p>
      </div>
    </Card>
  );
}

function FolioStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/50 px-3 py-2">
      <dt className="uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-semibold">{value}</dd>
    </div>
  );
}
