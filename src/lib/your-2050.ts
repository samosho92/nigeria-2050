import { SECTORS } from "@/content/sectors";
import { siteUrl } from "@/lib/site";
import type { Sector } from "@/types/content";

const VIGNETTE_OPENERS = [
  "Morning light over the city. You step outside into a Nigeria that finally matches its demographic promise.",
  "The commute is shorter than your parents ever imagined. Infrastructure and digital services run in the background.",
  "Markets are busy, clinics are staffed, and the optimism is cautious but real.",
];

const VIGNETTE_CLOSERS = [
  "This is not a guarantee. It is the base case if the assumptions on the sector page hold.",
  "Every number behind this day is sourced and ranged on Naija2050. Skeptics welcome.",
  "The distance from today to this scene is measured in policy, investment, and time.",
];

function pick<T>(items: T[], seed: number): T {
  return items[seed % items.length];
}

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export interface Your2050Input {
  sectorSlugs: string[];
  name?: string;
}

export interface Your2050Vignette {
  title: string;
  body: string;
  sectors: Sector[];
  shareText: string;
}

export function generateYour2050Vignette(input: Your2050Input): Your2050Vignette {
  const sectors = input.sectorSlugs
    .map((slug) => SECTORS.find((sector) => sector.slug === slug))
    .filter((sector): sector is Sector => Boolean(sector));

  if (sectors.length === 0) {
    return {
      title: "Pick a sector to begin",
      body: "Choose one or two sectors to generate a grounded day-in-2050 vignette from our sourced projections.",
      sectors: [],
      shareText: "",
    };
  }

  const seed = hashSeed(sectors.map((s) => s.slug).join("-"));
  const primary = sectors[0];
  const secondary = sectors[1];
  const projection2050 = primary.projections.find((p) => p.year === 2050);
  const opener = pick(VIGNETTE_OPENERS, seed);
  const closer = pick(VIGNETTE_CLOSERS, seed + 1);
  const greeting = input.name?.trim() ? `${input.name.trim()}, ` : "";

  const metricLines = projection2050
    ? Object.entries(projection2050.metrics)
        .slice(0, 3)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value}`)
        .join(". ")
    : primary.headline2050;

  const secondaryLine = secondary
    ? `On your way home, you notice how ${secondary.title.toLowerCase()} shows up too: ${secondary.headline2050}`
    : "";

  const body = [
    `${greeting}${opener}`,
    `In 2050, ${primary.title.toLowerCase()} looks like this: ${primary.headline2050}`,
    projection2050 ? `${projection2050.headline}. ${projection2050.narrative}` : "",
    `By the numbers: ${metricLines}.`,
    secondaryLine,
    closer,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    title: `Your Nigeria 2050 · ${sectors.map((s) => s.title).join(" + ")}`,
    body,
    sectors,
    shareText: buildVignetteShareText(body, sectors, siteUrl),
  };
}

export function buildVignetteShareText(
  body: string,
  sectors: Sector[],
  baseUrl = siteUrl,
): string {
  const url = `${baseUrl.replace(/\/$/, "")}/your-2050`;
  const sectorLine = sectors.map((s) => s.title).join(" + ");
  return [
    `Your Nigeria 2050 · ${sectorLine}`,
    "",
    body,
    "",
    `Generated from sourced Naija2050 projections.`,
    url,
  ].join("\n");
}

export function getVignetteSharePayload(
  vignette: Your2050Vignette,
  baseUrl?: string,
): { title: string; text: string; url: string } {
  const origin =
    baseUrl ??
    (typeof window !== "undefined" ? window.location.origin : siteUrl);
  const url = `${origin.replace(/\/$/, "")}/your-2050`;
  const text =
    vignette.shareText ||
    buildVignetteShareText(vignette.body, vignette.sectors, origin);

  return {
    title: vignette.title,
    text,
    url,
  };
}

function isShareCanceled(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

/** Share vignette via Web Share API, falling back to clipboard. */
export async function shareVignette(
  vignette: Your2050Vignette,
): Promise<"shared" | "copied" | "canceled"> {
  const payload = getVignetteSharePayload(vignette);

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    const shareData: ShareData = {
      title: payload.title,
      text: payload.text,
      url: payload.url,
    };

    const canShare =
      typeof navigator.canShare !== "function" || navigator.canShare(shareData);

    if (canShare) {
      try {
        await navigator.share(shareData);
        return "shared";
      } catch (error) {
        if (isShareCanceled(error)) return "canceled";
      }
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(payload.text);
    return "copied";
  }

  throw new Error("Sharing is not supported in this browser.");
}
