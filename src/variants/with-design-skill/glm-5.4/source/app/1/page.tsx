import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import Signup from "../_shared/signup";
import Deck from "./deck";
import styles from "./slip.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4).
const glm54DesignCourierPrime = localFont({
  src: [
    { path: "../fonts/courier-prime-normal-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/courier-prime-normal-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/courier-prime-italic-400.woff2", weight: "400", style: "italic" },
    { path: "../fonts/courier-prime-italic-700.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-typed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iteration 1, the slip box",
};

const steps = [
  {
    n: "1",
    title: "Capture",
    body: "One shortcut from any app drops a card in the box: a sentence, a link, a paragraph you pasted, a photo of a whiteboard. No folder to pick, no title to think up. The box numbers it and you go.",
  },
  {
    n: "2",
    title: "Connect",
    body: "Every card can point at any other. Type two brackets and Slip suggests the cards that belong, by what they say rather than where they sit. Each link is a thread you can pull from either end.",
  },
  {
    n: "3",
    title: "Recall",
    body: "Ask in plain words and the answer comes back as the cards that matter, with the sentence you need already marked. Cards you haven't seen in a while drift back up before you forget them.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "for your first 1,000 cards",
    items: ["1,000 cards", "Two devices", "Export everything, any time"],
    cta: "Start free",
    r: -1,
  },
  {
    name: "Unlimited",
    price: "$4",
    note: "a month, cancel any time",
    items: [
      "Unlimited cards",
      "Every device you own",
      "Version history on every card",
      "Sync that nobody but you can read",
    ],
    cta: "Go unlimited",
    r: 0.8,
  },
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.check}>
      <path
        d="M3 8.5 6.5 12 13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <div className={`v1 ${glm54DesignCourierPrime.variable} ${styles.page}`}>
      <header className={`${styles.wrap} ${styles.header}`}>
        <Link className={styles.brand} href="/with-design-skill/glm-5.4/1" aria-label="Slip, home">
          Slip
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a className={styles.navCta} href="#start">
            Start your box
          </a>
        </nav>
      </header>

      <main>
        <section className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.pitch}>
            <h1 className={styles.h1}>
              Notes that
              <br />
              find each
              <br />
              other.
            </h1>
            <p className={styles.lede}>
              Slip is a box of index cards for everything you read, think and
              mean to keep. Cards link to one another, so an old idea turns up
              the moment a new one needs it.
            </p>
            <div className={styles.actions}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#start">
                Start your box
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#how">
                See how it works
              </a>
            </div>
            <p className={styles.fine}>
              Free for your first 1,000 cards. No credit card.
            </p>
          </div>
          <Deck />
        </section>

        <section id="how" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>
            Three moves.
            <br />
            One box.
          </h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.n} className={styles.step} style={{ "--n": step.n } as React.CSSProperties}>
                <span className={styles.stepId} aria-hidden="true">
                  {step.n}
                </span>
                <h3 className={styles.h3}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.quoteCard}>
            <svg className={styles.clip} viewBox="0 0 24 52" aria-hidden="true">
              <path
                d="M8 15v25a4 4 0 0 0 8 0V11a6 6 0 0 0-12 0v29a8 8 0 0 0 16 0V13"
                fill="none"
                stroke="#9a9ca3"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <blockquote className={styles.quote}>
              My box knows what I was worried about in 2019. I stopped taking
              notes for meetings and started taking notes for next year&apos;s
              me.
            </blockquote>
            <figcaption className={styles.attrib}>
              Ilse Meijer, urban planner. 6,412 cards.
            </figcaption>
          </figure>
        </section>

        <section id="pricing" className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>Two ways to keep a box.</h2>
          <div className={styles.drawer}>
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={styles.plan}
                style={{ "--r": `${plan.r}deg` } as React.CSSProperties}
              >
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planPrice}>
                  {plan.price} <small>{plan.note}</small>
                </p>
                <ul className={styles.planList}>
                  {plan.items.map((item) => (
                    <li key={item}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  className={`${styles.btn} ${styles.btnInk}`}
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

        <section id="start" className={styles.band}>
          <div className={`${styles.wrap} ${styles.bandInner}`}>
            <div>
              <h2 className={styles.bandTitle}>Start with one card.</h2>
              <p className={styles.bandText}>
                Paste it from somewhere else. Most people do.
              </p>
            </div>
            <Signup label="Send it" />
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
