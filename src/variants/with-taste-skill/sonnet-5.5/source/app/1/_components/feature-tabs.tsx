"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChatCircleText, Scissors, Repeat, TreeStructure } from "@phosphor-icons/react";

const FEATURES = [
  {
    id: "ask",
    icon: ChatCircleText,
    name: "Ask your notes",
    body: "Ask a question in plain words. Cairn answers from what you wrote and lists the notes it used.",
    img: "https://picsum.photos/seed/cairn-ask-notebook-coffee/900/700",
    alt: "A notebook and a cup of coffee on a wooden desk",
  },
  {
    id: "clip",
    icon: Scissors,
    name: "Web clipper",
    body: "Save an article or a highlight with one click. It arrives tagged with where it came from.",
    img: "https://picsum.photos/seed/cairn-clip-laptop-window/900/700",
    alt: "A laptop on a table beside a window",
  },
  {
    id: "links",
    icon: TreeStructure,
    name: "Automatic links",
    body: "Every note shows the notes it is close to. Follow a thread without setting up folders.",
    img: "https://picsum.photos/seed/cairn-links-bookshelf-path/900/700",
    alt: "A shelf of books lit from the side",
  },
  {
    id: "review",
    icon: Repeat,
    name: "Weekly review",
    body: "On Friday, Cairn gathers what you wrote and asks which ideas deserve another look.",
    img: "https://picsum.photos/seed/cairn-review-garden-morning/900/700",
    alt: "A garden path in early morning light",
  },
];

export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = FEATURES[active];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div role="tablist" aria-label="Cairn features" className="grid content-start gap-2 lg:col-span-5">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const on = i === active;
          return (
            <button
              key={f.id}
              role="tab"
              id={`tab-${f.id}`}
              aria-selected={on}
              aria-controls="feature-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") setActive((i + 1) % FEATURES.length);
                if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                  setActive((i + FEATURES.length - 1) % FEATURES.length);
              }}
              className={`rounded-[14px] border px-5 py-4 text-left transition-colors active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--c-accent) ${
                on
                  ? "border-(--c-line) bg-(--c-surface) shadow-(--c-shadow)"
                  : "border-transparent hover:bg-(--c-surface-2)"
              }`}
            >
              <span className="flex items-center gap-3 text-[18px] font-medium tracking-[-0.01em]">
                <Icon size={20} weight="regular" className={on ? "text-(--c-accent-ink)" : "text-(--c-fg-3)"} />
                {f.name}
              </span>
              {on && <span className="mt-2 block max-w-[46ch] text-[15px] leading-relaxed text-(--c-fg-2)">{f.body}</span>}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="feature-panel"
        aria-labelledby={`tab-${current.id}`}
        className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-(--c-surface-2) lg:col-span-7"
      >
        {FEATURES.map((f, i) => (
          <motion.img
            key={f.id}
            src={f.img}
            alt={i === active ? f.alt : ""}
            aria-hidden={i !== active}
            width={900}
            height={700}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 size-full object-cover"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active || reduce ? 1 : 1.04 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}
