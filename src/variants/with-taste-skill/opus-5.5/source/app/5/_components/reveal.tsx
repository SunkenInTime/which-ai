"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const SPRING = { type: "spring", stiffness: 100, damping: 20 } as const;

/** Slow spring reveal as a block enters the viewport. Under reduced motion, MotionConfig drops the movement and keeps a fade. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}
