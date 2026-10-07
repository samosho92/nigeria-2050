import Link from "next/link";
import { IconArrowsLeftRight, IconTimeline } from "@tabler/icons-react";
import { AnimatedCounter } from "@/components/motion";
import {
  PageHero,
  PageHeroAsidePanel,
} from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { COMPARATOR_METRICS } from "@/content/comparator";
import { HOME_HERO } from "@/content/home";
import { CONTENT_STATS } from "@/lib/content-stats";
import {
  comparatorCounterProps,
  formatComparatorBaseline,
} from "@/lib/comparator-format";
import type { ComparatorMetric } from "@/types/content";

export function HomeHero() {
  const stats = HOME_HERO.heroStatIds
    .map((id) => COMPARATOR_METRICS.find((metric) => metric.id === id))
    .filter((metric): metric is ComparatorMetric => Boolean(metric));

  return (
    <PageHero
      title={
        <>
          <span className="block font-serif text-[clamp(3.15rem,14vw,6.35rem)] font-bold leading-[0.86] tracking-tight text-accent">
            {HOME_HERO.titleLine1}
          </span>
          <span className="mt-4 block max-w-[13ch] font-serif text-[clamp(2.15rem,6.8vw,3.65rem)] font-bold leading-[0.96] tracking-tight text-foreground">
            {HOME_HERO.titleLine2}
          </span>
        </>
      }
      description={HOME_HERO.description(CONTENT_STATS.eraCount, CONTENT_STATS.sectorCount)}
      titleSize="display"
      contentClassName="max-w-none lg:col-span-7"
      actions={
        <>
          <LinkButton href="/timeline" variant="primary">
            <IconTimeline className="size-4" stroke={1.5} aria-hidden />
            {HOME_HERO.primaryCta}
          </LinkButton>
          <LinkButton href="/compare" variant="secondary">
            <IconArrowsLeftRight className="size-4" stroke={1.5} aria-hidden />
            {HOME_HERO.secondaryCta}
          </LinkButton>
        </>
      }
      aside={
        <PageHeroAsidePanel watermark="2050" className="min-h-[30rem]">
          <div className="flex items-end justify-between gap-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
              {HOME_HERO.asideEyebrow}
            </p>
            <Link
              href="/methodology"
              className="text-xs font-medium text-primary-foreground/70 underline-offset-4 transition hover:text-primary-foreground hover:underline"
            >
              {HOME_HERO.asideMethodology}
            </Link>
          </div>

          <dl className="mt-8 divide-y divide-primary-foreground/20 border-t border-primary-foreground/20">
            {stats.map((metric) => {
              const { prefix, suffix } = comparatorCounterProps(metric);
              return (
                <div key={metric.id} className="py-5 first:pt-6 last:pb-0">
                  <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-primary-foreground/65">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 font-serif text-[clamp(2rem,5vw,3rem)] font-bold tabular-nums tracking-tight">
                    <AnimatedCounter
                      value={metric.projected2050}
                      prefix={prefix}
                      suffix={suffix}
                    />
                  </dd>
                  <dd className="mt-1 text-sm text-primary-foreground/70">
                    {HOME_HERO.asideFromToday(formatComparatorBaseline(metric))}
                  </dd>
                </div>
              );
            })}
          </dl>
        </PageHeroAsidePanel>
      }
      rail={[...HOME_HERO.rail]}
    />
  );
}
