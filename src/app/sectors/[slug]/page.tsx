import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SECTORS } from "@/lib/constants/sectors";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);
  if (!sector) return { title: "Sector Not Found" };
  return {
    title: sector.title,
    description: sector.tagline,
  };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) notFound();

  return (
    <Container size="narrow" className="py-16">
      <Link
        href="/sectors"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <IconArrowLeft className="size-4" stroke={1.5} aria-hidden />
        All sectors
      </Link>
      <h1 className="mt-6 text-3xl font-bold md:text-4xl">{sector.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{sector.tagline}</p>

      <div className="mt-12 space-y-8">
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <Badge variant="muted" className="mb-3">
              MVP Placeholder
            </Badge>
            <p className="text-muted-foreground">
              Full sector page template (2050 vision, baseline data, 2030/2040/2050
              milestones, &ldquo;How we got here&rdquo; module, data viz, sourcing panel,
              assumptions/risks) will be built in MVP Sprint 2–3 per the plan in{" "}
              <code>docs/MVP_PLAN.md</code>.
            </p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-xl font-bold">How We Got Here</h2>
          <p className="mt-2 text-muted-foreground">
            Historical waypoints cross-linked from the timeline — ships at MVP.
          </p>
        </section>
      </div>
    </Container>
  );
}
