import { cn } from "@/lib/utils";

interface FilterChipProps {
  active: boolean;
  label: string;
  onClick: () => void;
  className?: string;
}

export function FilterChip({ active, label, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "bg-accent text-accent-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent",
        className,
      )}
    >
      {label}
    </button>
  );
}
