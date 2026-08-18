"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconCheck, IconCopy, IconRobot, IconShare, IconSparkles } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generateYour2050Vignette, shareVignette } from "@/lib/your-2050";
import { trackEvent } from "@/lib/analytics";
import { SECTORS } from "@/content/sectors";

type ShareFeedback = "idle" | "shared" | "copied" | "error";

export function YourNigeria2050Flow() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<ShareFeedback>("idle");
  const [shareError, setShareError] = useState("");

  const vignette = useMemo(
    () => (generated ? generateYour2050Vignette({ sectorSlugs: selected, name }) : null),
    [generated, name, selected],
  );

  const toggleSector = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 2) return [prev[1], slug];
      return [...prev, slug];
    });
    setGenerated(false);
    setShareFeedback("idle");
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
        AI-generated · Grounded in sector projections only
      </Badge>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">1. Pick one or two sectors</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your vignette pulls only from the 2050 projections and assumptions on those sector pages.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <button
              key={sector.slug}
              type="button"
              onClick={() => toggleSector(sector.slug)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                selected.includes(sector.slug)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent"
              }`}
            >
              {sector.title}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">2. Optional first name</h2>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setGenerated(false);
            setShareFeedback("idle");
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
        Generate my day in 2050
      </Button>

      {generated && vignette && (
        <article className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold">{vignette.title}</h2>
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
