"use client";

import { useState } from "react";
import { Familjen_Grotesk } from "next/font/google";
import styles from "./four.module.css";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const stations = [
  {
    id: "bakery",
    name: "Bakery",
    x: 14,
    y: 46,
    place: "right",
    path: "On the path Returns.",
    note: "I passed it again and almost went in. The note is about returning, not about bread.",
  },
  {
    id: "repetition",
    name: "Repetition",
    x: 36,
    y: 22,
    place: "above",
    path: "On the path Returns.",
    note: "The same corner, the same hour. I keep writing this down as if it were new.",
  },
  {
    id: "bridge",
    name: "Bridge",
    x: 18,
    y: 66,
    place: "right",
    path: "On the path Addressed.",
    note: "I told you the water looked like metal. I was talking to you, not to the page.",
  },
  {
    id: "soup",
    name: "Sunday soup",
    x: 82,
    y: 20,
    place: "above",
    path: "Where Returns and Addressed meet.",
    note: "Both paths end here: the warmth I kept, and the person I wanted to tell.",
  },
  {
    id: "letter",
    name: "Letter",
    x: 68,
    y: 58,
    place: "below",
    path: "On the path Addressed.",
    note: "I wrote it and did not send it. It still counts as something addressed to you.",
  },
] as const;

const placeClass = {
  right: styles.placeRight,
  left: styles.placeLeft,
  below: styles.placeBelow,
  above: styles.placeAbove,
} as const;

export function SurveyPage() {
  const [activeId, setActiveId] = useState("soup");
  const [started, setStarted] = useState(false);
  const active = stations.find((station) => station.id === activeId) ?? stations[3];

  return (
    <main className={`${styles.page} ${familjen.className}`}>
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.name}>Quire</p>
          <h1 className={styles.title}>
            Five notes. Two paths. They meet at Sunday soup.
          </h1>
        </div>
        <div className={styles.mapWrap}>
          <p className={styles.mapLabel}>
            A map of five notes. Returns stays with things that come back.
            Addressed stays with things said to someone. Choose a note.
          </p>
          <div className={styles.map}>
            <svg
              className={styles.routes}
              viewBox="0 0 100 80"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className={styles.returns}
                pathLength="1"
                d="M 14 46 C 22 30, 28 24, 36 22 C 52 18, 66 12, 82 20"
              />
              <path
                className={styles.addressed}
                pathLength="1"
                d="M 18 66 C 36 72, 52 68, 68 58 C 80 50, 90 34, 82 20"
              />
            </svg>
            {stations.map((station) => {
              const pressed = station.id === active.id;
              return (
                <button
                  key={station.id}
                  type="button"
                  className={`${styles.station} ${placeClass[station.place]}`}
                  style={{
                    left: `${station.x}%`,
                    top: `${(station.y / 80) * 100}%`,
                  }}
                  aria-pressed={pressed}
                  onClick={() => setActiveId(station.id)}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.stationName}>{station.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        <article className={styles.note} aria-live="polite">
          <h2 className={styles.noteTitle}>{active.name}</h2>
          <p className={styles.noteBody}>{active.note}</p>
          <p className={styles.notePath}>{active.path}</p>
        </article>
        <ul className={styles.legend}>
          <li>
            <span className={styles.swatchReturns} aria-hidden="true" />
            Returns
          </li>
          <li>
            <span className={styles.swatchAddressed} aria-hidden="true" />
            Addressed
          </li>
        </ul>
        <div className={styles.action}>
          {started ? (
            <p className={styles.status} role="status">
              Notebook started. This preview keeps it on this page only.
            </p>
          ) : (
            <button
              type="button"
              className={styles.start}
              onClick={() => setStarted(true)}
            >
              Start a notebook
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
