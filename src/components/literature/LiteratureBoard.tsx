"use client";

import { useMemo, useState } from "react";
import { FadeIn } from "@/components/motion";
import { LiteratureWorkCard } from "@/components/literature/LiteratureWorkCard";
import { FilterChip } from "@/components/ui/FilterChip";
import {
  LITERATURE_MEDIUM_LABELS,
  LITERATURE_PAGE_META,
  LITERATURE_PERIODS,
  LITERATURE_WORKS,
} from "@/content/literature";
import type { LiteratureMedium, LiteraturePeriodId } from "@/types/content";

type PeriodFilter = LiteraturePeriodId | "all";
type MediumFilter = LiteratureMedium | "all";

export function LiteratureBoard() {
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const [medium, setMedium] = useState<MediumFilter>("all");

  const visible = useMemo(() => {
    return LITERATURE_WORKS.filter((work) => {
      if (period !== "all" && work.periodId !== period) return false;
      if (medium !== "all" && work.medium !== medium) return false;
      return true;
    }).sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
  }, [period, medium]);

  const mediumOptions = (Object.keys(LITERATURE_MEDIUM_LABELS) as LiteratureMedium[]).filter(
    (key) => LITERATURE_WORKS.some((work) => work.medium === key),
  );

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            active={period === "all"}
            onClick={() => setPeriod("all")}
            label={LITERATURE_PAGE_META.filterAll}
          />
          {LITERATURE_PERIODS.map((item) => (
            <FilterChip
              key={item.id}
              active={period === item.id}
              onClick={() => setPeriod(item.id)}
              label={item.label}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            active={medium === "all"}
            onClick={() => setMedium("all")}
            label={LITERATURE_PAGE_META.mediumAll}
          />
          {mediumOptions.map((key) => (
            <FilterChip
              key={key}
              active={medium === key}
              onClick={() => setMedium(key)}
              label={LITERATURE_MEDIUM_LABELS[key]}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{LITERATURE_PAGE_META.sourcesNote}</p>
      </div>

      {period !== "all" ? (
        <FadeIn>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {LITERATURE_PERIODS.find((item) => item.id === period)?.blurb}
          </p>
        </FadeIn>
      ) : null}

      <ul className="space-y-5">
        {visible.map((work, index) => (
          <li key={work.id}>
            <FadeIn delay={Math.min(index * 0.04, 0.24)}>
              <LiteratureWorkCard work={work} />
            </FadeIn>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="text-center text-muted-foreground">{LITERATURE_PAGE_META.emptyFilter}</p>
      ) : null}
    </div>
  );
}
