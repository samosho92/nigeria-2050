import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { LibraryNetwork } from "@/components/projects/LibraryNetwork";
import {
  LIBRARIES_PAGE_META,
  LIBRARY_STANDARD,
  LIBRARY_SYSTEMS,
} from "@/content/public-libraries";
import { PROJECT_MOCK_UI } from "@/content/projects";

export const metadata: Metadata = {
  title: LIBRARIES_PAGE_META.seoTitle,
  description: LIBRARIES_PAGE_META.seoDescription,
};

export default function PublicLibrariesMockPage() {
  return (
    <>
      <PageHero
        eyebrow={PROJECT_MOCK_UI.eyebrow}
        title={LIBRARIES_PAGE_META.title}
        description={LIBRARIES_PAGE_META.description(
          LIBRARY_SYSTEMS.length,
          LIBRARY_STANDARD.ruralFloorKm,
        )}
        backLink={{ href: LIBRARIES_PAGE_META.backHref, label: PROJECT_MOCK_UI.backLabel }}
        actions={
          <LinkButton href={LIBRARIES_PAGE_META.backHref} variant="secondary">
            {PROJECT_MOCK_UI.backCta}
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <LibraryNetwork />
      </Container>
    </>
  );
}
