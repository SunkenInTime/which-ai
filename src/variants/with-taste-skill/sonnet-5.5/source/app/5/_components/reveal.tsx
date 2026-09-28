"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      animate={immediate ? target : undefined}
      whileInView={immediate ? undefined : target}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 140, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
