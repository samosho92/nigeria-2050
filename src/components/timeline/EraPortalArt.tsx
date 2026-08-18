"use client";

import Image from "next/image";
import type { TimelineEntry } from "@/types/content";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { cn } from "@/lib/utils";

const ERA_ART: Record<TimelineEntry["artDirection"], { src: string; alt: string }> = {
  "pre-colonial": {
    src: "/art/eras/pre-colonial.svg",
    alt: "Abstract pre-colonial scene with earth tones and geometric patterns",
  },
  colonial: {
    src: "/art/eras/colonial.svg",
    alt: "Abstract colonial-era scene in muted tones",
  },
  independence: {
    src: "/art/eras/independence.svg",
    alt: "Abstract independence-era scene with green accents",
  },
  conflict: {
    src: "/art/eras/conflict.svg",
    alt: "Abstract conflict-era scene in subdued palette",
  },
  military: {
    src: "/art/eras/military.svg",
    alt: "Abstract military-era scene",
  },
  democracy: {
    src: "/art/eras/democracy.svg",
    alt: "Abstract democracy-era scene with warmer tones",
  },
  reform: {
    src: "/art/eras/reform.svg",
    alt: "Abstract reform-era scene with forward-looking greens",
  },
};

interface EraPortalArtProps {
  eraId: string;
  artDirection: TimelineEntry["artDirection"];
  className?: string;
}

export function EraPortalArt({ eraId, artDirection, className }: EraPortalArtProps) {
  const { enabled: dataSaver } = useDataSaver();
  const art = ERA_ART[artDirection];

  if (dataSaver || !art) {
    return (
      <div
        className={cn("era-portal-pattern absolute inset-0 opacity-30", className)}
        aria-hidden
      />
    );
  }

  return (
    <>
      <Image
        src={art.src}
        alt=""
        fill
        className={cn("object-cover opacity-80", className)}
        sizes="(max-width: 768px) 100vw, 800px"
        priority={eraId === "pre-colonial"}
      />
      <div className="era-portal-pattern absolute inset-0 opacity-20" aria-hidden />
    </>
  );
}
