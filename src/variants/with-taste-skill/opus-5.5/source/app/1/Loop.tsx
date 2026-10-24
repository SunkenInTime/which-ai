"use client";

import { useEffect, useRef } from "react";

/** A muted clip that plays only while it is on screen, and never under reduced motion (the poster stays). */
export default function Loop({ src, poster, width, height, label }: { src: string; poster: string; width: number; height: number; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced.matches && document.visibilityState === "visible") video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    const onVisibility = () => {
      if (document.visibilityState !== "visible") video.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} width={width} height={height} aria-label={label}>
      <source src={src} type="video/webm" />
    </video>
  );
}
