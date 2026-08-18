"use client";

import { useMemo, useState } from "react";
import {
  IconBolt,
  IconBook2,
  IconDroplet,
  IconMoodKid,
  IconUser,
  IconWifi,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PostalCapitalMap } from "@/components/projects/PostalCapitalMap";
import { getPostalCapital, POSTAL_CAPITALS } from "@/content/postal-code-engine";
import {
  BRANCH_KIND_LABEL,
  KIT_STATUS_LABEL,
  LIBRARY_CATALOGUE,
  LIBRARY_KIT,
  LIBRARY_STANDARD,
  LIBRARY_SYSTEMS,
  floorMet,
  getLibrarySystem,
  kitComplete,
  kitGaps,
  librarySeedIds,
  walkableBranches,
  type KitId,
  type KitStatus,
  type LibraryBranch,
} from "@/content/public-libraries";
import { cn } from "@/lib/utils";

const DEFAULT_CITY = "abuja";
const DEFAULT_TITLE = "tfa";
const REQUEST_TO = "maiduguri";

const KIT_ICON: Record<KitId, TablerIcon> = {
  children: IconMoodKid,
  seats: IconBook2,
  toilets: IconDroplet,
  power: IconBolt,
  librarian: IconUser,
  wifi: IconWifi,
};

const KIT_TONE: Record<KitStatus, string> = {
  present: "bg-accent/15 text-accent",
  missing: "bg-muted text-muted-foreground",
  broken: "border border-border bg-card text-foreground",
};

export function LibraryNetwork() {
  const [capitalId, setCapitalId] = useState(DEFAULT_CITY);
  const [branchId, setBranchId] = useState(LIBRARY_SYSTEMS[0].branches[0].id);
  const [kitId, setKitId] = useState<KitId>(LIBRARY_KIT[0].id);
  const [titleId, setTitleId] = useState(DEFAULT_TITLE);

  const seedIds = useMemo(() => librarySeedIds(), []);
  const system = getLibrarySystem(capitalId);
  const capital = getPostalCapital(capitalId) ?? POSTAL_CAPITALS.find((city) => city.id === DEFAULT_CITY)!;
  const selectedKit = LIBRARY_KIT.find((item) => item.id === kitId) ?? LIBRARY_KIT[0];
  const selectedBranch =
    system?.branches.find((branch) => branch.id === branchId) ?? system?.branches[0];
  const title = LIBRARY_CATALOGUE.find((item) => item.id === titleId) ?? LIBRARY_CATALOGUE[0];
  const requestTo = getPostalCapital(REQUEST_TO);

  const onCapital = (id: string) => {
    setCapitalId(id);
    const next = getLibrarySystem(id);
    setBranchId(next?.branches[0]?.id ?? "");
  };

  return (
    <div className="space-y-12">
      <section aria-labelledby="floor-heading">
        <h2 id="floor-heading" className="font-serif text-2xl font-bold tracking-tight">
          A floor, then denser
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {LIBRARY_STANDARD.name} — {LIBRARY_STANDARD.inspiredBy}. {LIBRARY_STANDARD.ruralFloorKm} km
          is the rural floor. Cities walk {LIBRARY_STANDARD.urbanWalkKm} km, or one branch per{" "}
          {LIBRARY_STANDARD.urbanPerPeople.toLocaleString("en-NG")} people. This mock is a coverage
          plan, not a National Library inventory.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {LIBRARY_STANDARD.rollout.map((item) => (
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

      <section aria-labelledby="kit-heading">
        <h2 id="kit-heading" className="font-serif text-2xl font-bold tracking-tight">
          Minimum kit
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Six things every branch owes the room. Present, missing, or broken on this schematic —
          illustrative, not a surveyed audit.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LIBRARY_KIT.map((item) => {
            const Icon = KIT_ICON[item.id];
            const active = item.id === selectedKit.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setKitId(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
                    active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                  )}
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon className="size-5" stroke={1.5} aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <Card className="mt-4 p-5">
          <p className="font-semibold">{selectedKit.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selectedKit.detail}</p>
        </Card>
      </section>

      <section aria-labelledby="systems-heading" className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="systems-heading" className="font-serif text-2xl font-bold tracking-tight">
            {LIBRARY_SYSTEMS.length} seed systems
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Brighter dots are seeded. The other capitals still owe the same floor; they are not drawn
            as branches on this mock.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/40 p-2">
            <PostalCapitalMap
              selectedId={capitalId}
              seedIds={seedIds}
              ariaLabel="State capitals of Nigeria. Seeded library systems are marked. Select a capital to inspect coverage."
              onSelect={onCapital}
            />
          </div>
          <ul className="mt-4 space-y-2">
            {LIBRARY_SYSTEMS.map((item) => {
              const active = item.capitalId === capitalId;
              const city = getPostalCapital(item.capitalId);
              return (
                <li key={item.capitalId}>
                  <button
                    type="button"
                    onClick={() => onCapital(item.capitalId)}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                      active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{city?.capital}</span>
                      <span className="text-xs text-muted-foreground">
                        {floorMet(item) ? "Floor met" : "Floor missed"} · {walkableBranches(item)} walkable
                      </span>
                    </span>
                    <span className="font-mono text-xs text-accent">{item.hinterlandKm} km</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {system && selectedBranch ? (
            <SeededSystem
              capitalName={capital.capital}
              stateName={capital.state}
              system={system}
              selectedBranch={selectedBranch}
              onSelectBranch={(id) => setBranchId(id)}
            />
          ) : (
            <Card className="p-5 md:p-6">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {capital.state}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{capital.capital}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Not seeded on this mock. The floor still applies: one staffed library within{" "}
                {LIBRARY_STANDARD.ruralFloorKm} km of {capital.rural.name}, then urban densify from{" "}
                {capital.urban.name}. Eight systems are drawn; the other capitals wait on the same
                standard.
              </p>
            </Card>
          )}
        </div>
      </section>

      <section aria-labelledby="catalogue-heading">
        <h2 id="catalogue-heading" className="font-serif text-2xl font-bold tracking-tight">
          A title in Makurdi, requested in Maiduguri
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Legal-deposit copies on a national catalogue. Holdings are editorial for the mock — not a
          live union catalogue.
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {LIBRARY_CATALOGUE.map((item) => {
            const active = item.id === title.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setTitleId(item.id)}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left transition",
                    active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                  )}
                >
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.author}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <Card className="mt-4 p-5">
          <p className="font-semibold">{title.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{title.author}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Held at {title.heldAt.map((id) => getPostalCapital(id)?.capital ?? id).join(", ")} on this
            schematic.
            {title.heldAt.includes("makurdi") && title.id === "tfa" ? (
              <>
                {" "}
                Request to {requestTo?.capital}: the van leaves High Level. The receiving desk exists;
                toilets and wifi there are down — a blank room is not a reading room, but the request
                still parks.
              </>
            ) : title.heldAt.includes(REQUEST_TO) ? (
              <> A copy is already in {requestTo?.capital} on this schematic.</>
            ) : (
              <>
                {" "}
                {requestTo?.capital} does not hold this title here. The same catalogue request would
                still travel if a receiving desk is staffed.
              </>
            )}
          </p>
        </Card>
      </section>
    </div>
  );
}

function SeededSystem({
  capitalName,
  stateName,
  system,
  selectedBranch,
  onSelectBranch,
}: {
  capitalName: string;
  stateName: string;
  system: NonNullable<ReturnType<typeof getLibrarySystem>>;
  selectedBranch: LibraryBranch;
  onSelectBranch: (id: string) => void;
}) {
  const complete = system.branches.filter(kitComplete).length;
  const walkable = walkableBranches(system);

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
          {floorMet(system) ? "Floor met" : "Floor missed"} · {walkable} walkable · {complete} full kit
        </Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{system.summary}</p>
      <p className="mt-2 font-mono text-xs text-accent">
        Farthest named place: {system.hinterlandPlace} · {system.hinterlandKm} km
      </p>

      <ol className="mt-6 space-y-2">
        {system.branches.map((branch) => {
          const active = branch.id === selectedBranch.id;
          const gaps = kitGaps(branch);
          return (
            <li key={branch.id}>
              <button
                type="button"
                onClick={() => onSelectBranch(branch.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition",
                  active ? "border-accent bg-accent/10" : "border-border bg-background hover:border-accent/40",
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {branch.kmFromCentre} km
                    </span>
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
                      {BRANCH_KIND_LABEL[branch.kind]}
                    </span>
                    <span className="text-[0.65rem] text-muted-foreground">
                      {gaps === 0 ? "Full kit" : `${gaps} kit gap${gaps === 1 ? "" : "s"}`}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{branch.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{branch.note}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 rounded-xl border border-border bg-background p-4">
        <p className="text-sm font-semibold">{selectedBranch.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">{selectedBranch.place}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {LIBRARY_KIT.map((item) => {
            const status = selectedBranch.kit[item.id];
            const Icon = KIT_ICON[item.id];
            return (
              <li
                key={item.id}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.65rem] font-medium",
                  KIT_TONE[status],
                )}
              >
                <Icon className="size-3.5" stroke={1.5} aria-hidden />
                {item.title}
                <span className="uppercase tracking-wider opacity-80">{KIT_STATUS_LABEL[status]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
