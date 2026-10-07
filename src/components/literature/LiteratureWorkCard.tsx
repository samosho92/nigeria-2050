import Link from "next/link";
import {
  IconBook2,
  IconDeviceTv,
  IconMovie,
  IconNotebook,
  IconTheater,
  IconUser,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { IconAvatar } from "@/components/icons/IconAvatar";
import { LiteratureCoverArt } from "@/components/literature/LiteratureCoverArt";
import { SourceCitation } from "@/components/ui/SourceCitation";
import {
  LITERATURE_MEDIUM_LABELS,
  LITERATURE_PAGE_META,
  LITERATURE_PERIODS,
} from "@/content/literature";
import { getIconById } from "@/content/icons";
import { getSourcesByIds } from "@/content/sources";
import { iconInitials } from "@/lib/icon-names";
import type { LiteratureWork } from "@/types/content";

const MEDIUM_ICONS: Record<LiteratureWork["medium"], TablerIcon> = {
  book: IconBook2,
  memoir: IconNotebook,
  biography: IconUser,
  play: IconTheater,
  film: IconMovie,
  series: IconDeviceTv,
};

interface LiteratureWorkCardProps {
  work: LiteratureWork;
}

export function LiteratureWorkCard({ work }: LiteratureWorkCardProps) {
  const period = LITERATURE_PERIODS.find((item) => item.id === work.periodId);
  const sources = getSourcesByIds(work.sourceIds);
  const MediumIcon = MEDIUM_ICONS[work.medium];
  const leadCreator = work.creators[0];
  const leadIcon = leadCreator?.iconId ? getIconById(leadCreator.iconId) : undefined;

  return (
    <article
      id={work.id}
      className="scroll-mt-28 overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="grid md:grid-cols-[11rem_1fr]">
        <div className="relative min-h-[14rem] bg-primary text-primary-foreground md:min-h-full">
          <LiteratureCoverArt motif={work.coverMotif} />
          <div className="relative flex h-full flex-col justify-between p-4">
            <div className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
              <MediumIcon className="size-3.5" stroke={1.5} aria-hidden />
              {LITERATURE_MEDIUM_LABELS[work.medium]}
            </div>
            <div>
              <p className="font-serif text-4xl font-bold tabular-nums tracking-tight">{work.year}</p>
              <h2 className="mt-2 font-serif text-xl font-bold leading-tight tracking-tight">
                {work.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-accent">
                {period?.label ?? work.periodId}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{work.settingLabel}</p>
            </div>
            {leadIcon ? (
              <Link
                href={`/icons#${leadIcon.id}`}
                className="group flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1 transition hover:border-accent"
              >
                <IconAvatar figure={leadIcon} size="sm" alt={leadIcon.image?.alt ?? ""} />
                <span className="text-xs font-medium text-foreground group-hover:text-accent">
                  {leadCreator?.name}
                </span>
              </Link>
            ) : leadCreator ? (
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1">
                <span
                  className="inline-flex size-9 items-center justify-center rounded-full bg-accent/15 font-serif text-[0.65rem] font-bold text-accent"
                  aria-hidden
                >
                  {iconInitials(leadCreator.name)}
                </span>
                <span className="text-xs font-medium text-foreground">{leadCreator.name}</span>
              </div>
            ) : null}
          </div>

          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {work.creators.map((creator) => (
              <li key={`${creator.name}-${creator.role}`}>
                <span className="font-medium text-foreground">{creator.name}</span>
                <span className="text-muted-foreground"> · {creator.role}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm leading-relaxed text-foreground/90">{work.summary}</p>

          <p className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-sm text-foreground">
            <span className="font-semibold text-accent">{LITERATURE_PAGE_META.verifiedLabel} </span>
            {work.verifiedClaim}
          </p>

          <div className="mt-auto space-y-2 border-t border-border pt-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {LITERATURE_PAGE_META.sourcesHeading}
            </p>
            <ul className="space-y-1.5">
              {sources.map((source) => (
                <li key={source.id} className="text-sm">
                  <Link
                    href={`/sources#${source.id}`}
                    className="font-medium text-foreground hover:text-accent"
                  >
                    {source.title}
                  </Link>
                  <div className="mt-0.5">
                    <SourceCitation source={source} compact />
                  </div>
                </li>
              ))}
            </ul>
            {leadIcon?.image ? (
              <p className="text-[0.6875rem] text-muted-foreground">
                {LITERATURE_PAGE_META.portraitCredit}: {leadIcon.image.credit} ·{" "}
                {leadIcon.image.license}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
