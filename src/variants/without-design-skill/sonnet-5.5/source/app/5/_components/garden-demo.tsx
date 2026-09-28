"use client";

import { useState } from "react";
import { Plant } from "./plant";

const stages = [
  { name: "Seedling", hint: "Just planted", tone: "bg-[color:#f4e3a1]" },
  { name: "Budding", hint: "Growing links", tone: "bg-[color:#f4c3b9]" },
  { name: "Evergreen", hint: "Ready to share", tone: "bg-[color:#dfe8d2]" },
] as const;

const initial = [
  { id: "slow", title: "On slow ideas", body: "The best ideas arrive years apart.", links: 0, stage: 0 },
  { id: "notes", title: "How I take notes", body: "Write freely. Link later. Trust the pile.", links: 4, stage: 1 },
  { id: "compound", title: "Compounding curiosity", body: "Every link makes the next note easier.", links: 11, stage: 2 },
];

export function GardenDemo() {
  const [notes, setNotes] = useState(initial);
  const evergreen = notes.filter((n) => n.stage === 2).length;

  function tend(id: string) {
    setNotes((all) =>
      all.map((n) => (n.id === id ? { ...n, stage: (n.stage + 1) % 3, links: n.stage === 2 ? 0 : n.links + 3 } : n)),
    );
  }

  return (
    <div className="relative">
      {/* organic backdrop */}
      <svg aria-hidden viewBox="0 0 600 560" className="absolute -inset-6 -z-10 size-[calc(100%+3rem)]" preserveAspectRatio="none">
        <path d="M70 90C120 10 300 0 430 40s170 120 150 250-70 230-220 250S60 500 25 370 10 170 70 90Z" fill="#dfe8d2" />
      </svg>

      <div className="rounded-[2.5rem] border border-[color:#1f3a2b]/10 bg-white/70 p-3.5 shadow-[0_30px_60px_-30px_rgba(31,58,43,0.35)] backdrop-blur sm:p-7">
        <div className="mb-5 flex items-center justify-between px-1">
          <p className="font-[family-name:var(--f-fraunces),Georgia,serif] text-xl font-medium">My garden</p>
          <p className="rounded-full bg-[color:#dfe8d2] px-3 py-1 text-xs font-medium" aria-live="polite">
            {evergreen} of {notes.length} evergreen
          </p>
        </div>

        <ul className="space-y-3">
          {notes.map((n) => {
            const s = stages[n.stage];
            return (
              <li key={n.id} className="flex items-center gap-3 rounded-3xl border border-[color:#1f3a2b]/10 bg-[color:#eef2e4] p-2.5 pr-3 sm:gap-4 sm:p-3 sm:pr-4">
                <span className={`grid size-14 shrink-0 place-items-center rounded-2xl transition-colors duration-500 sm:size-[4.5rem] ${s.tone}`}>
                  <Plant key={n.stage} stage={n.stage as 0 | 1 | 2} className="size-11 sm:size-14" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-[family-name:var(--f-fraunces),Georgia,serif] text-lg leading-tight font-medium sm:truncate">{n.title}</p>
                  <p className="hidden truncate text-sm text-[color:#4c6656] sm:block">{n.body}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <span className="rounded-full bg-white px-2 py-0.5 font-medium">{s.name}</span>
                    <span className="text-[color:#4c6656]">
                      {n.links} links<span className="hidden sm:inline"> · {s.hint}</span>
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => tend(n.id)}
                  aria-label={`Tend “${n.title}”, currently ${s.name}`}
                  className="shrink-0 rounded-full bg-[color:#1f3a2b] px-3.5 py-2 text-sm font-medium text-[color:#eef2e4] transition hover:bg-[color:#c8623b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:#1f3a2b] active:scale-95 sm:px-4"
                >
                  {n.stage === 2 ? "Replant" : "Tend"}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 px-1 text-center text-xs text-[color:#4c6656]">Press Tend to help a note grow. This one&rsquo;s a live demo.</p>
      </div>
    </div>
  );
}
