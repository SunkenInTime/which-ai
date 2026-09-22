"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const base =
  "inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-medium tracking-[-0.01em] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--k-accent)";

const variants = {
  primary:
    "bg-(--k-accent) text-(--k-on-accent) shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_1px_2px_rgb(120_40_10/0.25)]",
  secondary:
    "border border-(--k-line-strong) bg-(--k-surface) text-(--k-fg) hover:border-(--k-fg-3)",
} as const;

export function Cta({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      {children}
    </motion.a>
  );
}
