"use client";

import { useEffect, useRef } from "react";

const TITLES = [
  "Sleep and memory",
  "Spaced repetition",
  "Why naps help learning",
  "Book: The Extended Mind",
  "Talk idea: tools for thought",
  "Q3 planning",
  "Pricing experiment",
  "Call with Dana",
  "Onboarding friction",
  "Ragù recipe",
  "Sourdough timings",
  "Lisbon trip",
  "Gift ideas",
  "Marathon plan",
  "Zone 2 training",
  "Reading list",
  "Quote: Annie Dillard",
  "Essay draft",
  "Writing routine",
  "Garden layout",
  "Tomato varieties",
  "Compound interest",
  "Tax checklist",
  "Piano practice",
  "Chord voicings",
  "Dream journal",
  "Career questions",
  "Weekly review",
];

type GraphNode = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  title: string;
  phase: number;
  links: number[];
  labelLeft: boolean;
  glow: number;
};

function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph(w: number, h: number): GraphNode[] {
  const rand = seeded(11);
  const small = w < 720;
  const count = small ? 9 : w < 1100 ? 20 : TITLES.length;
  const cx = w / 2;
  const cy = h * 0.52;
  const rx = small ? w * 0.64 : Math.min(w * 0.37, 600);
  const ry = small ? h * 0.3 : h * 0.33;
  const minD = small ? 54 : 60;
  const inClearing = (x: number, y: number, scale = 1) =>
    ((x - cx) / (rx * scale)) ** 2 + ((y - cy) / (ry * scale)) ** 2 < 1;

  const nodes: GraphNode[] = [];
  let attempts = 0;
  while (nodes.length < count && attempts < 6000) {
    attempts += 1;
    const x = 28 + rand() * (w - 56);
    const y = 92 + rand() * (h - 140);
    const labelLeft = x > w - (small ? 170 : 220);
    const labelEnd = x + (labelLeft ? -1 : 1) * (small ? 120 : 190);
    if (inClearing(x, y) || inClearing(labelEnd, y)) continue;
    const crowded = nodes.some(
      (n) => ((n.hx - x) / 2.6) ** 2 + (n.hy - y) ** 2 < minD ** 2,
    );
    if (crowded) continue;
    nodes.push({
      hx: x,
      hy: y,
      x,
      y,
      title: TITLES[nodes.length],
      phase: rand() * Math.PI * 2,
      links: [],
      labelLeft,
      glow: 0,
    });
  }

  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((other, j) => ({ j, d: Math.hypot(other.hx - node.hx, other.hy - node.hy) }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    nearest.forEach(({ j }, rank) => {
      if (rank === 2 && i % 3 !== 0) return;
      const other = nodes[j];
      for (let s = 1; s < 8; s += 1) {
        const px = node.hx + ((other.hx - node.hx) * s) / 8;
        const py = node.hy + ((other.hy - node.hy) * s) / 8;
        if (inClearing(px, py, 0.86)) return;
      }
      if (!node.links.includes(j)) node.links.push(j);
      if (!other.links.includes(i)) other.links.push(i);
    });
  });

  return nodes;
}

export default function GraphCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fontFamily = getComputedStyle(canvas).fontFamily;
    let nodes: GraphNode[] = [];
    let width = 0;
    let height = 0;
    let active = 0;
    let lastPointer = 0;
    let lastCycle = 0;
    let frame = 0;
    let visible = true;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = buildGraph(width, height);
      active = Math.min(2, nodes.length - 1);
      draw(performance.now(), true);
    }

    function draw(time: number, snap = false) {
      const still = reduceMotion.matches;
      ctx!.clearRect(0, 0, width, height);

      nodes.forEach((node, i) => {
        node.x = still ? node.hx : node.hx + Math.sin(time * 0.00028 + node.phase) * 7;
        node.y = still ? node.hy : node.hy + Math.cos(time * 0.00022 + node.phase * 1.7) * 6;
        const lit = i === active || nodes[active]?.links.includes(i);
        const target = i === active ? 1 : lit ? 0.6 : 0;
        node.glow = snap || still ? target : node.glow + (target - node.glow) * 0.09;
      });

      ctx!.lineCap = "round";
      nodes.forEach((node, i) => {
        node.links.forEach((j) => {
          if (j < i) return;
          const other = nodes[j];
          const lit =
            i === active || j === active ? Math.min(node.glow, other.glow) / 0.6 : 0;
          ctx!.beginPath();
          ctx!.moveTo(node.x, node.y);
          ctx!.lineTo(other.x, other.y);
          ctx!.strokeStyle = `rgba(134, 186, 203, ${0.2 * (1 - lit)})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
          if (lit > 0.02) {
            ctx!.strokeStyle = `rgba(217, 242, 75, ${0.85 * lit})`;
            ctx!.lineWidth = 1.5;
            ctx!.stroke();
          }
        });
      });

      ctx!.font = `500 13px ${fontFamily}`;
      ctx!.textBaseline = "middle";
      nodes.forEach((node) => {
        const g = node.glow;
        const radius = 3 + g * 2.5;
        if (g > 0.02) {
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, radius + 7, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(217, 242, 75, ${0.14 * g})`;
          ctx!.fill();
        }
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle =
          g > 0.02
            ? `rgb(${Math.round(150 + 67 * g)}, ${Math.round(200 + 42 * g)}, ${Math.round(212 - 137 * g)})`
            : "rgb(150, 200, 212)";
        ctx!.fill();
        ctx!.textAlign = node.labelLeft ? "right" : "left";
        ctx!.fillStyle = `rgba(${Math.round(176 + 70 * g)}, ${Math.round(205 + 45 * g)}, ${Math.round(214 + 30 * g)}, ${0.72 + 0.28 * g})`;
        ctx!.fillText(node.title, node.x + (node.labelLeft ? -12 : 12), node.y + 1);
      });
    }

    function loop(time: number) {
      if (!visible) return;
      if (!reduceMotion.matches && time - lastPointer > 4000 && time - lastCycle > 3200) {
        lastCycle = time;
        active = (active + 5) % nodes.length;
      }
      draw(time);
      if (!reduceMotion.matches) frame = requestAnimationFrame(loop);
    }

    function onPointer(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      if (py < 0 || py > rect.height) return;
      let best = -1;
      let bestD = 150;
      nodes.forEach((node, i) => {
        const d = Math.hypot(node.x - px, node.y - py);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best > -1) {
        active = best;
        lastPointer = performance.now();
        if (reduceMotion.matches) draw(lastPointer, true);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) frame = requestAnimationFrame(loop);
    });
    visibility.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
