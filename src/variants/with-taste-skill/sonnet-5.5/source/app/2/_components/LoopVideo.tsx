"use client";

import { useEffect, useRef } from "react";

/** A muted loop that plays only while it is on screen, and not at all under reduced motion (the poster shows). */
export function LoopVideo({
  src,
  poster,
  width,
  height,
  className,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (calm.matches || !visible || document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    calm.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      calm.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
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
      <source src={src} type="video/webm" />
    </video>
  );
}
