"use client";

import { useMemo, useState } from "react";

type Note = {
  id: number;
  title: string;
  body: string;
  tags: string[];
};

const seed: Note[] = [
  {
    id: 1,
    title: "Spaced repetition beats cramming",
    body: "Reviewing at increasing intervals locks memory in. Schedule recall sessions at 1d, 3d, 7d, 21d.",
    tags: ["learning", "memory"],
  },
  {
    id: 2,
    title: "Zettelkasten in one line",
    body: "Every note links to at least one other note. Structure emerges from links, not folders.",
    tags: ["pkm", "method"],
  },
  {
    id: 3,
    title: "Mycelium metaphor",
    body: "Like fungal networks, knowledge grows by connecting — nutrients flow where links exist.",
    tags: ["metaphor", "design"],
  },
  {
    id: 4,
    title: "Weekly review checklist",
    body: "Empty inbox, tag strays, merge duplicates, pick three notes to expand.",
    tags: ["habit", "ritual"],
  },
];

export default function NoteDemo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [notes, setNotes] = useState<Note[]>(seed);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState<number | null>(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.tags.some((t) => t.includes(q)),
    );
  }, [notes, query]);

  const addNote = () => {
    const title = draft.trim();
    if (!title) return;
    const id = Date.now();
    setNotes([{ id, title, body: "Captured just now — expand whenever you like.", tags: ["inbox"] }, ...notes]);
    setSelected(id);
    setDraft("");
  };

  const isDark = tone === "dark";
  const shell = isDark
    ? "border-white/15 bg-white/5 text-slate-100"
    : "border-stone-200 bg-white text-stone-900 shadow-xl shadow-stone-900/5";
  const input = isDark
    ? "border-white/20 bg-white/10 placeholder:text-slate-400 focus:border-indigo-400"
    : "border-stone-300 bg-white placeholder:text-stone-400 focus:border-stone-900";
  const muted = isDark ? "text-slate-400" : "text-stone-500";

  return (
    <div className={`w-full rounded-2xl border p-5 backdrop-blur-md ${shell}`}>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Capture a thought…"
          aria-label="New note"
          className={`h-10 flex-1 rounded-lg border px-3 text-sm outline-none transition-colors ${input}`}
        />
        <button
          type="button"
          onClick={addNote}
          className={`h-10 shrink-0 rounded-lg px-4 text-sm font-semibold transition-colors ${
            isDark
              ? "bg-indigo-500 text-white hover:bg-indigo-400"
              : "bg-stone-900 text-white hover:bg-stone-700"
          }`}
        >
          Add
        </button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your second brain…"
        aria-label="Search notes"
        className={`mt-3 h-10 w-full rounded-lg border px-3 text-sm outline-none transition-colors ${input}`}
      />

      <p className={`mt-2 text-xs ${muted}`} aria-live="polite">
        {filtered.length} of {notes.length} notes
      </p>

      <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
        {filtered.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => setSelected(selected === n.id ? null : n.id)}
              className={`w-full rounded-lg border p-3 text-left transition-colors ${
                isDark
                  ? "border-white/10 bg-white/5 hover:border-indigo-400/60"
                  : "border-stone-200 hover:border-stone-400"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{n.title}</span>
                <span className={`text-[10px] uppercase tracking-wider ${muted}`}>
                  {n.tags[0]}
                </span>
              </div>
              {selected === n.id && (
                <p className={`mt-2 text-xs leading-relaxed ${muted}`}>{n.body}</p>
              )}
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className={`py-6 text-center text-sm ${muted}`}>Nothing found — capture it above.</li>
        )}
      </ul>
    </div>
  );
}
