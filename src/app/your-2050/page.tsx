import type { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * Your Nigeria 2050 is hidden from launch until vignette quality is rewritten.
 * Implementation kept under `src/components/your-2050` and `src/lib/your-2050.ts`.
 */
export const metadata: Metadata = {
  title: "Your Nigeria 2050",
  robots: { index: false, follow: false },
};

export default function Your2050Page() {
  redirect("/");
}
