import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { ABOUT_META } from "@/content/about";

export const metadata: Metadata = {
  title: ABOUT_META.seoTitle,
  description: ABOUT_META.seoDescription,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
