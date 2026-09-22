"use client";

import { FormEvent, useEffect, useState } from "react";

type SavedNote = { id: string; text: string; createdAt: number };
const storageKey = "margin-demo-notes";

export function QuickCapture() {
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setNotes(JSON.parse(saved) as SavedNote[]);
        setStatus("ready");
      } catch {
        setStatus("error");
        setMessage("Your browser could not load saved notes. Try again after enabling local storage.");
      }
    });
    return () => { cancelled = true; };
  }, []);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) {
      setMessage("Write a thought before saving it.");
      return;
    }
    setStatus("saving");
    try {
      const updated = [{ id: crypto.randomUUID(), text, createdAt: Date.now() }, ...notes];
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
      setNotes(updated);
      setDraft("");
      setMessage("Saved to this browser.");
      setStatus("ready");
    } catch {
      setStatus("error");
      setMessage("Could not save this note. Check that local storage is available.");
    }
  }

  function remove(id: string) {
    try {
      const updated = notes.filter((note) => note.id !== id);
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
      setNotes(updated);
      setMessage("Note removed.");
    } catch {
      setMessage("Could not remove this note. Please try again.");
    }
  }

  return (
    <div className="capture-widget">
      <form onSubmit={save} noValidate>
        <label htmlFor="capture-note">A thought to keep</label>
        <textarea
          id="capture-note"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            if (message) setMessage("");
          }}
          placeholder="An idea, a quote, a question..."
          rows={4}
          maxLength={500}
          disabled={status === "loading" || status === "saving"}
          aria-describedby="capture-help capture-message"
        />
        <div className="capture-actions">
          <span id="capture-help">A small demo. Notes stay in this browser.</span>
          <button type="submit" disabled={status === "loading" || status === "saving"}>
            {status === "saving" ? "Saving..." : "Save thought"}
          </button>
        </div>
        <p id="capture-message" className="capture-message" role="status">{message}</p>
      </form>
      <div className="capture-saved">
        <h3>Your thoughts</h3>
        {status === "loading" ? (
          <div className="capture-skeleton" aria-label="Loading saved notes" />
        ) : notes.length === 0 ? (
          <p className="capture-empty">Your first thought will appear here.</p>
        ) : (
          <ul>
            {notes.slice(0, 3).map((note) => (
              <li key={note.id}>
                <p>{note.text}</p>
                <button type="button" onClick={() => remove(note.id)} aria-label={`Remove note: ${note.text.slice(0, 40)}`}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
