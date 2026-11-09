import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Newsreader, Reenie_Beanie } from "next/font/google";
import { Reveal } from "./reveal";
import s from "./page.module.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-plex-mono",
  display: "swap",
});

const hand = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marginalia",
  description:
    "You’ve already had your best ideas. You just can’t find them. An essay about second brains, and the note-taking app that is one.",
};

/* ---------- small typographic parts ---------- */

/** Highlighter stroke that draws itself in when scrolled to. */
function Hl({ children }: { children: ReactNode }) {
  return (
    <span className={s.hl} data-ink>
      {children}
    </span>
  );
}

/** A [[wiki link]] with a preview card on hover or focus. */
function Wiki({
  children,
  title,
  meta,
  excerpt,
  foot,
}: {
  children: ReactNode;
  title: string;
  meta: string;
  excerpt: string;
  foot: string;
}) {
  return (
    <span className={s.wiki} tabIndex={0}>
      <span className={s.wikiBr} aria-hidden="true">
        [[
      </span>
      <span className={s.wikiText}>{children}</span>
      <span className={s.wikiBr} aria-hidden="true">
        ]]
      </span>
      <span className={s.preview} role="note">
        <span className={s.previewMeta}>{meta}</span>
        <span className={s.previewTitle}>{title}</span>
        <span className={s.previewBody}>{excerpt}</span>
        <span className={s.previewFoot}>{foot}</span>
      </span>
    </span>
  );
}

function Logo() {
  return (
    <span className={s.logo}>
      <svg viewBox="0 0 30 20" width="30" height="20" aria-hidden="true">
        <circle cx="9.5" cy="10" r="7.5" className={s.logoInk} />
        <path
          d="M12.7 10.6c.1-4.4 3.2-7.5 7.6-7.4 4.2.1 7.3 3.3 7.1 7.3-.2 4-3.4 6.9-7.6 6.8-4.1-.1-7-2.8-7.2-6.2"
          className={s.logoPencil}
        />
      </svg>
      Engram
    </span>
  );
}

/* A margin row: text on the left, notes on the right. */
function Row({ children, side }: { children: ReactNode; side?: ReactNode }) {
  return (
    <div className={s.row}>
      <div className={s.main}>{children}</div>
      {side ? <aside className={s.side}>{side}</aside> : null}
    </div>
  );
}

export default function Marginalia() {
  return (
    <div className={`${s.page} ${serif.variable} ${mono.variable} ${hand.variable}`} id="marginalia">
      <Reveal rootId="marginalia" />

      <header className={s.bar}>
        <div className={s.barInner}>
          <a href="#top" aria-label="Engram home">
            <Logo />
          </a>
          <nav aria-label="Sections" className={s.barNav}>
            <a href="#leak">The argument</a>
            <a href="#how">How it works</a>
            <a href="#cost">What it costs</a>
          </nav>
          <a href="#get" className={s.barCta}>
            Download
          </a>
        </div>
        <div className={s.progress} aria-hidden="true" />
      </header>

      <main id="top" className={s.sheet}>
        {/* ------------------------------------------------------- title */}
        <header className={s.title}>
          <p className={s.kicker}>
            <span>Engram</span>
            <span>Notes toward a second brain</span>
            <span>No. 1</span>
          </p>
          <h1>
            You’ve already had your best ideas.{" "}
            <em>
              You just can’t{" "}
              <span className={s.scored}>
                find them.
                <svg viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true" data-ink>
                  <path d="M3 11c38-6 71 5 112-1s83-5 121 1 46-2 61-1" pathLength="1" />
                </svg>
              </span>
            </em>
          </h1>
        </header>

        <Row
          side={
            <p className={`${s.scribble} ${s.scribbleTop}`} data-ink>
              the short version
              <svg viewBox="0 0 60 44" aria-hidden="true">
                <path d="M52 4C40 6 18 12 10 34" pathLength="1" />
                <path d="M4 24l6 11 10-7" pathLength="1" />
              </svg>
            </p>
          }
        >
          <p className={s.deck}>
            Engram is a note-taking app that works like a second brain. This page explains why you
            might want one — and it’s written the way Engram notes are: linked, annotated, and
            honest about where things came from.
          </p>
          <div className={s.titleActions}>
            <a href="#get" className={s.button}>
              Download Engram — free
            </a>
            <span>
              A six-minute read. Or skip it;{" "}
              <br />
              the button works either way.
            </span>
          </div>
        </Row>

        <hr className={s.rule} />

        {/* ------------------------------------------------------ § 1 */}
        <section id="leak" className={s.section}>
          <h2>
            <span>§ 1</span> The leak
          </h2>

          <Row
            side={
              <p className={s.scribble} data-ink>
                which book, though?
              </p>
            }
          >
            <p className={s.lead}>
              Last spring you read a book that changed how you think about something. Which book?
              What, exactly, did it change? Most of us can produce a title and a warm feeling. The
              argument itself — the part you underlined — has gone wherever underlined things go.
            </p>
          </Row>

          <Row
            side={
              <figure className={s.note}>
                <svg className={s.curve} viewBox="0 0 240 124" aria-hidden="true" data-ink>
                  <path className={s.axis} d="M22 8v94h210" />
                  <path className={s.forget} d="M22 14c14 52 46 76 208 82" pathLength="1" />
                  <path
                    className={s.relearn}
                    d="M22 14c8 30 18 42 34 50V18c12 26 30 36 56 42V22c20 18 46 24 118 28"
                    pathLength="1"
                  />
                  <text x="0" y="17">
                    all
                  </text>
                  <text x="0" y="104">
                    nil
                  </text>
                  <text x="200" y="118">
                    days →
                  </text>
                </svg>
                <figcaption>
                  <sup>1</sup> Fig. 1. What survives of one reading, roughly (black). Hermann
                  Ebbinghaus drew the first of these in 1885. Every time you revisit a note, the
                  line starts over, and falls more slowly (red).
                </figcaption>
              </figure>
            }
          >
            <p>
              This is not a character flaw. A mind is very good at <em>having</em> ideas and
              remarkably careless about keeping them.<sup className={s.ref}>1</sup> People who think
              for a living have always known it, which is why they kept{" "}
              <Wiki
                title="Commonplace books"
                meta="Note · 6 backlinks"
                excerpt="A notebook for other people’s best sentences, copied out by hand and indexed by topic. Locke published his indexing method in 1706."
                foot="Created Jan 2024 · mentioned in 6 notes"
              >
                commonplace books
              </Wiki>
              , card indexes, and notebooks with the corners folded down.
            </p>
          </Row>
        </section>

        {/* ------------------------------------------------------ § 2 */}
        <section className={s.section}>
          <h2>
            <span>§ 2</span> An attic is not a brain
          </h2>

          <Row>
            <p>
              The modern fix is to save more. Clip the article, star the email, photograph the
              whiteboard. A year on, you own an attic: everything is technically in there, and
              finding any of it means remembering that it exists — which was the original problem.
            </p>
          </Row>

          <Row
            side={
              <p className={s.note}>
                <sup>2</sup> The idea is older than software. The sociologist Niklas Luhmann kept
                some 90,000 index cards and described the box as a conversation partner, one that
                regularly surprised him.
              </p>
            }
          >
            <p>
              A second brain earns the name by doing two things an attic can’t.{" "}
              <Hl>It remembers on your behalf, and it speaks up.</Hl>
              <sup className={s.ref}>2</sup> You sit down to write about pricing, and beside you
              appear the three things you already concluded about pricing last October. You didn’t
              search. It noticed.
            </p>
          </Row>
        </section>

        {/* ------------------------------------------------------ § 3 */}
        <section id="how" className={s.section}>
          <h2>
            <span>§ 3</span> How Engram does it
          </h2>

          <Row
            side={
              <div className={s.note}>
                <p className={s.keys} aria-hidden="true">
                  <kbd>⌥</kbd>
                  <i>+</i>
                  <kbd className={s.keyWide}>Space</kbd>
                </p>
                <p>
                  Also by voice memo, forwarded email, Kindle highlight, and photograph of a
                  whiteboard.
                </p>
              </div>
            }
          >
            <p>
              <b className={s.runin}>Capture.</b> One shortcut from anywhere on your computer; one
              tap on your phone. No folder to choose and no title to invent. A thought you have to
              file first is a thought you won’t write down.
            </p>
          </Row>

          <Row
            side={
              <p className={`${s.scribble} ${s.scribbleLeft}`} data-ink>
                <svg viewBox="0 0 64 30" aria-hidden="true">
                  <path d="M60 22C44 26 22 22 8 10" pathLength="1" />
                  <path d="M20 6 7 9l4 13" pathLength="1" />
                </svg>
                try it
              </p>
            }
          >
            <p>
              <b className={s.runin}>Connect.</b> Wrap a phrase in double brackets and it becomes a
              link, like this one to{" "}
              <Wiki
                title="The forgetting curve"
                meta="Note · 9 backlinks"
                excerpt="Without review, most of a lesson is gone within days. Every time you retrieve a memory, the curve flattens a little."
                foot="Created Mar 2023 · last opened yesterday"
              >
                the forgetting curve
              </Wiki>
              . Hover it. (Go on.) Every link runs both ways, so each note quietly gathers a list of
              everything that has ever mentioned it. You never draw the map. You just keep pointing,
              and one day the map is there.
            </p>
          </Row>

          <Row
            side={
              <div className={s.related}>
                <p className={s.relatedLabel}>Related · just surfaced</p>
                <article data-ink>
                  <span>You, Oct 2023</span>
                  <b>Pricing: three tiers is a habit, not a law</b>
                  <p>Start from what a customer would miss if it vanished.</p>
                </article>
                <article data-ink>
                  <span>You, May 2023</span>
                  <b>Walking makes ideas</b>
                  <p>Every good idea this year arrived on foot.</p>
                </article>
              </div>
            }
          >
            <p>
              <b className={s.runin}>Resurface.</b> This is the part that makes it a brain. While
              you write, Engram reads along and lays related notes in the margin —{" "}
              <Hl>the way two have just appeared beside this paragraph.</Hl> They’re yours, from
              months or years ago, chosen because of what you are typing right now.
            </p>
          </Row>

          <figure className={s.fig}>
            <div className={s.app} aria-hidden="true">
              <div className={s.appBar}>
                <i />
                <i />
                <i />
                <span>Inbox / Why I forget what I read</span>
              </div>
              <div className={s.appBody}>
                <div className={s.appNote}>
                  <p className={s.appDate}>Today, 9:41</p>
                  <h4>Why I forget what I read</h4>
                  <p>
                    Finished the chapter on <mark>memory</mark> last night. Strange how little of a
                    book survives the month after I read it.
                  </p>
                  <p>
                    Maybe the fix isn’t reading more. Maybe it’s a long <mark>walk</mark>, and
                    trying to explain the idea to myself out loud. See{" "}
                    <u>
                      <i>[[</i>The forgetting curve<i>]]</i>
                    </u>
                    .
                  </p>
                </div>
                <div className={s.appMargin}>
                  <p>In the margin</p>
                  <div>
                    <span>You, Mar 2023</span>
                    <b>The forgetting curve</b>
                    <p>Every time you retrieve a memory, the curve flattens a little.</p>
                  </div>
                  <div>
                    <span>You, May 2023</span>
                    <b>Walking makes ideas</b>
                    <p>Twenty minutes, no headphones, and explain the problem out loud.</p>
                  </div>
                  <div>
                    <span>You, Jan 2024</span>
                    <b>How to read a book (twice)</b>
                    <p>Close the book and write the summary from memory.</p>
                  </div>
                </div>
              </div>
              <p className={`${s.scribble} ${s.scribbleFig}`} data-ink>
                nobody searched for these
                <svg viewBox="0 0 70 40" aria-hidden="true">
                  <path d="M6 34C22 36 48 28 60 8" pathLength="1" />
                  <path d="M48 8l13-2 2 13" pathLength="1" />
                </svg>
              </p>
            </div>
            <figcaption>
              <b>Fig. 2.</b> Engram, drawn from life: the note being written, and the margin, where
              older notes turn up without being asked.
            </figcaption>
          </figure>

          <Row
            side={
              <p className={s.note}>
                <sup>3</sup> It only ever quotes you. If your notes don’t say, neither will it.
              </p>
            }
          >
            <p>
              And when you would rather ask than browse, ask. <em>What did I decide about the
              launch?</em> gets an answer assembled from your own notes, with a footnote on every
              claim.<sup className={s.ref}>3</sup>
            </p>
          </Row>
        </section>

        {/* ------------------------------------------------------ § 4 */}
        <section className={s.section}>
          <h2>
            <span>§ 4</span> Yours, in the plainest sense
          </h2>
          <Row
            side={
              <div className={s.note}>
                <p className={s.path}>~/Engram/notes/the-forgetting-curve.md</p>
                <p>
                  Markdown, specifically. It opens in anything, including whatever eventually
                  replaces us.
                </p>
              </div>
            }
          >
            <p>
              Every Engram note is a plain text file in a folder on your own computer. Sync is
              end-to-end encrypted, which means we could not read your notes if we wanted to, and
              we don’t want to. If you ever leave, take the folder.{" "}
              <Hl>There is nothing to export, because nothing was ever really imported.</Hl>
            </p>
          </Row>
        </section>

        {/* ------------------------------------------------------ § 5 */}
        <section id="cost" className={s.section}>
          <h2>
            <span>§ 5</span> What it costs
          </h2>
          <Row
            side={
              <p className={s.note}>
                Students and teachers pay half. Write to us; a person answers.
              </p>
            }
          >
            <dl className={s.prices}>
              <div>
                <dt>
                  <b>Free</b>
                  <i />
                  <span>$0</span>
                </dt>
                <dd>One device. Unlimited notes, links, and margin recall. No account.</dd>
              </div>
              <div>
                <dt>
                  <b>Everywhere</b>
                  <i />
                  <span>$8 a month</span>
                </dt>
                <dd>
                  All your devices, encrypted sync, ask-your-notes, and a year of version history.
                </dd>
              </div>
              <div>
                <dt>
                  <b>Together</b>
                  <i />
                  <span>$12 a person</span>
                </dt>
                <dd>Shared notebooks for people who work together. Private notes stay private.</dd>
              </div>
            </dl>
          </Row>
        </section>

        {/* ------------------------------------------------------ close */}
        <section id="get" className={s.close}>
          <p>
            That is the whole argument. If some of it sounded like you, the rest is practice — and
            practice starts with{" "}
            <span className={s.circled}>
              one note
              <svg viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true" data-ink>
                <path
                  d="M30 14C70 2 150 2 182 20c22 14 10 38-34 44-48 7-118 4-138-16C-4 32 20 10 62 8"
                  pathLength="1"
                />
              </svg>
            </span>
            .
          </p>
          <div className={s.closeActions}>
            <a href="#top" className={`${s.button} ${s.buttonBig}`}>
              Download Engram
            </a>
            <p>
              Free on one device, forever.
              <br />
              macOS · Windows · Linux · iOS · Android
            </p>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------- backlinks */}
      <section className={s.mentions} aria-labelledby="mentions-h">
        <div className={s.mentionsInner}>
          <header>
            <h2 id="mentions-h">3 linked mentions</h2>
            <p>Other people’s notes that point at this page.</p>
          </header>
          <ul>
            <li>
              <h3>Field notes, week 14</h3>
              <p>
                …moved the thesis notes into <mark>[[Engram]]</mark> in March. By May it was handing
                me my own footnotes before I went looking for them…
              </p>
              <span>Ines Ferreira, historian</span>
            </li>
            <li>
              <h3>Tools I actually kept</h3>
              <p>
                …it is a folder of Markdown. <mark>[[Engram]]</mark> is the first notes app I didn’t
                have to trust, which turns out to be why I do…
              </p>
              <span>Dev Malhotra, engineer</span>
            </li>
            <li>
              <h3>On being less organised</h3>
              <p>
                …I stopped filing. <mark>[[Engram]]</mark> files; I write. The novel has a subplot
                that came out of a note from 2019 I had no memory of making…
              </p>
              <span>Hanne Lindqvist, novelist</span>
            </li>
          </ul>
        </div>
      </section>

      <footer className={s.colophon}>
        <div className={s.colophonInner}>
          <div>
            <Logo />
            <p>
              Set in Newsreader and IBM Plex Mono, with annotations in a hurry. Made by nine people
              who forget things for a living.
            </p>
          </div>
          <nav aria-label="Footer">
            <a href="#how">How it works</a>
            <a href="#cost">Pricing</a>
            <a href="#top">The manual</a>
            <a href="#top">Privacy</a>
            <a href="#top">Contact</a>
          </nav>
          <p className={s.fine}>© 2026 Engram Labs · ibid.</p>
        </div>
      </footer>
    </div>
  );
}
