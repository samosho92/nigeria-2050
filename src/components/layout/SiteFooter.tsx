import Link from "next/link";
import {
  IconArrowsLeftRight,
  IconBook2,
  IconBooks,
  IconChartBar,
  IconFileText,
  IconMessageChatbot,
  IconScale,
  IconSparkles,
  IconTimeline,
  IconUsers,
  IconBulb,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";

const EXPLORE_LINKS: { href: string; label: string; icon: TablerIcon }[] = [
  { href: "/timeline", label: "Timeline", icon: IconTimeline },
  { href: "/icons", label: "Icons", icon: IconUsers },
  { href: "/sectors", label: "Sectors", icon: IconChartBar },
  { href: "/your-2050", label: "Your 2050", icon: IconSparkles },
  { href: "/projects", label: "Cool Projects", icon: IconBulb },
  { href: "/compare", label: "Now vs. 2050", icon: IconArrowsLeftRight },
  { href: "/compare/g7", label: "Nigeria vs. G7", icon: IconScale },
];

const REFERENCE_LINKS: { href: string; label: string; icon: TablerIcon }[] = [
  { href: "/sources", label: "Sources", icon: IconBooks },
  { href: "/glossary", label: "Glossary", icon: IconBook2 },
  { href: "/methodology", label: "Methodology", icon: IconFileText },
  { href: "/ask", label: "Ask the Archive", icon: IconMessageChatbot },
];

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; icon: TablerIcon }[];
}) {
  return (
    <div>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Icon className="size-4" stroke={1.5} aria-hidden />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-12 lg:px-8">
      <Container className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <p className="font-bold">Naija2050</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Independent, non-partisan, source-transparent civic media about
            Nigeria&apos;s story and trajectory.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <FooterLinkList title="Explore" links={EXPLORE_LINKS} />
          <FooterLinkList title="Reference" links={REFERENCE_LINKS} />
        </div>
      </Container>
      <Container className="mt-8 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} Naija2050.
          </span>{" "}
          Optimistic, with stated assumptions. Every projection is a scenario.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/privacy" className="transition hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-foreground">
            Terms of Use
          </Link>
        </div>
      </Container>
    </footer>
  );
}
