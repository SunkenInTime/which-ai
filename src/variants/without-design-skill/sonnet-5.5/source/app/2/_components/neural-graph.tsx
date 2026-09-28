"use client";

import { useEffect, useRef } from "react";

const TITLES = [
  "Zettelkasten", "Spaced repetition", "Q4 roadmap", "Deep Work", "Idea: garden",
  "Pricing v2", "Call with Jo", "Flow state", "Systems thinking", "Reading list",
  "Weekly review", "Memory palace", "Onboarding", "Second brain", "Taste",
  "Bayes", "Commonplace", "Writing in public", "Compounding", "Focus",
  "Local-first", "CRDTs", "Note to self", "Interview: Ana", "Hiring loop",
  "Sleep", "Constraints", "Essay draft", "Mental models", "Retrospective",
  "Design tokens", "Launch plan", "Slow reading", "Questions", "Metaphors",
  "Feynman", "Habit loops", "Roadmap risks", "Book: Range", "Research log",
];

type GraphNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bx: number;
  by: number;
  r: number;
  hub: boolean;
  phase: number;
  label: string;
};

export function NeuralGraph({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono =
      getComputedStyle(canvas).getPropertyValue("--f-jetbrains").trim() || "monospace";

    let w = 0;
    let h = 0;
    let linkDist = 150;
    let nodes: GraphNode[] = [];
    let pointer: { x: number; y: number } | null = null;
    let visible = true;
    let raf = 0;
    let last = performance.now();

    function seed() {
      const count = Math.max(26, Math.min(64, Math.round((w * h) / 24000)));
      const hubs = Math.floor(count / 4);
      nodes = Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = reduceMotion ? 0 : 0.12 + Math.random() * 0.22;
        const bx = Math.cos(angle) * speed;
        const by = Math.sin(angle) * speed;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: bx,
          vy: by,
          bx,
          by,
          hub: i < hubs,
          r: i < hubs ? 3.4 + Math.random() * 2 : 1.4 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          label: TITLES[i % TITLES.length],
        };
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      linkDist = Math.min(190, Math.max(110, w / 8));
      seed();
      if (reduceMotion) draw(performance.now());
    }

    function step(dt: number) {
      for (const n of nodes) {
        if (pointer) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 240 && d > 1) {
            const f = (1 - d / 240) * 0.02 * dt;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }
        n.vx += (n.bx - n.vx) * 0.012 * dt;
        n.vy += (n.by - n.vy) * 0.012 * dt;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > w) {
          n.bx *= -1;
          n.vx *= -1;
          n.x = Math.max(0, Math.min(w, n.x));
        }
        if (n.y < 0 || n.y > h) {
          n.by *= -1;
          n.vy *= -1;
          n.y = Math.max(0, Math.min(h, n.y));
        }
      }
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, w, h);

      let hover = -1;
      if (pointer) {
        let best = 46;
        nodes.forEach((n, i) => {
          const d = Math.hypot(n.x - pointer!.x, n.y - pointer!.y);
          if (d < best) {
            best = d;
            hover = i;
          }
        });
      }

      const linked = new Uint8Array(nodes.length);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > linkDist) continue;
          const t = 1 - d / linkDist;
          const hot = i === hover || j === hover;
          if (hot) {
            linked[i] = 1;
            linked[j] = 1;
          }
          ctx!.strokeStyle = hot
            ? `rgba(94,240,255,${0.35 + t * 0.55})`
            : `rgba(139,123,255,${t * 0.3})`;
          ctx!.lineWidth = hot ? 1.4 : 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      ctx!.font = `11px ${mono}`;
      ctx!.textBaseline = "middle";
      nodes.forEach((n, i) => {
        const hot = i === hover || linked[i] === 1;
        if (n.hub || hot) {
          const pulse = reduceMotion ? 0 : Math.sin(now / 700 + n.phase) * n.r * 0.6;
          const glow = n.r * (hot ? 7 : 5) + pulse;
          const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow);
          g.addColorStop(0, hot ? "rgba(94,240,255,0.5)" : "rgba(139,123,255,0.35)");
          g.addColorStop(1, "rgba(94,240,255,0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, glow, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.fillStyle = hot ? "#5ef0ff" : n.hub ? "#b9c4ff" : "rgba(190,200,240,0.6)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, hot ? n.r + 1.5 : n.r, 0, Math.PI * 2);
        ctx!.fill();

        if (n.hub || hot) {
          ctx!.fillStyle = hot ? "#e9fdff" : "rgba(170,180,215,0.5)";
          ctx!.fillText(n.label, n.x + n.r + 8, n.y);
        }
      });
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      if (!visible) return;
      step(dt);
      draw(now);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
      if (reduceMotion) draw(performance.now());
    }
    function onLeave() {
      pointer = null;
      if (reduceMotion) draw(performance.now());
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(canvas);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    if (!reduceMotion) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
