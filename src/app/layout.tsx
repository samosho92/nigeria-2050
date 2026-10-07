import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DataSaverProvider } from "@/components/providers/DataSaverProvider";
import { AnalyticsPageView } from "@/components/providers/AnalyticsPageView";
import { ProductionAnalytics } from "@/components/providers/ProductionAnalytics";
import { CookieConsentBanner } from "@/components/legal/CookieConsentBanner";
import { fontSans, fontSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { siteName, siteTagline, siteUrl } from "@/lib/site";
import { CONTENT_STATS } from "@/lib/content-stats";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#041a10" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description:
    `An independent, design-forward exploration of Nigeria's history and credible long-range future across ${CONTENT_STATS.sectorCount} key sectors.`,
  keywords: [
    "Nigeria",
    siteName,
    "Nigerian history",
    "Nigeria 2050",
    "diaspora",
    "civic education",
  ],
  openGraph: {
    title: `${siteName} - ${siteTagline}`,
    description:
      `${CONTENT_STATS.sectorCount} sector visions, interactive timeline, and sourced projections to 2050.`,
    type: "website",
    locale: "en_US",
    siteName: siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
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
          "flex min-h-screen flex-col overflow-x-hidden font-sans",
        )}
      >
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{if(localStorage.getItem("nigeria2050-data-saver")==="true")document.documentElement.dataset.saver="true"}catch(e){}})();',
          }}
        />
        <ThemeProvider>
          <DataSaverProvider>
            <ProductionAnalytics />
            <SkipLink />
            <AnalyticsPageView />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <CookieConsentBanner />
          </DataSaverProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
