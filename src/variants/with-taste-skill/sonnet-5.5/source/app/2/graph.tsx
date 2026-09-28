"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/*
  Interactive note graph for the hero. Plain canvas, one rAF loop, no React
  state: pointer and theme changes write to refs. Layout is precomputed with a
  small deterministic force simulation, so the picture is identical on every load.
*/

type NodeDef = { label: string; group: number; hub?: boolean };

const NODES: NodeDef[] = [
  // Ideas
  { label: "Zettelkasten", group: 0, hub: true },
  { label: "Spaced repetition", group: 0, hub: true },
  { label: "Commonplace book", group: 0 },
  { label: "Slow notes", group: 0 },
  { label: "Evergreen notes", group: 0 },
  { label: "Atomic ideas", group: 0 },
  // Reading
  { label: "Thinking, Fast and Slow", group: 1 },
  { label: "Deep Work", group: 1 },
  { label: "Antifragile", group: 1 },
  { label: "Why We Sleep, highlights", group: 1 },
  { label: "Books to read next", group: 1 },
  { label: "The Overstory", group: 1 },
  // Work
  { label: "Launch checklist", group: 2, hub: true },
  { label: "Call with the vendor", group: 2 },
  { label: "Q3 pricing memo", group: 2 },
  { label: "Onboarding teardown", group: 2 },
  { label: "Interview with Marta", group: 2 },
  { label: "Roadmap draft", group: 2 },
  { label: "Hiring rubric", group: 2 },
  // Health
  { label: "Sleep log", group: 3, hub: true },
  { label: "Zone 2 base building", group: 3 },
  { label: "Marathon plan", group: 3 },
  { label: "Exam week experiment", group: 3 },
  // Home
  { label: "Garden beds, first sketch", group: 4 },
  { label: "Companion planting", group: 4, hub: true },
  { label: "Sourdough starter log", group: 4 },
  { label: "Kitchen renovation quotes", group: 4 },
  { label: "Seed order", group: 4 },
];

const LINK_PAIRS: [string, string][] = [
  ["Zettelkasten", "Atomic ideas"],
  ["Zettelkasten", "Evergreen notes"],
  ["Zettelkasten", "Commonplace book"],
  ["Zettelkasten", "Slow notes"],
  ["Spaced repetition", "Zettelkasten"],
  ["Spaced repetition", "Evergreen notes"],
  ["Spaced repetition", "Exam week experiment"],
  ["Spaced repetition", "Why We Sleep, highlights"],
  ["Spaced repetition", "Onboarding teardown"],
  ["Thinking, Fast and Slow", "Deep Work"],
  ["Antifragile", "Thinking, Fast and Slow"],
  ["Deep Work", "Slow notes"],
  ["Deep Work", "Roadmap draft"],
  ["Books to read next", "Deep Work"],
  ["Books to read next", "Antifragile"],
  ["Books to read next", "The Overstory"],
  ["The Overstory", "Companion planting"],
  ["Why We Sleep, highlights", "Sleep log"],
  ["Sleep log", "Marathon plan"],
  ["Marathon plan", "Zone 2 base building"],
  ["Zone 2 base building", "Sleep log"],
  ["Exam week experiment", "Sleep log"],
  ["Launch checklist", "Call with the vendor"],
  ["Launch checklist", "Roadmap draft"],
  ["Launch checklist", "Q3 pricing memo"],
  ["Q3 pricing memo", "Interview with Marta"],
  ["Onboarding teardown", "Interview with Marta"],
  ["Onboarding teardown", "Roadmap draft"],
  ["Hiring rubric", "Interview with Marta"],
  ["Hiring rubric", "Roadmap draft"],
  ["Commonplace book", "The Overstory"],
  ["Garden beds, first sketch", "Companion planting"],
  ["Companion planting", "Seed order"],
  ["Garden beds, first sketch", "Seed order"],
  ["Slow notes", "Sourdough starter log"],
  ["Kitchen renovation quotes", "Sourdough starter log"],
  ["Kitchen renovation quotes", "Call with the vendor"],
];

type GNode = {
  label: string;
  hub: boolean;
  /** Normalised layout position, 0 to 1 on both axes. */
  nx: number;
  ny: number;
  degree: number;
  phase: number;
  /** Eased pointer push, in css pixels. */
  ox: number;
  oy: number;
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(7);
  const indexOf = new Map(NODES.map((n, i) => [n.label, i]));
  const links = LINK_PAIRS.map(([a, b]) => [indexOf.get(a)!, indexOf.get(b)!] as const);

  const pos = NODES.map((n) => {
    const angle = (n.group / 5) * Math.PI * 2 + rand() * 0.9;
    const r = 220 + rand() * 120;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r * 0.8, vx: 0, vy: 0 };
  });

  const steps = 480;
  for (let step = 0; step < steps; step++) {
    const cool = 1 - step / steps;
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        const dx = pos[j].x - pos[i].x;
        const dy = pos[j].y - pos[i].y;
        const d2 = Math.max(dx * dx + dy * dy, 36);
        const d = Math.sqrt(d2);
        const f = (5400 / d2) * (0.55 + 0.45 * cool);
        pos[i].vx -= (dx / d) * f;
        pos[i].vy -= (dy / d) * f;
        pos[j].vx += (dx / d) * f;
        pos[j].vy += (dy / d) * f;
      }
    }
    for (const [a, b] of links) {
      const dx = pos[b].x - pos[a].x;
      const dy = pos[b].y - pos[a].y;
      const d = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const f = (d - 82) * 0.05;
      pos[a].vx += (dx / d) * f;
      pos[a].vy += (dy / d) * f;
      pos[b].vx -= (dx / d) * f;
      pos[b].vy -= (dy / d) * f;
    }
    for (const p of pos) {
      p.vx += -p.x * 0.011;
      p.vy += -p.y * 0.014;
      p.vx *= 0.8;
      p.vy *= 0.8;
      p.x += p.vx;
      p.y += p.vy;
    }
  }

  const xs = pos.map((p) => p.x);
  const ys = pos.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const degree = new Array(NODES.length).fill(0);
  for (const [a, b] of links) {
    degree[a]++;
    degree[b]++;
  }

  const nodes: GNode[] = NODES.map((n, i) => ({
    label: n.label,
    hub: !!n.hub,
    nx: (pos[i].x - minX) / (maxX - minX),
    ny: (pos[i].y - minY) / (maxY - minY),
    degree: degree[i],
    phase: rand() * Math.PI * 2,
    ox: 0,
    oy: 0,
  }));

  const neighbors: number[][] = NODES.map(() => []);
  for (const [a, b] of links) {
    neighbors[a].push(b);
    neighbors[b].push(a);
  }
  return { nodes, links, neighbors };
}

const GRAPH = buildGraph();

type Signal = { link: number; start: number; forward: boolean };

export function GraphCanvas({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { nodes, links, neighbors } = GRAPH;
    const size = { w: 0, h: 0, dpr: 1 };
    const pointer = { x: -9999, y: -9999, inside: false };
    const colors = {
      fg: "#fff",
      fg2: "#aaa",
      fg3: "#777",
      accent: "#ac6",
      bg: "#000",
      mono: "ui-monospace, monospace",
    };
    let hover = -1;
    let visible = true;
    let raf = 0;
    let signals: Signal[] = [];
    let nextSignalAt = 600;
    const still = !!reduce;

    const readColors = () => {
      const read = (key: string, fallback: string) => {
        const el = probeRefs.current[key];
        return el ? getComputedStyle(el).color : fallback;
      };
      colors.fg = read("fg", colors.fg);
      colors.fg2 = read("fg2", colors.fg2);
      colors.fg3 = read("fg3", colors.fg3);
      colors.accent = read("accent", colors.accent);
      colors.bg = read("bg", colors.bg);
      const family = getComputedStyle(wrap).getPropertyValue("--v-mono").trim();
      colors.mono = family ? `${family}, ui-monospace, monospace` : colors.mono;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      size.dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.w = rect.width;
      size.h = rect.height;
      canvas.width = Math.round(rect.width * size.dpr);
      canvas.height = Math.round(rect.height * size.dpr);
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
    };

    const padX = () => Math.min(90, size.w * 0.12);
    const padY = () => Math.min(70, size.h * 0.12);
    const baseX = (n: (typeof nodes)[number]) => padX() + n.nx * (size.w - padX() * 2);
    const baseY = (n: (typeof nodes)[number]) => padY() + n.ny * (size.h - padY() * 2);

    const drawFrame = (time: number) => {
      const t = still ? 0 : time / 1000;
      ctx.clearRect(0, 0, size.w, size.h);

      // Resolve screen positions: layout + slow drift + eased push from the pointer.
      const pts = nodes.map((n) => {
        const bx = baseX(n) + Math.sin(t * 0.5 + n.phase) * 4;
        const by = baseY(n) + Math.cos(t * 0.42 + n.phase * 1.3) * 4;
        let tx = 0;
        let ty = 0;
        if (pointer.inside) {
          const dx = bx - pointer.x;
          const dy = by - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 110 && d > 0.001) {
            const push = (1 - d / 110) * 14;
            tx = (dx / d) * push;
            ty = (dy / d) * push;
          }
        }
        n.ox += (tx - n.ox) * 0.14;
        n.oy += (ty - n.oy) * 0.14;
        return { x: bx + n.ox, y: by + n.oy };
      });

      // Hover target: nearest node within reach of the pointer.
      let nearest = -1;
      let best = 30;
      if (pointer.inside) {
        pts.forEach((p, i) => {
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
      }
      hover = nearest;
      canvas.style.cursor = hover >= 0 ? "pointer" : "default";
      const active = hover >= 0 ? new Set([hover, ...neighbors[hover]]) : null;

      // Edges
      ctx.lineWidth = 1;
      links.forEach(([a, b]) => {
        const lit = hover >= 0 && (a === hover || b === hover);
        ctx.globalAlpha = lit ? 0.95 : active ? 0.12 : 0.3;
        ctx.strokeStyle = lit ? colors.accent : colors.fg3;
        ctx.lineWidth = lit ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();
      });

      // Signals: a small pulse crossing a link, the way one note leads to the next.
      if (!still) {
        if (time > nextSignalAt && !active) {
          signals.push({
            link: Math.floor(Math.random() * links.length),
            start: time,
            forward: Math.random() > 0.5,
          });
          nextSignalAt = time + 700 + Math.random() * 900;
        }
        signals = signals.filter((s) => time - s.start < 1100);
        for (const s of signals) {
          const k = (time - s.start) / 1100;
          const eased = 1 - Math.pow(1 - k, 3);
          const [a, b] = links[s.link];
          const from = s.forward ? pts[a] : pts[b];
          const to = s.forward ? pts[b] : pts[a];
          const x = from.x + (to.x - from.x) * eased;
          const y = from.y + (to.y - from.y) * eased;
          ctx.globalAlpha = 1 - k * 0.6;
          ctx.fillStyle = colors.accent;
          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nodes
      nodes.forEach((n, i) => {
        const isHover = i === hover;
        const isNeighbor = active?.has(i) && !isHover;
        const r = 2.6 + Math.min(n.degree, 6) * 0.55 + (isHover ? 2 : 0);
        ctx.globalAlpha = active && !isHover && !isNeighbor ? 0.3 : 1;
        ctx.fillStyle = isHover || isNeighbor ? colors.accent : colors.fg2;
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
        ctx.fill();
        if (isHover) {
          ctx.globalAlpha = 0.35;
          ctx.strokeStyle = colors.accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, r + 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Labels: hubs always, hovered node and its neighbours on demand.
      ctx.font = `500 12px ${colors.mono}`;
      ctx.textBaseline = "middle";
      nodes.forEach((n, i) => {
        const isHover = i === hover;
        const isNeighbor = !!active?.has(i) && !isHover;
        const show = active ? isHover || isNeighbor : n.hub;
        if (!show) return;
        const text = n.label;
        const width = ctx.measureText(text).width;
        const r = 2.6 + Math.min(n.degree, 6) * 0.55;
        let x = pts[i].x + r + 9;
        if (x + width + 8 > size.w) x = pts[i].x - r - 9 - width;
        const y = pts[i].y;
        ctx.globalAlpha = isHover ? 0.94 : active ? 0.85 : 0.9;
        ctx.fillStyle = colors.bg;
        ctx.fillRect(x - 5, y - 10, width + 10, 20);
        ctx.globalAlpha = 1;
        ctx.fillStyle = isHover ? colors.accent : active ? colors.fg : colors.fg2;
        ctx.fillText(text, x, y + 0.5);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (visible && !document.hidden) drawFrame(time);
      raf = requestAnimationFrame(loop);
    };

    const redrawOnce = () => {
      if (still) drawFrame(0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = true;
      redrawOnce();
    };
    const onLeave = () => {
      pointer.inside = false;
      redrawOnce();
    };

    readColors();
    resize();

    const ro = new ResizeObserver(() => {
      resize();
      redrawOnce();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      readColors();
      redrawOnce();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onMedia = () => {
      readColors();
      redrawOnce();
    };
    media.addEventListener("change", onMedia);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    if (still) drawFrame(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      media.removeEventListener("change", onMedia);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive graph of linked notes. Hover a note to see what it connects to."
        className="block size-full touch-pan-y"
      />
      {/* Probes resolve the light-dark() tokens into plain colors for the canvas. */}
      <span aria-hidden className="hidden">
        {(["fg", "fg2", "fg3", "accent", "bg"] as const).map((key) => (
          <span
            key={key}
            ref={(el) => {
              probeRefs.current[key] = el;
            }}
            className={
              key === "fg"
                ? "text-[color:var(--fg)]"
                : key === "fg2"
                  ? "text-[color:var(--fg-2)]"
                  : key === "fg3"
                    ? "text-[color:var(--fg-3)]"
                    : key === "accent"
                      ? "text-[color:var(--accent)]"
                      : "text-[color:var(--bg)]"
            }
          />
        ))}
      </span>
    </div>
  );
}
