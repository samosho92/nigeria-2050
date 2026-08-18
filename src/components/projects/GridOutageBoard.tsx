"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBolt, IconBuilding, IconDroplet, IconHeartbeat } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PostalCapitalMap } from "@/components/projects/PostalCapitalMap";
import { getPostalCapital, POSTAL_CAPITALS } from "@/content/postal-code-engine";
import {
  DISCO_CLUSTERS,
  FEEDER_STATUS_LABEL,
  FUEL_LABEL,
  GRID_DAY,
  GRID_FUEL,
  GRID_PLANTS,
  GRID_STANDARD,
  dayRange,
  discoCityName,
  discoSeedIds,
  feederCounts,
  formatMw,
  fuelShare,
  getDisco,
  plantUtilisation,
  unservedMw,
  type DiscoCluster,
  type FeederStatus,
  type GridFeeder,
} from "@/content/grid-outage";
import { cn } from "@/lib/utils";

const DEFAULT_DISCO = "abuja";

const STATUS_TONE: Record<FeederStatus, string> = {
  on: "bg-accent/15 text-accent",
  shed: "border border-border bg-card text-foreground",
  fault: "bg-muted text-muted-foreground",
  unknown: "bg-muted text-muted-foreground",
};

const PRIORITY_ICON = {
  clinic: IconHeartbeat,
  water: IconDroplet,
  industry: IconBuilding,
} as const;

export function GridOutageBoard() {
  const [discoId, setDiscoId] = useState(DEFAULT_DISCO);
  const [feederId, setFeederId] = useState(DISCO_CLUSTERS[0].feeders[0].id);
  const [plantId, setPlantId] = useState(GRID_PLANTS[0].id);

  const seedIds = discoSeedIds();
  const cluster = getDisco(discoId);
  const capital = getPostalCapital(cluster?.capitalId ?? discoId) ?? POSTAL_CAPITALS[0];
  const feeder =
    cluster?.feeders.find((item) => item.id === feederId) ?? cluster?.feeders[0];
  const plant = GRID_PLANTS.find((item) => item.id === plantId) ?? GRID_PLANTS[0];
  const genRange = dayRange("generatedMw");
  const demandRange = dayRange("demandMw");
  const gap = unservedMw();
  const maxDay = Math.max(...GRID_DAY.map((row) => Math.max(row.generatedMw, row.demandMw)));

  const onDisco = (id: string) => {
    const next = getDisco(id);
    setDiscoId(id);
    setFeederId(next?.feeders[0]?.id ?? "");
  };

  const onMap = (capitalId: string) => {
    const match = DISCO_CLUSTERS.find((item) => item.capitalId === capitalId);
    if (match) onDisco(match.id);
    else setDiscoId(capitalId);
  };

  return (
    <div className="space-y-12">
      <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Frozen schematic hour. Numbers are editorial
        for this mock. A public watch like{" "}
        <a
          href="https://live.gridwatch.ca/home-page.html"
          className="font-medium text-accent underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ontario’s Gridwatch
        </a>{" "}
        shows generation and demand every hour. Nigeria’s missing half is the feeder window.
      </p>

      <section aria-labelledby="rules-heading">
        <h2 id="rules-heading" className="font-serif text-2xl font-bold tracking-tight">
          How the watch works
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {GRID_STANDARD.name}, {GRID_STANDARD.inspiredBy}. Timestamp the MW. Name the feeder. Give
          a restoration window. Log the complaint. Skip a step and the street is back on WhatsApp.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {GRID_STANDARD.rollout.map((item) => (
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

      <section aria-labelledby="snapshot-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="snapshot-heading" className="font-serif text-2xl font-bold tracking-tight">
            National hour
          </h2>
          <p className="font-mono text-xs text-accent">{GRID_STANDARD.snapshotLabel}</p>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Generated versus unconstrained demand. The gap is load not served, factories that cannot
          schedule a shift. Solar is zero at 19:00; the peak is gas and hydro.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi
            label="Generated"
            value={formatMw(GRID_STANDARD.generatedMw)}
            hint={`Low ${formatMw(genRange.low)} · avg ${formatMw(genRange.avg)} · high ${formatMw(genRange.high)}`}
          />
          <Kpi
            label="Unconstrained demand"
            value={formatMw(GRID_STANDARD.unconstrainedDemandMw)}
            hint={`Low ${formatMw(demandRange.low)} · avg ${formatMw(demandRange.avg)} · high ${formatMw(demandRange.high)}`}
          />
          <Kpi label="Unserved" value={formatMw(gap)} hint="Demand the plants could not meet this hour" />
          <Kpi
            label="Import / export"
            value={`${formatMw(GRID_STANDARD.importMw)} in`}
            hint={`${formatMw(GRID_STANDARD.exportMw)} out · net ${formatMw(GRID_STANDARD.importMw - GRID_STANDARD.exportMw)}`}
          />
        </dl>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <Card className="p-5 lg:col-span-7">
            <p className="text-sm font-semibold">Today’s trend (schematic)</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Bars are unconstrained demand; the inner fill is generated. Hour 19 is this snapshot.
            </p>
            <ol className="mt-4 flex h-36 items-end gap-1" aria-hidden>
              {GRID_DAY.map((row) => {
                const peak = row.hour === 19;
                return (
                  <li key={row.hour} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                    <span
                      className={cn("relative w-full rounded-sm bg-muted", peak && "ring-2 ring-accent ring-offset-1 ring-offset-card")}
                      style={{ height: `${(row.demandMw / maxDay) * 100}%` }}
                    >
                      <span
                        className="absolute bottom-0 left-0 right-0 rounded-sm bg-accent/70"
                        style={{ height: `${(row.generatedMw / row.demandMw) * 100}%` }}
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-2 flex justify-between font-mono text-[0.65rem] text-muted-foreground">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:00 WAT</span>
            </p>
          </Card>

          <Card className="p-5 lg:col-span-5">
            <p className="text-sm font-semibold">Fuel mix this hour</p>
            <ul className="mt-4 space-y-3">
              {GRID_FUEL.map((slice) => {
                const pct = fuelShare(slice);
                return (
                  <li key={slice.id}>
                    <div className="flex justify-between text-sm">
                      <span>{FUEL_LABEL[slice.id]}</span>
                      <span className="font-mono text-xs text-accent">
                        {pct}% · {formatMw(slice.mw)}
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </section>

      <section aria-labelledby="plants-heading">
        <h2 id="plants-heading" className="font-serif text-2xl font-bold tracking-tight">
          Plants on this hour
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Output versus capability. Nameplate is not what the grid received. Click a plant for the
          note.
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {GRID_PLANTS.map((item) => {
            const active = item.id === plant.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setPlantId(item.id)}
                  className={cn(
                    "flex w-full items-baseline justify-between gap-2 rounded-xl border px-4 py-3 text-left transition",
                    active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                  )}
                >
                  <span>
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{FUEL_LABEL[item.fuel]}</span>
                  </span>
                  <span className="font-mono text-xs text-accent">
                    {formatMw(item.outputMw)} · {plantUtilisation(item)}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <Card className="mt-4 p-5">
          <p className="font-semibold">{plant.name}</p>
          <p className="mt-1 font-mono text-xs text-accent">
            {formatMw(plant.outputMw)} of {formatMw(plant.capabilityMw)} capability
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plant.note}</p>
        </Card>
      </section>

      <section aria-labelledby="feeders-heading" className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="feeders-heading" className="font-serif text-2xl font-bold tracking-tight">
            {DISCO_CLUSTERS.length} DisCo seeds
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Brighter dots publish feeder windows. A dark cluster is not ‘maybe on’, it is unpublished.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/40 p-2">
            <PostalCapitalMap
              selectedId={cluster?.capitalId ?? discoId}
              seedIds={seedIds}
              ariaLabel="State capitals of Nigeria. Seeded DisCo outage maps are marked. Select a capital to inspect feeders."
              onSelect={onMap}
            />
          </div>
          <ul className="mt-4 space-y-2">
            {DISCO_CLUSTERS.map((item) => {
              const active = item.id === cluster?.id;
              const counts = feederCounts(item);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onDisco(item.id)}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                      active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{discoCityName(item)}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.disco} · {item.publishes ? `${counts.on} on / ${counts.shed} shed` : "Not publishing"}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-accent">{item.feeders.length} feeders</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {cluster && feeder ? (
            <FeederDesk
              cluster={cluster}
              capitalName={capital.capital}
              stateName={capital.state}
              feeder={feeder}
              onSelectFeeder={setFeederId}
            />
          ) : (
            <Card className="p-5 md:p-6">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {capital.state}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{capital.capital}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Not a seed DisCo on this mock. The same gate still applies: named feeders, timestamps,
                a window when the circuit is off. Until then the hour is unpublished here.
              </p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

function FeederDesk({
  cluster,
  capitalName,
  stateName,
  feeder,
  onSelectFeeder,
}: {
  cluster: DiscoCluster;
  capitalName: string;
  stateName: string;
  feeder: GridFeeder;
  onSelectFeeder: (id: string) => void;
}) {
  const counts = feederCounts(cluster);

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {stateName} · {cluster.disco}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{capitalName}</h3>
        </div>
        <Badge variant={cluster.publishes ? "accent" : "muted"}>
          {cluster.publishes ? "Windows published" : "Not publishing"}
        </Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{cluster.summary}</p>
      {cluster.publishes ? (
        <p className="mt-2 font-mono text-xs text-accent">
          {counts.on} on · {counts.shed} shed · {counts.fault} fault · {counts.unknown} unknown
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          No timestamp, no window. The watch stays dark rather than guess.
        </p>
      )}

      <ul className="mt-5 space-y-2">
        {cluster.feeders.map((item) => {
          const active = item.id === feeder.id;
          const Priority = item.priority ? PRIORITY_ICON[item.priority] : null;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelectFeeder(item.id)}
                className={cn(
                  "flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left transition",
                  active ? "border-accent bg-accent/10" : "border-border bg-background hover:border-accent/40",
                )}
              >
                <span>
                  <span className="flex items-center gap-2">
                    {Priority ? <Priority className="size-3.5 text-accent" stroke={1.5} aria-hidden /> : null}
                    <span className="font-mono text-xs font-semibold text-accent">{item.postalCode}</span>
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.window}</span>
                </span>
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider",
                    STATUS_TONE[item.status],
                  )}
                >
                  {FEEDER_STATUS_LABEL[item.status]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 rounded-xl border border-border bg-background p-4">
        <p className="font-semibold">{feeder.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {feeder.place} · last ping {feeder.lastPing}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feeder.note}</p>
        <p className="mt-3 font-mono text-xs text-accent">
          Ticket against {feeder.id} · meter must match this feeder on the bill
        </p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link href="/projects/postal-codes" className="font-medium text-accent underline-offset-4 hover:underline">
            Postal code for this street
          </Link>
          {feeder.priority === "clinic" ? (
            <Link href="/projects/emergency-112" className="font-medium text-accent underline-offset-4 hover:underline">
              112 desk (clinic load)
            </Link>
          ) : null}
        </p>
      </div>
    </Card>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <dt className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <IconBolt className="size-3.5" stroke={1.5} aria-hidden />
        {label}
      </dt>
      <dd className="mt-2 font-mono text-xl font-semibold tracking-tight">{value}</dd>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
