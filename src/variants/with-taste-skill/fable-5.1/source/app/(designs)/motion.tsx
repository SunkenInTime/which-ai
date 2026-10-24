"use client";

import { useEffect } from "react";

// Reveal-once observer for [data-reveal] (and the header-ink helper for colour chapters).
// Content is never hidden unless scripting works: the hidden state lives under html.js in CSS.
export function Motion() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    targets.forEach((el) => io.observe(el));
    const safety = window.setTimeout(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-in");
      });
    }, 2500);

    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-ink]"));
    let io2: IntersectionObserver | undefined;
    if (chapters.length) {
      io2 = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const page = entry.target.closest<HTMLElement>(".page");
              const t = entry.target as HTMLElement;
              (page ?? document.documentElement).style.setProperty("--header-ink", t.dataset.ink ?? "");
              (page ?? document.documentElement).style.setProperty("--header-bg", t.dataset.bg ?? "");
            }
          }
        },
        { rootMargin: "0px 0px -92% 0px", threshold: 0 },
      );
      chapters.forEach((el) => io2!.observe(el));
    }
    return () => {
      io.disconnect();
      io2?.disconnect();
      window.clearTimeout(safety);
    };
  }, []);
  return null;
}
