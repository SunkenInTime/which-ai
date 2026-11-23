import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import Signup from "../_shared/signup";
import SplitHero from "./hero";
import styles from "./split.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4). Not preloaded:
// the gallery registry imports every entry, so a preload would fetch these on every gallery page.
const glm54DesignArchivo = localFont({
  src: "../fonts/archivo-normal.woff2",
  variable: "--font-grot",
  preload: false,
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  title: "Iteration 5, two brains",
};

const firstBrain = [
  "Keeps the feeling of a book and loses the argument.",
  "Remembers that there was a good idea, not which one.",
  "Gets full.",
];

const secondBrain = [
  "Keeps the argument, the page number and the sentence.",
  "Shows the idea, and the twelve notes it grew out of.",
  "Doesn't.",
];

const steps = [
  {
    n: "1",
    title: "Capture",
    body: "One shortcut from any app. A sentence, a link, a photo of a whiteboard. No folder to pick first.",
  },
  {
    n: "2",
    title: "Link",
    body: "Type two brackets and Slip suggests the notes that belong beside this one. Every link works in both directions.",
  },
  {
    n: "3",
    title: "Recall",
    body: "Ask in plain words and the notes that matter come back before you finish typing.",
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

function Chart() {
  return (
    <div className={styles.chart}>
      <svg
        className={styles.chartBase}
        viewBox="0 0 1000 270"
        aria-hidden="true"
      >
        <line x1="60" y1="30" x2="980" y2="30" className={styles.gridDotted} />
        <line x1="60" y1="145" x2="980" y2="145" className={styles.gridDotted} />
        <line x1="60" y1="230" x2="980" y2="230" className={styles.axis} />
        <text x="52" y="34" textAnchor="end" className={styles.tick}>
          100%
        </text>
        <text x="52" y="149" textAnchor="end" className={styles.tick}>
          50%
        </text>
        <text x="90" y="252" textAnchor="middle" className={`${styles.tick} ${styles.tickX}`}> 
          Day 1
        </text>
        <text x="298" y="252" textAnchor="middle" className={`${styles.tick} ${styles.tickX}`}> 
          Day 8
        </text>
        <text x="535" y="252" textAnchor="middle" className={`${styles.tick} ${styles.tickX}`}> 
          Day 16
        </text>
        <text x="772" y="252" textAnchor="middle" className={`${styles.tick} ${styles.tickX}`}> 
          Day 24
        </text>
        <text x="980" y="252" textAnchor="end" className={`${styles.tick} ${styles.tickX}`}>
          Day 31
        </text>
      </svg>
      <div className={`${styles.chartLayer} ${styles.chartLeft}`} aria-hidden="true">
        <svg viewBox="0 0 1000 270">
          <path
            d="M60 30C75 30 82 140 90 159S105 182 120 182S200 203 238 203S800 212 980 212"
            className={styles.curve}
          />
        </svg>
      </div>
      <div className={`${styles.chartLayer} ${styles.chartRight}`} aria-hidden="true">
        <svg viewBox="0 0 1000 270">
          <path d="M60 30 980 30" className={styles.flat} />
        </svg>
      </div>
      <p className={styles.chartLabelLeft}>What your first brain keeps</p>
      <p className={styles.chartLabelRight}>What your second brain keeps</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className={`v5 ${glm54DesignArchivo.variable} ${styles.page}`}>
      <SplitHero>
        <header className={`${styles.wrap} ${styles.header}`}>
          <Link className={styles.brand} href="/with-design-skill/glm-5.4/5" aria-label="Slip, home">
            Slip
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a className={styles.navCta} href="#start">
              Start free
            </a>
          </nav>
        </header>
        <div className={`${styles.wrap} ${styles.heroBody}`}>
          <h1 className={styles.h1}>
            Your first brain forgets. Your second brain doesn&apos;t.
          </h1>
          <div className={styles.heroRow}>
            <p className={styles.lede}>
              Slip is a note for every thought, linked to the ones around it,
              and a search that brings the right one back before you&apos;ve
              finished typing. Drag the line to see what a month of it is
              worth.
            </p>
            <div className={styles.actions}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#start">
                Start free
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#how">
                How it works
              </a>
            </div>
          </div>
          <Chart />
          <p className={styles.source}>
            Memory retained over 31 days without review, after Hermann
            Ebbinghaus, Memory: A Contribution to Experimental Psychology
            (1885).
          </p>
        </div>
      </SplitHero>

      <main>
        <section className={styles.brains}>
          <div className={`${styles.brain} ${styles.brainFirst}`}>
            <div className={styles.brainInner}>
              <h2 className={styles.brainTitle}>Your first brain</h2>
              <ul className={styles.brainList}>
                {firstBrain.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`${styles.brain} ${styles.brainSecond}`}>
            <div className={styles.brainInner}>
              <h2 className={styles.brainTitle}>Your second brain</h2>
              <ul className={styles.brainList}>
                {secondBrain.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="how" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>Three moves, in this order.</h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.n} className={styles.step}>
                <span className={styles.stepN} aria-hidden="true">
                  {step.n}
                </span>
                <h3 className={styles.h3}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.quoteWrap}>
            <blockquote className={styles.quote}>
              I stopped trusting my head to hold things and started trusting it
              to connect them.
            </blockquote>
            <figcaption className={styles.attrib}>
              Amara Chen, freelance journalist
            </figcaption>
          </figure>
        </section>

        <section id="pricing" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>Two ways to keep a brain.</h2>
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
          <h2 className={styles.h2}>Give your first brain a break.</h2>
          <p className={styles.startText}>
            Start with one note. It can be three words long.
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
