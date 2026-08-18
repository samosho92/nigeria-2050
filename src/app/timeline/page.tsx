import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { TimelineExperience } from "@/components/timeline/TimelineExperience";
import { TIMELINE_ENTRIES } from "@/content/timeline";

export const metadata: Metadata = {
  title: "The Nigeria Story",
  description:
    "An interactive timeline of Nigeria's history from pre-colonial kingdoms to the reform era.",
};

export default function TimelinePage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="The Nigeria Story"
        description="Scroll through eight eras — from pre-colonial kingdoms to the reforms setting up 2050. Every entry links forward to the sectors it shaped."
      />
      <TimelineExperience entries={TIMELINE_ENTRIES} />
    </Container>
  );
}
