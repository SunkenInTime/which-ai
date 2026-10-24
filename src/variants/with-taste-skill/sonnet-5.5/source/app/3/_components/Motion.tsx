"use client";

import { useEffect } from "react";

/**
 * Marks entrance targets as seen when they scroll into view, once.
 * Targets carry data-reveal (rise), data-open (shutter), data-draw-group (chart line) or data-roll (figures).
 * Everything is visible without script: the hidden state only exists under .js, which the layout sets
 * before first paint, and Motion confirms it ran by setting data-motion on the root.
 */
export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-p3-root]");
    root?.setAttribute("data-motion", "on");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-open], [data-draw-group], [data-roll]",
      ),
    );
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px 6% 0px", threshold: 0.04 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return null;
}
