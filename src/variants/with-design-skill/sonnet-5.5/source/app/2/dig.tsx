"use client";

import { useId, useMemo, useState } from "react";
import s from "./page.module.css";

type Fossil = { id: string; title: string; keys: string[] };
type Layer = { id: string; label: string; tone: string; fossils: Fossil[] };

const layers: Layer[] = [
  {
    id: "today",
    label: "Today",
    tone: "sage",
    fossils: [
      { id: "fan", title: "Call plumber about the fan", keys: ["plumber", "bathroom", "fan", "call"] },
      { id: "clip", title: "Clip: The rebuilt memory", keys: ["memory", "forgetting", "recall", "clip"] },
      { id: "standup", title: "Standup: launch moved to Friday", keys: ["launch", "work", "friday", "standup"] },
    ],
  },
  {
    id: "month",
    label: "Last month",
    tone: "fog",
    fossils: [
      { id: "site", title: "Priya: site visit", keys: ["priya", "island", "kitchen", "visit"] },
      { id: "boiler", title: "Boiler service, booked", keys: ["boiler", "heating", "service", "plumber"] },
      { id: "ch4", title: "Chapter 4 notes", keys: ["book", "reading", "chapter"] },
    ],
  },
  {
    id: "year",
    label: "Last year",
    tone: "slate",
    fossils: [
      { id: "lisbon", title: "Lisbon: restaurants to try", keys: ["lisbon", "trip", "travel", "food", "portugal"] },
      { id: "talk", title: "Talk outline: memory and habit", keys: ["talk", "memory", "habit", "forgetting", "slides"] },
      { id: "tax", title: "Tax receipts checklist", keys: ["tax", "receipts", "money"] },
    ],
  },
  {
    id: "three",
    label: "3 years ago",
    tone: "bedrock",
    fossils: [
      { id: "kitchen", title: "Kitchen quote, Marlowe & Sons", keys: ["kitchen", "counter", "counters", "worktop", "oak", "quote", "decide", "decided"] },
      { id: "bread", title: "Sourdough, week 3", keys: ["bread", "dough", "sourdough", "bake", "baking"] },
      { id: "piano", title: "Piano: scales plan", keys: ["piano", "music", "scales", "practice"] },
    ],
  },
  {
    id: "six",
    label: "6 years ago",
    tone: "deep",
    fossils: [
      { id: "thesis", title: "Thesis idea: forgetting curves", keys: ["thesis", "forgetting", "memory", "idea", "curves"] },
      { id: "bike", title: "Bike route to the coast", keys: ["bike", "route", "coast", "cycling"] },
      { id: "dad", title: "Letter to Dad, draft", keys: ["letter", "dad", "family"] },
    ],
  },
];

const suggestions = ["kitchen", "bread", "Priya", "forgetting"];

const STOP = new Set(["what", "did", "i", "the", "about", "a", "an", "of", "to", "my", "we", "do", "is", "was", "and", "for", "in"]);

function tokens(q: string) {
  return q
    .toLowerCase()
    .split(/[^a-z0-9&]+/)
    .filter((t) => t && !STOP.has(t));
}

function matches(f: Fossil, toks: string[]) {
  if (toks.length === 0) return false;
  const hay = `${f.title.toLowerCase()} ${f.keys.join(" ")}`;
  return toks.some((t) => hay.includes(t));
}

/**
 * Hero search + core sample. Renders as a fragment so the search block and the
 * core become direct children of the hero grid.
 */
export function Dig() {
  const [q, setQ] = useState("");
  const id = useId();
  const toks = useMemo(() => tokens(q), [q]);

  const hits = useMemo(() => {
    const out: { fossil: Fossil; layer: Layer; score: number }[] = [];
    for (const layer of layers)
      for (const fossil of layer.fossils)
        if (matches(fossil, toks)) {
          // A word in the title beats a word that only appears in the note's keywords.
          const title = fossil.title.toLowerCase();
          const score = toks.filter((t) => title.includes(t)).length * 2 + 1;
          out.push({ fossil, layer, score });
        }
    return out.sort((a, b) => b.score - a.score);
  }, [toks]);

  const searching = toks.length > 0;

  let status: React.ReactNode;
  if (!searching) {
    status = "Five layers of notes, six years deep. Search for something you've forgotten.";
  } else if (hits.length === 0) {
    status = "No notes found. Try one of the suggestions above.";
  } else {
    const first = hits[0];
    status = (
      <>
        Found <b>{first.fossil.title}</b>, written {first.layer.label.toLowerCase()}.
        {hits.length > 1 && ` ${hits.length - 1} more nearby.`}
      </>
    );
  }

  return (
    <>
      <div className={s.search}>
        <form
          role="search"
          className={s.field}
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor={id} className={s.srOnly}>
            Search your notes
          </label>
          <input
            id={id}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="What did I decide about the counters?"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>
        <p className={s.tryRow}>
          Try
          {suggestions.map((t) => (
            <button
              key={t}
              type="button"
              className={s.suggest}
              onClick={() => setQ(t)}
            >
              {t}
            </button>
          ))}
        </p>
        <p className={s.status} aria-live="polite">
          {status}
        </p>
      </div>

      <ol className={s.core} aria-label="A core sample of your notes, newest at the top">
        {layers.map((layer) => (
          <li key={layer.id} className={s.layer} data-tone={layer.tone}>
            <span className={s.layerLabel}>{layer.label}</span>
            <ul className={s.fossils}>
              {layer.fossils.map((f) => {
                const hit = searching && matches(f, toks);
                return (
                  <li
                    key={f.id}
                    className={s.fossil}
                    data-hit={hit ? "true" : undefined}
                    data-dim={searching && !hit ? "true" : undefined}
                  >
                    {f.title}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}
