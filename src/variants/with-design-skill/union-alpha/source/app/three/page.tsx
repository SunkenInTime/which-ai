"use client";

import { useState } from "react";
import CaptureBar, { SEEDS, type Thought } from "../_components/CaptureBar";

const PLOTS = [
  { label: "Seedlings", note: "Raw thoughts, less than a week old" },
  { label: "Growing", note: "Revisited at least once" },
  { label: "Evergreen", note: "Written in your own words, linked up" },
];

export default function PageThree() {
  const [thoughts, setThoughts] = useState<Thought[]>(
    SEEDS.map((s, i) => ({ ...s, id: i })),
  );
  const add = (t: Thought) => setThoughts((prev) => [t, ...prev].slice(0, 6));

  return (
    <div className="min-h-screen bg-[#F4F7F1] text-emerald-950">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-36 pt-14">
        <header className="flex items-center justify-between">
          <span className="font-display text-xl font-extrabold tracking-tight">
            mindle
          </span>
          <span className="text-sm font-medium text-emerald-800/70">
            Iteration 3 — Garden
          </span>
        </header>

        <section className="pt-16 text-center md:pt-24">
          <h1 className="mx-auto max-w-3xl font-serif text-5xl italic leading-[1.1] md:text-7xl">
            Tend thoughts like plants, not files.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-emerald-900/80">
            Mindle sorts your notes by how alive they are. New ideas sprout in
            the seedling bed and get moved toward evergreen as you tend them.
          </p>
          <div className="mt-10 flex justify-center">
            <CaptureBar onAdd={add} />
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {PLOTS.map((p, i) => (
            <div
              key={p.label}
              className="rounded-3xl border border-emerald-900/10 bg-white/70 p-6 shadow-[0_1px_0_rgba(16,64,40,0.06)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">{p.label}</h2>
                <span
                  aria-hidden
                  className="text-lg"
                  style={{ opacity: 0.35 + i * 0.3 }}
                >
                  {["·", "❦", "✿"][i]}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-emerald-900/70">
                {p.note}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-14 md:mt-20">
          <ul className="grid gap-3 sm:grid-cols-2">
            {thoughts.map((t) => (
              <li
                key={t.id}
                className="flex items-start gap-2 rounded-2xl bg-emerald-900/[0.06] px-4 py-3 text-[15px] leading-6 text-emerald-950/90"
              >
                <span aria-hidden className="text-emerald-700/60">
                  ❧
                </span>
                {t.text}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
