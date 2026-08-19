"use client";

import { useMemo, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  BUDGET_JURISDICTIONS,
  BUDGET_STANDARD,
  CONTRACT_AWARDS,
  LAYER_LABEL,
  MDA_LINES,
  OPEN_TESTS,
  STATUS_LABEL,
  awardsForJurisdiction,
  envelopeShare,
  getJurisdiction,
  isOpenRow,
  isSignedThisWeek,
  jurisdictionStats,
  nationalAwardStats,
  searchAwards,
  type AwardLayer,
  type ContractAward,
} from "@/content/open-budgets";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";

const DEFAULT_JURISDICTION = "federal";
const DEFAULT_AWARD = "FC-WORKS-2026-0147";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

const LAYER_TONE: Record<AwardLayer, string> = {
  queryable: "bg-accent/15 text-accent",
  pdf: "border border-border bg-card text-foreground",
  missing: "bg-muted text-muted-foreground",
};

export function OpenBudgetBoard() {
  const [jurisdictionId, setJurisdictionId] = useState(DEFAULT_JURISDICTION);
  const [awardId, setAwardId] = useState(DEFAULT_AWARD);
  const [query, setQuery] = useState("");

  const jurisdiction = getJurisdiction(jurisdictionId) ?? BUDGET_JURISDICTIONS[0];
  const rows = awardsForJurisdiction(jurisdictionId);
  const award =
    CONTRACT_AWARDS.find((item) => item.id === awardId && item.jurisdictionId === jurisdictionId) ??
    rows[0];
  const stats = jurisdictionStats(jurisdictionId);
  const national = nationalAwardStats();
  const results = useMemo(() => searchAwards(query), [query]);
  const envelope = BUDGET_STANDARD.envelopeNaira;

  const onJurisdiction = (id: string) => {
    setJurisdictionId(id);
    setAwardId(awardsForJurisdiction(id)[0]?.id ?? "");
  };

  return (
    <div className="space-y-12">
      <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Envelope figures follow the {BUDGET_STANDARD.actTitle}, assented {BUDGET_STANDARD.assentedOn} (
        <a
          href={BUDGET_STANDARD.actUrl}
          className="font-medium text-accent underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          State House
        </a>
        ). Award rows are editorial. Supplier labels are classes. {BUDGET_STANDARD.snapshotLabel}.
      </p>

      <section aria-labelledby="portal-heading">
        <h2 id="portal-heading" className="font-serif text-2xl font-bold tracking-tight">
          How the portal works
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {BUDGET_STANDARD.name}, {BUDGET_STANDARD.inspiredBy}. Publish the envelope. Type the MDA
          table. Put buyer, supplier, amount, and date on one row. Federal and state share the fields.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {BUDGET_STANDARD.rollout.map((item) => (
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

      <section aria-labelledby="envelope-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="envelope-heading" className="font-serif text-2xl font-bold tracking-tight">
            {BUDGET_STANDARD.actYear} federal envelope
          </h2>
          <p className="font-mono text-xs text-accent">In force {BUDGET_STANDARD.inForceFrom}</p>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Aggregate {formatNaira(envelope.total)}. 2025 capital implementation extended to{" "}
          {BUDGET_STANDARD.priorCapitalExtendedTo}. MDA lines below are press totals at passage.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <EnvelopeStat label="Aggregate" value={formatNaira(envelope.total)} share="100%" accent />
          <EnvelopeStat
            label="Capital"
            value={formatNaira(envelope.capital)}
            share={envelopeShare(envelope.capital)}
          />
          <EnvelopeStat
            label="Recurrent"
            value={formatNaira(envelope.recurrent)}
            share={envelopeShare(envelope.recurrent)}
          />
          <EnvelopeStat
            label="Debt service"
            value={formatNaira(envelope.debtService)}
            share={envelopeShare(envelope.debtService)}
          />
          <EnvelopeStat
            label="Statutory"
            value={formatNaira(envelope.statutory)}
            share={envelopeShare(envelope.statutory)}
          />
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Schematic awards: {national.queryable} queryable of {national.total}, {national.thisWeek}{" "}
          signed in the snapshot week.
        </p>
      </section>

      <section aria-labelledby="mda-heading">
        <h2 id="mda-heading" className="font-serif text-2xl font-bold tracking-tight">
          MDA vintage at passage
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Recurrent and capital heads reported when the National Assembly passed the bill. Sortable
          here because they are a table.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">MDA</th>
                <th className="px-4 py-3">Bucket</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {MDA_LINES.map((line) => (
                <tr key={line.id}>
                  <td className="px-4 py-3 font-semibold">{line.name}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{line.bucket}</td>
                  <td className="px-4 py-3 font-mono text-accent">{formatNaira(line.naira)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{line.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="tests-heading">
        <h2 id="tests-heading" className="font-serif text-2xl font-bold tracking-tight">
          When a row is open
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Five tests. A journalist in Jos and a contractor in Aba open the same record.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {OPEN_TESTS.map((item) => (
            <li key={item.id} className="rounded-xl border border-border bg-card p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="lookup-heading" className="space-y-3">
        <h2 id="lookup-heading" className="font-serif text-2xl font-bold tracking-tight">
          Look up a sample award
        </h2>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <IconSearch className="size-5 shrink-0 text-muted-foreground" stroke={1.5} aria-hidden />
          <input
            type="search"
            value={query}
            maxLength={80}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Works, Jos, Aba, FC-WORKS-2026-0147, Garki…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search sample contract awards"
          />
        </div>
        {query.trim().length >= 2 ? (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {results.length === 0 ? (
              <li className="p-4 text-sm text-muted-foreground">No sample match in this mock portal.</li>
            ) : (
              results.map((hit) => {
                const city = getJurisdiction(hit.jurisdictionId);
                return (
                  <li key={hit.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setJurisdictionId(hit.jurisdictionId);
                        setAwardId(hit.id);
                        setQuery("");
                      }}
                      className="flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-muted"
                    >
                      <span className="font-mono text-sm font-semibold text-accent">{hit.id}</span>
                      <span className="text-sm">
                        {hit.title}
                        {city ? ` · ${city.city}` : ""}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {hit.buyer} · {isOpenRow(hit) ? "Open on this test" : LAYER_LABEL[hit.layer]}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        ) : null}
      </section>

      <section aria-labelledby="seeds-heading" className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="seeds-heading" className="font-serif text-2xl font-bold tracking-tight">
            {BUDGET_JURISDICTIONS.length} seed jurisdictions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            One federal envelope and five states. Jos and Aba are in the set on purpose.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {BUDGET_JURISDICTIONS.map((item) => {
              const active = item.id === jurisdictionId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onJurisdiction(item.id)}
                    className={cn(
                      "h-full w-full rounded-xl border p-3 text-left transition",
                      active
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card hover:border-accent/40",
                    )}
                  >
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {item.kind}
                    </span>
                    <span className="mt-1 block font-semibold">{item.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{item.city}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {award ? (
          <div className="lg:col-span-7">
            <AwardCard
              jurisdiction={jurisdiction}
              stats={stats}
              rows={rows}
              award={award}
              onSelect={setAwardId}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

function EnvelopeStat({
  label,
  value,
  share,
  accent,
}: {
  label: string;
  value: string;
  share: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        accent ? "border-accent bg-accent/10" : "border-border bg-card",
      )}
    >
      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 font-mono text-lg font-semibold text-accent">{value}</dd>
      <p className="mt-1 text-xs text-muted-foreground">{share} of the Act</p>
    </div>
  );
}

function AwardCard({
  jurisdiction,
  stats,
  rows,
  award,
  onSelect,
}: {
  jurisdiction: NonNullable<ReturnType<typeof getJurisdiction>>;
  stats: ReturnType<typeof jurisdictionStats>;
  rows: ContractAward[];
  award: ContractAward;
  onSelect: (id: string) => void;
}) {
  const open = isOpenRow(award);

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {jurisdiction.kind}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{jurisdiction.name}</h3>
        </div>
        <Badge>
          {stats.open} open / {stats.total} rows
        </Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{jurisdiction.summary}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {stats.queryable} queryable, {stats.pdf} PDF, {stats.missing} missing. {stats.thisWeek} signed
        this snapshot week.
      </p>

      <ul className="mt-5 space-y-2">
        {rows.map((item) => {
          const active = item.id === award.id;
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
                  <span className="block font-mono text-xs font-semibold text-accent">
                    {item.id}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{item.title}</span>
                </span>
                <span className={cn("shrink-0 rounded-md px-2 py-0.5 text-[0.65rem] uppercase tracking-wider", LAYER_TONE[item.layer])}>
                  {LAYER_LABEL[item.layer]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 rounded-xl border border-border bg-background p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-sm font-semibold text-accent">{award.ocid}</p>
            <p className="mt-1 font-semibold">{award.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{award.place}</p>
          </div>
          <Badge variant={open ? "accent" : "muted"}>{open ? "Open row" : LAYER_LABEL[award.layer]}</Badge>
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Buyer
            </dt>
            <dd className="mt-1">{award.buyer}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Supplier
            </dt>
            <dd className="mt-1">{award.supplier}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Amount
            </dt>
            <dd className="mt-1 font-mono text-accent">
              {award.naira === null ? "n/a" : formatNaira(award.naira)}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Signed
            </dt>
            <dd className="mt-1">
              {award.signedOn ? formatIsoDate(award.signedOn) : "n/a"}
              {isSignedThisWeek(award) ? " · this week" : ""}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1">{STATUS_LABEL[award.status]}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Layer
            </dt>
            <dd className="mt-1">{LAYER_LABEL[award.layer]}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{award.note}</p>
      </div>
    </Card>
  );
}
