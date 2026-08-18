"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  IconHome,
  IconMessageChatbot,
  IconRobot,
  IconSend,
  IconTimeline,
  IconX,
} from "@tabler/icons-react";
import { queryArchive, SUGGESTED_QUESTIONS } from "@/lib/ask-archive";
import { trackEvent } from "@/lib/analytics";
import type { GuardrailReason } from "@/lib/ask-guardrails";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";

const WELCOME_MESSAGE =
  "I'm the Archive guide. Ask me about Nigerian history or our 2050 sector projections. I only answer from Naija2050's curated, sourced content.";

interface Message {
  role: "user" | "assistant";
  content: string;
  withheld?: boolean;
  sources?: { id: string; title: string; publisher: string }[];
  links?: { title: string; href: string }[];
}

function initialMessages(): Message[] {
  return [{ role: "assistant", content: WELCOME_MESSAGE }];
}

export function AskArchiveChat() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endConversation = () => {
    setMessages(initialMessages());
    setInput("");
    setLoading(false);
    inputRef.current?.focus();
  };

  const send = (text: string) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    setInput("");

    setTimeout(() => {
      const response = queryArchive(text);

      if (response.blocked) {
        setMessages((m) => [
          ...m,
          {
            role: "user",
            content: "Message withheld",
            withheld: true,
          },
          {
            role: "assistant",
            content: response.answer,
          },
        ]);
        trackEvent({
          name: "ask_archive_blocked",
          reason: response.blocked as GuardrailReason,
        });
      } else {
        setMessages((m) => [
          ...m,
          { role: "user", content: text },
          {
            role: "assistant",
            content: response.answer,
            sources: response.sources,
            links: response.chunks.map((c) => ({ title: c.title, href: c.href })),
          },
        ]);
        trackEvent({ name: "ask_archive_query", grounded: response.isGrounded });
      }

      setLoading(false);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Badge variant="muted" className="gap-1">
          <IconRobot className="size-3" stroke={1.5} aria-hidden />
          AI-generated · Grounded in site content
        </Badge>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={endConversation}>
            End chat
          </Button>
          <LinkButton href="/" variant="secondary" className="gap-1.5 px-4 py-2 text-xs">
            <IconX className="size-3.5" stroke={1.5} aria-hidden />
            Exit
          </LinkButton>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-accent/15">
              <IconMessageChatbot className="size-4 text-accent" stroke={1.5} aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Ask the Archive</p>
              <p className="text-xs text-muted-foreground">History & 2050 projections only</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Exit Ask the Archive and return home"
          >
            <IconX className="size-5" stroke={1.5} />
          </button>
        </div>

        <div className="flex h-[420px] flex-col sm:h-[480px]">
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
                      ? msg.withheld
                        ? "border border-border bg-muted italic text-muted-foreground"
                        : "bg-accent text-accent-foreground"
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
                  <IconMessageChatbot className="size-4 animate-pulse text-accent" stroke={1.5} />
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
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Nigerian history or 2050 projections…"
                maxLength={500}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="icon" aria-label="Send" disabled={loading}>
                <IconSend className="size-4" stroke={1.5} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <nav
        aria-label="Leave Ask the Archive"
        className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-border pt-6"
      >
        <LinkButton href="/" variant="secondary" className="gap-1.5">
          <IconHome className="size-4" stroke={1.5} aria-hidden />
          Home
        </LinkButton>
        <LinkButton href="/timeline" variant="secondary" className="gap-1.5">
          <IconTimeline className="size-4" stroke={1.5} aria-hidden />
          Timeline
        </LinkButton>
        <LinkButton href="/sectors" variant="secondary" className="gap-1.5">
          Sector visions
        </LinkButton>
      </nav>
    </div>
  );
}
