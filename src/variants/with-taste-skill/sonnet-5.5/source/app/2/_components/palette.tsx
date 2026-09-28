"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

type Command = { label: string; keys: string[] };

const COMMANDS: Command[] = [
  { label: "New note", keys: ["N"] },
  { label: "Open: Interview with Marta on onboarding", keys: ["O"] },
  { label: "Open: Notes from the pricing workshop", keys: ["O"] },
  { label: "Link to another note", keys: ["L"] },
  { label: "Ask your notes", keys: ["A"] },
  { label: "Show related notes", keys: ["R"] },
  { label: "Start weekly review", keys: ["W"] },
  { label: "Export folder as markdown", keys: ["E"] },
];

export function Palette() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [ran, setRan] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  const index = Math.min(active, Math.max(results.length - 1, 0));

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((index + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((index + results.length - 1) % results.length);
    } else if (e.key === "Enter") {
      setRan(results[index].label);
    }
  }

  return (
    <div className="overflow-hidden rounded-[8px] border border-(--c-line) bg-(--c-surface)">
      <div className="flex items-center gap-3 border-b border-(--c-line) px-4">
        <MagnifyingGlass size={18} className="shrink-0 text-(--c-fg-3)" />
        <label htmlFor={`${listId}-input`} className="sr-only">
          Command
        </label>
        <input
          id={`${listId}-input`}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results.length ? `${listId}-${index}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setRan(null);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command, for example link"
          className="mono h-14 w-full bg-transparent text-[15px] text-(--c-fg) outline-none placeholder:text-(--c-fg-3)"
        />
      </div>
      <ul id={listId} role="listbox" aria-label="Commands" className="grid min-h-[300px] content-start p-2">
        {results.map((c, i) => (
          <li
            key={c.label}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={i === index}
            onMouseEnter={() => setActive(i)}
            onClick={() => setRan(c.label)}
            className="relative flex cursor-pointer items-center justify-between gap-4 rounded-[6px] px-3 py-3 text-[15px]"
          >
            {i === index && (
              <motion.span
                layoutId={reduce ? undefined : "palette-active"}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="absolute inset-0 rounded-[6px] bg-(--c-surface-2)"
              />
            )}
            <span className="relative truncate">{c.label}</span>
            <span className="relative flex shrink-0 gap-1">
              {c.keys.map((k) => (
                <kbd key={k} className="keycap rounded-[4px] border border-(--c-line) bg-(--c-bg) px-2 py-0.5 text-[12px]">
                  {k}
                </kbd>
              ))}
            </span>
          </li>
        ))}
        {results.length === 0 && (
          <li className="px-3 py-6 text-[15px] text-(--c-fg-2)">
            Nothing matches that. Try new, link or review.
          </li>
        )}
      </ul>
      <p aria-live="polite" className="mono min-h-11 border-t border-(--c-line) px-4 py-3 text-[13px] text-(--c-fg-2)">
        {ran ? `Ran: ${ran}` : "Arrow keys to move, Enter to run."}
      </p>
    </div>
  );
}
