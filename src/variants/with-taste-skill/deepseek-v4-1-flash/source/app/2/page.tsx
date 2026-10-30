"use client";

import { useMemo, useState } from "react";
import { NOTES, backlinksOf } from "../lib/vault";
import Reveal from "../_components/Reveal";
import "@/generated/scoped-variant-css/with-taste-skill/deepseek-v4-1-flash/source/app/2/v2.css";

const FOLDERS = ["All", "Method", "Reading", "Archive", "Work"] as const;

function Board() {
  const [folder, setFolder] = useState<(typeof FOLDERS)[number]>("All");
  const [withLinks, setWithLinks] = useState(true);
  const [density, setDensity] = useState(3);

  const rows = useMemo(() => {
    const list = NOTES.filter((n) => folder === "All" || n.folder === folder)
      .map((n) => ({ note: n, back: backlinksOf(n.id).length }))
      .sort((a, b) => b.back - a.back);
    return list.slice(0, density + 2);
  }, [folder, density]);

  return (
    <div className="v2-demo" data-ui="">
      <div className="v2-demo__stage">
        {rows.map(({ note, back }) => (
          <article className="v2-demo__card" key={note.id}>
            <p className="v2-demo__title">{note.title}</p>
            <p className="v2-demo__line">{note.line}</p>
            {withLinks && (
              <p className="v2-demo__meta">
                {note.links.length} out · {back} in
              </p>
            )}
          </article>
        ))}
        {rows.length === 0 && <p className="v2-demo__empty">No notes in this folder yet.</p>}
      </div>

      <div className="v2-demo__controls">
        <fieldset className="v2-ctl">
          <legend>Folder</legend>
          <div className="v2-seg">
            {FOLDERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={folder === f}
                className={folder === f ? "is-on" : ""}
                onClick={() => setFolder(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="v2-ctl v2-ctl--row">
          <span id="v2-links-label">Show link counts</span>
          <button
            type="button"
            role="switch"
            aria-checked={withLinks}
            aria-labelledby="v2-links-label"
            className="v2-switch"
            onClick={() => setWithLinks((v) => !v)}
          >
            <span />
          </button>
        </div>

        <div className="v2-ctl v2-ctl--row">
          <label htmlFor="v2-density">Notes shown</label>
          <input
            id="v2-density"
            type="range"
            min={1}
            max={6}
            value={density}
            onChange={(e) => setDensity(Number(e.target.value))}
          />
        </div>
        <p className="v2-demo__count">
          {rows.length} notes in view · {rows.reduce((a, r) => a + r.back, 0)} links pointing at them
        </p>
      </div>
    </div>
  );
}

const FAQ = [
  {
    q: "Do I have to type brackets?",
    a: "No. Two brackets open the picker, and selecting words turns them into a link in one keystroke.",
  },
  {
    q: "Is there a database?",
    a: "No. One Markdown file per note in a folder you choose, and the links are written into the files.",
  },
  {
    q: "What if I rename a note?",
    a: "Lattice rewrites every link that pointed at it, in the same pass. Nothing breaks.",
  },
  {
    q: "Can two people share a vault?",
    a: "Yes, through the folder: a shared drive, a git repository, or a sync service you already pay for.",
  },
  {
    q: "How big can it get?",
    a: "Tested at 40,000 notes on a laptop from 2019. Search stays under 40ms; the graph is the first thing to slow down.",
  },
  {
    q: "What do I get for the money?",
    a: "Sync, the graph, and the mobile apps. The desktop app and your files are free, forever, without an account.",
  },
];

const STAGES = [
  {
    word: "Write",
    line: "One sentence in the folder. A keystroke later it is a file with a date.",
    img: "/variants/with-taste-skill/deepseek-v4-1-flash/library-desk-reading-room-mitchell-building.jpg",
    alt: "A reader's desk in the reading room of the Mitchell Building, Sydney, 1943.",
  },
  {
    word: "Link",
    line: "The picker finds the project, and the project now points back at the sentence.",
    img: "/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-2.jpg",
    alt: "A wooden card catalogue whose drawers are labelled with ranges of names.",
  },
  {
    word: "Find",
    line: "A year on, the project page lists the note, its owner and the thing left open.",
    img: "/variants/with-taste-skill/deepseek-v4-1-flash/trobe-reading-room-state-library-of-victoria.jpg",
    alt: "The octagonal reading room of the State Library of Victoria, seen from above.",
  },
];

export default function V2() {
  return (
    <div className="v2">
      <header className="v2-top">
        <nav className="v2-nav" aria-label="Sections">
          <a href="#how">How it works</a>
          <a href="#demo">Inside the app</a>
          <a href="#questions">Questions</a>
        </nav>
        <p className="v2-wordmark">Lattice</p>
        <a className="v2-nav__cta" href="#start">
          Start a vault
        </a>
      </header>

      <main className="v2-board">
        {/* ---------------- first screen: the board ---------------- */}
        <section className="v2-sheet" aria-labelledby="v2-title">
          <div className="v2-cell v2-cell--name">
            <h1 id="v2-title">
              Notes that
              <br />
              link both ways
            </h1>
            <p className="v2-cell__kicker">Lattice, a note-taking app in plain text</p>
          </div>

          <div className="v2-cell v2-cell--statement">
            <p>Open the project and see the meeting. Open the meeting and see the project. Nobody filed anything
              twice.</p>
          </div>

          <figure className="v2-cell v2-cell--photo">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-2.jpg"
              alt="A wooden card catalogue, each drawer labelled with a range of names."
              width={1920}
              height={1440}
            />
            <figcaption>Drawers labelled A–Z. Four hundred years of filing.</figcaption>
          </figure>

          <div className="v2-cell v2-cell--action">
            <p className="v2-cell__action-line">No account needed to open a folder.</p>
            <a className="v2-cta" href="#start">
              Start a vault
            </a>
          </div>

          <div className="v2-cell v2-cell--facts">
            <dl>
              <div>
                <dt>Files</dt>
                <dd>Markdown, one per note</dd>
              </div>
              <div>
                <dt>Platforms</dt>
                <dd>macOS, Windows, iOS, Android</dd>
              </div>
              <div>
                <dt>Offline</dt>
                <dd>Everything but sync</dd>
              </div>
              <div>
                <dt>Export</dt>
                <dd>The folder you already have</dd>
              </div>
            </dl>
          </div>

          <figure className="v2-cell v2-cell--photo2">
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
            <figcaption>The typewriter wrote; the drawer remembered.</figcaption>
          </figure>
        </section>

        {/* ---------------- close-ups: what the app is ---------------- */}
        <section className="v2-close" aria-labelledby="v2-close-h">
          <Reveal className="v2-close__head">
            <h2 id="v2-close-h">Close up on the parts</h2>
            <p>Four pieces of the interface, at the size you will meet them.</p>
          </Reveal>

          <Reveal className="v2-frag v2-frag--wide" delay={60}>
            <div className="v2-frag__inner" data-ui="">
              <div className="v2-picker">
                <p className="v2-picker__label">Link to a note</p>
                <p className="v2-picker__query">
                  rea<span className="v2-caret" aria-hidden="true" />
                </p>
                <ul>
                  <li className="is-hot">
                    <span>Reading as a conversation</span>
                    <span>Reading</span>
                  </li>
                  <li>
                    <span>How I read</span>
                    <span>Reading</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="v2-frag__cap">
              <strong>Type two brackets.</strong> The picker reads your vault as you type and ranks by what you opened
              last.
            </p>
          </Reveal>

          <Reveal className="v2-frag v2-frag--backlinks" delay={110}>
            <div className="v2-frag__inner" data-ui="">
              <div className="v2-back">
                <p className="v2-back__label">Linked from</p>
                <ul>
                  <li>Zettelkasten, without the mystique</li>
                  <li>Reading as a conversation</li>
                  <li>The weekly review</li>
                </ul>
              </div>
            </div>
            <p className="v2-frag__cap">
              <strong>The other half of the link.</strong> Every note lists what points at it, without anyone
              maintaining a list.
            </p>
          </Reveal>

          <Reveal className="v2-frag v2-frag--search" delay={160}>
            <div className="v2-frag__inner" data-ui="">
              <div className="v2-search">
                <p className="v2-search__label">Search the vault</p>
                <p className="v2-search__q">herons</p>
                <p className="v2-search__hit">The reservoir at seven</p>
                <p className="v2-search__why">matched in the body, 4 words from “herons”</p>
              </div>
            </div>
            <p className="v2-frag__cap">
              <strong>Search reads the files.</strong> No index to rebuild, no server to ask, results in under 40ms at
              forty thousand notes.
            </p>
          </Reveal>

          <Reveal className="v2-frag v2-frag--graph" delay={210}>
            <div className="v2-frag__inner" data-ui="">
              <svg viewBox="0 0 220 200" className="v2-graph" role="img" aria-label="Six notes connected by eleven links.">
                <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.55">
                  <path d="M40 40 L110 96" />
                  <path d="M110 96 L182 46" />
                  <path d="M110 96 L64 160" />
                  <path d="M110 96 L172 156" />
                  <path d="M40 40 L64 160" />
                  <path d="M182 46 L172 156" />
                  <path d="M64 160 L172 156" />
                  <path d="M40 40 L182 46" />
                </g>
                <g fill="currentColor">
                  <circle cx="40" cy="40" r="6" />
                  <circle cx="110" cy="96" r="9" />
                  <circle cx="182" cy="46" r="6" />
                  <circle cx="64" cy="160" r="6" />
                  <circle cx="172" cy="156" r="6" />
                </g>
              </svg>
            </div>
            <p className="v2-frag__cap">
              <strong>The graph is drawn, not stored.</strong> It is a reading of the links in your files, so it can
              never disagree with them.
            </p>
          </Reveal>

          <figure className="v2-close__photo">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/trobe-reading-room-state-library-of-victoria.jpg"
              alt="The octagonal reading room of the State Library of Victoria, seen from above."
              width={1920}
              height={1281}
              loading="lazy"
            />
            <figcaption>The La Trobe Reading Room, Melbourne. Eight walls, one catalogue in the middle.</figcaption>
          </figure>
        </section>

        {/* ---------------- how it works: photographs down a diagonal ---------------- */}
        <section className="v2-how" id="how" aria-labelledby="v2-how-h">
          <Reveal className="v2-how__head">
            <h2 id="v2-how-h">One note, kept for a year</h2>
            <p>The whole method is three moves, and you already know two of them.</p>
          </Reveal>
          <ol className="v2-how__list">
            {STAGES.map((s, i) => (
              <Reveal as="li" className={`v2-how__stage v2-how__stage--${i}`} key={s.word} delay={i * 80}>
                <figure>
                  <img src={s.img} alt={s.alt} width={1600} height={1200} loading="lazy" />
                </figure>
                <div>
                  <h3>{s.word}</h3>
                  <p>{s.line}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------------- live demo with controls ---------------- */}
        <section className="v2-demo-wrap" id="demo" aria-labelledby="v2-demo-h">
          <Reveal className="v2-demo-wrap__head">
            <h2 id="v2-demo-h">The board, filtered</h2>
            <p>
              This is the note list with four of its controls working. Change the folder, hide the link counts, or set
              how many notes you want in front of you.
            </p>
          </Reveal>
          <Reveal delay={70}>
            <Board />
          </Reveal>
        </section>

        {/* ---------------- questions ---------------- */}
        <section className="v2-qs" id="questions" aria-labelledby="v2-qs-h">
          <Reveal className="v2-qs__head">
            <h2 id="v2-qs-h">Questions</h2>
            <p>Short answers, because the product is small.</p>
          </Reveal>
          <dl className="v2-qs__list">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* ---------------- the action tile ---------------- */}
        <section className="v2-end" id="start" aria-labelledby="v2-end-h">
          <div className="v2-end__side v2-end__side--photo" aria-hidden="true">
            <img src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-at-the-indiana-state-library.jpg" alt="" width={1920} height={1280} loading="lazy" />
          </div>
          <Reveal className="v2-end__main">
            <h2 id="v2-end-h">Point it at a folder</h2>
            <p>
              Name the vault, and the folder becomes a second brain you can open in any text editor. Nothing is
              uploaded.
            </p>
            <a
              className="v2-cta v2-cta--dark"
              href="mailto:hello@lattice.example?subject=Start%20a%20Lattice%20vault&body=Send%20me%20the%20download%20for%20macOS%2C%20Windows%2C%20iOS%20and%20Android."
            >
              Get the app
            </a>
          </Reveal>
          <div className="v2-end__side v2-end__side--photo" aria-hidden="true">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalogs-in-murmansk-regional-scientific-library.jpg"
              alt=""
              width={1920}
              height={933}
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <footer className="v2-foot">
        <p className="v2-foot__mark">Lattice</p>
        <div className="v2-foot__cols">
          <p>
            A note-taking app for people who intend to read their notes again. Files you own, links kept both ways, and
            no server in the middle.
          </p>
          <p>
            Pictures: <em>Card Catalog 2</em> by mamsy (CC BY 2.0); <em>Library desk, Reading Room, Mitchell
            Building</em>, Pix Magazine (public domain); <em>Card catalog at the Indiana State Library</em> by
            TBurmeister (CC BY-SA 4.0); <em>Trobe Reading Room</em> by Bhullargraphic (CC BY-SA 4.0), all via Wikimedia
            Commons.
          </p>
        </div>
      </footer>
    </div>
  );
}
