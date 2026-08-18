import { cn } from "@/lib/utils";

interface MotifDividerProps {
  className?: string;
}

export function MotifDivider({ className }: MotifDividerProps) {
  return (
    <div className={cn("flex items-center gap-3 py-8", className)} aria-hidden>
      <div className="h-px flex-1 bg-border" />
      <svg width="32" height="16" viewBox="0 0 32 16" className="text-accent opacity-60">
        <path
          d="M0 8 L8 0 L16 8 L24 0 L32 8 L24 16 L16 8 L8 16 Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
