import type { Metadata } from "next";
import { FaqPageContent } from "@/components/faq/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Plain answers to common questions about Naija2050 and Street Pulse.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
