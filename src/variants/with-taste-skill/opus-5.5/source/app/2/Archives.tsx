"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { KeyboardEvent } from "react";
import styles from "./page.module.css";

const ARCHIVES = [
  {
    id: "brussels",
    tab: "Brussels",
    src: "/variants/with-taste-skill/opus-5.5/v2/brussels-rbu-1900.jpg",
    w: 1161,
    h: 971,
    alt: "Black-and-white photograph of a long room lined with card cabinets, women at desks writing and sorting index cards",
    caption: "The staff of the Répertoire Bibliographique Universel at work, Brussels, about 1900.",
    text: "In 1895 Paul Otlet and Henri La Fontaine began a card index of everything ever published. Their Répertoire grew to about twelve million cards, and anyone could send it a question by post.",
    position: "50% 40%",
  },
  {
    id: "munich",
    tab: "Munich",
    src: "/variants/with-taste-skill/opus-5.5/v2/munich-tll-slips.jpg",
    w: 1920,
    h: 1280,
    alt: "Rows of labelled cardboard slip boxes on metal shelves, each box marked with the Latin words it holds",
    caption: "Slip boxes of the Thesaurus Linguae Latinae, Munich, 2019.",
    text: "Since 1894 the Thesaurus Linguae Latinae has kept a paper slip for every surviving use of every Latin word. About ten million of them, in boxes, are still worked through today.",
    position: "40% 50%",
  },
  {
    id: "washington",
    tab: "Washington",
    src: "/variants/with-taste-skill/opus-5.5/v2/washington-card-division.jpg",
    w: 1920,
    h: 1531,
    alt: "Black-and-white photograph of a high room filled with long tables of catalogue cards in rows, clerks sorting them",
    caption: "The Card Division of the Library of Congress, Washington, between 1900 and 1920.",
    text: "From 1901 the Library of Congress printed its catalogue cards and sold them to other libraries, so one card, written once, stood in thousands of drawers at the same time.",
    position: "50% 60%",
  },
];

export default function Archives() {
  const [current, setCurrent] = useState(0);
  const a = ARCHIVES[current];

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (current + (e.key === "ArrowRight" ? 1 : ARCHIVES.length - 1)) % ARCHIVES.length;
    setCurrent(next);
    document.getElementById(`v2-tab-${ARCHIVES[next].id}`)?.focus();
  }

  return (
    <div className={styles.archives}>
      <figure className={styles.plate} data-reveal style={{ "--i": 0 } as React.CSSProperties}>
        <div className={styles.plateFrame}>
          {ARCHIVES.map((x, i) => (
            <img
              key={x.id}
              src={x.src}
              width={x.w}
              height={x.h}
              alt={i === current ? x.alt : ""}
              aria-hidden={i === current ? undefined : true}
              loading="lazy"
              decoding="async"
              className={`${styles.plateImg} ${i === current ? styles.plateOn : ""}`}
              style={{ objectPosition: x.position }}
            />
          ))}
        </div>
        <figcaption className={styles.caption}>{a.caption}</figcaption>
      </figure>

      <div className={styles.archText}>
        <div className={styles.archTabs} role="tablist" aria-label="Three card archives" onKeyDown={onKey}>
          {ARCHIVES.map((x, i) => (
            <button
              key={x.id}
              id={`v2-tab-${x.id}`}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-controls="v2-archive-panel"
              tabIndex={i === current ? 0 : -1}
              className={styles.archTab}
              onClick={() => setCurrent(i)}
            >
              {x.tab}
            </button>
          ))}
        </div>

        <div className={styles.archBody} id="v2-archive-panel" role="tabpanel" aria-labelledby={`v2-tab-${a.id}`}>
          <h2 className={styles.archHeading} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Second brains,<br /> made of cards
          </h2>
          <p key={a.id} className={styles.archCopy}>{a.text}</p>
          <p className={styles.archClose} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            Engram keeps the habit and drops the walking. You write the card; the drawer brings the right ones back to you.
          </p>
        </div>

        <div className={styles.archActions} data-reveal style={{ "--i": 3 } as React.CSSProperties}>
          <a className={styles.cellPrimary} href="#download">Download Engram</a>
          <a className={styles.cellSecondary} href="#how">How it works</a>
        </div>
      </div>
    </div>
  );
}
