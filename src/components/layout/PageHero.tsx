import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface PageHeroRailItem {
  year: string;
  label: string;
  href: string;
  accent?: boolean;
}

export interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  rail?: PageHeroRailItem[];
  backLink?: { href: string; label: string };
  children?: ReactNode;
  titleSize?: "default" | "display";
  className?: string;
  contentClassName?: string;
}

export function PageHeroShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      <div className="page-hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative">{children}</div>
    </section>
  );
}

export function PageHeroEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground",
        className,
      )}
    >
      <span className="size-1.5 shrink-0 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export function PageHeroTitle({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "display";
}) {
  return (
    <h1
      className={cn(
        "mt-6 border-l-2 border-accent pl-5 font-serif sm:pl-6",
        size === "display"
          ? "leading-none tracking-tight"
          : "text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.02] tracking-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function PageHeroDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PageHeroAsidePanel({
  children,
  watermark,
  className,
}: {
  children: ReactNode;
  watermark?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex h-full min-h-[20rem] flex-col justify-end overflow-hidden bg-primary px-6 py-10 text-primary-foreground sm:px-8 lg:min-h-0 lg:px-9 lg:py-12",
        className,
      )}
    >
      <div className="page-hero-weave pointer-events-none absolute inset-0" aria-hidden />
      {watermark && (
        <p
          className="page-hero-watermark pointer-events-none absolute -right-3 -bottom-6 select-none font-serif text-[min(48vw,15rem)] font-bold leading-none text-primary-foreground/15"
          aria-hidden
        >
          {watermark}
        </p>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export function PageHeroRail({ items }: { items: PageHeroRailItem[] }) {
  return (
    <nav aria-label="Jump into the story" className="relative border-t border-border">
      <ol className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-4 lg:px-8">
        {items.map((era) => (
          <li key={era.year}>
            <Link
              href={era.href}
              className="group relative flex flex-col gap-2 py-6 pr-4 sm:pt-5"
            >
              <span
                className={cn(
                  "relative z-10 hidden size-2.5 sm:block sm:-mt-[1.5625rem]",
                  era.accent ? "bg-accent" : "bg-foreground group-hover:bg-accent",
                )}
                aria-hidden
              />
              <span
                className={cn(
                  "font-serif text-2xl font-bold tracking-tight sm:text-3xl",
                  era.accent ? "text-accent" : "text-foreground",
                )}
              >
                {era.year}
              </span>
              <span className="flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition group-hover:text-foreground">
                {era.label}
                <IconArrowRight
                  className="size-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  stroke={1.5}
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  rail,
  backLink,
  children,
  titleSize = "default",
  className,
  contentClassName,
}: PageHeroProps) {
  const hasAside = Boolean(aside);

  return (
    <PageHeroShell className={className}>
      <div className={cn("mx-auto max-w-6xl", hasAside && "grid lg:grid-cols-12")}>
        <div
          className={cn(
            "px-6 py-12 sm:py-14 lg:px-8",
            hasAside ? "lg:col-span-7 lg:py-16 lg:pr-12" : "max-w-3xl",
            contentClassName,
          )}
        >
          {backLink && (
            <Link
              href={backLink.href}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <IconArrowLeft className="size-4" stroke={1.5} aria-hidden />
              {backLink.label}
            </Link>
          )}
          {eyebrow && <PageHeroEyebrow>{eyebrow}</PageHeroEyebrow>}
          <PageHeroTitle size={titleSize}>{title}</PageHeroTitle>
          {description && <PageHeroDescription>{description}</PageHeroDescription>}
          {actions && (
            <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
          )}
          {children}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
      {rail && rail.length > 0 && <PageHeroRail items={rail} />}
    </PageHeroShell>
  );
}
