import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/mistral-large-4/source/app/1/archive.css";

export const metadata: Metadata = {
  title: "Mnemosyne — The Archive",
  description:
    "Every thought, catalogued. A second brain built like a library: capture it once, find it forever.",
};

const LEDGER = [
  { no: "001", title: "On the habit of morning pages", tag: "Routine", date: "Oct 02" },
  { no: "002", title: "Ideas for the studio rebrand", tag: "Work", date: "Oct 01" },
  { no: "003", title: "Quotes worth keeping: Calvino", tag: "Reading", date: "Sep 28" },
  { no: "004", title: "Trip plan — Kyoto, November", tag: "Travel", date: "Sep 25" },
  { no: "005", title: "Why we forget most of what we read", tag: "Essay draft", date: "Sep 21" },
];

const CARDS = [
  {
    no: "014",
    title: "The map is not the territory",
    body: "A note is a handle, not a container. The value is in the reaching back.",
    tag: "Philosophy",
  },
  {
    no: "015",
    title: "Connect, don't collect",
    body: "One linked thought is worth a hundred filed away. Follow the thread.",
    tag: "Method",
  },
  {
    no: "016",
    title: "Write for your future self",
    body: "You will not remember why this mattered. Write it down anyway.",
    tag: "Advice",
  },
];

export default function ArchivePage() {
  return (
    <div className="archive">
      <header className="archive__masthead">
        <div className="archive__brand">Mnemosyne</div>
        <nav className="archive__nav" aria-label="Primary">
          <a href="#method">Method</a>
          <a href="#ledger">Ledger</a>
          <a href="#start">Start</a>
        </nav>
      </header>

      <main>
        <section className="archive__hero">
          <div className="archive__hero-copy">
            <p className="archive__kicker">A second brain, kept like a library</p>
            <h1 className="archive__title">
              Every thought,
              <br />
              catalogued.
            </h1>
            <p className="archive__lede">
              Mnemosyne is a note-taking app for people who think for a living.
              Capture a thought once. Link it to what you already know. Find it
              again in seconds, years from now.
            </p>
            <div className="archive__actions">
              <a className="archive__cta" href="#start">
                Start your archive
              </a>
              <a className="archive__ghost" href="#method">
                Read the method
              </a>
            </div>
          </div>

          <div className="archive__stack" aria-hidden="true">
            {CARDS.map((card, i) => (
              <article
                key={card.no}
                className="archive__card"
                style={{
                  transform: `rotate(${(i - 1) * 2.4}deg) translate(${(i - 1) * 10}px, ${(i - 1) * 14}px)`,
                  zIndex: CARDS.length - i,
                }}
              >
                <header className="archive__card-head">
                  <span className="archive__card-no">Card {card.no}</span>
                  <span className="archive__card-tag">{card.tag}</span>
                </header>
                <h2 className="archive__card-title">{card.title}</h2>
                <p className="archive__card-body">{card.body}</p>
                <footer className="archive__card-foot">
                  <span>Linked to 3 notes</span>
                  <span>Filed Oct 04</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="archive__method" id="method">
          <div className="archive__method-grid">
            <div className="archive__method-intro">
              <h2 className="archive__h2">The method</h2>
              <p>
                No folders to maintain. No taxonomy to design. Three moves, and
                the archive tends itself.
              </p>
            </div>
            <ol className="archive__steps">
              <li className="archive__step">
                <span className="archive__step-no">I.</span>
                <div>
                  <h3>Capture</h3>
                  <p>
                    One inbox, zero friction. A thought takes half a second to
                    file — quick notes, voice memos, clipped articles.
                  </p>
                </div>
              </li>
              <li className="archive__step">
                <span className="archive__step-no">II.</span>
                <div>
                  <h3>Connect</h3>
                  <p>
                    Link a new note to an old one the moment you see the
                    resemblance. The links are the brain.
                  </p>
                </div>
              </li>
              <li className="archive__step">
                <span className="archive__step-no">III.</span>
                <div>
                  <h3>Rediscover</h3>
                  <p>
                    Search that understands you. Ask in plain language and the
                    archive surfaces the note you half-remember.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="archive__ledger" id="ledger">
          <div className="archive__ledger-head">
            <h2 className="archive__h2">From the ledger</h2>
            <p>Recently filed, recently linked.</p>
          </div>
          <ul className="archive__rows">
            {LEDGER.map((row) => (
              <li key={row.no} className="archive__row">
                <span className="archive__row-no">{row.no}</span>
                <span className="archive__row-title">{row.title}</span>
                <span className="archive__row-tag">{row.tag}</span>
                <span className="archive__row-date">{row.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="archive__start" id="start">
          <h2 className="archive__start-title">Begin with a single note.</h2>
          <p className="archive__start-copy">
            The archive grows one card at a time. Yours starts empty, and that
            is the point.
          </p>
          <form className="archive__form" action="#start">
            <label className="archive__label" htmlFor="archive-email">
              Where we send your first card
            </label>
            <div className="archive__form-row">
              <input
                id="archive-email"
                type="email"
                required
                placeholder="you@example.com"
                className="archive__input"
              />
              <button type="submit" className="archive__cta">
                Create my archive
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="archive__footer">
        <span>Mnemosyne — the memory keeper</span>
        <span>Iteration 01 · The Archive</span>
      </footer>
    </div>
  );
}
