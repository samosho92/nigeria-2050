import { GLOSSARY } from "@/content/glossary";
import { ICONS } from "@/content/icons";
import { COOL_PROJECTS } from "@/content/projects";
import { PULSE_CATEGORIES, PULSE_META, PULSE_POLLS, PULSE_SESSION_SIZE } from "@/content/polls";
import { POSTAL_CODE_SCHEME } from "@/content/postal-code-engine";
import { LIBRARY_STANDARD } from "@/content/public-libraries";
import { EMERGENCY_STANDARD } from "@/content/emergency-112";
import { TITLE_STANDARD } from "@/content/land-titles";
import { GRID_STANDARD } from "@/content/grid-outage";
import { BUDGET_STANDARD } from "@/content/open-budgets";
import { ROAD_SIGN_STANDARD } from "@/content/road-signs";
import { SECTORS } from "@/content/sectors";
import { TIMELINE_ENTRIES } from "@/content/timeline";
import { getSourceById } from "@/content/sources";
import { checkAskGuardrails, isInternalPath, type GuardrailReason } from "@/lib/ask-guardrails";

export interface ArchiveChunk {
  id: string;
  text: string;
  title: string;
  href: string;
  type: "timeline" | "sector" | "glossary" | "icon" | "project" | "pulse";
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
  ...ICONS.map((figure) => ({
    id: `icon-${figure.id}`,
    text: `${figure.name}. ${figure.achievement} ${figure.summary}`,
    title: figure.name,
    href: `/icons#${figure.id}`,
    type: "icon" as const,
    sourceIds: [`icon-${figure.id}`],
  })),
  ...COOL_PROJECTS.map((project) => ({
    id: `project-${project.id}`,
    text: `${project.title}. ${project.summary} ${project.detail} Inspired by ${project.inspiredBy}.`,
    title: project.title,
    href: project.mockHref ?? `/projects#${project.id}`,
    type: "project" as const,
  })),
  {
    id: "project-postal-codes-engine",
    text: `National postal code engine mock. Format ${POSTAL_CODE_SCHEME.example}: state plate, density band (rural peri-urban urban), district 01 for each state capital, then a street-zone unit. Urban codes split named streets onto odd and even sides (Independence Avenue odd and even sides have separate codes). Rural clusters have no street zones until roads are gazetted.`,
    title: "National postal code engine",
    href: "/projects/postal-codes",
    type: "project" as const,
  },
  {
    id: "project-road-signs-campaign",
    text: `Road-sign campaign mock. National shape book ${ROAD_SIGN_STANDARD.name}: speed limits 50/80/100, stop, yield, school zone, kilometre markers. Seed corridors between capitals (Lagos–Ibadan, Abuja–Kaduna, Kaduna–Kano, Enugu–Port Harcourt, Kano–Maiduguri). Installed, missing, or damaged on this schematic.`,
    title: "Road-sign campaign",
    href: "/projects/road-signs",
    type: "project" as const,
  },
  {
    id: "project-public-libraries-floor",
    text: `Public library floor mock. National standard ${LIBRARY_STANDARD.name}: rural floor ${LIBRARY_STANDARD.ruralFloorKm} km, then urban densify within ${LIBRARY_STANDARD.urbanWalkKm} km or one branch per 50,000 people. Minimum kit: children’s section, study seats, working toilets, electricity, a librarian, wifi. Seed systems in Abuja, Ikeja, Kano, Enugu, Port Harcourt, Maiduguri, Makurdi, Yenagoa. A title in Makurdi can be requested in Maiduguri.`,
    title: "Public library floor",
    href: "/projects/public-libraries",
    type: "project" as const,
  },
  {
    id: "project-emergency-112-desk",
    text: `Emergency 112 dispatch mock. National desk ${EMERGENCY_STANDARD.name}: one number ${EMERGENCY_STANDARD.number}, answer in ${EMERGENCY_STANDARD.answerSeconds} seconds, locate on the postal code (FC-U01-001 Independence Avenue odd; rural FC-R04-027 Kwali hinterland has no street zone), classify police fire ambulance, protocol card, assign nearest radio unit, ACK in ${EMERGENCY_STANDARD.ackSeconds} seconds or send the next unit, never voicemail. Launch gate: night call-takers, dispatcher, radio, urban codes loaded. Maiduguri cluster is not published because the night line would ring into voicemail. Seed clusters: Abuja, Ikeja, Kano, Enugu, Port Harcourt. Languages: English, Pidgin, Hausa, Yoruba, Igbo.`,
    title: "Emergency 112 dispatch",
    href: "/projects/emergency-112",
    type: "project" as const,
  },
  {
    id: "project-land-titles-register",
    text: `Land title register mock. Torrens-style folio ${TITLE_STANDARD.name}: one record per parcel, mapped to the postal street zone, queryable, with governor’s or FCT minister’s consent on the same record. Bankable only if queryable, mapped, C of O or R of O, consent granted or not required, and no caveat or dispute. A mortgage noted on a clean folio can still be bankable. Sample folios: Independence Avenue odd FC-U01-001 plot 17 (bankable), Allen Avenue dispute, Kwali hinterland customary unmapped. Seed registries: Abuja, Ikeja, Kano, Enugu, Port Harcourt, Kaduna.`,
    title: "Land title register",
    href: "/projects/land-titles",
    type: "project" as const,
  },
  {
    id: "project-grid-outage-watch",
    text: `Grid outage map mock. National hour ${GRID_STANDARD.name}, snapshot ${GRID_STANDARD.snapshotLabel}: generated ${GRID_STANDARD.generatedMw} MW versus unconstrained demand ${GRID_STANDARD.unconstrainedDemandMw} MW. Fuel mix gas hydro solar import. Plants (Egbin, Kainji, Jebba, Shiroro, Zungeru, Azura-Edo) post output versus capability. DisCo feeders with status on, load-shed, fault, or unknown, a restoration window or an honest unknown. AEDC Garki clinic shed 20:00–22:00 WAT. Maiduguri / Yola offtake does not publish timestamps.`,
    title: "Grid outage map",
    href: "/projects/grid-outage",
    type: "project" as const,
  },
  {
    id: "project-open-budgets-portal",
    text: `Open budgets mock. National standard ${BUDGET_STANDARD.name}: 2026 Appropriation Act envelope ₦68.32tn, assented 17 April 2026 (State House). Capital ₦32.2tn, recurrent ₦15.4tn, debt service ₦15.8tn, statutory transfers ₦4.799tn. MDA vintage at passage: Works capital, Agriculture capital, Defence recurrent. Sample awards: FC-WORKS-2026-0147 Abuja–Kaduna dual, PL-MKT-2026-0004 Jos terminus lighting signed 24 April 2026, AB-PWR-2026-0011 Aba artisan meters. Seed jurisdictions: Federal, Lagos, Kaduna, Rivers, Plateau, Abia. Supplier labels are classes.`,
    title: "Open budgets and contracts",
    href: "/projects/open-budgets",
    type: "project" as const,
  },
  {
    id: "street-pulse",
    text: `${PULSE_META.name} at /pulse. ${PULSE_META.description} Each visit draws ${PULSE_SESSION_SIZE} questions from ${PULSE_POLLS.length} across ${PULSE_CATEGORIES.length} categories. Refresh the page for a new round from questions you have not answered. ${PULSE_CATEGORIES.map((category) => `${category.wheel}: ${PULSE_POLLS.filter((poll) => poll.category === category.id).map((poll) => poll.question).join(" ")}`).join(" ")} Age band, gender, and geopolitical zone travel with each ballot. Results unlock after you answer that question. Live n from this site. Convenience sample of Naija2050 readers in Nigeria. Aggregate tables may be licensed to teams marketing in Nigeria.`,
    title: PULSE_META.name,
    href: "/pulse",
    type: "pulse" as const,
  },
  ...GLOSSARY.map((g) => ({
    id: `glossary-${g.term}`,
    text: `${g.term}: ${g.definition}`,
    title: g.term,
    href: `/glossary#${encodeURIComponent(g.term)}`,
    type: "glossary" as const,
  })),
];

const OUT_OF_SCOPE_RESPONSE =
  "I can only answer questions grounded in Naija2050's curated content, timeline entries, sector projections, icons, cool projects, Street Pulse, and glossary terms. Try asking about Nigeria's history, a specific person on the Icons page, a sector's 2050 vision, a civic project like postal codes, Street Pulse polls, or a term like 'Amalgamation' or 'brain drain'.";

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

export interface ArchiveAnswer {
  answer: string;
  isGrounded: boolean;
  blocked?: GuardrailReason;
  sources: { id: string; title: string; publisher: string }[];
  links: { title: string; href: string }[];
}

export interface ArchiveResponse {
  answer: string;
  chunks: ArchiveChunk[];
  sources: { id: string; title: string; publisher: string }[];
  isGrounded: boolean;
  blocked?: GuardrailReason;
}

function toSafeAnswer(response: ArchiveResponse): ArchiveAnswer {
  return {
    answer: response.answer,
    isGrounded: response.isGrounded,
    blocked: response.blocked,
    sources: response.sources,
    links: response.chunks
      .map((chunk) => ({ title: chunk.title, href: chunk.href }))
      .filter((link) => isInternalPath(link.href)),
  };
}

export function queryArchive(question: string): ArchiveResponse {
  const trimmed = question.trim().slice(0, 500);
  const guardrail = checkAskGuardrails(trimmed);
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
    score: scoreChunk(trimmed, chunk),
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

  const topChunks = scored.map((s) => s.chunk).filter((chunk) => isInternalPath(chunk.href));
  const primary = topChunks[0];
  if (!primary) {
    return {
      answer: OUT_OF_SCOPE_RESPONSE,
      chunks: [],
      sources: [],
      isGrounded: false,
    };
  }

  const sourceIds = [...new Set(topChunks.flatMap((c) => c.sourceIds ?? []))];
  const sources = sourceIds
    .map((id) => getSourceById(id))
    .filter(Boolean)
    .map((s) => ({ id: s!.id, title: s!.title, publisher: s!.publisher }));

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

export function answerArchiveQuestion(question: string): ArchiveAnswer {
  return toSafeAnswer(queryArchive(question));
}
