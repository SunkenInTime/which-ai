"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { BrandMark, Icon } from "./ui-icons";

const sampleNotes = [
  { id: "welcome", title: "A little room to think", body: "This is your space to catch ideas while they’re fresh. Start a new note or make this one your own.\n\nTry writing about something you noticed today." },
  { id: "field", title: "Field notes", body: "Take the long way home once a week. Notice what’s changed, what’s stayed the same, and what you walked past yesterday." },
  { id: "reading", title: "Reading list", body: "Braiding Sweetgrass — Robin Wall Kimmerer\nWays of Seeing — John Berger\nA Field Guide to Getting Lost — Rebecca Solnit" },
];

const DemoContext = createContext<() => void>(() => {});

export function DemoButton({ children, className = "primary-action", arrow = true }: {
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  const open = useContext(DemoContext);

  return (
    <button type="button" className={className} onClick={open}>
      {children}
      {arrow && <Icon name="arrow" size={18} />}
    </button>
  );
}

export function Demo({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const nextNoteId = useRef(1);
  const [notes, setNotes] = useState(sampleNotes);
  const [activeId, setActiveId] = useState(sampleNotes[0].id);
  const active = notes.find((note) => note.id === activeId) ?? notes[0];

  function openDemo() {
    dialog.current?.showModal();
  }

  function addNote() {
    const note = { id: `note-${nextNoteId.current++}`, title: "", body: "" };
    setNotes((previous) => [...previous, note]);
    setActiveId(note.id);
    dialog.current?.querySelector<HTMLInputElement>(".demo-title")?.focus();
  }

  function updateNote(field: "title" | "body", value: string) {
    setNotes((previous) => previous.map((note) => note.id === active.id ? { ...note, [field]: value } : note));
  }

  return (
    <DemoContext.Provider value={openDemo}>
      {children}
      <dialog className="demo" ref={dialog} aria-labelledby="demo-heading">
        <div className="demo-header">
          <span className="demo-brand"><BrandMark /><span id="demo-heading">Morrow demo</span></span>
          <button type="button" className="icon-button" aria-label="Close demo" onClick={() => dialog.current?.close()}>
            <Icon name="close" />
          </button>
        </div>
        <div className="demo-space">
          <aside className="demo-sidebar" aria-label="Your demo notes">
            <button type="button" className="demo-new" onClick={addNote}><Icon name="plus" size={16} /> New note</button>
            {notes.map((note) => (
              <button
                type="button"
                className="demo-note"
                key={note.id}
                aria-pressed={note.id === active.id}
                onClick={() => setActiveId(note.id)}
              >
                <Icon name="note" size={16} /><span>{note.title || "Untitled"}</span>
              </button>
            ))}
          </aside>
          <div className="demo-editor">
            <input className="demo-title" aria-label="Note title" placeholder="Untitled note" value={active.title} onChange={(event) => updateNote("title", event.target.value)} />
            <textarea aria-label="Note content" placeholder="Start writing…" value={active.body} onChange={(event) => updateNote("body", event.target.value)} />
            <p>Edits stay in this demo until you reload or leave the page.</p>
          </div>
        </div>
      </dialog>
    </DemoContext.Provider>
  );
}
