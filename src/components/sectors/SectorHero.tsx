import { Badge } from "@/components/ui/Badge";
import type { Sector } from "@/types/content";
import { FadeIn } from "@/components/motion";

interface SectorHeroProps {
  sector: Sector;
}

export function SectorHero({ sector }: SectorHeroProps) {
  return (
    <FadeIn>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-hero-gradient-from via-transparent to-transparent"
          aria-hidden
        />
        <div className="relative">
          <Badge variant="accent">2050 Vision</Badge>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">{sector.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{sector.tagline}</p>
          <blockquote className="mt-8 border-l-4 border-accent pl-6 text-xl font-serif italic text-foreground md:text-2xl">
            {sector.headline2050}
          </blockquote>
        </div>
      </div>
    </FadeIn>
  );
}
