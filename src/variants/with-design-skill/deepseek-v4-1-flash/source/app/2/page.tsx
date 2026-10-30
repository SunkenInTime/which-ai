import type { Metadata } from "next";
import Link from "next/link";
import { CairnMark } from "../_brand/Cairn";
import { NoteMap } from "./NoteMap";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Cairn — a place for every thought",
  description:
    "Cairn keeps your notes and shows you the lines between them.",
};

export default function Page() {
  return (
    <main className={s.page}>
      <header className={s.bar}>
        <Link href="/with-design-skill/deepseek-v4-1-flash/2" className={s.brand}>
          <CairnMark size={20} />
          <span>Cairn</span>
        </Link>
        <nav className={s.barNav} aria-label="Main">
          <a href="#map">The map</a>
          <a href="#how">How it thinks</a>
          <a href="#start">Start free</a>
        </nav>
      </header>

      <section className={s.hero}>
        <div className={s.copy}>
          <h1 className={s.title}>
            Everything you write is already <em>connected</em>. Cairn shows you
            where.
          </h1>
          <p className={s.lede}>
            Take notes, clip pages, keep the stray thoughts. Cairn reads them
            together and maps the lines you didn&apos;t know you drew.
          </p>
          <div className={s.ctaRow}>
            <a className={s.cta} href="#start">
              Make your map
            </a>
            <span className={s.ctaNote}>Free to start</span>
          </div>
        </div>

        <div className={s.mapWrap}>
          <NoteMap />
          <div className={s.mapLegend}>
            <span className={s.legendItem}>
              <span className={s.legendBig} aria-hidden="true" />
              A note you wrote
            </span>
            <span className={s.legendItem}>
              <span className={s.legendLine} aria-hidden="true" />
              Shared ideas
            </span>
          </div>
        </div>
      </section>

      <section className={s.band} id="map">
        <div className={s.bandInner}>
          <p className={s.bandText}>
            Most note apps are a shelf. Cairn is a map of the shelf —
            <em>the one thing every note app promises and none of them deliver</em>
            : that you&apos;ll find what you wrote in a year and actually learn
            something from it.
          </p>
        </div>
      </section>

      <section className={s.how} id="how">
        <h2 className={s.h2}>
          A new note should know what already exists. So we built the map first.
        </h2>
        <div className={s.howGrid}>
          <article className={s.step}>
            <h3 className={s.stepHead}>Write the note</h3>
            <p className={s.stepBody}>
              Plain text in a distraction-free sheet. Type <code className={s.kbd}>[[</code> to link
              a note, or skip it — Cairn will find neighbours from the text
              alone.
            </p>
          </article>
          <article className={s.step}>
            <h3 className={s.stepHead}>Cairn draws the line</h3>
            <p className={s.stepBody}>
              The map redraws as you write. Related notes drift closer; notes
              that only shared a keyword drift apart. Nothing is hidden behind
              a folder.
            </p>
          </article>
          <article className={s.step}>
            <h3 className={s.stepHead}>Follow it back</h3>
            <p className={s.stepBody}>
              Open any dot and you get the note plus the four notes it argues
              with. That&apos;s the part that turns a pile of writing into a
              brain that thinks.
            </p>
          </article>
        </div>
      </section>

      <section className={s.start} id="start">
        <h2 className={s.startTitle}>
          Your first map takes about <br /> four notes to become interesting.
        </h2>
        <form className={s.form} action="#start">
          <label className={s.label} htmlFor="email2">
            Email
          </label>
          <div className={s.formRow}>
            <input
              id="email2"
              className={s.input}
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            <button className={s.submit} type="submit">
              Create a map
            </button>
          </div>
          <p className={s.formNote}>
            No card. Import from Obsidian, Notion or plain Markdown.
          </p>
        </form>
      </section>

      <footer className={s.foot}>
        <span className={s.footBrand}>
          <CairnMark size={14} /> Cairn
        </span>
        <span className={s.footLine}>
          Notes in, a map out. Your files stay yours.
        </span>
        <ul className={s.footLinks}>
          <li>
            <a href="#map">Privacy</a>
          </li>
          <li>
            <a href="#map">Terms</a>
          </li>
          <li>
            <a href="#map">Status</a>
          </li>
        </ul>
      </footer>
    </main>
  );
}
