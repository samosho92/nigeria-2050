import Link from "next/link";
import { IconArrowsLeftRight, IconTimeline } from "@tabler/icons-react";
import { AnimatedCounter } from "@/components/motion";
import {
  PageHero,
  PageHeroAsidePanel,
  type PageHeroRailItem,
} from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { COMPARATOR_METRICS } from "@/content/comparator";
import {
  comparatorCounterProps,
  formatComparatorBaseline,
} from "@/lib/comparator-format";
import type { ComparatorMetric } from "@/types/content";

const HERO_STAT_IDS = ["gdp-per-capita", "population", "power-capacity"] as const;

const ERA_RAIL: PageHeroRailItem[] = [
  { year: "c. 1180", label: "Kingdoms", href: "/timeline", accent: false },
  { year: "1960", label: "Independence", href: "/timeline", accent: false },
  { year: "2026", label: "Today", href: "/compare", accent: false },
  { year: "2050", label: "The case", href: "/sectors", accent: true },
];

export function HomeHero() {
  const stats = HERO_STAT_IDS.map((id) =>
    COMPARATOR_METRICS.find((metric) => metric.id === id),
  ).filter((metric): metric is ComparatorMetric => Boolean(metric));

  return (
    <PageHero
      eyebrow="Independent civic media"
      title={
        <>
          <span className="block font-serif text-[clamp(3.15rem,14vw,6.35rem)] font-bold leading-[0.86] tracking-tight text-accent">
            25 years
          </span>
          <span className="mt-4 block max-w-[13ch] font-serif text-[clamp(2.15rem,6.8vw,3.65rem)] font-bold leading-[0.96] tracking-tight text-foreground">
            will decide this country.
          </span>
        </>
      }
      description="Eight eras of Nigerian history. Six sector visions to 2050. Every number cited, every scenario ranged. Built for the skeptic."
      titleSize="display"
      contentClassName="max-w-none lg:col-span-7"
      actions={
        <>
          <LinkButton href="/timeline" variant="primary">
            <IconTimeline className="size-4" stroke={1.5} aria-hidden />
            Explore the Timeline
          </LinkButton>
          <LinkButton href="/compare" variant="secondary">
            <IconArrowsLeftRight className="size-4" stroke={1.5} aria-hidden />
            Now vs. 2050
          </LinkButton>
        </>
      }
      aside={
        <PageHeroAsidePanel watermark="2050" className="min-h-[30rem]">
          <div className="flex items-end justify-between gap-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
              Base case, 2050
            </p>
            <Link
              href="/methodology"
              className="text-xs font-medium text-primary-foreground/70 underline-offset-4 transition hover:text-primary-foreground hover:underline"
            >
              How we model this
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
                    from {formatComparatorBaseline(metric)} today
                  </dd>
                </div>
              );
            })}
          </dl>
        </PageHeroAsidePanel>
      }
      rail={ERA_RAIL}
    />
  );
}
