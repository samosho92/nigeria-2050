import Link from "next/link";
import { SECTORS } from "@/lib/constants/sectors";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 py-24 md:py-32 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-adire-indigo/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-optimism-gold">
            Foundation Preview
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Where Nigeria&apos;s History Meets Its Future
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary text-balance">
            A credible, visually compelling journey through Nigeria&apos;s past and
            a sourced, optimistic vision for 2050 — built for skeptics and believers
            alike.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/timeline"
              className="rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-terracotta-muted"
            >
              Explore the Timeline
            </Link>
            <Link
              href="/compare"
              className="rounded-lg border border-lagos-border bg-lagos-surface px-6 py-3 text-sm font-semibold transition hover:border-adire-indigo-light"
            >
              Now vs. 2050
            </Link>
          </div>
        </div>
      </section>

      {/* Two pillars */}
      <section className="border-t border-lagos-border bg-lagos-surface px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Two Co-Equal Pillars
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-text-secondary">
            Neither ships without the other — history and future vision, fused by
            design.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article className="rounded-xl border border-lagos-border bg-lagos-elevated p-8">
              <h3 className="text-xl font-bold text-optimism-gold">
                The Nigeria Story
              </h3>
              <p className="mt-3 text-text-secondary">
                An interactive, art-directed timeline from pre-colonial kingdoms
                through independence, civil war, military rule, and the return to
                democracy.
              </p>
              <Link
                href="/timeline"
                className="mt-6 inline-block text-sm font-medium text-terracotta hover:underline"
              >
                View timeline →
              </Link>
            </article>
            <article className="rounded-xl border border-lagos-border bg-lagos-elevated p-8">
              <h3 className="text-xl font-bold text-optimism-gold">
                Sector Visions to 2050
              </h3>
              <p className="mt-3 text-text-secondary">
                Six flagship sectors with sourced projections, milestone narratives,
                and bidirectional links back to the historical throughline.
              </p>
              <Link
                href="/sectors"
                className="mt-6 inline-block text-sm font-medium text-terracotta hover:underline"
              >
                Browse sectors →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Sector grid preview */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">Six Flagship Sectors</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => (
              <Link
                key={sector.slug}
                href={`/sectors/${sector.slug}`}
                className="group rounded-lg border border-lagos-border bg-lagos-surface p-6 transition hover:border-adire-indigo-light hover:bg-lagos-elevated"
              >
                <h3 className="font-semibold group-hover:text-optimism-gold">
                  {sector.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{sector.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
