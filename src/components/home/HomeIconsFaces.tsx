"use client";

import Link from "next/link";
import { IconAvatar } from "@/components/icons/IconAvatar";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { useMounted } from "@/hooks/useMounted";
import { iconShortName } from "@/lib/icon-names";
import type { IconFigure } from "@/types/content";

export function HomeIconsFaces({ figures }: { figures: IconFigure[] }) {
  const mounted = useMounted();
  const { enabled: dataSaver } = useDataSaver();
  const showPhotos = mounted && !dataSaver;

  return (
    <ul className="grid grid-cols-4 gap-4 sm:gap-5">
      {figures.map((figure) => (
        <li key={figure.id}>
          <Link
            href={`/icons#${figure.id}`}
            className="group flex flex-col items-center gap-2 text-center"
          >
            <IconAvatar
              figure={figure}
              size="md"
              showPhoto={showPhotos}
              className="ring-2 ring-border transition group-hover:ring-accent"
            />
            <span className="line-clamp-2 max-w-[11ch] text-[0.6875rem] font-medium leading-tight text-muted-foreground transition group-hover:text-foreground">
              {iconShortName(figure.name)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
