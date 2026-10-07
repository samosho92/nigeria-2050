import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { TERMS_OF_USE } from "@/content/legal";

export const metadata: Metadata = {
  title: TERMS_OF_USE.title,
  description: TERMS_OF_USE.description,
};

export default function TermsPage() {
  return <LegalPageContent document={TERMS_OF_USE} />;
}
