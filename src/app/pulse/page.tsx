import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero, PageHeroAsidePanel } from "@/components/layout/PageHero";
import { StreetPulse } from "@/components/pulse/StreetPulse";
import { PULSE_CATEGORIES, PULSE_META, PULSE_POLLS, PULSE_SESSION_SIZE } from "@/content/polls";

export const metadata: Metadata = {
  title: PULSE_META.name,
  description: PULSE_META.description,
};

export default function PulsePage() {
  return (
    <>
      <PageHero
        eyebrow={PULSE_META.eyebrow}
        title={PULSE_META.title}
        description={PULSE_META.description}
        aside={
          <PageHeroAsidePanel watermark="Pulse">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
              Unlock after you answer
            </p>
            <p className="mt-6 font-serif text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none">
              {PULSE_SESSION_SIZE}
            </p>
            <p className="mt-3 max-w-xs text-sm text-primary-foreground/80">
              Questions per round, drawn from {PULSE_POLLS.length} across{" "}
              {PULSE_CATEGORIES.length} categories. Refresh for a new round. Live n. Bands
              only.
            </p>
          </PageHeroAsidePanel>
        }
      />
      <Container className="py-12 md:py-16">
        <StreetPulse />
      </Container>
    </>
  );
}
