"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type Props = {
  href: string;
  children: ReactNode;
  tone?: "accent" | "light";
  size?: "md" | "lg";
};

const TONES = {
  accent:
    "bg-(--v4-accent) text-(--v4-on-accent) focus-visible:outline-(--v4-accent)",
  light:
    "bg-(--v4-on-accent) text-[#1c2fd6] focus-visible:outline-(--v4-on-accent)",
};

const SIZES = {
  md: "h-14 px-8 text-base",
  lg: "h-16 px-10 text-lg md:h-20 md:px-14 md:text-2xl",
};

/**
 * Primary "Start free" button with magnetic hover. Pointer offset is written to
 * motion values (never React state) and smoothed with a spring. Mouse only:
 * touch and pen are ignored, and reduced motion disables the pull entirely.
 */
export function MagneticCta({ href, children, tone = "accent", size = "md" }: Props) {
  const reduce = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.5 });
  const lx = useTransform(sx, (v) => v * 0.35);
  const ly = useTransform(sy, (v) => v * 0.35);

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <span
      className="-m-6 inline-block p-6"
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.a
        href={href}
        style={{ x: sx, y: sy }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] outline-offset-4 focus-visible:outline-2 ${TONES[tone]} ${SIZES[size]}`}
      >
        <motion.span style={{ x: lx, y: ly }} className="inline-block">
          {children}
        </motion.span>
      </motion.a>
    </span>
  );
}
