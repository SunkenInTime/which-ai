"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icons";
import { blankNote, collections, type Note, writeNote } from "./notes";

export function Notebook({ notes, onEdit }: { notes: Note[]; onEdit: (n: Note) => void }) {
  const [filter, setFilter] = useState("All notes");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [list, setList] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => { if (showSearch) searchInput.current?.focus(); }, [showSearch]);
  const filtered = notes.filter(n => (filter === "All notes" || (filter === "Favorites" ? n.favorite : n.collection === filter)) && (n.title + " " + n.body).toLowerCase().includes(search.toLowerCase()));
  return <section className="notebook-section" id="notebook" aria-label="Interactive notebook">
    <div className="app-window">
      <div className="window-bar"><div className="window-lights" aria-hidden="true"><i/><i/><i/></div><span><Icon name="lock" size={13}/> Folio workspace</span></div>
      <div className="workspace">
        <aside className="sidebar">
          <div className="workspace-name"><span className="workspace-icon"><Icon name="notebook" size={17}/></span>My notebook</div>
          <nav aria-label="Notebook navigation">
            {["All notes", "Favorites"].map((name, i) => <button key={name} className={filter === name ? "side-selected" : ""} onClick={() => setFilter(name)}><Icon name={i ? "star" : "layers"} size={16}/>{name}<span>{i ? notes.filter(n => n.favorite).length : notes.length}</span></button>)}
            <p>Collections</p>
            {collections.map((name, i) => <button key={name} className={filter === name ? "side-selected" : ""} onClick={() => setFilter(name)}><i className={'collection-dot c' + i}/>{name}</button>)}
          </nav>
        </aside>
        <div className="library">
          <div className="library-head"><h2>{filter}</h2><button className="new-note" onClick={() => onEdit(blankNote())}><Icon name="plus" size={15}/>New note</button></div>
          <div className="library-tools">
            <div className="note-count"><Icon name="folder" size={15}/>{filtered.length} {filtered.length === 1 ? "note" : "notes"}</div>
            <div className="view-tools"><button aria-label="Search notes" aria-expanded={showSearch} className={showSearch ? "active" : ""} onClick={() => {setShowSearch(!showSearch);setSearch("");}}><Icon name="search" size={15}/></button><span/><button aria-label="Grid view" aria-pressed={!list} className={!list ? "active" : ""} onClick={() => setList(false)}><Icon name="grid" size={14}/></button><button aria-label="List view" aria-pressed={list} className={list ? "active" : ""} onClick={() => setList(true)}><Icon name="list" size={16}/></button></div>
          </div>
          {showSearch && <input className="note-search" ref={searchInput} type="search" aria-label="Search titles and text" placeholder="Search titles and text…" value={search} onChange={e => setSearch(e.target.value)}/>}
          <div className={'note-grid' + (list ? " list-view" : "")}>
            {filtered.map(n => <button className={'note-card' + (!n.image ? " text-card" : "")} key={n.id} onClick={() => onEdit(n)}>
              {n.image && <div className="note-image"><Image src={'/variants/with-gemini-design-skill/gpt-6.2-astra/art/' + n.image + '.webp'} alt="" width={400} height={220}/></div>}
              <div className="note-card-copy">{!n.image && <Icon name="pen" size={18}/>}<h3>{n.title}</h3><p>{n.body.split("\n")[0]}</p><span className="note-origin"><i className={'collection-dot c' + collections.indexOf(n.collection)}/>{n.collection}</span></div>
            </button>)}
          </div>
          {filtered.length === 0 && <p className="empty-notes">{search ? "No matching notes. Try another word." : "Notes you add here will appear in this collection."}</p>}
        </div>
      </div>
    </div>
  </section>;
}

export function NoteEditor({ note, notes, close, onSave, onOpen }: { note: Note; notes: Note[]; close: () => void; onSave: (n: Note) => void; onOpen: (n: Note) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(note);
  const [error, setError] = useState("");
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus({preventScroll:true}); };
  }, []);
  function persist() {
    if (!draft.title.trim()) { setError("Give your note a title first."); return; }
    const saved = { ...draft, title: draft.title.trim(), id: draft.id || crypto.randomUUID() };
    try { writeNote(saved); return saved; }
    catch { setError("This browser could not save your note. Check its storage settings and try again."); }
  }
  function save(e: FormEvent) {
    e.preventDefault();
    const saved = persist();
    if (saved) onSave(saved);
  }
  const related = notes.find(n => n.id === draft.linked);
  return <dialog ref={ref} className="editor" aria-label={note.id ? "Edit note" : "New note"} onCancel={e => {e.preventDefault();close();}}>
    <form onSubmit={save}>
      <div className="editor-top"><span><Icon name="notebook"/> My notebook</span><button className="icon-btn" type="button" onClick={close} aria-label="Close note"><Icon name="x"/></button></div>
      <label className="sr-only" htmlFor="note-title">Note title</label><input id="note-title" className="title-input" placeholder="Untitled note" required maxLength={150} value={draft.title} onChange={e => setDraft({...draft, title:e.target.value})} autoFocus={!note.id}/>
      <label className="sr-only" htmlFor="note-text">Note text</label><textarea id="note-text" placeholder="What’s on your mind?" value={draft.body} onChange={e => setDraft({...draft, body:e.target.value})}/>
      <div className="editor-fields"><label>Collection<select value={draft.collection} onChange={e => setDraft({...draft, collection:e.target.value})}>{collections.map(c => <option key={c}>{c}</option>)}</select></label><label>Link to a note<select value={draft.linked} onChange={e => setDraft({...draft, linked:e.target.value})}><option value="">No linked note</option>{notes.filter(n => n.id !== draft.id).map(n => <option key={n.id} value={n.id}>{n.title}</option>)}</select></label></div>
      {related && <button className="related-link" type="button" onClick={() => {if (persist()) onOpen(related);}}><Icon name="link" size={16}/>Open “{related.title}”<Icon name="diagonal" size={14}/></button>}
      {error && <p role="alert" className="error">{error}</p>}
      <div className="editor-bottom"><button type="button" className={'favorite-control' + (draft.favorite ? " is-favorite" : "")} aria-pressed={draft.favorite} onClick={() => setDraft({...draft, favorite:!draft.favorite})}><Icon name="star" size={17}/>{draft.favorite ? "In favorites" : "Favorite"}</button><button className="cta compact" type="submit">Save note<Icon name="check" size={16}/></button></div>
    </form>
  </dialog>;
}
