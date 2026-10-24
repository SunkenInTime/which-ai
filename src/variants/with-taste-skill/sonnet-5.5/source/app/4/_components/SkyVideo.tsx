"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** Pixel size of the source, so the layout is whole before the file arrives. */
  width: number;
  height: number;
  poster: string;
  sources: { src: string; type: string }[];
  label?: string;
};

/**
 * A muted loop that pauses when it is off screen and stays on its poster frame
 * under prefers-reduced-motion.
 */
export function SkyVideo({ className, width, height, poster, sources, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      width={width}
      height={height}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      tabIndex={-1}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
