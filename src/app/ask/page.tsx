import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { AskArchiveChat } from "@/components/ask/AskArchiveChat";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
  title: "Ask the Archive",
  description: "A conversational guide into Naija2050's sourced content.",
};

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow="AI guide"
        title="Ask the Archive"
        description="A conversational guide into our curated content, not a general-purpose chatbot. Every answer links back to sourced material. You can exit anytime."
        actions={
          <LinkButton href="/" variant="secondary" className="gap-1.5">
            <IconArrowLeft className="size-4" stroke={1.5} aria-hidden />
            Back to home
          </LinkButton>
        }
      />
      <Container size="narrow" className="py-12 md:py-16">
        <AskArchiveChat />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Prefer not to use AI?{" "}
          <Link href="/timeline" className="font-medium text-accent hover:underline">
            Browse the timeline
          </Link>{" "}
          or{" "}
          <Link href="/sources" className="font-medium text-accent hover:underline">
            verify sources directly
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
