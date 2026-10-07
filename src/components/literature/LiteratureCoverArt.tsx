"use client";

import Image from "next/image";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import type { LiteratureWork } from "@/types/content";
import { cn } from "@/lib/utils";

interface LiteratureCoverArtProps {
  motif: LiteratureWork["coverMotif"];
  className?: string;
}

export function LiteratureCoverArt({ motif, className }: LiteratureCoverArtProps) {
  const { enabled: dataSaver } = useDataSaver();

  if (dataSaver) {
    return (
      <div
        className={cn("era-portal-pattern absolute inset-0 opacity-25", className)}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={`/art/eras/${motif}.svg`}
      alt=""
      fill
      className={cn("object-cover opacity-35", className)}
      sizes="176px"
    />
  );
}
