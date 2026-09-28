"use client";

import { MotionConfig } from "motion/react";

/** Honors prefers-reduced-motion for every motion component in the tree. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
