import { cn } from "@/lib/utils";
import type { RoadSignSpec } from "@/content/road-signs";

interface RoadSignPlateProps {
  sign: RoadSignSpec;
  size?: "sm" | "md";
  className?: string;
  /** Overrides kilometre-marker face (corridor km post). */
  marker?: string;
}

export function RoadSignPlate({ sign, size = "md", className, marker }: RoadSignPlateProps) {
  const box = size === "sm" ? "size-14" : "size-24";
  const type = size === "sm" ? "text-[0.55rem]" : "text-xs";
  const num = size === "sm" ? "text-lg" : "text-3xl";

  if (sign.kind === "speed") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-[5px] border-sign-stop bg-sign-face font-sans font-bold text-sign-ink",
          box,
          className,
        )}
        aria-hidden
      >
        <span className={cn("leading-none", num)}>{sign.value}</span>
      </div>
    );
  }

  if (sign.kind === "stop") {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-sign-stop font-sans font-bold uppercase tracking-wide text-sign-face",
          box,
          type,
          className,
        )}
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
        aria-hidden
      >
        Stop
      </div>
    );
  }

  if (sign.kind === "yield") {
    return (
      <svg viewBox="0 0 100 100" className={cn(box, "text-sign-ink", className)} aria-hidden>
        <polygon
          points="50,8 94,88 6,88"
          className="fill-sign-face stroke-sign-stop"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontWeight="700"
        >
          YIELD
        </text>
      </svg>
    );
  }

  if (sign.kind === "school") {
    return (
      <div
        className={cn("flex items-center justify-center bg-sign-warning text-sign-ink", box, className)}
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        aria-hidden
      >
        <span className={cn("font-sans font-bold leading-none", size === "sm" ? "text-[0.5rem]" : "text-[0.65rem]")}>
          SCH
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-sm border border-sign-ink bg-sign-face font-mono font-bold text-sign-ink",
        box,
        className,
      )}
      aria-hidden
    >
      <span className={size === "sm" ? "text-[0.45rem]" : "text-[0.65rem]"}>KM</span>
      <span className={size === "sm" ? "text-sm" : "text-xl"}>{marker ?? sign.value ?? "00"}</span>
    </div>
  );
}
