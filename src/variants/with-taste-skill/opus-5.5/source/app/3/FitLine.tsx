"use client";

import { useEffect, useRef } from "react";

/**
 * Sets a single line of display type so it fills its container's width exactly, by measurement
 * rather than by a size guessed for one face. The server renders it at a close guess first.
 */
export default function FitLine({
  children,
  className,
  guess,
  max = 320,
}: {
  children: React.ReactNode;
  className?: string;
  guess: string;
  max?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const natural = el.getBoundingClientRect().width;
      const room = box.clientWidth - parseFloat(getComputedStyle(box).paddingLeft) - parseFloat(getComputedStyle(box).paddingRight);
      el.style.fontSize = `${Math.min(max, (100 * room) / natural) * 0.995}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [max]);

  return (
    <h2 ref={ref} className={className} style={{ fontSize: guess }}>
      {children}
    </h2>
  );
}
