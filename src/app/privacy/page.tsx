import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { PRIVACY_POLICY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nigeria2050 handles information when you use the site.",
};

export default function PrivacyPage() {
  return <LegalPageContent document={PRIVACY_POLICY} />;
}
