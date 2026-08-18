import Link from "next/link";
import { IconFileText, IconMessageChatbot, IconBooks } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";

const FOOTER_LINKS = [
  { href: "/methodology", label: "Editorial Methodology", icon: IconFileText },
  { href: "/sources", label: "Source Library", icon: IconBooks },
  { href: "/ask", label: "Ask the Archive", icon: IconMessageChatbot },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-12 lg:px-8">
      <Container className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="font-bold">Naija2050</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Independent, non-partisan, source-transparent civic media about
            Nigeria&apos;s story and trajectory.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {FOOTER_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Icon className="size-4" stroke={1.5} aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </Container>
      <Container className="mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Naija2050. Optimistic, not naive — every
        projection is a scenario built on stated assumptions.
      </Container>
    </footer>
  );
}
