"use client";

import { useEffect, useRef } from "react";

/** A muted loop that plays only while it is on screen, and not at all under reduced motion. */
export default function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} width={854} height={480} aria-label={label}>
      <source src={src} type="video/webm" />
    </video>
  );
}
