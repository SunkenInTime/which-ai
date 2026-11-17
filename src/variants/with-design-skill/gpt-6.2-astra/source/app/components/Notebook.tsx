"use client";

import { useEffect, useRef, useState } from "react";
import { examples, type Note } from "./content";
import { Icon, Mark } from "./Icons";

const storageKey = "notefold.notebook.v1";

function blankNote(): Note {
  const id = Array.from(crypto.getRandomValues(new Uint32Array(4)), (n) =>
    n.toString(16).padStart(8, "0"),
  ).join("");
  return { id, title: "", body: "", collection: "My notes", links: [] };
}

function readNotes(): Note[] {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(storageKey) || "null",
    );
    if (
      Array.isArray(stored) &&
      stored.every(
        (n) =>
          n &&
          typeof n.id === "string" &&
          typeof n.title === "string" &&
          typeof n.body === "string" &&
          typeof n.collection === "string" &&
          Array.isArray(n.links) &&
          n.links.every((id: unknown) => typeof id === "string"),
      )
    ) {
      return [
        ...stored,
        ...examples.filter((n) => !stored.some((s) => s.id === n.id)),
      ];
    }
  } catch {
    /* An empty or unavailable store can still use the sample notebook. */
  }
  return examples;
}

export function Notebook({
  initialId,
  onClose,
}: {
  initialId: string;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = readNotes();
    return initialId === "new" ? [blankNote(), ...saved] : saved;
  });
  const [id, setId] = useState(initialId === "new" ? notes[0].id : initialId);
  const [query, setQuery] = useState("");
  const [linkOpen, setLinkOpen] = useState(false);
  const [saved, setSaved] = useState(true);
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const current = notes.find((n) => n.id === id) ?? notes[0];
  const linked = notes.filter(
    (n) => current.links.includes(n.id) || n.links.includes(current.id),
  );
  const filtered = notes.filter((n) =>
    (n.title + " " + n.body).toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    if (initialId === "new") title.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function sync(event: StorageEvent) {
      if (event.key === storageKey) setNotes(readNotes());
    }
    window.addEventListener("storage", sync);
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      window.removeEventListener("storage", sync);
    };
  }, [initialId]);

  function persist(next: Note[]) {
    setNotes(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }
  function edit(patch: Partial<Note>) {
    persist(notes.map((n) => (n.id === current.id ? { ...n, ...patch } : n)));
  }
  function select(nextId: string) {
    setId(nextId);
    setLinkOpen(false);
  }
  function newNote() {
    const entry = blankNote();
    persist([entry, ...notes]);
    select(entry.id);
    setQuery("");
    title.current?.focus();
  }
  return (
    <dialog
      ref={dialog}
      className="notebook-dialog"
      aria-labelledby="notebook-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="notebook-head">
        <div className="brand">
          <Mark />
          <span id="notebook-title">My notebook</span>
        </div>
        <button
          className="icon-btn"
          aria-label="Close notebook"
          onClick={onClose}
        >
          <Icon name="cross" />
        </button>
      </div>
      <div className="notebook-body">
        <aside className="note-list">
          <button className="new-note" onClick={newNote}>
            <Icon name="plus" size={16} /> New note
          </button>
          <label className="search-box">
            <Icon name="search" size={16} />
            <input
              placeholder="Search notes"
              aria-label="Search notebook"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="note-list-scroll">
            {filtered.map((n) => (
              <button
                key={n.id}
                aria-pressed={n.id === current.id}
                onClick={() => select(n.id)}
              >
                <Icon name="note" size={15} />
                {n.title || "Untitled note"}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="empty-state">No matching notes.</p>
            )}
          </div>
        </aside>
        <div className="editor">
          <div className="editor-meta">
            <span>{current.collection}</span>
            <small>
              {saved ? "On this device" : "Browser storage unavailable"}
            </small>
          </div>
          <input
            ref={title}
            aria-label="Note title"
            className="note-title"
            placeholder="Untitled note"
            value={current.title}
            onChange={(e) => edit({ title: e.target.value })}
          />
          <textarea
            aria-label="Note contents"
            placeholder="Write down a thought…"
            value={current.body}
            onChange={(e) => edit({ body: e.target.value })}
          />
          <div className="linked-head">
            <span>
              <Icon name="link" size={15} /> Linked notes
            </span>
            <button
              aria-expanded={linkOpen}
              onClick={() => setLinkOpen(!linkOpen)}
            >
              <Icon name={linkOpen ? "cross" : "plus"} size={15} />
              {linkOpen ? "Close" : "Link a note"}
            </button>
          </div>
          {linkOpen && (
            <div className="link-picker">
              {notes
                .filter(
                  (n) =>
                    n.id !== current.id && !linked.some((l) => l.id === n.id),
                )
                .map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      edit({ links: [...current.links, n.id] });
                      setLinkOpen(false);
                    }}
                  >
                    {n.title || "Untitled note"}
                  </button>
                ))}
              {linked.length === notes.length - 1 && (
                <span>All your notes are linked.</span>
              )}
            </div>
          )}
          <div className="linked-list">
            {linked.map((n) => (
              <button key={n.id} onClick={() => select(n.id)}>
                {n.title || "Untitled note"}
                <Icon name="upRight" size={12} />
              </button>
            ))}
            {!linked.length && (
              <small>Connect this thought to another note.</small>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
