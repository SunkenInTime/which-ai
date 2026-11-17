"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Feather,
  FileText,
  Hash,
  Link2,
  NotebookPen,
  Plus,
  Search,
  X,
} from "lucide-react";
import { chapters } from "./editions";

type Note = { id: string; title: string; body: string; topic: string };
const storageKey = "daymark.notes.v1";
const starterNotes: Note[] = [
  {
    id: "walk",
    title: "On the walk home",
    topic: "Creative practice",
    body: "Walk the long way home. The best ideas seem to arrive somewhere between the park and my front door.\n\nToday I noticed how much more I see when I leave my phone in my pocket. The copper color of the leaves. A blue door I must have passed a hundred times.\n\nA question for tomorrow: what else am I walking past?",
  },
  {
    id: "attention",
    title: "The art of noticing",
    topic: "Creative practice",
    body: "A little exercise for the days when ideas feel far away.\n\nChoose one familiar place. Write down five things you have never noticed about it. Follow the detail that surprises you.\n\nMaybe attention is a practice after all.",
  },
  {
    id: "reading",
    title: "The reading shelf",
    topic: "Books",
    body: "A list to return to on a rainy afternoon.\n\n• A Room of One’s Own — Virginia Woolf\n• A Field Guide to Getting Lost — Rebecca Solnit\n• Pilgrim at Tinker Creek — Annie Dillard",
  },
  {
    id: "seed",
    title: "A seed of an idea",
    topic: "Projects",
    body: "What if I kept a tiny map of the places where my ideas arrive?\n\nStart with three notes and a walk around the neighborhood.",
  },
];

function blankNote(): Note {
  const id =
    crypto.randomUUID?.() ||
    Array.from(crypto.getRandomValues(new Uint32Array(4))).join("-");
  return { id, title: "", body: "", topic: "" };
}

function readNotes(): Note[] {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(storageKey) || "null",
    );
    if (
      Array.isArray(stored) &&
      stored.length &&
      stored.every(
        (n) =>
          n &&
          ["id", "title", "body", "topic"].every(
            (k) => typeof n[k] === "string",
          ),
      )
    )
      return stored;
  } catch {
    /* This notebook can also be used in memory. */
  }
  return starterNotes;
}

export function Modal({
  children,
  onClose,
  label,
  className,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const prevOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = prevOverflow;
    };
  }, []);
  return (
    <dialog
      className={`modal ${className}`}
      ref={ref}
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-surface">{children}</div>
    </dialog>
  );
}

export function FieldGuide({
  start,
  onClose,
  onNotebook,
}: {
  start: number;
  onClose: () => void;
  onNotebook: () => void;
}) {
  const [step, setStep] = useState(start);
  const chapter = chapters[step];
  return (
    <Modal
      label="Daymark field guide"
      className="guide-modal"
      onClose={onClose}
    >
      <div className="modal-top">
        <span>
          <BookOpen size={18} />
          Daymark field guide
        </span>
        <button
          className="icon-button"
          aria-label="Close field guide"
          onClick={onClose}
        >
          <X size={19} />
        </button>
      </div>
      <div className="guide-tabs" aria-label="Field guide chapters">
        {chapters.map((ch, i) => (
          <button
            key={ch.label}
            className={i === step ? "selected" : ""}
            onClick={() => setStep(i)}
            aria-pressed={i === step}
          >
            {ch.label}
          </button>
        ))}
      </div>
      <div className="guide-content">
        <span className="eyebrow">Chapter 0{step + 1} / 03</span>
        <h2>{chapter.title}</h2>
        <p>{chapter.body}</p>
        <div className="guide-note">
          <Feather size={20} />
          <h3>{chapter.exampleTitle}</h3>
          <p>{chapter.example}</p>
        </div>
        <div className="guide-actions">
          <button
            className="text-button"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft size={15} /> Back
          </button>
          {step < 2 ? (
            <button
              className="button primary"
              onClick={() => setStep(step + 1)}
            >
              Next chapter <ArrowRight size={16} />
            </button>
          ) : (
            <button className="button primary" onClick={onNotebook}>
              Try the notebook <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default function Notebook({
  initialNote,
  onClose,
}: {
  initialNote?: string;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState<Note[]>(() =>
    initialNote === "new" ? [blankNote(), ...readNotes()] : readNotes(),
  );
  const [selected, setSelected] = useState(
    initialNote && initialNote !== "new" ? initialNote : notes[0].id,
  );
  const [query, setQuery] = useState("");
  const [inList, setInList] = useState(false);
  const [saved, setSaved] = useState(true);
  const note = notes.find((n) => n.id === selected) || notes[0];
  const titleInput = useRef<HTMLInputElement>(null);
  const result = notes.filter((n) =>
    (n.title + " " + n.body + " " + n.topic)
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  const related = notes.filter(
    (n) =>
      n.id !== note.id &&
      note.topic.trim() &&
      n.topic.trim().toLowerCase() === note.topic.trim().toLowerCase(),
  );
  function edit(change: Partial<Note>) {
    const latest = saved ? readNotes() : notes;
    const exists = latest.some((entry) => entry.id === note.id);
    const updated = exists
      ? latest.map((entry) =>
          entry.id === note.id ? { ...entry, ...change } : entry,
        )
      : [{ ...note, ...change }, ...latest];
    setNotes(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }
  function select(id: string) {
    setSelected(id);
    setInList(false);
  }
  function create() {
    const existingDraft = notes.find(
      (entry) => !entry.title && !entry.body && !entry.topic,
    );
    const fresh = existingDraft || blankNote();
    if (!existingDraft) setNotes([fresh, ...notes]);
    setQuery("");
    select(fresh.id);
    requestAnimationFrame(() => titleInput.current?.focus());
  }
  return (
    <Modal
      label="Your Daymark notebook"
      className="notebook-modal"
      onClose={onClose}
    >
      <div className="modal-top">
        <span>
          <NotebookPen size={18} />
          My notebook
        </span>
        <div className="modal-tools">
          <span className="save-hint">
            <Check size={13} />
            {saved ? "On this device" : "In this session"}
          </span>
          <button
            className="icon-button"
            aria-label="Close notebook"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>
      </div>
      <div className={`notebook-layout ${inList ? "show-list" : ""}`}>
        <aside className="note-sidebar">
          <button className="new-note" onClick={create}>
            <Plus size={16} /> New note
          </button>
          <label className="note-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
            />
          </label>
          <div className="note-list">
            {result.map((n) => (
              <button
                key={n.id}
                className={n.id === note.id ? "active" : ""}
                onClick={() => select(n.id)}
              >
                <FileText size={15} />
                <span>{n.title || "Untitled note"}</span>
              </button>
            ))}
            {!result.length && (
              <p className="no-notes">No notes match your search.</p>
            )}
          </div>
        </aside>
        <section className="note-editor">
          <button
            className="mobile-list text-button"
            onClick={() => setInList(true)}
          >
            <ArrowLeft size={15} /> All notes
          </button>
          <span className="eyebrow">
            <Feather size={13} /> Notebook entry
          </span>
          <input
            ref={titleInput}
            className="note-title"
            value={note.title}
            onChange={(e) => edit({ title: e.target.value })}
            placeholder="Untitled note"
            aria-label="Note title"
          />
          <label className="note-topic">
            <Hash size={13} />
            <input
              aria-label="Note topic"
              value={note.topic}
              onChange={(e) => edit({ topic: e.target.value })}
              placeholder="Add a topic"
            />
          </label>
          <textarea
            className="note-body"
            aria-label="Note text"
            value={note.body}
            onChange={(e) => edit({ body: e.target.value })}
            placeholder="What’s on your mind?"
          />
          {related.length > 0 && (
            <div className="note-related">
              <span className="eyebrow">
                <Link2 size={13} /> Related notes
              </span>
              {related.map((n) => (
                <button key={n.id} onClick={() => select(n.id)}>
                  {n.title || "Untitled note"}
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </Modal>
  );
}
