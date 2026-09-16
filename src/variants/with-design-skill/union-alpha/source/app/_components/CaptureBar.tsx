"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Thought = {
  id: number;
  text: string;
};

const SEEDS: Omit<Thought, "id">[] = [
  { text: "Spaced repetition works because forgetting is a feature" },
  { text: "Zettelkasten: one idea per note, then link" },
  { text: "Re-read highlights only after letting them sit a week" },
  { text: "Write the summary before the source, then check it" },
];

export default function CaptureBar({ onAdd }: { onAdd: (t: Thought) => void }) {
  const [value, setValue] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const save = useCallback(() => {
    const text = value.trim();
    if (!text) return;
    idRef.current += 1;
    onAdd({ id: Date.now() + idRef.current, text });
    setValue("");
    setJustSaved(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustSaved(false), 1600);
  }, [value, onAdd]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="pointer-events-auto w-full max-w-xl"
    >
      <div className="flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_12px_40px_-12px_rgba(30,20,60,0.25)] ring-1 ring-black/5">
        <span aria-hidden className="text-lg leading-none text-indigo-400">
          ✳
        </span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Park a thought here…"
          aria-label="Park a thought"
          className="h-9 w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          className={`h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-all ${
            justSaved
              ? "bg-emerald-500 text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-500"
          }`}
        >
          {justSaved ? "Parked ✓" : "Park it"}
        </button>
      </div>
    </form>
  );
}

export { SEEDS };
export type { Thought };
