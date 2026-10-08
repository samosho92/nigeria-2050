import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { SECTOR_DETAIL_UI } from "@/content/sectors";
import type { Sector } from "@/types/content";
import { cn } from "@/lib/utils";

interface SectorContinuumProps {
  sectors: Sector[];
  currentSlug: string;
}

export function SectorContinuum({ sectors, currentSlug }: SectorContinuumProps) {
  const index = sectors.findIndex((sector) => sector.slug === currentSlug);
  if (index < 0) return null;

  const prev = index > 0 ? sectors[index - 1] : undefined;
  const next = index < sectors.length - 1 ? sectors[index + 1] : undefined;
  const ui = SECTOR_DETAIL_UI;
  const current = sectors[index];

  return (
    <div className="border-t border-border bg-primary text-primary-foreground">
      <Container className="py-10 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
            {ui.continuumLabel}
          </p>
          <p className="font-serif text-sm tabular-nums text-primary-foreground/80">
            {ui.continuumOf(index + 1, sectors.length)}
            <span className="mx-2 text-primary-foreground/40">·</span>
            {current.title}
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Link
            href={prev ? `/sectors/${prev.slug}` : "/sectors"}
            className={cn(
              "group flex items-center gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-4 transition hover:bg-primary-foreground/10",
              !prev && "opacity-80",
            )}
          >
            <IconArrowLeft
              className="size-4 shrink-0 text-primary-foreground/70 transition group-hover:-translate-x-0.5"
              stroke={1.5}
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
                {prev ? ui.continuumPrev : ui.backLabel}
              </span>
              <span className="mt-1 block truncate font-serif text-lg font-bold tracking-tight">
                {prev?.title ?? ui.backLabel}
              </span>
            </span>
          </Link>

          <Link
            href={next ? `/sectors/${next.slug}` : "/sectors"}
            className={cn(
              "group flex items-center justify-end gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-4 text-right transition hover:bg-primary-foreground/10",
              !next && "opacity-80",
            )}
          >
            <span className="min-w-0">
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
                {next ? ui.continuumNext : ui.backLabel}
              </span>
              <span className="mt-1 block truncate font-serif text-lg font-bold tracking-tight">
                {next?.title ?? ui.backLabel}
              </span>
            </span>
            <IconArrowRight
              className="size-4 shrink-0 text-primary-foreground/70 transition group-hover:translate-x-0.5"
              stroke={1.5}
              aria-hidden
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}
