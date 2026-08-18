import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now vs. 2050",
  description: "Compare Nigeria's current baseline with modeled 2050 projections.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">Nigeria Now vs. Nigeria 2050</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        Side-by-side comparator across GDP per capita, literacy, power capacity,
        security indices, and more — with the signature morph slider.
      </p>
      <div className="mt-12 rounded-xl border border-dashed border-lagos-border bg-lagos-surface p-8">
        <p className="text-text-secondary">
          Morph slider and animated stat reveals ship in MVP Sprint 4. See{" "}
          <code className="text-optimism-warm">docs/MVP_PLAN.md</code>.
        </p>
      </div>
    </div>
  );
}
