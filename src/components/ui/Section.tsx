import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "surface" | "muted";
}

const variants = {
  default: "",
  surface: "bg-surface border-y border-border",
  muted: "bg-muted/30",
};

export function Section({ children, className, id, variant = "default" }: SectionProps) {
  return (
    <section id={id} className={cn("px-6 py-16 lg:px-8 lg:py-20", variants[variant], className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
