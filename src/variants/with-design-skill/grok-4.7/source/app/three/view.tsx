"use client";

import { useState } from "react";
import { Cardo, Public_Sans } from "next/font/google";
import styles from "./three.module.css";

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-cardo",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

const cards = [
  {
    id: "sleep",
    title: "Sleep",
    filed: "Filed 3 Feb",
    count: "11 notes",
    body: "Waking, nights, and the hour when a thought comes back uninvited. Quire pulls this card when a new note mentions rest, dark, or morning.",
    seeAlso: ["cities", "letters"],
  },
  {
    id: "cities",
    title: "Cities",
    filed: "Filed 12 Jan",
    count: "18 notes",
    body: "Streets, thresholds, and the walk between two places. The oldest note is the bakery corner, and it still comes forward when you write about a street.",
    seeAlso: ["sleep", "recipes"],
  },
  {
    id: "recipes",
    title: "Recipes",
    filed: "Filed 19 Mar",
    count: "9 notes",
    body: "Food written down for the feeling that came with it. Measurements can be missing. Sunday soup is the card retrieved most often.",
    seeAlso: ["cities", "letters"],
  },
  {
    id: "letters",
    title: "Letters",
    filed: "Filed 2 Apr",
    count: "7 notes",
    body: "Things said to a person, including the ones never sent. Quire links each letter to the place where it was written.",
    seeAlso: ["cities", "sleep"],
  },
];

export function DrawerPage() {
  const [activeId, setActiveId] = useState(cards[1].id);
  const [started, setStarted] = useState(false);
  const active = cards.find((card) => card.id === activeId) ?? cards[1];

  function move(step: number) {
    const index = cards.findIndex((card) => card.id === activeId);
    const next = cards[(index + step + cards.length) % cards.length];
    setActiveId(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  }

  return (
    <main
      className={`${styles.page} ${cardo.variable} ${publicSans.variable}`}
    >
      <div className={styles.drawer}>
        <p className={styles.label}>Quire</p>
        <p className={styles.pitch}>
          Pull a card. Quire keeps a second brain the way a catalog keeps a
          subject: one cluster, ready to come forward.
        </p>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Catalog cards"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          {cards.map((card) => {
            const selected = card.id === active.id;
            return (
              <button
                key={card.id}
                id={`tab-${card.id}`}
                type="button"
                role="tab"
                className={selected ? styles.tabActive : styles.tab}
                aria-selected={selected}
                aria-controls="catalog-card"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(card.id)}
              >
                {card.title}
              </button>
            );
          })}
        </div>
        <div className={styles.stack}>
          <article
            id="catalog-card"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className={styles.card}
          >
            <h1 className={styles.title}>{active.title}</h1>
            <p className={styles.body}>{active.body}</p>
            <p className={styles.meta}>
              {active.filed}, {active.count}
            </p>
            <div className={styles.seeAlso}>
              {active.seeAlso.map((id) => {
                const related = cards.find((card) => card.id === id);
                if (!related) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    className={styles.cross}
                    onClick={() => setActiveId(id)}
                  >
                    See also {related.title}
                  </button>
                );
              })}
            </div>
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
          </article>
          <div className={styles.peek} aria-hidden="true" />
          <div className={styles.peekDeep} aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
