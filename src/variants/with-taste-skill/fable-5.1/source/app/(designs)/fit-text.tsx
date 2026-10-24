"use client";

import { useEffect, useRef } from "react";

// A display line fitted to its container by measurement, never by a size guessed for one face.
// Each line is measured at `max` and the whole block takes the size at which the widest line fits.
export function FitText({ lines, max = 400, min = 28, className }: { lines: string[]; max?: number; min?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const fit = () => {
      const w = parent.clientWidth;
      if (!w) return;
      el.style.fontSize = `${max}px`;
      let size = max;
      for (const line of Array.from(el.children) as HTMLElement[]) {
        const lw = line.scrollWidth;
        if (lw > 0) size = Math.min(size, (max * w) / lw);
      }
      el.style.fontSize = `${Math.max(min, Math.floor(size))}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [max, min, lines]);
  return (
    <span ref={ref} className={className} style={{ display: "block", lineHeight: 0.9 }}>
      {lines.map((l) => (
        <span key={l} style={{ display: "block", whiteSpace: "nowrap", width: "max-content" }}>
          {l}
        </span>
      ))}
    </span>
  );
}
