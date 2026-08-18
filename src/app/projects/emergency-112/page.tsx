import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { EmergencyDispatch } from "@/components/projects/EmergencyDispatch";
import { DISPATCH_CLUSTERS, EMERGENCY_STANDARD } from "@/content/emergency-112";

export const metadata: Metadata = {
  title: "Emergency 112 dispatch (mock)",
  description:
    "A schematic public-safety desk: one number, a postal-code location, trained dispatch, and radio ACK. Clusters that cannot staff the night line stay unpublished.",
};

export default function Emergency112MockPage() {
  return (
    <>
      <PageHero
        eyebrow="Cool Projects mock"
        title="One emergency number that actually dispatches"
        description={`${DISPATCH_CLUSTERS.length} seed clusters. ${EMERGENCY_STANDARD.number} is a desk: answer, locate on a postal code, classify, radio ACK. A cluster that rings into voicemail does not get the number. A public-safety desk mock.`}
        backLink={{ href: "/projects#emergency-112", label: "Cool Projects" }}
        actions={
          <LinkButton href="/projects#emergency-112" variant="secondary">
            Back to the idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <EmergencyDispatch />
      </Container>
    </>
  );
}
