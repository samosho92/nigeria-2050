"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArrowsLeftRight,
  IconChartBar,
  IconMenu2,
  IconScale,
  IconSparkles,
  IconTimeline,
  IconUsers,
  IconX,
  IconBulb,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MOBILE_LINKS = [
  { href: "/timeline", label: "Timeline", icon: IconTimeline },
  { href: "/icons", label: "Icons", icon: IconUsers },
  { href: "/sectors", label: "Sectors", icon: IconChartBar },
  { href: "/your-2050", label: "Your 2050", icon: IconSparkles },
  { href: "/projects", label: "Cool Projects", icon: IconBulb },
  { href: "/compare", label: "Now vs. 2050", icon: IconArrowsLeftRight },
  { href: "/compare/g7", label: "Nigeria vs. G7", icon: IconScale },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <IconX className="size-5" stroke={1.5} aria-hidden />
        ) : (
          <IconMenu2 className="size-5" stroke={1.5} aria-hidden />
        )}
      </Button>
      {open ? (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-50 border-b border-border bg-header-background p-3 shadow-lg"
          aria-label="Mobile"
        >
          <ul className="grid gap-1">
            {MOBILE_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition",
                    pathname === href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" stroke={1.5} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
