"use client";

import { useEffect } from "react";

/**
 * Reveals [data-rv] elements once as they scroll into view.
 * Nothing is hidden until this runs, and nothing is hidden at all under reduced motion,
 * so content never depends on the script.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-p5-root]");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.setAttribute("data-js", "");
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
            // once it has arrived, hover and state changes on it should not inherit the stagger delay
            timers.push(window.setTimeout(() => e.target.setAttribute("data-done", ""), 1600));
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );
    root.querySelectorAll("[data-rv]").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      root.removeAttribute("data-js");
      root.querySelectorAll("[data-in]").forEach((el) => el.removeAttribute("data-in"));
      root.querySelectorAll("[data-done]").forEach((el) => el.removeAttribute("data-done"));
    };
  }, []);
  return null;
}
