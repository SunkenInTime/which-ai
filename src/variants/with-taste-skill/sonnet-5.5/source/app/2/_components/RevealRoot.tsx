"use client";

import { useEffect } from "react";

/**
 * Entrance for the parts of each section. Anything marked data-rv that starts
 * below the first screen is armed (hidden, 28px low) and lifted in once, as it
 * scrolls into view. Without script, or with reduced motion, nothing is hidden.
 */
export function RevealRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"));
    if (calm.matches || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.setAttribute("data-rv", "in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-rv", "in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const h = window.innerHeight;
    for (const n of nodes) {
      const top = n.getBoundingClientRect().top;
      if (top > h * 0.92) {
        n.setAttribute("data-rv", "armed");
        io.observe(n);
      } else {
        n.setAttribute("data-rv", "in");
      }
    }
    return () => io.disconnect();
  }, []);

  return <>{children}</>;
}
