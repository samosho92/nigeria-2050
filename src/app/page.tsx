import Link from "next/link";
import {
  IconArrowRight,
  IconBuildingSkyscraper,
  IconBulb,
  IconMessageChatbot,
  IconTimeline,
  IconWheel,
} from "@tabler/icons-react";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeIconsTeaser } from "@/components/home/HomeIconsTeaser";
import { IndependenceDayCommemorative } from "@/components/home/IndependenceDayCommemorative";
import { NigeriaMapBeta } from "@/components/explore/NigeriaMapBeta";
import { isIndependenceDaySeasonActive } from "@/lib/independence-day";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { MotifDivider } from "@/components/ui/MotifDivider";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion";
import { HOME_SECTIONS } from "@/content/home";
import { PULSE_META, PULSE_POLLS, PULSE_SESSION_SIZE } from "@/content/polls";
import { SECTORS } from "@/lib/constants/sectors";
import { CONTENT_STATS } from "@/lib/content-stats";

export default function HomePage() {
  const showIndependenceDay = isIndependenceDaySeasonActive();
  const copy = HOME_SECTIONS;

  return (
    <div className="relative overflow-hidden">
      <HomeHero />

      {showIndependenceDay ? (
        <Section className="py-10 lg:py-12">
          <IndependenceDayCommemorative />
        </Section>
      ) : null}

      <Section>
        <FadeIn>
          <NigeriaMapBeta />
        </FadeIn>
      </Section>

      <Section variant="surface">
        <FadeIn>
          <h2 className="text-center text-2xl font-bold md:text-3xl">{copy.pillarsTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {copy.pillarsLead}
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <Card className="h-full bg-surface-elevated">
              <CardHeader>
                <CardTitle className="text-accent">
                  <IconTimeline className="mb-2 size-6" stroke={1.5} aria-hidden />
                  {copy.storyTitle}
                </CardTitle>
                <CardDescription>
                  {copy.storyDescription(
                    CONTENT_STATS.eraCount,
                    CONTENT_STATS.timelineEntryCount,
                    CONTENT_STATS.iconCount,
                  )}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-4">
                <LinkButton href="/timeline" variant="link">
                  {copy.storyTimelineCta}
                  <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
                </LinkButton>
                <LinkButton href="/icons" variant="link">
                  {copy.storyIconsCta}
                  <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
                </LinkButton>
              </CardFooter>
            </Card>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Card className="h-full bg-surface-elevated">
              <CardHeader>
                <CardTitle className="text-accent">
                  <IconBuildingSkyscraper className="mb-2 size-6" stroke={1.5} aria-hidden />
                  {copy.sectorsPillarTitle}
                </CardTitle>
                <CardDescription>
                  {copy.sectorsPillarDescription(CONTENT_STATS.sectorCount)}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <LinkButton href="/sectors" variant="link">
                  {copy.sectorsPillarCta}
                  <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
                </LinkButton>
              </CardFooter>
            </Card>
          </FadeIn>
        </div>
      </Section>

      <MotifDivider />

      <Section>
        <HomeIconsTeaser />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold md:text-3xl">{copy.allSectorsTitle}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector, i) => (
            <FadeIn key={sector.slug} delay={i * 0.05}>
              <Link href={`/sectors/${sector.slug}`} className="group block h-full">
                <Card className="h-full transition hover:border-accent hover:bg-surface-elevated">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold group-hover:text-accent">
                      {sector.title}
                    </CardTitle>
                    <CardDescription>{sector.tagline}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/15">
                <IconBulb className="size-7 text-accent" stroke={1.5} aria-hidden />
              </div>
              <h2 className="text-xl font-bold">{copy.projectsTitle}</h2>
              <p className="text-muted-foreground">{copy.projectsBody}</p>
              <LinkButton href="/projects" variant="primary" className="mt-auto w-fit">
                {copy.projectsCta}
              </LinkButton>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/15">
                <IconWheel className="size-7 text-accent" stroke={1.5} aria-hidden />
              </div>
              <h2 className="text-xl font-bold">{PULSE_META.homeTeaserTitle}</h2>
              <p className="text-muted-foreground">
                {PULSE_META.homeTeaserBody(PULSE_SESSION_SIZE, PULSE_POLLS.length)}
              </p>
              <LinkButton href="/pulse" variant="secondary" className="mt-auto w-fit">
                {PULSE_META.homeTeaserCta}
              </LinkButton>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/15">
                <IconMessageChatbot className="size-7 text-accent" stroke={1.5} aria-hidden />
              </div>
              <h2 className="text-xl font-bold">{copy.askTitle}</h2>
              <p className="text-muted-foreground">{copy.askBody}</p>
              <LinkButton href="/ask" variant="secondary" className="mt-auto w-fit">
                {copy.askCta}
              </LinkButton>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
