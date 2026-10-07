"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type StackItem = {
  id: string;
  className: string;
  children: ReactNode;
};

export function StickyStack({ items }: { items: StackItem[] }) {
  return (
    <div className="flex flex-col gap-[14vh]">
      {items.map((item, index) => (
        <StackCard key={item.id} index={index} className={item.className}>
          {item.children}
        </StackCard>
      ))}
    </div>
  );
}

function StackCard({
  index,
  className,
  children,
}: {
  index: number;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <motion.div
      ref={ref}
      className={`sticky min-h-[72dvh] overflow-hidden rounded-[40px] p-8 shadow-[0_-16px_40px_-20px_rgb(9_9_11/0.35)] md:p-12 ${className}`}
      style={{
        top: `calc(6rem + ${index * 16}px)`,
        scale: reduce ? 1 : scale,
      }}
    >
      {children}
    </motion.div>
  );
}
