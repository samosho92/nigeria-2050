import Link from "next/link";
import {
  IconArrowRight,
  IconBook2,
  IconChartBar,
  IconCircleCheck,
  IconDatabase,
  IconHistory,
  IconLink,
  IconRobot,
  IconScale,
  IconShieldCheck,
  IconTarget,
  IconWorld,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { MotifDivider } from "@/components/ui/MotifDivider";
import {
  CORRECTIONS_EMAIL,
  METHODOLOGY_META,
  METHODOLOGY_NON_GOALS,
  METHODOLOGY_PRINCIPLES,
  METHODOLOGY_SECTIONS,
  type MethodologySection,
} from "@/content/methodology";
import { cn } from "@/lib/utils";

const SECTION_ICONS: Record<string, TablerIcon> = {
  positioning: IconWorld,
  sourcing: IconBook2,
  projections: IconTarget,
  "g7-benchmarks": IconScale,
  comparator: IconChartBar,
  history: IconHistory,
  ai: IconRobot,
  fusion: IconLink,
  review: IconShieldCheck,
};

function MethodologyNav() {
  return (
    <nav
      aria-label="Methodology sections"
      className="flex flex-wrap gap-2 border-b border-border pb-6"
    >
      {METHODOLOGY_SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-accent/10 hover:text-accent"
        >
          {section.title}
        </a>
      ))}
    </nav>
  );
}

function MethodologyCard({ section }: { section: MethodologySection }) {
  const Icon = SECTION_ICONS[section.id] ?? IconDatabase;

  return (
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
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.summary}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-3 border-l-2 border-accent/20 pl-5">
        {section.points.map((point) => (
          <li key={point} className="text-sm leading-relaxed text-foreground/90">
            {point}
          </li>
        ))}
      </ul>

      {section.links && section.links.length > 0 && (
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
      )}
    </section>
  );
}

export function MethodologyPageContent() {
  return (
    <>
      <header className="border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent">Editorial policy</Badge>
          <span className="text-xs text-muted-foreground">
            {METHODOLOGY_META.version} · Updated {METHODOLOGY_META.lastUpdated}
          </span>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance md:text-5xl">
          How Naija2050 works
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Sourcing rules, projection methodology, G7 benchmark standards, AI guardrails, and
          how we handle corrections — written for skeptics first.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {METHODOLOGY_PRINCIPLES.map((principle) => (
            <li
              key={principle}
              className="flex gap-2 text-sm text-foreground/90"
            >
              <IconCircleCheck
                className="mt-0.5 size-4 shrink-0 text-accent"
                stroke={1.5}
                aria-hidden
              />
              {principle}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10">
        <MethodologyNav />
      </div>

      <div className="mt-10 space-y-6">
        {METHODOLOGY_SECTIONS.map((section) => (
          <MethodologyCard key={section.id} section={section} />
        ))}
      </div>

      <MotifDivider />

      <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
        <h2 className="text-lg font-bold">What we are not</h2>
        <ul className="mt-4 space-y-2">
          {METHODOLOGY_NON_GOALS.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-border" aria-hidden>
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="corrections"
        className={cn(
          "mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8",
        )}
      >
        <h2 className="text-lg font-bold text-foreground">Report an error</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Found a factual error, broken source link, or misleading projection? Email us with
          the page URL, the specific claim, and your counter-source. We review every message
          and publish dated corrections when warranted.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <LinkButton href={`mailto:${CORRECTIONS_EMAIL}`} variant="primary">
            {CORRECTIONS_EMAIL}
          </LinkButton>
          <LinkButton href="/editorial/review" variant="secondary">
            Review queue
          </LinkButton>
          <LinkButton href="/sources" variant="secondary">
            Source library
          </LinkButton>
        </div>
      </section>
    </>
  );
}
