import Link from "next/link";
import {
  IconArrowRight,
  IconArrowsLeftRight,
  IconBuildingSkyscraper,
  IconMessageChatbot,
  IconTimeline,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { MotifDivider } from "@/components/ui/MotifDivider";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion";
import { COMPARATOR_METRICS } from "@/content/comparator";
import { SECTORS } from "@/lib/constants/sectors";
import { AnimatedCounter } from "@/components/motion";

export default function HomePage() {
  const heroMetric = COMPARATOR_METRICS[0];

  return (
    <div className="relative overflow-hidden">
      <section className="relative px-6 py-24 md:py-32 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hero-gradient-from via-transparent to-transparent" />
        <Container size="narrow" className="relative text-center">
          <Badge>MVP Live</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
            Where Nigeria&apos;s History Meets Its Future
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
            Six sector visions. Seventeen historical waypoints. One fused journey from
            pre-colonial kingdoms to a sourced, optimistic 2050.
          </p>

          <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-4 rounded-xl border border-border bg-card p-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">GDP/capita now</p>
              <p className="text-2xl font-bold">${heroMetric.current.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent">Projected 2050</p>
              <p className="text-2xl font-bold text-accent">
                $<AnimatedCounter value={heroMetric.projected2050} />
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/timeline" variant="primary">
              <IconTimeline className="size-4" stroke={1.5} aria-hidden />
              Explore the Timeline
            </LinkButton>
            <LinkButton href="/compare" variant="secondary">
              <IconArrowsLeftRight className="size-4" stroke={1.5} aria-hidden />
              Now vs. 2050
            </LinkButton>
          </div>
        </Container>
      </section>

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
