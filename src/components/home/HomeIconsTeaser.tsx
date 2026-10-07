import { IconArrowRight, IconBook, IconUsers } from "@tabler/icons-react";
import { FadeIn } from "@/components/motion";
import { HomeIconsFaces } from "@/components/home/HomeIconsFaces";
import { LinkButton } from "@/components/ui/LinkButton";
import { HOME_ICONS_TEASER } from "@/content/home";
import { CONTENT_STATS } from "@/lib/content-stats";
import { getFeaturedHomeIcons } from "@/lib/icons";

export function HomeIconsTeaser() {
  const faces = getFeaturedHomeIcons();
  const copy = HOME_ICONS_TEASER;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <FadeIn className="lg:col-span-5">
        <p className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span className="size-1.5 shrink-0 bg-accent" aria-hidden />
          {copy.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          {copy.title(CONTENT_STATS.iconCount)}
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">{copy.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/icons" variant="primary" className="w-fit">
            <IconUsers className="size-4" stroke={1.5} aria-hidden />
            {copy.cta}
            <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
          </LinkButton>
          <LinkButton href="/literature" variant="secondary" className="w-fit">
            <IconBook className="size-4" stroke={1.5} aria-hidden />
            {copy.literatureCta}
            <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
          </LinkButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.12} className="lg:col-span-7">
        <HomeIconsFaces figures={faces} />
      </FadeIn>
    </div>
  );
}
