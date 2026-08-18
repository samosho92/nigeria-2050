import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { CoolProject } from "@/types/content";
import { isValidClientId, isValidProjectId, stripProjectText, type ProjectTally, type ProjectVote } from "@/lib/projects";

interface Store {
  votes: Record<string, Record<string, ProjectVote>>;
  submissions: CoolProject[];
}

const EMPTY: Store = { votes: {}, submissions: [] };

function storeFile(): string {
  if (process.env.VERCEL) {
    return path.join(tmpdir(), "naija2050-projects.json");
  }
  return path.join(process.cwd(), "data", "projects-runtime.json");
}

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(storeFile(), "utf8");
    const parsed = JSON.parse(raw) as Store;
    return {
      votes: parsed.votes ?? {},
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
    };
  } catch {
    return { votes: {}, submissions: [] };
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

export async function getProjectTallies(): Promise<Record<string, ProjectTally>> {
  const store = await readStore();
  return Object.fromEntries(
    Object.entries(store.votes).map(([id, votes]) => [id, tallyFromVotes(votes)]),
  );
}

export async function getCommunityProjects(): Promise<CoolProject[]> {
  const store = await readStore();
  return store.submissions
    .map(sanitizeStoredProject)
    .filter((project): project is CoolProject => Boolean(project));
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
    inspiredBy: stripProjectText(typeof value.inspiredBy === "string" ? value.inspiredBy : "Reader proposal", 120),
    sectorSlugs,
    source: value.source,
    submittedAt: typeof value.submittedAt === "string" ? value.submittedAt.slice(0, 40) : undefined,
  };
}
