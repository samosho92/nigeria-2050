import type { Metadata } from "next";
import { MethodologyPageContent } from "@/components/methodology/MethodologyPageContent";
import { METHODOLOGY_META } from "@/content/methodology";

export const metadata: Metadata = {
  title: METHODOLOGY_META.seoTitle,
  description: METHODOLOGY_META.seoDescription,
};

export default function MethodologyPage() {
  return <MethodologyPageContent />;
}
