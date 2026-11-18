"use client";
import { useEffect, useRef, useState } from "react";
import { starterNotes, type Note } from "./content";
import { BrandMark, Icon } from "./Icons";

const storageKey = "foliohm.notebook.v1";
function readNotes(): Note[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (Array.isArray(raw) && raw.length && raw.every(n => typeof n?.id === "string" && typeof n.title === "string" && typeof n.body === "string" && Array.isArray(n.links))) return raw;
  } catch { /* The starter notebook also works without browser storage. */ }
  return starterNotes;
}

export default function Notebook({ initialId, onClose }: { initialId?: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const [notes, setNotes] = useState(readNotes);
  const [id, setId] = useState(initialId || notes[0].id);
  const [query, setQuery] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [saved, setSaved] = useState(true);
  const note = notes.find(n => n.id === id) || notes[0];
  const matches = notes.filter(n => (n.title + " " + n.body).toLowerCase().includes(query.toLowerCase()));
  const connected = notes.filter(n => n.id !== note.id && (note.links.includes(n.id) || n.links.includes(note.id)));

  useEffect(() => {
    const el = dialog.current;
    el?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const sync = (e: StorageEvent) => { if (e.key === storageKey) setNotes(readNotes()); };
    window.addEventListener("storage", sync);
    return () => {
      el?.close();
      document.body.style.overflow = before;
      window.removeEventListener("storage", sync);
    };
  }, []);

  function update(transform: (items: Note[]) => Note[]) {
    const latest = saved ? readNotes() : notes;
    const next = transform(latest);
    setNotes(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setSaved(true); }
    catch { setSaved(false); }
  }
  function selectNote(noteId: string) { setId(noteId); setListOpen(false); }
  function newNote() {
    const fresh = { id: crypto.randomUUID(), title: "", body: "", links: [] };
    update(items => [fresh, ...items]);
    selectNote(fresh.id);
    setQuery("");
    requestAnimationFrame(() => titleInput.current?.focus());
  }
  function edit(fields: Partial<Pick<Note, "title" | "body">>) {
    update(items => items.map(n => n.id === note.id ? { ...n, ...fields } : n));
  }
  function connect(to: string) {
    if (!to) return;
    update(items => items.map(n => n.id === note.id ? { ...n, links: Array.from(new Set([...n.links, to])) } : n));
  }
  return <dialog className="notebook-dialog" ref={dialog} aria-labelledby="notebook-title" onCancel={onClose} onClick={e=>{if(e.target===dialog.current)onClose();}}>
    <div className="notebook-shell">
      <header className="notebook-bar"><div><BrandMark size={23}/><b id="notebook-title">My notebook</b></div><button type="button" className="icon-button" aria-label="Close notebook" onClick={onClose}><Icon name="close"/></button></header>
      <div className={'notebook-workspace ' + (listOpen ? "show-list":"")}>
        <aside className="note-list">
          <button className="new-note" onClick={newNote}><Icon name="plus" size={17}/> New note</button>
          <label className="search-field"><Icon name="search" size={17}/><input type="search" aria-label="Search notes" placeholder="Search notes" value={query} onChange={e=>setQuery(e.target.value)}/></label>
          <p className="micro">All notes <span>{notes.length}</span></p>
          <div className="note-rows">{matches.map(n=><button key={n.id} className={note.id===n.id?"selected":""} onClick={()=>selectNote(n.id)}><Icon name="file" size={16}/>{n.title.trim()||"Untitled note"}</button>)}
          {!matches.length && <p className="empty-notes">No notes match “{query}”.</p>}</div>
        </aside>
        <article className="editor">
          <div className="editor-top"><button onClick={()=>setListOpen(true)} className="mobile-notes"><Icon name="sidebar" size={16}/> All notes</button><span className="save-line">{saved?<><i/> On this device</>:"Browser storage unavailable"}</span></div>
          <label className="sr-only" htmlFor="note-title">Note title</label><input ref={titleInput} id="note-title" className="editor-title" value={note.title} onChange={e=>edit({title:e.target.value})} placeholder="Untitled note" autoComplete="off"/>
          <label className="sr-only" htmlFor="note-body">Note text</label><textarea id="note-body" value={note.body} onChange={e=>edit({body:e.target.value})} placeholder="Write down a thought…"/>
          <div className="linked-notes"><div className="micro"><Icon name="link" size={14}/> Connected notes</div><div>{connected.map(n=><button key={n.id} onClick={()=>selectNote(n.id)}>{n.title||"Untitled note"}<Icon name="upRight" size={12}/></button>)}</div>
            {notes.length > connected.length+1 && <select aria-label="Link a note" value="" onChange={e=>connect(e.target.value)}><option value="">+ Link a note</option>{notes.filter(n=>n.id!==note.id&&!connected.some(c=>c.id===n.id)).map(n=><option value={n.id} key={n.id}>{n.title||"Untitled note"}</option>)}</select>}
          </div>
        </article>
      </div>
    </div>
  </dialog>;
}
