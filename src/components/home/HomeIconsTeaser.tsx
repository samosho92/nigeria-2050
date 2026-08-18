import Link from "next/link";
import { IconArrowRight, IconUsers } from "@tabler/icons-react";
import { FadeIn } from "@/components/motion";
import { IconAvatar } from "@/components/icons/IconAvatar";
import { LinkButton } from "@/components/ui/LinkButton";
import { CONTENT_STATS } from "@/lib/content-stats";
import { getFeaturedHomeIcons, iconShortName } from "@/lib/icons";

export function HomeIconsTeaser() {
  const faces = getFeaturedHomeIcons();

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <FadeIn className="lg:col-span-5">
        <p className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span className="size-1.5 shrink-0 bg-accent" aria-hidden />
          People
        </p>
        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          {CONTENT_STATS.iconCount} icons. One register.
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Writers, organisers, builders, and athletes — sourced, chronological, and searchable.
          The timeline tells what happened. The icons page tells who carried it.
        </p>
        <LinkButton href="/icons" variant="primary" className="mt-8 w-fit">
          <IconUsers className="size-4" stroke={1.5} aria-hidden />
          Browse the icons
          <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
        </LinkButton>
      </FadeIn>

      <FadeIn delay={0.12} className="lg:col-span-7">
        <ul className="grid grid-cols-4 gap-4 sm:gap-5">
          {faces.map((figure) => (
            <li key={figure.id}>
              <Link
                href={`/icons#${figure.id}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <IconAvatar
                  figure={figure}
                  size="md"
                  className="ring-2 ring-border transition group-hover:ring-accent"
                />
                <span className="line-clamp-2 max-w-[11ch] text-[0.6875rem] font-medium leading-tight text-muted-foreground transition group-hover:text-foreground">
                  {iconShortName(figure.name)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </FadeIn>
    </div>
  );
}
