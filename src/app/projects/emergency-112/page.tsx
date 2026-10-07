import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { EmergencyDispatch } from "@/components/projects/EmergencyDispatch";
import {
  DISPATCH_CLUSTERS,
  EMERGENCY_PAGE_META,
  EMERGENCY_STANDARD,
} from "@/content/emergency-112";
import { PROJECT_MOCK_UI } from "@/content/projects";

export const metadata: Metadata = {
  title: EMERGENCY_PAGE_META.seoTitle,
  description: EMERGENCY_PAGE_META.seoDescription,
};

export default function Emergency112MockPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_MOCK_UI.eyebrow}
        title={EMERGENCY_PAGE_META.title}
        description={EMERGENCY_PAGE_META.description(
          DISPATCH_CLUSTERS.length,
          EMERGENCY_STANDARD.number,
        )}
        backLink={{ href: EMERGENCY_PAGE_META.backHref, label: PROJECT_MOCK_UI.backLabel }}
        actions={
          <LinkButton href={EMERGENCY_PAGE_META.backHref} variant="secondary">
            {PROJECT_MOCK_UI.backCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <EmergencyDispatch />
      </Container>
    </>
  );
}
