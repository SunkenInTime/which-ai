"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Arms the page's entrances. Everything is visible in the HTML; once the page has
 * hydrated, anything still below the fold gets its hidden state and is revealed once
 * as it scrolls into view. Under prefers-reduced-motion nothing is hidden at all.
 */
export function Motion() {
  useLayoutEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-p4root]");
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) return;
    el.setAttribute("data-p4load", "");
    el.setAttribute("data-p4js", "");
    return () => {
      el.removeAttribute("data-p4load");
      el.removeAttribute("data-p4js");
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.setAttribute("data-in", ""));
      return;
    }
    // A line that rises out of a mask is fully clipped until it moves, so watch its mask instead.
    const watch = new Map<Element, HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          watch.get(e.target)?.setAttribute("data-in", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    targets.forEach((t) => {
      const host = t.dataset.reveal === "line" && t.parentElement ? t.parentElement : t;
      watch.set(host, t);
      io.observe(host);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
