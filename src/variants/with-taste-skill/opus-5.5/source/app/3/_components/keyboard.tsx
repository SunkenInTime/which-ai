"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { NOTES } from "./graph-data";

type Shortcut = {
  id: "capture" | "link" | "search";
  action: string;
  body: string;
  keys: string[];
};

const SHORTCUTS: Shortcut[] = [
  {
    id: "capture",
    action: "Quick capture",
    body: "Opens a capture box over whatever app you are in. Type, hit Enter, keep working.",
    keys: ["⌥", "Space"],
  },
  {
    id: "link",
    action: "Link a note",
    body: "Start typing a title and pick from your notes. The other note gets a backlink automatically.",
    keys: ["[", "["],
  },
  {
    id: "search",
    action: "Search everything",
    body: "Titles, full text, highlights and voice memo transcripts, in one box.",
    keys: ["⌘", "K"],
  },
];

function Keycaps({ keys, down }: { keys: string[]; down: boolean }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5" aria-label={keys.join(" ")}>
      {keys.map((k, i) => (
        <kbd
          key={i}
          className="v3-key"
          data-down={down}
          data-glyph={k === "⌘" || k === "⌥" ? "" : undefined}
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}

export function KeyboardSection() {
  const [down, setDown] = useState<Shortcut["id"] | null>(null);
  const releaseTimer = useRef<number>(0);

  useEffect(() => {
    function press(id: Shortcut["id"]) {
      window.clearTimeout(releaseTimer.current);
      setDown(id);
      releaseTimer.current = window.setTimeout(() => setDown(null), 420);
    }
    function onKey(e: KeyboardEvent) {
      if (e.altKey && e.code === "Space") press("capture");
      else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") press("search");
      else if (e.key === "[") press("link");
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(releaseTimer.current);
    };
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
      <ul className="divide-y divide-(--line) border-y border-(--line)">
        {SHORTCUTS.map((s) => (
          <li
            key={s.id}
            className="grid gap-4 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10"
          >
            <div>
              <h3 className="text-lg font-medium tracking-tight">{s.action}</h3>
              <p className="mt-1.5 max-w-[46ch] text-[15px] leading-relaxed text-(--fg-muted)">
                {s.body}
              </p>
            </div>
            <Keycaps keys={s.keys} down={down === s.id} />
          </li>
        ))}
      </ul>
      <div className="lg:self-start">
        <LinkEditor />
      </div>
    </div>
  );
}

const MAX_SUGGESTIONS = 5;

function LinkEditor() {
  const [text, setText] = useState("Why does the new office feel so quiet? Compare with ");
  const [caret, setCaret] = useState(0);
  const [active, setActive] = useState(0);
  const [dismissedAt, setDismissedAt] = useState<number | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  const listId = useId();
  const labelId = useId();

  const query = useMemo(() => {
    const before = text.slice(0, caret);
    const open = before.lastIndexOf("[[");
    if (open === -1) return null;
    const q = before.slice(open + 2);
    if (q.includes("]") || q.includes("\n") || q.length > 40) return null;
    return { q, open };
  }, [text, caret]);

  const open = query !== null && dismissedAt !== query.open;

  const matches = useMemo(() => {
    if (!query) return [];
    const q = query.q.trim().toLowerCase();
    return NOTES.filter((t) => t.toLowerCase().includes(q)).slice(0, MAX_SUGGESTIONS);
  }, [query]);

  const links = useMemo(
    () => Array.from(new Set(Array.from(text.matchAll(/\[\[([^\]\n]+)\]\]/g), (m) => m[1]))),
    [text],
  );

  function sync() {
    const el = ref.current;
    if (el) setCaret(el.selectionStart);
  }

  function choose(title: string) {
    if (!query) return;
    const before = text.slice(0, query.open);
    const after = text.slice(caret);
    const next = `${before}[[${title}]]${after.startsWith(" ") ? "" : " "}${after}`;
    const pos = before.length + title.length + 5;
    setText(next);
    setCaret(pos);
    setActive(0);
    requestAnimationFrame(() => {
      ref.current?.focus();
      ref.current?.setSelectionRange(pos, pos);
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      choose(matches[Math.min(active, matches.length - 1)]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setDismissedAt(query!.open);
    }
  }

  return (
    <div className="flex flex-col rounded-lg border border-(--line-strong) bg-(--bg-raised) transition-colors focus-within:border-(--focus)">
      <div className="flex items-center justify-between border-b border-(--line) px-4 py-3">
        <label id={labelId} htmlFor={`${listId}-ta`} className="text-sm font-medium">
          Try it: type <span className="mono text-(--accent-text)">[[</span> to link a note
        </label>
        <span className="mono text-xs text-(--fg-faint)">draft.md</span>
      </div>
      <div className="relative p-4">
        <textarea
          id={`${listId}-ta`}
          ref={ref}
          value={text}
          rows={4}
          spellCheck={false}
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && matches.length > 0 ? `${listId}-${active}` : undefined}
          onChange={(e) => {
            setText(e.target.value);
            setCaret(e.target.selectionStart);
            setActive(0);
            setDismissedAt(null);
          }}
          onKeyDown={onKeyDown}
          onKeyUp={sync}
          onClick={sync}
          onSelect={sync}
          className="v3-bare w-full resize-none bg-transparent text-[15px] leading-relaxed text-(--fg) outline-none placeholder:text-(--fg-faint)"
        />
        {open && (
          <div className="mt-2 rounded-lg border border-(--line-strong) bg-(--bg)">
            {matches.length > 0 ? (
              <ul id={listId} role="listbox" aria-labelledby={labelId} className="py-1">
                {matches.map((m, i) => (
                  <li
                    key={m}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(m);
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={`mx-1 cursor-pointer rounded-lg px-3 py-2 text-sm ${
                      i === active ? "bg-(--accent) text-(--accent-ink)" : "text-(--fg)"
                    }`}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            ) : (
              <p id={listId} className="px-3 py-3 text-sm text-(--fg-muted)">
                No note called &ldquo;{query?.q}&rdquo; yet. Close the brackets and Kept creates it.
              </p>
            )}
          </div>
        )}
      </div>
      <div className="mt-auto border-t border-(--line) px-4 py-3 text-sm">
        {links.length === 0 ? (
          <p className="text-(--fg-muted)">No links yet. Linked notes will show a backlink to this draft.</p>
        ) : (
          <p className="text-(--fg-muted)">
            Backlink added to{" "}
            {links.map((l, i) => (
              <span key={l}>
                <span className="font-medium text-(--fg)">{l}</span>
                {i < links.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
