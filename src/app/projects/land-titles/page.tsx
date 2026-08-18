import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { TitleRegister } from "@/components/projects/TitleRegister";
import { TITLE_SEED_IDS, TITLE_STANDARD } from "@/content/land-titles";

export const metadata: Metadata = {
  title: "Land title register (mock)",
  description:
    "A schematic Torrens-style folio: one record per parcel, mapped to a postal street zone, with governor’s consent on the same page. Not a live cadastre.",
};

export default function LandTitlesMockPage() {
  return (
    <>
      <PageHero
        eyebrow="Cool Projects mock"
        title="Titles you can look up, not queue for"
        description={`${TITLE_SEED_IDS.length} seed registries. ${TITLE_STANDARD.name}: one folio, a mapped parcel, a queryable layer, consent written here. A photocopy in three ministries is not collateral. This is a schematic — not AGIS, not legal advice.`}
        backLink={{ href: "/projects#land-titles", label: "Cool Projects" }}
        actions={
          <LinkButton href="/projects#land-titles" variant="secondary">
            Back to the idea
          </LinkButton>
        }
      />
      <Container className="py-12 md:py-16">
        <TitleRegister />
      </Container>
    </>
  );
}
