"use client";

import { useState, type CSSProperties } from "react";
import s from "./page.module.css";

const FAQ = [
  {
    tab: "Storage",
    q: "Where are my notes stored?",
    a: "In a folder on your own disk, ~/Engram by default, as plain Markdown files with their pictures and PDFs beside them. If you turn on Sync, an encrypted copy travels through our servers so your other devices can fetch it. We hold the copy; we can’t read it.",
  },
  {
    tab: "Privacy",
    q: "How can resurfacing work without sending my notes anywhere?",
    a: "A small language model, about 80 MB, runs on your computer and your phone. It reads your notes where they are and keeps its index beside them, so finding the related notes for the margin never needs a connection, an account or our servers.",
  },
  {
    tab: "Import",
    q: "Can I bring my notes from Notion, Evernote, Apple Notes or Obsidian?",
    a: "Yes. Engram imports Notion exports, Evernote .enex files, Apple Notes and Obsidian vaults, and any folder of Markdown. Links between notes are kept, and attachments come along. Most libraries import in a few minutes.",
  },
  {
    tab: "If we close",
    q: "What happens to my notes if Engram shuts down?",
    a: "Nothing happens to them. They are ordinary files in a folder you own, readable by any text editor. The free app keeps working without our servers, and you can stop paying for Sync and copy the folder anywhere.",
  },
  {
    tab: "Offline",
    q: "Does it work without a connection?",
    a: "Everything works offline: writing, linking, search, resurfacing and the morning notes from your past. Only Sync needs a connection, and it catches up on its own when you are back.",
  },
  {
    tab: "Sharing",
    q: "Can I share a note, or a whole vault?",
    a: "You can publish a single note as a web page and unpublish it whenever you like. The Family plan adds one shared vault for the house, alongside a private vault for each person.",
  },
  {
    tab: "Students",
    q: "Is there a discount for students?",
    a: "Sync is free for students and teachers while they have a school or university email address. The free plan has no limits on notes, links or resurfacing for anyone.",
  },
];

export default function FaqCards() {
  const [open, setOpen] = useState(0);

  return (
    <section className={s.faq} id="questions" aria-labelledby="faq-title">
      <h2 id="faq-title" className={s.headLarge} data-reveal>
        questions, asked
      </h2>
      <div className={s.cards}>
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.tab}
              className={`${s.card} ${i % 2 ? s.cardAlt : ""} ${isOpen ? s.cardOpen : ""}`}
              style={{ "--n": i, zIndex: i + 1 } as CSSProperties}
            >
              <button
                type="button"
                className={s.cardHead}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(i)}
              >
                <span className={s.cardTab}>{item.tab}</span>
                <span className={s.cardQ}>{item.q}</span>
              </button>
              <div className={s.cardBody} id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
