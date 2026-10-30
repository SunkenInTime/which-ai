"use client";

import { useState } from "react";
import { NOTES, byId } from "../lib/vault";
import Reveal from "../_components/Reveal";
import "@/generated/scoped-variant-css/with-taste-skill/deepseek-v4-1-flash/source/app/3/v3.css";

const PANEL_NOTES = [
  {
    side: "l",
    name: "The note's own words",
    line: "Plain text in the middle of the screen, in the file you opened.",
    top: "0%",
  },
  {
    side: "r",
    name: "Links, written in",
    line: "A bracket is a link. It is saved as one and stays readable outside Lattice.",
    top: "14%",
  },
  {
    side: "l",
    name: "What points here",
    line: "Backlinks are read from the vault each time, so they are never stale.",
    top: "38%",
  },
  {
    side: "r",
    name: "The folder it lives in",
    line: "One folder, chosen by you, visible in Finder or Explorer.",
    top: "52%",
  },
  {
    side: "l",
    name: "When it was written",
    line: "Dates come from the file. Nothing is added that you did not write.",
    top: "72%",
  },
  {
    side: "r",
    name: "Siblings",
    line: "The other notes in the same folder, in the order you last touched them.",
    top: "86%",
  },
];

const ROWS = [
  { state: "As it arrives", note: "meeting" },
  { state: "In the pointer's hand", note: "meeting" },
  { state: "Linked and closed", note: "meeting" },
];

const FAQS = [
  {
    q: "Do I have to type brackets?",
    a: "No. Two brackets open the picker, and selecting words turns them into a link in one keystroke.",
  },
  {
    q: "Where do the files live?",
    a: "In a folder you choose, one Markdown file per note, pictures beside them, nothing in a database.",
  },
  {
    q: "What if I rename a note?",
    a: "Lattice rewrites every link that pointed at it in the same pass, so nothing dangles.",
  },
  {
    q: "Can two people share a vault?",
    a: "Through the folder: a shared drive, a git repository, or a sync service you already pay for.",
  },
  {
    q: "How large does it get?",
    a: "Tested at forty thousand notes on a laptop from 2019. Search stays under forty milliseconds.",
  },
  {
    q: "What am I paying for?",
    a: "Sync, the graph and the phone apps. The desktop app and your files are free without an account.",
  },
  {
    q: "Does it read Obsidian vaults?",
    a: "Yes, and it writes files Obsidian reads back. The syntax is plain Markdown links and brackets.",
  },
  {
    q: "What if the company closes?",
    a: "You keep the folder. Your notes open in any editor on the day after, with the links intact.",
  },
];

export default function V3() {
  const [linked, setLinked] = useState(false);
  const note = byId("meeting")!;

  return (
    <div className="v3">
      {/* ---------------- masthead: a two-by-two board ---------------- */}
      <header className="v3-board">
        <div className="v3-board__bar">
          <span className="v3-board__mark" aria-hidden="true" />
          <nav aria-label="Sections" className="v3-board__nav">
            <a href="#panel">The note</a>
            <a href="#method">The method</a>
            <a href="#vault">The vault</a>
            <a href="#questions">Questions</a>
          </nav>
          <a className="v3-board__cta" href="#start">
            Start a vault
          </a>
        </div>

        <div className="v3-board__grid">
          <div className="v3-tile v3-tile--name">
            <h1>
              <span className="v3-tile__big">Lattice</span>
              <span className="v3-tile__sub">a second brain in plain files</span>
            </h1>
          </div>
          <figure className="v3-tile v3-tile--photo">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/trobe-reading-room-state-library-of-victoria.jpg"
              alt="The octagonal reading room of the State Library of Victoria, seen from above."
              width={1920}
              height={1281}
            />
          </figure>
          <figure className="v3-tile v3-tile--photo2">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-at-the-indiana-state-library.jpg"
              alt="Card catalogue drawers at the Indiana State Library."
              width={1920}
              height={1280}
            />
          </figure>
          <div className="v3-tile v3-tile--pair">
            <div className="v3-tile--dark">
              <p>
              Every note points at other notes. The pointing is kept from both ends.
            </p>
            </div>
            <div className="v3-tile--accent">
              <p>Your notes are files in a folder you chose. Nothing is uploaded.</p>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- standfirst ---------------- */}
      <section className="v3-stand" aria-labelledby="v3-stand-h">
        <Reveal className="v3-stand__axis">
          <h2 id="v3-stand-h">A note is a place, not a folder</h2>
        </Reveal>
        <Reveal className="v3-stand__body" delay={70}>
          <p className="v3-lead">
            Lattice keeps one Markdown file per note and reads the links between them every time you open the vault.
            Nothing is indexed into a shape you cannot see. Nothing is stored twice.
          </p>
          <p>
            The result is a writing surface that behaves like an archive: you put a sentence in, it can sit beside
            another sentence two years older, and the second one can tell you it has been found again.
          </p>
        </Reveal>
      </section>

      {/* ---------------- the panel, with notes in the margins ---------------- */}
      <section className="v3-panel" id="panel" aria-labelledby="v3-panel-h">
        <Reveal as="h2" id="v3-panel-h" className="v3-panel__h">
          Six parts of one note
        </Reveal>

        <div className="v3-panel__grid">
          <div className="v3-panel__side v3-panel__side--l">
            {PANEL_NOTES.filter((n) => n.side === "l").map((n, i) => (
              <Reveal
                key={n.name}
                className="v3-note"
                delay={i * 50}
                style={{ top: n.top }}
              >
                <span className="v3-note__name">{n.name}</span>
                <span className="v3-note__line">{n.line}</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="v3-panel__ui" delay={40}>
            <article className="v3-noteui" data-ui="">
              <p className="v3-noteui__folder">Work / 14 March</p>
              <h3 className="v3-noteui__title">Meeting, 14 March</h3>
              <p className="v3-noteui__p">
                Decided: the release moves to the 27th, the pricing page waits for trial data, and Sam owns the
                migration note.
              </p>
              <p className="v3-noteui__p">
                Not decided: who answers the support queue in April. See{" "}
                <span className="v3-noteui__link">Projects I keep moving</span> and{" "}
                <span className="v3-noteui__link">The weekly review</span>.
              </p>
              <div className="v3-noteui__back">
                <p>Linked from</p>
                <ul>
                  <li>Projects I keep moving</li>
                  <li>The weekly review</li>
                </ul>
              </div>
              <p className="v3-noteui__foot">meeting.md · written 14 March · edited 2 April</p>
            </article>
          </Reveal>

          <div className="v3-panel__side v3-panel__side--r">
            {PANEL_NOTES.filter((n) => n.side === "r").map((n, i) => (
              <Reveal
                key={n.name}
                className="v3-note"
                delay={i * 50}
                style={{ top: n.top }}
              >
                <span className="v3-note__name">{n.name}</span>
                <span className="v3-note__line">{n.line}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- one row, three states ---------------- */}
      <section className="v3-states" aria-labelledby="v3-states-h">
        <h2 id="v3-states-h" className="v3-states__h">
          The same row, three times
        </h2>
        <div className="v3-states__grid">
          <div className="v3-states__labels">
            {ROWS.map((r) => (
              <span key={r.state}>{r.state}</span>
            ))}
          </div>
          <div className="v3-states__rows">
            <Reveal>
              <div className="v3-rowui" data-ui="">
                <div>
                  <p className="v3-rowui__title">{note.title}</p>
                  <p className="v3-rowui__sub">Work · 14 March · 3 decisions, 2 owners</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="v3-rowui v3-rowui--hot" data-ui="">
                <div>
                  <p className="v3-rowui__title">{note.title}</p>
                  <p className="v3-rowui__sub">Work · 14 March · 3 decisions, 2 owners</p>
                </div>
                {linked ? (
                  <p className="v3-rowui__done">Linked to Projects</p>
                ) : (
                  <button type="button" className="v3-rowui__btn" onClick={() => setLinked(true)}>
                    Link to a project
                  </button>
                )}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="v3-rowui v3-rowui--done" data-ui="">
                <div>
                  <p className="v3-rowui__title">{note.title}</p>
                  <p className="v3-rowui__sub">Linked to Projects, Weekly review · 2 backlinks</p>
                </div>
                <p className="v3-rowui__done">4 months later, found again</p>
              </div>
            </Reveal>
          </div>
        </div>
        <p className="v3-states__cap">
          The middle row is live. Press the button and it becomes the third row: this is the whole interaction the rest
          of the page is about.
        </p>
      </section>

      {/* ---------------- many into one ---------------- */}
      <section className="v3-method" id="method" aria-labelledby="v3-method-h">
        <div className="v3-method__copy">
          <h2 id="v3-method-h">Many notes, one reading</h2>
          <p>
            You do not build a structure first. You write, link, and let the reading come out of the links. After a
            year the vault has a shape you never drew.
          </p>
        </div>

        <Reveal className="v3-method__fig">
          <svg viewBox="0 0 1000 260" role="img" aria-label="Scattered notes gather into a line and come out in ordered rows.">
            <g className="v3-fig__scatter">
              {[
                [34, 40],
                [86, 96],
                [58, 168],
                [130, 56],
                [112, 208],
                [168, 132],
                [206, 46],
                [190, 196],
                [240, 100],
                [268, 168],
                [148, 24],
                [92, 128],
                [222, 224],
                [286, 58],
              ].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width="13" height="13" rx="1" />
              ))}
            </g>
            <g className="v3-fig__ribbon">
              {Array.from({ length: 22 }).map((_, i) => (
                <rect key={i} x={352 + i * 13} y={124} width="10" height="10" rx="1" />
              ))}
            </g>
            <g className="v3-fig__rows">
              {Array.from({ length: 4 }).map((_, r) =>
                Array.from({ length: 9 }).map((__, c) => (
                  <rect key={`${r}-${c}`} x={652 + c * 30} y={62 + r * 30} width="16" height="16" rx="1" />
                )),
              )}
            </g>
          </svg>
        </Reveal>

        <div className="v3-method__thirds">
          <div>
            <p className="v3-method__verb">Gather</p>
            <p>Fourteen notes, written badly and quickly, in three folders.</p>
          </div>
          <div>
            <p className="v3-method__verb">Pull</p>
            <p>The links you made by accident keep meeting. That is the only signal you need.</p>
          </div>
          <div>
            <p className="v3-method__verb">Read</p>
            <p>The row of links becomes an argument you can open, quote and correct.</p>
          </div>
        </div>
      </section>

      {/* ---------------- the vault, in columns ---------------- */}
      <section className="v3-vault" id="vault" aria-labelledby="v3-vault-h">
        <Reveal as="h2" id="v3-vault-h" className="v3-vault__h">
          The vault, in columns
        </Reveal>
        <Reveal className="v3-vault__names" delay={70}>
          <p className="v3-vault__kind">Method</p>
          <ul>
            {NOTES.filter((n) => n.folder === "Method").map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
          <p className="v3-vault__kind">Reading</p>
          <ul>
            {NOTES.filter((n) => n.folder === "Reading").map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
          <p className="v3-vault__kind">Archive</p>
          <ul>
            {NOTES.filter((n) => n.folder === "Archive").map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
          <p className="v3-vault__kind">Kitchen and walking</p>
          <ul>
            {NOTES.filter((n) => ["Kitchen", "Walking"].includes(n.folder)).map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="v3-vault__cap" delay={130}>
          <p>
            Sixteen notes from one real vault, printed as they are stored. The titles are the file names; nothing here
            is a folder tree you would have to maintain.
          </p>
        </Reveal>
      </section>

      {/* ---------------- questions as reading text ---------------- */}
      <section className="v3-qs" id="questions" aria-labelledby="v3-qs-h">
        <Reveal as="h2" id="v3-qs-h" className="v3-qs__h">
          Questions
        </Reveal>
        <Reveal className="v3-qs__text" delay={70}>
          {FAQS.map((f) => (
            <p key={f.q}>
              <strong>{f.q}</strong> {f.a}
            </p>
          ))}
        </Reveal>
      </section>

      {/* ---------------- three photographs, then a field ---------------- */}
      <section className="v3-strip" aria-hidden="true">
        <img
          src="/variants/with-taste-skill/deepseek-v4-1-flash/library-desk-reading-room-mitchell-building.jpg"
          alt=""
          width={1920}
          height={1475}
          loading="lazy"
        />
        <img
          src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-2.jpg"
          alt=""
          width={1920}
          height={1440}
          loading="lazy"
        />
        <img
          src="/variants/with-taste-skill/deepseek-v4-1-flash/reading-room-n-y-public-library-schwarzman.jpg"
          alt=""
          width={1920}
          height={1273}
          loading="lazy"
        />
      </section>

      <section className="v3-end" id="start" aria-labelledby="v3-end-h">
        <div className="v3-end__text">
          <h2 id="v3-end-h">Open a folder and start writing</h2>
          <p>
            Sixteen notes is a good first year. The vault will hold more, and it will still be a folder you can open in
            any editor. macOS and Windows, free, without an account.
          </p>
          <a
            className="v3-end__link"
            href="mailto:hello@lattice.example?subject=Start%20a%20Lattice%20vault&body=Send%20me%20the%20download%20for%20macOS%2C%20Windows%2C%20iOS%20and%20Android."
          >
            Get the app
          </a>
        </div>
        <figure className="v3-end__fig">
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
        </figure>
      </section>

      <footer className="v3-foot">
        <p className="v3-foot__mark">Lattice</p>
        <div className="v3-foot__cols">
          <p>
            A note-taking app for people who intend to read their notes again. Files you own, links kept both ways, no
            server in the middle.
          </p>
          <p>
            Pictures: <em>Trobe Reading Room</em> by Bhullargraphic (CC BY-SA 4.0); <em>Card catalog at the Indiana
            State Library</em> by TBurmeister (CC BY-SA 4.0); <em>Library desk, Reading Room, Mitchell Building</em>,
            Pix Magazine (public domain); <em>Reading Room, N.Y. Public Library</em> by Bestbudbrian (CC BY-SA 3.0),
            all via Wikimedia Commons.
          </p>
        </div>
      </footer>
    </div>
  );
}
