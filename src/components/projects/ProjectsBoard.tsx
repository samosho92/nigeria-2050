"use client";

import { useEffect, useMemo, useState } from "react";
import { FadeIn } from "@/components/motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECT_ENGAGEMENT } from "@/content/projects";
import { useMounted } from "@/hooks/useMounted";
import { trackEvent } from "@/lib/analytics";
import {
  hasProjectMock,
  isProjectReactionId,
  isValidClientId,
  PROJECT_CLIENT_KEY,
  PROJECT_REACTIONS_KEY,
  PROJECT_SUBMISSIONS_KEY,
  PROJECT_VOTES_KEY,
  type ProjectComment,
  type ProjectReactionId,
  type ProjectReactionMap,
  type ProjectReactionTally,
  type ProjectTally,
  type ProjectVote,
  type ProjectVoteMap,
} from "@/lib/projects";
import { FilterChip } from "@/components/ui/FilterChip";
import type { CoolProject } from "@/types/content";

type SortMode = "top" | "newest";

function readClientId(): string {
  const existing = localStorage.getItem(PROJECT_CLIENT_KEY);
  if (existing && isValidClientId(existing)) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(PROJECT_CLIENT_KEY, id);
  return id;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

interface ProjectsBoardProps {
  editorial: CoolProject[];
  sectorTitles: Record<string, string>;
}

export function ProjectsBoard({ editorial, sectorTitles }: ProjectsBoardProps) {
  const mounted = useMounted();
  const [community, setCommunity] = useState<CoolProject[]>([]);
  const [tallies, setTallies] = useState<Record<string, ProjectTally>>({});
  const [reactionTallies, setReactionTallies] = useState<Record<string, ProjectReactionTally>>(
    {},
  );
  const [commentsByProject, setCommentsByProject] = useState<Record<string, ProjectComment[]>>(
    {},
  );
  const [myVotes, setMyVotes] = useState<ProjectVoteMap>({});
  const [myReactions, setMyReactions] = useState<ProjectReactionMap>({});
  const [clientId, setClientId] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortMode>("top");

  const projects = useMemo(() => {
    const seen = new Set(editorial.map((project) => project.id));
    const extra = community.filter((project) => !seen.has(project.id));
    return [...editorial, ...extra];
  }, [editorial, community]);

  useEffect(() => {
    if (!mounted) return;
    const id = readClientId();
    setClientId(id);
    setMyVotes(readJson<ProjectVoteMap>(PROJECT_VOTES_KEY, {}));
    const storedReactions = readJson<ProjectReactionMap>(PROJECT_REACTIONS_KEY, {});
    const validReactions = Object.fromEntries(
      Object.entries(storedReactions).filter((entry): entry is [string, ProjectReactionId] =>
        isProjectReactionId(entry[1]),
      ),
    );
    setMyReactions(validReactions);
    setCommunity(readJson<CoolProject[]>(PROJECT_SUBMISSIONS_KEY, []));

    fetch(`/api/projects?clientId=${encodeURIComponent(id)}`)
      .then((response) => response.json())
      .then(
        (data: {
          ok?: boolean;
          tallies?: Record<string, ProjectTally>;
          reactions?: Record<string, ProjectReactionTally>;
          comments?: Record<string, ProjectComment[]>;
          community?: CoolProject[];
        }) => {
          if (!data.ok) return;
          if (data.tallies) setTallies(data.tallies);
          if (data.reactions) setReactionTallies(data.reactions);
          if (data.comments) setCommentsByProject(data.comments);
          if (data.community) {
            setCommunity((local) => {
              const merged = [...data.community!, ...local];
              const unique = new Map(merged.map((project) => [project.id, project]));
              return [...unique.values()];
            });
          }
        },
      )
      .catch(() => {
        // local votes still work if the tally is down
      });
  }, [mounted]);

  const persistVotes = (next: ProjectVoteMap) => {
    setMyVotes(next);
    try {
      localStorage.setItem(PROJECT_VOTES_KEY, JSON.stringify(next));
    } catch {
      // ignore quota
    }
  };

  const persistReactions = (next: ProjectReactionMap) => {
    setMyReactions(next);
    try {
      localStorage.setItem(PROJECT_REACTIONS_KEY, JSON.stringify(next));
    } catch {
      // ignore quota
    }
  };

  const vote = async (projectId: string, direction: ProjectVote) => {
    const previous = myVotes[projectId];
    const nextVote = previous === direction ? undefined : direction;
    const nextMap = { ...myVotes };
    if (nextVote) nextMap[projectId] = nextVote;
    else delete nextMap[projectId];
    persistVotes(nextMap);
    trackEvent({ name: "project_vote", projectId, vote: nextVote ?? "none" });

    try {
      const response = await fetch("/api/projects/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, projectId, vote: nextVote ?? null }),
      });
      const data = (await response.json()) as { ok?: boolean; tally?: ProjectTally };
      if (data.ok && data.tally) {
        setTallies((current) => ({ ...current, [projectId]: data.tally! }));
      }
    } catch {
      persistVotes(myVotes);
    }
  };

  const react = async (projectId: string, reaction: ProjectReactionId) => {
    const previous = myReactions[projectId];
    const nextReaction = previous === reaction ? undefined : reaction;
    const nextMap = { ...myReactions };
    if (nextReaction) nextMap[projectId] = nextReaction;
    else delete nextMap[projectId];
    persistReactions(nextMap);
    trackEvent({
      name: "project_react",
      projectId,
      reaction: nextReaction ?? "none",
    });

    try {
      const response = await fetch("/api/projects/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          projectId,
          reaction: nextReaction ?? null,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        tally?: ProjectReactionTally;
      };
      if (data.ok && data.tally) {
        setReactionTallies((current) => ({ ...current, [projectId]: data.tally! }));
      }
    } catch {
      persistReactions(myReactions);
    }
  };

  const comment = async (
    projectId: string,
    body: string,
  ): Promise<{ ok: boolean; message?: string }> => {
    try {
      const response = await fetch("/api/projects/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, projectId, body }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        refused?: boolean;
        message?: string;
        comments?: ProjectComment[];
      };

      if (!response.ok || !data.ok) {
        trackEvent({
          name: "project_comment_refused",
          projectId,
          reason: data.refused ? "policy" : "error",
        });
        return {
          ok: false,
          message: data.message || PROJECT_ENGAGEMENT.commentRefusedFallback,
        };
      }

      if (data.comments) {
        setCommentsByProject((current) => ({ ...current, [projectId]: data.comments! }));
      }
      trackEvent({ name: "project_comment", projectId });
      return { ok: true };
    } catch {
      return { ok: false, message: PROJECT_ENGAGEMENT.commentRefusedFallback };
    }
  };

  const deleteComment = async (
    projectId: string,
    commentId: string,
  ): Promise<{ ok: boolean; message?: string }> => {
    try {
      const response = await fetch("/api/projects/comment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, projectId, commentId }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        comments?: ProjectComment[];
      };

      if (!response.ok || !data.ok) {
        return {
          ok: false,
          message: data.message || PROJECT_ENGAGEMENT.commentDeleteFailed,
        };
      }

      setCommentsByProject((current) => ({
        ...current,
        [projectId]: data.comments ?? [],
      }));
      return { ok: true };
    } catch {
      return { ok: false, message: PROJECT_ENGAGEMENT.commentDeleteFailed };
    }
  };

  const visible = useMemo(() => {
    const filtered =
      sectorFilter === "all"
        ? projects
        : projects.filter((project) => project.sectorSlugs.includes(sectorFilter));

    return [...filtered].sort((a, b) => {
      const mockPin = Number(hasProjectMock(b)) - Number(hasProjectMock(a));
      if (mockPin !== 0) return mockPin;

      if (sort === "newest") {
        const aTime = a.submittedAt ?? "";
        const bTime = b.submittedAt ?? "";
        if (a.source !== b.source) return a.source === "community" ? -1 : 1;
        return bTime.localeCompare(aTime);
      }
      const scoreDiff =
        (tallies[b.id]?.up ?? 0) -
        (tallies[b.id]?.down ?? 0) -
        ((tallies[a.id]?.up ?? 0) - (tallies[a.id]?.down ?? 0));
      if (scoreDiff !== 0) return scoreDiff;
      return a.title.localeCompare(b.title);
    });
  }, [projects, sectorFilter, sort, tallies]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          <FilterChip active={sectorFilter === "all"} onClick={() => setSectorFilter("all")} label="All sectors" />
          {Object.entries(sectorTitles).map(([slug, label]) => (
            <FilterChip
              key={slug}
              active={sectorFilter === slug}
              onClick={() => setSectorFilter(slug)}
              label={label}
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          <FilterChip active={sort === "top"} onClick={() => setSort("top")} label="Top" />
          <FilterChip active={sort === "newest"} onClick={() => setSort("newest")} label="Newest" />
        </div>
      </div>

      <ul className="space-y-4">
        {visible.map((project, index) => (
          <li key={project.id}>
            <FadeIn delay={Math.min(index * 0.04, 0.2)}>
              <ProjectCard
                project={project}
                sectorTitles={sectorTitles}
                tally={tallies[project.id]}
                myVote={myVotes[project.id]}
                onVote={(direction) => vote(project.id, direction)}
                reactionTally={reactionTallies[project.id]}
                myReaction={myReactions[project.id]}
                onReact={(reaction) => react(project.id, reaction)}
                comments={commentsByProject[project.id] ?? []}
                onComment={(body) => comment(project.id, body)}
                onDeleteComment={(commentId) => deleteComment(project.id, commentId)}
                disabled={!clientId}
              />
            </FadeIn>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="text-center text-muted-foreground">{PROJECT_ENGAGEMENT.emptySector}</p>
      ) : null}

      <p className="text-xs text-muted-foreground">{PROJECT_ENGAGEMENT.boardFootnote}</p>
    </div>
  );
}
