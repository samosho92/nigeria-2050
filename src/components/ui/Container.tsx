import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

const sizeClasses = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div className={cn("mx-auto px-6 lg:px-8", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
