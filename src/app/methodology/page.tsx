import type { Metadata } from "next";
import { MethodologyPageContent } from "@/components/methodology/MethodologyPageContent";

export const metadata: Metadata = {
  title: "Editorial Methodology",
  description:
    "How Naija2050 sources, models 2050 scenarios, benchmarks against the G7, and handles AI, review, and corrections.",
};

export default function MethodologyPage() {
  return <MethodologyPageContent />;
}
