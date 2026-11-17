"use client";

import Image from "next/image";
import { useState } from "react";
import { examples, type OpenNotebook } from "./content";
import { Icon } from "./Icons";

type Props = { openNotebook: OpenNotebook };

const workflow = [
  {
    key: "capture",
    title: "Capture anything.",
    text: "Give passing thoughts, quotes, and quick observations a place to land.",
  },
  {
    key: "connect",
    title: "Connect the dots.",
    text: "Link related notes together and see how one idea leads to another.",
  },
  {
    key: "recall",
    title: "Find it again.",
    text: "Search your notebook and pick up a thread right where you left it.",
  },
];

export function Paper({ openNotebook }: Props) {
  return (
    <>
      <section className="paper-hero wrap">
        <div className="paper-intro">
          <span className="system-label">
            <span />
            Personal knowledge system
          </span>
          <h1>
            A second brain
            <br />
            for <span className="underlined">your ideas.</span>
          </h1>
          <p>
            Capture loose thoughts, connect your notes, and find the right idea
            when you need it.
          </p>
          <div className="hero-actions">
            <button className="paper-cta" onClick={() => openNotebook()}>
              Start your notebook
              <Icon name="arrow" size={19} />
            </button>
            <a className="text-action" href="#how-it-works">
              How it works
              <Icon name="down" size={15} />
            </a>
          </div>
          <div className="paper-perks">
            <span>
              <Icon name="check" size={14} />
              Free to use
            </span>
            <span>
              <Icon name="check" size={14} />
              No account needed
            </span>
          </div>
        </div>
        <figure className="stack-figure">
          <i className="registration tl" />
          <i className="registration tr" />
          <i className="registration bl" />
          <i className="registration br" />
          <div className="figure-top">
            <span>Fig. 01</span>
            <span className="drawing-sign" aria-hidden="true">
              ⌖
            </span>
          </div>
          <Image
            className="stack-art"
            src="/variants/with-design-skill/gpt-6.2-astra/art/isometric-notes.webp"
            sizes="(max-width: 760px) 92vw, 46vw"
            width={1350}
            height={900}
            alt="Three layers of a notebook, with a thought map, a yellow note, and a checklist"
            preload
          />
          <figcaption>
            <span>The idea stack</span>
            <span>Exploded view</span>
          </figcaption>
        </figure>
      </section>
      <section id="how-it-works" className="workflow">
        <div className="wrap">
          <div className="section-heading">
            <h2>How it works</h2>
            <span className="section-index">01 — 03</span>
          </div>
          <div className="workflow-grid">
            {workflow.map((s, i) => (
              <article className="workflow-card" key={s.key}>
                <div className="card-top">
                  <Image
                    src={"/variants/with-design-skill/gpt-6.2-astra/art/" + s.key + ".webp"}
                    width={86}
                    height={73}
                    alt=""
                  />
                  <span>
                    0{i + 1} / {s.key}
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="use-cases wrap" id="use-cases">
        <div>
          <h2>A notebook for the way you think.</h2>
          <p>Open a note to explore a few starting points.</p>
        </div>
        <div className="case-links">
          {[
            ["Everyday observations", "slow"],
            ["Creative projects", "shapes"],
            ["Research & references", "light"],
          ].map(([label, id]) => (
            <button key={id} onClick={() => openNotebook(id)}>
              {label}
              <Icon name="upRight" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function Flower() {
  return (
    <svg className="flower-sticker" viewBox="0 0 100 100" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="26"
          rx="12"
          ry="23"
          fill="#ff872f"
          stroke="#4e3421"
          strokeWidth="1.1"
          transform={"rotate(" + i * 40 + " 50 50)"}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill="#6e3c20" />
      <circle cx="45" cy="48" r="1.6" fill="#fff1b4" />
      <circle cx="55" cy="48" r="1.6" fill="#fff1b4" />
      <path
        d="M44 54q6 6 12-1"
        fill="none"
        stroke="#fff1b4"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Pinboard({ openNotebook }: Props) {
  return (
    <>
      <section id="pinboard" className="pinboard">
        <div className="board-intro">
          <h1>
            Good ideas
            <br />
            stick around.
          </h1>
          <p>
            A pinboard for your thoughts, finds, and favorite little accidents.
            Keep them together in Notefold.
          </p>
          <button className="pin-cta" onClick={() => openNotebook()}>
            Open my notebook
            <Icon name="arrow" />
          </button>
        </div>
        <button className="pin-photo" onClick={() => openNotebook("light")}>
          <i className="tape" />
          <Image
            src="/variants/with-design-skill/gpt-6.2-astra/art/architecture.webp"
            width={295}
            height={220}
            alt="Glass skyscrapers seen from the street below"
          />
          <span>
            Studies in light <Icon name="upRight" size={17} />
          </span>
        </button>
        <button className="pink-slip" onClick={() => openNotebook("walking")}>
          <span className="small-kicker">Idea to keep</span>
          <strong>
            Take a question
            <br />
            for a walk.
          </strong>
          <span className="slip-link">
            <Icon name="link" size={15} /> Thinking on foot
          </span>
        </button>
        <button className="yellow-slip" onClick={() => openNotebook("slow")}>
          <i className="pin-tack" />
          <span className="small-kicker">A note to self</span>
          <strong>
            Look twice.
            <br />
            Notice more.
          </strong>
          <span className="slip-dash" />
        </button>
        <div className="board-flower">
          <Flower />
        </div>
        <svg className="doodle-arrow" viewBox="0 0 130 70" aria-hidden="true">
          <path
            d="M3 8c48 55 99 44 75 19-16-20-34 19-4 25 13 4 30 1 48-3m-14-9 17 8-12 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </section>
      <section className="board-collections wrap" id="collections">
        <div className="section-heading">
          <h2>On the pinboard</h2>
          <span>Three collections</span>
        </div>
        <div className="collection-grid">
          {[
            ["Observations", "Little things worth keeping.", "slow", "sun"],
            ["References", "A home for what inspires you.", "light", "eye"],
            ["Projects", "Threads to follow up on.", "shapes", "pen"],
          ].map(([name, desc, id, icon]) => (
            <button key={id} onClick={() => openNotebook(id)}>
              <Icon name={icon as "sun" | "eye" | "pen"} size={31} />
              <div>
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
              <Icon name="upRight" size={18} />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

const mapNodes = [
  { id: "slow", x: 49, y: 49, size: 22, label: "The art of noticing" },
  { id: "light", x: 21, y: 28, size: 11, label: "Studies in light" },
  { id: "walking", x: 73, y: 23, size: 12, label: "Thinking on foot" },
  { id: "shapes", x: 19, y: 70, size: 10, label: "Borrowed shapes" },
  { id: "valley", x: 77, y: 71, size: 13, label: "The valley floor" },
  { id: "quiet", x: 50, y: 84, size: 9, label: "A quiet morning" },
];

export function Constellation({ openNotebook }: Props) {
  return (
    <>
      <section className="night-hero" id="map">
        <div className="night-inner wrap">
          <div className="night-intro">
            <div className="night-descriptor">
              <Icon name="map" size={17} /> A connected notebook
            </div>
            <h1>
              Follow your
              <br />
              train of thought.
            </h1>
            <p>
              Give each idea a place in your own constellation. Link your notes
              and wander from one thought to the next.
            </p>
            <button className="night-cta" onClick={() => openNotebook()}>
              Start a constellation <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="sky-map">
            <svg
              className="map-lines"
              viewBox="0 0 600 460"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="orbit">
                  <stop stopColor="#9586d1" stopOpacity=".23" />
                  <stop offset="1" stopColor="#9586d1" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="293" cy="228" rx="282" ry="210" fill="url(#orbit)" />
              <g
                fill="none"
                stroke="#aba0db"
                strokeWidth=".7"
                opacity=".28"
                strokeDasharray="2 6"
              >
                <ellipse
                  cx="294"
                  cy="225"
                  rx="245"
                  ry="150"
                  transform="rotate(-24 294 225)"
                />
                <ellipse
                  cx="294"
                  cy="225"
                  rx="190"
                  ry="114"
                  transform="rotate(28 294 225)"
                />
                <circle cx="294" cy="225" r="174" />
              </g>
              <g stroke="#b4a7f0" strokeWidth="1.15" opacity=".68">
                {[
                  [0, 1],
                  [0, 2],
                  [1, 3],
                  [4, 5],
                  [2, 4],
                ].map(([a, b]) => (
                  <line
                    key={a + "-" + b}
                    x1={mapNodes[a].x * 6}
                    y1={mapNodes[a].y * 4.6}
                    x2={mapNodes[b].x * 6}
                    y2={mapNodes[b].y * 4.6}
                  />
                ))}
              </g>
              {Array.from({ length: 110 }, (_, i) => (
                <circle
                  key={i}
                  cx={(i * 137 + 19) % 599}
                  cy={(i * i * 19 + i * 61) % 459}
                  r={i % 9 === 0 ? 1.7 : 0.8}
                  fill="#d9d6ef"
                  opacity={0.22 + 0.13 * (i % 5)}
                />
              ))}
            </svg>
            {mapNodes.map((n, i) => (
              <button
                key={n.id}
                className={"star-note star-" + i}
                aria-label={"Open " + n.label}
                style={{ left: n.x + "%", top: n.y + "%" }}
                onClick={() => openNotebook(n.id)}
              >
                <i style={{ width: n.size, height: n.size }} />
                <span>{n.label}</span>
              </button>
            ))}
            <div className="map-caption">
              <span>
                <i /> Sample constellation
              </span>
              <span>6 notes</span>
            </div>
          </div>
        </div>
      </section>
      <section className="night-connections wrap" id="connections">
        <h2>One thought leads to another.</h2>
        <div className="connection-path">
          {["slow", "walking", "valley"].map((id, i) => (
            <div key={id}>
              <button onClick={() => openNotebook(id)}>
                <Icon name={i === 0 ? "spark" : "note"} />
                {examples.find((n) => n.id === id)?.title}
              </button>
              {i < 2 && <span className="path-line" />}
            </div>
          ))}
        </div>
        <p>Open a note and explore its links.</p>
      </section>
    </>
  );
}

export function Journal({ openNotebook }: Props) {
  return (
    <>
      <section className="journal-hero">
        <Image
          src="/variants/with-design-skill/gpt-6.2-astra/art/field-mountain.webp"
          alt="Sunlight across an alpine valley threaded by a silver river"
          fill
          sizes="100vw"
          preload
          className="landscape"
        />
        <div className="journal-shade" />
        <div className="journal-intro wrap">
          <div className="journal-kicker">
            <Icon name="compass" size={19} /> A personal field journal
          </div>
          <h1>
            Keep what
            <br />
            you notice.
          </h1>
          <p>
            A quiet notebook for observations, wandering thoughts, and ideas you
            want to return to.
          </p>
          <button className="journal-cta" onClick={() => openNotebook()}>
            Begin a notebook <Icon name="pen" size={16} />
          </button>
        </div>
        <button
          className="photo-caption"
          onClick={() => openNotebook("valley")}
        >
          <span>From the notebook</span>The valley floor{" "}
          <Icon name="upRight" size={14} />
        </button>
      </section>
      <section className="field-notes wrap" id="field-notes">
        <div className="field-intro">
          <Icon name="compass" size={32} />
          <h2>
            Pages from <br />
            the field.
          </h2>
          <p>A few observations from an open notebook.</p>
        </div>
        <div className="field-list">
          {[
            ["01", "The valley floor", "valley"],
            ["02", "A quiet morning", "quiet"],
            ["03", "Thinking on foot", "walking"],
          ].map(([n, t, id]) => (
            <button key={n} onClick={() => openNotebook(id)}>
              <small>Entry {n}</small>
              <span>{t}</span>
              <Icon name="upRight" size={17} />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export function CardIndex({ openNotebook }: Props) {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("All");
  const rangeLabels = ["A–F", "G–L", "M–R", "S–Z"];
  const indexed = [...examples].sort((a, b) => a.title.localeCompare(b.title));
  const filtered = indexed.filter(
    (n) =>
      (range === "All" || (n.title[0] >= range[0] && n.title[0] <= range[2])) &&
      (n.title + " " + n.collection + " " + n.body)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  function browse(group: string) {
    setRange(group);
    setQuery("");
    document.getElementById("index")?.scrollIntoView();
  }
  return (
    <>
      <section className="index-hero">
        <div className="wrap index-hero-inner">
          <div className="index-intro">
            <div className="index-kicker">
              <Icon name="folder" size={17} /> Personal card index
            </div>
            <h1>
              Every idea,
              <br />
              within reach.
            </h1>
            <p>
              File your notes in a personal index. Search a word, open a card,
              and bring a thought back into focus.
            </p>
            <button className="index-cta" onClick={() => openNotebook("new")}>
              Create a note
              <Icon name="plus" size={17} />
            </button>
          </div>
          <div className="index-card-art" aria-label="Browse by title">
            {rangeLabels.map((label, i) => (
              <div key={label} className={"file-card file-" + i}>
                <button
                  className="file-tab"
                  onClick={() => browse(label)}
                  aria-label={"Browse titles " + label}
                >
                  {label}
                </button>
                <span className="file-body">
                  {i === 3 && (
                    <>
                      <span className="index-card-head">
                        <span>Notefold</span>
                        <Icon name="grid" size={25} />
                      </span>
                      <strong>
                        Subject
                        <br />
                        index
                      </strong>
                      <span className="file-line" />
                      <span className="file-bottom">
                        Personal collection <span>NF / 001</span>
                      </span>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="index-browser wrap" id="index">
        <div className="section-heading">
          <h2>Browse the index</h2>
          <label className="index-search">
            <Icon name="search" size={17} />
            <input
              aria-label="Search example notes"
              placeholder="Search notes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="index-filters">
          {["All", ...rangeLabels].map((r) => (
            <button
              key={r}
              aria-pressed={range === r}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="catalog">
          {filtered.map((n) => (
            <button key={n.id} onClick={() => openNotebook(n.id)}>
              <span>{String(indexed.indexOf(n) + 1).padStart(3, "0")}</span>
              <strong>{n.title}</strong>
              <small>{n.collection}</small>
              <Icon name="upRight" size={18} />
            </button>
          ))}
          {!filtered.length && (
            <p className="empty-state">
              No notes in this selection. Try another letter range or search
              term.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
