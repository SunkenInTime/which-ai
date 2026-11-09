"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Sets `data-in` on its wrapper while it is on screen, so CSS can settle
 * things into place as you arrive (and let them drift again once you leave).
 */
export function InView({
  children,
  className,
  amount = 0.45,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= amount) setSeen(true);
        else if (entry.intersectionRatio === 0) setSeen(false);
      },
      { threshold: [0, amount] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <div ref={ref} className={className} data-in={seen || undefined}>
      {children}
    </div>
  );
}
