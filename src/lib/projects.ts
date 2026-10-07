import type { CoolProject } from "@/types/content";
import {
  COOL_PROJECTS,
  PROJECT_REACTIONS,
  type ProjectReactionId,
} from "@/content/projects";
import { redactPii, sanitizePlainText } from "@/lib/ask-guardrails";

export const PROJECT_CLIENT_KEY = "nigeria2050-project-client";
export const PROJECT_VOTES_KEY = "nigeria2050-project-votes";
export const PROJECT_REACTIONS_KEY = "nigeria2050-project-reactions";
export const PROJECT_SUBMISSIONS_KEY = "nigeria2050-project-submissions";

export type ProjectVote = "up" | "down";
export type ProjectVoteMap = Record<string, ProjectVote>;
export type ProjectReactionMap = Record<string, ProjectReactionId>;
export type { ProjectReactionId };

export interface ProjectTally {
  up: number;
  down: number;
}

export type ProjectReactionTally = Record<ProjectReactionId, number>;

export interface ProjectComment {
  id: string;
  body: string;
  recordedAt: string;
  /** True when this browser’s client id authored the comment. Never exposes the id. */
  mine?: boolean;
}

export const EMPTY_REACTION_TALLY: ProjectReactionTally = {
  love: 0,
  curious: 0,
  concern: 0,
  cheer: 0,
};

export function isProjectReactionId(value: string): value is ProjectReactionId {
  return PROJECT_REACTIONS.some((reaction) => reaction.id === value);
}

export function emptyReactionTally(): ProjectReactionTally {
  return { ...EMPTY_REACTION_TALLY };
}

export function projectScore(tally: ProjectTally | undefined): number {
  if (!tally) return 0;
  return tally.up - tally.down;
}

export function hasProjectMock(project: CoolProject): boolean {
  return Boolean(project.mockHref);
}

export function getEditorialProjects(): CoolProject[] {
  return COOL_PROJECTS;
}

export function stripProjectText(value: string, max: number): string {
  return redactPii(sanitizePlainText(value, max));
}

export function isValidProjectId(id: string): boolean {
  return /^[a-z0-9-]{3,80}$/i.test(id);
}

export function isValidClientId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}
