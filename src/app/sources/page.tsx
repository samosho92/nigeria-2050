import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Source Library",
  description: "Every cited source in one place for independent credibility-checking.",
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">Source Library</h1>
      <p className="mt-4 text-text-secondary">
        A single page listing every cited source — World Bank, NBS, McKinsey, PwC,
        and more.
      </p>
      <div className="mt-12 rounded-xl border border-dashed border-lagos-border bg-lagos-surface p-8">
        <p className="text-text-secondary">
          Structured source data will live in{" "}
          <code className="text-optimism-warm">src/content/sources/</code>. See MVP
          Sprint 1.
        </p>
      </div>
    </div>
  );
}
