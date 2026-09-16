"use client";

import { useState } from "react";
import CaptureBar, { SEEDS, type Thought } from "../_components/CaptureBar";

const STARS = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.5,
}));

export default function PageFive() {
  const [thoughts, setThoughts] = useState<Thought[]>(
    SEEDS.slice(2).map((s, i) => ({ ...s, id: i })),
  );
  const add = (t: Thought) => setThoughts((prev) => [t, ...prev].slice(0, 4));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060C] text-slate-300">
      <div aria-hidden className="absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-slate-300"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-36 pt-14">
        <header className="flex items-center justify-between">
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            mindle
          </span>
          <span className="text-sm font-medium text-slate-400">
            Iteration 5 — Pocket
          </span>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-20 text-center">
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
            Every thought is a star. Mindle draws the constellations.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-slate-400">
            Alone, a note is a point of light. Connected, it becomes a shape
            you can navigate by. Mindle keeps the sky and draws the lines.
          </p>
          <div className="mt-10 flex w-full justify-center">
            <CaptureBar onAdd={add} />
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {thoughts.map((t) => (
              <li
                key={t.id}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm"
              >
                {t.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 text-center sm:grid-cols-3">
          {[
            { h: "Capture", p: "One line, from anywhere." },
            { h: "Connect", p: "Links form as you write." },
            { h: "Navigate", p: "Find ideas by shape, not folder." },
          ].map((f) => (
            <div key={f.h}>
              <h2 className="font-display text-base font-bold text-white">
                {f.h}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{f.p}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
