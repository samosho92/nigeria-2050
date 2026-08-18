"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCrossPillarNav } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  trackFrom?: "timeline" | "sector" | "home" | "other";
};

function getTargetType(href: string): "sector" | "timeline" | null {
  if (href.includes("/sectors/")) return "sector";
  if (href.includes("/timeline")) return "timeline";
  return null;
}

export function TrackedLink({ href, trackFrom = "other", onClick, ...props }: TrackedLinkProps) {
  const hrefStr = typeof href === "string" ? href : (href.pathname ?? "");

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        const targetType = getTargetType(hrefStr);
        const fromPillar =
          trackFrom === "timeline" || trackFrom === "sector" ? trackFrom : null;

        if (fromPillar && targetType && fromPillar !== targetType) {
          trackCrossPillarNav(fromPillar, hrefStr, targetType);
        }

        onClick?.(e);
      }}
    />
  );
}
