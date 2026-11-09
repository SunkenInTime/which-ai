"use client";

import { useEffect } from "react";

/**
 * Marks `[data-ink]` elements inside `#rootId` with `data-seen` the first time
 * they scroll into view, so highlighter strokes, pencil marks and margin
 * cards can draw themselves in. Purely presentational; renders nothing.
 */
export function Reveal({ rootId }: { rootId: string }) {
  useEffect(() => {
    const scope = document.getElementById(rootId);
    if (!scope) return;
    const els = Array.from(scope.querySelectorAll<HTMLElement>("[data-ink]"));

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset.seen = "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.seen = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.25 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootId]);

  return null;
}
