import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { TERMS_OF_USE } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using Naija2050, its editorial content, scenarios, and interactive tools.",
};

export default function TermsPage() {
  return <LegalPageContent document={TERMS_OF_USE} />;
}
