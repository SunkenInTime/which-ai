"use client";

import { useState } from "react";
import "@/generated/scoped-variant-css/with-design-skill/mistral-large-4/source/app/5/tapedesk.css";

const PINNED = [
  {
    title: "call the dentist",
    body: "Tuesday, before the trip. Ask about the chipped molar.",
    tape: "left",
    rotate: -2.5,
  },
  {
    title: "book: the memory palace",
    body: "Foer. Borrow from the library, don't buy it.",
    tape: "right",
    rotate: 1.8,
  },
  {
    title: "idea: notes that age",
    body: "What if a note got nicer the longer you kept it? Patina, not decay.",
    tape: "left",
    rotate: -1.2,
  },
];

export default function TapeDeskPage() {
  const [draft, setDraft] = useState("");

  return (
    <div className="tape">
      <header className="tape__top">
        <div className="tape__brand">Mnemosyne</div>
        <nav className="tape__nav" aria-label="Primary">
          <a href="#desk">The desk</a>
          <a href="#pinned">Pinned</a>
          <a href="#write">Write</a>
        </nav>
      </header>

      <main>
        <section className="tape__hero" id="desk">
          <div className="tape__hero-copy">
            <p className="tape__kicker">a second brain, kept by hand</p>
            <h1 className="tape__title">
              Some thoughts deserve
              <span className="tape__scribble">
                paper first.
                <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M4 9 C 60 3, 120 12, 170 7 C 220 2, 260 10, 296 5"
                    fill="none"
                    stroke="#a65a3a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="tape__lede">
              Mnemosyne feels like the desk you already have: a place to set
              things down, pin them where you can see them, and find them again
              by the mess you left them in. Type it here — it sticks.
            </p>
            <div className="tape__actions">
              <a className="tape__cta" href="#write">
                Try the first note
              </a>
              <a className="tape__ghost" href="#pinned">
                See what&rsquo;s pinned
              </a>
            </div>
          </div>

          <div className="tape__hero-note">
            <div className="tape__note tape__note--hero">
              <span className="tape__pin" aria-hidden="true" />
              <label className="tape__note-label" htmlFor="tape-draft">
                First note — {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </label>
              <textarea
                id="tape-draft"
                className="tape__textarea"
                rows={5}
                placeholder="Set it down here. It stays."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <div className="tape__note-foot">
                <span>{draft.length === 0 ? "empty, like a good desk should be" : `${draft.length} characters, kept`}</span>
                <span>{draft.length > 0 ? "pinned" : "unpinned"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="tape__pinned" id="pinned">
          <div className="tape__section-head">
            <h2 className="tape__h2">On the desk right now</h2>
            <p>Three things, held down with tape.</p>
          </div>
          <div className="tape__pin-grid">
            {PINNED.map((n) => (
              <article
                key={n.title}
                className="tape__note tape__note--pinned"
                style={{ transform: `rotate(${n.rotate}deg)` }}
              >
                <span className={`tape__tape tape__tape--${n.tape}`} aria-hidden="true" />
                <h3 className="tape__note-title">{n.title}</h3>
                <p className="tape__note-body">{n.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tape__how">
          <div className="tape__how-grid">
            <div className="tape__how-intro">
              <h2 className="tape__h2">How it sticks</h2>
              <p>
                No folders. No tags you forget. The desk remembers the mess
                for you.</p>
            </div>
            <ol className="tape__steps">
              <li>
                <span className="tape__step-no">1</span>
                <div>
                  <h3>Set it down</h3>
                  <p>One field, always open. A thought takes as long as it takes.</p>
                </div>
              </li>
              <li>
                <span className="tape__step-no">2</span>
                <div>
                  <h3>Pin it where you&rsquo;ll see it</h3>
                  <p>Notes stay where you left them, in the pile, on the desk.</p>
                </div>
              </li>
              <li>
                <span className="tape__step-no">3</span>
                <div>
                  <h3>Find it by the mess</h3>
                  <p>Search remembers roughly: a word, a week, a feeling.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="tape__write" id="write">
          <h2 className="tape__write-title">Your desk is empty.</h2>
          <p className="tape__write-copy">
            Good desks start empty. Leave an address and we&rsquo;ll send you a
            sticky note to get started.
          </p>
          <form className="tape__form" action="#write">
            <label className="tape__label" htmlFor="tape-email">
              Where to send the sticky note
            </label>
            <div className="tape__form-row">
              <input
                id="tape-email"
                type="email"
                required
                placeholder="you@example.com"
                className="tape__input"
              />
              <button type="submit" className="tape__cta">
                Send it
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="tape__footer">
        <span>Mnemosyne — keep it where you can see it</span>
        <span>Iteration 05 · The Tape Desk</span>
      </footer>
    </div>
  );
}
