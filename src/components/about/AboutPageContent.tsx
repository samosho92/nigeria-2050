import Link from "next/link";
import {
  IconArrowRight,
  IconBook,
  IconBook2,
  IconBulb,
  IconChartBar,
  IconEyeCheck,
  IconFlag,
  IconHistory,
  IconMessageChatbot,
  IconScale,
  IconShieldCheck,
  IconTimeline,
  IconUsers,
  IconWheel,
  IconWorld,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { AnimatedCounter, FadeIn } from "@/components/motion";
import {
  PageHero,
  PageHeroAsidePanel,
} from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { MotifDivider } from "@/components/ui/MotifDivider";
import {
  ABOUT_META,
  ABOUT_PATHWAYS,
  ABOUT_PRINCIPLES,
  ABOUT_RAIL,
  ABOUT_SECTIONS,
  ABOUT_STATS,
} from "@/content/about";
import { CONTENT_STATS } from "@/lib/content-stats";

const SECTION_ICONS: Record<string, TablerIcon> = {
  what: IconWorld,
  audience: IconUsers,
  tools: IconFlag,
};

const PRINCIPLE_ICONS: Record<string, TablerIcon> = {
  optimistic: IconEyeCheck,
  nonpartisan: IconScale,
  sourced: IconBook2,
  skeptic: IconShieldCheck,
};

const PATHWAY_ICONS: Record<string, TablerIcon> = {
  timeline: IconTimeline,
  icons: IconUsers,
  literature: IconBook,
  sectors: IconChartBar,
  compare: IconScale,
  projects: IconBulb,
  pulse: IconWheel,
  ask: IconMessageChatbot,
  methodology: IconBook2,
};

export function AboutPageContent() {
  return (
    <>
      <PageHero
        eyebrow={ABOUT_META.eyebrow}
        title={
          <>
            <span className="block text-accent">{ABOUT_META.titleLine1}</span>
            <span className="mt-2 block">{ABOUT_META.titleLine2}</span>
          </>
        }
        description={ABOUT_META.description}
        titleSize="display"
        contentClassName="max-w-none lg:col-span-7"
        actions={
          <>
            <LinkButton href="/timeline" variant="primary">
              <IconHistory className="size-4" stroke={1.5} aria-hidden />
              {ABOUT_META.primaryCta}
            </LinkButton>
            <LinkButton href="/sectors" variant="secondary">
              <IconChartBar className="size-4" stroke={1.5} aria-hidden />
              {ABOUT_META.secondaryCta}
            </LinkButton>
          </>
        }
        aside={
          <PageHeroAsidePanel watermark="2050" className="min-h-[28rem]">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
              {ABOUT_META.asideEyebrow}
            </p>
            <dl className="mt-8 divide-y divide-primary-foreground/20 border-t border-primary-foreground/20">
              {ABOUT_STATS.map((stat) => (
                <div key={stat.id} className="py-5 first:pt-6 last:pb-0">
                  <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-primary-foreground/65">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-serif text-[clamp(2rem,5vw,3rem)] font-bold tabular-nums tracking-tight">
                    <AnimatedCounter value={CONTENT_STATS[stat.valueKey]} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs text-primary-foreground/65">{ABOUT_META.asideNote}</p>
          </PageHeroAsidePanel>
        }
        rail={[...ABOUT_RAIL]}
      />

      <Container className="py-12 md:py-16">
        <FadeIn>
          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
            {ABOUT_META.principlesTitle}
          </h2>
        </FadeIn>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {ABOUT_PRINCIPLES.map((principle, index) => {
            const Icon = PRINCIPLE_ICONS[principle.id] ?? IconShieldCheck;
            return (
              <FadeIn key={principle.id} delay={Math.min(index * 0.06, 0.24)}>
                <li className="group flex h-full gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-accent/40 hover:bg-surface">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-5" stroke={1.5} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{principle.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                </li>
              </FadeIn>
            );
          })}
        </ul>

        <MotifDivider />

        <div className="space-y-6">
          {ABOUT_SECTIONS.map((section, index) => {
            const Icon = SECTION_ICONS[section.id] ?? IconWorld;
            return (
              <FadeIn key={section.id} delay={Math.min(index * 0.05, 0.2)}>
                <section
                  id={section.id}
                  className="scroll-mt-28 rounded-xl border border-border bg-card p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="size-5 text-accent" stroke={1.5} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                      <p className="mt-1 text-sm font-medium text-accent">{section.summary}</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 border-l-2 border-accent/20 pl-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-foreground/90 md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.links?.length ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:underline"
                        >
                          {link.label}
                          <IconArrowRight className="size-3.5" stroke={1.5} aria-hidden />
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </section>
              </FadeIn>
            );
          })}
        </div>

        <MotifDivider />

        <FadeIn>
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
              {ABOUT_META.pathwaysTitle}
            </h2>
            <p className="mt-3 text-muted-foreground">{ABOUT_META.pathwaysLead}</p>
          </div>
        </FadeIn>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_PATHWAYS.map((pathway, index) => {
            const Icon = PATHWAY_ICONS[pathway.id] ?? IconArrowRight;
            return (
              <FadeIn key={pathway.id} delay={Math.min(index * 0.04, 0.28)}>
                <li className="h-full">
                  <Link
                    href={pathway.href}
                    className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition hover:border-accent hover:bg-card"
                  >
                    <Icon
                      className="size-5 text-accent transition group-hover:translate-x-0.5"
                      stroke={1.5}
                      aria-hidden
                    />
                    <span className="mt-3 flex items-center gap-1 font-semibold text-foreground">
                      {pathway.label}
                      <IconArrowRight
                        className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                        stroke={1.5}
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {pathway.description}
                    </span>
                  </Link>
                </li>
              </FadeIn>
            );
          })}
        </ul>

        <section className="mt-12 rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8">
          <FadeIn>
            <h2 className="text-lg font-bold text-foreground">{ABOUT_META.correctionsTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {ABOUT_META.correctionsBody}
            </p>
            <div className="mt-6">
              <LinkButton href="/methodology#corrections" variant="primary">
                {ABOUT_META.correctionsCta}
                <IconArrowRight className="size-4" stroke={1.5} aria-hidden />
              </LinkButton>
            </div>
          </FadeIn>
        </section>
      </Container>
    </>
  );
}
