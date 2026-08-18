import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { YourNigeria2050Flow } from "@/components/your-2050/YourNigeria2050Flow";

export const metadata: Metadata = {
  title: "Your Nigeria 2050",
  description:
    "Generate a grounded day-in-2050 vignette from sourced sector projections. AI-labeled, shareable, not a forecast.",
};

export default function Your2050Page() {
  return (
    <>
      <PageHero
        eyebrow="Personalized scenario"
        title="Your Nigeria 2050"
        description="Pick one or two sectors and generate a short day-in-2050 vignette built only from our sourced projections. Optimistic, not naive."
      />
      <Container size="narrow" className="py-12 md:py-16">
        <YourNigeria2050Flow />
      </Container>
    </>
  );
}
