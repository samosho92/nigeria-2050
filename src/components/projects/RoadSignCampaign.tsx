"use client";

import { useMemo, useState } from "react";
import { IconMapPin } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { RoadSignPlate } from "@/components/projects/RoadSignPlate";
import { PostalCapitalMap } from "@/components/projects/PostalCapitalMap";
import { getPostalCapital } from "@/content/postal-code-engine";
import {
  POST_STATUS_LABEL,
  ROAD_SIGN_CATALOG,
  ROAD_SIGN_CORRIDORS,
  ROAD_SIGN_STANDARD,
  corridorCoverage,
  getRoadSign,
  getSignCorridor,
  type PostStatus,
} from "@/content/road-signs";
import { cn } from "@/lib/utils";

const DEFAULT_CORRIDOR = "lagos-ibadan";

const STATUS_TONE: Record<PostStatus, string> = {
  installed: "bg-accent/15 text-accent",
  missing: "bg-muted text-muted-foreground",
  damaged: "border border-border bg-card text-foreground",
};

export function RoadSignCampaign() {
  const [corridorId, setCorridorId] = useState(DEFAULT_CORRIDOR);
  const [signId, setSignId] = useState(ROAD_SIGN_CATALOG[0].id);
  const [postId, setPostId] = useState<string | undefined>(
    ROAD_SIGN_CORRIDORS[0]?.posts[0]?.id,
  );
  const [mapFocusId, setMapFocusId] = useState(ROAD_SIGN_CORRIDORS[0].fromId);

  const corridor = getSignCorridor(corridorId) ?? ROAD_SIGN_CORRIDORS[0];
  const selectedSign = getRoadSign(signId) ?? ROAD_SIGN_CATALOG[0];
  const coverage = useMemo(() => corridorCoverage(corridor), [corridor]);
  const selectedPost = corridor.posts.find((post) => post.id === postId) ?? corridor.posts[0];
  const from = getPostalCapital(corridor.fromId);
  const to = getPostalCapital(corridor.toId);

  const onCorridor = (id: string, focusId?: string) => {
    const next = getSignCorridor(id);
    setCorridorId(id);
    setPostId(next?.posts[0]?.id);
    setMapFocusId(focusId ?? next?.fromId ?? ROAD_SIGN_CORRIDORS[0].fromId);
  };

  return (
    <div className="space-y-12">
      <section aria-labelledby="standard-heading">
        <h2 id="standard-heading" className="font-serif text-2xl font-bold tracking-tight">
          One shape book
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {ROAD_SIGN_STANDARD.name}, {ROAD_SIGN_STANDARD.inspiredBy}. States do not invent their own
          triangles. This mock is a campaign plan.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {ROAD_SIGN_STANDARD.rollout.map((item) => (
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

      <section aria-labelledby="catalog-heading">
        <h2 id="catalog-heading" className="font-serif text-2xl font-bold tracking-tight">
          Sign catalog
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Seven plates cover the campaign: three speeds, stop, yield, school zone, kilometre marker.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ROAD_SIGN_CATALOG.map((sign) => {
            const active = sign.id === selectedSign.id;
            return (
              <li key={sign.id}>
                <button
                  type="button"
                  onClick={() => setSignId(sign.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
                    active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                  )}
                >
                  <RoadSignPlate sign={sign} size="sm" />
                  <span>
                    <span className="block font-mono text-[0.65rem] font-semibold text-accent">{sign.code}</span>
                    <span className="block text-sm font-semibold">{sign.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <Card className="mt-4 p-5">
          <p className="font-mono text-xs font-semibold text-accent">{selectedSign.code}</p>
          <p className="mt-1 font-semibold">{selectedSign.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selectedSign.detail}</p>
        </Card>
      </section>

      <section aria-labelledby="corridors-heading" className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="corridors-heading" className="font-serif text-2xl font-bold tracking-tight">
            {ROAD_SIGN_CORRIDORS.length} seed corridors
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start on roads that already connect capitals. Dots are the same schematic map as the
            postal mock.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/40 p-2">
            <PostalCapitalMap
              selectedId={mapFocusId}
              ariaLabel="State capitals of Nigeria. Select a capital on a seed corridor to open that road-sign campaign."
              onSelect={(id) => {
                const match = ROAD_SIGN_CORRIDORS.find(
                  (item) => item.fromId === id || item.toId === id,
                );
                if (match) onCorridor(match.id, id);
              }}
            />
          </div>
          <ul className="mt-4 space-y-2">
            {ROAD_SIGN_CORRIDORS.map((item) => {
              const active = item.id === corridor.id;
              const stats = corridorCoverage(item);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onCorridor(item.id)}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                      active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.highway} · {stats.installed}/{stats.total} installed
                      </span>
                    </span>
                    <span className="font-mono text-xs text-accent">{item.km} km</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <Card className="p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {corridor.highway} · {from?.capital} → {to?.capital}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{corridor.name}</h3>
              </div>
              <Badge>
                {coverage.installed} up / {coverage.missing} missing / {coverage.damaged} damaged
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{corridor.summary}</p>

            <div className="relative mt-8 mb-2 h-3 rounded-full bg-muted">
              <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-accent/25" aria-hidden />
              {corridor.posts.map((post) => {
                const left = Math.min(96, Math.max(2, (post.km / corridor.km) * 100));
                const active = post.id === selectedPost.id;
                return (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => {
                      setPostId(post.id);
                      setSignId(post.signId);
                    }}
                    style={{ left: `${left}%` }}
                    className={cn(
                      "absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background",
                      post.status === "installed" && "bg-accent",
                      post.status === "missing" && "bg-muted-foreground/40",
                      post.status === "damaged" && "bg-foreground",
                      active && "ring-2 ring-accent ring-offset-2 ring-offset-card",
                    )}
                    aria-label={`${post.place}, km ${post.km}, ${POST_STATUS_LABEL[post.status]}`}
                  />
                );
              })}
            </div>
            <p className="flex justify-between text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              <span>Km 0 · {from?.capital}</span>
              <span>
                Km {corridor.km} · {to?.capital}
              </span>
            </p>

            <ol className="mt-6 space-y-2">
              {corridor.posts.map((post) => {
                const sign = getRoadSign(post.signId);
                if (!sign) return null;
                const active = post.id === selectedPost.id;
                return (
                  <li key={post.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setPostId(post.id);
                        setSignId(post.signId);
                      }}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition",
                        active ? "border-accent bg-accent/10" : "border-border bg-background hover:border-accent/40",
                      )}
                    >
                      <RoadSignPlate
                        sign={sign}
                        size="sm"
                        marker={sign.kind === "km" ? String(post.km) : undefined}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-accent">Km {post.km}</span>
                          <span
                            className={cn(
                              "rounded-md px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider",
                              STATUS_TONE[post.status],
                            )}
                          >
                            {POST_STATUS_LABEL[post.status]}
                          </span>
                        </span>
                        <span className="mt-1 block text-sm font-semibold">{post.place}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{post.note}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <IconMapPin className="mt-0.5 size-3.5 shrink-0" stroke={1.5} aria-hidden />
              Installed means a readable plate on this schematic. Missing is the campaign. Damaged
              still counts as a gap.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
