import {
  IconArrowRight,
  IconBuildingSkyscraper,
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
import { SECTORS } from "@/lib/constants/sectors";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative px-6 py-24 md:py-32 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hero-gradient-from via-transparent to-transparent" />
        <Container size="narrow" className="relative text-center">
          <Badge>Foundation Preview</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Where Nigeria&apos;s History Meets Its Future
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
            A credible, visually compelling journey through Nigeria&apos;s past and
            a sourced, optimistic vision for 2050 — built for skeptics and believers
            alike.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/timeline" variant="primary">
              <IconTimeline className="size-4" stroke={1.5} aria-hidden />
              Explore the Timeline
            </LinkButton>
            <LinkButton href="/compare" variant="secondary">
              Now vs. 2050
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface px-6 py-20 lg:px-8">
        <Container>
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Two Co-Equal Pillars
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Neither ships without the other — history and future vision, fused by
            design.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card className="bg-surface-elevated">
              <CardHeader>
                <CardTitle className="text-accent">
                  <IconTimeline className="mb-2 size-6" stroke={1.5} aria-hidden />
                  The Nigeria Story
                </CardTitle>
                <CardDescription>
                  An interactive, art-directed timeline from pre-colonial kingdoms
                  through independence, civil war, military rule, and the return to
                  democracy.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <LinkButton href="/timeline" variant="link">
                  View timeline
                  <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
                </LinkButton>
              </CardFooter>
            </Card>

            <Card className="bg-surface-elevated">
              <CardHeader>
                <CardTitle className="text-accent">
                  <IconBuildingSkyscraper className="mb-2 size-6" stroke={1.5} aria-hidden />
                  Sector Visions to 2050
                </CardTitle>
                <CardDescription>
                  Six flagship sectors with sourced projections, milestone narratives,
                  and bidirectional links back to the historical throughline.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <LinkButton href="/sectors" variant="link">
                  Browse sectors
                  <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
                </LinkButton>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <Container>
          <h2 className="text-2xl font-bold md:text-3xl">Six Flagship Sectors</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => (
              <Link key={sector.slug} href={`/sectors/${sector.slug}`} className="group">
                <Card className="h-full transition hover:border-secondary hover:bg-surface-elevated">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold group-hover:text-accent">
                      {sector.title}
                    </CardTitle>
                    <CardDescription>{sector.tagline}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
