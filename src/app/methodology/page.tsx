import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Methodology",
  description: "How Naija2050 sources, reviews, and presents content.",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">Editorial Methodology</h1>
      <p className="mt-4 text-text-secondary">
        Non-partisan, source-transparent, optimistic-not-naive — with explicit
        uncertainty and subject-matter review.
      </p>
      <div className="mt-12 space-y-6 text-text-secondary">
        <p>
          Full methodology page content will be drafted alongside editorial review
          in MVP Sprint 1.
        </p>
      </div>
    </div>
  );
}
