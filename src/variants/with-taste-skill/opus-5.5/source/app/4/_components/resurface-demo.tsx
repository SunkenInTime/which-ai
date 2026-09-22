"use client";

import { useState } from "react";
import { ClockCounterClockwise } from "@phosphor-icons/react";

const DRAFTS = [
  {
    label: "Revision plan",
    draft: "Plan for exam week: fewer rereads, more practice questions...",
    related: [
      { title: "Testing beats rereading", when: "Clipped last autumn" },
      { title: "Week 7: memory is rebuilt", when: "Lecture notes, 5 months ago" },
    ],
  },
  {
    label: "Chapter 3",
    draft: "The harbour at six in the morning, before the boats go out...",
    related: [
      { title: "Voice memo, 11:42pm", when: "Recorded 3 weeks ago" },
      { title: "Fishing boats at dawn", when: "Screenshot, 3 weeks ago" },
    ],
  },
  {
    label: "Underlining essay",
    draft: "Every book on my shelf has a pencil line on page 40 and nothing after...",
    related: [
      { title: "Why do we underline?", when: "Idea list, last year" },
      { title: "Highlights: How to Read a Book", when: "Synced from your reader" },
    ],
  },
];

/** Working mini "Related" panel: pick a draft, see the older notes it pulls up. */
export function ResurfaceDemo() {
  const [active, setActive] = useState(0);
  const d = DRAFTS[active];

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Sample drafts" className="flex flex-wrap gap-2">
        {DRAFTS.map((x, i) => (
          <button
            key={x.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors active:scale-[0.98] ${
              i === active
                ? "bg-(--v4-accent) text-(--v4-on-accent)"
                : "bg-(--v4-raised) ring-1 ring-(--v4-line) hover:ring-(--v4-accent-ink)"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="rounded-[28px] bg-(--v4-raised) p-5 ring-1 ring-(--v4-line) md:p-6">
        <p className="text-sm font-semibold text-(--v4-muted)">You are writing</p>
        <p className="mt-1 text-lg leading-snug md:text-xl">{d.draft}</p>
        <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-(--v4-accent-ink)">
          <ClockCounterClockwise size={16} weight="bold" aria-hidden />
          Related
        </p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {d.related.map((r) => (
            <li key={r.title} className="rounded-[28px] bg-(--v4-surface) px-4 py-3">
              <p className="font-semibold leading-snug">{r.title}</p>
              <p className="mt-0.5 text-sm text-(--v4-muted)">{r.when}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
