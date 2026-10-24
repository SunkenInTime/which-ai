"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../sections.module.css";

export type Slide = { src: string; alt: string; caption: string; w: number; h: number };

/** Four handwritten pages, one framing, changing like light moving across a desk. */
export default function Crossfade({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const start = () => {
      window.clearInterval(id);
      id = window.setInterval(() => setI((n) => (n + 1) % slides.length), 6400);
    };
    const onVis = () => (document.hidden ? window.clearInterval(id) : start());
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [slides.length]);

  return (
    <figure className={styles.xf}>
      <div className={styles.xfStage}>
        {slides.map((s, n) => (
          <Image
            key={s.src}
            className={styles.xfImg}
            data-on={n === i || undefined}
            src={s.src}
            alt={n === i ? s.alt : ""}
            aria-hidden={n === i ? undefined : true}
            width={s.w}
            height={s.h}
            sizes="(max-width: 1023px) 100vw, 58vw"
            priority={n === 0}
          />
        ))}
      </div>
      <figcaption className={styles.xfCap} aria-live="off">
        {slides.map((s, n) => (
          <span key={s.src} className={styles.xfCapItem} data-on={n === i || undefined}>
            {s.caption}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
