"use client";

import { useEffect, useMemo, useState } from "react";
import { NOTES, backlinksOf, searchTitles } from "../lib/vault";
import Reveal from "../_components/Reveal";
import "@/generated/scoped-variant-css/with-taste-skill/deepseek-v4-1-flash/source/app/1/v1.css";

/* ------------------------------------------------------------------ the hero fragment */

function LinkFinder() {
  const [query, setQuery] = useState("cata");
  const [picked, setPicked] = useState("card-catalogue");
  const [readout, setReadout] = useState("reading the page");

  const results = useMemo(() => {
    const hits = searchTitles(query, 4);
    if (hits.length) return hits;
    return NOTES.filter((n) => n.body.join(" ").toLowerCase().includes(query.trim().toLowerCase())).slice(0, 3);
  }, [query]);

  const note = NOTES.find((n) => n.id === picked) ?? NOTES[0];
  const back = backlinksOf(note.id);

  useEffect(() => {
    const read = () => {
      const half = document.querySelector(".v1-hero__right");
      const h1 = document.querySelector(".v1-hero h1");
      if (!half || !h1) return;
      const ground = getComputedStyle(half).backgroundColor;
      const size = parseFloat(getComputedStyle(h1).fontSize);
      setReadout(`${ground.replace(/^rgb/, "rgb")} · h1 ${size.toFixed(1)}px`);
    };
    read();
    const t = window.setTimeout(read, 400);
    window.addEventListener("resize", read);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", read);
    };
  }, []);

  return (
    <div className="v1-finder" data-ui="">
      <p className="v1-finder__label">Find a note to link</p>
      <input
        className="v1-finder__field"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search notes by title"
        spellCheck={false}
      />
      <ul className="v1-finder__results">
        {results.length === 0 && <li className="v1-finder__empty">No note matches. Try “link”.</li>}
        {results.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              className="v1-finder__result"
              aria-pressed={r.id === picked}
              onClick={() => setPicked(r.id)}
            >
              <span>{r.title}</span>
              <span className="v1-finder__folder">{r.folder}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="v1-finder__note">
        <p className="v1-finder__title">{note.title}</p>
        <p className="v1-finder__links">
          Links out: {note.links.length} · Links in: {back.length}
        </p>
        <p className="v1-finder__in">
          {back.length ? back.map((b) => b.title).join(", ") : "Nothing links here yet"}
        </p>
      </div>
      <p className="v1-finder__readout">{readout}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ showcase: three states */

function NoteRow({
  state,
  onComplete,
}: {
  state: "landed" | "pointer" | "linked";
  onComplete?: () => void;
}) {
  return (
    <div className={`v1-row v1-row--${state}`} data-ui="">
      <div className="v1-row__main">
        <p className="v1-row__title">Meeting, 14 March</p>
        <p className="v1-row__sub">Work · 14 March · 3 decisions, 2 owners</p>
      </div>
      <div className="v1-row__side">
        {state === "linked" ? (
          <p className="v1-row__done">Linked to Projects, Weekly review</p>
        ) : (
          <button type="button" className="v1-row__btn" onClick={onComplete}>
            Link it
          </button>
        )}
      </div>
    </div>
  );
}

function Showcase() {
  const [linked, setLinked] = useState(false);
  return (
    <section className="v1-showcase" aria-labelledby="v1-showcase-h">
      <Reveal as="h2" id="v1-showcase-h" className="v1-h2">
        One note, three states
      </Reveal>
      <div className="v1-showcase__grid">
        <ol className="v1-showcase__labels">
          <Reveal as="li">As it lands</Reveal>
          <Reveal as="li" delay={70}>
            With the pointer on it
          </Reveal>
          <Reveal as="li" delay={140}>
            Linked
          </Reveal>
        </ol>
        <div className="v1-showcase__rows">
          <Reveal delay={60}>
            <NoteRow state="landed" />
          </Reveal>
          <Reveal delay={130}>
            {linked ? <NoteRow state="linked" /> : <NoteRow state="pointer" onComplete={() => setLinked(true)} />}
          </Reveal>
          <Reveal delay={200}>
            <NoteRow state="linked" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ faq */

const FAQ = [
  {
    q: "Do I have to type [[brackets]] to link?",
    a: "No. Type two brackets and the picker opens, or select any words in a note and they become a link in one keystroke. The brackets are only the shortcut; every link is stored as a plain Markdown link, so the file reads correctly in any editor.",
  },
  {
    q: "Where are my notes stored?",
    a: "In a folder you choose, one Markdown file per note, with the pictures beside them. Nothing is hidden in a database. Point Lattice at a folder inside Dropbox, iCloud Drive or a git repository and that is your sync.",
  },
  {
    q: "What happens to links when I rename a note?",
    a: "They follow it. Lattice rewrites the links in every note that pointed at it when you rename, and keeps a note’s file name stable underneath so an external editor sees the same thing.",
  },
  {
    q: "Does it work without the internet?",
    a: "Everything works offline: writing, linking, backlinks, search and the graph. Sync runs when a connection appears. There is no server copy of your vault unless you point the folder at one.",
  },
  {
    q: "What happens if I stop paying?",
    a: "Nothing to your notes. They are files in a folder, already readable. The app keeps opening your vault and exporting; only sync and the newer views stop.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes, and the same vault: capture in the same plain files, with the picker and backlinks on the phone. The graph view is the only thing that stays on a bigger screen.",
  },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="v1-faq" aria-labelledby="v1-faq-h">
      <div className="v1-faq__list">
        <Reveal as="h2" id="v1-faq-h" className="v1-faq__h">
          Questions
        </Reveal>
        <ul>
          {FAQ.map((item, i) => (
            <Reveal as="li" key={item.q} delay={i * 50}>
              <button
                type="button"
                className="v1-faq__q"
                aria-pressed={open === i}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
              >
                <span className="v1-faq__dot" aria-hidden="true" />
                {item.q}
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      <Reveal className="v1-faq__pane" delay={80}>
        <p key={open} className="v1-faq__a">
          {FAQ[open].a}
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ closing dialog */

function StartDialog() {
  const [name, setName] = useState("Research");
  const [mode, setMode] = useState<"files" | "synced">("files");
  return (
    <div className="v1-dialog" data-ui="">
      <p className="v1-dialog__title">Name your vault</p>
      <input
        className="v1-dialog__field"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Vault name"
        spellCheck={false}
      />
      <div className="v1-dialog__seg" role="group" aria-label="Where the vault lives">
        <button
          type="button"
          aria-pressed={mode === "files"}
          className={mode === "files" ? "is-on" : ""}
          onClick={() => setMode("files")}
        >
          Plain folder
        </button>
        <button
          type="button"
          aria-pressed={mode === "synced"}
          className={mode === "synced" ? "is-on" : ""}
          onClick={() => setMode("synced")}
        >
          Synced
        </button>
      </div>
      <a
        className="v1-dialog__go"
        href={`mailto:hello@lattice.example?subject=${encodeURIComponent(`Open a vault called ${name}`)}&body=${encodeURIComponent(
          `Vault: ${name}\nLocation: ${mode === "files" ? "a folder on this machine" : "a synced folder"}\n\nSend me the download for macOS, Windows, iOS and Android.`,
        )}`}
      >
        Create {name || "my vault"}
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ the page */

const COMPARE: [string, string, string, string][] = [
  ["Where a note can live", "Anywhere, and in many places", "One folder", "Inside a thread"],
  ["A link between notes", "Kept from both ends", "A blue underline", "Not possible"],
  ["What you type", "Plain text and links", "Plain text", "A paragraph of prompt"],
  ["Your files", "Markdown in your folder", "Markdown in your folder", "On their servers"],
  ["Search", "Title, body, or who links here", "By file name", "Recalled by the model"],
  ["Offline", "Everything works", "Everything works", "Nothing works"],
  ["Finding an old idea", "Follow the links back", "Remember the folder", "Ask again and hope"],
  ["Cost of a note", "One keystroke", "One file", "One paragraph"],
];

const FIELDS = [
  {
    clause: "It starts as a note.",
    body: "Typed in a meeting, on the phone, or pasted from an email. It lands in the folder and it is already a file.",
  },
  {
    clause: "It links to a project.",
    body: "Two brackets and a picker. The note now points at the project it belongs to, in the words you already used.",
  },
  {
    clause: "The project links back.",
    body: "Open the project and the meeting is there, under the decisions. You did not file anything twice.",
  },
  {
    clause: "In March, it finds you.",
    body: "A year later, searching the project brings up the note, who owns what, and the thing nobody agreed to.",
  },
];

const TILES = [
  { name: "Markdown files", line: "One file per note, readable in any editor, with your pictures beside them." },
  { name: "Links both ways", line: "Every link is stored twice: where it goes, and who points here." },
  { name: "Offline first", line: "Writing, linking, search and the graph work with the network switched off." },
  { name: "A folder you own", line: "Choose it once. Put it in Dropbox, iCloud Drive or a git repository." },
  { name: "Four platforms", line: "macOS, Windows, iOS and Android open the same vault, not a copy of it." },
  { name: "One-click export", line: "A folder of Markdown and pictures is already the export. Nothing is locked in." },
];

export default function V1() {
  const [tile, setTile] = useState(0);

  return (
    <div className="v1">
      {/* ---------------- hero: two tones, one live fragment ---------------- */}
      <section className="v1-hero">
        <div className="v1-hero__left">
          <div className="v1-hero__brand">
            <span className="v1-mark" aria-hidden="true" />
            <span className="v1-wordmark">Lattice</span>
          </div>
          <div className="v1-hero__text">
            <h1>
              <span className="v1-line">
                <span>Notes that link</span>
              </span>
              <span className="v1-line">
                <span>both ways</span>
              </span>
            </h1>
            <Reveal as="p" className="v1-hero__sub" delay={230}>
              Lattice is a note-taking app in plain text. Every note can point at any other, and the pointing is kept
              from both ends.
            </Reveal>
            <Reveal delay={320}>
              <a className="v1-btn" href="#start">
                Start a vault
              </a>
            </Reveal>
          </div>
        </div>

        <div className="v1-hero__right">
          <a className="v1-hero__signin" href="#start">
            Open the app
          </a>
          <LinkFinder />
        </div>
      </section>

      {/* ---------------- comparison, set as text ---------------- */}
      <section className="v1-compare" aria-labelledby="v1-compare-h">
        <Reveal as="h2" id="v1-compare-h" className="v1-h2">
          How it compares
        </Reveal>
        <Reveal className="v1-compare__scroll" delay={60}>
          <table className="v1-compare__table">
            <thead>
              <tr>
                <th scope="col">What it does</th>
                <th scope="col" className="v1-compare__us">
                  Lattice
                </th>
                <th scope="col">Files in folders</th>
                <th scope="col">A chat window</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([what, us, files, chat]) => (
                <tr key={what}>
                  <th scope="row">{what}</th>
                  <td className="v1-compare__us" data-col="Lattice">
                    {us}
                  </td>
                  <td data-col="Files in folders">{files}</td>
                  <td data-col="A chat window">{chat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      <Showcase />

      {/* ---------------- four fields, one card moving along ---------------- */}
      <section className="v1-steps" aria-labelledby="v1-steps-h">
        <h2 id="v1-steps-h" className="v1-steps__h">
          A note through a year
        </h2>
        <div className="v1-steps__fields">
          {FIELDS.map((f, i) => (
            <div className={`v1-field v1-field--${i}`} key={f.clause}>
              <div className="v1-field__card" data-ui="">
                <p className="v1-field__date">14 March</p>
                <p className="v1-field__title">Meeting</p>
                <ul className="v1-field__lines">
                  {(i === 0
                    ? ["The release moves to the 27th.", "Pricing page waits for trial data.", "Who answers support in April?"]
                    : i === 1
                      ? ["The release moves to the 27th.", "Linked: Projects I keep moving", "Pricing page waits for trial data."]
                      : i === 2
                        ? ["Linked: Projects I keep moving", "Two owners named", "Linked: Weekly review"]
                        : ["Decided: 27th, pricing, Sam on the note", "Open: April support", "Seen again in 11 notes"]
                  ).map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                {i === 3 && <p className="v1-field__done">Nothing else to do</p>}
              </div>
              <p className="v1-field__clause">{f.clause}</p>
              <p className="v1-field__body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- a moving picture ---------------- */}
      <section className="v1-film" aria-labelledby="v1-film-h">
        <Reveal className="v1-film__media">
          <video
            className="v1-film__video"
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
        </Reveal>
        <Reveal className="v1-film__text" delay={80}>
          <h2 id="v1-film-h" className="v1-h2">
            The filing was the hard part
          </h2>
          <p>
            A card catalogue held the world’s knowledge in one drawer at a time, and it worked only because every card
            had an address. One idea, one address, forever. Lattice keeps the drawer and drops the address.
          </p>
        </Reveal>
      </section>

      {/* ---------------- what it is made of ---------------- */}
      <section className="v1-material" aria-labelledby="v1-material-h">
        <div className="v1-material__head">
          <Reveal as="h2" id="v1-material-h" className="v1-h2">
            Built from files
          </Reveal>
          <Reveal as="p" className="v1-material__claim" delay={70}>
            Your notes are files. That is the whole storage model, and the reason you can leave.
          </Reveal>
        </div>
        <div className="v1-tiles">
          {TILES.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`v1-tile v1-tile--${i}${tile === i ? " is-open" : ""}`}
              onClick={() => setTile(i)}
              aria-pressed={tile === i}
            >
              <span className="v1-tile__name">{t.name}</span>
              <span className="v1-tile__line">{t.line}</span>
            </button>
          ))}
          <figure className="v1-tile v1-tile--photo">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/card-catalog-2.jpg"
              alt="A wooden card catalogue, each drawer labelled with a range of names."
              width={1920}
              height={1440}
              loading="lazy"
            />
            <figcaption>Drawers, ranges, one address per card.</figcaption>
          </figure>
          <figure className="v1-tile v1-tile--photo">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/library-desk-reading-room-mitchell-building.jpg"
              alt="A library desk in the reading room of the Mitchell Building, photographed in 1943."
              width={1920}
              height={1475}
              loading="lazy"
            />
            <figcaption>Reading room desk, Sydney, 1943.</figcaption>
          </figure>
          <figure className="v1-tile v1-tile--photo">
            <img
              src="/variants/with-taste-skill/deepseek-v4-1-flash/trobe-reading-room-state-library-of-victoria.jpg"
              alt="The octagonal reading room of the State Library of Victoria seen from above."
              width={1920}
              height={1281}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <Faq />

      {/* ---------------- the first screen, already open ---------------- */}
      <section className="v1-start" id="start" aria-labelledby="v1-start-h">
        <div className="v1-start__text">
          <h2 id="v1-start-h">
            Start with
            <br />
            one note
          </h2>
          <p>Name the folder, write a sentence, link it to the next one. Everything else in Lattice is that, repeated.</p>
        </div>
        <StartDialog />
      </section>

      <footer className="v1-foot">
        <p className="v1-foot__mark">Lattice</p>
        <div className="v1-foot__cols">
          <p>
            A note-taking app for people who intend to read their notes again. Files you own, links kept both ways,
            four platforms and no server in the middle.
          </p>
          <p>
            Pictures: <em>Card Catalog 2</em> by mamsy (CC BY 2.0); <em>Library desk, Reading Room, Mitchell
            Building</em>, Pix Magazine, public domain; clip <em>Olivetti Dora portable typewriter</em> by Erik
            Pålsson (CC BY 3.0), all via Wikimedia Commons.
          </p>
        </div>
        <p className="v1-foot__legal">Lattice · design one of five</p>
      </footer>
    </div>
  );
}
