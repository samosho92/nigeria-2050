import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <header className={cn("mx-auto max-w-4xl", className)}>
      <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
      {description && (
        <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
      )}
      {children}
    </header>
  );
}
