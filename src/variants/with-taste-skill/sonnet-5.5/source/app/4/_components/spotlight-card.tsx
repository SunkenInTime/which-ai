"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";

/** Card whose border and surface light up under the pointer. Pointer position lives in motion values, not React state. */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(226 104 60 / 0.22), transparent 70%)`;

  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] ${className ?? ""}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-200);
        y.set(-200);
      }}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}
