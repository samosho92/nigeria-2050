import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssumptionsPanel } from "@/components/ui/AssumptionsPanel";
import { MotifDivider } from "@/components/ui/MotifDivider";
import { Section } from "@/components/ui/Section";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { DataChart } from "@/components/sectors/DataChart";
import { HowWeGotHere } from "@/components/sectors/HowWeGotHere";
import { MilestoneTimeline } from "@/components/sectors/MilestoneTimeline";
import { ScenarioRangePanel } from "@/components/sectors/ScenarioRangePanel";
import { SectorHero } from "@/components/sectors/SectorHero";
import { FadeIn } from "@/components/motion";
import { getSectorQuiz } from "@/content/quizzes";
import { QuizPanel } from "@/components/quizzes/QuizPanel";
import { SCENARIO_UI_NOTE } from "@/content/methodology";
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
  const sectorQuiz = getSectorQuiz(sector.slug);

  return (
    <div>
      <SectorHero sector={sector} />

      <Section variant="surface">
        <FadeIn>
          <h2 className="mb-2 text-2xl font-bold">Sourced baseline</h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Figures below are from named datasets in the source panel on this page.
          </p>
          <DataChart data={sector.baseline} title="Where Nigeria stands today" />
        </FadeIn>
      </Section>

      {sector.scenarioRanges && sector.scenarioRanges.length > 0 && (
        <Section>
          <ScenarioRangePanel ranges={sector.scenarioRanges} />
        </Section>
      )}

      <Section>
        <h2 className="mb-3 text-2xl font-bold">The Road to 2050</h2>
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{SCENARIO_UI_NOTE}</p>
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

      <Section variant="surface" id="sources">
        <SourcePanel sources={sources} />
      </Section>

      {sectorQuiz && (
        <Section>
          <QuizPanel
            quizId={sector.slug}
            title={sectorQuiz.title}
            questions={sectorQuiz.questions}
          />
        </Section>
      )}
    </div>
  );
}
