"use client";

import { useState } from "react";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/4/pantry.module.css";

type Kind = "kitchen" | "reading" | "work" | "travel" | "inbox";

type Jar = {
  id: string;
  title: string;
  kind: Kind;
  year: string;
  excerpt: string;
};

const KINDS: { kind: Kind; label: string }[] = [
  { kind: "kitchen", label: "Kitchen" },
  { kind: "reading", label: "Reading" },
  { kind: "work", label: "Work" },
  { kind: "travel", label: "Travel" },
  { kind: "inbox", label: "Unsorted" },
];

const SHELVES: Jar[][] = [
  [
    {
      id: "brine",
      title: "Brine ratios",
      kind: "kitchen",
      year: "2022",
      excerpt:
        "Five percent for crisp dills, eight for the sour ones. Weigh the salt. Measuring by volume was never consistent.",
    },
    {
      id: "solaris",
      title: "Solaris, chapter 3",
      kind: "reading",
      year: "2025",
      excerpt:
        "Marked the passage on memory and the ocean. Re-read it before the seminar, because the argument is about what counts as knowing.",
    },
    {
      id: "launch",
      title: "Launch plan, draft 4",
      kind: "work",
      year: "2026",
      excerpt:
        "Cut the second onboarding flow. Keep the export button, since most of the interviews asked for it by name.",
    },
    {
      id: "lisbon",
      title: "Lisbon in May",
      kind: "travel",
      year: "2023",
      excerpt:
        "Take the morning tram 28. It is slow on purpose. Notes on which pastry shops were worth the detour.",
    },
  ],
  [
    {
      id: "dal",
      title: "Dal without soaking",
      kind: "kitchen",
      year: "2024",
      excerpt:
        "Pressure cooker, twenty minutes, red lentils only. Add the tempering last, and do not skip it.",
    },
    {
      id: "index",
      title: "The index is the book",
      kind: "inbox",
      year: "2026",
      excerpt:
        "Unsorted. Clear jars hold notes that have not been labeled yet. File it once you know which shelf it belongs on.",
    },
    {
      id: "interview",
      title: "Interview questions",
      kind: "work",
      year: "2025",
      excerpt:
        "Ask what people stopped doing, not what they like. Keep the follow-ups short so the quiet has room.",
    },
    {
      id: "soil",
      title: "Soil is a food web",
      kind: "reading",
      year: "2026",
      excerpt:
        "The decomposers are the whole point. Revisit this before planning the beds, and link it to the garden plan.",
    },
  ],
];

const JARS = SHELVES.flat();

export function Shelf() {
  const [selectedId, setSelectedId] = useState(JARS[0].id);
  const selected = JARS.find((jar) => jar.id === selectedId) ?? JARS[0];
  const sameKind = JARS.filter(
    (jar) => jar.kind === selected.kind && jar.id !== selected.id,
  );

  return (
    <div className={styles.pantry}>
      {SHELVES.map((shelf, index) => (
        <div key={index} className={styles.shelfUnit}>
          <ul className={styles.shelf}>
            {shelf.map((jar) => {
              const pressed = jar.id === selectedId;

              return (
                <li key={jar.id}>
                  <button
                    type="button"
                    className={styles.jar}
                    data-kind={jar.kind}
                    aria-pressed={pressed}
                    aria-label={`${jar.title}, ${jar.year}`}
                    onClick={() => setSelectedId(jar.id)}
                  >
                    <span className={styles.lid} aria-hidden="true" />
                    <span className={styles.glass} aria-hidden="true">
                      <span className={styles.label}>
                        <span className={styles.labelTitle}>{jar.title}</span>
                        <span className={styles.labelYear}>{jar.year}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={styles.plank} aria-hidden="true" />
        </div>
      ))}

      <ul className={styles.key} aria-label="Jar colors">
        {KINDS.map(({ kind, label }) => (
          <li key={kind}>
            <span className={styles.swatch} data-kind={kind} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      <section className={styles.detail} aria-live="polite" aria-label="Open jar">
        <div>
          <p className={styles.detailKind}>
            {KINDS.find((k) => k.kind === selected.kind)?.label}, {selected.year}
          </p>
          <h3 className={styles.detailTitle}>{selected.title}</h3>
        </div>
        <div>
          <p className={styles.detailExcerpt}>{selected.excerpt}</p>
          {sameKind.length > 0 && (
            <p className={styles.sameShelf}>
              More in {KINDS.find((k) => k.kind === selected.kind)?.label}:{" "}
              {sameKind.map((jar, index) => (
                <span key={jar.id}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => setSelectedId(jar.id)}
                  >
                    {jar.title}
                  </button>
                  {index < sameKind.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
