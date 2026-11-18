"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { initialNoteByEdition, initialNotes, type EditionId, type Note } from "./editions";
import { Icon, Mark } from "./icons";
import { NoteImage } from "./previews";

const storageKey = "veybrin-workspace-v1";
const changeEvent = "veybrin-notes-change";
let lastStored: string | null | undefined;
let snapshot = initialNotes;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function readNotes() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored !== lastStored) {
      lastStored = stored;
      const parsed: unknown = stored ? JSON.parse(stored) : initialNotes;
      snapshot = Array.isArray(parsed) && parsed.length ? parsed : initialNotes;
    }
  } catch {
    // Keep the last readable workspace when storage is unavailable.
  }
  return snapshot;
}

function writeNotes(notes: Note[]) {
  snapshot = notes;
  let stored = false;
  try {
    const value = JSON.stringify(notes);
    localStorage.setItem(storageKey, value);
    lastStored = value;
    stored = true;
  } catch {
    // The workspace remains usable for this visit.
  }
  window.dispatchEvent(new Event(changeEvent));
  return stored;
}

export function Workspace({ edition }: { edition: EditionId }) {
  const notes = useSyncExternalStore(subscribe, readNotes, () => initialNotes);
  const [selectedId, selectNote] = useState(initialNoteByEdition[edition]);
  const [query, setQuery] = useState(edition === "5" ? "rain" : "");
  const [collection, setCollection] = useState("");
  const [editing, setEditing] = useState<"new" | "edit" | null>(null);
  const [message, setMessage] = useState("");
  const note = notes.find(({ id }) => id === selectedId) ?? notes[0];
  const search = query.trim().toLowerCase();
  const found = notes.filter((item) =>
    (!collection || item.collection === collection) &&
    (!search || `${item.title} ${item.text} ${item.collection}`.toLowerCase().includes(search))
  );
  const collections = Array.from(new Set(notes.map((item) => item.collection)));
  const related = notes.filter((item) => note.links.includes(item.id) || item.links.includes(note.id));
  const existingNote = editing === "edit" ? note : null;

  function openNote(id: string) {
    selectNote(id);
    setEditing(null);
    setMessage("");
  }

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const title = String(fields.get("title") ?? "").trim();
    const linkedId = String(fields.get("link") ?? "");

    if (!title) {
      setMessage("Enter a title for the note.");
      event.currentTarget.querySelector<HTMLInputElement>("[name=title]")?.focus();
      return;
    }

    const newNote: Note = {
      ...existingNote,
      id: existingNote?.id ?? (crypto.randomUUID?.() ?? String(Date.now())),
      title,
      text: String(fields.get("text") ?? "").trim(),
      collection: String(fields.get("collection") || "Inbox"),
      date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date()),
      links: [...new Set([...(existingNote?.links ?? []), ...(linkedId ? [linkedId] : [])])],
    };

    const updated = existingNote
      ? notes.map((item) => item.id === existingNote.id ? newNote : item)
      : [newNote, ...notes];

    const stored = writeNotes(updated);
    selectNote(newNote.id);
    setQuery("");
    setCollection("");
    setEditing(null);
    setMessage(stored ? "Note saved on this browser." : "Note saved for this visit.");
  }

  return (
    <div className="workspace app-frame ui" data-ui="">
      <div className="workspace__top">
        <div><Mark size={20} /><span>My notebook</span></div>
        <button className="workspace__button" type="button" onClick={() => { setEditing("new"); setMessage(""); }}>
          <Icon name="plus" size={17} /> New note
        </button>
      </div>
      <div className="workspace__body">
        <aside className="workspace__list" aria-label="Notebook pages">
          <label className="workspace__search">
            <Icon name="search" size={17} />
            <span className="sr-only">Search notes</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" />
          </label>
          <label className="workspace__filter">
            <Icon name="book" size={17} />
            <span className="sr-only">Filter by collection</span>
            <select value={collection} onChange={(event) => setCollection(event.target.value)}>
              <option value="">All collections</option>
              {collections.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="workspace__items">
            {found.map((item) => (
              <button type="button" key={item.id} className="workspace__item" aria-current={!editing && note.id === item.id ? "true" : undefined} onClick={() => openNote(item.id)}>
                <Icon name="note" size={17} />
                <span><strong>{item.title}</strong><small>{item.collection}</small></span>
                <small>{item.date}</small>
              </button>
            ))}
            {!found.length && <p className="workspace__empty">No notes match your search.</p>}
          </div>
        </aside>
        <div className="workspace__page">
          {editing ? (
            <form key={editing} className="note-form" onSubmit={saveNote}>
              <div className="note-form__heading"><h3>{existingNote ? "Edit note" : "New note"}</h3><button type="button" className="workspace__button" onClick={() => setEditing(null)}>Cancel</button></div>
              <label>Title <input name="title" required maxLength={100} defaultValue={existingNote?.title} /></label>
              <label>Note <textarea name="text" rows={3} maxLength={5000} defaultValue={existingNote?.text} /></label>
              <div className="note-form__row">
                <label>Collection <select name="collection" defaultValue={existingNote?.collection ?? "Inbox"}>{collections.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Link a note <select name="link" defaultValue=""><option value="">Choose a note</option>{notes.filter((item) => item.id !== existingNote?.id).map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
              </div>
              <button type="submit" className="workspace__button workspace__button--fill"><Icon name="check" size={17} /> Save note</button>
            </form>
          ) : (
            <article className="workspace__reading">
              <div className="workspace__crumb">
                <span><Icon name="book" size={16} />{note.collection} <span aria-hidden="true">/</span> {note.date}</span>
                <button type="button" className="workspace__button" onClick={() => { setEditing("edit"); setMessage(""); }}>Edit note</button>
              </div>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              {note.image && <div className="workspace__photo"><NoteImage image={note.image} /></div>}
              <div className="workspace__related">
                <span><Icon name="link" size={17} /> Linked notes</span>
                {related.map((item) => <button type="button" key={item.id} onClick={() => openNote(item.id)}>{item.title}<Icon name="diagonal" size={14} /></button>)}
                {!related.length && <small>Link another page by editing this note.</small>}
              </div>
            </article>
          )}
          <p className="workspace__status" role="status">{message}</p>
        </div>
      </div>
    </div>
  );
}
