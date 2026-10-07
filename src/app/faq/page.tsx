import type { Metadata } from "next";
import { FaqPageContent } from "@/components/faq/FaqPageContent";
import { FAQ_META } from "@/content/faq";

export const metadata: Metadata = {
  title: FAQ_META.seoTitle,
  description: FAQ_META.seoDescription,
};

export default function FaqPage() {
  return <FaqPageContent />;
}
