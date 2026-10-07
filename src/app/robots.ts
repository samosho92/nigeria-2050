import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/editorial/", "/your-2050"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
