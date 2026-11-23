import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import Signup from "../_shared/signup";
import Graph from "./graph";
import styles from "./board.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4).
const glm54DesignRubik = localFont({
  src: "../fonts/rubik-normal.woff2",
  variable: "--font-chalk",
  weight: "300 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iteration 4, the chalkboard",
};

const habits = [
  {
    tone: "yellow",
    title: "Capture",
    body: "A sentence, a link, a photo of a whiteboard. One shortcut from any app and it's on the board, without a folder or a title to think up first.",
  },
  {
    tone: "pink",
    title: "Link",
    body: "Type two brackets and Slip suggests the notes that belong beside this one, by what they say rather than where they sit. Every line can be pulled from either end.",
  },
  {
    tone: "blue",
    title: "Find",
    body: "Ask in plain words. The notes that matter come back before you finish typing, with the sentence you need already marked.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "for your first 1,000 notes",
    items: ["1,000 notes", "Two devices", "Export everything, any time"],
    cta: "Start free",
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
  },
];

function Underline() {
  return (
    <svg
      className={styles.underline}
      viewBox="0 0 400 14"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="chalk-line" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>
      <path
        d="M4 8c50-6 100-4 150-3s110 5 150 2c30-2 60-3 92 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#chalk-line)"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <div className={`v4 ${glm54DesignRubik.variable} ${styles.page}`}>
      <header className={`${styles.wrap} ${styles.header}`}>
        <Link className={styles.brand} href="/with-design-skill/glm-5.4/4" aria-label="Slip, home">
          Slip
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a className={styles.navCta} href="#start">
            Map your thinking
          </a>
        </nav>
      </header>

      <main>
        <section className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.pitch}>
            <h1 className={styles.h1}>
              See the shape
              <br />
              of your
              <br />
              thinking.
            </h1>
            <p className={styles.lede}>
              Slip draws a map of every note you keep and every link between
              them. Nothing sits alone in a folder: each thought sits beside
              the ones it touches, and you can see the whole shape at once.
            </p>
            <div className={styles.actions}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#start">
                Map your thinking
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#how">
                How the map is made
              </a>
            </div>
          </div>
          <Graph />
        </section>

        <div className={`${styles.wrap} ${styles.tray}`} aria-hidden="true">
          <span className={`${styles.stick} ${styles.stickYellow}`} />
          <span className={`${styles.stick} ${styles.stickPink}`} />
          <span className={`${styles.stick} ${styles.stickBlue}`} />
        </div>

        <section id="how" className={`${styles.wrap} ${styles.how}`}>
          {habits.map((habit) => (
            <div key={habit.title} className={styles.habit} data-tone={habit.tone}>
              <h2 className={styles.habitTitle}>
                {habit.title}
                <Underline />
              </h2>
              <p className={styles.habitBody}>{habit.body}</p>
            </div>
          ))}
        </section>

        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.quoteWrap}>
            <blockquote className={styles.quote}>
              I followed a line from sourdough to city planning and found a
              note from 2019 that solved a problem I had last week.
            </blockquote>
            <figcaption className={styles.attrib}>
              Tomás Rivera, product designer
            </figcaption>
          </figure>
        </section>

        <section id="pricing" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>
            Two ways to keep a board.
            <Underline />
          </h2>
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
                <a
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  href="#start"
                >
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
          <h2 className={styles.h2}>
            Pick up the chalk.
            <Underline />
          </h2>
          <p className={styles.startText}>
            Your first note can be three words long. Most of the good ones are.
          </p>
          <Signup
            label="Send me an invite"
            prompt="Where should we send your invitation?"
          />
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
