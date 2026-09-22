"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Honors prefers-reduced-motion for every Motion animation on the page:
 * transform animations become instant and only opacity fades remain.
 * Kept at the root so server and client render identical initial styles.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
