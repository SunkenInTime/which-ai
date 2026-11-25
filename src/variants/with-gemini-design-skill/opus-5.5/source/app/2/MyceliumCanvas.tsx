"use client";

import { useEffect, useRef } from "react";

type Node = {
  ax: number;
  ay: number;
  x: number;
  y: number;
  r: number;
  phase: number;
  glow: number;
  fade: number;
  born: number;
  label?: string;
  labelAlways?: boolean;
};

type Edge = {
  a: number;
  b: number;
  bend: number;
  start: number;
  dur: number;
};

type Pulse = { e: number; t0: number; dur: number; dir: 1 | -1 };

const TITLES = [
  "Greenhouse sensors",
  "Battery tests",
  "Mara 1:1 notes",
  "Soil moisture",
  "Grant draft",
  "Reading: The Overstory",
  "Q3 planning",
  "Sourdough ratios",
  "Lisbon trip",
  "Talk outline",
  "Compost log",
  "Sleep experiment",
  "Fermentation",
  "Interview with Jun",
];

const MINT: [number, number, number] = [166, 212, 184];
const CORAL: [number, number, number] = [255, 122, 77];

function mix(t: number) {
  const r = Math.round(MINT[0] + (CORAL[0] - MINT[0]) * t);
  const g = Math.round(MINT[1] + (CORAL[1] - MINT[1]) * t);
  const b = Math.round(MINT[2] + (CORAL[2] - MINT[2]) * t);
  return `${r},${g},${b}`;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// Small deterministic PRNG so the layout is stable between renders.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function MyceliumCanvas({
  className,
  areaPerNode = 13000,
  labels = true,
  clearing = { x: 0.5, y: 0.5, rx: 0.36, ry: 0.27 },
  seed = 7,
}: {
  className?: string;
  areaPerNode?: number;
  labels?: boolean;
  clearing?: { x: number; y: number; rx: number; ry: number };
  seed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    if (!ctx || !host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let adj: number[][] = [];
    let pulses: Pulse[] = [];
    let lastPulse = 0;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const pointer = { x: -9999, y: -9999, active: false };
    const fontFamily = getComputedStyle(host).fontFamily || "system-ui, sans-serif";

    function build() {
      const rect = host!.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = rng(seed + Math.round(w / 50));
      const count = clamp(Math.round((w * h) / areaPerNode), 30, 130);
      const minD = Math.sqrt((w * h) / count) * 0.55;
      const cx = clearing.x * w;
      const cy = clearing.y * h;
      const rx = Math.max(160, clearing.rx * w);
      const ry = Math.max(120, clearing.ry * h);

      nodes = [];
      let attempts = 0;
      while (nodes.length < count && attempts < count * 60) {
        attempts++;
        const x = rand() * (w + 80) - 40;
        const y = rand() * (h + 60) - 30;
        const e = Math.hypot((x - cx) / rx, (y - cy) / ry);
        if (e < 1 && rand() < 0.88) continue;
        let ok = true;
        for (const n of nodes) {
          if ((n.ax - x) ** 2 + (n.ay - y) ** 2 < minD * minD) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        nodes.push({
          ax: x,
          ay: y,
          x,
          y,
          r: 1.1 + rand() * 2.2,
          phase: rand() * Math.PI * 2,
          glow: 0,
          fade: clamp((e - 0.75) / 0.7, 0.22, 1),
          born: 0,
        });
      }

      // k-nearest neighbour links make the network read as grown, not random.
      const maxD = Math.max(150, Math.sqrt((w * h) / count) * 2.1);
      const seen = new Set<string>();
      edges = [];
      adj = nodes.map(() => []);
      nodes.forEach((n, i) => {
        const near = nodes
          .map((m, j) => ({ j, d: Math.hypot(m.ax - n.ax, m.ay - n.ay) }))
          .filter((o) => o.j !== i && o.d < maxD)
          .sort((p, q) => p.d - q.d)
          .slice(0, rand() < 0.4 ? 3 : 2);
        for (const o of near) {
          const key = i < o.j ? `${i}-${o.j}` : `${o.j}-${i}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const idx = edges.length;
          edges.push({ a: i, b: o.j, bend: (rand() - 0.5) * 0.5, start: 0, dur: 0.9 + rand() * 0.9 });
          adj[i].push(idx);
          adj[o.j].push(idx);
        }
      });

      // Grow outward from a few seed nodes, breadth first.
      const depth = new Array(nodes.length).fill(-1);
      const order = nodes
        .map((n, i) => ({ i, d: Math.hypot(n.ax - cx, n.ay - cy) }))
        .sort((p, q) => q.d - p.d);
      const seeds = [order[0]?.i, order[Math.floor(order.length * 0.15)]?.i, order[Math.floor(order.length * 0.3)]?.i].filter(
        (v): v is number => v !== undefined,
      );
      const queue: number[] = [];
      seeds.forEach((s) => {
        depth[s] = 0;
        queue.push(s);
      });
      while (queue.length) {
        const i = queue.shift()!;
        for (const ei of adj[i]) {
          const e = edges[ei];
          const j = e.a === i ? e.b : e.a;
          if (depth[j] === -1) {
            depth[j] = depth[i] + 1;
            e.start = depth[i] * 0.32 + rand() * 0.25;
            queue.push(j);
          } else if (e.start === 0 && !(depth[j] === 0 && depth[i] === 0)) {
            e.start = Math.max(depth[i], depth[j]) * 0.32 + 0.3 + rand() * 0.3;
          }
        }
      }
      nodes.forEach((n, i) => {
        if (depth[i] === -1) depth[i] = 2 + Math.floor(rand() * 6);
        n.born = depth[i] * 0.32;
      });
      edges.forEach((e) => {
        if (e.start === 0) e.start = Math.min(depth[e.a], depth[e.b]) * 0.32 + rand() * 0.4;
      });

      if (labels) {
        const candidates = nodes
          .map((n, i) => ({ i, score: n.fade * (0.6 + n.r / 3) + rand() * 0.3 }))
          .filter((o) => {
            const n = nodes[o.i];
            return n.ax > 90 && n.ax < w - 190 && n.ay > 110 && n.ay < h - 80;
          })
          .sort((p, q) => q.score - p.score);
        const picked: number[] = [];
        for (const c of candidates) {
          if (picked.length >= TITLES.length) break;
          const n = nodes[c.i];
          if (picked.some((p) => Math.hypot(nodes[p].ax - n.ax, nodes[p].ay - n.ay) < 170)) continue;
          picked.push(c.i);
        }
        picked.forEach((p, k) => {
          nodes[p].label = TITLES[k];
          nodes[p].labelAlways = k < (w < 700 ? 2 : 5);
          nodes[p].r = Math.max(nodes[p].r, 2.6);
        });
      }
    }

    function draw(time: number) {
      const t = reduce ? 1000 : time;
      ctx!.clearRect(0, 0, w, h);

      const R = Math.min(190, Math.max(120, w * 0.13));
      for (const n of nodes) {
        const driftX = reduce ? 0 : Math.sin(t * 0.25 + n.phase) * 3.5;
        const driftY = reduce ? 0 : Math.cos(t * 0.21 + n.phase * 1.3) * 3.5;
        let target = 0;
        if (pointer.active) {
          const d = Math.hypot(pointer.x - n.ax, pointer.y - n.ay);
          target = d < R ? 1 - d / R : 0;
        }
        n.glow += (target - n.glow) * (reduce ? 1 : 0.09);
        const pull = n.glow * 0.08;
        n.x = n.ax + driftX + (pointer.x - n.ax) * pull;
        n.y = n.ay + driftY + (pointer.y - n.ay) * pull;
      }

      // Filaments
      ctx!.lineCap = "round";
      for (const e of edges) {
        const p = clamp((t - e.start) / e.dur, 0, 1);
        if (p <= 0) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const g = Math.max(a.glow, b.glow);
        const fade = Math.max((a.fade + b.fade) / 2, g * 0.6);
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const wob = reduce ? 0 : Math.sin(t * 0.4 + e.bend * 10) * 0.04;
        const cxp = (a.x + b.x) / 2 - dy * (e.bend + wob);
        const cyp = (a.y + b.y) / 2 + dx * (e.bend + wob);
        const ease = 1 - Math.pow(1 - p, 3);
        // Partial quadratic via de Casteljau split.
        const q0x = a.x + (cxp - a.x) * ease;
        const q0y = a.y + (cyp - a.y) * ease;
        const q1x = cxp + (b.x - cxp) * ease;
        const q1y = cyp + (b.y - cyp) * ease;
        const ex = q0x + (q1x - q0x) * ease;
        const ey = q0y + (q1y - q0y) * ease;
        ctx!.strokeStyle = `rgba(${mix(g)},${(0.13 + g * 0.55) * fade})`;
        ctx!.lineWidth = 0.9 + g * 1.1;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.quadraticCurveTo(q0x, q0y, ex, ey);
        ctx!.stroke();
        if (p < 1) {
          ctx!.fillStyle = `rgba(${mix(0.2)},${0.8 * fade})`;
          ctx!.beginPath();
          ctx!.arc(ex, ey, 1.6, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Signals travelling along grown filaments
      if (!reduce && edges.length) {
        if (time - lastPulse > 0.22 && pulses.length < 16) {
          lastPulse = time;
          const ei = Math.floor(Math.random() * edges.length);
          const e = edges[ei];
          if (time > e.start + e.dur) pulses.push({ e: ei, t0: time, dur: 1.1 + Math.random() * 0.9, dir: Math.random() < 0.5 ? 1 : -1 });
        }
        pulses = pulses.filter((pl) => time - pl.t0 < pl.dur);
        for (const pl of pulses) {
          const e = edges[pl.e];
          const a = nodes[pl.dir === 1 ? e.a : e.b];
          const b = nodes[pl.dir === 1 ? e.b : e.a];
          const k = (time - pl.t0) / pl.dur;
          const bend = pl.dir === 1 ? e.bend : -e.bend;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const cxp = (a.x + b.x) / 2 - dy * bend;
          const cyp = (a.y + b.y) / 2 + dx * bend;
          const u = 1 - k;
          const x = u * u * a.x + 2 * u * k * cxp + k * k * b.x;
          const y = u * u * a.y + 2 * u * k * cyp + k * k * b.y;
          const fade = (a.fade + b.fade) / 2;
          const alpha = Math.sin(k * Math.PI) * fade;
          ctx!.fillStyle = `rgba(${mix(0.85)},${0.18 * alpha})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 5, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = `rgba(${mix(0.85)},${0.9 * alpha})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Pointer hyphae reaching toward nearby notes
      if (pointer.active) {
        const near = nodes
          .map((n) => ({ n, d: Math.hypot(n.x - pointer.x, n.y - pointer.y) }))
          .filter((o) => o.d < R * 1.05)
          .sort((p, q) => p.d - q.d)
          .slice(0, 4);
        for (const { n, d } of near) {
          const g = 1 - d / (R * 1.05);
          ctx!.strokeStyle = `rgba(${mix(1)},${0.45 * g})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(pointer.x, pointer.y);
          ctx!.quadraticCurveTo((pointer.x + n.x) / 2 + (n.y - pointer.y) * 0.15, (pointer.y + n.y) / 2 - (n.x - pointer.x) * 0.15, n.x, n.y);
          ctx!.stroke();
        }
      }

      // Nodes and labels
      ctx!.font = `500 13px ${fontFamily}`;
      ctx!.textBaseline = "middle";
      for (const n of nodes) {
        const life = clamp((t - n.born) / 0.6, 0, 1);
        if (life <= 0) continue;
        const fade = Math.max(n.fade, n.glow * 0.7);
        const r = n.r * life * (1 + n.glow * 0.8);
        if (n.glow > 0.02 || n.label) {
          ctx!.fillStyle = `rgba(${mix(n.glow)},${(0.08 + n.glow * 0.16) * fade})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.fillStyle = `rgba(${mix(n.glow)},${(0.55 + n.glow * 0.45) * fade})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fill();
        if (n.label) {
          const la = Math.max(n.labelAlways ? 0.62 : 0, n.glow * 1.4) * life * fade;
          if (la > 0.02) {
            ctx!.fillStyle = `rgba(230,239,231,${Math.min(1, la)})`;
            ctx!.fillText(n.label, n.x + r + 9, n.y);
          }
        }
      }
    }

    function frame(now: number) {
      draw((now - t0) / 1000);
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (reduce) draw(1000);
      else raf = requestAnimationFrame(frame);
    }

    build();
    start();

    const ro = new ResizeObserver(() => {
      const rect = host.getBoundingClientRect();
      if (Math.abs(rect.width - w) > 2 || Math.abs(rect.height - h) > 80) {
        build();
        if (reduce) draw(1000);
      }
    });
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) start();
    });
    io.observe(host);

    function onMove(e: PointerEvent) {
      const rect = host!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
    }
    function onUp(e: PointerEvent) {
      if (e.pointerType === "touch") pointer.active = false;
    }
    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerdown", onMove);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerup", onUp);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerup", onUp);
    };
  }, [areaPerNode, labels, clearing.x, clearing.y, clearing.rx, clearing.ry, seed]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
