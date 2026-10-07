import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { COOL_PROJECTS } from "@/content/projects";
import type { CoolProject } from "@/types/content";
import {
  emptyReactionTally,
  isProjectReactionId,
  isValidClientId,
  isValidProjectId,
  stripProjectText,
  type ProjectComment,
  type ProjectReactionId,
  type ProjectReactionTally,
  type ProjectTally,
  type ProjectVote,
} from "@/lib/projects";

interface StoredComment {
  id: string;
  clientId: string;
  body: string;
  recordedAt: string;
}

interface Store {
  votes: Record<string, Record<string, ProjectVote>>;
  reactions: Record<string, Record<string, ProjectReactionId>>;
  comments: Record<string, StoredComment[]>;
  submissions: CoolProject[];
}

const EMPTY: Store = { votes: {}, reactions: {}, comments: {}, submissions: [] };
const MAX_COMMENTS_PER_PROJECT = 50;
const MAX_COMMENTS_RETURNED = 20;
const MAX_COMMENTS_PER_CLIENT_PER_PROJECT = 3;

function storeFile(): string {
  if (process.env.VERCEL) {
    return path.join(tmpdir(), "nigeria2050-projects.json");
  }
  return path.join(process.cwd(), "data", "projects-runtime.json");
}

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(storeFile(), "utf8");
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      votes: parsed.votes && typeof parsed.votes === "object" ? parsed.votes : {},
      reactions:
        parsed.reactions && typeof parsed.reactions === "object" ? parsed.reactions : {},
      comments:
        parsed.comments && typeof parsed.comments === "object" ? parsed.comments : {},
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
    };
  } catch {
    return { votes: {}, reactions: {}, comments: {}, submissions: [] };
  }
}

async function writeStore(store: Store): Promise<void> {
  const file = storeFile();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(store), "utf8");
}

export function tallyFromVotes(votes: Record<string, ProjectVote> | undefined): ProjectTally {
  const entries = Object.values(votes ?? {});
  return {
    up: entries.filter((vote) => vote === "up").length,
    down: entries.filter((vote) => vote === "down").length,
  };
}

export function tallyFromReactions(
  reactions: Record<string, ProjectReactionId> | undefined,
): ProjectReactionTally {
  const tally = emptyReactionTally();
  for (const reaction of Object.values(reactions ?? {})) {
    if (isProjectReactionId(reaction)) tally[reaction] += 1;
  }
  return tally;
}

function toPublicComment(comment: StoredComment): ProjectComment {
  return {
    id: comment.id,
    body: comment.body,
    recordedAt: comment.recordedAt,
  };
}

export async function getProjectTallies(): Promise<Record<string, ProjectTally>> {
  const store = await readStore();
  return Object.fromEntries(
    Object.entries(store.votes).map(([id, votes]) => [id, tallyFromVotes(votes)]),
  );
}

export async function getProjectReactionTallies(): Promise<
  Record<string, ProjectReactionTally>
> {
  const store = await readStore();
  return Object.fromEntries(
    Object.entries(store.reactions).map(([id, reactions]) => [
      id,
      tallyFromReactions(reactions),
    ]),
  );
}

export async function getProjectCommentsMap(): Promise<Record<string, ProjectComment[]>> {
  const store = await readStore();
  return Object.fromEntries(
    Object.entries(store.comments).map(([id, comments]) => [
      id,
      comments
        .slice()
        .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))
        .slice(0, MAX_COMMENTS_RETURNED)
        .map(toPublicComment),
    ]),
  );
}

export async function getCommunityProjects(): Promise<CoolProject[]> {
  const store = await readStore();
  return store.submissions
    .map(sanitizeStoredProject)
    .filter((project): project is CoolProject => Boolean(project));
}

export async function isKnownProjectId(projectId: string): Promise<boolean> {
  if (!isValidProjectId(projectId)) return false;
  if (COOL_PROJECTS.some((project) => project.id === projectId)) return true;
  const community = await getCommunityProjects();
  return community.some((project) => project.id === projectId);
}

export async function setClientVote(
  clientId: string,
  projectId: string,
  vote: ProjectVote | null,
): Promise<ProjectTally> {
  if (!isValidClientId(clientId) || !isValidProjectId(projectId)) {
    throw new Error("Invalid id");
  }

  const store = (await readStore()) ?? EMPTY;
  const current = { ...(store.votes[projectId] ?? {}) };

  if (Object.keys(current).length > 5000 && !current[clientId] && vote) {
    throw new Error("Vote cap");
  }

  if (vote === null) {
    delete current[clientId];
  } else {
    current[clientId] = vote;
  }

  store.votes[projectId] = current;
  await writeStore(store);
  return tallyFromVotes(current);
}

export async function setClientReaction(
  clientId: string,
  projectId: string,
  reaction: ProjectReactionId | null,
): Promise<ProjectReactionTally> {
  if (!isValidClientId(clientId) || !isValidProjectId(projectId)) {
    throw new Error("Invalid id");
  }
  if (reaction !== null && !isProjectReactionId(reaction)) {
    throw new Error("Invalid reaction");
  }

  const store = await readStore();
  const current = { ...(store.reactions[projectId] ?? {}) };

  if (Object.keys(current).length > 8000 && !current[clientId] && reaction) {
    throw new Error("Reaction cap");
  }

  if (reaction === null) {
    delete current[clientId];
  } else {
    current[clientId] = reaction;
  }

  store.reactions[projectId] = current;
  await writeStore(store);
  return tallyFromReactions(current);
}

export async function addProjectComment(
  clientId: string,
  projectId: string,
  body: string,
): Promise<ProjectComment> {
  if (!isValidClientId(clientId) || !isValidProjectId(projectId)) {
    throw new Error("Invalid id");
  }

  const cleaned = stripProjectText(body, 400);
  if (cleaned.length < 12) {
    throw new Error("Short comment");
  }

  const store = await readStore();
  const existing = store.comments[projectId] ?? [];
  if (existing.length >= MAX_COMMENTS_PER_PROJECT) {
    throw new Error("Comment cap");
  }

  const mine = existing.filter((comment) => comment.clientId === clientId);
  if (mine.length >= MAX_COMMENTS_PER_CLIENT_PER_PROJECT) {
    throw new Error("Client comment cap");
  }

  const duplicate = mine.some(
    (comment) => comment.body.toLowerCase() === cleaned.toLowerCase(),
  );
  if (duplicate) {
    throw new Error("Duplicate comment");
  }

  const comment: StoredComment = {
    id: crypto.randomUUID(),
    clientId,
    body: cleaned,
    recordedAt: new Date().toISOString(),
  };

  store.comments[projectId] = [comment, ...existing].slice(0, MAX_COMMENTS_PER_PROJECT);
  await writeStore(store);
  return toPublicComment(comment);
}

export async function addCommunityProject(project: CoolProject): Promise<CoolProject> {
  const store = await readStore();
  if (store.submissions.some((item) => item.id === project.id)) {
    return project;
  }
  store.submissions = [project, ...store.submissions].slice(0, 200);
  await writeStore(store);
  return project;
}

export function sanitizeStoredProject(raw: unknown): CoolProject | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Partial<CoolProject>;
  if (typeof value.id !== "string" || !isValidProjectId(value.id)) return null;
  if (typeof value.title !== "string" || typeof value.summary !== "string") return null;
  if (value.source !== "community" && value.source !== "editorial") return null;
  const sectorSlugs = Array.isArray(value.sectorSlugs)
    ? value.sectorSlugs.filter((slug): slug is string => typeof slug === "string").slice(0, 3)
    : [];
  if (sectorSlugs.length === 0) return null;

  return {
    id: value.id,
    title: stripProjectText(value.title, 80),
    summary: stripProjectText(value.summary, 280),
    detail: stripProjectText(typeof value.detail === "string" ? value.detail : value.summary, 1200),
    inspiredBy: stripProjectText(
      typeof value.inspiredBy === "string" ? value.inspiredBy : "Reader proposal",
      120,
    ),
    sectorSlugs,
    source: value.source,
    submittedAt: typeof value.submittedAt === "string" ? value.submittedAt.slice(0, 40) : undefined,
  };
}
