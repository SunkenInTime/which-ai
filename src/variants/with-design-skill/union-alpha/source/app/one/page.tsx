"use client";

import { useState } from "react";
import CaptureBar, { SEEDS, type Thought } from "../_components/CaptureBar";

export default function PageOne() {
  const [thoughts, setThoughts] = useState<Thought[]>(
    SEEDS.map((s, i) => ({ ...s, id: i })),
  );
  const add = (t: Thought) => setThoughts((prev) => [t, ...prev].slice(0, 6));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3F1FB] text-slate-900">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-indigo-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-8%] h-[30rem] w-[30rem] rounded-full bg-violet-200/50 blur-3xl"
      />

      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-40 pt-16">
        <header className="flex items-center justify-between">
          <span className="font-display text-xl font-extrabold tracking-tight">
            mindle
          </span>
          <span className="text-sm font-medium text-slate-500">
            Iteration 1 — Ledger
          </span>
        </header>

        <section className="mt-24 max-w-3xl md:mt-32">
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Your mind holds
            <br />
            six tabs at once.
            <br />
            <span className="text-indigo-600">Mindle holds the rest.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Park the thought now, file it never. Mindle is the quiet room next
            to your brain where half-formed ideas wait without expiring.
          </p>
        </section>

        <section className="mt-14 md:mt-20">
          <CaptureBar onAdd={add} />
          <ul className="mt-6 flex flex-wrap gap-3">
            {thoughts.map((t, i) => (
              <li
                key={t.id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-rise rounded-2xl bg-white/80 px-4 py-2.5 text-[15px] text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
              >
                {t.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-auto grid gap-8 pt-20 sm:grid-cols-3">
          {[
            {
              h: "Park it",
              p: "Capture in one line. No folders to pick, no tags to invent, no guilt.",
            },
            {
              h: "Let it drift",
              p: "Old notes resurface on their own when they're relevant again.",
            },
            {
              h: "Find it once",
              p: "Search that remembers what you meant, not just what you typed.",
            },
          ].map((f) => (
            <div key={f.h}>
              <h2 className="font-display text-base font-bold">{f.h}</h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{f.p}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
