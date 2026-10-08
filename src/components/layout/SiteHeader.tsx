import Link from "next/link";
import {
  IconArrowsLeftRight,
  IconBook,
  IconChartBar,
  IconScale,
  IconTimeline,
  IconUsers,
  IconBulb,
  IconWheel,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DataSaverToggle } from "@/components/ui/DataSaverToggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/ui/Container";
import { siteName } from "@/lib/site";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: TablerIcon;
}

const HISTORY_LINKS: NavLink[] = [
  { href: "/timeline", label: "Timeline", icon: IconTimeline },
  { href: "/icons", label: "Icons", icon: IconUsers },
  { href: "/literature", label: "Literature", icon: IconBook },
];

const VISION_LINKS: NavLink[] = [
  { href: "/sectors", label: "Sectors", icon: IconChartBar },
  { href: "/projects", label: "Projects", icon: IconBulb },
  { href: "/pulse", label: "Pulse", icon: IconWheel },
];

const COMPARE_LINKS: { href: string; label: string; icon: TablerIcon }[] = [
  { href: "/compare", label: "vs 2050", icon: IconArrowsLeftRight },
  { href: "/compare/g7", label: "vs G7", icon: IconScale },
];

function NavItem({ href, label, icon: Icon }: NavLink) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <Icon className="size-4" stroke={1.5} aria-hidden />
      {label}
    </Link>
  );
}

function NavDivider() {
  return <span className="mx-1 hidden h-4 w-px bg-border lg:block" aria-hidden />;
}

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-50 border-b border-border bg-header-background backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={siteName}
        >
          <span
            className="size-1.5 shrink-0 bg-accent transition group-hover:scale-125"
            aria-hidden
          />
          <span className="text-lg font-bold tracking-tight">
            Nigeria<span className="text-accent">2050</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center md:flex" aria-label="Main">
            {HISTORY_LINKS.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
            <NavDivider />
            {VISION_LINKS.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
            <NavDivider />
            <div
              className="ml-1 flex items-center rounded-lg border border-border p-0.5"
              aria-label="Compare"
            >
              {COMPARE_LINKS.map(({ href, label, icon: Icon }, index) => (
                <span key={href} className="flex items-center">
                  {index > 0 ? (
                    <span className="mx-0.5 h-4 w-px bg-border" aria-hidden />
                  ) : null}
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition",
                      "hover:bg-muted hover:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <Icon className="size-4" stroke={1.5} aria-hidden />
                    {label}
                  </Link>
                </span>
              ))}
            </div>
          </nav>
          <SearchDialog />
          <DataSaverToggle />
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
