"use client";

import { useState } from "react";

const notes = [
  { title: "The café with the blue chairs", detail: "A good place to write when I need a fresh start.", type: "Place", date: "Sep 19", keywords: "cafe coffee writing place blue chairs" },
  { title: "Things Maya said about belonging", detail: "Make people feel at home before asking them to learn.", type: "Conversation", date: "Sep 12", keywords: "maya belonging workshop people" },
  { title: "A book on paying attention", detail: "Noticing is a practice, not a personality trait.", type: "Reading", date: "Aug 28", keywords: "book attention noticing read" },
  { title: "Ideas for the autumn workshop", detail: "Start with a shared question, then let people wander.", type: "Project", date: "Aug 17", keywords: "autumn workshop ideas creative" },
];

export function SearchDemo() {
  const [query, setQuery] = useState("");
  const filtered = notes.filter((note) => `${note.title} ${note.detail} ${note.keywords}`.toLowerCase().includes(query.toLowerCase().trim()));

  return (
    <div className="v4-demo" id="search-demo">
      <div className="v4-demo-head"><span className="v4-demo-logo">✳</span><span>Search your space</span><span className="v4-demo-shortcut">⌘ K</span></div>
      <label className="v4-search-label" htmlFor="notes-search">Find a note</label>
      <div className="v4-search-field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><input id="notes-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Maya” or “workshop”" autoComplete="off" /></div>
      <div className="v4-results-heading">{query ? `${filtered.length} ${filtered.length === 1 ? "result" : "results"}` : "Recent notes"}</div>
      <div className="v4-results" aria-live="polite">{filtered.length ? filtered.map((note) => <div className="v4-result" key={note.title}><div><span className="v4-result-type">{note.type}</span><h3>{note.title}</h3><p>{note.detail}</p></div><time>{note.date}</time></div>) : <p className="v4-empty">No notes found. Try “Maya,” “book,” or “workshop.”</p>}</div>
      <div className="v4-demo-foot">A sample of what your second brain can remember.</div>
    </div>
  );
}
