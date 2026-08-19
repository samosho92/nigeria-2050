"use client";

import { cn } from "@/lib/utils";

export interface WheelSlice {
  id: string;
  label: string;
}

interface PollWheelProps {
  slices: WheelSlice[];
  rotation: number;
  spinning: boolean;
  animate: boolean;
  onSpin: () => void;
  disabled?: boolean;
}

export function PollWheel({ slices, rotation, spinning, animate, onSpin, disabled }: PollWheelProps) {
  const count = Math.max(slices.length, 1);
  const slice = 360 / count;
  const stops = slices.map((_, index) => {
    const start = (index / count) * 100;
    const end = ((index + 1) / count) * 100;
    const color = index % 2 === 0 ? "var(--accent)" : "var(--muted)";
    return `${color} ${start}% ${end}%`;
  }).join(", ");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[min(100%,20rem)]">
        <div
          className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 drop-shadow-sm"
          aria-hidden
        >
          <span className="block size-0 border-x-[10px] border-t-[16px] border-x-transparent border-t-accent" />
        </div>
        <div
          className={cn(
            "pulse-wheel relative aspect-square w-full overflow-hidden rounded-full border-4 border-border shadow-lg",
            !animate && "[transition:none]",
          )}
          style={{
            background: `conic-gradient(from -90deg, ${stops})`,
            transform: `rotate(${rotation}deg)`,
          }}
          aria-hidden
        >
          {slices.map((item, index) => (
            <WheelLabel
              key={item.id}
              label={item.label}
              angle={index * slice + slice / 2}
              even={index % 2 === 0}
            />
          ))}
          <div className="absolute inset-[34%] flex items-center justify-center rounded-full border border-border bg-card text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Pulse
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onSpin}
        disabled={disabled || spinning || slices.length === 0}
        className={cn(
          "rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition",
          "hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {spinning ? "Spinning…" : "Spin the wheel"}
      </button>
    </div>
  );
}

function WheelLabel({
  label,
  angle,
  even,
}: {
  label: string;
  angle: number;
  even: boolean;
}) {
  return (
    <span
      className="absolute inset-0"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <span
        className={cn(
          "absolute left-1/2 top-[11%] -translate-x-1/2 text-[0.7rem] font-semibold",
          even ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {label}
      </span>
    </span>
  );
}
