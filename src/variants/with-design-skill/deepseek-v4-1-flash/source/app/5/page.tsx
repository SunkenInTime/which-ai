import type { Metadata } from "next";
import Link from "next/link";
import { CairnMark } from "../_brand/Cairn";
import { AppDemo } from "./AppDemo";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Cairn — the desk",
  description:
    "Try Cairn before you sign up: a real notes window you can search and click through.",
};

const FACTS = [
  ["Local first", "Notes live in a folder you can open. Sync is optional."],
  ["Markdown", "No lock-in format. Import from Obsidian, Bear or a heap of text files."],
  ["On-device recall", "Search runs on your machine, so it works on a plane."],
];

export default function Page() {
  return (
    <main className={s.page}>
      <header className={s.bar}>
        <Link href="/with-design-skill/deepseek-v4-1-flash/5" className={s.brand}>
          <CairnMark size={19} />
          <span>Cairn</span>
        </Link>
        <nav className={s.barNav} aria-label="Main">
          <a href="#desk">The app</a>
          <a href="#facts">What you get</a>
          <a href="#start">Download</a>
        </nav>
        <div className={s.barActions}>
          <a className={s.signIn} href="#start">
            Sign in
          </a>
          <a className={s.barCta} href="#start">
            Get Cairn
          </a>
        </div>
      </header>

      <section className={s.hero}>
        <div className={s.heroTop}>
          <h1 className={s.title}>
            A second brain you can actually use before you buy it.
          </h1>
          <p className={s.lede}>
            This is the real notes window, not a screenshot. Search it, click a
            note, watch the links on the right change. Then decide.
          </p>
        </div>

        <div className={s.desk} id="desk">
          <AppDemo />
          <p className={s.caption}>
            Five notes from a made-up library. Everything here runs in the page.
          </p>
        </div>
      </section>

      <section className={s.facts} id="facts">
        <ul className={s.factList}>
          {FACTS.map(([head, body]) => (
            <li key={head} className={s.fact}>
              <h2 className={s.factHead}>{head}</h2>
              <p className={s.factBody}>{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.start} id="start">
        <div className={s.startCopy}>
          <h2 className={s.startTitle}>Free on macOS and Windows.</h2>
          <p className={s.startBody}>
            Pay $5 a month when you want sync between machines. The app works
            completely without it, and so does search.
          </p>
        </div>
        <div className={s.startActions}>
          <a className={s.download} href="#start">
            Download for Windows
          </a>
          <a className={s.downloadAlt} href="#start">
            Download for macOS
          </a>
        </div>
      </section>

      <footer className={s.foot}>
        <span className={s.footBrand}>
          <CairnMark size={13} /> Cairn
        </span>
        <span className={s.footLine}>
          Notes that stay on your disk and in your head.
        </span>
        <ul className={s.footLinks}>
          <li>
            <a href="#facts">Privacy</a>
          </li>
          <li>
            <a href="#facts">Docs</a>
          </li>
          <li>
            <a href="#facts">Changelog</a>
          </li>
        </ul>
      </footer>
    </main>
  );
}
