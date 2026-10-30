import type { Metadata } from "next";
import Link from "next/link";
import { CairnMark } from "../_brand/Cairn";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Cairn — field ledger",
  description:
    "A logbook for the things you notice. Cairn keeps the entry, the date, and what it changed.",
};

type Row = {
  no: string;
  date: string;
  title: string;
  obs: string;
  marks: string;
  tone: "plain" | "flag" | "note";
};

const ROWS: Row[] = [
  {
    no: "004",
    date: "2026 · 03 · 14",
    title: "The sync bug was a merge bug wearing a costume",
    obs: "We spent nine days on the transport layer. The conflict rule was wrong the whole time. Log the assumption before the stack trace.",
    marks: "engineering, postmortem",
    tone: "flag",
  },
  {
    no: "019",
    date: "2026 · 04 · 02",
    title: "Marisol on design tokens",
    obs: "“A token is a contract you sign with your future self.” Audit the inventory before you abstract it, or you freeze the wrong decisions.",
    marks: "interview, design",
    tone: "plain",
  },
  {
    no: "031",
    date: "2026 · 05 · 27",
    title: "Commonplace book, Locke's index",
    obs: "Two columns, one for the head, one for the subject. The index is the work; the reading is only the raw material.",
    marks: "reading, method",
    tone: "plain",
  },
  {
    no: "046",
    date: "2026 · 07 · 09",
    title: "Hydration, 70 to 78 percent",
    obs: "Salt at two percent. The open crumb is a temperature problem more than a water problem. Revisit in winter.",
    marks: "kitchen, tables",
    tone: "note",
  },
  {
    no: "058",
    date: "2026 · 08 · 21",
    title: "Auth rollback: dual-write for two weeks",
    obs: "If sessions spike, turn off the flag, don't revert the deploy. Keep the old path read-only until the audit clears.",
    marks: "engineering, plans",
    tone: "flag",
  },
];

const MARKS = [
  {
    label: "Entry",
    body: "Every note is dated and numbered, so you can always say when you first believed a thing — and when you stopped.",
  },
  {
    label: "Margin",
    body: "A second column for what a note changed. Not another tag: the reason it earned a place in the ledger.",
  },
  {
    label: "Recall",
    body: "Search by the date, the phrase, or the thing it replaced. The ledger keeps the whole chain, not just the last page.",
  },
];

export default function Page() {
  return (
    <main className={s.page}>
      <header className={s.bar}>
        <Link href="/with-design-skill/deepseek-v4-1-flash/3" className={s.brand}>
          <CairnMark size={19} />
          <span>Cairn</span>
        </Link>
        <p className={s.barMeta}>Ledger of record · Est. 2026</p>
        <nav className={s.barNav} aria-label="Main">
          <a href="#specimen">Specimen</a>
          <a href="#ledger">Entries</a>
          <a href="#marks">Marks</a>
        </nav>
        <a className={s.barCta} href="#open">
          Keep a ledger
        </a>
      </header>

      <section className={s.hero}>
        <div className={s.heroLeft}>
          <p className={s.entryStamp}>
            <span>Vol. I</span>
            <span>Sheet 001</span>
          </p>
          <h1 className={s.title}>
            Keep a record,
            <br />
            not a pile.
          </h1>
          <p className={s.lede}>
            Cairn is a field ledger for the things you notice. Each entry gets a
            date, a number, and a margin note saying what it changed. Six months
            from now you&apos;ll know exactly where a thought came from.
          </p>
          <div className={s.ctaRow}>
            <a className={s.cta} href="#open">
              Open the ledger
            </a>
            <a className={s.ctaAlt} href="#ledger">
              Read sample entries
            </a>
          </div>
        </div>

        <aside className={s.specimen} id="specimen" aria-label="A sample entry">
          <p className={s.specimenHead}>
            <span>Specimen</span>
            <span>Entry 019</span>
          </p>
          <p className={s.specimenDate}>Filed 2026 · 04 · 02 · 09:41</p>
          <h2 className={s.specimenTitle}>Marisol on design tokens</h2>
          <p className={s.specimenBody}>
            “A token is a contract you sign with your future self. Audit the
            inventory before you abstract it, or you freeze the wrong
            decisions.”
          </p>
          <dl className={s.specimenMeta}>
            <div>
              <dt>Source</dt>
              <dd>Interview, 42 min</dd>
            </div>
            <div>
              <dt>Changed</dt>
              <dd>Our naming rules, 2026 · 04 · 08</dd>
            </div>
            <div>
              <dt>Linked</dt>
              <dd>004, 031, 058</dd>
            </div>
          </dl>
          <p className={s.specimenFoot}>
            <span aria-hidden="true">✎</span> Every field is searchable, including
            this one.
          </p>
        </aside>
      </section>

      <section className={s.ledger} id="ledger">
        <div className={s.ledgerHead}>
          <h2 className={s.h2}>This month in the ledger</h2>
          <p className={s.ledgerNote}>
            Five of the 1,204 entries filed by members. Hover a row to read it.
          </p>
        </div>

        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col" className={s.thNo}>
                No.
              </th>
              <th scope="col" className={s.thDate}>
                Filed
              </th>
              <th scope="col">Entry</th>
              <th scope="col" className={s.thMarks}>
                Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.no} className={s.row} data-tone={row.tone}>
                <td className={s.cellNo}>{row.no}</td>
                <td className={s.cellDate}>{row.date}</td>
                <td className={s.cellEntry}>
                  <span className={s.cellTitle}>{row.title}</span>
                  <span className={s.cellObs}>{row.obs}</span>
                </td>
                <td className={s.cellMarks}>{row.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={s.marks} id="marks">
        <ol className={s.markList}>
          {MARKS.map((m) => (
            <li key={m.label} className={s.mark}>
              <h3 className={s.markHead}>{m.label}</h3>
              <p className={s.markBody}>{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.open} id="open">
        <div className={s.openInner}>
          <p className={s.openNo}>Sheet 002</p>
          <h2 className={s.openTitle}>
            Start with one entry today. The ledger does the remembering.
          </h2>
          <div className={s.openRow}>
            <a className={s.cta} href="#open">
              Create a ledger
            </a>
            <p className={s.openNote}>
              Free for 1,000 entries · Export any time · No card
            </p>
          </div>
        </div>
      </section>

      <footer className={s.foot}>
        <span className={s.footBrand}>
          <CairnMark size={13} /> Cairn
        </span>
        <span className={s.footLine}>
          A record of what you noticed, in the order you noticed it.
        </span>
        <ul className={s.footLinks}>
          <li>
            <a href="#ledger">Privacy</a>
          </li>
          <li>
            <a href="#ledger">Export</a>
          </li>
          <li>
            <a href="#ledger">Changelog</a>
          </li>
        </ul>
      </footer>
    </main>
  );
}
