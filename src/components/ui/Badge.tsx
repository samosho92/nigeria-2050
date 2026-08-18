import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "muted";
}

const badgeVariants = {
  default: "bg-secondary text-secondary-foreground",
  accent: "bg-accent/15 text-accent",
  muted: "bg-muted text-muted-foreground",
};

export function Badge({ className, variant = "accent", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
