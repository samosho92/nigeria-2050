"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  IconAmbulance,
  IconArrowLeft,
  IconArrowRight,
  IconFiretruck,
  IconPhoneCall,
  IconShield,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PostalCapitalMap } from "@/components/projects/PostalCapitalMap";
import { getPostalCapital, POSTAL_CAPITALS } from "@/content/postal-code-engine";
import {
  AGENCY_LABEL,
  AGENCY_PROTOCOL,
  DISPATCH_CLUSTERS,
  DISPATCH_INCIDENTS,
  DISPATCH_PIPELINE,
  EMERGENCY_STANDARD,
  UNIT_STATUS_LABEL,
  clusterCityName,
  dispatchSeedIds,
  formatBeatClock,
  getDispatchCluster,
  incidentsForCluster,
  languageLabel,
  launchVerdict,
  reportFor,
  type Agency,
  type DispatchBeat,
  type DispatchCluster,
  type DispatchIncident,
  type Speaker,
  type UnitStatus,
} from "@/content/emergency-112";
import { cn } from "@/lib/utils";

const DEFAULT_CLUSTER = "abuja";

const AGENCY_ICON: Record<Agency, TablerIcon> = {
  police: IconShield,
  fire: IconFiretruck,
  ambulance: IconAmbulance,
};

const UNIT_TONE: Record<UnitStatus, string> = {
  available: "bg-accent/15 text-accent",
  assigned: "border border-border bg-card text-foreground",
  "on-scene": "bg-accent text-accent-foreground",
  offline: "bg-muted text-muted-foreground",
};

const SPEAKER_LABEL: Record<Speaker, string> = {
  system: "Desk",
  taker: "Call-taker",
  caller: "Caller",
  dispatcher: "Dispatcher",
  unit: "Unit",
};

export function EmergencyDispatch() {
  const [clusterId, setClusterId] = useState(DEFAULT_CLUSTER);
  const [incidentId, setIncidentId] = useState(DISPATCH_INCIDENTS[0].id);
  const [beatIndex, setBeatIndex] = useState(0);
  const [pipelineId, setPipelineId] = useState(DISPATCH_PIPELINE[0].id);

  const seedIds = useMemo(() => dispatchSeedIds(), []);
  const cluster = getDispatchCluster(clusterId);
  const capital =
    getPostalCapital(cluster?.capitalId ?? clusterId) ?? POSTAL_CAPITALS[0];
  const verdict = cluster ? launchVerdict(cluster) : undefined;
  const clusterIncidents = cluster ? incidentsForCluster(cluster.id) : [];
  const incident =
    DISPATCH_INCIDENTS.find((item) => item.id === incidentId) ?? DISPATCH_INCIDENTS[0];
  const incidentOnCluster = cluster ? incident.clusterId === cluster.id : false;
  const activeIncident = incidentOnCluster ? incident : clusterIncidents[0];
  const report = cluster ? reportFor(cluster.id) : undefined;
  const selectedPipe = DISPATCH_PIPELINE.find((item) => item.id === pipelineId) ?? DISPATCH_PIPELINE[0];

  const onCluster = (id: string) => {
    const next = getDispatchCluster(id);
    setClusterId(next?.id ?? id);
    const first = next ? incidentsForCluster(next.id)[0] : undefined;
    if (first) {
      setIncidentId(first.id);
      setBeatIndex(0);
    }
  };

  const onMapSelect = (capitalId: string) => {
    const match = DISPATCH_CLUSTERS.find((item) => item.capitalId === capitalId);
    if (match) onCluster(match.id);
    else setClusterId(capitalId);
  };

  return (
    <div className="space-y-12">
      <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        112 is unpublished here. In a real emergency, use the numbers that currently work where you
        are. The desk below is a schematic of how dispatch should work once a cluster passes the
        launch gate.
      </p>

      <section aria-labelledby="pipeline-heading">
        <h2 id="pipeline-heading" className="font-serif text-2xl font-bold tracking-tight">
          How the desk works
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {EMERGENCY_STANDARD.name} is a nine-step desk. Answer in {EMERGENCY_STANDARD.answerSeconds}{" "}
          seconds. Locate on the postal code. Assign a unit the radio can hear. ACK in{" "}
          {EMERGENCY_STANDARD.ackSeconds} seconds or send the next unit. Skip a step and you have a
          hotline that dumps to voicemail.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {DISPATCH_PIPELINE.map((item) => {
            const active = item.id === selectedPipe.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setPipelineId(item.id)}
                  className={cn(
                    "h-full w-full rounded-xl border p-4 text-left transition",
                    active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                  )}
                >
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Step {item.step} · {item.clock}
                  </p>
                  <p className="mt-2 font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.owner}</p>
                </button>
              </li>
            );
          })}
        </ol>
        <Card className="mt-4 p-5">
          <p className="font-semibold">{selectedPipe.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selectedPipe.detail}</p>
          {selectedPipe.id === "locate" ? (
            <p className="mt-3 text-sm">
              <Link href="/projects/postal-codes" className="font-medium text-accent underline-offset-4 hover:underline">
                Open the postal code engine
              </Link>
            </p>
          ) : null}
        </Card>
      </section>

      <section aria-labelledby="protocol-heading">
        <h2 id="protocol-heading" className="font-serif text-2xl font-bold tracking-tight">
          Three protocol cards
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The caller does not pick the agency. The call-taker classifies, then reads a short card
          while the dispatcher assigns. Protocol runs in parallel with assign, it does not delay the
          radio.
        </p>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {(["ambulance", "fire", "police"] as Agency[]).map((agency) => {
            const Icon = AGENCY_ICON[agency];
            const card = AGENCY_PROTOCOL[agency];
            return (
              <li key={agency} className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-2 font-semibold">
                  <Icon className="size-4 text-accent" stroke={1.5} aria-hidden />
                  {card.title}
                </p>
                <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-sm text-muted-foreground">
                  {card.ask.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{card.never}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="clusters-heading" className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="clusters-heading" className="font-serif text-2xl font-bold tracking-tight">
            {DISPATCH_CLUSTERS.length} seed clusters
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start where the postal index already has a capital. Brighter dots are in this mock. A
            cluster that fails the launch gate does not get the number.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/40 p-2">
            <PostalCapitalMap
              selectedId={cluster?.capitalId ?? clusterId}
              seedIds={seedIds}
              ariaLabel="State capitals of Nigeria. Seeded 112 clusters are marked. Select a capital to inspect the desk."
              onSelect={onMapSelect}
            />
          </div>
          <ul className="mt-4 space-y-2">
            {DISPATCH_CLUSTERS.map((item) => {
              const active = item.id === cluster?.id;
              const ready = launchVerdict(item).ok;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onCluster(item.id)}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                      active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{clusterCityName(item)}</span>
                      <span className="text-xs text-muted-foreground">
                        {ready ? "112 on air" : "Not launched"} ·{" "}
                        {item.languages.map(languageLabel).join(" / ")}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-accent">{item.units.length} units</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {cluster && verdict ? (
            <ClusterDesk
              cluster={cluster}
              capitalName={capital.capital}
              stateName={capital.state}
              verdict={verdict}
              report={report}
              incidents={clusterIncidents}
              activeIncident={activeIncident}
              beatIndex={incidentOnCluster ? beatIndex : 0}
              onPickIncident={(id) => {
                setIncidentId(id);
                setBeatIndex(0);
              }}
              onBeatIndex={setBeatIndex}
            />
          ) : (
            <Card className="p-5 md:p-6">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {capital.state}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{capital.capital}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Not a seed cluster. The same gate still applies: night call-takers, a dispatcher, radio
                ACK, urban postal codes loaded. Until then 112 stays unpublished here, a voicemail
                number is worse than none.
              </p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

function ClusterDesk({
  cluster,
  capitalName,
  stateName,
  verdict,
  report,
  incidents,
  activeIncident,
  beatIndex,
  onPickIncident,
  onBeatIndex,
}: {
  cluster: DispatchCluster;
  capitalName: string;
  stateName: string;
  verdict: ReturnType<typeof launchVerdict>;
  report: ReturnType<typeof reportFor>;
  incidents: DispatchIncident[];
  activeIncident?: DispatchIncident;
  beatIndex: number;
  onPickIncident: (id: string) => void;
  onBeatIndex: (index: number) => void;
}) {
  const overflow = cluster.gate.overflowClusterId
    ? getDispatchCluster(cluster.gate.overflowClusterId)
    : undefined;

  return (
    <div className="space-y-4">
      <Card className="p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {stateName} · {cluster.psap}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{capitalName}</h3>
          </div>
          <Badge variant={verdict.ok ? "accent" : "muted"}>
            {verdict.ok ? "Launch gate passed" : "Launch gate failed"}
          </Badge>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{cluster.summary}</p>
        <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <dt className="uppercase tracking-wider text-muted-foreground">Night call-takers</dt>
            <dd className="mt-0.5 font-mono font-semibold">{cluster.gate.nightCallTakers}</dd>
          </div>
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <dt className="uppercase tracking-wider text-muted-foreground">Dispatchers</dt>
            <dd className="mt-0.5 font-mono font-semibold">{cluster.gate.dispatchers}</dd>
          </div>
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <dt className="uppercase tracking-wider text-muted-foreground">Radio ACK</dt>
            <dd className="mt-0.5 font-semibold">
              {(Object.keys(cluster.gate.radio) as Agency[])
                .filter((agency) => cluster.gate.radio[agency])
                .map((agency) => AGENCY_LABEL[agency])
                .join(" · ") || "None"}
            </dd>
          </div>
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <dt className="uppercase tracking-wider text-muted-foreground">Overflow</dt>
            <dd className="mt-0.5 font-semibold">
              {overflow ? clusterCityName(overflow) : "None"}
            </dd>
          </div>
        </dl>
        {verdict.ok ? (
          <p className="mt-4 text-xs text-muted-foreground">
            Night voicemail is off. Urban postal codes are loaded. The number may be published.
          </p>
        ) : (
          <ul className="mt-4 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {verdict.blockers.map((blocker) => (
              <li key={blocker}>{blocker}</li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="p-5 md:p-6">
        <h4 className="font-semibold">Roster</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Available means the radio is on the desk. Offline is a phone in a yard.
        </p>
        <ul className="mt-3 space-y-2">
          {cluster.units.map((unit) => {
            const Icon = AGENCY_ICON[unit.agency];
            return (
              <li
                key={unit.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-3 py-2"
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4 text-accent" stroke={1.5} aria-hidden />
                  <span>
                    <span className="block font-mono text-xs font-semibold text-accent">{unit.callSign}</span>
                    <span className="text-xs text-muted-foreground">
                      {unit.base} · {unit.covers}
                    </span>
                  </span>
                </span>
                <span className={cn("rounded-md px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider", UNIT_TONE[unit.status])}>
                  {UNIT_STATUS_LABEL[unit.status]}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {verdict.ok && activeIncident ? (
        <TicketPlay
          incidents={incidents}
          incident={activeIncident}
          beatIndex={beatIndex}
          onPickIncident={onPickIncident}
          onBeatIndex={onBeatIndex}
        />
      ) : (
        <Card className="p-5 md:p-6">
          <h4 className="font-semibold">No live tickets</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            112 is not published for this cluster. A caller tonight would hit voicemail. The overflow
            desk in {overflow ? clusterCityName(overflow) : "another cluster"} cannot cover a city that
            never staffed its own night line. Fix the gate, then print the number.
          </p>
        </Card>
      )}

      {report ? (
        <Card className="p-5 md:p-6">
          <h4 className="font-semibold">Public report</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {report.weekLabel}. Weekly medians from this schematic. Editorial numbers.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
            <ReportStat label="Calls" value={String(report.calls)} />
            <ReportStat label="Answer" value={`${report.answerSec}s`} />
            <ReportStat label="Dispatch" value={`${report.dispatchSec}s`} />
            <ReportStat label="ACK" value={`${report.ackPct}%`} />
          </dl>
          <p className="mt-3 font-mono text-xs text-accent">Voicemail {report.voicemailPct}%</p>
        </Card>
      ) : null}
    </div>
  );
}

function TicketPlay({
  incidents,
  incident,
  beatIndex,
  onPickIncident,
  onBeatIndex,
}: {
  incidents: DispatchIncident[];
  incident: DispatchIncident;
  beatIndex: number;
  onPickIncident: (id: string) => void;
  onBeatIndex: (index: number) => void;
}) {
  const safeIndex = Math.min(beatIndex, incident.beats.length - 1);
  const visible = incident.beats.slice(0, safeIndex + 1);
  const current = incident.beats[safeIndex];
  const atEnd = safeIndex >= incident.beats.length - 1;

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <IconPhoneCall className="size-3.5" stroke={1.5} aria-hidden />
            Ticket · 112
          </p>
          <h4 className="mt-1 font-serif text-xl font-bold tracking-tight">{incident.title}</h4>
        </div>
        <span className="font-mono text-sm font-semibold text-accent">{incident.code}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{incident.summary}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {languageLabel(incident.language)} · {incident.place} · {incident.band} ·{" "}
        {incident.agencies.map((agency) => AGENCY_LABEL[agency]).join(" + ")}
      </p>

      {incidents.length > 1 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {incidents.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onPickIncident(item.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                  item.id === incident.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {item.code}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <ol className="mt-5 space-y-2">
        {visible.map((beat, index) => (
          <BeatRow key={`${beat.t}-${beat.line}`} beat={beat} active={index === safeIndex} />
        ))}
      </ol>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {current ? DISPATCH_PIPELINE.find((item) => item.id === current.stage)?.title : null} · beat{" "}
          {safeIndex + 1} of {incident.beats.length}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onBeatIndex(Math.max(0, safeIndex - 1))}
            disabled={safeIndex === 0}
          >
            <IconArrowLeft className="size-3.5" stroke={1.5} aria-hidden />
            Previous
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => onBeatIndex(atEnd ? 0 : safeIndex + 1)}
          >
            {atEnd ? "Replay" : "Next beat"}
            {atEnd ? null : <IconArrowRight className="size-3.5" stroke={1.5} aria-hidden />}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function BeatRow({ beat, active }: { beat: DispatchBeat; active: boolean }) {
  return (
    <li
      className={cn(
        "rounded-xl border px-3 py-2",
        active ? "border-accent bg-accent/10" : "border-border bg-background",
      )}
    >
      <p className="flex flex-wrap items-baseline gap-2 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        <span className="font-mono text-accent">{formatBeatClock(beat.t)}</span>
        <span>{SPEAKER_LABEL[beat.speaker]}</span>
        <span>{DISPATCH_PIPELINE.find((item) => item.id === beat.stage)?.title}</span>
      </p>
      <p className="mt-1 text-sm leading-relaxed">{beat.line}</p>
    </li>
  );
}

function ReportStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/50 px-3 py-2">
      <dt className="uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-mono text-sm font-semibold">{value}</dd>
    </div>
  );
}
