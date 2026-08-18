import Link from "next/link";
import {
  IconArrowsLeftRight,
  IconBook2,
  IconBooks,
  IconChartBar,
  IconTimeline,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DataSaverToggle } from "@/components/ui/DataSaverToggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const NAV_LINKS: { href: string; label: string; icon: TablerIcon }[] = [
  { href: "/timeline", label: "Timeline", icon: IconTimeline },
  { href: "/sectors", label: "Sectors", icon: IconChartBar },
  { href: "/compare", label: "Now vs. 2050", icon: IconArrowsLeftRight },
  { href: "/sources", label: "Sources", icon: IconBooks },
  { href: "/glossary", label: "Glossary", icon: IconBook2 },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-header-background backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">
            Naija<span className="text-accent">2050</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition",
                  "hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" stroke={1.5} aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          <SearchDialog />
          <DataSaverToggle />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
