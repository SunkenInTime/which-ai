"use client";

import { useEffect } from "react";

/**
 * Section entrances: every [data-reveal] or [data-grow] element arrives once, when its top passes
 * 88% of the screen's height, and anything already scrolled past arrives at once (so a fast jump
 * down the page never leaves a hidden band behind). The hidden starting states live in CSS under
 * html.js and prefers-reduced-motion: no-preference, so nothing stays hidden without this script.
 */
export default function Reveal() {
  useEffect(() => {
    let pending = [...document.querySelectorAll<HTMLElement>("[data-reveal], [data-grow]")];
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.88;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.setAttribute("data-in", "");
          return false;
        }
        return true;
      });
      if (!pending.length) stop();
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    check();
    return () => {
      stop();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
