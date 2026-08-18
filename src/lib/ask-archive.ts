import { GLOSSARY } from "@/content/glossary";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES } from "@/content/timeline";
import { getSourceById } from "@/content/sources";
import { checkAskGuardrails } from "@/lib/ask-guardrails";
import type { GuardrailReason } from "@/lib/ask-guardrails";

export interface ArchiveChunk {
  id: string;
  text: string;
  title: string;
  href: string;
  type: "timeline" | "sector" | "glossary";
  sourceIds?: string[];
}

const ARCHIVE_CHUNKS: ArchiveChunk[] = [
  ...TIMELINE_ENTRIES.map((e) => ({
    id: e.id,
    text: `${e.title}. ${e.summary} ${e.content}`,
    title: e.title,
    href: `/timeline#${e.id}`,
    type: "timeline" as const,
    sourceIds: e.sourceIds,
  })),
  ...SECTORS.flatMap((s) => [
    {
      id: `sector-${s.slug}-vision`,
      text: `${s.title}. ${s.headline2050} ${s.projections.map((p) => p.narrative).join(" ")}`,
      title: s.title,
      href: `/sectors/${s.slug}`,
      type: "sector" as const,
      sourceIds: s.sourceIds,
    },
  ]),
  ...GLOSSARY.map((g) => ({
    id: `glossary-${g.term}`,
    text: `${g.term}: ${g.definition}`,
    title: g.term,
    href: `/glossary#${encodeURIComponent(g.term)}`,
    type: "glossary" as const,
  })),
];

const OUT_OF_SCOPE_RESPONSE =
  "I can only answer questions grounded in Naija2050's curated content — timeline entries, sector projections, and glossary terms. Try asking about Nigeria's history, a specific sector's 2050 vision, or a term like 'Amalgamation' or 'brain drain'.";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function scoreChunk(query: string, chunk: ArchiveChunk): number {
  const queryTokens = tokenize(query);
  const chunkText = chunk.text.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (chunkText.includes(token)) score += 2;
    if (chunk.title.toLowerCase().includes(token)) score += 5;
  }

  // Phrase bonus
  if (chunkText.includes(query.toLowerCase())) score += 10;

  return score;
}

export interface ArchiveResponse {
  answer: string;
  chunks: ArchiveChunk[];
  sources: { id: string; title: string; publisher: string }[];
  isGrounded: boolean;
  blocked?: GuardrailReason;
}

export function queryArchive(question: string): ArchiveResponse {
  const guardrail = checkAskGuardrails(question);
  if (!guardrail.allowed) {
    return {
      answer: guardrail.message,
      chunks: [],
      sources: [],
      isGrounded: false,
      blocked: guardrail.reason,
    };
  }

  const scored = ARCHIVE_CHUNKS.map((chunk) => ({
    chunk,
    score: scoreChunk(question, chunk),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0 || scored[0].score < 3) {
    return {
      answer: OUT_OF_SCOPE_RESPONSE,
      chunks: [],
      sources: [],
      isGrounded: false,
    };
  }

  const topChunks = scored.map((s) => s.chunk);
  const sourceIds = [...new Set(topChunks.flatMap((c) => c.sourceIds ?? []))];
  const sources = sourceIds
    .map((id) => getSourceById(id))
    .filter(Boolean)
    .map((s) => ({ id: s!.id, title: s!.title, publisher: s!.publisher }));

  const primary = topChunks[0];
  const excerpt = primary.text.slice(0, 400).trim();
  const related = topChunks
    .slice(1)
    .map((c) => c.title)
    .join("; ");

  let answer = `Based on our curated archive: ${excerpt}${excerpt.length >= 400 ? "…" : ""}`;
  if (related) {
    answer += `\n\nRelated: ${related}.`;
  }

  return {
    answer,
    chunks: topChunks,
    sources,
    isGrounded: true,
  };
}

export const SUGGESTED_QUESTIONS = [
  "What caused the Civil War?",
  "How did Nigeria's economy change after oil was discovered?",
  "What is Nigeria's 2050 economic vision?",
  "What was the 1914 Amalgamation?",
  "How is Nigeria diversifying beyond oil?",
  "What is brain drain and can it reverse?",
];
