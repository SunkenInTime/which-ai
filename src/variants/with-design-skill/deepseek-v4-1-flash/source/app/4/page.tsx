import type { Metadata } from "next";
import Link from "next/link";
import { CairnMark } from "../_brand/Cairn";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Cairn — write it down, get it back",
  description:
    "Cairn is the note app that marks up your own thinking: capture in any form, then find it when it matters.",
};

const SEQUENCE = [
  {
    n: "1",
    head: "Capture without ceremony",
    body: "A note is one keystroke away, from anywhere. No template, no folder prompt, no “where should this live.” Decide that later, or never.",
    side: "median time from click to cursor: 0.2s",
  },
  {
    n: "2",
    head: "Let it collect neighbours",
    body: "Cairn reads what you wrote and puts the note next to the three others you'd have wanted to see. It never reorganises your words, only your shelf.",
    side: "avg. 3.4 automatic links per note",
  },
  {
    n: "3",
    head: "Ask for it in plain words",
    body: "Search the way you think. “the thing about the merge bug” returns the note, the meeting, the fix, and the two notes that contradicted it.",
    side: "answered in under a second, on device",
  },
];

const CONTRAST = [
  ["Where notes go", "A folder you choose once and forget", "Everywhere they're relevant"],
  ["How you find them", "You remember the title, or you don't", "You remember the idea"],
  ["What the app costs you", "A weekly inbox to triage", "Nothing to maintain"],
  ["Who reads your notes", "Advertisers, eventually", "You. Sync is encrypted."],
];

export default function Page() {
  return (
    <main className={s.page}>
      <header className={s.bar}>
        <Link href="/with-design-skill/deepseek-v4-1-flash/4" className={s.brand}>
          <CairnMark size={20} />
          <span>cairn</span>
        </Link>
        <nav className={s.barNav} aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#compare">Why switch</a>
          <a href="#price">Price</a>
        </nav>
        <a className={s.barCta} href="#price">
          Get Cairn
        </a>
      </header>

      <section className={s.hero}>
        <p className={s.hand}>
          <span className={s.handRule} aria-hidden="true" />
          you already think this way. the app didn&apos;t.
        </p>
        <h1 className={s.title}>
          Your notes should{" "}
          <span className={s.sweep}>
            <span className={s.sweepText}>read you back</span>
          </span>
          .
        </h1>
        <div className={s.heroFoot}>
          <p className={s.lede}>
            Cairn is a second brain that behaves like one: capture in any form,
            let it draw the connections, and get the thought back the moment you
            need it — not the moment you remember its filename.
          </p>
          <div className={s.heroCta}>
            <a className={s.btn} href="#price">
              Start writing
            </a>
            <a className={s.btnGhost} href="#how">
              See how it works
            </a>
          </div>
        </div>
      </section>

      <section className={s.marquee} aria-hidden="true">
        <div className={s.track}>
          <span>capture</span>
          <span className={s.dot}>●</span>
          <span>connect</span>
          <span className={s.dot}>●</span>
          <span>recall</span>
          <span className={s.dot}>●</span>
          <span>capture</span>
          <span className={s.dot}>●</span>
          <span>connect</span>
          <span className={s.dot}>●</span>
          <span>recall</span>
          <span className={s.dot}>●</span>
        </div>
      </section>

      <section className={s.how} id="how">
        <h2 className={s.h2}>
          Three things happen between a thought and finding it again.
        </h2>
        <ol className={s.steps}>
          {SEQUENCE.map((step) => (
            <li key={step.n} className={s.step}>
              <div className={s.stepMain}>
                <span className={s.stepNum}>{step.n}</span>
                <div>
                  <h3 className={s.stepHead}>{step.head}</h3>
                  <p className={s.stepBody}>{step.body}</p>
                </div>
              </div>
              <p className={s.stepSide}>{step.side}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.compare} id="compare">
        <div className={s.compareHead}>
          <h2 className={s.h2}>
            Most note apps are a filing cabinet with a search box taped to it.
          </h2>
          <p className={s.compareLede}>
            Cairn is the opposite bet: spend the effort on the index, not the
            filing.
          </p>
        </div>

        <table className={s.table}>
          <caption className={s.srOnly}>
            How Cairn differs from a filed-away notes app
          </caption>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">The usual app</th>
              <th scope="col" className={s.thCairn}>
                Cairn
              </th>
            </tr>
          </thead>
          <tbody>
            {CONTRAST.map(([row, them, us]) => (
              <tr key={row}>
                <th scope="row">{row}</th>
                <td className={s.cellThem}>{them}</td>
                <td className={s.cellUs}>{us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={s.price} id="price">
        <div className={s.priceCard}>
          <p className={s.priceLabel}>One plan, all of it</p>
          <p className={s.priceNum}>
            <span className={s.priceAmount}>$5</span>
            <span className={s.priceUnit}>a month, after the free thousand</span>
          </p>
          <ul className={s.priceList}>
            <li>Unlimited notes, attachments and devices</li>
            <li>Markdown files you can open without us</li>
            <li>Encrypted sync, one-tap export of everything</li>
          </ul>
          <a className={s.btnLight} href="#price">
            Start free
          </a>
          <p className={s.priceFine}>Cancel in two clicks. Your files leave with you.</p>
        </div>
        <p className={s.priceHand}>
          yes, that&apos;s the whole pricing page.
        </p>
      </section>

      <footer className={s.foot}>
        <span className={s.footBrand}>
          <CairnMark size={13} /> cairn
        </span>
        <span className={s.footLine}>
          Built for people who write more than they file.
        </span>
        <ul className={s.footLinks}>
          <li>
            <a href="#how">Privacy</a>
          </li>
          <li>
            <a href="#how">Terms</a>
          </li>
          <li>
            <a href="#how">Changelog</a>
          </li>
        </ul>
      </footer>
    </main>
  );
}
