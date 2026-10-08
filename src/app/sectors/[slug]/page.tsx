import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssumptionsPanel } from "@/components/ui/AssumptionsPanel";
import { MotifDivider } from "@/components/ui/MotifDivider";
import { Section } from "@/components/ui/Section";
import { SourcePanel } from "@/components/ui/SourceCitation";
import { HowWeGotHere } from "@/components/sectors/HowWeGotHere";
import { MilestoneTimeline } from "@/components/sectors/MilestoneTimeline";
import { ScenarioRangePanel } from "@/components/sectors/ScenarioRangePanel";
import { SectorContinuum } from "@/components/sectors/SectorContinuum";
import { SectorHero } from "@/components/sectors/SectorHero";
import { SectorKeyDrivers } from "@/components/sectors/SectorKeyDrivers";
import { SectorRelatedIdeas } from "@/components/sectors/SectorRelatedIdeas";
import { getSectorQuiz } from "@/content/quizzes";
import { QuizPanel } from "@/components/quizzes/QuizPanel";
import { SCENARIO_UI_NOTE } from "@/content/methodology";
import { SECTOR_DETAIL_UI } from "@/content/sectors";
import {
  getCoolProjectsBySectorSlug,
  getSectorBySlug,
  getSourcesByIds,
  SECTORS,
} from "@/lib/content";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return { title: SECTOR_DETAIL_UI.notFoundTitle };
  return { title: sector.title, description: sector.tagline };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const sources = getSourcesByIds(sector.sourceIds);
  const sectorQuiz = getSectorQuiz(sector.slug);
  const relatedIdeas = getCoolProjectsBySectorSlug(sector.slug, 3);
  const ui = SECTOR_DETAIL_UI;
  const drivers = sector.keyDrivers ?? [];

  return (
    <div>
      <SectorHero sector={sector} />

      <Section variant="surface" id="drivers">
        <SectorKeyDrivers
          drivers={drivers}
          title={ui.driversTitle}
          lead={ui.driversLead}
          sourceLabel={ui.driversSourceLabel}
        />
      </Section>

      {sector.scenarioRanges && sector.scenarioRanges.length > 0 && (
        <Section id="scenarios">
          <ScenarioRangePanel ranges={sector.scenarioRanges} />
        </Section>
      )}

      <Section id="road">
        <h2 className="mb-3 text-2xl font-bold">{ui.roadTitle}</h2>
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{SCENARIO_UI_NOTE}</p>
        <MilestoneTimeline projections={sector.projections} />
      </Section>

      <MotifDivider />

      <Section variant="muted" id="history">
        <HowWeGotHere waypoints={sector.historicalWaypoints} />
      </Section>

      {relatedIdeas.length > 0 && (
        <Section>
          <SectorRelatedIdeas projects={relatedIdeas} />
        </Section>
      )}

      <Section>
        <h2 className="mb-6 text-2xl font-bold">{ui.assumptionsTitle}</h2>
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

      <SectorContinuum sectors={SECTORS} currentSlug={sector.slug} />
    </div>
  );
}
