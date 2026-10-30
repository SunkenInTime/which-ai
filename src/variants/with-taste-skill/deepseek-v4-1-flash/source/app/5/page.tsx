"use client";

import { useMemo, useState } from "react";
import { NOTES, backlinksOf } from "../lib/vault";
import Reveal from "../_components/Reveal";
import "@/generated/scoped-variant-css/with-taste-skill/deepseek-v4-1-flash/source/app/5/v5.css";

const FAQ = [
  ["Do I have to type brackets?", "No. Two brackets open the picker; selecting words turns them into a link in one keystroke."],
  ["Where are the files?", "In a folder you choose: one Markdown file per note, pictures beside them, no database."],
  ["What if I rename a note?", "Lattice rewrites every link that pointed at it, in the same pass. Nothing dangles."],
  ["Can two people share a vault?", "Through the folder: a shared drive, a git repository, or a sync service you already pay for."],
  ["How large does it get?", "Tested at forty thousand notes on a 2019 laptop. Search stays under forty milliseconds."],
  ["What am I paying for?", "Sync, the graph and the phone apps. The desktop app and your files are free without an account."],
  ["Does it open Obsidian vaults?", "Yes, and it writes files Obsidian reads back: plain Markdown, brackets, and nothing proprietary."],
];

const SLIP = [
  ["Monday", "Write the note", "10 seconds"],
  ["Monday", "Open the picker", "1 keystroke"],
  ["Midweek", "Choose the project", "3 seconds"],
  ["Midweek", "Write a next step", "30 seconds"],
  ["Friday", "Close the day", "1 minute"],
  ["Friday", "Open it again in March", "4 taps"],
];

export default function V5() {
  const [linked, setLinked] = useState(false);
  const [density, setDensity] = useState(4);
  const [showLinks, setShowLinks] = useState(true);
  const [credits, setCredits] = useState(false);

  const rows = useMemo(
    () => NOTES.filter((n) => ["Method", "Reading", "Practice"].includes(n.folder)).slice(0, density),
    [density],
  );

  return (
    <div className="v5">
      {/* ---------------- the first screen: a picture, and one rail across its middle ---------------- */}
      <header className="v5-hero">
        <img
          className="v5-hero__photo"
          src="/variants/with-taste-skill/deepseek-v4-1-flash/lattice-roof.jpg"
          alt="The glass and steel lattice roof of a great courtyard, seen from below."
          width={2400}
          height={1350}
        />
        <div className="v5-rail">
          <h1>
            Lattice, notes
            <br />
            that link both ways
          </h1>
          <p className="v5-rail__sub">
            In plain text, every note can point at any other, and the pointing is kept from both ends.
          </p>
          <div className="v5-rail__actions">
            <a className="v5-btn" href="#start">
              Start a vault
            </a>
            <a className="v5-link" href="#demo">
              See a note
            </a>
          </div>
        </div>
      </header>

      <main className="v5-page">
        {/* ---------------- a note, and what holds it ---------------- */}
        <section className="v5-panel" aria-labelledby="v5-panel-h">
          <Reveal as="h2" id="v5-panel-h" className="v5-h2">
            A note, and what holds it
          </Reveal>

          <div className="v5-panel__grid">
            <Reveal className="v5-panel__frame" delay={60}>
              <article className="v5-note" data-ui="">
                <p className="v5-note__folder">Work</p>
                <h3 className="v5-note__title">Meeting, 14 March</h3>
                <p className="v5-note__body">
                  Decided: the release moves to the 27th, the pricing page waits for trial data, and Sam owns the
                  migration note.
                </p>
                <p className="v5-note__body">
                  Not decided: who answers the support queue in April. See{" "}
                  <span className="v5-note__link">Projects</span> and{" "}
                  <span className="v5-note__link">The weekly review</span>.
                </p>
                <div className="v5-note__back">
                  <p>Linked from</p>
                  <ul>
                    <li>Projects I keep moving</li>
                    <li>The weekly review</li>
                  </ul>
                </div>
                <p className="v5-note__foot">meeting.md · 3 links out · 2 in</p>
              </article>
            </Reveal>

            <dl className="v5-legend">
              <Reveal>
                <dt>The title is the file name</dt>
                <dd>Rename it and Lattice renames the file. The links follow in the same pass.</dd>
              </Reveal>
              <Reveal delay={60}>
                <dt>Links are written, not stored</dt>
                <dd>The link sits in the text as Markdown, readable in any editor, and Lattice reads it back.</dd>
              </Reveal>
              <Reveal delay={120}>
                <dt>Backlinks are read from the vault</dt>
                <dd>Nothing is copied. The list at the foot of the note is computed when the note opens.</dd>
              </Reveal>
            </dl>
          </div>
        </section>

        {/* ---------------- the list, at true size, with its controls ---------------- */}
        <section className="v5-demo" id="demo" aria-labelledby="v5-demo-h">
          <Reveal as="h2" id="v5-demo-h" className="v5-h2">
            The list, with its controls
          </Reveal>
          <div className="v5-demo__grid">
            <Reveal className="v5-demo__stage" delay={60}>
              <div data-ui="">
                {rows.map((n) => (
                  <div className="v5-demo__row" key={n.id}>
                    <span className="v5-demo__row-title">{n.title}</span>
                    {showLinks && (
                      <span className="v5-demo__row-meta">
                        {n.links.length} out · {backlinksOf(n.id).length} in
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="v5-demo__controls" delay={120}>
              <div className="v5-ctl">
                <label htmlFor="v5-density">Notes shown</label>
                <input
                  id="v5-density"
                  type="range"
                  min={1}
                  max={7}
                  value={density}
                  onChange={(e) => setDensity(Number(e.target.value))}
                />
              </div>
              <div className="v5-ctl v5-ctl--row">
                <span id="v5-links-label">Link counts</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showLinks}
                  aria-labelledby="v5-links-label"
                  className="v5-switch"
                  onClick={() => setShowLinks((v) => !v)}
                >
                  <span />
                </button>
              </div>
              <div className="v5-ctl v5-ctl--row">
                <span id="v5-link-label">Link the first note</span>
                <button
                  type="button"
                  aria-pressed={linked}
                  aria-labelledby="v5-link-label"
                  className={`v5-linkbtn${linked ? " is-on" : ""}`}
                  onClick={() => setLinked((v) => !v)}
                >
                  {linked ? "Linked" : "Link"}
                </button>
              </div>
              <p className="v5-demo__count">
                {rows.length} notes in view · {rows.reduce((a, r) => a + r.links.length, 0)} links out
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- the process, printed as a slip ---------------- */}
        <section className="v5-process" aria-labelledby="v5-process-h">
          <Reveal className="v5-process__copy">
            <h2 id="v5-process-h" className="v5-h2">
              A week of notes
            </h2>
            <p>
              The method is not a system you adopt. It is the habit of putting the sentence down and saying what it is
              next to. This is the week that produced the note above.
            </p>
          </Reveal>

          <Reveal className="v5-slip" delay={80}>
            <div className="v5-slip__inner">
              {SLIP.map(([day, label, time], i) => (
                <div key={label}>
                  {(i === 0 || SLIP[i - 1][0] !== day) && <p className="v5-slip__day">{day}</p>}
                  <p className="v5-slip__row">
                    <span>{label}</span>
                    <span aria-hidden="true" className="v5-slip__dots" />
                    <span>{time}</span>
                  </p>
                </div>
              ))}
              <p className="v5-slip__total">
                <span>What you hold at the end</span>
                <span>a note found in March</span>
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------------- names in columns ---------------- */}
        <section className="v5-vault" aria-labelledby="v5-vault-h">
          <Reveal as="h2" id="v5-vault-h" className="v5-h2">
            In the sample vault
          </Reveal>
          <Reveal className="v5-vault__names" delay={60}>
            <p className="v5-vault__kind">Method</p>
            <ul>
              {NOTES.filter((n) => n.folder === "Method").map((n) => (
                <li key={n.id}>{n.title}</li>
              ))}
            </ul>
            <p className="v5-vault__kind">Reading</p>
            <ul>
              {NOTES.filter((n) => n.folder === "Reading").map((n) => (
                <li key={n.id}>{n.title}</li>
              ))}
            </ul>
            <p className="v5-vault__kind">Practice</p>
            <ul>
              {NOTES.filter((n) => n.folder === "Practice").map((n) => (
                <li key={n.id}>{n.title}</li>
              ))}
            </ul>
            <p className="v5-vault__kind">Elsewhere</p>
            <ul>
              {NOTES.filter((n) => ["Archive", "Walking", "Kitchen"].includes(n.folder)).map((n) => (
                <li key={n.id}>{n.title}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ---------------- a picture of the world ---------------- */}
        <section className="v5-picture" aria-labelledby="v5-picture-h">
          <Reveal className="v5-picture__text">
            <h2 id="v5-picture-h" className="v5-h2">
              The drawer was the idea
            </h2>
            <p>
              A card catalogue worked because every card had one address and one drawer, and because the drawer was
              small enough to hold a single thought. Lattice keeps the drawer and drops the address.
            </p>
            <a className="v5-link" href="#start">
              Start with one note
            </a>
          </Reveal>
          <Reveal className="v5-picture__media" delay={80}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/variants/with-taste-skill/deepseek-v4-1-flash/olivetti-dora-portable-typewriter-poster.jpg"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/variants/with-taste-skill/deepseek-v4-1-flash/olivetti-dora-portable-typewriter.webm" type="video/webm" />
            </video>
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-at-the-indiana-state-library.jpg"
              alt="A shelf of card catalogue drawers, each labelled with a range of names."
              width={1920}
              height={2560}
              loading="lazy"
            />
          </Reveal>
        </section>

        {/* ---------------- questions, set as reading text ---------------- */}
        <section className="v5-qs" aria-labelledby="v5-qs-h">
          <Reveal as="h2" id="v5-qs-h" className="v5-h2">
            Questions
          </Reveal>
          <Reveal className="v5-qs__list" delay={60}>
            {FAQ.map(([q, a]) => (
              <p key={q}>
                <strong>{q}</strong> {a}
              </p>
            ))}
          </Reveal>
        </section>
      </main>

      {/* ---------------- the closing, almost empty ---------------- */}
      <section className="v5-end" id="start" aria-labelledby="v5-end-h">
        <h2 id="v5-end-h">Open a folder and write the first note.</h2>
        <p>
          It will be a file in a folder you can open anywhere, with a name you chose. Nothing is uploaded and no account
          is needed.
        </p>
        <a
          className="v5-btn v5-btn--green"
          href="mailto:hello@lattice.example?subject=Start%20a%20Lattice%20vault&body=Send%20me%20the%20download%20for%20macOS%2C%20Windows%2C%20iOS%20and%20Android."
        >
          Get the app
        </a>
      </section>

      <footer className="v5-foot">
        <p className="v5-foot__mark">Lattice</p>
        <div className="v5-foot__cols">
          <p>
            A note-taking app for people who intend to read their notes again. Files you own, links kept both ways, no
            server in the middle.
          </p>
          <div>
            <button
              type="button"
              className="v5-foot__open"
              aria-expanded={credits}
              onClick={() => setCredits((v) => !v)}
            >
              {credits ? "Hide picture credits" : "Picture credits"}
            </button>
            {credits && (
              <p className="v5-foot__credits">
                <em>Glass and steel lattice roof</em> by Mika Ruusunen, Unsplash licence; <em>Card catalog at the
                Indiana State Library</em> by TBurmeister (CC BY-SA 4.0); <em>Olivetti Dora portable typewriter</em> by
                Erik Pålsson (CC BY 3.0), the latter two via Wikimedia Commons.
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
