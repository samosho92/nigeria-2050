"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconCheck, IconCopy, IconRobot, IconShare, IconSparkles } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generateYour2050Vignette, shareVignette } from "@/lib/your-2050";
import { trackEvent } from "@/lib/analytics";
import { SECTORS } from "@/content/sectors";
import { VIGNETTE_CITIES, VIGNETTE_SEASONS } from "@/content/your-2050-settings";
import { cn } from "@/lib/utils";

type ShareFeedback = "idle" | "shared" | "copied" | "error";

export function YourNigeria2050Flow() {
  const [selected, setSelected] = useState<string[]>([]);
  const [cityId, setCityId] = useState(VIGNETTE_CITIES[0].id);
  const [seasonId, setSeasonId] = useState(VIGNETTE_SEASONS[0].id);
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<ShareFeedback>("idle");
  const [shareError, setShareError] = useState("");

  const vignette = useMemo(
    () =>
      generated
        ? generateYour2050Vignette({ sectorSlugs: selected, name, cityId, seasonId })
        : null,
    [cityId, generated, name, seasonId, selected],
  );

  const resetOutput = () => {
    setGenerated(false);
    setShareFeedback("idle");
    setShareError("");
  };

  const toggleSector = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 2) return [prev[1], slug];
      return [...prev, slug];
    });
    resetOutput();
  };

  const handleGenerate = () => {
    setGenerated(true);
    setShareFeedback("idle");
    trackEvent({
      name: "your_2050_complete",
      sectors: selected.join(","),
    });
  };

  const handleShare = async () => {
    if (!vignette?.body) return;

    setShareError("");
    setShareFeedback("idle");

    try {
      const result = await shareVignette(vignette);
      if (result === "canceled") return;
      setShareFeedback(result);
      window.setTimeout(() => setShareFeedback("idle"), 2500);
    } catch {
      setShareFeedback("error");
      setShareError("Could not share or copy. Select the text above and copy manually.");
    }
  };

  const shareLabel =
    shareFeedback === "copied"
      ? "Copied to clipboard"
      : shareFeedback === "shared"
        ? "Shared"
        : "Share vignette";

  const ShareIcon =
    shareFeedback === "copied" || shareFeedback === "shared" ? IconCheck : IconShare;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Badge variant="muted" className="gap-1">
        <IconRobot className="size-3" stroke={1.5} aria-hidden />
        AI-generated fiction · Grounded in sector projections
      </Badge>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">1. Pick one or two sectors</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The story lives these projections instead of listing them. Numbers stay sourced.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <button
              key={sector.slug}
              type="button"
              onClick={() => toggleSector(sector.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                selected.includes(sector.slug)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent",
              )}
            >
              {sector.title}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">2. Choose a city and a season</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Setting, weather, and climate shape the day. The projections stay the same.
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          City
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {VIGNETTE_CITIES.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => {
                setCityId(city.id);
                resetOutput();
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                cityId === city.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent",
              )}
            >
              {city.name}
            </button>
          ))}
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Weather
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {VIGNETTE_SEASONS.map((season) => (
            <button
              key={season.id}
              type="button"
              onClick={() => {
                setSeasonId(season.id);
                resetOutput();
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                seasonId === season.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent",
              )}
            >
              {season.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {VIGNETTE_CITIES.find((city) => city.id === cityId)?.climate}.{" "}
          {VIGNETTE_SEASONS.find((season) => season.id === seasonId)?.hint}.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">3. Optional first name</h2>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            resetOutput();
          }}
          placeholder="Your first name (optional)"
          maxLength={40}
          className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </section>

      <Button
        type="button"
        disabled={selected.length === 0}
        onClick={handleGenerate}
        className="gap-2"
      >
        <IconSparkles className="size-4" stroke={1.5} aria-hidden />
        Write my day in 2050
      </Button>

      {generated && vignette && (
        <article className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {vignette.setting}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold">{vignette.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
            {vignette.body.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {vignette.sectors.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {vignette.sectors.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/sectors/${sector.slug}`}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  View {sector.title} sources →
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="gap-1.5"
              onClick={handleShare}
            >
              <ShareIcon className="size-4" stroke={1.5} aria-hidden />
              {shareLabel}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={async () => {
                if (!vignette.shareText) return;
                try {
                  await navigator.clipboard.writeText(vignette.shareText);
                  setShareFeedback("copied");
                  window.setTimeout(() => setShareFeedback("idle"), 2500);
                } catch {
                  setShareFeedback("error");
                  setShareError("Clipboard access blocked. Copy the vignette text manually.");
                }
              }}
            >
              <IconCopy className="size-4" stroke={1.5} aria-hidden />
              Copy text
            </Button>
          </div>

          {shareFeedback !== "idle" && shareFeedback !== "error" && (
            <p className="mt-2 text-sm text-accent" role="status">
              {shareFeedback === "copied"
                ? "Full vignette copied to your clipboard."
                : "Thanks for sharing."}
            </p>
          )}
          {shareError && (
            <p className="mt-2 text-sm text-muted-foreground" role="status">
              {shareError}
            </p>
          )}
        </article>
      )}
    </div>
  );
}
