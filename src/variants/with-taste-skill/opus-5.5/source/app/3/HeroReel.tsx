"use client";

import { useEffect, useRef, useState } from "react";
import s from "./page.module.css";

export type Frame = {
  verb: string;
  source: string;
  src: string;
  alt: string;
  video?: { webm: string; mp4: string };
};

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/**
 * The hero: "Every note you ▭ comes back". The frame where the verb would be belongs to a reel of
 * kept things; while the stage is held, the scroll advances the reel one frame at a time and the
 * caption under "comes back" names the missing word. Without script, or with reduced motion, the
 * stage is an ordinary first screen showing the first frame.
 */
export default function HeroReel({ frames }: { frames: Frame[] }) {
  const section = useRef<HTMLElement>(null);
  const reel = useRef<HTMLSpanElement>(null);
  const track = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);

  // The track holds the last frame before the first and the first after the last, so the strip
  // passing through the sentence never shows an empty end.
  const strip = [frames[frames.length - 1], ...frames, frames[0]];

  useEffect(() => {
    const root = section.current;
    const win = reel.current;
    const tr = track.current;
    if (!root || !win || !tr) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 900px)");
    let raf = 0;
    let last = -1;
    let auto = 0; // the phone's own index, advanced by a timer instead of the scroll
    let timer = 0;
    let visible = true;

    const geometry = () => {
      const items = tr.children as HTMLCollectionOf<HTMLElement>;
      const frameH = items[1].offsetHeight;
      const step = items[2].offsetTop - items[1].offsetTop;
      return { step, centre: (win.clientHeight - frameH) / 2 };
    };

    const show = (pos: number) => {
      const { step, centre } = geometry();
      tr.style.transform = `translate3d(0, ${centre - (1 + pos) * step}px, 0)`;
      const idx = ((Math.round(pos) % frames.length) + frames.length) % frames.length;
      if (idx !== last) {
        last = idx;
        setCurrent(idx);
      }
    };

    const place = () => {
      raf = 0;
      if (still.matches) {
        tr.style.transform = "";
        setCurrent(0);
        last = 0;
        return;
      }
      if (narrow.matches) {
        show(auto);
        return;
      }
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      const p = clamp(-rect.top / travel);
      const span = p * (frames.length - 1);
      const k = Math.min(frames.length - 2, Math.floor(span));
      const t = span - k;
      show(k + smooth(clamp((t - 0.22) / 0.56)));
    };

    // On a phone the stage is not held: the reel turns by itself every few seconds while it is on
    // screen, and after the last frame it runs on to the copy of the first, then snaps back.
    const tick = () => {
      if (!narrow.matches || still.matches || !visible || document.hidden) return;
      auto += 1;
      show(auto);
      if (auto === frames.length) {
        window.setTimeout(() => {
          tr.setAttribute("data-snap", "");
          auto = 0;
          show(0);
          void tr.offsetHeight;
          tr.removeAttribute("data-snap");
        }, 950);
      }
    };
    timer = window.setInterval(tick, 3600);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(win);

    const request = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    still.addEventListener("change", request);
    narrow.addEventListener("change", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      still.removeEventListener("change", request);
      narrow.removeEventListener("change", request);
      window.clearInterval(timer);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [frames.length]);

  // The one moving picture: muted, looped, paused off screen and under reduced motion.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      if (visible && !still.matches && !document.hidden) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    still.addEventListener("change", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  const frame = frames[current] ?? frames[0];

  return (
    <section className={s.hero} id="top" ref={section} aria-labelledby="hero-title">
      <div className={s.heroStage}>
        <header className={s.nav}>
          <a className={s.wordmark} href="#top">
            Engram
          </a>
          <nav className={s.navLinks} aria-label="Sections">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#questions">Questions</a>
          </nav>
          <a className={s.button} href="#download">
            Download Engram
          </a>
        </header>

        <h1 className={s.heroTitle} id="hero-title">
          <span className={s.heroHalf}>
            <span className={s.line}>
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>
                Every note you
              </span>
            </span>
          </span>
          <span className={s.srOnly}> keep </span>
          <span className={s.reel} ref={reel} data-open aria-hidden="true">
            <span className={s.reelTrack} ref={track}>
              {strip.map((f, i) => (
                <span className={s.frame} key={`${f.src}-${i}`}>
                  {f.video && i === 1 ? (
                    <video
                      ref={video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      poster={f.src}
                      width={774}
                      height={436}
                    >
                      <source src={f.video.webm} type="video/webm" />
                      <source src={f.video.mp4} type="video/mp4" />
                    </video>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={f.src}
                      alt=""
                      width={1280}
                      height={720}
                      decoding="async"
                      fetchPriority={i <= 2 ? "high" : undefined}
                      loading={i <= 2 ? undefined : "lazy"}
                    />
                  )}
                </span>
              ))}
            </span>
          </span>
          <span className={`${s.heroHalf} ${s.heroHalfRight}`}>
            <span className={s.line}>
              <span data-line style={{ "--i": 1 } as React.CSSProperties}>
                comes back
              </span>
            </span>
          </span>
        </h1>

        <p className={s.heroCaption} data-load style={{ "--d": "520ms" } as React.CSSProperties}>
          <span className={s.captionText} key={frame.verb}>
            <em>{frame.verb}</em>
            {frame.source}
          </span>
          <span className={s.srOnly}>{frame.alt}</span>
        </p>

        <p className={s.heroLead} data-load style={{ "--d": "440ms" } as React.CSSProperties}>
          Engram is a note-taking app that works as a second brain. Link notes with [[brackets]], and the old
          ones come back when they matter.
        </p>
      </div>
    </section>
  );
}
