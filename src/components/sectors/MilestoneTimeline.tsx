"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IconTarget } from "@tabler/icons-react";
import type { SectorProjection } from "@/types/content";
import { FadeIn } from "@/components/motion";
import { useMounted } from "@/hooks/useMounted";

interface MilestoneTimelineProps {
  projections: SectorProjection[];
}

export function MilestoneTimeline({ projections }: MilestoneTimelineProps) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px"
        aria-hidden
      />
      <div className="space-y-12">
        {projections.map((projection, i) => (
          <FadeIn key={projection.year} delay={i * 0.1}>
            <div
              className={`relative flex flex-col gap-4 md:flex-row ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden md:block md:w-1/2" />
              {mounted && !prefersReducedMotion ? (
                <motion.div
                  className="absolute left-4 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background md:left-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: i * 0.1 }}
                >
                  <span className="text-xs font-bold text-accent">{projection.year}</span>
                </motion.div>
              ) : (
                <div className="absolute left-4 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background md:left-1/2">
                  <span className="text-xs font-bold text-accent">{projection.year}</span>
                </div>
              )}
              <div className="ml-12 md:ml-0 md:w-1/2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <IconTarget className="size-4 text-accent" stroke={1.5} aria-hidden />
                    <span className="text-sm font-bold text-accent">{projection.year}</span>
                  </div>
                  <h3 className="text-lg font-bold">{projection.headline}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{projection.narrative}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(projection.metrics).map(([key, val]) => (
                      <span
                        key={key}
                        className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground"
                      >
                        {key.replace(/([A-Z])/g, " $1")}: {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
