"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Enter-on-scroll for section content. Tells the reader where the next idea starts.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      // Same initial on server and client (avoids a hydration mismatch); reduced motion snaps in.
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
