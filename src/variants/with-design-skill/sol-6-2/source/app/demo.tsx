"use client";

import { createContext, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "./icons";

type Mode = "capture" | "search";
type Note = { title: string; body: string };

const sampleNotes: Note[] = [
  { title: "The shape of an idea", body: "Ideas grow through association. What changes when we organize by relationship instead of by topic?" },
  { title: "Ways of seeing", body: "Pay attention to what is usually left out of the frame. A small shift in perspective can reveal a whole new story." },
  { title: "On paying attention", body: "Take the same walk twice. The second time, only look for things you didn’t notice the first time." },
];

const storageKey = "morrow-demo-notes";
const DemoContext = createContext<(mode: Mode) => void>(() => {});

function readNotes(): Note[] {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(stored) ? stored.filter(
      (note): note is Note => note && typeof note.title === "string" && typeof note.body === "string",
    ) : [];
  } catch {
    return [];
  }
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<Mode>("capture");
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const results = [...notes, ...sampleNotes].filter(({ title, body }) =>
    `${title} ${body}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function openDemo(nextMode: Mode) {
    setMode(nextMode);
    setNotes(readNotes());
    setQuery("");
    setStatus("");
    dialog.current?.showModal();
  }

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      setStatus("Add a title and some text to save your note.");
      return;
    }

    const updated = [{ title: title.trim(), body: body.trim() }, ...readNotes()];
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      setStatus("Your browser couldn’t save this note. Your draft is still here.");
      return;
    }

    setNotes(updated);
    setTitle("");
    setBody("");
    setStatus("Note saved on this device.");
  }

  return (
    <DemoContext.Provider value={openDemo}>
      {children}
      <dialog ref={dialog} className="demo-dialog" aria-labelledby="demo-title">
        <div className="demo-header">
          <div className="demo-brand"><Icon name="mark" size={23} /> Morrow demo</div>
          <form method="dialog">
            <button className="icon-button" aria-label="Close demo" autoFocus><Icon name="close" /></button>
          </form>
        </div>
        <h2 id="demo-title">{mode === "capture" ? "Capture a thought" : "Find a note"}</h2>
        <div className="demo-tabs" aria-label="Demo tools">
          <button type="button" aria-pressed={mode === "capture"} onClick={() => setMode("capture")}><Icon name="plus" size={17} /> New note</button>
          <button type="button" aria-pressed={mode === "search"} onClick={() => setMode("search")}><Icon name="search" size={17} /> Search</button>
        </div>
        {mode === "capture" ? (
          <form className="demo-form" onSubmit={saveNote}>
            <label>Title<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="A thought worth keeping" maxLength={100} /></label>
            <label>Note<textarea required value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write whatever’s on your mind…" rows={4} maxLength={3000} /></label>
            <div className="demo-save">
              <button className="action primary-action" type="submit">Save note <Icon name="check" size={16} /></button>
              <p role="status">{status}</p>
            </div>
          </form>
        ) : (
          <div className="demo-search">
            <label>Search notes<input role="searchbox" inputMode="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “ideas” or “attention”" /></label>
            <ul className="demo-results">
              {results.map(({ title, body }, index) => <li key={index}><strong>{title}</strong><p>{body}</p></li>)}
            </ul>
            {results.length === 0 && <p role="status">No matching notes. Try a different word.</p>}
          </div>
        )}
      </dialog>
    </DemoContext.Provider>
  );
}

export function DemoButton({ children, className, mode = "capture" }: { children: ReactNode; className: string; mode?: Mode }) {
  const openDemo = useContext(DemoContext);
  return <button type="button" className={className} onClick={() => openDemo(mode)}>{children}</button>;
}
