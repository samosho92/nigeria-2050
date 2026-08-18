import { COOL_PROJECTS } from "@/content/projects";
import { getCommunityProjects, getProjectTallies, sanitizeStoredProject } from "@/lib/projects-store";
import { getClientIp, jsonError, rateLimit } from "@/lib/security";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!rateLimit(`projects-get:${ip}`, 120, 60_000)) {
    return jsonError("Too many requests", 429);
  }

  const [tallies, community] = await Promise.all([getProjectTallies(), getCommunityProjects()]);
  const safeCommunity = community.map(sanitizeStoredProject).filter(Boolean).slice(0, 50);

  return Response.json({
    ok: true,
    editorialIds: COOL_PROJECTS.map((project) => project.id),
    tallies,
    community: safeCommunity,
  });
}
