import type { CoolProject } from "@/types/content";
import { COOL_PROJECTS } from "@/content/projects";
import { redactPii, sanitizePlainText } from "@/lib/ask-guardrails";

export const PROJECT_CLIENT_KEY = "naija2050-project-client";
export const PROJECT_VOTES_KEY = "naija2050-project-votes";
export const PROJECT_SUBMISSIONS_KEY = "naija2050-project-submissions";

export type ProjectVote = "up" | "down";
export type ProjectVoteMap = Record<string, ProjectVote>;

export interface ProjectTally {
  up: number;
  down: number;
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
