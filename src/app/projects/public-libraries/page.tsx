import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { LibraryNetwork } from "@/components/projects/LibraryNetwork";
import { LIBRARY_STANDARD, LIBRARY_SYSTEMS } from "@/content/public-libraries";

export const metadata: Metadata = {
  title: "Public library floor (mock)",
  description:
    "A schematic campaign for a public library within 100 km of every community, then denser in cities, with a minimum kit and a national catalogue. Not a live library inventory.",
};

export default function PublicLibrariesMockPage() {
  return (
    <>
      <PageHero
        eyebrow="Cool Projects mock"
        title="A public library within 100 km — then denser"
        description={`${LIBRARY_SYSTEMS.length} seed systems. Rural floor ${LIBRARY_STANDARD.ruralFloorKm} km, then a branch you can walk to, with children’s books, seats, toilets, power, a librarian, and wifi. This is a coverage schematic, not a National Library inventory.`}
        backLink={{ href: "/projects#public-libraries", label: "Cool Projects" }}
        actions={
          <LinkButton href="/projects#public-libraries" variant="secondary">
            Back to the idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <LibraryNetwork />
      </Container>
    </>
  );
}
