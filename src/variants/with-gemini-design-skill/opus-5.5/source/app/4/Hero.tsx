"use client";

import { useEffect, useRef } from "react";
import s from "./page.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.0005 || Math.abs(ty - cy) > 0.0005) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className={s.hero} id="top">
      <div className={s.heroSky} aria-hidden="true" />
      <p className={s.heroWord} aria-hidden="true">Remember</p>

      <div className={s.stackWrap} aria-hidden="true">
        <div className={s.stack}>
          <div className={`${s.note} ${s.noteBack}`}>
            <div className={s.noteHead}>
              <svg viewBox="0 0 20 20" className={s.noteIcon}><rect x="3" y="2" width="14" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M6.5 7h7M6.5 10h7M6.5 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <span>Venue shortlist.pdf</span>
            </div>
            <p className={s.noteMuted}>3 pages · clipped from email</p>
          </div>

          <div className={`${s.note} ${s.noteMid}`}>
            <div className={s.noteHead}>
              <svg viewBox="0 0 20 20" className={s.noteIcon}><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M8 7.2v5.6l4.6-2.8z" fill="currentColor" /></svg>
              <span>Voice memo, 0:42</span>
            </div>
            <div className={s.wave}>
              {[5, 9, 14, 8, 18, 12, 20, 10, 15, 7, 13, 19, 9, 6, 12, 16, 8, 11, 5, 9].map((h, i) => (
                <i key={i} style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>

          <div className={`${s.note} ${s.noteFront}`}>
            <div className={s.noteHead}>
              <span className={s.noteDate}>Tuesday, 24 November</span>
            </div>
            <p className={s.noteTitle}>Lisbon offsite</p>
            <p className={s.noteBody}>
              Book the <span className={s.link}>riverside venue</span> before Friday. Maya liked the idea from
              the <span className={s.link}>March retro</span>.
            </p>
            <div className={s.noteFoot}>
              <span className={s.dot} /> 2 notes linked automatically
            </div>
          </div>

          <div className={`${s.note} ${s.noteClip}`}>
            <div className={s.noteHead}>
              <svg viewBox="0 0 20 20" className={s.noteIcon}><path d="M8.5 11.5l3-3M7 13.8l-1 1a2.6 2.6 0 01-3.7-3.7l2.6-2.6a2.6 2.6 0 013.7 0M13 6.2l1-1a2.6 2.6 0 013.7 3.7l-2.6 2.6a2.6 2.6 0 01-3.7 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <span>Web clip</span>
            </div>
            <p className={s.noteMuted}>Running remote retros that people enjoy</p>
          </div>

          <svg className={s.threads} viewBox="0 0 600 420" preserveAspectRatio="none">
            <path d="M300 210 C 220 160, 160 120, 110 92" />
            <path d="M300 210 C 380 170, 440 140, 500 118" />
            <path d="M300 210 C 400 260, 450 300, 492 330" />
          </svg>
        </div>
      </div>

      <div className={s.heroCopy}>
        <h1 className={s.heroTitle}>A second brain that remembers for you</h1>
        <p className={s.heroSub}>
          Kept saves what you capture, links related ideas on its own, and hands them back the moment you need them.
        </p>
        <a href="#pricing" className={s.btnPrimary}>Start free</a>
      </div>
    </section>
  );
}
