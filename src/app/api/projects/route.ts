import { COOL_PROJECTS } from "@/content/projects";
import {
  getCommunityProjects,
  getProjectCommentsMap,
  getProjectReactionTallies,
  getProjectTallies,
  sanitizeStoredProject,
} from "@/lib/projects-store";
import { getClientIp, jsonError, rateLimitDurable } from "@/lib/security";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!(await rateLimitDurable(`projects-get:${ip}`, 60, 60_000))) {
    return jsonError("Too many requests", 429);
  }

  const [tallies, reactions, comments, community] = await Promise.all([
    getProjectTallies(),
    getProjectReactionTallies(),
    getProjectCommentsMap(),
    getCommunityProjects(),
  ]);
  const safeCommunity = community.map(sanitizeStoredProject).filter(Boolean).slice(0, 50);

  return Response.json({
    ok: true,
    editorialIds: COOL_PROJECTS.map((project) => project.id),
    tallies,
    reactions,
    comments,
    community: safeCommunity,
  });
}
