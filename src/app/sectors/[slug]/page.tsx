import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SECTORS } from "@/lib/constants/sectors";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);
  if (!sector) return { title: "Sector Not Found" };
  return {
    title: sector.title,
    description: sector.tagline,
  };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Link href="/sectors" className="text-sm text-text-secondary hover:text-text-primary">
        ← All sectors
      </Link>
      <h1 className="mt-6 text-3xl font-bold md:text-4xl">{sector.title}</h1>
      <p className="mt-4 text-lg text-text-secondary">{sector.tagline}</p>

      <div className="mt-12 space-y-8">
        <section className="rounded-xl border border-dashed border-lagos-border bg-lagos-surface p-8">
          <h2 className="text-sm font-medium uppercase tracking-widest text-optimism-gold">
            MVP Placeholder
          </h2>
          <p className="mt-3 text-text-secondary">
            Full sector page template (2050 vision, baseline data, 2030/2040/2050
            milestones, &ldquo;How we got here&rdquo; module, data viz, sourcing panel,
            assumptions/risks) will be built in MVP Sprint 2–3 per the plan in{" "}
            <code className="text-optimism-warm">docs/MVP_PLAN.md</code>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">How We Got Here</h2>
          <p className="mt-2 text-text-secondary">
            Historical waypoints cross-linked from the timeline — ships at MVP.
          </p>
        </section>
      </div>
    </div>
  );
}
