"use client";

import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { ProjectIcon } from "@/components/projects/ProjectIcon";
import { checkSubmissionGuardrails } from "@/lib/ask-guardrails";
import { cn } from "@/lib/utils";
import type { CoolProject } from "@/types/content";

const FIELD =
  "mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

interface ProjectSubmitFormProps {
  sectorTitles: Record<string, string>;
  onCreated: (project: CoolProject) => void;
}

export function ProjectSubmitForm({ sectorTitles, onCreated }: ProjectSubmitFormProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [detail, setDetail] = useState("");
  const [inspiredBy, setInspiredBy] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const toggleSector = (slug: string) => {
    setSectors((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 3) return current;
      return [...current, slug];
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const guardrail = checkSubmissionGuardrails(`${title} ${summary} ${detail} ${inspiredBy}`);
    if (!guardrail.allowed) {
      setStatus("error");
      setMessage("That submission doesn’t meet our community guidelines. Please rephrase.");
      return;
    }

    try {
      const response = await fetch("/api/projects/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          summary,
          detail,
          inspiredBy,
          sectorSlugs: sectors,
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        project?: CoolProject;
      };

      if (!response.ok || !data.ok || !data.project) {
        throw new Error(data.message ?? "Submission failed");
      }

      onCreated(data.project);
      setStatus("success");
      setMessage("Added to the board. Others can vote on it on this deployment.");
      setTitle("");
      setSummary("");
      setDetail("");
      setInspiredBy("");
      setSectors([]);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not save that idea.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-5 md:p-6"
      id="submit-idea"
    >
      <div className="flex items-start gap-3">
        <ProjectIcon projectId="submit" />
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">Submit an idea</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Propose a concrete initiative that would make daily life in Nigeria work better by 2050.
            Pick up to three sectors — the first one you select is the sector it moves most.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="project-title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="project-title"
            required
            minLength={8}
            maxLength={80}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={FIELD}
            placeholder="A name people can vote on"
          />
        </div>
        <div>
          <label htmlFor="project-summary" className="text-sm font-medium">
            One-sentence pitch
          </label>
          <textarea
            id="project-summary"
            required
            minLength={24}
            maxLength={280}
            rows={3}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="project-detail" className="text-sm font-medium">
            How it would work (optional)
          </label>
          <textarea
            id="project-detail"
            maxLength={1200}
            rows={5}
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="project-inspired" className="text-sm font-medium">
            Where this already works (optional)
          </label>
          <input
            id="project-inspired"
            maxLength={120}
            value={inspiredBy}
            onChange={(event) => setInspiredBy(event.target.value)}
            className={FIELD}
            placeholder="e.g. Finland’s library law"
          />
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Sectors it moves (1–3)</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(sectorTitles).map(([slug, label]) => {
              const selected = sectors.includes(slug);
              const primary = sectors[0] === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => toggleSector(slug)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium transition",
                    selected
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                  {primary ? " · most" : ""}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <Button type="submit" disabled={status === "submitting" || sectors.length === 0} className="mt-6">
        <IconSend className="size-4" stroke={1.5} aria-hidden />
        {status === "submitting" ? "Sending…" : "Add to the board"}
      </Button>
      {message ? (
        <p
          className={cn("mt-3 text-sm", status === "error" ? "text-destructive" : "text-muted-foreground")}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
