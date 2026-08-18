"use client";

import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { CORRECTIONS_EMAIL } from "@/content/methodology";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import type { CorrectionSubmission } from "@/types/content";

const STORAGE_KEY = "naija2050-corrections";

interface CorrectionFormProps {
  defaultPageUrl?: string;
}

export function CorrectionForm({ defaultPageUrl = "" }: CorrectionFormProps) {
  const [pageUrl, setPageUrl] = useState(defaultPageUrl);
  const [claim, setClaim] = useState("");
  const [counterSource, setCounterSource] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const payload = { pageUrl, claim, counterSource, email: email || undefined };

    try {
      const response = await fetch("/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "Submission failed");
      }

      const submission: CorrectionSubmission = {
        id: crypto.randomUUID(),
        pageUrl,
        claim,
        counterSource,
        email: email || undefined,
        submittedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CorrectionSubmission[];
        localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...existing].slice(0, 50)));
      } catch {
        // ignore storage errors
      }

      trackEvent({ name: "correction_submit", pageUrl });
      setStatus("success");
      setMessage("Thank you. We review every correction and publish dated updates when warranted.");
      setClaim("");
      setCounterSource("");
    } catch {
      setStatus("error");
      setMessage(
        `We could not save your submission online. Please email ${CORRECTIONS_EMAIL} directly with the same details.`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="correction-url" className="text-sm font-medium">
          Page URL
        </label>
        <input
          id="correction-url"
          required
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
          placeholder="https://naija2050.org/sectors/economy"
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label htmlFor="correction-claim" className="text-sm font-medium">
          Specific claim in error
        </label>
        <textarea
          id="correction-claim"
          required
          rows={3}
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label htmlFor="correction-source" className="text-sm font-medium">
          Your counter-source
        </label>
        <textarea
          id="correction-source"
          required
          rows={3}
          value={counterSource}
          onChange={(e) => setCounterSource(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label htmlFor="correction-email" className="text-sm font-medium">
          Email (optional)
        </label>
        <input
          id="correction-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <Button type="submit" disabled={status === "submitting"} className="gap-2">
        <IconSend className="size-4" stroke={1.5} aria-hidden />
        {status === "submitting" ? "Sending…" : "Submit correction"}
      </Button>

      {message && (
        <p
          className={`text-sm ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
