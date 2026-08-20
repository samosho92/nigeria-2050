"use client";

import { useCallback, useRef, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import type { ComparatorMetric } from "@/types/content";
import { AnimatedCounter } from "@/components/motion";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { comparatorCounterProps, formatComparatorValue } from "@/lib/comparator-format";
import { SCENARIO_UI_NOTE } from "@/content/methodology";

interface MorphSliderProps {
  metrics: ComparatorMetric[];
  activeMetricIndex?: number;
  onActiveMetricChange?: (index: number) => void;
  scenario2050?: number;
  baseline2050?: number;
  selectedLeverCount?: number;
}

export function MorphSlider({
  metrics,
  activeMetricIndex: controlledIndex,
  onActiveMetricChange,
  scenario2050,
  baseline2050,
  selectedLeverCount = 0,
}: MorphSliderProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeMetric = controlledIndex ?? internalIndex;
  const setActiveMetric = onActiveMetricChange ?? setInternalIndex;

  const metric = metrics[activeMetric];
  const target2050 = scenario2050 ?? metric.projected2050;
  const base2050 = baseline2050 ?? metric.projected2050;
  const showAdjusted = Math.abs(target2050 - base2050) > 0.01;

  const interpolated = metric.current + (target2050 - metric.current) * (position / 100);

  const handlePointer = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {metrics.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setActiveMetric(i);
              trackEvent({ name: "morph_slider_use", metric: m.id });
            }}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition",
              activeMetric === i
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border">
        <div
          className="relative h-48 transition-[filter] duration-300 lg:h-64"
          style={{
            background: `linear-gradient(to top, var(--accent) ${position * 0.4}%, var(--surface) ${position * 0.8 + 20}%)`,
            filter: `saturate(${0.5 + position / 100}) brightness(${0.7 + (position / 100) * 0.4})`,
          }}
        >
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={`M0 80 L0 ${60 - position * 0.2} L40 ${55 - position * 0.25} L80 ${50 - position * 0.3} L120 ${45 - position * 0.35} L160 ${40 - position * 0.4} L200 ${35 - position * 0.45} L240 ${38 - position * 0.42} L280 ${42 - position * 0.38} L320 ${48 - position * 0.32} L360 ${52 - position * 0.28} L400 ${55 - position * 0.25} L400 80 Z`}
              fill="var(--foreground)"
              opacity={0.15 + position / 200}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center gap-6 px-6 lg:gap-8">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Now</p>
              <p className="text-2xl font-bold lg:text-4xl">
                {formatComparatorValue(metric.current, metric.unit)}
              </p>
            </div>
            <IconArrowRight className="size-8 text-accent opacity-60" stroke={1.5} aria-hidden />
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-accent">
                2050{showAdjusted ? " with projects" : " scenario"}
              </p>
              <p className="text-2xl font-bold text-accent lg:text-4xl">
                {formatComparatorValue(target2050, metric.unit)}
              </p>
              {showAdjusted && (
                <p className="mt-1 text-xs text-muted-foreground line-through">
                  Base: {formatComparatorValue(base2050, metric.unit)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Drag to morph, {metric.label} at{" "}
            <span className="font-bold text-foreground">
              {Math.round(2024 + (2050 - 2024) * (position / 100))}
            </span>
            {selectedLeverCount > 0 && (
              <span className="block mt-1 text-xs font-medium text-accent">
                {selectedLeverCount} project{selectedLeverCount === 1 ? "" : "s"} selected
              </span>
            )}
            <span className="block mt-1 text-xs font-normal">{SCENARIO_UI_NOTE}</span>
          </p>
          <p className="mt-2 text-3xl font-bold text-accent">
            {showAdjusted ? (
              formatComparatorValue(interpolated, metric.unit)
            ) : (
              <AnimatedCounter
                key={`${metric.id}-${interpolated}`}
                value={interpolated}
                decimals={metric.unit === "USD" ? 0 : 1}
                suffix={comparatorCounterProps(metric).suffix}
                prefix={comparatorCounterProps(metric).prefix}
              />
            )}
          </p>
        </div>

        <div className="border-t border-border bg-surface p-6">
          <div
            ref={trackRef}
            className="relative h-3 cursor-pointer rounded-full bg-muted"
            onMouseDown={(e) => {
              handlePointer(e.clientX);
              const move = (ev: MouseEvent) => handlePointer(ev.clientX);
              const up = () => {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseup", up);
              };
              window.addEventListener("mousemove", move);
              window.addEventListener("mouseup", up);
            }}
            onTouchStart={(e) => handlePointer(e.touches[0].clientX)}
            onTouchMove={(e) => handlePointer(e.touches[0].clientX)}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-label={`Morph slider for ${metric.label}`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-75"
              style={{ width: `${position}%` }}
            />
            <div
              className="absolute top-1/2 size-6 -translate-y-1/2 rounded-full border-2 border-accent bg-background shadow-md transition-[left] duration-75"
              style={{ left: `calc(${position}% - 12px)` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Nigeria now (sourced)</span>
            <span>2050 with your picks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
