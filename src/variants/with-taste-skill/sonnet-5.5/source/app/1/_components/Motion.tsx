"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Marks [data-reveal] and [data-open] elements as seen once they scroll into view.
 * The page is fully readable without this: the hidden state only exists when scripting
 * is on, and falls back to visible by itself after a few seconds (see p1.module.css).
 */
export function Motion() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "#p1 [data-reveal], #p1 [data-open]",
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "1";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return null;
}

/** A muted loop that plays only while it is on screen, and never under reduced motion. */
export function LoopVideo({
  poster,
  webm,
  mp4,
  width,
  height,
  className,
}: {
  poster: string;
  webm: string;
  mp4: string;
  width: number;
  height: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([e]) => {
        if (calm.matches) return v.pause();
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}

/** Sets the type so the ink of the word runs exactly from margin to margin, measured, not guessed. */
export function FitWord({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const [fit, setFit] = useState<{ size: number; shift: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!wrap.current || !word.current) return;
      const w = wrap.current.clientWidth;
      const cs = getComputedStyle(word.current);
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx || w === 0) return;
      ctx.font = `100px ${cs.fontFamily}`;
      const m = ctx.measureText(children);
      // ink runs from -actualBoundingBoxLeft to actualBoundingBoxRight, measured from the origin
      const inkLeft = -m.actualBoundingBoxLeft;
      const inkWidth = m.actualBoundingBoxRight - inkLeft;
      if (inkWidth <= 0) return;
      const size = Math.floor((100 * w) / inkWidth);
      setFit({ size, shift: (-inkLeft * size) / 100 });
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [children]);

  return (
    <span ref={wrap} className={className} style={{ display: "block" }}>
      <span
        ref={word}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontSize: fit ? `${fit.size}px` : undefined,
          marginLeft: fit ? `${fit.shift}px` : undefined,
        }}
      >
        {children}
      </span>
    </span>
  );
}
