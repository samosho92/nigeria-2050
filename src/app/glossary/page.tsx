import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions for terms newcomers won't know.",
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">Glossary</h1>
      <p className="mt-4 text-text-secondary">
        Terms surfaced inline across the site with plain-language definitions.
      </p>
      <div className="mt-12 rounded-xl border border-dashed border-lagos-border bg-lagos-surface p-8">
        <p className="text-text-secondary">
          Glossary content and inline surfacing ship in MVP Sprint 5.
        </p>
      </div>
    </div>
  );
}
