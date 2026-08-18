"use client";

import { useState } from "react";
import Link from "next/link";
import { IconMessageChatbot, IconRobot, IconSend } from "@tabler/icons-react";
import { queryArchive, SUGGESTED_QUESTIONS } from "@/lib/ask-archive";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { id: string; title: string; publisher: string }[];
  links?: { title: string; href: string }[];
}

export function AskArchiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I'm the Archive guide — ask me about Nigerian history or our 2050 sector projections. I only answer from Naija2050's curated, sourced content.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = (text: string) => {
    if (!text.trim() || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = queryArchive(text);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: response.answer,
          sources: response.sources,
          links: response.chunks.map((c) => ({ title: c.title, href: c.href })),
        },
      ]);
      trackEvent({ name: "ask_archive_query", grounded: response.isGrounded });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="muted" className="gap-1">
          <IconRobot className="size-3" stroke={1.5} aria-hidden />
          AI-generated · Grounded in site content
        </Badge>
      </div>

      <div className="flex h-[480px] flex-col rounded-2xl border border-border bg-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <IconMessageChatbot className="size-4 text-accent" stroke={1.5} aria-hidden />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-border/50 pt-3">
                    {msg.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs font-medium text-accent hover:underline"
                      >
                        → {link.title}
                      </Link>
                    ))}
                  </div>
                )}
                {msg.sources && msg.sources.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Sources: {msg.sources.map((s) => s.publisher).join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
                <IconMessageChatbot className="size-4 text-accent animate-pulse" stroke={1.5} />
              </div>
              <div className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                Searching the archive…
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:border-accent hover:text-accent"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Nigerian history or 2050 projections…"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" size="icon" aria-label="Send" disabled={loading}>
              <IconSend className="size-4" stroke={1.5} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
