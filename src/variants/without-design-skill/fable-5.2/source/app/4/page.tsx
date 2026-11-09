import type { Metadata } from "next";
import { Archivo, Courier_Prime } from "next/font/google";
import { Deck } from "./deck";
import s from "./page.module.css";

const grotesk = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const typewriter = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zettel",
  description:
    "Forget everything. Engram remembers it for you: one idea per card, every card linked. A second brain built on the index card.",
};

const index = [
  ["A", "Ask", "Put a question to the box. It answers in your own words and cites the cards.", "1b"],
  ["B", "Backlinks", "Every card knows which other cards point at it.", "1a1"],
  ["C", "Capture", "⌥ Space from anywhere. Voice, share sheet, email-in.", "1a"],
  ["D", "Daily review", "Three old cards on your desk each morning.", "3"],
  ["E", "Encryption", "End to end. We hold ciphertext and nothing else.", "2"],
  ["F", "Files", "Plain Markdown in a folder you own. No export needed.", "2"],
  ["G", "Graph", "Stand back and see the shape of what you know.", "1a1"],
  ["I", "Import", "Notion, Evernote, Obsidian, Apple Notes, paper scans.", "4"],
  ["K", "Keyboard", "Everything has a key. The mouse is optional.", "5"],
  ["O", "Offline", "All of it works on a plane, in a basement, in 2060.", "2"],
  ["S", "Sync", "Mac, Windows, Linux, iOS, Android. One box, everywhere.", "2a"],
  ["V", "Versions", "A year of history on every card you change.", "2b"],
];

const marquee = [
  "One idea per card",
  "Every card linked",
  "Nothing ever lost",
  "Plain text forever",
  "The box answers back",
];

export default function Zettel() {
  return (
    <div className={`${s.page} ${grotesk.variable} ${typewriter.variable}`}>
      {/* ------------------------------------------------------------ hero */}
      <div className={s.red}>
        <header className={s.bar}>
          <a href="#top" className={s.logo} aria-label="Engram home">
            Engram
          </a>
          <p className={s.strap}>A second brain, filed properly</p>
          <nav aria-label="Primary">
            <a href="#method">Method</a>
            <a href="#index">Index</a>
            <a href="#price">Price</a>
            <a href="#price" className={s.barCta}>
              Get the box
            </a>
          </nav>
        </header>

        <section className={s.hero} id="top">
          <h1>
            <span>Forget</span>
            <span>everything.</span>
          </h1>

          <div className={s.deckSlot}>
            <Deck />
          </div>

          <div className={s.heroRow}>
            <p className={s.heroKicker}>
              Engram{" "}
              <br />
              remembers it{" "}
              <br />
              for you.
            </p>
            <p className={s.heroText}>
              A note-taking app that works like a second brain. One idea per card, every card
              linked to the next — the method that wrote seventy books, rebuilt so it fits inside a
              keystroke.
            </p>
            <div className={s.heroActions}>
              <a href="#price" className={s.buttonBlack}>
                Start your box
                <span aria-hidden="true">→</span>
              </a>
              <p>Free on one device. No account.</p>
            </div>
          </div>
        </section>
      </div>

      {/* --------------------------------------------------------- marquee */}
      <div className={s.marquee} aria-hidden="true">
        <div>
          {[0, 1].map((k) => (
            <p key={k}>
              {marquee.map((m) => (
                <span key={m}>
                  {m} <i>✳</i>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <main>
        {/* ------------------------------------------------------ precedent */}
        <section className={s.precedent}>
          <p className={s.label}>
            <b>0</b> The precedent
          </p>
          <div className={s.precedentGrid}>
            <dl className={s.counts}>
              <div>
                <dt>90,000</dt>
                <dd>index cards</dd>
              </div>
              <div>
                <dt>70</dt>
                <dd>books</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>wooden box</dd>
              </div>
            </dl>
            <div className={s.precedentText}>
              <p>
                Niklas Luhmann, a sociologist in Bielefeld, wrote every idea on a numbered index
                card and filed it behind the idea it answered. Forty years on, the box held ninety
                thousand cards and he had published seventy books.
              </p>
              <p>
                He called it his second memory, and gave it a good share of the credit. He never
                once had to remember where anything was.
              </p>
              <p className={s.punch}>
                Engram is the box.
                <br />
                Minus the carpentry.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- method */}
        <section id="method" className={s.method}>
          <p className={s.label}>
            <b>1</b> The method
          </p>
          <div className={s.rules}>
            <article>
              <p className={s.numeral}>1</p>
              <h2>One idea per card.</h2>
              <p>
                Hit the shortcut, type the thought, press return. That’s a card. No folder to pick,
                no title to invent, nothing to tidy later.
              </p>
              <p className={s.keys} aria-hidden="true">
                <kbd>⌥</kbd>
                <kbd>Space</kbd>
                <span>capture, from anywhere</span>
              </p>
            </article>
            <article>
              <p className={s.numeral}>2</p>
              <h2>Every card linked.</h2>
              <p>
                Type two brackets and point a card at the one it answers. Links run both ways, and
                Engram suggests the ones you missed.
              </p>
              <p className={s.keys} aria-hidden="true">
                <kbd>[[</kbd>
                <kbd>]]</kbd>
                <span>link, in both directions</span>
              </p>
            </article>
            <article>
              <p className={s.numeral}>3</p>
              <h2>The box answers back.</h2>
              <p>
                Ask it something. You get your own cards in reply — the ones you’d forgotten you
                wrote — each with its address, so you can check.
              </p>
              <p className={s.keys} aria-hidden="true">
                <kbd>⌘</kbd>
                <kbd>K</kbd>
                <span>ask, in plain words</span>
              </p>
            </article>
          </div>
        </section>

        {/* ---------------------------------------------------------- index */}
        <section id="index" className={s.index}>
          <header>
            <p className={s.label}>
              <b>2</b> The index
            </p>
            <h2>
              Everything in the box, <em>A to V.</em>
            </h2>
          </header>
          <ul>
            {index.map(([letter, term, text, ref]) => (
              <li key={term}>
                <b>{letter}</b>
                <h3>{term}</h3>
                <p>{text}</p>
                <span>→ {ref}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- voices */}
        <section className={s.voices}>
          <p className={s.label}>
            <b>3</b> Filed under: praise
          </p>
          <blockquote>
            <p>
              I stopped filing.
              <br />
              It files. <em>I write.</em>
            </p>
            <footer>Hanne Lindqvist, novelist · 4,100 cards</footer>
          </blockquote>
          <div className={s.slips}>
            <figure>
              <p className={s.slipId}>3a</p>
              <blockquote>
                Eight years of notes in three apps. One afternoon to import them. They’ve been
                arguing with each other ever since.
              </blockquote>
              <figcaption>Tomás Herrera, product designer</figcaption>
            </figure>
            <figure>
              <p className={s.slipId}>3b</p>
              <blockquote>
                It’s a folder of text files with very good manners. I have checked. Nothing leaves
                my machine unencrypted.
              </blockquote>
              <figcaption>Annika Sørensen, staff engineer</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------------------------------------------------------- price */}
        <section id="price" className={s.price}>
          <p className={s.label}>
            <b>4</b> What the box costs
          </p>
          <div className={s.tiers}>
            <article>
              <p className={s.sum}>$0</p>
              <h2>
                The box <span>forever</span>
              </h2>
              <ul>
                <li>One device, forever</li>
                <li>Unlimited cards and links</li>
                <li>Daily review</li>
                <li>Plain .md files, no account</li>
              </ul>
              <a href="#top" className={s.buttonLine}>
                Download
              </a>
            </article>
            <article data-hot>
              <p className={s.sum}>$8</p>
              <h2>
                Everywhere <span>per month</span>
              </h2>
              <ul>
                <li>Every device you own</li>
                <li>End-to-end encrypted sync</li>
                <li>Ask the box anything</li>
                <li>A year of versions</li>
              </ul>
              <a href="#top" className={s.buttonBlack}>
                Start 30-day trial <span aria-hidden="true">→</span>
              </a>
            </article>
            <article>
              <p className={s.sum}>$12</p>
              <h2>
                A shared box <span>per person</span>
              </h2>
              <ul>
                <li>Shared drawers for a team</li>
                <li>Private cards stay private</li>
                <li>Permissions and SSO</li>
                <li>A human on support</li>
              </ul>
              <a href="#top" className={s.buttonLine}>
                Talk to us
              </a>
            </article>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- footer */}
      <footer className={s.footer}>
        <div className={s.footTop}>
          <h2>
            Go on.
            <br />
            Forget something.
          </h2>
          <div>
            <a href="#top" className={s.buttonBlack}>
              Start your box <span aria-hidden="true">→</span>
            </a>
            <p>macOS · Windows · Linux · iOS · Android</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <a href="#method">Method</a>
          <a href="#index">Index</a>
          <a href="#price">Price</a>
          <a href="#top">Manual</a>
          <a href="#top">Privacy</a>
          <a href="#top">Contact</a>
          <span>© 2026 Engram Labs</span>
        </nav>
        <p className={s.wordmark} aria-hidden="true">
          Engram
        </p>
      </footer>
    </div>
  );
}
