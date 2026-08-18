/**
 * Download freely licensed Wikipedia/Wikimedia portraits for /icons.
 *
 * Usage: npx tsx scripts/fetch-icon-portraits.ts
 *
 * Skips fair-use and other non-free infobox photos. Living people often have
 * no redistributable headshot — the page falls back to initials.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ICON_COHORT_EARLY } from "../src/content/icons/cohort-early";
import { ICON_COHORT_LATER } from "../src/content/icons/cohort-later";
import { ICON_COHORT_MODERN } from "../src/content/icons/cohort-modern";
import { ICON_PORTRAITS as EXISTING } from "../src/content/icons/portraits";

const USER_AGENT = "Naija2050/1.0 (https://naija2050.org; portraits for civic education)";
const OUT_DIR = path.join(process.cwd(), "public", "icons");
const MANIFEST = path.join(process.cwd(), "src", "content", "icons", "portraits.ts");

const FREE_LICENSE = /public domain|cc0|cc[- ]?by|gfdl|creative commons/i;
const BLOCKED_LICENSE = /fair use|nonfree|non-free|all rights reserved/i;
const BLOCKED_FILE = /statue|monument|equestrian|tomb|grave|mausoleum/i;

interface WikiSummary {
  title: string;
  thumbnail?: { source: string; width: number; height: number };
  originalimage?: { source: string };
  content_urls?: { desktop?: { page: string } };
}

interface ImageInfo {
  url?: string;
  extmetadata?: Record<string, { value: string }>;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function wikiJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

function fileTitleFromThumb(thumbUrl: string): string | null {
  try {
    const parsed = new URL(thumbUrl);
    const marker = "/wikipedia/commons/";
    if (!parsed.pathname.includes(marker) && !parsed.pathname.includes("/wikipedia/en/")) {
      return null;
    }
    // /thumb/a/ab/File.jpg/320px-File.jpg → File.jpg
    const parts = parsed.pathname.split("/");
    const thumbIdx = parts.indexOf("thumb");
    if (thumbIdx >= 0 && parts[thumbIdx + 3]) {
      return decodeURIComponent(parts[thumbIdx + 3]);
    }
    return decodeURIComponent(parts[parts.length - 1] ?? "");
  } catch {
    return null;
  }
}

function isFreeLicense(license: string, usage: string): boolean {
  const blob = `${license} ${usage}`;
  if (BLOCKED_LICENSE.test(blob)) return false;
  return FREE_LICENSE.test(blob);
}

function tsString(value: string): string {
  return JSON.stringify(value);
}

async function fetchWithRetry(url: string, attempts = 4): Promise<Response | null> {
  for (let i = 0; i < attempts; i += 1) {
    const response = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "*/*" } });
    if (response.status !== 429 && response.status !== 503) return response;
    await sleep(1500 * (i + 1));
  }
  return null;
}

function portraitEntry(
  id: string,
  src: string,
  name: string,
  credit: string,
  license: string,
  sourceUrl: string,
): string {
  return `  ${tsString(id)}: {\n    src: ${tsString(src)},\n    alt: ${tsString(`Portrait of ${name}`)},\n    credit: ${tsString(credit)},\n    license: ${tsString(license)},\n    sourceUrl: ${tsString(sourceUrl)},\n  }`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const figures = [...ICON_COHORT_EARLY, ...ICON_COHORT_MODERN, ...ICON_COHORT_LATER];
  const onDisk = await readdir(OUT_DIR);
  const entries: string[] = [];
  let saved = 0;
  let skipped = 0;
  let reused = 0;

  for (const figure of figures) {
    const existingFile = onDisk.find((file) => file.startsWith(`${figure.id}.`));
    const existingMeta = EXISTING[figure.id];
    if (existingFile && existingMeta) {
      const blocked = BLOCKED_FILE.test(existingMeta.sourceUrl) || BLOCKED_FILE.test(existingFile);
      if (blocked) {
        skipped += 1;
        console.log(`skip  ${figure.id} — existing file is not a face photo`);
        continue;
      }
      entries.push(
        portraitEntry(
          figure.id,
          existingMeta.src,
          figure.name,
          existingMeta.credit,
          existingMeta.license,
          existingMeta.sourceUrl,
        ),
      );
      reused += 1;
      continue;
    }

    const title = encodeURIComponent(figure.wikipediaTitle.replaceAll(" ", "_"));
    const summary = await wikiJson<WikiSummary>(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    );
    await sleep(400);

    const thumb = summary?.thumbnail?.source;
    if (!thumb) {
      skipped += 1;
      console.log(`skip  ${figure.id} — no thumbnail`);
      continue;
    }

    const fileName = fileTitleFromThumb(thumb);
    if (!fileName) {
      skipped += 1;
      console.log(`skip  ${figure.id} — could not parse file name`);
      continue;
    }

    const info = await wikiJson<{
      query?: { pages?: Record<string, { imageinfo?: ImageInfo[] }> };
    }>(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(`File:${fileName}`)}`,
    );
    await sleep(400);

    const page = Object.values(info?.query?.pages ?? {})[0];
    const imageinfo = page?.imageinfo?.[0];
    const license = imageinfo?.extmetadata?.LicenseShortName?.value ?? "";
    const usage = imageinfo?.extmetadata?.UsageTerms?.value ?? "";
    const artist = (imageinfo?.extmetadata?.Artist?.value ?? "Wikimedia Commons")
      .replaceAll(/<[^>]+>/g, "")
      .replaceAll(/\s+/g, " ")
      .trim();
    const descriptionUrl =
      imageinfo?.extmetadata?.DescriptionUrl?.value ??
      `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`;

    if (BLOCKED_FILE.test(fileName) || BLOCKED_FILE.test(thumb)) {
      skipped += 1;
      console.log(`skip  ${figure.id} — not a face photo (${fileName})`);
      continue;
    }

    if (!isFreeLicense(license, usage)) {
      skipped += 1;
      console.log(`skip  ${figure.id} — license “${license || usage || "unknown"}”`);
      continue;
    }

    const imageResponse = await fetchWithRetry(thumb);
    if (!imageResponse?.ok) {
      skipped += 1;
      console.log(`skip  ${figure.id} — download ${imageResponse?.status ?? "failed"}`);
      continue;
    }

    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    const ext = path.extname(fileName).replace(".", "").toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const localName = `${figure.id}.${safeExt}`;
    await writeFile(path.join(OUT_DIR, localName), buffer);

    entries.push(
      portraitEntry(
        figure.id,
        `/icons/${localName}`,
        figure.name,
        artist || "Wikimedia Commons",
        license || "See Wikimedia Commons",
        descriptionUrl,
      ),
    );
    saved += 1;
    console.log(`ok    ${figure.id} (${license})`);
  }

  const body = `import type { IconPortrait } from "@/types/content";

/** Generated by scripts/fetch-icon-portraits.ts — do not edit by hand. */
export const ICON_PORTRAITS: Record<string, IconPortrait> = {
${entries.join(",\n")}
};
`;
  await writeFile(MANIFEST, body);
  console.log(
    `\nSaved ${saved} new, reused ${reused}, skipped ${skipped}. Manifest: ${MANIFEST}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
