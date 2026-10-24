"use client";

import { useEffect, useRef, useState } from "react";
import s from "./page.module.css";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

/**
 * The rail across the middle of the first screen. It is sticky in the page's flow, so it rises with the
 * scroll and docks as the header; once the photographs have passed it takes the page ground.
 * It also pauses the reading-room crossfade while the tab is hidden.
 */
export default function HeroRail() {
  const railRef = useRef<HTMLElement>(null);
  const [docked, setDocked] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const end = document.getElementById("hero-end");
    let frame = 0;
    const check = () => {
      frame = 0;
      if (!end || !railRef.current) return;
      setDocked(end.getBoundingClientRect().top <= railRef.current.offsetHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const fade = document.querySelector<HTMLElement>("[data-crossfade]");
    const onVisibility = () => fade?.toggleAttribute("data-paused", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <header ref={railRef} className={s.rail} data-docked={docked ? "" : undefined}>
      <div className={s.railInner}>
        <h1 className={s.h1}>
          <span className={s.loadLine} style={{ ["--d" as string]: "100ms" }}>
            Engram, a second brain
          </span>
        </h1>
        <p className={s.railLine}>
          <span className={s.loadLine} style={{ ["--d" as string]: "260ms" }}>
            Notes that come back when you need them.
          </span>
        </p>
        <nav className={s.railNav} aria-label="Main">
          {LINKS.map((l, i) => (
            <a key={l.href} className={s.railLink} href={l.href} data-load="" style={{ ["--d" as string]: `${380 + i * 60}ms` }}>
              {l.label}
            </a>
          ))}
          <a className={s.railButton} href="#download" data-load="" style={{ ["--d" as string]: "500ms" }}>
            Download
          </a>
        </nav>
        <button type="button" className={s.menuButton} aria-expanded={menu} aria-controls="menu-sheet" onClick={() => setMenu(true)}>
          Menu
        </button>
      </div>
      {menu && (
        <div id="menu-sheet" className={s.menuSheet} role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className={s.menuClose} onClick={() => setMenu(false)} autoFocus>
            Close
          </button>
          <nav className={s.menuLinks} aria-label="Menu">
            {[...LINKS, { href: "#questions", label: "Questions" }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
                {l.label}
              </a>
            ))}
            <a className={s.menuButtonFill} href="#download" onClick={() => setMenu(false)}>
              Download Engram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
