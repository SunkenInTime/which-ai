"use client";

import { useState } from "react";
import CaptureBar, { SEEDS, type Thought } from "../_components/CaptureBar";

const NODES = [
  { id: "c", label: "Second brain", x: 50, y: 46 },
  { id: "a", label: "Spaced repetition", x: 22, y: 22 },
  { id: "b", label: "Zettelkasten", x: 76, y: 18 },
  { id: "d", label: "Timeboxing", x: 82, y: 66 },
  { id: "e", label: "Daily notes", x: 20, y: 72 },
  { id: "f", label: "Atomic notes", x: 48, y: 84 },
];

const EDGES = [
  ["c", "a"],
  ["c", "b"],
  ["c", "d"],
  ["c", "e"],
  ["a", "f"],
  ["b", "f"],
] as const;

export default function PageTwo() {
  const [, setThoughts] = useState<Thought[]>(
    SEEDS.slice(1).map((s, i) => ({ ...s, id: i })),
  );
  const add = (t: Thought) => setThoughts((prev) => [t, ...prev].slice(0, 6));

  return (
    <div className="min-h-screen bg-[#0B0E1A] text-slate-200">
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-36 pt-14">
        <header className="flex items-center justify-between">
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            mindle
          </span>
          <span className="text-sm font-medium text-slate-400">
            Iteration 2 — Nocturne
          </span>
        </header>

        <section className="grid items-center gap-12 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
              Notes in.
              <br />
              Connections out.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-400">
              Every thought you park gets linked to the ones it belongs with.
              Over a month, Mindle quietly draws the map of how you think.
            </p>
            <div className="mt-8 max-w-xl">
              <CaptureBar onAdd={add} />
            </div>
          </div>

          <div
            aria-hidden
            className="relative aspect-square w-full max-w-md justify-self-center"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {EDGES.map(([from, to], i) => {
                const a = NODES.find((n) => n.id === from)!;
                const b = NODES.find((n) => n.id === to)!;
                return (
                  <line
                    key={i}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="rgba(129,140,248,0.35)"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 1.5"
                  />
                );
              })}
              {NODES.map((n, i) => (
                <circle
                  key={n.id}
                  cx={n.x}
                  cy={n.y}
                  r={n.id === "c" ? 2.6 : 1.7}
                  fill={n.id === "c" ? "#818CF8" : "#C7D2FE"}
                  opacity={0.9 - i * 0.06}
                />
              ))}
              {NODES.map((n) => (
                <text
                  key={n.id}
                  x={n.x}
                  y={n.y - 3.4}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="3.1"
                >
                  {n.label}
                </text>
              ))}
            </svg>
          </div>
        </section>

        <section className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
          {[
            {
              h: "Auto-linking",
              p: "New notes point at related old ones the moment you save.",
            },
            {
              h: "Weekly map",
              p: "A digest of the ideas that surfaced most this week.",
            },
            {
              h: "Backlinks",
              p: "Open any note and see everything that led to it.",
            },
          ].map((f) => (
            <div
              key={f.h}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <h2 className="font-display text-base font-bold text-white">
                {f.h}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">{f.p}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
