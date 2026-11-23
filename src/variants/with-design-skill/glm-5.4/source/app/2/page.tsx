import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import Signup from "../_shared/signup";
import SignUpCheck from "./signup-check";
import styles from "./pad.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4). Not preloaded:
// the gallery registry imports every entry, so a preload would fetch these on every gallery page.
const glm54DesignShantellSans = localFont({
  src: "../fonts/shantell-sans-normal.woff2",
  variable: "--font-hand",
  preload: false,
  weight: "300 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iteration 2, the legal pad",
};

const checked = [
  "Capture from anywhere with one shortcut",
  "Link two thoughts and never lose the thread",
  "Find it again with the one word you remember",
];

const steps = [
  {
    n: "1",
    title: "Write it down.",
    body: "Don't sort it, name it or file it. A new line is a new note, and a note can be three words long.",
  },
  {
    n: "2",
    title: "Link it to something.",
    body: "Type two brackets and Slip lists the notes that belong beside this one. Pick one and the two are tied together, in both directions.",
  },
  {
    n: "3",
    title: "Find it again.",
    body: "Search the word you remember, the day you wrote it, or the note it hangs from. It's there before you finish typing.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "for your first 1,000 notes",
    items: ["1,000 notes", "Two devices", "Export everything, any time"],
    cta: "Start free",
    tilt: "-1.5deg",
  },
  {
    name: "Unlimited",
    price: "$4",
    note: "a month, cancel any time",
    items: [
      "Unlimited notes",
      "Every device you own",
      "Version history on every note",
      "Sync that nobody but you can read",
    ],
    cta: "Go unlimited",
    tilt: "1.2deg",
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.tick}>
      <path
        d="M4 12.5 9.5 18 20 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Scribble() {
  return (
    <svg
      className={styles.scribble}
      viewBox="0 0 320 14"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 9c34-7 61-5 97-3s62 5 108 1c38-3 73-3 109 1"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Ring() {
  return (
    <svg className={styles.ring} viewBox="0 0 44 44" aria-hidden="true">
      <path
        d="M22 4.5c10-1.5 18 6 18.5 17.5S33 39.5 22 39.5 4.5 33 4 22 12 6 22 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <div className={`v2 ${glm54DesignShantellSans.variable} ${styles.page}`}>
      <div className={styles.binding} aria-hidden="true" />
      <div className={styles.marginLine} aria-hidden="true" />

      <header className={`${styles.wrap} ${styles.header}`}>
        <Link className={styles.brand} href="/with-design-skill/glm-5.4/2" aria-label="Slip, home">
          Slip
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a className={styles.navCta} href="#start">
            Start a page
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.pitch}>
            <h1 className={styles.h1}>
              Get it
              <br />
              out of
              <br />
              your head.
            </h1>
            <p className={styles.lede}>
              Slip is a page that&apos;s always open. Type a thought, paste a
              link, drop in a quote. It&apos;s all still there when you come
              back.
            </p>
            <ul className={styles.checks}>
              {checked.map((item) => (
                <li key={item} className={styles.check}>
                  <span className={styles.box} aria-hidden="true">
                    <Tick />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <SignUpCheck />
          </div>

          <div className={styles.sheetWrap}>
            <div className={styles.sheet}>
              <p className={styles.sheetDate}>Tuesday, 14 March</p>
              <ul className={styles.sheetList}>
                <li className={styles.done}>
                  <span className={styles.sheetBox} aria-hidden="true">
                    <Tick />
                  </span>
                  <span>Send Lena the summary</span>
                </li>
                <li>
                  <span className={styles.sheetBox} aria-hidden="true" />
                  <span>Book the train for Friday</span>
                </li>
                <li>
                  <span className={styles.sheetBox} aria-hidden="true" />
                  <span>
                    Ask Priya about{" "}
                    <span className={styles.wiki}>
                      <span className={styles.wikiText}>spaced repetition</span>
                      <svg
                        className={styles.wikiRing}
                        viewBox="0 0 200 44"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M14 24C10 8 70 2 120 4s76 8 74 18c-2 14-54 20-104 19S8 34 12 22c2-8 48-12 138-10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>{" "}
                    for the workshop
                  </span>
                </li>
              </ul>
              <p className={styles.sheetNote}>12 linked notes</p>
              <p className={styles.sheetTags}>#workshop #weeknotes</p>
            </div>
          </div>
        </section>

        <section id="how" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>
            Three habits. One page.
            <Scribble />
          </h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.n} className={styles.step}>
                <span className={styles.num}>
                  <Ring />
                  {step.n}
                </span>
                <h3 className={styles.h3}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.stripWrap}>
            <span className={styles.tape} aria-hidden="true" />
            <div className={styles.strip}>
              <blockquote className={styles.quote}>
                It&apos;s quicker than the pad I kept by the toaster, and for
                once I can find things in it.
              </blockquote>
              <figcaption className={styles.attrib}>
                Ben Whitaker, line cook. 1,208 notes and counting.
              </figcaption>
            </div>
          </figure>
        </section>

        <section id="pricing" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>
            Two ways to keep pages.
            <Scribble />
          </h2>
          <div className={styles.plans}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={styles.planWrap}
                style={{ transform: `rotate(${plan.tilt})` }}
              >
                <article className={styles.plan}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planPrice}>
                    {plan.price}
                    <small>{plan.note}</small>
                  </p>
                  <ul className={styles.planList}>
                    {plan.items.map((item) => (
                      <li key={item}>
                        <span className={styles.planBox} aria-hidden="true">
                          <Tick />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a className={`${styles.btn} ${styles.btnPrimary}`} href="#start">
                    {plan.cta}
                  </a>
                </article>
              </div>
            ))}
          </div>
          <p className={styles.planNote}>
            Students and teachers get Unlimited free. Write to us.
          </p>
        </section>

        <section id="start" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>
            Open a fresh page.
            <Scribble />
          </h2>
          <div className={styles.startGrid}>
            <p className={styles.startText}>
              The first line is the hardest. Try &quot;things I keep
              forgetting&quot;.
            </p>
            <Signup
              label="Send it"
              prompt="Where should we send your invitation?"
            />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <p className={styles.footText}>
            Slip is a second brain for people who think out loud. Your notes
            are plain Markdown files in a folder you own. Export everything,
            any time.
          </p>
          <nav className={styles.footNav} aria-label="Footer">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="mailto:hello@slip.example">hello@slip.example</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
