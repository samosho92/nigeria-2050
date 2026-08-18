import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Naija2050 — Where Nigeria's History Meets Its Future",
    template: "%s | Naija2050",
  },
  description:
    "An independent, design-forward exploration of Nigeria's history and credible long-range future across six key sectors.",
  keywords: [
    "Nigeria",
    "Naija2050",
    "Nigerian history",
    "Nigeria 2050",
    "diaspora",
    "civic education",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
