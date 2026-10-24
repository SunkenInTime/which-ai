"use client";

import { useEffect } from "react";

/**
 * The quiet layer for /2: entrances that fire once, the film that plays only in view,
 * and the footer address fitted to the width of the card back.
 * Nothing is hidden until this runs, so the page reads whole without script.
 */
export default function PageMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // Entrances: mark what is already on screen, hide the rest, reveal each once as it arrives.
    if (!reduce) {
      const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      const show = (el: HTMLElement) => {
        el.dataset.shown = "";
        io.unobserve(el);
      };
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) show(e.target as HTMLElement);
          // A jump (a link, the end key) can carry the reader past a block before it ever intersects:
          // whatever now lies above the bottom of the screen is shown, so nothing is left hidden behind them.
          for (const el of els) if (!("shown" in el.dataset) && el.getBoundingClientRect().top < window.innerHeight) show(el);
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0 },
      );
      // On a phone the long lists (menu rows, questions, the slip) are simply there; only headings and pictures arrive.
      const phone = window.matchMedia("(max-width: 760px)").matches;
      for (const el of els) {
        if (phone && !/^(H2|H3|FIGURE)$/.test(el.tagName)) { el.dataset.shown = ""; continue; }
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.dataset.shown = "";
        else io.observe(el);
      }
      root.dataset.motion = "";
      cleanups.push(() => io.disconnect());
    }

    // The film: a silent loop that plays only while it is on screen, and never under reduced motion.
    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video[data-loop]"));
    if (!reduce && videos.length) {
      const vio = new IntersectionObserver((entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      }, { threshold: 0.2 });
      videos.forEach((v) => vio.observe(v));
      const onVis = () => { if (document.hidden) videos.forEach((v) => v.pause()); };
      document.addEventListener("visibilitychange", onVis);
      cleanups.push(() => { vio.disconnect(); document.removeEventListener("visibilitychange", onVis); });
    }

    // Fit display lines (the footer address) to their box by measurement, not by a guessed size.
    const fits = Array.from(root.querySelectorAll<HTMLElement>("[data-fit]"));
    // Lines that share a box share one size: the longest line decides it.
    const fit = () => {
      const boxes = new Map<HTMLElement, HTMLElement[]>();
      for (const el of fits) {
        const box = el.parentElement;
        if (box) boxes.set(box, [...(boxes.get(box) ?? []), el]);
      }
      for (const [box, lines] of boxes) {
        if (!box.clientWidth) continue;
        let size = Infinity;
        for (const el of lines) {
          el.style.fontSize = "100px";
          const w = el.scrollWidth;
          if (w > 0) size = Math.min(size, (100 * box.clientWidth * Number(el.dataset.fit || 0.9)) / w);
        }
        if (Number.isFinite(size)) for (const el of lines) el.style.fontSize = `${Math.floor(size)}px`;
      }
    };
    if (fits.length) {
      fit();
      const ro = new ResizeObserver(fit);
      fits.forEach((el) => el.parentElement && ro.observe(el.parentElement));
      document.fonts?.ready.then(fit).catch(() => {});
      cleanups.push(() => ro.disconnect());
    }

    return () => cleanups.forEach((c) => c());
  }, [rootId]);

  return null;
}
