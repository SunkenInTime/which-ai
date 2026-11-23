"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./iter3.module.css";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  side: "left" | "right" | "top" | "core";
  inner?: boolean;
};

const NODES: Node[] = [
  { id: "today", label: "Today", x: 50, y: 69, size: 18, side: "core" },
  { id: "zettel", label: "Zettelkasten", x: 8, y: 30, size: 10, side: "right", inner: true },
  { id: "spacing", label: "Spacing effect", x: 15, y: 51, size: 10, side: "right", inner: true },
  { id: "deep", label: "Deep work", x: 6, y: 72, size: 9, side: "right" },
  { id: "memory", label: "On memory", x: 23, y: 89, size: 10, side: "right" },
  { id: "pricing", label: "Pricing teardown", x: 92, y: 29, size: 10, side: "left", inner: true },
  { id: "berlin", label: "Berlin, March", x: 85, y: 50, size: 10, side: "left", inner: true },
  { id: "lina", label: "Interview: Lina", x: 94, y: 72, size: 9, side: "left" },
  { id: "story", label: "Story spine", x: 77, y: 89, size: 10, side: "left" },
  { id: "kahneman", label: "Reading: Kahneman", x: 12, y: 13, size: 9, side: "right" },
  { id: "okr", label: "OKR draft", x: 88, y: 12, size: 9, side: "left" },
  { id: "thesis", label: "Thesis: slow tools", x: 32, y: 90, size: 9, side: "top" },
  { id: "sourdough", label: "Sourdough, attempt 4", x: 69, y: 91, size: 8, side: "top" },
  { id: "ideas", label: "Startup ideas", x: 26, y: 64, size: 9, side: "right", inner: true },
  { id: "cold", label: "Cold plunge?", x: 75, y: 64, size: 8, side: "left", inner: true },
];

const EDGES: [string, string][] = [
  ["today", "zettel"],
  ["today", "spacing"],
  ["today", "deep"],
  ["today", "memory"],
  ["today", "pricing"],
  ["today", "berlin"],
  ["today", "lina"],
  ["today", "story"],
  ["today", "ideas"],
  ["today", "cold"],
  ["zettel", "kahneman"],
  ["kahneman", "spacing"],
  ["spacing", "memory"],
  ["deep", "memory"],
  ["memory", "thesis"],
  ["thesis", "sourdough"],
  ["pricing", "okr"],
  ["okr", "berlin"],
  ["berlin", "lina"],
  ["lina", "story"],
  ["story", "sourdough"],
  ["ideas", "cold"],
  ["kahneman", "okr"],
  ["zettel", "pricing"],
  ["memory", "story"],
];

const byId = new Map(NODES.map((node) => [node.id, node]));

function control(a: Node, b: Node) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  const bend = length * 0.16;
  return { x: (a.x + b.x) / 2 - (dy / length) * bend, y: (a.y + b.y) / 2 + (dx / length) * bend };
}

function toPath(points: { x: number; y: number }[], sx: number, sy: number) {
  const [a, c, b] = points;
  return `M${(a.x * sx).toFixed(1)} ${(a.y * sy).toFixed(1)} Q${(c.x * sx).toFixed(1)} ${(c.y * sy).toFixed(1)} ${(b.x * sx).toFixed(1)} ${(b.y * sy).toFixed(1)}`;
}

const sideClass: Record<Node["side"], string> = {
  right: "-translate-y-1/2 flex-row",
  left: "-translate-x-full -translate-y-1/2 flex-row-reverse",
  top: "-translate-x-1/2 -translate-y-full flex-col",
  core: "-translate-x-1/2 -translate-y-1/2",
};

export function Graph() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="axon-edges" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        {EDGES.map(([from, to]) => {
          const a = byId.get(from);
          const b = byId.get(to);
          if (!a || !b) return null;
          const c = control(a, b);
          const state =
            active === null ? "" : active === from || active === to ? styles.edgeHot : styles.edgeDim;
          return (
            <path
              key={`${from}-${to}`}
              d={`M${a.x} ${a.y} Q${c.x.toFixed(1)} ${c.y.toFixed(1)} ${b.x} ${b.y}`}
              stroke="url(#axon-edges)"
              vectorEffect="non-scaling-stroke"
              className={`${styles.edge} ${state}`}
            />
          );
        })}
      </svg>
      {size.width > 0 &&
        EDGES.filter(([from]) => from === "today").map(([from, to], i) => {
          const a = byId.get(from);
          const b = byId.get(to);
          if (!a || !b) return null;
          return (
            <span
              key={`pulse-${to}`}
              className={styles.pulse}
              style={
                {
                  offsetPath: `path("${toPath([a, control(a, b), b], size.width / 100, size.height / 100)}")`,
                  animationDelay: `${-i * 0.9}s`,
                } as CSSProperties
              }
            />
          );
        })}
      {NODES.map((node, i) => {
        const isActive = active === node.id;
        return (
          <div
            key={node.id}
            data-active={isActive}
            className={`node ${styles.node} absolute flex items-center gap-2.5 ${sideClass[node.side]}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onPointerEnter={() => setActive(node.id)}
            onPointerLeave={() => setActive(null)}
          >
            {node.side === "core" ? (
              <span className="relative grid place-items-center">
                <span
                  className={`${styles.coreRing} absolute rounded-full border border-accent/50`}
                  style={{ inset: -node.size }}
                />
                <span
                  className={`${styles.core} ${styles.dot} relative rounded-full`}
                  style={{ width: node.size, height: node.size }}
                />
              </span>
            ) : (
              <span
                className={`${styles.dot} shrink-0 rounded-full ${i % 3 === 0 ? "bg-accent" : "bg-accent-2"}`}
                style={{ width: node.size, height: node.size }}
              />
            )}
            {node.side !== "core" && (
              <span
                className={`whitespace-nowrap rounded-full border border-line bg-surface/80 px-2.5 py-1 text-xs text-ink backdrop-blur ${node.inner ? "hidden xl:block" : "hidden md:block"}`}
              >
                {node.label}
              </span>
            )}
          </div>
        );
      })}
      <span
        className="absolute -translate-x-1/2 font-mono text-xs uppercase tracking-[0.18em] text-soft"
        style={{ left: "50%", top: "calc(69% + 30px)" }}
      >
        Today
      </span>
    </div>
  );
}
