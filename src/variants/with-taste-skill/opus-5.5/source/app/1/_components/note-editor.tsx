"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "./use-reduced-motion-safe";
import { ArrowBendUpLeft, FileText, Plus } from "@phosphor-icons/react";
import { Z } from "../../lib/z";

type Note = { title: string; folder: string; backlinks: number };

const NOTES: Note[] = [
  { title: "Finding the Mother Tree", folder: "Reading", backlinks: 3 },
  { title: "Mycorrhizal networks", folder: "Ideas", backlinks: 5 },
  { title: "Thinking in Systems", folder: "Reading", backlinks: 7 },
  { title: "Deep time", folder: "Ideas", backlinks: 4 },
  { title: "Braiding Sweetgrass", folder: "Reading", backlinks: 2 },
  { title: "Reading goals 2026", folder: "Plans", backlinks: 6 },
  { title: "Book club, October", folder: "Daily", backlinks: 1 },
];

const INITIAL = `Halfway through. Powers writes trees as the main characters, and somehow it works.

Patricia's research on how trees share nutrients is close to [[Finding the Mother Tree]]. Same science, told as fiction.

Open question: is the real subject slow time? Link this to `;

const LINK_RE = /\[\[([^[\]\n]+?)\]\]/g;
const OPEN_RE = /\[\[([^[\]\n]{0,40})$/;

// Shared by the textarea and its mirror so glyphs line up exactly.
const TEXT_BOX =
  "whitespace-pre-wrap break-words px-5 py-4 font-sans text-base leading-7 tracking-[-0.005em] sm:text-[15px]";

type Option = { title: string; folder: string; create?: boolean };

function parseLinks(text: string) {
  const titles: string[] = [];
  for (const m of text.matchAll(LINK_RE)) {
    const t = m[1].trim();
    if (t && !titles.includes(t)) titles.push(t);
  }
  return titles;
}

function renderMirror(text: string, markerAt: number | null, markerRef: React.RefObject<HTMLSpanElement | null>) {
  const out: ReactNode[] = [];
  const marker = <span key="marker" ref={markerRef} />;
  let last = 0;
  let placed = false;

  const pushText = (from: number, to: number) => {
    if (markerAt !== null && !placed && markerAt >= from && markerAt <= to) {
      out.push(text.slice(from, markerAt), marker, text.slice(markerAt, to));
      placed = true;
    } else {
      out.push(text.slice(from, to));
    }
  };

  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index ?? 0;
    pushText(last, start);
    out.push(
      <span
        key={`l${start}`}
        className="rounded-full bg-(--k-accent-soft) text-(--k-accent-ink) [box-decoration-break:clone]"
      >
        <span className="opacity-40">[[</span>
        {m[1]}
        <span className="opacity-40">]]</span>
      </span>,
    );
    last = start + m[0].length;
  }
  pushText(last, text.length);
  // Trailing space keeps a final empty line measurable.
  out.push(" ");
  return out;
}

export function NoteEditor() {
  const reduce = useReducedMotionSafe();
  const uid = useId();
  const listId = `${uid}-list`;
  const hintId = `${uid}-hint`;

  const [text, setText] = useState(INITIAL);
  const [caret, setCaret] = useState(INITIAL.length);
  const [active, setActive] = useState(0);
  const [dismissedAt, setDismissedAt] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const pendingCaret = useRef<number | null>(null);

  const trigger = useMemo(() => {
    const m = OPEN_RE.exec(text.slice(0, caret));
    if (!m || m.index === dismissedAt) return null;
    return { start: m.index, query: m[1] };
  }, [text, caret, dismissedAt]);

  const options = useMemo<Option[]>(() => {
    if (!trigger) return [];
    const q = trigger.query.trim().toLowerCase();
    const matches = NOTES.filter((n) => n.title.toLowerCase().includes(q)).slice(0, 5);
    const exact = NOTES.some((n) => n.title.toLowerCase() === q);
    const list: Option[] = matches.map((n) => ({ title: n.title, folder: n.folder }));
    if (q && !exact) list.push({ title: trigger.query.trim(), folder: "New note", create: true });
    return list;
  }, [trigger]);

  const open = trigger !== null && options.length > 0;
  const activeIndex = Math.min(active, Math.max(options.length - 1, 0));

  const links = useMemo(() => parseLinks(text), [text]);

  const positionPopover = useCallback(() => {
    const pop = popRef.current;
    const marker = markerRef.current;
    const mirror = mirrorRef.current;
    if (!pop || !marker || !mirror) return;
    const maxLeft = mirror.clientWidth - pop.offsetWidth - 8;
    const left = Math.max(8, Math.min(marker.offsetLeft, maxLeft));
    const below = marker.offsetTop - mirror.scrollTop + 28;
    const fitsBelow = below + pop.offsetHeight < mirror.clientHeight + 96;
    const top = fitsBelow ? below : marker.offsetTop - mirror.scrollTop - pop.offsetHeight - 4;
    pop.style.transform = `translate(${left}px, ${top}px)`;
  }, []);

  useLayoutEffect(() => {
    if (pendingCaret.current !== null && inputRef.current) {
      const pos = pendingCaret.current;
      pendingCaret.current = null;
      inputRef.current.setSelectionRange(pos, pos);
    }
    if (mirrorRef.current && inputRef.current) {
      mirrorRef.current.scrollTop = inputRef.current.scrollTop;
    }
    positionPopover();
  }, [text, open, trigger?.start, positionPopover]);

  function pick(option: Option) {
    if (!trigger) return;
    const after = text.slice(caret).replace(/^\]\]/, "");
    const inserted = `[[${option.title}]]`;
    const next = text.slice(0, trigger.start) + inserted + after;
    const pos = trigger.start + inserted.length;
    pendingCaret.current = pos;
    setText(next);
    setCaret(pos);
    setActive(0);
    setAnnouncement(`Linked to ${option.title}. It now shows this note as a backlink.`);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (!open || !trigger) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIndex + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((activeIndex - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      pick(options[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setDismissedAt(trigger.start);
    }
  }

  const words = text.replace(/\[\[|\]\]/g, " ").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="rounded-[12px] border border-(--k-line) bg-(--k-surface) shadow-(--k-shadow)">
      <div className="flex items-center justify-between gap-4 border-b border-(--k-line) px-5 py-3 text-[13px]">
        <div className="flex min-w-0 items-center gap-1.5 text-(--k-fg-3)">
          <span>Reading</span>
          <span aria-hidden>/</span>
          <span className="truncate font-medium text-(--k-fg)">The Overstory</span>
        </div>
        <span className="shrink-0 tabular-nums text-(--k-fg-3)">{words} words</span>
      </div>

      <div className="px-5 pt-5">
        <p className="text-[22px] font-semibold tracking-[-0.025em]">The Overstory</p>
      </div>

      <div className="relative">
        <div
          ref={mirrorRef}
          aria-hidden
          className={`${TEXT_BOX} pointer-events-none absolute inset-0 overflow-hidden text-(--k-fg)`}
        >
          {renderMirror(text, open && trigger ? trigger.start : null, markerRef)}
        </div>
        <textarea
          ref={inputRef}
          value={text}
          spellCheck={false}
          aria-label="Note: The Overstory"
          aria-describedby={hintId}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
          onChange={(e) => {
            setText(e.target.value);
            setCaret(e.target.selectionStart);
            setActive(0);
          }}
          onSelect={(e) => setCaret(e.currentTarget.selectionStart)}
          onKeyDown={onKeyDown}
          onBlur={() => trigger && setDismissedAt(trigger.start)}
          onFocus={() => setDismissedAt(null)}
          onScroll={(e) => {
            if (mirrorRef.current) mirrorRef.current.scrollTop = e.currentTarget.scrollTop;
            positionPopover();
          }}
          className={`${TEXT_BOX} k-editor-input relative block h-[232px] w-full [scrollbar-width:none] resize-none bg-transparent outline-none`}
        />

        <div
          ref={popRef}
          style={{ zIndex: Z.raised }}
          className={`absolute left-0 top-0 w-72 max-w-[calc(100%-16px)] ${open ? "" : "pointer-events-none invisible"}`}
        >
          <AnimatePresence>
            {open && (
              <motion.ul
                id={listId}
                role="listbox"
                aria-label="Link to note"
                initial={reduce ? false : { opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="origin-top-left overflow-hidden rounded-[12px] border border-(--k-line) bg-(--k-surface) p-1 shadow-(--k-shadow)"
              >
                {options.map((o, i) => (
                  <li
                    key={`${o.title}-${o.create ? "new" : "n"}`}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      pick(o);
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] ${
                      i === activeIndex ? "bg-(--k-surface-2)" : ""
                    }`}
                  >
                    {o.create ? (
                      <Plus size={15} className="shrink-0 text-(--k-accent-ink)" />
                    ) : (
                      <FileText size={15} className="shrink-0 text-(--k-fg-3)" />
                    )}
                    <span className="min-w-0 flex-1 truncate font-medium">
                      {o.create ? `Create "${o.title}"` : o.title}
                    </span>
                    <span className="shrink-0 text-[12px] text-(--k-fg-3)">{o.folder}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="rounded-b-[11px] border-t border-(--k-line) bg-(--k-bg)/60 px-5 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[13px] font-medium">Backlinks</p>
          <p id={hintId} className="text-[12px] text-(--k-fg-3)">
            Type{" "}
            <kbd className="rounded-[5px] border border-(--k-line-strong) bg-(--k-surface) px-1 font-mono text-[11px] text-(--k-fg)">
              [[
            </kbd>{" "}
            to link a note
          </p>
        </div>
        <ul className="mt-3 flex min-h-8 flex-wrap gap-2" aria-label="Notes that now link back here">
          <AnimatePresence mode="popLayout" initial={false}>
            {links.map((title) => {
              const base = NOTES.find((n) => n.title === title)?.backlinks ?? 0;
              return (
                <motion.li
                  key={title}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="inline-flex max-w-full items-center gap-2 rounded-full border border-(--k-line) bg-(--k-surface) py-1 pl-2.5 pr-3 text-[13px]"
                >
                  <ArrowBendUpLeft size={13} className="shrink-0 text-(--k-accent-ink)" />
                  <span className="truncate font-medium">{title}</span>
                  <span className="shrink-0 tabular-nums text-(--k-fg-3)">{base + 1}</span>
                </motion.li>
              );
            })}
          </AnimatePresence>
          {links.length === 0 && (
            <li className="text-[13px] text-(--k-fg-3)">
              No links yet. Notes you link to will list this one as a backlink.
            </li>
          )}
        </ul>
      </div>

      <p aria-live="polite" className="sr-only">
        {open ? `${options.length} notes match. Use arrow keys and Enter to link.` : announcement}
      </p>
    </div>
  );
}
