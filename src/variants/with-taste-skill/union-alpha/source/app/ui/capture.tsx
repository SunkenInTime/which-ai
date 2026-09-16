"use client";

import { useState } from "react";
import {
  CalendarDots,
  Check,
  LinkSimple,
  MagnifyingGlass,
  NotePencil,
  Plus,
  Tag,
} from "@phosphor-icons/react";

const seeds = [
  { icon: NotePencil, label: "Note" },
  { icon: LinkSimple, label: "Link" },
  { icon: Tag, label: "Tag" },
  { icon: CalendarDots, label: "Event" },
];

const suggestions = [
  "Links to: Deep work (note)",
  "Same topic: design systems",
  "Due Friday: ship v2 preview",
];

const tones = {
  light: {
    shell: "border-zinc-200 bg-white shadow-sm",
    seedTrack: "bg-zinc-100",
    seedOn: "bg-zinc-900 text-white",
    seedOff: "text-zinc-500 hover:text-zinc-800",
    input: "text-zinc-900 placeholder:text-zinc-400",
    submit: "bg-zinc-900 text-white",
    row: "bg-zinc-50 text-zinc-700",
    check: "text-emerald-600",
    hint: "text-zinc-500",
    pill: "border-zinc-200 hover:border-zinc-400",
  },
  dark: {
    shell: "border-white/10 bg-white/[0.04] shadow-none",
    seedTrack: "bg-white/10",
    seedOn: "bg-white text-zinc-900",
    seedOff: "text-zinc-400 hover:text-white",
    input: "text-zinc-100 placeholder:text-zinc-500",
    submit: "bg-white text-zinc-900",
    row: "bg-white/[0.06] text-zinc-300",
    check: "text-emerald-400",
    hint: "text-zinc-400",
    pill: "border-white/15 hover:border-white/40",
  },
} as const;

export function Capture({ tone = "light" }: { tone?: keyof typeof tones }) {
  const t = tones[tone];
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [activeSeed, setActiveSeed] = useState(0);
  const noun = seeds[activeSeed].label.toLowerCase();

  function add() {
    const text = value.trim();
    if (!text) return;
    setSaved((prev) => [text, ...prev].slice(0, 3));
    setValue("");
  }

  return (
    <div className={`rounded-2xl border p-3 ${t.shell}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
        className="flex items-center gap-2"
      >
        <div className={`flex items-center gap-0.5 rounded-full p-1 ${t.seedTrack}`}>
          {seeds.map((seed, i) => (
            <button
              key={seed.label}
              type="button"
              aria-pressed={i === activeSeed}
              aria-label={`${seed.label} capture`}
              onClick={() => setActiveSeed(i)}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition ${i === activeSeed ? t.seedOn : t.seedOff}`}
            >
              <seed.icon size={14} weight="regular" />
            </button>
          ))}
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Capture a ${noun}…`}
          aria-label={`Capture a ${noun}`}
          className={`min-w-0 flex-1 bg-transparent px-1 text-sm outline-none ${t.input}`}
        />
        <button
          type="submit"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition active:scale-95 ${t.submit}`}
          aria-label="Save"
        >
          <Plus size={16} weight="bold" />
        </button>
      </form>

      {saved.length > 0 && (
        <ul className="mt-2 space-y-1">
          {saved.map((item, i) => (
            <li key={`${item}-${i}`} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm ${t.row}`}>
              <Check size={13} weight="bold" className={`shrink-0 ${t.check}`} />
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className={`mt-2 flex flex-wrap items-center gap-1.5 text-xs ${t.hint}`}>
        <MagnifyingGlass size={12} />
        <span>Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setValue(s.replace(/^[^:]+: /, ""))}
            className={`rounded-full border px-2 py-0.5 transition ${t.pill}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
