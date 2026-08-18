import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { YourNigeria2050Flow } from "@/components/your-2050/YourNigeria2050Flow";

export const metadata: Metadata = {
  title: "Your Nigeria 2050",
  description:
    "A short story of a day in 2050, set in a Nigerian city and season, written from sourced sector projections.",
};

export default function Your2050Page() {
  return (
    <>
      <PageHero
        eyebrow="Personalized scenario"
        title="Your Nigeria 2050"
        description="Pick sectors, a city, and a season. We write a short story of a day in 2050 from sourced projections."
      />
      <Container size="narrow" className="py-12 md:py-16">
        <YourNigeria2050Flow />
      </Container>
    </>
  );
}
