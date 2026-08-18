"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { useMounted } from "@/hooks/useMounted";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function formatDisplay(display: number, decimals: number) {
  return decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const { enabled: dataSaver } = useDataSaver();
  const [mounted, setMounted] = useState(false);
  // Match SSR + first client paint to avoid hydration mismatch
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (prefersReducedMotion || dataSaver) {
      setDisplay(value);
      return;
    }

    if (!isInView) return;

    setDisplay(0);
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [mounted, isInView, value, duration, prefersReducedMotion, dataSaver]);

  return (
    <span ref={ref}>
      {prefix}
      {formatDisplay(display, decimals)}
      {suffix}
    </span>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
}

export function FadeIn({ children, className, delay = 0, disabled }: FadeInProps) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { enabled: dataSaver } = useDataSaver();

  if (!mounted || prefersReducedMotion || disabled || dataSaver) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
