"use client";

import { useId, useState } from "react";
import styles from "./styles.module.css";

type Note = { title: string; body: string; when: string };

const notes: Note[] = [
  { title: "Rye starter", body: "50g flour, 50g water, every 12 hours. Smells like green apple when it is ready to bake.", when: "Feb 2024" },
  { title: "Call with Priya", body: "When a launch slips, the first hour decides everything. Write the status update before the postmortem.", when: "Oct 2025" },
  { title: "Lisbon trip", body: "Flight on 6 June. Passport expires in July, so renew before booking anything else.", when: "Mar 2026" },
  { title: "Why sleep notes matter", body: "Wake time beats bedtime. Cold room, no screens after 10, and never negotiate with the alarm.", when: "Nov 2023" },
  { title: "Pricing thoughts", body: "Charge for the thing people would be sad to lose. For a notebook that is the archive, not the editor.", when: "Jan 2026" },
  { title: "Grandma’s soup", body: "Start with the bones, not the vegetables. Simmer four hours, add the dill at the very end.", when: "Dec 2022" },
];

const tries = ["sleep", "launch", "soup", "passport"];

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Mark({ text, q }: { text: string; q: string }) {
  if (!q.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escape(q.trim())})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.trim().toLowerCase() ? (
          <mark key={i} className={styles.mark}>
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function Search() {
  const [q, setQ] = useState("");
  const id = useId();
  const needle = q.trim().toLowerCase();
  const hits = needle
    ? notes.filter((n) => (n.title + " " + n.body).toLowerCase().includes(needle))
    : notes;

  return (
    <div className={styles.search}>
      <label htmlFor={id} className={styles.srOnly}>
        Search your notes
      </label>
      <input
        id={id}
        className={styles.input}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="What did I write about…"
        autoComplete="off"
      />
      <p className={styles.tries}>
        Try
        {tries.map((t) => (
          <button key={t} type="button" className={styles.chip} onClick={() => setQ(t)}>
            {t}
          </button>
        ))}
      </p>
      <p className={styles.count} aria-live="polite">
        {needle
          ? hits.length === 0
            ? `Nothing matches “${q.trim()}”. Check the spelling, or write the note now.`
            : `${hits.length} of ${notes.length} notes`
          : `${notes.length} notes in this notebook`}
      </p>
      <ul className={styles.results}>
        {hits.map((n) => (
          <li key={n.title} className={styles.result}>
            <div className={styles.resultHead}>
              <h3>
                <Mark text={n.title} q={q} />
              </h3>
              <span>{n.when}</span>
            </div>
            <p>
              <Mark text={n.body} q={q} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
