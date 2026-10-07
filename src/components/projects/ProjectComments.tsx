"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PROJECT_ENGAGEMENT } from "@/content/projects";
import type { ProjectComment } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCommentsProps {
  projectId: string;
  comments: ProjectComment[];
  onSubmit: (body: string) => Promise<{ ok: boolean; message?: string }>;
  onDelete?: (commentId: string) => Promise<{ ok: boolean; message?: string }>;
  disabled?: boolean;
}

function formatCommentTime(iso: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function ProjectComments({
  projectId,
  comments,
  onSubmit,
  onDelete,
  disabled,
}: ProjectCommentsProps) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const copy = PROJECT_ENGAGEMENT;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving || disabled) return;
    setSaving(true);
    setError("");
    const result = await onSubmit(body);
    setSaving(false);
    if (!result.ok) {
      setError(result.message || copy.commentRefusedFallback);
      return;
    }
    setBody("");
    setOpen(true);
  };

  const handleDelete = async (commentId: string) => {
    if (!onDelete || disabled || deletingId) return;
    setDeletingId(commentId);
    setError("");
    const result = await onDelete(commentId);
    setDeletingId("");
    if (!result.ok) {
      setError(result.message || copy.commentDeleteFailed);
    }
  };

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {copy.commentsTitle}
        </p>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="text-xs font-medium text-accent hover:underline"
        >
          {open ? copy.commentsToggleHide : copy.commentsToggleShow}
          {" · "}
          {copy.commentsCount(comments.length)}
        </button>
      </div>

      {open ? (
        <div className="mt-3 space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">{copy.commentsEmpty}</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="rounded-lg border border-border bg-surface px-3 py-2.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">{copy.commentReader}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[0.6875rem] text-muted-foreground">
                        {formatCommentTime(comment.recordedAt)}
                      </p>
                      {comment.mine && onDelete ? (
                        <button
                          type="button"
                          onClick={() => handleDelete(comment.id)}
                          disabled={disabled || deletingId === comment.id}
                          className="text-[0.6875rem] font-medium text-muted-foreground hover:text-sign-stop hover:underline disabled:opacity-50"
                        >
                          {deletingId === comment.id ? copy.commentDeleting : copy.commentDelete}
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <details className="rounded-lg border border-border bg-muted/40 px-3 py-2">
            <summary className="cursor-pointer text-xs font-semibold text-foreground">
              {copy.communityPolicyTitle}
            </summary>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
              {copy.communityPolicy.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </details>

          <form onSubmit={handleSubmit} className="space-y-2">
            <label className="sr-only" htmlFor={`comment-${projectId}`}>
              {copy.commentPlaceholder}
            </label>
            <textarea
              id={`comment-${projectId}`}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              disabled={disabled || saving}
              maxLength={400}
              rows={3}
              placeholder={copy.commentPlaceholder}
              className={cn(
                "w-full resize-y rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground",
                "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            />
            <p className="text-xs text-muted-foreground">{copy.commentPolicy}</p>
            {error ? (
              <p className="text-sm text-sign-stop" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="sm" disabled={disabled || saving || body.trim().length < 12}>
              {saving ? copy.commentPosting : copy.commentSubmit}
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
