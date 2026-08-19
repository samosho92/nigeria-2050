import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { ICONS } from "@/content/icons";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES } from "@/content/timeline";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/timeline`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sectors`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/compare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare/g7`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ask`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sources`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/glossary`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/methodology`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/your-2050`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/icons`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/pulse`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/projects/postal-codes`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/projects/road-signs`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/projects/public-libraries`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/projects/emergency-112`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/projects/land-titles`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/projects/grid-outage`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/projects/open-budgets`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...SECTORS.map((s) => ({
      url: `${base}/sectors/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...TIMELINE_ENTRIES.map((e) => ({
      url: `${base}/timeline#${e.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...ICONS.map((figure) => ({
      url: `${base}/icons#${figure.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
