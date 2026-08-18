import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { AssumptionsPanel } from "@/components/ui/AssumptionsPanel";
import { MotifDivider } from "@/components/ui/MotifDivider";
import { Section } from "@/components/ui/Section";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { AutoGlossary } from "@/components/ui/GlossaryTerm";
import { DataChart } from "@/components/sectors/DataChart";
import { HowWeGotHere } from "@/components/sectors/HowWeGotHere";
import { MilestoneTimeline } from "@/components/sectors/MilestoneTimeline";
import { ScenarioRangePanel } from "@/components/sectors/ScenarioRangePanel";
import { SectorHero } from "@/components/sectors/SectorHero";
import { FadeIn } from "@/components/motion";
import { getSectorBySlug, getSourcesByIds, SECTORS } from "@/lib/content";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return { title: "Sector Not Found" };
  return { title: sector.title, description: sector.tagline };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const sources = getSourcesByIds(sector.sourceIds);

  return (
    <div>
      <Section>
        <Link
          href="/sectors"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <IconArrowLeft className="size-4" stroke={1.5} aria-hidden />
          All sectors
        </Link>
        <SectorHero sector={sector} />
        <p className="mt-6 text-muted-foreground">
          <AutoGlossary text={sector.headline2050} />
        </p>
      </Section>

      <Section variant="surface">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold">Current Baseline</h2>
          <DataChart data={sector.baseline} title="Where Nigeria stands today" />
        </FadeIn>
      </Section>

      {sector.scenarioRanges && sector.scenarioRanges.length > 0 && (
        <Section>
          <ScenarioRangePanel ranges={sector.scenarioRanges} />
        </Section>
      )}

      <Section>
        <h2 className="mb-10 text-2xl font-bold">The Road to 2050</h2>
        <MilestoneTimeline projections={sector.projections} />
      </Section>

      <MotifDivider />

      <Section variant="muted">
        <HowWeGotHere waypoints={sector.historicalWaypoints} />
      </Section>

      <Section>
        <h2 className="mb-6 text-2xl font-bold">Scenario Assumptions & Risks</h2>
        <AssumptionsPanel assumptions={sector.assumptions} risks={sector.risks} />
      </Section>

      <Section variant="surface">
        <SourcePanel sources={sources} />
      </Section>
    </div>
  );
}
