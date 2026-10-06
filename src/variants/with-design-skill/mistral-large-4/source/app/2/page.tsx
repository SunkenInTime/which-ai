"use client";

import { useEffect, useRef } from "react";
import "@/generated/scoped-variant-css/with-design-skill/mistral-large-4/source/app/2/observatory.css";

type Star = {
  x: number;
  y: number;
  r: number;
  label: string;
  drift: number;
  phase: number;
};

const STARS: Star[] = [
  { x: 0.16, y: 0.24, r: 4.5, label: "Morning pages", drift: 0.6, phase: 0.0 },
  { x: 0.34, y: 0.62, r: 3.5, label: "Kyoto itinerary", drift: 0.4, phase: 1.2 },
  { x: 0.52, y: 0.3, r: 5, label: "Second brain essay", drift: 0.8, phase: 2.1 },
  { x: 0.68, y: 0.66, r: 3, label: "Studio rebrand", drift: 0.5, phase: 3.4 },
  { x: 0.84, y: 0.22, r: 4, label: "Calvino quotes", drift: 0.7, phase: 4.0 },
  { x: 0.26, y: 0.82, r: 2.5, label: "Gift ideas", drift: 0.3, phase: 5.1 },
  { x: 0.58, y: 0.84, r: 3.5, label: "Book: The Overstory", drift: 0.5, phase: 0.7 },
  { x: 0.9, y: 0.52, r: 4.5, label: "Why we forget", drift: 0.6, phase: 1.9 },
  { x: 0.44, y: 0.46, r: 2.5, label: "Grocery list", drift: 0.4, phase: 2.8 },
  { x: 0.74, y: 0.4, r: 3, label: "Talk: memory & place", drift: 0.5, phase: 3.9 },
  { x: 0.1, y: 0.52, r: 3, label: "Dream, Tuesday", drift: 0.4, phase: 5.5 },
  { x: 0.62, y: 0.12, r: 2.5, label: "Side project name", drift: 0.3, phase: 0.4 },
];

const LINKS: [number, number][] = [
  [0, 2], [2, 4], [2, 9], [1, 2], [1, 5], [3, 7], [7, 4],
  [6, 1], [8, 2], [9, 7], [10, 0], [11, 2],
];

export default function ObservatoryPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = (t: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const pts = STARS.map((s) => ({
        ...s,
        x: s.x * w,
        y: s.y * h + (reduced ? 0 : Math.sin(t / 2400 + s.phase) * 6 * s.drift),
      }));

      // fixed constellation links
      ctx.lineWidth = 1;
      for (const [a, b] of LINKS) {
        const p = pts[a];
        const q = pts[b];
        const g = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
        g.addColorStop(0, "rgba(124, 108, 240, 0.05)");
        g.addColorStop(0.5, "rgba(124, 108, 240, 0.35)");
        g.addColorStop(1, "rgba(124, 108, 240, 0.05)");
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }

      // cursor proximity links
      for (const p of pts) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < 170) {
          const alpha = (1 - d / 170) * 0.7;
          ctx.strokeStyle = `rgba(201, 194, 184, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // stars
      for (const p of pts) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 170;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r + 1.5 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? "#e8eaf0" : "rgba(232, 234, 240, 0.85)";
        ctx.fill();
        if (near) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 7, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(124, 108, 240, 0.8)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.font = "12px 'JetBrains Mono', monospace";
          ctx.fillStyle = "#c9c2b8";
          ctx.fillText(p.label, p.x + p.r + 12, p.y + 4);
        }
      }

      // cursor reticle
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(124, 108, 240, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="obs">
      <header className="obs__nav">
        <div className="obs__brand">Mnemosyne</div>
        <nav className="obs__links" aria-label="Primary">
          <a href="#sky">The sky</a>
          <a href="#how">How it works</a>
          <a href="#begin">Begin</a>
        </nav>
      </header>

      <main>
        <section className="obs__hero" id="sky">
          <div className="obs__hero-copy">
            <h1 className="obs__title">
              Your mind,
              <br />
              mapped at night.
            </h1>
            <p className="obs__lede">
              Every note you take becomes a star. Notes that resemble each other
              drift near. Move through your sky and watch the constellations
              form — that is your second brain, thinking alongside you.
            </p>
            <div className="obs__actions">
              <a className="obs__cta" href="#begin">
                Chart your sky
              </a>
              <a className="obs__ghost" href="#how">
                How it works
              </a>
            </div>
            <p className="obs__hint">Move your cursor across the sky.</p>
          </div>
          <div className="obs__canvas-wrap">
            <canvas
              ref={canvasRef}
              className="obs__canvas"
              aria-label="Interactive constellation of your notes. Move your cursor to see connections."
            />
          </div>
        </section>

        <section className="obs__how" id="how">
          <div className="obs__how-grid">
            <h2 className="obs__h2">How it works</h2>
            <div className="obs__how-items">
              <div className="obs__how-item">
                <span className="obs__how-no">01</span>
                <h3>Capture in the dark</h3>
                <p>
                  A quick-capture field that never asks where to file anything.
                  Thoughts land in one inbox, timestamped, untouched.
                </p>
              </div>
              <div className="obs__how-item">
                <span className="obs__how-no">02</span>
                <h3>Let them cluster</h3>
                <p>
                  Mnemosyne reads for resemblance. Notes about the same idea
                  drift together and draw lines between themselves, on their
                  own.
                </p>
              </div>
              <div className="obs__how-item">
                <span className="obs__how-no">03</span>
                <h3>Navigate by starlight</h3>
                <p>
                  Wander the map instead of searching for it. Follow a line from
                  one thought to the next and arrive somewhere you did not plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="obs__begin" id="begin">
          <h2 className="obs__begin-title">The sky is empty. For now.</h2>
          <p className="obs__begin-copy">
            Your first note is the first star. Everything else grows from there.
          </p>
          <form className="obs__form" action="#begin">
            <label className="obs__label" htmlFor="obs-email">
              Invite me to the beta
            </label>
            <div className="obs__form-row">
              <input
                id="obs-email"
                type="email"
                required
                placeholder="you@example.com"
                className="obs__input"
              />
              <button type="submit" className="obs__cta">
                Request a star
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="obs__footer">
        <span>Mnemosyne — see what you were thinking</span>
        <span>Iteration 02 · The Observatory</span>
      </footer>
    </div>
  );
}
