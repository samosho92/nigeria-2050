"use client";

import {
  IconAlertTriangle,
  IconAlertTriangleFilled,
  IconBulb,
  IconBulbFilled,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { useMounted } from "@/hooks/useMounted";
import { PROJECT_ENGAGEMENT, PROJECT_REACTIONS, type ProjectReactionId } from "@/content/projects";
import {
  emptyReactionTally,
  type ProjectReactionTally,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  stroke?: number;
  filled?: boolean;
}

/** Tabler has no hands-clapping glyph in this version; match its 24px stroke style. */
function IconClapping({ className, stroke = 1.5, filled = false }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? Math.max(stroke - 0.4, 1) : stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8.5 13.5 5.8 10a1.5 1.5 0 0 1 .4-2.1l1-.7a1.5 1.5 0 0 1 2 .5L12 11" />
      <path d="M11.5 15.5 8.2 11.2" />
      <path d="m10 17.5 5.2-5.2a2 2 0 0 1 2.8 0l.2.2" />
      <path d="M13.2 9.2 15 6.4a1.4 1.4 0 0 1 2.1-.4l.2.2a1.4 1.4 0 0 1 .3 1.9L16 11" />
      <path d="M16.2 8.2 17.8 5.8a1.3 1.3 0 0 1 2-.3l.1.1a1.3 1.3 0 0 1 .2 1.8L18.5 10" />
      <path d="M8.5 19c1.8 1.4 4 1.8 6.2 1.2 2.4-.7 4-2.4 4.8-4.6" />
    </svg>
  );
}

const OUTLINE_ICONS: Record<ProjectReactionId, TablerIcon | typeof IconClapping> = {
  love: IconHeart,
  curious: IconBulb,
  concern: IconAlertTriangle,
  cheer: IconClapping,
};

const FILLED_ICONS: Record<ProjectReactionId, TablerIcon | typeof IconClapping> = {
  love: IconHeartFilled,
  curious: IconBulbFilled,
  concern: IconAlertTriangleFilled,
  cheer: IconClapping,
};

interface ProjectReactionsProps {
  tally: ProjectReactionTally | undefined;
  myReaction: ProjectReactionId | undefined;
  onReact: (reaction: ProjectReactionId) => void;
  disabled?: boolean;
}

function StaticReactionGlyph({
  id,
  selected,
}: {
  id: ProjectReactionId;
  selected: boolean;
}) {
  if (id === "cheer") {
    return <IconClapping className="size-3.5" stroke={1.5} filled={selected} />;
  }
  const Icon = selected ? FILLED_ICONS[id] : OUTLINE_ICONS[id];
  return <Icon className="size-3.5" stroke={1.5} aria-hidden />;
}

function ReactionIcon({
  id,
  selected,
  animate,
}: {
  id: ProjectReactionId;
  selected: boolean;
  animate: boolean;
}) {
  // Keep a stable wrapper so SSR and the first client paint share the same HTML.
  return (
    <span className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
      {animate ? (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={`${id}-${selected ? "filled" : "outline"}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={
              selected
                ? { scale: 0.35, opacity: 0, rotate: id === "love" ? -14 : -8 }
                : { scale: 0.85, opacity: 0 }
            }
            animate={
              selected
                ? { scale: [0.35, 1.28, 1], opacity: 1, rotate: 0 }
                : { scale: 1, opacity: 1, rotate: 0 }
            }
            exit={{ scale: 0.7, opacity: 0 }}
            transition={
              selected
                ? { type: "spring", stiffness: 520, damping: 18, mass: 0.55 }
                : { duration: 0.16 }
            }
          >
            <StaticReactionGlyph id={id} selected={selected} />
          </motion.span>
        </AnimatePresence>
      ) : (
        <StaticReactionGlyph id={id} selected={selected} />
      )}
    </span>
  );
}

export function ProjectReactions({
  tally,
  myReaction,
  onReact,
  disabled,
}: ProjectReactionsProps) {
  const counts = tally ?? emptyReactionTally();
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { enabled: dataSaver } = useDataSaver();
  // Wait until mount so server HTML matches the first client render.
  const animate = mounted && !prefersReducedMotion && !dataSaver;

  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {PROJECT_ENGAGEMENT.reactionsLabel}
      </p>
      <div
        className="mt-2 flex flex-wrap gap-1.5"
        role="group"
        aria-label={PROJECT_ENGAGEMENT.reactionsLabel}
      >
        {PROJECT_REACTIONS.map((reaction) => {
          const count = counts[reaction.id];
          const selected = myReaction === reaction.id;

          return (
            <motion.button
              key={reaction.id}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={PROJECT_ENGAGEMENT.reactionAria(reaction.label, count, selected)}
              onClick={() => onReact(reaction.id)}
              whileTap={animate && !disabled ? { scale: 0.94 } : undefined}
              animate={
                animate
                  ? {
                      scale: selected ? 1.03 : 1,
                      y: selected ? -1 : 0,
                    }
                  : undefined
              }
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className={cn(
                "inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                selected
                  ? "border-accent bg-accent/12 text-accent shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_25%,transparent)]"
                  : "border-border bg-surface text-muted-foreground hover:border-accent/50 hover:text-foreground",
                disabled && "opacity-50",
              )}
            >
              <ReactionIcon id={reaction.id} selected={selected} animate={animate} />
              <span>{reaction.label}</span>
              <span
                className={cn(
                  "tabular-nums",
                  selected ? "text-accent" : "text-muted-foreground",
                )}
              >
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
