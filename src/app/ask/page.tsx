import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { AskArchiveChat } from "@/components/ask/AskArchiveChat";

export const metadata: Metadata = {
  title: "Ask the Archive",
  description: "A conversational guide into Naija2050's sourced content.",
};

export default function AskPage() {
  return (
    <Container size="narrow" className="py-16">
      <PageHeader
        title="Ask the Archive"
        description="A conversational guide into our curated content — not a general-purpose chatbot. Every answer links back to sourced material."
      />
      <div className="mt-10">
        <AskArchiveChat />
      </div>
    </Container>
  );
}
