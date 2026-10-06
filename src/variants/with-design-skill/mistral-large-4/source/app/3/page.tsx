import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/mistral-large-4/source/app/3/journal.css";

export const metadata: Metadata = {
  title: "Mnemosyne — The Field Journal",
  description:
    "A second brain that grows like a garden. Plant a note, tend the connections, watch what takes root.",
};

const SPECIMENS = [
  {
    name: "Capture",
    latin: "Nota capta",
    note: "A thought, caught mid-flight. One field, no filing, no friction. The journal is always open on the desk.",
  },
  {
    name: "Connect",
    latin: "Nexus crescens",
    note: "When a new note resembles an old one, a vine grows between them. You tend the garden; it does the remembering.",
  },
  {
    name: "Return",
    latin: "Revenire ad hortum",
    note: "Wander back through the rows. Search by season, by species, by the feeling of a Tuesday in October.",
  },
];

const ROWS = [
  { date: "Oct 04", entry: "Pressed a fern on the trail behind the studio" },
  { date: "Oct 02", entry: "Marginalia from Powers, 'The Overstory' — ch. 4" },
  { date: "Sep 29", entry: "Seed idea: a calendar that only shows questions" },
  { date: "Sep 24", entry: "Clipping: gardens as memory palaces, 1911" },
  { date: "Sep 19", entry: "Transcribed the dream about the lighthouse" },
];

export default function JournalPage() {
  return (
    <div className="journal">
      <header className="journal__top">
        <div className="journal__brand">Mnemosyne</div>
        <nav className="journal__nav" aria-label="Primary">
          <a href="#garden">The garden</a>
          <a href="#rows">Field rows</a>
          <a href="#plant">Plant one</a>
        </nav>
      </header>

      <main>
        <section className="journal__hero" id="garden">
          <div className="journal__hero-copy">
            <p className="journal__season">Field journal · Autumn term</p>
            <h1 className="journal__title">
              Knowledge,
              <br />
              tended like a garden.
            </h1>
            <p className="journal__lede">
              Mnemosyne is a second brain that grows. Plant a note and it takes
              root. Tend the connections between your thoughts and watch
              something living take shape — a garden only you could have grown.
            </p>
            <div className="journal__actions">
              <a className="journal__cta" href="#plant">
                Plant your first note
              </a>
              <a className="journal__ghost" href="#rows">
                Walk the rows
              </a>
            </div>
          </div>

          <figure className="journal__vine-fig" aria-hidden="true">
            <svg
              className="journal__vine"
              viewBox="0 0 400 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="journal__vine-stem"
                d="M200 510 C 190 430, 230 380, 205 320 C 180 260, 150 240, 165 180 C 178 128, 230 120, 225 70 C 222 40, 205 25, 200 10"
                stroke="#3e5c41"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                className="journal__vine-stem journal__vine-stem--2"
                d="M205 320 C 250 300, 280 270, 285 220 C 289 180, 270 160, 285 130"
                stroke="#3e5c41"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                className="journal__vine-stem journal__vine-stem--3"
                d="M203 380 C 160 365, 130 340, 122 300 C 116 268, 132 250, 122 224"
                stroke="#3e5c41"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <g className="journal__leaf journal__leaf--1">
                <path d="M205 320 C 175 305, 150 285, 148 255 C 178 262, 200 285, 205 320 Z" fill="#4a6b4e" />
                <path d="M205 320 C 175 305, 150 285, 148 255" stroke="#3e5c41" strokeWidth="1.4" />
              </g>
              <g className="journal__leaf journal__leaf--2">
                <path d="M285 220 C 315 205, 338 185, 340 155 C 310 162, 290 185, 285 220 Z" fill="#557a58" />
                <path d="M285 220 C 315 205, 338 185, 340 155" stroke="#3e5c41" strokeWidth="1.4" />
              </g>
              <g className="journal__leaf journal__leaf--3">
                <path d="M122 300 C 92 288, 70 268, 68 240 C 98 246, 118 268, 122 300 Z" fill="#4a6b4e" />
                <path d="M122 300 C 92 288, 70 268, 68 240" stroke="#3e5c41" strokeWidth="1.4" />
              </g>
              <g className="journal__leaf journal__leaf--4">
                <path d="M225 70 C 250 58, 268 40, 270 16 C 244 22, 228 42, 225 70 Z" fill="#5d8560" />
                <path d="M225 70 C 250 58, 268 40, 270 16" stroke="#3e5c41" strokeWidth="1.4" />
              </g>
              <g className="journal__bud">
                <circle cx="200" cy="10" r="7" fill="#c96f4a" />
                <circle cx="200" cy="10" r="3" fill="#e09a76" />
              </g>
              <g className="journal__bud journal__bud--2">
                <circle cx="285" cy="130" r="5.5" fill="#c96f4a" />
              </g>
              <g className="journal__bud journal__bud--3">
                <circle cx="122" cy="224" r="5.5" fill="#c96f4a" />
              </g>
            </svg>
            <figcaption className="journal__figcap">
              Fig. 1 — Mnemosyne memorabilia, the linking vine
            </figcaption>
          </figure>
        </section>

        <section className="journal__specimens">
          <div className="journal__specimens-head">
            <h2 className="journal__h2">Three habits of the garden</h2>
            <p>What you do, in the order the garden asks for it.</p>
          </div>
          <div className="journal__specimen-grid">
            {SPECIMENS.map((s) => (
              <article key={s.name} className="journal__specimen">
                <div className="journal__specimen-press" aria-hidden="true">
                  <span className="journal__specimen-tape" />
                  <h3 className="journal__specimen-name">{s.name}</h3>
                  <p className="journal__specimen-latin">{s.latin}</p>
                </div>
                <p className="journal__specimen-note">{s.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="journal__rows" id="rows">
          <div className="journal__rows-head">
            <h2 className="journal__h2">This week&rsquo;s rows</h2>
            <p>Recently planted, recently tended.</p>
          </div>
          <ul className="journal__row-list">
            {ROWS.map((r) => (
              <li key={r.date + r.entry} className="journal__row">
                <span className="journal__row-date">{r.date}</span>
                <span className="journal__row-entry">{r.entry}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="journal__plant" id="plant">
          <h2 className="journal__plant-title">Plant the first note.</h2>
          <p className="journal__plant-copy">
            The garden starts empty, and that is what makes it yours. Leave
            your address and we will send you a seed card.
          </p>
          <form className="journal__form" action="#plant">
            <label className="journal__label" htmlFor="journal-email">
              Your address, for the seed card
            </label>
            <div className="journal__form-row">
              <input
                id="journal-email"
                type="email"
                required
                placeholder="you@example.com"
                className="journal__input"
              />
              <button type="submit" className="journal__cta">
                Send the seed card
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="journal__footer">
        <span>Mnemosyne — a garden for your thoughts</span>
        <span>Iteration 03 · The Field Journal</span>
      </footer>
    </div>
  );
}
