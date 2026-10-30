import type { Metadata } from "next";
import Link from "next/link";
import { CairnMark } from "../_brand/Cairn";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Cairn — the drawer",
  description:
    "Cairn keeps every note you've made in one drawer, and hands the right one back when you need it.",
};

const CARDS = [
  {
    no: "N-0412",
    title: "Why the 2019 sync rewrite failed",
    body: "We replaced the merge layer before we had a test harness. Every conflict became a coin flip. The lesson was not about CRDTs.",
    tags: ["engineering", "postmortem"],
    date: "Mar 2024",
  },
  {
    no: "N-1088",
    title: "On keeping a commonplace book",
    body: "Locke's filing method, and why an index of your own reading beats a reading list somebody else wrote.",
    tags: ["reading", "method"],
    date: "Jan 2025",
  },
  {
    no: "N-0291",
    title: "Interview — Marisol, design systems",
    body: "She calls tokens 'the contract you sign with your future self'. Also: audit before you abstract, always.",
    tags: ["interviews", "design"],
    date: "Aug 2023",
  },
  {
    no: "N-1560",
    title: "Sourdough: the hydration table",
    body: "70% for sandwich loaves, 78% for the open crumb. Salt at 2%. Everything else is weather.",
    tags: ["kitchen", "tables"],
    date: "Nov 2025",
  },
  {
    no: "N-0774",
    title: "Auth migration: rollback plan",
    body: "Dual-write for two weeks, then turn the old path read-only. If sessions spike, revert the flag, not the deploy.",
    tags: ["engineering", "plans"],
    date: "Jun 2024",
  },
  {
    no: "N-1333",
    title: "Things my grandfather said about wood",
    body: "Measure twice, cut once was never his line. His was: the grain already knows which way it wants to go.",
    tags: ["family", "keepsakes"],
    date: "Apr 2025",
  },
];

const RULES = [
  {
    head: "Write in plain text",
    body: "Every note is a file you own. Open it in any editor, export the whole drawer in a click, keep it if we disappear.",
    mark: "01",
  },
  {
    head: "File by meaning",
    body: "Tag a note once and Cairn holds the connections. Folders become optional, then quietly unnecessary.",
    mark: "02",
  },
  {
    head: "Ask for the card",
    body: "Search the way you remember — “that thing about the sync bug” — and get the note, the meeting it came from, and the three notes that disagree.",
    mark: "03",
  },
];

export default function Page() {
  return (
    <main className={s.page}>
      <header className={s.bar}>
        <Link href="/with-design-skill/deepseek-v4-1-flash/1" className={s.brand}>
          <CairnMark size={18} />
          <span>Cairn</span>
        </Link>
        <nav className={s.barNav} aria-label="Main">
          <a href="#drawer">The drawer</a>
          <a href="#rules">How it files</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className={s.barCta} href="#pricing">
          Get a card
        </a>
      </header>

      <section className={s.hero}>
        <div className={s.heroGrid}>
          <div className={s.cardStack}>
            <div className={s.cardBehind} aria-hidden="true" />
            <div className={s.card}>
              <div className={s.cardHead}>
                <span className={s.subject}>Subject · a second brain</span>
                <span className={s.cardNo}>Cairn 001</span>
              </div>
              <h1 className={s.title}>
                Nothing you write
                <br />
                goes missing.
              </h1>
              <p className={s.lede}>
                Cairn keeps every note you have ever made in one drawer, and
                hands the right one back while you are writing the next.
              </p>
              <div className={s.ctaRow}>
                <a className={s.btn} href="#pricing">
                  Start your catalogue
                </a>
                <a className={s.ghost} href="#drawer">
                  Browse a sample drawer
                </a>
              </div>
              <p className={s.fine}>
                Free for your first 1,000 notes · No card required
              </p>
            </div>
          </div>

          <aside className={s.margin} aria-label="At a glance">
            <p className={s.marginLabel}>In the drawer today</p>
            <div className={s.stat}>
              <span className={s.statNum}>14,206</span>
              <span className={s.statLabel}>notes filed by members</span>
            </div>
            <div className={s.stat}>
              <span className={s.statNum}>0.4s</span>
              <span className={s.statLabel}>median time to a match</span>
            </div>
            <p className={s.marginNote}>
              Your notes stay on your device first. Sync is a backup, not a
              landlord.
            </p>
          </aside>
        </div>
      </section>

      <section className={s.drawer} id="drawer">
        <div className={s.sectionHead}>
          <h2 className={s.h2}>A drawer you will actually open</h2>
          <p className={s.sectionNote}>
            Pulled from member libraries this week. Hover to lift a card.
          </p>
        </div>
        <ul className={s.cardGrid}>
          {CARDS.map((card) => (
            <li key={card.no}>
              <article className={s.note} tabIndex={0}>
                <div className={s.noteTop}>
                  <span className={s.noteNo}>{card.no}</span>
                  <span className={s.noteDate}>{card.date}</span>
                </div>
                <h3 className={s.noteTitle}>{card.title}</h3>
                <p className={s.noteBody}>{card.body}</p>
                <div className={s.noteTags}>
                  {card.tags.map((tag) => (
                    <span key={tag} className={s.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.rules} id="rules">
        <h2 className={s.h2}>Three house rules</h2>
        <ol className={s.ruleList}>
          {RULES.map((rule) => (
            <li key={rule.mark} className={s.rule}>
              <span className={s.ruleMark}>{rule.mark}</span>
              <h3 className={s.ruleHead}>{rule.head}</h3>
              <p className={s.ruleBody}>{rule.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.close} id="pricing">
        <div className={s.closeCard}>
          <p className={s.closeKicker}>Drawer card</p>
          <h2 className={s.closeTitle}>
            One drawer. Every note. <em>Your name on the front.</em>
          </h2>
          <p className={s.closeBody}>
            $6 a month after the free thousand. Cancel and your notes leave with
            you as Markdown, in a folder you can read without us.
          </p>
          <div className={s.closeRow}>
            <a className={s.btn} href="#pricing">
              Open a drawer
            </a>
            <span className={s.closeFine}>30 days, refunded without a form</span>
          </div>
        </div>
      </section>

      <footer className={s.foot}>
        <div className={s.stamp}>
          <CairnMark size={14} />
          Cairn
        </div>
        <p className={s.footLine}>
          A drawer, not a feed. Notes kept since 2026.
        </p>
        <ul className={s.footLinks}>
          <li>
            <a href="#rules">Privacy</a>
          </li>
          <li>
            <a href="#rules">Export</a>
          </li>
          <li>
            <a href="#rules">Changelog</a>
          </li>
        </ul>
      </footer>
    </main>
  );
}
