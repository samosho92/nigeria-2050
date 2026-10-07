import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { PRIVACY_POLICY } from "@/content/legal";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.description,
};

export default function PrivacyPage() {
  return <LegalPageContent document={PRIVACY_POLICY} />;
}
