import Link from "next/link";
import { IconArrowRight, IconArrowsLeftRight, IconTimeline } from "@tabler/icons-react";
import { AnimatedCounter } from "@/components/motion";
import { LinkButton } from "@/components/ui/LinkButton";
import { COMPARATOR_METRICS } from "@/content/comparator";
import { cn } from "@/lib/utils";
import type { ComparatorMetric } from "@/types/content";

const HERO_STAT_IDS = ["gdp-per-capita", "population", "power-capacity"] as const;

const ERA_RAIL = [
  { year: "c. 1180", label: "Kingdoms", href: "/timeline", accent: false },
  { year: "1960", label: "Independence", href: "/timeline", accent: false },
  { year: "2026", label: "Today", href: "/compare", accent: false },
  { year: "2050", label: "The case", href: "/sectors", accent: true },
] as const;

function formatBaseline(metric: ComparatorMetric): string {
  const value = metric.current.toLocaleString();
  if (metric.unit === "USD") return `$${value}`;
  if (metric.unit === "M") return `${value}M`;
  if (metric.unit === "GW") return `${value} GW`;
  if (metric.unit === "%") return `${value}%`;
  return `${value} ${metric.unit}`;
}

function counterProps(metric: ComparatorMetric) {
  if (metric.unit === "USD") return { prefix: "$", suffix: "" };
  if (metric.unit === "M") return { prefix: "", suffix: "M" };
  if (metric.unit === "GW") return { prefix: "", suffix: " GW" };
  if (metric.unit === "%") return { prefix: "", suffix: "%" };
  return { prefix: "", suffix: ` ${metric.unit}` };
}

export function HomeHero() {
  const stats = HERO_STAT_IDS.map((id) =>
    COMPARATOR_METRICS.find((metric) => metric.id === id),
  ).filter((metric): metric is ComparatorMetric => Boolean(metric));

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="home-hero-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl lg:grid-cols-12">
        <div className="flex flex-col justify-center px-6 py-16 sm:py-20 lg:col-span-7 lg:px-8 lg:py-24 lg:pr-12">
          <p className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="size-1.5 shrink-0 bg-accent" aria-hidden />
            Independent civic media
          </p>

          <h1 className="mt-7 border-l-2 border-accent pl-5 sm:pl-6">
            <span className="block font-serif text-[clamp(3.15rem,14vw,6.35rem)] font-bold leading-[0.86] tracking-tight text-accent">
              25 years
            </span>
            <span className="mt-4 block max-w-[13ch] font-serif text-[clamp(2.15rem,6.8vw,3.65rem)] font-bold leading-[0.96] tracking-tight text-foreground">
              will decide this country.
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Eight eras of Nigerian history. Six sector visions to 2050. Every number
            cited, every scenario ranged. Built for the skeptic.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <LinkButton href="/timeline" variant="primary">
              <IconTimeline className="size-4" stroke={1.5} aria-hidden />
              Explore the Timeline
            </LinkButton>
            <LinkButton href="/compare" variant="secondary">
              <IconArrowsLeftRight className="size-4" stroke={1.5} aria-hidden />
              Now vs. 2050
            </LinkButton>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden bg-primary px-6 py-10 text-primary-foreground sm:px-8 lg:px-9 lg:py-12">
            <div className="home-hero-weave pointer-events-none absolute inset-0" aria-hidden />
            <p
              className="home-hero-year pointer-events-none absolute -right-3 -bottom-6 select-none font-serif text-[min(48vw,15rem)] font-bold leading-none text-primary-foreground/15"
              aria-hidden
            >
              2050
            </p>

            <div className="relative">
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
                  const { prefix, suffix } = counterProps(metric);
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
                        from {formatBaseline(metric)} today
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Jump into the story" className="relative border-t border-border">
        <ol className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-4 lg:px-8">
          {ERA_RAIL.map((era) => (
            <li key={era.year}>
              <Link
                href={era.href}
                className="group relative flex flex-col gap-2 py-6 pr-4 sm:pt-5"
              >
                <span
                  className={cn(
                    "relative z-10 hidden size-2.5 sm:block sm:-mt-[1.5625rem]",
                    era.accent ? "bg-accent" : "bg-foreground group-hover:bg-accent",
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "font-serif text-2xl font-bold tracking-tight sm:text-3xl",
                    era.accent ? "text-accent" : "text-foreground",
                  )}
                >
                  {era.year}
                </span>
                <span className="flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition group-hover:text-foreground">
                  {era.label}
                  <IconArrowRight
                    className="size-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                    stroke={1.5}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
