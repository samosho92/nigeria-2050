import Link from "next/link";

const NAV_LINKS = [
  { href: "/timeline", label: "Timeline" },
  { href: "/sectors", label: "Sectors" },
  { href: "/compare", label: "Now vs. 2050" },
  { href: "/sources", label: "Sources" },
  { href: "/glossary", label: "Glossary" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-lagos-border bg-lagos-night/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">
            Naija<span className="text-optimism-gold">2050</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
