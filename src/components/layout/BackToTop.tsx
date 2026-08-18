"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 480;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.saver === "true";
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollUp}
      className={cn(
        "fixed right-5 z-50 shadow-lg md:right-8",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] md:bottom-8",
        "transition-opacity duration-200 motion-reduce:transition-none",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <IconArrowUp className="size-5" stroke={1.5} aria-hidden />
    </Button>
  );
}
