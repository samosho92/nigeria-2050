import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask the Archive",
  description: "A conversational guide into Naija2050's sourced content.",
};

export default function AskPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">Ask the Archive</h1>
      <p className="mt-4 text-text-secondary">
        RAG-scoped AI chat grounded in the site&apos;s own sourced content — not
        open-ended speculation.
      </p>
      <div className="mt-12 rounded-xl border border-dashed border-lagos-border bg-lagos-surface p-8">
        <p className="text-text-secondary">
          AI chat API and UI ship in MVP Sprint 6. Requires content library to be
          populated first.
        </p>
      </div>
    </div>
  );
}
