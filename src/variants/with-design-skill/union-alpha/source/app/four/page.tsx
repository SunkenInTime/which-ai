"use client";

import { useState } from "react";
import CaptureBar, { SEEDS, type Thought } from "../_components/CaptureBar";

const CLIPPINGS = [
  {
    kind: "Quote",
    text: "The palest ink is better than the best memory.",
    from: "Chinese proverb",
  },
  {
    kind: "Link",
    text: "How to take smart notes while reading",
    from: "fs.blog",
  },
  {
    kind: "Sketch",
    text: "Margin-notes layout — v2",
    from: "Drawn on iPad",
  },
];

export default function PageFour() {
  const [thoughts, setThoughts] = useState<Thought[]>(
    SEEDS.slice(0, 3).map((s, i) => ({ ...s, id: i })),
  );
  const add = (t: Thought) => setThoughts((prev) => [t, ...prev].slice(0, 4));

  return (
    <div className="min-h-screen bg-[#FBF4EC] text-stone-900">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-36 pt-14">
        <header className="flex items-center justify-between">
          <span className="font-display text-xl font-extrabold tracking-tight">
            mindle
          </span>
          <span className="text-sm font-medium text-stone-500">
            Iteration 4 — Atlas
          </span>
        </header>

        <section className="grid items-center gap-14 pt-14 md:grid-cols-2 md:pt-20">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              A scrapbook of everything worth keeping.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-stone-600">
              Quotes, links, sketches, screenshots — Mindle clips them into one
              loose-leaf atlas you can shuffle, pin, and revisit.
            </p>
            <div className="mt-9 max-w-xl">
              <CaptureBar onAdd={add} />
            </div>
          </div>

          <div className="relative h-96">
            {CLIPPINGS.map((c, i) => (
              <figure
                key={c.text}
                style={{
                  rotate: `${[-3, 2, -1.5][i]}deg`,
                  top: `${[0, 96, 200][i]}px`,
                  zIndex: i,
                }}
                className="absolute inset-x-0 rounded-lg bg-white p-5 shadow-[0_10px_30px_-12px_rgba(60,40,20,0.35)] ring-1 ring-stone-900/5"
              >
                <figcaption className="text-xs font-semibold tracking-wide text-amber-700">
                  {c.kind}
                </figcaption>
                <blockquote
                  className={`mt-1.5 text-stone-800 ${
                    i === 0 ? "font-serif text-xl italic" : "text-[15px]"
                  }`}
                >
                  {c.text}
                </blockquote>
                <p className="mt-2 text-xs text-stone-400">{c.from}</p>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-sm font-bold tracking-wide text-stone-500">
            Freshly clipped
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {thoughts.map((t) => (
              <li
                key={t.id}
                className="rounded-lg bg-white px-4 py-3 text-[15px] leading-6 text-stone-700 shadow-sm ring-1 ring-stone-900/5"
              >
                {t.text}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
