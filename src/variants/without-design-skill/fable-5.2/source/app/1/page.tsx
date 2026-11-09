import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Demo } from "./demo";
import s from "./page.module.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workbench",
  description:
    "Engram is a notes app that works like a second brain. Capture a thought in a keystroke, and the notes it belongs with come back on their own.",
};

function Logo() {
  return (
    <span className={s.logo}>
      <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true">
        <circle cx="9" cy="10" r="7" className={s.logoA} />
        <circle cx="18.5" cy="10" r="6.25" className={s.logoB} />
      </svg>
      Engram
    </span>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={s.arrow}>
    <path d="M3 8h9.5M8.5 4l4 4-4 4" />
  </svg>
);

const plans = [
  {
    name: "Free",
    price: "$0",
    per: "forever",
    blurb: "A complete second brain on one device.",
    cta: "Download",
    points: [
      "Unlimited notes, links and backlinks",
      "Related notes as you write",
      "Instant local search",
      "Plain Markdown files, no account",
    ],
  },
  {
    name: "Pro",
    price: "$8",
    per: "per month, billed yearly",
    blurb: "The same brain on every device you own.",
    cta: "Start 30-day trial",
    featured: true,
    points: [
      "Everything in Free",
      "End-to-end encrypted sync",
      "Recall: ask your notes anything",
      "A year of version history",
      "Capture by email, voice and Kindle",
    ],
  },
  {
    name: "Team",
    price: "$12",
    per: "per person, per month",
    blurb: "A shared memory for people who work together.",
    cta: "Talk to us",
    points: [
      "Everything in Pro",
      "Shared spaces with private notes",
      "Permissions and SSO",
      "Priority support from humans",
    ],
  },
];

export default function Workbench() {
  return (
    <div className={`${s.page} ${sans.variable}`}>
      <header className={s.nav}>
        <div className={s.navInner}>
          <a href="#top" aria-label="Engram home">
            <Logo />
          </a>
          <nav aria-label="Primary" className={s.navLinks}>
            <a href="#how">How it works</a>
            <a href="#files">Your files</a>
            <a href="#pricing">Pricing</a>
            <a href="#pricing">Changelog</a>
          </nav>
          <div className={s.navEnd}>
            <a href="#pricing" className={s.signin}>
              Sign in
            </a>
            <a href="#pricing" className={s.navCta}>
              Download
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------- hero */}
        <section className={s.hero}>
          <div className={s.wrap}>
            <div className={s.heroGrid}>
              <div>
                <a href="#recall" className={s.badge}>
                  <b>New</b>
                  Recall 2 — ask your notes anything
                  <Arrow />
                </a>
                <h1 className={s.h1}>
                  Think with <span className={s.linkword}>everything</span> you’ve ever written.
                </h1>
              </div>
              <div className={s.heroSide}>
                <p className={s.lede}>
                  Engram is a notes app that works like a second brain. Capture a thought in a
                  keystroke, and the notes it belongs with come back on their own.
                </p>
                <div className={s.actions}>
                  <a href="#pricing" className={s.primary}>
                    Download — it’s free
                  </a>
                  <a href="#demo" className={s.ghost}>
                    Try it right here
                    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={s.arrow}>
                      <path d="M8 3v9.5M4 8.5l4 4 4-4" />
                    </svg>
                  </a>
                </div>
                <p className={s.fine}>macOS · Windows · Linux · iOS · Android. No account needed.</p>
              </div>
            </div>

            <div id="demo" className={s.demo}>
              <p className={s.demoHint}>
                <span>Not a screenshot.</span> Click into the note and write — watch the right-hand
                column.
              </p>
              <Demo />
            </div>

            <dl className={s.specs}>
              <div>
                <dt>Capture</dt>
                <dd>
                  <kbd>⌥</kbd>
                  <kbd>Space</kbd> from any app
                </dd>
              </div>
              <div>
                <dt>Connect</dt>
                <dd>
                  <kbd>[[</kbd> links, both directions
                </dd>
              </div>
              <div>
                <dt>Recall</dt>
                <dd>Related notes, unprompted</dd>
              </div>
              <div>
                <dt>Own</dt>
                <dd>Plain .md files on your disk</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------- how it works */}
        <section id="how" className={s.section}>
          <div className={s.wrap}>
            <header className={s.sectionHead}>
              <p className={s.eyebrow}>How it works</p>
              <h2 className={s.h2}>
                A second brain has three jobs. <span>Most notes apps stop at the first.</span>
              </h2>
            </header>

            <div className={s.bento}>
              <article className={`${s.card} ${s.cardCapture}`}>
                <p className={s.step}>
                  <b>01</b> Capture
                </p>
                <h3>Out of your head in one keystroke.</h3>
                <p>
                  Hit ⌥ Space from anywhere, type, press return. No folder to pick, no title to
                  invent. If you had to file it first, you wouldn’t have written it down.
                </p>
                <div className={s.capture} aria-hidden="true">
                  <div className={s.capBar}>
                    <span className={s.capIcon}>
                      <svg viewBox="0 0 16 16" width="15" height="15">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                    <span className={s.capText}>
                      Ask Ines about the ’74 ferry logs
                      <i />
                    </span>
                    <kbd>↵</kbd>
                  </div>
                  <ul className={s.capSources}>
                    <li>Web clipper</li>
                    <li>Voice memo</li>
                    <li>Forwarded email</li>
                    <li>Kindle highlights</li>
                    <li>Whiteboard photo</li>
                  </ul>
                </div>
              </article>

              <article className={`${s.card} ${s.cardConnect}`}>
                <p className={s.step}>
                  <b>02</b> Connect
                </p>
                <h3>Notes find their relatives.</h3>
                <p>
                  Type <code>[[</code> to link by hand — or don’t. Engram reads what you write and
                  proposes the links you would have made with infinite patience.
                </p>
                <div className={s.connect} aria-hidden="true">
                  <div className={s.mini}>
                    <span>May 2023</span>
                    <b>Walking makes ideas</b>
                    <p>
                      Every good idea this year arrived <mark>on foot</mark>. Twenty minutes, no
                      headphones.
                    </p>
                  </div>
                  <svg className={s.wire} viewBox="0 0 120 80" preserveAspectRatio="none">
                    <path d="M0 22 C 60 22, 60 58, 120 58" />
                    <circle cx="0" cy="22" r="3.5" />
                    <circle cx="120" cy="58" r="3.5" />
                  </svg>
                  <div className={s.mini}>
                    <span>Jun 2022</span>
                    <b>Jane Jacobs on sidewalks</b>
                    <p>
                      A block is safe when many people have small reasons to <mark>walk</mark> down
                      it.
                    </p>
                  </div>
                  <p className={s.suggest}>
                    <i /> 2 unlinked mentions found
                    <span>Link both</span>
                  </p>
                </div>
              </article>

              <article id="recall" className={`${s.card} ${s.cardRecall}`}>
                <p className={s.step}>
                  <b>03</b> Recall
                </p>
                <h3>Ask your past self.</h3>
                <p>
                  Ask in plain language. The answer is assembled from your own notes, in your own
                  words, with every claim pointing at the note it came from.
                </p>
                <div className={s.ask} aria-hidden="true">
                  <p className={s.q}>What did I decide about pricing tiers?</p>
                  <p className={s.a}>
                    You concluded the middle plan mostly existed to make the top one look sane
                    <sup>1</sup>, and that pricing should start from what a customer would miss if it
                    vanished<sup>1</sup>. At the March retro you agreed to trial two tiers for a
                    quarter<sup>2</sup>.
                  </p>
                  <ol className={s.cites}>
                    <li>
                      <b>1</b> Pricing: three tiers is a habit, not a law <span>Oct 2023</span>
                    </li>
                    <li>
                      <b>2</b> Launch retro, what we’d change <span>Mar 2024</span>
                    </li>
                  </ol>
                </div>
              </article>

              <article className={`${s.card} ${s.cardReview}`}>
                <p className={s.step}>
                  <b>+</b> Daily review
                </p>
                <h3>Three old notes, every morning.</h3>
                <p>Chosen because of what you’re working on now. Keep, link, or let them sink again.</p>
                <ul className={s.review} aria-hidden="true">
                  <li>
                    <span>3 years ago today</span>
                    <b>Jane Jacobs on sidewalks</b>
                  </li>
                  <li>
                    <span>Linked 6 times, never reopened</span>
                    <b>Questions to ask before saying yes</b>
                  </li>
                  <li>
                    <span>Left half-finished in July</span>
                    <b>Talk idea: tools for forgetting</b>
                  </li>
                </ul>
              </article>
            </div>

            <ul className={s.facts}>
              <li>
                <b>40 ms</b>
                <span>to search 100,000 notes, on-device</span>
              </li>
              <li>
                <b>0</b>
                <span>folders you have to maintain</span>
              </li>
              <li>
                <b>14</b>
                <span>importers, from Notion to paper scans</span>
              </li>
              <li>
                <b>100%</b>
                <span>of it works on a plane</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- files */}
        <section id="files" className={s.files}>
          <div className={`${s.wrap} ${s.filesGrid}`}>
            <div>
              <p className={s.eyebrow}>Ownership</p>
              <h2 className={s.h2}>Your notes are files. On your disk. In plain text.</h2>
              <p className={s.filesLede}>
                Engram is a window onto a folder of Markdown. If you ever leave, there is nothing to
                export — you already have everything.
              </p>
              <dl className={s.pledges}>
                <div>
                  <dt>Local-first</dt>
                  <dd>Every note opens instantly, with no account and no network.</dd>
                </div>
                <div>
                  <dt>End-to-end encrypted</dt>
                  <dd>Sync stores ciphertext. We can’t read it, sell it, or train on it.</dd>
                </div>
                <div>
                  <dt>No lock-in</dt>
                  <dd>Real folders, real .md files. Open them in anything, for decades.</dd>
                </div>
              </dl>
            </div>

            <div className={s.term} aria-hidden="true">
              <div className={s.termBar}>
                <span>~/Engram</span>
                <span>1,284 files · 6.1 MB</span>
              </div>
              <div className={s.termBody}>
                <pre className={s.tree}>
                  {`Engram/
├─ inbox/
│  └─ why-i-forget.md
├─ notes/
│  ├─ `}
                  <b>the-forgetting-curve.md</b>
                  {`
│  ├─ walking-makes-ideas.md
│  ├─ sourdough.md
│  └─ … 1,279 more
└─ daily/
   └─ 2026-11-09.md`}
                </pre>
                <pre className={s.file}>
                  <i>{`---
created: 2023-03-14
links:   [spaced-repetition]
---`}</i>
                  {`
`}
                  <b># The forgetting curve</b>
                  {`

Without review, most of a lesson
is gone within days. See `}
                  <u>[[Spaced repetition]]</u>
                  {`.`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- voices */}
        <section className={s.section}>
          <div className={s.wrap}>
            <header className={s.sectionHead}>
              <p className={s.eyebrow}>From people who use it</p>
              <h2 className={s.h2}>
                “I stopped organising my notes in week two.”
              </h2>
            </header>
            <div className={s.voices}>
              <figure>
                <blockquote>
                  Things just turn up while I’m writing about them. My thesis has footnotes I’d
                  forgotten I had.
                </blockquote>
                <figcaption>
                  <b>Priya Raman</b>
                  <span>Doctoral researcher, history of science</span>
                </figcaption>
              </figure>
              <figure>
                <blockquote>
                  It’s the first tool that made my old notes useful instead of guilty. Eight years of
                  them, suddenly talking to each other.
                </blockquote>
                <figcaption>
                  <b>Tomás Herrera</b>
                  <span>Product designer</span>
                </figcaption>
              </figure>
              <figure>
                <blockquote>
                  Plain files, real sync, zero lock-in. I checked. Twice. Then I moved 11,000 notes
                  over in an afternoon.
                </blockquote>
                <figcaption>
                  <b>Annika Sørensen</b>
                  <span>Staff engineer</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- pricing */}
        <section id="pricing" className={`${s.section} ${s.pricing}`}>
          <div className={s.wrap}>
            <header className={s.sectionHead}>
              <p className={s.eyebrow}>Pricing</p>
              <h2 className={s.h2}>
                Free on one device. <span>Eight dollars to have it everywhere.</span>
              </h2>
            </header>
            <div className={s.plans}>
              {plans.map((p) => (
                <article key={p.name} className={s.plan} data-featured={p.featured || undefined}>
                  <h3>{p.name}</h3>
                  <p className={s.price}>
                    <b>{p.price}</b>
                    <span>{p.per}</span>
                  </p>
                  <p className={s.planBlurb}>{p.blurb}</p>
                  <a href="#top" className={p.featured ? s.primary : s.ghost}>
                    {p.cta}
                  </a>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>
                        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                          <path d="M3 8.5 6.5 12 13 4.5" />
                        </svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ cta */}
        <section className={s.cta}>
          <div className={s.wrap}>
            <h2>
              Start with one note.
              <br />
              <span>The second one will find it.</span>
            </h2>
            <div className={s.actions}>
              <a href="#top" className={s.primary}>
                Download for macOS
              </a>
              <a href="#top" className={s.ghost}>
                Windows
              </a>
              <a href="#top" className={s.ghost}>
                Linux
              </a>
              <a href="#top" className={s.ghost}>
                iOS &amp; Android
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.footGrid}`}>
          <div>
            <Logo />
            <p>A second brain in plain text. Made by nine people who forget things for a living.</p>
          </div>
          <nav aria-label="Product">
            <h4>Product</h4>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#top">Changelog</a>
            <a href="#top">Roadmap</a>
          </nav>
          <nav aria-label="Resources">
            <h4>Resources</h4>
            <a href="#top">Manual</a>
            <a href="#top">Importers</a>
            <a href="#files">File format</a>
            <a href="#top">Security paper</a>
          </nav>
          <nav aria-label="Company">
            <h4>Company</h4>
            <a href="#top">About</a>
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#top">Contact</a>
          </nav>
        </div>
        <div className={`${s.wrap} ${s.footEnd}`}>
          <span>© 2026 Engram Labs</span>
          <span>v3.2.0 · all systems normal</span>
        </div>
      </footer>
    </div>
  );
}
