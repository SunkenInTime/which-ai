import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import { Memory } from "./memory";
import s from "./page.module.css";

const poster = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-poster",
});

export const metadata: Metadata = {
  title: "Mull, for everything you would otherwise forget (design 5 of 5)",
};

const DOES = [
  {
    word: "Capture",
    text: "Press Ctrl+Space in any app, type the thought, press Enter. It lands in today’s note with the time. On a phone, share to Mull or say it aloud.",
  },
  {
    word: "Link",
    text: "Type [[ to join two notes. When you forget, Mull notices that two notes are about the same thing and offers to link them. It asks first.",
  },
  {
    word: "Resurface",
    text: "While you write, Mull shows the older notes that bear on the sentence in front of you. Once a week it sends a few that are about to go cold.",
  },
  {
    word: "Ask",
    text: "Put a question in plain words. Mull answers from your own notes and names each one it used, so you can check its work.",
  },
];

export default function ForgettingCurve() {
  return (
    <div className={`${s.poster} ${poster.variable}`} data-iteration="5">
      <header className={s.top}>
        <a className={s.wordmark} href="#top">
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
        <Memory />

        <section id="how" className={s.section}>
          <h2 className={s.kicker}>What Mull does about it</h2>
          <ul className={s.rows}>
            {DOES.map((item) => (
              <li key={item.word} className={s.row}>
                <h3 className={s.rowWord}>{item.word}</h3>
                <p className={s.rowText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="files" className={s.section}>
          <div className={s.split}>
            <h2 className={s.h2}>Your notes are files on your own disk.</h2>
            <div className={s.splitText}>
              <p>
                Every note is a plain Markdown file in a folder on your computer. Any editor opens
                them, and Mull works with no connection.
              </p>
              <p>
                Sync between devices is encrypted end to end, so nobody at Mull can read a word.
                Leaving means copying a folder.
              </p>
            </div>
          </div>
        </section>

        <section id="price" className={s.section}>
          <h2 className={s.kicker}>What it costs</h2>
          <dl className={s.prices}>
            <div>
              <dt>Mull</dt>
              <dd className={s.amount}>Free</dd>
              <dd>Every feature on this page, on one device. No limit on notes and no trial.</dd>
            </div>
            <div>
              <dt>Mull Sync</dt>
              <dd className={s.amount}>
                $6 <span>a month</span>
              </dd>
              <dd>The same on every device you own, encrypted end to end.</dd>
            </div>
          </dl>
        </section>
      </main>

      <footer id="download" className={s.end}>
        <h2 className={s.endTitle}>Write it down before it goes.</h2>
        <p className={s.endLede}>Pick a device. Your first note takes about four seconds.</p>
        <ul className={s.platforms}>
          <li>
            <a className={s.buttonLight} href="#download">
              Download for Windows
            </a>
          </li>
          <li>
            <a href="#download">Mac</a>
          </li>
          <li>
            <a href="#download">Linux</a>
          </li>
          <li>
            <a href="#download">iPhone</a>
          </li>
          <li>
            <a href="#download">Android</a>
          </li>
        </ul>
        <div className={s.foot}>
          <p>Mull, 2026. Made by six people who also forget things.</p>
          <p className={s.footLinks}>
            <a href="#files">Privacy</a>
            <a href="#price">Terms</a>
            <a href="#top">Changelog</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
