import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { PRIVACY_POLICY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Naija2050 handles analytics, local storage, Ask the Archive, and contact data.",
};

export default function PrivacyPage() {
  return <LegalPageContent document={PRIVACY_POLICY} />;
}
