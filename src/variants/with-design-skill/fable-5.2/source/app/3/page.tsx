import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import { Network } from "./network";
import s from "./page.module.css";

const sign = Overpass({
  subsets: ["latin"],
  variable: "--font-sign",
});

export const metadata: Metadata = {
  title: "Mull, follow a train of thought (design 3 of 5)",
};

const STOPS = [
  {
    name: "Capture",
    text: "Press Ctrl+Space in any app, type the thought, press Enter. It lands in today’s note. On a phone, share to Mull or say it aloud.",
  },
  {
    name: "Link",
    text: "Type [[ to join two notes. When you forget, Mull spots notes about the same thing and offers to link them.",
  },
  {
    name: "Resurface",
    text: "While you write, Mull shows the older notes that bear on the sentence in front of you.",
  },
  {
    name: "Ask",
    text: "Ask a question in plain words. Mull answers from your own notes and names each one it used.",
  },
];

const ARRIVALS = [
  {
    due: "Now",
    line: "memory",
    note: "Spacing effect",
    written: "2 Sep 2023",
    why: "Matches the note you are writing",
  },
  {
    due: "Now",
    line: "memory",
    note: "Forgetting curve",
    written: "2 Sep 2023",
    why: "Linked to Spacing effect",
  },
  {
    due: "Fri",
    line: "cities",
    note: "Chesterton’s fence",
    written: "21 Jun 2024",
    why: "Not opened for 17 months",
  },
  {
    due: "Mon",
    line: "kitchen",
    note: "Mise en place",
    written: "19 May 2025",
    why: "Linked to Monday’s planning note",
  },
];

export default function TrainOfThought() {
  return (
    <div className={`${s.page} ${sign.variable}`} data-iteration="3">
      <header className={s.top}>
        <a className={s.wordmark} href="#top">
          <span className={s.roundel} aria-hidden="true" />
          Mull
        </a>
        <nav className={s.nav} aria-label="Sections">
          <a href="#how">How it works</a>
          <a href="#files">Your files</a>
          <a href="#price">Price</a>
        </nav>
        <a className={s.topButton} href="#download">
          Download Mull
        </a>
      </header>

      <main id="top">
        <section className={s.hero}>
          <div className={s.heroText}>
            <h1 className={s.h1}>Follow a train of thought.</h1>
            <p className={s.lede}>
              Mull is a note-taking app that links what you write. Every note is a stop, every
              link is a line, and one idea carries you to the next. That includes the ones you
              wrote three years ago.
            </p>
            <div className={s.actions}>
              <a className={s.button} href="#download">
                Download Mull
              </a>
              <p className={s.small}>Free on one device.</p>
            </div>
          </div>
          <Network />
        </section>

        <section id="how" className={s.section}>
          <h2 className={s.h2}>How a thought travels</h2>
          <ol className={s.strip}>
            {STOPS.map((stop) => (
              <li key={stop.name} className={s.stop}>
                <h3 className={s.stopName}>{stop.name}</h3>
                <p className={s.stopText}>{stop.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="arrivals" className={s.section}>
          <div className={s.split}>
            <div>
              <h2 className={s.h2}>Old notes arrive on time</h2>
              <p className={s.body}>
                You do not go looking. While you write, Mull brings back the notes that bear on
                it, and once a week it sends a few that are about to go cold.
              </p>
            </div>
            <div className={s.board}>
            <table className={s.boardTable}>
              <caption className={s.boardCaption}>Arrivals for Monday 9 November</caption>
              <thead>
                <tr>
                  <th scope="col">Due</th>
                  <th scope="col">Note</th>
                  <th scope="col">Written</th>
                  <th scope="col">Why it is coming</th>
                </tr>
              </thead>
              <tbody>
                {ARRIVALS.map((a) => (
                  <tr key={a.note}>
                    <td className={a.due === "Now" ? s.now : undefined}>{a.due}</td>
                    <td className={s.boardNote}>
                      <span className={s.bullet} data-line={a.line} />
                      {a.note}
                    </td>
                    <td>{a.written}</td>
                    <td>{a.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>

        <section id="files" className={s.section}>
          <div className={s.split}>
            <h2 className={s.h2}>You own the tracks</h2>
            <dl className={s.directory}>
              <div>
                <dt>Plain files</dt>
                <dd>Every note is a Markdown file in a folder on your computer. Any editor opens them.</dd>
              </div>
              <div>
                <dt>No connection needed</dt>
                <dd>Everything on this page works offline.</dd>
              </div>
              <div>
                <dt>Encrypted sync</dt>
                <dd>Notes are encrypted end to end between your devices. Nobody at Mull can read a word.</dd>
              </div>
              <div>
                <dt>Leaving</dt>
                <dd>Copy the folder. That is the whole export.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="price" className={s.section}>
          <h2 className={s.h2}>Two fares</h2>
          <div className={s.fares}>
            <article className={s.ticket} data-line="kitchen">
              <h3 className={s.ticketName}>Mull</h3>
              <p className={s.fare}>Free</p>
              <p className={s.ticketText}>
                Every feature on this page, on one device. No limit on notes and no trial period.
              </p>
            </article>
            <article className={s.ticket} data-line="memory">
              <h3 className={s.ticketName}>Mull Sync</h3>
              <p className={s.fare}>
                $6 <span>a month</span>
              </p>
              <p className={s.ticketText}>
                The same on every device you own, encrypted end to end. Add it from inside the app
                when you need it.
              </p>
            </article>
          </div>
        </section>

        <section id="download" className={s.terminus}>
          <div className={s.terminusInner}>
            <h2 className={s.h1}>This is where you get on.</h2>
            <p className={s.lede}>Pick a device. Your first note takes about four seconds.</p>
            <ul className={s.platforms}>
              <li>
                <a className={s.button} href="#download">
                  Download for Windows
                </a>
              </li>
              <li>
                <a className={s.buttonLine} href="#download">
                  Mac
                </a>
              </li>
              <li>
                <a className={s.buttonLine} href="#download">
                  Linux
                </a>
              </li>
              <li>
                <a className={s.buttonLine} href="#download">
                  iPhone
                </a>
              </li>
              <li>
                <a className={s.buttonLine} href="#download">
                  Android
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className={s.foot}>
        <p>Mull, 2026. Made by six people who also forget things.</p>
        <p className={s.footLinks}>
          <a href="#files">Privacy</a>
          <a href="#price">Terms</a>
          <a href="#top">Changelog</a>
        </p>
      </footer>
    </div>
  );
}
