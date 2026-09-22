"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// reducedMotion="user" lets Motion drop transform animations for users who ask for
// reduced motion, without changing the props we render (keeps SSR and hydration identical).
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
