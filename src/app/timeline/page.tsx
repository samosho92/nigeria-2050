import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Nigeria Story",
  description: "An interactive timeline of Nigeria's history from pre-colonial era to the reform era.",
};

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">The Nigeria Story</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        A scrollytelling timeline with era-specific art direction — from pre-colonial
        kingdoms through the reform era that sets up the 2050 case.
      </p>
      <div className="mt-12 rounded-xl border border-dashed border-lagos-border bg-lagos-surface p-8">
        <p className="text-text-secondary">
          Interactive timeline spine, era portals, and bidirectional sector links
          will be implemented in MVP Sprint 3–4. See{" "}
          <code className="text-optimism-warm">docs/MVP_PLAN.md</code>.
        </p>
      </div>
    </div>
  );
}
