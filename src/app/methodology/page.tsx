import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { MotifDivider } from "@/components/ui/MotifDivider";

export const metadata: Metadata = {
  title: "Editorial Methodology",
  description: "How Naija2050 sources, reviews, and presents content.",
};

export default function MethodologyPage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Editorial Methodology"
        description="Last updated: August 17, 2026. How we build credible, non-partisan, optimistic-not-naive content."
      />

      <div className="prose prose-neutral mt-12 max-w-none space-y-8 text-muted-foreground dark:prose-invert">
        <section>
          <h2 className="text-xl font-bold text-foreground">Our Positioning</h2>
          <p>
            Naija2050 is independent civic media — not a government product, not a
            partisan campaign, not a news site. We present Nigeria&apos;s history and
            credible long-range future scenarios for diaspora Nigerians, curious
            outsiders, young Nigerians, educators, and policy-adjacent professionals.
          </p>
        </section>

        <MotifDivider />

        <section>
          <h2 className="text-xl font-bold text-foreground">Sourcing Standards</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Every quantitative claim cites a named, checkable source in our{" "}
              <Link href="/sources" className="text-accent hover:underline">Source Library</Link>.
            </li>
            <li>2050 projections are scenarios with stated assumptions — not guarantees.</li>
            <li>Where data supports it, we show low/base/high ranges rather than single numbers.</li>
            <li>We prioritize World Bank, NBS, UNESCO, IEA, and peer-reviewed academic sources.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">Historical Content</h2>
          <p>
            Contested history — especially the Civil War, coups, and military rule — is
            presented with acknowledgment of gravity and multiple credible sources. We do
            not adopt a purely federal-government or purely secessionist framing. Pre-colonial
            Nigeria is presented as a plurality of kingdoms and polities, not a unified nation
            that existed before colonialism.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">AI-Generated Content</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <Link href="/ask" className="text-accent hover:underline">Ask the Archive</Link>{" "}
              answers only from our curated content store — never open-web hallucination.
            </li>
            <li>AI-generated illustrative art depicts scenes and settings only — never real historical figures.</li>
            <li>All AI content is labeled in the UI.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">Corrections & Review</h2>
          <p>
            <Link href="/editorial/review" className="text-accent hover:underline">
              View the editorial review queue
            </Link>{" "}
            for content pending subject-matter sign-off. Found an error? Email{" "}
            <a href="mailto:corrections@naija2050.org" className="text-accent hover:underline">
              corrections@naija2050.org
            </a>{" "}
            with the page URL, the specific claim, and your source. We review and update
            with a dated correction note.
          </p>
        </section>
      </div>
    </Container>
  );
}
