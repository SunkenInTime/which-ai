"use client";

import { useMemo, useState } from "react";
import { memories } from "./data";

const suggestions = ["slower mornings", "garden", "attention"];

export function BrainSearch({ compact = false, id = "memory" }: { compact?: boolean; id?: string }) {
  const [query, setQuery] = useState("slower mornings");
  const [activeId, setActiveId] = useState<number | null>(1);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return memories;
    return memories.filter((memory) =>
      [memory.title, memory.body, memory.kind, ...memory.tags]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  const active =
    memories.find((memory) => memory.id === activeId) ?? results[0] ?? null;

  function chooseSuggestion(suggestion: string) {
    setQuery(suggestion);
    setActiveId(null);
  }

  return (
    <div className={`brain-search${compact ? " brain-search--compact" : ""}`} data-ui>
      <div className="brain-search__topbar">
        <div className="brain-search__brand"><span className="memory-mark" />Morrow <span>/ Personal space</span></div>
        <span className="brain-search__saved">All notes saved</span>
      </div>
      <div className="brain-search__workspace">
        <div className="brain-search__results-pane">
          <label className="brain-search__label" htmlFor={`memory-search-${id}`}>
            Ask your memory
          </label>
          <div className="brain-search__input-wrap">
            <span aria-hidden="true" className="search-glyph" />
            <input
              id={`memory-search-${id}`}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveId(null);
              }}
              placeholder="A word, a place, a feeling…"
              autoComplete="off"
            />
            <span className="brain-search__count">{results.length} {results.length === 1 ? "note" : "notes"}</span>
          </div>
          <div className="brain-search__suggestions" aria-label="Example searches">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => chooseSuggestion(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
          <div className="brain-search__results" aria-live="polite">
            {results.length ? (
              results.slice(0, 3).map((memory) => (
                <button
                  className={`memory-result${active?.id === memory.id ? " is-active" : ""}`}
                  key={memory.id}
                  onClick={() => setActiveId(memory.id)}
                  type="button"
                >
                  <span className="memory-result__kind">{memory.kind}</span>
                  <strong>{memory.title}</strong>
                  <span>{memory.date}</span>
                </button>
              ))
            ) : (
              <div className="brain-search__empty">
                <strong>No notes match “{query}” yet.</strong>
                <span>Try a broader word, or save this thought as a new note.</span>
              </div>
            )}
          </div>
        </div>
        {active && (
          <article className="memory-detail" key={active.id}>
            <div className="memory-detail__meta"><span>{active.kind}</span><span>{active.date}</span></div>
            <h3>{active.title}</h3>
            <p>{active.body}</p>
            <div className="memory-detail__tags">
              {active.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="memory-detail__related">
              <strong>Connected in your space</strong>
              {active.related.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
