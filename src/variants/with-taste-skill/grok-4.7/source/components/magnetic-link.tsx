"use client";

import { useMotionValue, useReducedMotion, useSpring, motion } from "motion/react";
import { primaryCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

export function MagneticLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 22 });
  const springY = useSpring(y, { stiffness: 250, damping: 22 });

  return (
    <motion.a
      href={href}
      style={reduce ? undefined : { x: springX, y: springY }}
      onMouseMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.4);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={primaryCta}
    >
      {children}
    </motion.a>
  );
}
