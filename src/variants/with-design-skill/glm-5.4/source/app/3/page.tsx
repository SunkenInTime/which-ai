import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import Signup from "../_shared/signup";
import Spread from "./spread";
import styles from "./book.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4).
const glm54DesignNewsreader = localFont({
  src: "../fonts/newsreader-normal.woff2",
  variable: "--font-book",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iteration 3, the margins",
};

const steps = [
  {
    n: 1,
    title: "Highlight",
    body: "Mark a passage in anything you read: a PDF, a web page, a borrowed library book. The mark keeps the sentence, the page and the source.",
  },
  {
    n: 2,
    title: "Note in the margin",
    body: "Write beside it. A mark on its own only proves you once agreed with something; the note is the thought you had about it.",
  },
  {
    n: 3,
    title: "Follow the thread",
    body: "Every note lists the other notes that mention it. Start from any of them and the reading that matters is one step away.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "for your first 1,000 highlights",
    items: ["1,000 highlights and notes", "Two devices", "Export everything, any time"],
    cta: "Start free",
  },
  {
    name: "Unlimited",
    price: "$4",
    note: "a month, cancel any time",
    items: [
      "Unlimited highlights and notes",
      "Every device you own",
      "Version history on every note",
      "Sync that nobody but you can read",
    ],
    cta: "Go unlimited",
  },
];

export default function Page() {
  return (
    <div className={`v3 ${glm54DesignNewsreader.variable} ${styles.page}`}>
      <header className={`${styles.wrap} ${styles.header}`}>
        <Link className={styles.brand} href="/with-design-skill/glm-5.4/3" aria-label="Slip, home">
          <span className={styles.brandMark}>Slip</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a className={styles.navCta} href="#start">
            Start your library
          </a>
        </nav>
      </header>

      <main>
        <section className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.pitch}>
            <h1 className={styles.h1}>
              Keep what
              <br />
              you read.
            </h1>
            <p className={styles.lede}>
              Slip lives in the margin of whatever you&apos;re reading. A
              marked passage becomes a note, the note finds every other note on
              the subject, and the page is there when you need it again.
            </p>
            <div className={styles.actions}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#start">
                Start your library
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#how">
                Look inside a notebook
              </a>
            </div>
          </div>
          <div className={styles.spreadWrap}>
            <Spread />
            <p className={styles.legend}>
              Yellow marks a line to keep, pink a question to answer, green an
              idea of your own.
            </p>
          </div>
        </section>

        <section id="how" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>
            Reading that keeps working after the book is closed.
          </h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.n} className={styles.step}>
                <h3 className={styles.h3}>
                  <sup className={styles.sup}>{step.n}</sup>
                  {step.title}
                </h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.epigraph}>
            <blockquote className={styles.quote}>
              I stopped copying quotes into a document I never opened. Now{" "}
              <mark className={styles.quoteMark}>a highlight is already a note</mark>,
              and the note already knows where it came from.
            </blockquote>
            <figcaption className={styles.attrib}>
              Daniel Okafor, high-school history teacher
            </figcaption>
          </figure>
        </section>

        <section id="pricing" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>Two ways to keep a library.</h2>
          <div className={styles.plans}>
            {plans.map((plan) => (
              <article key={plan.name} className={styles.plan}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planPrice}>
                  {plan.price}
                  <small>{plan.note}</small>
                </p>
                <ul className={styles.planList}>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="#start">
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
          <p className={styles.planNote}>
            Students and teachers get Unlimited free. Write to us.
          </p>
        </section>

        <section id="start" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.start}>
            <h2 className={styles.h2}>Open your first notebook.</h2>
            <p className={styles.startText}>
              Bring a book you already love. The margins are waiting.
            </p>
            <Signup
              label="Send me an invite"
              prompt="Where should we send your invitation?"
            />
          </div>
        </section>
      </main>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <p className={styles.footText}>
          Slip is a second brain for people who read a lot. Your notes are
          plain Markdown files in a folder you own. Export everything, any
          time.
        </p>
        <nav className={styles.footNav} aria-label="Footer">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="mailto:hello@slip.example">hello@slip.example</a>
        </nav>
      </footer>
    </div>
  );
}
