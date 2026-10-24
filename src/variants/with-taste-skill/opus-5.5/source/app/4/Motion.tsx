"use client";

import { useEffect } from "react";

/**
 * The quiet layer: section parts rise once as they enter, the band's picture opens like a shutter,
 * and the one film plays only while it is on screen (never under reduced motion).
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A shutter starts fully clipped, and Chrome never reports a fully clipped target as intersecting,
    // so the shutter's frame is watched instead and the class goes on the shutter.
    const owner = new Map<Element, HTMLElement>();
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => owner.set(el, el));
    document.querySelectorAll<HTMLElement>("[data-shutter]").forEach((el) => owner.set(el.parentElement ?? el, el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            owner.get(e.target)?.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    owner.forEach((_, watched) => io.observe(watched));

    const videos = document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]");
    const vo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      }
    });
    videos.forEach((v) => {
      if (reduce) v.pause();
      vo.observe(v);
    });

    return () => {
      io.disconnect();
      vo.disconnect();
    };
  }, []);

  return null;
}
