import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/mistral-large-4/source/app/4/modernist.css";

export const metadata: Metadata = {
  title: "Mnemosyne — The Modernist",
  description:
    "A second brain built on a grid. Capture, connect, retrieve — in that order, on the line.",
};

const PRINCIPLES = [
  {
    no: "01",
    title: "One inbox",
    body: "Everything lands in a single capture field. No folders, no filing decisions, no friction at the moment of thought.",
  },
  {
    no: "02",
    title: "Links over hierarchy",
    body: "Structure emerges from connections, not containers. A note is defined by what it points to.",
  },
  {
    no: "03",
    title: "Retrieval by recall",
    body: "Search the way you remember: half a phrase, a feeling, a Tuesday. The grid underneath does the rest.",
  },
];

const SPECS = [
  ["Latency, capture to saved", "< 90 ms"],
  ["Notes linked per brain, median", "1,400"],
  ["Offline", "Full"],
  ["Export", "Plain text, always"],
  ["Price", "Free while in beta"],
];

export default function ModernistPage() {
  return (
    <div className="mod">
      <div className="mod__thread" aria-hidden="true" />

      <header className="mod__masthead">
        <div className="mod__brand">Mnemosyne</div>
        <div className="mod__issue">Second brain · Grid edition · No. 04</div>
        <nav className="mod__nav" aria-label="Primary">
          <a href="#system">System</a>
          <a href="#specs">Specs</a>
          <a href="#order">Order</a>
        </nav>
      </header>

      <main>
        <section className="mod__hero">
          <div className="mod__hero-left">
            <h1 className="mod__title">
              THINKING,
              <br />
              ON A GRID.
            </h1>
          </div>
          <div className="mod__hero-right">
            <p className="mod__lede">
              Mnemosyne is a second brain with the discipline of a grid and the
              reach of a network. Capture a thought in one field. Link it to
              what you already know. Retrieve it by remembering, not by filing.
            </p>
            <div className="mod__actions">
              <a className="mod__cta" href="#order">
                Start a brain
              </a>
              <a className="mod__ghost" href="#system">
                Read the system
              </a>
            </div>
          </div>
        </section>

        <section className="mod__system" id="system">
          <div className="mod__section-head">
            <span className="mod__section-no">A</span>
            <h2 className="mod__h2">The system</h2>
            <p className="mod__section-note">Three operations. No more.</p>
          </div>
          <div className="mod__principles">
            {PRINCIPLES.map((p) => (
              <article key={p.no} className="mod__principle">
                <span className="mod__principle-no">{p.no}</span>
                <h3 className="mod__principle-title">{p.title}</h3>
                <p className="mod__principle-body">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mod__specs" id="specs">
          <div className="mod__section-head">
            <span className="mod__section-no">B</span>
            <h2 className="mod__h2">Specifications</h2>
            <p className="mod__section-note">Measured, not promised.</p>
          </div>
          <dl className="mod__spec-list">
            {SPECS.map(([term, value]) => (
              <div key={term} className="mod__spec-row">
                <dt className="mod__spec-term">{term}</dt>
                <dd className="mod__spec-value">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mod__order" id="order">
          <div className="mod__section-head mod__section-head--dark">
            <span className="mod__section-no">C</span>
            <h2 className="mod__h2">Begin</h2>
            <p className="mod__section-note">The grid is waiting.</p>
          </div>
          <form className="mod__form" action="#order">
            <label className="mod__label" htmlFor="mod-email">
              Email for the beta key
            </label>
            <div className="mod__form-row">
              <input
                id="mod-email"
                type="email"
                required
                placeholder="you@example.com"
                className="mod__input"
              />
              <button type="submit" className="mod__cta">
                Reserve a grid
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="mod__footer">
        <span>Mnemosyne — set in Archivo</span>
        <span>Iteration 04 · The Modernist</span>
      </footer>
    </div>
  );
}
