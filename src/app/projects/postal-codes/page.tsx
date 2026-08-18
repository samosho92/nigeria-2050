import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { PostalCodeEngine } from "@/components/projects/PostalCodeEngine";
import { POSTAL_CAPITALS } from "@/content/postal-code-engine";

export const metadata: Metadata = {
  title: "National postal code engine (mock)",
  description:
    "A working mock of a Nigerian postal code that starts in the 36 state capitals plus Abuja, then densifies from rural clusters to urban street blocks.",
};

export default function PostalCodeMockPage() {
  return (
    <>
      <PageHero
        eyebrow="Cool Projects mock"
        title="A national postal code engine"
        description={`Start where government already sits: ${POSTAL_CAPITALS.length} capitals, district 01. Give the hinterland a stable cluster code, then split units as streets appear. This is a schematic index of how a used code could run.`}
        backLink={{ href: "/projects#postal-codes", label: "Cool Projects" }}
        actions={
          <LinkButton href="/projects#postal-codes" variant="secondary">
            Back to the idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <PostalCodeEngine />
      </Container>
    </>
  );
}
