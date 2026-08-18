import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { IconAvatar } from "@/components/icons/IconAvatar";
import type { IconFigure } from "@/types/content";

interface TimelineEraPeopleProps {
  figures: IconFigure[];
  showPhotos?: boolean;
}

export function TimelineEraPeople({ figures, showPhotos = true }: TimelineEraPeopleProps) {
  if (figures.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
      <ul className="flex">
        {figures.map((figure, index) => (
          <li key={figure.id} className={index === 0 ? undefined : "-ml-2"}>
            <Link
              href={`/icons#${figure.id}`}
              className="relative block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              title={figure.name}
            >
              <span className="sr-only">{figure.name}</span>
              <IconAvatar
                figure={figure}
                size="sm"
                showPhoto={showPhotos}
                className="ring-2 ring-background"
              />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/icons"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-accent"
      >
        Icons of this era
        <IconArrowRight className="size-3.5" stroke={1.5} aria-hidden />
      </Link>
    </div>
  );
}
