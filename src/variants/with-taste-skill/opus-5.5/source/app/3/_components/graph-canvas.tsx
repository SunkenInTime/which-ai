"use client";

import { useEffect, useRef } from "react";
import { LINKS, NOTES } from "./graph-data";
import { useMedia } from "./use-media";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  deg: number;
  title: string;
};

type Palette = {
  node: string;
  edge: string;
  hi: string;
  hiStroke: string;
  labelBg: string;
  labelFg: string;
  fgMuted: string;
  sans: string;
};

const WIDE = "(min-width: 1024px)";

// Deterministic PRNG so server and first client paint agree and the layout is stable.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readPalette(el: HTMLElement): Palette {
  const s = getComputedStyle(el);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    node: v("--graph-node"),
    edge: v("--graph-edge"),
    hi: v("--graph-hi"),
    hiStroke: v("--graph-hi-stroke"),
    labelBg: v("--graph-label-bg"),
    labelFg: v("--graph-label-fg"),
    fgMuted: v("--fg-muted"),
    sans: v("--font-v3-sans") || "ui-sans-serif, system-ui, sans-serif",
  };
}

export function GraphCanvas({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // All simulation state lives here, outside React.
    const rand = mulberry32(7);
    const neighbours: Set<number>[] = NOTES.map(() => new Set<number>());
    for (const [a, b] of LINKS) {
      neighbours[a].add(b);
      neighbours[b].add(a);
    }
    const nodes: Node[] = NOTES.map((title, i) => {
      const deg = neighbours[i].size;
      return { x: 0, y: 0, vx: 0, vy: 0, r: 2.6 + Math.sqrt(deg) * 1.7, deg, title };
    });
    const hubs = nodes
      .map((n, i) => [n.deg, i] as const)
      .sort((a, b) => b[0] - a[0])
      .slice(0, 5)
      .map(([, i]) => i);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let wide = window.matchMedia(WIDE).matches;
    let alpha = 1;
    let hover = -1;
    let auto = -1;
    let drag = -1;
    let pointerInside = false;
    let raf = 0;
    let visible = true;
    let lastAuto = 0;
    let t0 = performance.now();
    let palette = readPalette(wrap);

    // On wide screens the hero copy owns the left of the canvas; keep nodes clear of it.
    const leftEdge = () => {
      if (!wide) return 16;
      const inner = Math.min(w, 1280);
      return Math.max(w * 0.47, (w - inner) / 2 + inner * 0.45 + 24);
    };
    const centre = () =>
      wide ? { x: (leftEdge() + w) / 2, y: h * 0.52 } : { x: w * 0.5, y: h * 0.5 };
    const linkDist = () =>
      Math.max(30, Math.min(88, Math.min(wide ? w - leftEdge() : w, h) / 8));

    // Hard bounds: every node stays inside the visible graph region with padding.
    const PAD = 24;
    function clamp(n: Node) {
      const minX = leftEdge() + n.r + (wide ? 0 : PAD - 16);
      const maxX = w - PAD - n.r;
      const minY = PAD + n.r;
      const maxY = h - PAD - n.r;
      if (n.x < minX) { n.x = minX; n.vx = 0; }
      else if (n.x > maxX) { n.x = maxX; n.vx = 0; }
      if (n.y < minY) { n.y = minY; n.vy = 0; }
      else if (n.y > maxY) { n.y = maxY; n.vy = 0; }
    }

    function seed() {
      const c = centre();
      const spread = Math.min(wide ? (w - leftEdge()) * 0.45 : w * 0.4, h * 0.4);
      nodes.forEach((n) => {
        const a = rand() * Math.PI * 2;
        const d = Math.sqrt(rand()) * spread;
        n.x = c.x + Math.cos(a) * d;
        n.y = c.y + Math.sin(a) * d;
        n.vx = 0;
        n.vy = 0;
        clamp(n);
      });
    }

    function tick(now: number) {
      const c = centre();
      const L = linkDist();
      const charge = L * L * 1.1;
      const pad = 16;
      const leftBound = leftEdge();

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) {
            dx = rand() - 0.5;
            dy = rand() - 0.5;
            d2 = 1;
          }
          const f = (charge * alpha) / d2 / Math.sqrt(d2);
          a.vx -= dx * f;
          a.vy -= dy * f;
          b.vx += dx * f;
          b.vy += dy * f;
        }
      }
      for (const [ai, bi] of LINKS) {
        const a = nodes[ai];
        const b = nodes[bi];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const k = ((d - L) / d) * 0.09 * alpha;
        a.vx += dx * k;
        a.vy += dy * k;
        b.vx -= dx * k;
        b.vy -= dy * k;
      }
      nodes.forEach((n, i) => {
        n.vx += (c.x - n.x) * (0.006 * alpha + 0.0015);
        n.vy += (c.y - n.y) * (0.009 * alpha + 0.002);
        if (now > 0) {
          // A slow drift so the graph feels alive once it has settled.
          n.vx += Math.sin(now * 0.00035 + i * 1.7) * 0.012;
          n.vy += Math.cos(now * 0.0003 + i * 2.3) * 0.012;
        }
        if (n.x < leftBound) n.vx += (leftBound - n.x) * 0.08;
        if (n.x > w - pad) n.vx -= (n.x - (w - pad)) * 0.08;
        if (n.y < pad + 8) n.vy += (pad + 8 - n.y) * 0.08;
        if (n.y > h - pad) n.vy -= (n.y - (h - pad)) * 0.08;
        if (i === drag) {
          n.vx = 0;
          n.vy = 0;
          return;
        }
        n.vx *= 0.6;
        n.vy *= 0.6;
        n.x += n.vx;
        n.y += n.vy;
        clamp(n);
      });
      alpha = Math.max(0.02, alpha * 0.985);
    }

    function settle() {
      alpha = 1;
      for (let i = 0; i < 420; i++) tick(0);
    }

    // Labels placed this frame, so neighbour titles do not print on top of each other.
    let placed: [number, number, number, number][] = [];
    const overlaps = (x: number, y: number, bw: number, bh: number) =>
      placed.some(([px, py, pw, ph]) => x < px + pw && x + bw > px && y < py + ph && y + bh > py);

    function label(text: string, x: number, y: number, strong: boolean) {
      if (!ctx) return;
      ctx.font = `${strong ? 500 : 400} ${strong ? 13 : 12}px ${palette.sans}`;
      const tw = ctx.measureText(text).width;
      const bw = tw + (strong ? 16 : 0);
      const right = x + 10;
      const left = x - 10 - bw;
      let lx = right + bw > w ? left : right;
      if (!strong) {
        if (overlaps(lx, y - 9, bw, 18)) lx = lx === right ? left : right;
        if (overlaps(lx, y - 9, bw, 18) || lx < 0 || lx + bw > w) return;
      }
      placed.push([lx, y - 13, bw, 26]);
      if (strong) {
        const bh = 26;
        const ly = y - bh / 2;
        ctx.fillStyle = palette.labelBg;
        ctx.beginPath();
        ctx.roundRect(lx, ly, tw + 16, bh, 8);
        ctx.fill();
        ctx.fillStyle = palette.labelFg;
        ctx.textBaseline = "middle";
        ctx.fillText(text, lx + 8, y + 0.5);
      } else {
        ctx.fillStyle = palette.fgMuted;
        ctx.textBaseline = "middle";
        ctx.fillText(text, lx, y);
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const focus = hover !== -1 ? hover : drag !== -1 ? drag : auto;
      const near = focus !== -1 ? neighbours[focus] : null;

      ctx.lineWidth = 1;
      for (const [a, b] of LINKS) {
        const lit = focus !== -1 && (a === focus || b === focus);
        ctx.strokeStyle = lit ? palette.hi : palette.edge;
        ctx.lineWidth = lit ? 1.5 : 1;
        ctx.globalAlpha = focus !== -1 && !lit ? 0.5 : 1;
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      nodes.forEach((n, i) => {
        const isFocus = i === focus;
        const isNear = near?.has(i) ?? false;
        ctx.globalAlpha = focus !== -1 && !isFocus && !isNear ? 0.35 : 1;
        ctx.fillStyle = isFocus || isNear ? palette.hi : palette.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, isFocus ? n.r + 2 : n.r, 0, Math.PI * 2);
        ctx.fill();
        if (isFocus) {
          ctx.strokeStyle = palette.hiStroke;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      placed = [];
      if (focus !== -1) {
        // The focused title claims its space first; neighbours fit around it.
        const f = nodes[focus];
        ctx.font = `500 13px ${palette.sans}`;
        const fw = ctx.measureText(f.title).width + 16;
        const fx = f.x + 10 + fw > w ? f.x - 10 - fw : f.x + 10;
        placed.push([fx, f.y - 13, fw, 26]);
        near?.forEach((i) => label(nodes[i].title, nodes[i].x, nodes[i].y, false));
        placed = [];
        label(f.title, f.x, f.y, true);
      } else if (wide) {
        ctx.globalAlpha = 0.75;
        hubs.forEach((i) => label(nodes[i].title, nodes[i].x, nodes[i].y, false));
        ctx.globalAlpha = 1;
      }
    }

    function loop(now: number) {
      raf = 0;
      if (!pointerInside && drag === -1 && now - lastAuto > 3200) {
        lastAuto = now;
        auto = hubs[(hubs.indexOf(auto) + 1) % hubs.length];
      }
      tick(now - t0);
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    }

    function start() {
      if (reduce || raf || !visible) return;
      raf = requestAnimationFrame(loop);
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      const prevW = w;
      const prevH = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      wide = window.matchMedia(WIDE).matches;
      w = nw;
      h = nh;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prevW === 0) {
        seed();
        if (reduce) settle();
        else alpha = 1;
      } else {
        nodes.forEach((n) => {
          n.x *= w / prevW;
          n.y *= h / prevH;
          clamp(n);
        });
        if (reduce) settle();
        else alpha = Math.max(alpha, 0.3);
      }
      draw();
    }

    function hit(x: number, y: number) {
      let best = -1;
      let bestD = Infinity;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < Math.max(n.r + 8, 14) && d < bestD) {
          best = i;
          bestD = d;
        }
      });
      return best;
    }

    function local(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onMove(e: PointerEvent) {
      pointerInside = true;
      auto = -1;
      const p = local(e);
      if (drag !== -1) {
        nodes[drag].x = p.x;
        nodes[drag].y = p.y;
        clamp(nodes[drag]);
        alpha = Math.max(alpha, 0.25);
      } else {
        hover = hit(p.x, p.y);
        canvas!.style.cursor = hover !== -1 ? "grab" : "default";
      }
      if (reduce) draw();
    }

    function onDown(e: PointerEvent) {
      const p = local(e);
      const i = hit(p.x, p.y);
      if (i === -1) return;
      drag = i;
      hover = i;
      canvas!.setPointerCapture(e.pointerId);
      canvas!.style.cursor = "grabbing";
      if (reduce) draw();
    }

    function onUp(e: PointerEvent) {
      if (drag === -1) return;
      if (canvas!.hasPointerCapture(e.pointerId)) canvas!.releasePointerCapture(e.pointerId);
      drag = -1;
      canvas!.style.cursor = hover !== -1 ? "grab" : "default";
      if (reduce) draw();
    }

    function onLeave() {
      pointerInside = false;
      if (drag === -1) hover = -1;
      if (reduce) draw();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        t0 = performance.now() - 1;
        start();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(wrap);

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      palette = readPalette(wrap);
      draw();
    };
    scheme.addEventListener("change", onScheme);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    // Fonts can land after first paint; redraw once they are ready.
    document.fonts?.ready.then(() => {
      palette = readPalette(wrap);
      draw();
    });

    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scheme.removeEventListener("change", onScheme);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A live graph of 48 sample notes. Hover a note to see its title and the notes linked to it, or drag it around."
        className="block touch-pan-y"
      />
    </div>
  );
}
