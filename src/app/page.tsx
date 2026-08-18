import Link from "next/link";
import {
  IconArrowRight,
  IconBuildingSkyscraper,
  IconMessageChatbot,
  IconTimeline,
} from "@tabler/icons-react";
import { HomeHero } from "@/components/home/HomeHero";
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
import { SECTORS } from "@/lib/constants/sectors";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <HomeHero />

      <Section variant="surface">
        <FadeIn>
          <h2 className="text-center text-2xl font-bold md:text-3xl">Two Co-Equal Pillars</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            History and future vision, fused by bidirectional links — the product mechanism
            that makes Naija2050 different from Wikipedia or government PDFs.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <Card className="h-full bg-surface-elevated">
              <CardHeader>
                <CardTitle className="text-accent">
                  <IconTimeline className="mb-2 size-6" stroke={1.5} aria-hidden />
                  The Nigeria Story
                </CardTitle>
                <CardDescription>
                  8 eras · 17 entries · scrollytelling spine with era portals and sector
                  cross-links.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <LinkButton href="/timeline" variant="link">
                  View timeline
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
                  Sector Visions to 2050
                </CardTitle>
                <CardDescription>
                  6 flagship sectors with sourced projections, milestone narratives, and
                  &ldquo;How we got here&rdquo; modules.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <LinkButton href="/sectors" variant="link">
                  Browse sectors
                  <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
                </LinkButton>
              </CardFooter>
            </Card>
          </FadeIn>
        </div>
      </Section>

      <MotifDivider />

      <Section>
        <h2 className="text-2xl font-bold md:text-3xl">Six Flagship Sectors</h2>
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
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-accent/15">
              <IconMessageChatbot className="size-8 text-accent" stroke={1.5} aria-hidden />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Ask the Archive</h2>
              <p className="mt-2 text-muted-foreground">
                Curious about the Civil War, oil dependency, or the 2050 economic case? Ask
                our AI guide — grounded in sourced content, not the open web.
              </p>
            </div>
            <LinkButton href="/ask" variant="primary">
              Try it now
            </LinkButton>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
