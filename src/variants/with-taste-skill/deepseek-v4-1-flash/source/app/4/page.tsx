"use client";

import { useMemo, useState } from "react";
import { NOTES, backlinksOf, searchTitles } from "../lib/vault";
import Reveal from "../_components/Reveal";
import "@/generated/scoped-variant-css/with-taste-skill/deepseek-v4-1-flash/source/app/4/v4.css";

const CHAPTERS = [
  { name: "Writing", href: "#writing", colour: "#2436ff", ink: "#ffffff" },
  { name: "Linking", href: "#linking", colour: "#ff3b1f", ink: "#0a0a0a" },
  { name: "Reading", href: "#reading", colour: "#0a0a0a", ink: "#ffffff" },
  { name: "Keeping", href: "#keeping", colour: "#050a5c", ink: "#ffffff" },
];

const SWITCHES = [
  {
    on: true,
    sentence: "Every note can point at any other note.",
    consequence: "8 links in the sample note, written as plain Markdown.",
  },
  {
    on: true,
    sentence: "The pointing is kept from both ends.",
    consequence: "3 backlinks on the note you opened, none typed by hand.",
  },
  {
    on: false,
    sentence: "Your vault is a folder you can open anywhere.",
    consequence: "16 files, 16 folders, one Finder window.",
  },
  {
    on: false,
    sentence: "Search reads the files while you type.",
    consequence: "under 40ms at forty thousand notes, offline.",
  },
  {
    on: false,
    sentence: "Renaming a note rewrites every link to it.",
    consequence: "one pass, no dangling links, no warnings.",
  },
];

const ANSWERS = [
  {
    q: "Do I have to type brackets?",
    a: "No. Two brackets open the picker; selecting words turns them into a link in one keystroke.",
  },
  {
    q: "Where do the notes live?",
    a: "In a folder you choose, one Markdown file per note, pictures beside them, nothing in a database.",
  },
  {
    q: "What if I rename a note?",
    a: "Lattice rewrites every link that pointed at it, in the same pass.",
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
];

const STAGES = [
  {
    clause: "First you write the thing down.",
    caption: "One sentence, one file, a date. Nothing else is asked of you.",
    fragment: "writer",
  },
  {
    clause: "Then you link it to a project.",
    caption: "Two brackets, a picker, and the note has a place to be found from.",
    fragment: "link",
  },
  {
    clause: "Then the project keeps it for you.",
    caption: "The project page lists the note under decisions, with its owner.",
    fragment: "project",
  },
  {
    clause: "Then a year later it surfaces.",
    caption: "Search for the project and the meeting comes back, decisions intact.",
    fragment: "found",
  },
];

function Fragment({ kind }: { kind: string }) {
  if (kind === "writer")
    return (
      <div className="v4-frag" data-ui="">
        <p className="v4-frag__small">Work · new note</p>
        <p className="v4-frag__body">The release moves to the 27th. Pricing page waits for trial data.</p>
        <p className="v4-frag__small">meeting.md · saved</p>
      </div>
    );
  if (kind === "link")
    return (
      <div className="v4-frag" data-ui="">
        <p className="v4-frag__small">Link to a note</p>
        <p className="v4-frag__field">
          proj<span className="v4-caret" aria-hidden="true" />
        </p>
        <ul className="v4-frag__list">
          <li className="is-hot">Projects I keep moving</li>
          <li>The weekly review</li>
        </ul>
      </div>
    );
  if (kind === "project")
    return (
      <div className="v4-frag" data-ui="">
        <p className="v4-frag__small">Projects I keep moving</p>
        <p className="v4-frag__body">Decisions</p>
        <ul className="v4-frag__list">
          <li>Meeting, 14 March · release moves to the 27th</li>
          <li>Meeting, 14 March · Sam owns the migration note</li>
        </ul>
      </div>
    );
  return (
    <div className="v4-frag" data-ui="">
      <p className="v4-frag__small">Search</p>
      <p className="v4-frag__field">
        release<span className="v4-caret" aria-hidden="true" />
      </p>
      <ul className="v4-frag__list">
        <li className="is-hot">Meeting, 14 March</li>
        <li>Projects I keep moving</li>
      </ul>
    </div>
  );
}

export default function V4() {
  const [switches, setSwitches] = useState(SWITCHES.map((s) => s.on));
  const [typed, setTyped] = useState("re");
  const [stage, setStage] = useState(1);

  const results = useMemo(() => {
    const hits = searchTitles(typed, 4);
    if (hits.length) return hits;
    const q = typed.trim().toLowerCase();
    return NOTES.filter((n) => n.body.join(" ").toLowerCase().includes(q)).slice(0, 4);
  }, [typed]);

  const note = NOTES.find((n) => n.id === "meeting")!;
  const back = backlinksOf(note.id);

  return (
    <div className="v4">
      {/* ---------------- hero: the tabbed folder stack ---------------- */}
      <header className="v4-hero">
        <div className="v4-hero__top">
          <p className="v4-hero__wordmark">Lattice</p>
          <a className="v4-hero__signin" href="#start">
            Open the app
          </a>
        </div>

        <h1>Lattice</h1>
        <p className="v4-hero__sub">A note-taking app in plain text, where every note can link to any other.</p>

        <nav className="v4-folders" aria-label="Chapters">
          {CHAPTERS.map((c, i) => (
            <a
              className={`v4-folder v4-folder--${i}`}
              key={c.name}
              href={c.href}
              style={{ background: c.colour }}
            >
              <span className="v4-folder__tab" style={{ background: c.colour, color: c.ink }}>
                {c.name}
              </span>
            </a>
          ))}
          <div className="v4-folder v4-folder--open">
            <span className="v4-folder__tab v4-folder__tab--open">Start</span>
            <div className="v4-folder__inner">
              <a className="v4-btn" href="#start">
                Start a vault
              </a>
              <p className="v4-folder__note">
                <span>meeting.md</span>
                The release moves to the 27th. Pricing page waits for trial data.
              </p>
            </div>
          </div>
        </nav>
      </header>

      {/* ---------------- chapter: writing, with switches ---------------- */}
      <section className="v4-chapter v4-chapter--blue" id="writing" aria-labelledby="v4-writing-h">
        <Reveal as="h2" id="v4-writing-h" className="v4-chapter__h">
          What it does for you
        </Reveal>
        <div className="v4-switches">
          {SWITCHES.map((s, i) => (
            <div className={`v4-switch ${switches[i] ? "is-on" : ""}`} key={s.sentence}>
              <p className="v4-switch__sentence">{s.sentence}</p>
              <button
                type="button"
                role="switch"
                aria-checked={switches[i]}
                aria-label={s.sentence}
                className="v4-toggle"
                onClick={() =>
                  setSwitches((prev) => prev.map((v, j) => (j === i ? !v : v)))
                }
              />
              <p className="v4-switch__consequence">{s.consequence}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- chapter: a headline you can type ---------------- */}
      <section className="v4-chapter v4-chapter--white" id="linking" aria-labelledby="v4-typing-h">
        <h2 id="v4-typing-h" className="v4-typing__h">
          Search the vault
        </h2>
        <p className="v4-typing__label">Type a word and read what comes back. It matches titles, folders and bodies.</p>
        <input
          className="v4-typing__input"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          aria-label="Search the vault"
          spellCheck={false}
        />
        <div className="v4-typing__answer" data-ui="">
          {results.length === 0 ? (
            <p className="v4-typing__empty">Nothing in sixteen notes. Try “reservoir” or “links”.</p>
          ) : (
            results.map((r) => (
              <div className="v4-res" key={r.id}>
                <p className="v4-res__title">{r.title}</p>
                <p className="v4-res__line">{r.line}</p>
                <p className="v4-res__meta">
                  {r.folder} · {r.links.length} links out · {backlinksOf(r.id).length} in
                </p>
              </div>
            ))
          )}
        </div>
        <div className="v4-typing__examples">
          {["herons", "Zettelkasten", "sourdough", "dewey"].map((ex) => (
            <button key={ex} type="button" className="v4-chip" onClick={() => setTyped(ex)}>
              {ex}
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- chapter: drag through the stages ---------------- */}
      <section className="v4-chapter v4-chapter--red" id="keeping" aria-labelledby="v4-stages-h">
        <div className="v4-stage">
          <div className="v4-stage__left">
            <h2 id="v4-stages-h" className="v4-stage__clause">
              {STAGES[stage].clause}
            </h2>
            <p className="v4-stage__caption">{STAGES[stage].caption}</p>
          </div>
          <div className="v4-stage__right">
            <Fragment kind={STAGES[stage].fragment} />
          </div>
        </div>
        <div className="v4-slider">
          <input
            type="range"
            min={0}
            max={3}
            step={1}
            value={stage}
            aria-label="Stage in a note's life"
            onChange={(e) => setStage(Number(e.target.value))}
          />
          <div className="v4-slider__names">
            {["Write", "Link", "File", "Find"].map((n, i) => (
              <button
                key={n}
                type="button"
                className={i === stage ? "is-on" : ""}
                aria-pressed={i === stage}
                onClick={() => setStage(i)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- the drawer, printed as a plate ---------------- */}
      <section className="v4-plate-band" aria-labelledby="v4-plate-h">
        <Reveal className="v4-plate-copy">
          <h2 id="v4-plate-h">One drawer, one thought</h2>
          <p>
            A card catalogue worked because the drawer was small enough to hold a single thought and the label told
            you where it lived. Lattice keeps the drawer and drops the address.
          </p>
        </Reveal>
        <Reveal className="v4-plate-photo" delay={80}>
          <img
            src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-2.jpg"
            alt="A wooden card catalogue, each drawer labelled with a range of names."
            width={1920}
            height={1440}
            loading="lazy"
          />
        </Reveal>
      </section>

      {/* ---------------- chapter: reading, on plates ---------------- */}
      <section className="v4-chapter v4-chapter--black" id="reading" aria-labelledby="v4-read-h">
        <Reveal as="h2" id="v4-read-h" className="v4-chapter__h">
          Where the metaphor comes from
        </Reveal>
        <div className="v4-plates">
          <figure>
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-2.jpg"
              alt="A wooden card catalogue, each drawer labelled with a range of names."
              width={1920}
              height={1440}
              loading="lazy"
            />
            <figcaption>One card, one thought, one address. The drawer was the unit.</figcaption>
          </figure>
          <figure>
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/trobe-reading-room-state-library-of-victoria.jpg"
              alt="The octagonal reading room of the State Library of Victoria, seen from above."
              width={1920}
              height={1281}
              loading="lazy"
            />
            <figcaption>Eight walls of shelves, one catalogue in the middle of the room.</figcaption>
          </figure>
          <figure>
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalogs-in-murmansk-regional-scientific-library.jpg"
              alt="Rows of wooden card catalogue drawers in a regional library."
              width={1920}
              height={933}
              loading="lazy"
            />
            <figcaption>Two catalogues, one room, a drawer for every name the library knew.</figcaption>
          </figure>
          <figure>
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
            <figcaption>A portable typewriter, 1960s. The words went straight onto paper.</figcaption>
          </figure>
        </div>
        <p className="v4-plates__note">
          Lattice keeps the drawer and drops the address. A note can sit in as many places as links reach it.
        </p>
      </section>

      {/* ---------------- chapter: questions as bands ---------------- */}
      <section className="v4-qs" aria-labelledby="v4-qs-h">
        <h2 id="v4-qs-h" className="v4-qs__h">
          Questions
        </h2>
        {ANSWERS.map((a, i) => (
          <div className={`v4-band ${i % 2 ? "v4-band--alt" : ""}`} key={a.q}>
            <h3 className="v4-band__q">{a.q}</h3>
            <p className="v4-band__a">{a.a}</p>
          </div>
        ))}
      </section>

      {/* ---------------- close: the first screen, already open ---------------- */}
      <section className="v4-chapter v4-chapter--blue v4-start" id="start" aria-labelledby="v4-start-h">
        <div className="v4-start__text">
          <h2 id="v4-start-h">Start a vault</h2>
          <p>
            Name it, choose a folder, and the next note you write is the first file. Nothing is uploaded, and nothing
            is charged for the desktop app.
          </p>
          <p className="v4-start__meta">
            {note.links.length} links out of the sample note · {back.length} pointing at it
          </p>
        </div>
        <Reveal className="v4-start__dialog" delay={70}>
          <div className="v4-dialog" data-ui="">
            <p className="v4-dialog__title">Name your vault</p>
            <input className="v4-dialog__field" defaultValue="Research" aria-label="Vault name" />
            <div className="v4-dialog__seg" role="group" aria-label="Where the vault lives">
              <button type="button" aria-pressed="true" className="is-on">
                Plain folder
              </button>
              <button type="button" aria-pressed="false">
                Synced
              </button>
            </div>
            <a
              className="v4-dialog__go"
              href="mailto:hello@lattice.example?subject=Start%20a%20Lattice%20vault&body=Send%20me%20the%20download%20for%20macOS%2C%20Windows%2C%20iOS%20and%20Android."
            >
              Create the vault
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="v4-foot">
        <p className="v4-foot__mark">Lattice</p>
        <div className="v4-foot__cols">
          <p>
            A note-taking app for people who intend to read their notes again. Files you own, links kept both ways, no
            server in the middle.
          </p>
          <p>
            Pictures: <em>Card Catalog 2</em> by mamsy (CC BY 2.0); <em>Trobe Reading Room</em> by Bhullargraphic (CC
            BY-SA 4.0); <em>Library desk, Reading Room, Mitchell Building</em>, Pix Magazine (public domain), all via
            Wikimedia Commons.
          </p>
        </div>
      </footer>
    </div>
  );
}
