"use client";

import { IconCaretDown, IconCaretUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { projectScore, type ProjectTally, type ProjectVote } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectVoteControlsProps {
  tally: ProjectTally | undefined;
  myVote: ProjectVote | undefined;
  onVote: (vote: ProjectVote) => void;
  disabled?: boolean;
}

export function ProjectVoteControls({
  tally,
  myVote,
  onVote,
  disabled,
}: ProjectVoteControlsProps) {
  const score = projectScore(tally);

  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        aria-pressed={myVote === "up"}
        aria-label="Upvote"
        onClick={() => onVote("up")}
        className={cn("size-8", myVote === "up" && "text-accent")}
      >
        <IconCaretUp className="size-6" stroke={1.5} aria-hidden />
      </Button>
      <p className="min-w-[2.5ch] text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {score}
      </p>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        aria-pressed={myVote === "down"}
        aria-label="Downvote"
        onClick={() => onVote("down")}
        className={cn("size-8", myVote === "down" && "text-accent")}
      >
        <IconCaretDown className="size-6" stroke={1.5} aria-hidden />
      </Button>
    </div>
  );
}
