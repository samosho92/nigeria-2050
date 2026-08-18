import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES } from "@/content/timeline";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/timeline`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sectors`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/compare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ask`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sources`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/glossary`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/methodology`, changeFrequency: "yearly", priority: 0.6 },
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
  ];
}
