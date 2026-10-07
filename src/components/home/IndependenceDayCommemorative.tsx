"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, FadeIn } from "@/components/motion";
import { LinkButton } from "@/components/ui/LinkButton";
import { INDEPENDENCE_DAY_COPY, INDEPENDENCE_DAY_SEASON } from "@/content/independence-day";
import { trackEvent } from "@/lib/analytics";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

function FlagMotif({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-y-0 left-0 flex w-3", className)}
      aria-hidden
    >
      <span className="w-1 bg-accent" />
      <span className="w-1 bg-background" />
      <span className="w-1 bg-accent" />
    </div>
  );
}

function HorizonGraphic({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 420 160"
      className="h-full w-full text-accent"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="ind-horizon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="140" height="160" fill="currentColor" opacity="0.12" />
      <rect x="140" y="0" width="140" height="160" fill="var(--background)" opacity="0.9" />
      <rect x="280" y="0" width="140" height="160" fill="currentColor" opacity="0.12" />
      {animate ? (
        <motion.path
          d="M24 118 C90 70, 150 140, 210 96 C270 52, 330 120, 396 78"
          stroke="url(#ind-horizon)"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      ) : (
        <path
          d="M24 118 C90 70, 150 140, 210 96 C270 52, 330 120, 396 78"
          stroke="url(#ind-horizon)"
          strokeWidth="2.5"
        />
      )}
      <circle cx="48" cy="108" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="210" cy="96" r="4" fill="currentColor" opacity="0.9" />
      <circle cx="372" cy="84" r="4" fill="currentColor" />
    </svg>
  );
}

export function IndependenceDayCommemorative() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { enabled: dataSaver } = useDataSaver();
  const animate = mounted && !prefersReducedMotion && !dataSaver;

  const trackCta = (destination: string) => {
    trackEvent({ name: "independence_day_cta", destination });
  };

  return (
    <FadeIn>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
        <FlagMotif />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_55%)]"
          aria-hidden
        />

        <div className="relative grid gap-8 p-6 pl-8 sm:p-8 sm:pl-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-10 lg:pl-12">
          <div>
            <p className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="size-1.5 shrink-0 bg-accent" aria-hidden />
              {INDEPENDENCE_DAY_COPY.eyebrow}
            </p>

            <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
              <p className="font-serif text-[clamp(4.5rem,16vw,7.5rem)] font-bold leading-none tracking-tight text-accent">
                {animate ? (
                  <AnimatedCounter value={INDEPENDENCE_DAY_SEASON.yearsSinceIndependence} duration={1.2} />
                ) : (
                  INDEPENDENCE_DAY_SEASON.yearsSinceIndependence
                )}
              </p>
              <div className="pb-2">
                <p className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  {INDEPENDENCE_DAY_COPY.titleYearsLabel}
                  <br />
                  {INDEPENDENCE_DAY_COPY.titleDate}
                </p>
                <p className="mt-2 text-sm font-medium text-accent">
                  {INDEPENDENCE_DAY_COPY.yearsTo2050Label(INDEPENDENCE_DAY_SEASON.yearsTo2050)}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {INDEPENDENCE_DAY_COPY.lead(INDEPENDENCE_DAY_SEASON.yearsTo2050)}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton
                href={INDEPENDENCE_DAY_COPY.primaryCta.href}
                variant="primary"
                onClick={() => trackCta("timeline-independence")}
              >
                {INDEPENDENCE_DAY_COPY.primaryCta.label}
                <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
              </LinkButton>
              <LinkButton
                href={INDEPENDENCE_DAY_COPY.secondaryCta.href}
                variant="secondary"
                onClick={() => trackCta("compare")}
              >
                {INDEPENDENCE_DAY_COPY.secondaryCta.label}
              </LinkButton>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="h-28 overflow-hidden rounded-xl border border-border/70 bg-background/60 sm:h-36">
              <HorizonGraphic animate={Boolean(animate)} />
            </div>

            <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {INDEPENDENCE_DAY_COPY.beats.map((beat, index) => (
                <li key={beat.id}>
                  <Link
                    href={beat.href}
                    onClick={() => trackCta(`beat-${beat.id}`)}
                    className="group flex h-full items-start gap-3 rounded-xl border border-border bg-card px-3 py-3 transition hover:border-accent hover:bg-surface-elevated"
                  >
                    <span className="font-serif text-xl font-bold tabular-nums text-accent">
                      {beat.year}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-accent">
                        {beat.label}
                        <IconArrowRight
                          className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                          stroke={1.5}
                          aria-hidden
                        />
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {beat.detail}
                      </span>
                    </span>
                    <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:inline">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
