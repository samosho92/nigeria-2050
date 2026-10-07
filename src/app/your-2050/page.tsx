import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { YOUR_2050_PAGE_META } from "@/content/your-2050-settings";

/**
 * Your Nigeria 2050 is hidden from launch until vignette quality is rewritten.
 * Implementation kept under `src/components/your-2050` and `src/lib/your-2050.ts`.
 */
export const metadata: Metadata = {
  title: YOUR_2050_PAGE_META.seoTitle,
  robots: { index: false, follow: false },
};

export default function Your2050Page() {
  redirect("/");
}
