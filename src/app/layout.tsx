import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DataSaverProvider } from "@/components/providers/DataSaverProvider";
import { AnalyticsPageView } from "@/components/providers/AnalyticsPageView";
import { fontSans, fontSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Naija2050 - Where Nigeria's History Meets Its Future",
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
  openGraph: {
    title: "Naija2050 - Where Nigeria's History Meets Its Future",
    description:
      "Six sector visions, interactive timeline, and sourced projections to 2050.",
    type: "website",
    locale: "en_US",
    siteName: "Naija2050",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naija2050",
    description: "Where Nigeria's history meets its credible long-range future.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          fontSerif.variable,
          "min-h-screen flex flex-col font-sans",
        )}
      >
        <ThemeProvider>
          <DataSaverProvider>
            <SkipLink />
            <AnalyticsPageView />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </DataSaverProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
