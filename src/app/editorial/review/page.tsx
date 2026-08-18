import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { REVIEW_QUEUE, getPendingReviews } from "@/content/review-queue";

export const metadata: Metadata = {
  title: "Editorial Review Queue",
  description: "Internal editorial review status for Naija2050 content.",
};

export default function EditorialReviewPage() {
  const pending = getPendingReviews();

  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="Editorial Review Queue"
        description="Human review pass for sensitive history, sector projections, and AI-generated art before publication."
      />
      <Container size="narrow" className="py-12 md:py-16">
        <p className="rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
          {pending.length} item{pending.length === 1 ? "" : "s"} pending review.
        </p>

        <ul className="mt-10 space-y-4">
          {REVIEW_QUEUE.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">{item.title}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase ${
                    item.status === "reviewed"
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.status.replace("-", " ")}
                </span>
              </div>
              <p className="mt-2 text-sm capitalize text-muted-foreground">Type: {item.type}</p>
              {item.reviewer && (
                <p className="text-sm text-muted-foreground">Reviewer: {item.reviewer}</p>
              )}
              {item.notes && <p className="mt-2 text-sm">{item.notes}</p>}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
