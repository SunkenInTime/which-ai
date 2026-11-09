import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Delius, Quicksand } from "next/font/google";
import { InView } from "./in-view";
import { Pond } from "./pond";
import s from "./page.module.css";

// Latin-only faces on purpose: rounded Japanese families look lovely here but
// ship hundreds of unicode-range slices (and preloads) for glyphs we never use.
const round = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const hand = Delius({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-delius",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stillwater",
  description:
    "Set it down. Engram is a second brain for people who are tired of carrying everything in the first one.",
};

function Logo() {
  return (
    <span className={s.logo}>
      <svg viewBox="0 0 34 24" width="34" height="24" aria-hidden="true">
        <ellipse cx="17" cy="13" rx="15.5" ry="9.5" className={s.logoRing} />
        <ellipse cx="17" cy="13" rx="7.2" ry="5.2" transform="rotate(-10 17 13)" className={s.logoStone} />
      </svg>
      engram
    </span>
  );
}

/* Where each open loop floats before it settles (in rem), and how askew. */
const loops = [
  { text: "call Mum back", x: 1.5, y: 0.4, r: -6 },
  { text: "renew passport — March", x: 13.5, y: 3, r: 4 },
  { text: "the bridge metaphor for chapter 3", x: 3, y: 6.8, r: 3 },
  { text: "why did the launch slip?", x: 15.5, y: 10.2, r: -5 },
  { text: "ask Sam about the ferry story", x: 0.5, y: 13.2, r: 5 },
  { text: "dentist. really, this time", x: 14, y: 16.6, r: -3 },
  { text: "tomatoes: deeper water", x: 4.5, y: 19.6, r: 6 },
  { text: "idea — walking one-on-ones", x: 12.5, y: 22.8, r: -4 },
];

export default function Stillwater() {
  return (
    <div className={`${s.page} ${round.variable} ${hand.variable}`}>
      <header className={s.nav}>
        <a href="#top" aria-label="Engram home">
          <Logo />
        </a>
        <nav aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#quiet">Quiet by design</a>
          <a href="#price">Price</a>
        </nav>
        <a href="#price" className={s.navCta}>
          Get Engram
        </a>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------- hero */}
        <section className={s.hero}>
          <Pond>
            <h1>Set it down.</h1>
            <p className={s.lede}>
              Engram is a second brain for people who are tired of carrying everything in the first
              one. Put a thought here. It will keep, and find you again when it matters.
            </p>
          </Pond>
        </section>

        {/* ------------------------------------------------------- trouble */}
        <section className={`${s.section} ${s.loud}`}>
          <div>
            <p className={s.eyebrow}>The trouble</p>
            <h2>A full head is a loud place.</h2>
            <p>
              Forty open loops, give or take. The dentist. The idea you had in the shower. The
              thing you promised Dana. None of them urgent; all of them humming.
            </p>
            <p>
              You don’t need a better memory. You need somewhere to put things down, and to trust
              they’ll still be there.
            </p>
          </div>

          <InView className={s.loops}>
            <ul>
              {loops.map((l, i) => (
                <li
                  key={l.text}
                  style={{ "--i": i, "--sx": l.x, "--sy": l.y, "--sr": l.r } as CSSProperties}
                >
                  <span>{l.text}</span>
                </li>
              ))}
            </ul>
            <p className={s.loopsCaption}>
              <span>Eight things you’re holding.</span>
              <span>Eight things, kept. Your hands are free.</span>
            </p>
          </InView>
        </section>

        {/* ------------------------------------------------------ gestures */}
        <section id="how" className={s.section}>
          <header className={s.head}>
            <p className={s.eyebrow}>How it works</p>
            <h2>Three small gestures. That’s the whole app.</h2>
          </header>

          <div className={s.gestures}>
            <article>
              <svg viewBox="0 0 240 150" aria-hidden="true">
                <ellipse className={s.rip} cx="120" cy="98" rx="92" ry="30" opacity="0.35" />
                <ellipse className={s.rip} cx="120" cy="98" rx="62" ry="20" opacity="0.6" />
                <ellipse className={s.rip} cx="120" cy="98" rx="32" ry="10" />
                <path className={s.trail} d="M120 14v20M110 22v10M130 20v12" />
                <ellipse className={s.stoneA} cx="120" cy="60" rx="15" ry="11" transform="rotate(-12 120 60)" />
              </svg>
              <h3>Catch</h3>
              <p>
                Type it, say it, or share it. One gesture, from wherever you are. No folders, no
                titles, nothing to decide.
              </p>
            </article>
            <article>
              <svg viewBox="0 0 240 150" aria-hidden="true">
                <path className={s.thread} d="M52 88C74 52 100 50 122 80M122 80c18-30 46-34 68-2M52 88c40 34 104 34 138-10" />
                <ellipse className={s.shade} cx="54" cy="100" rx="24" ry="5" />
                <ellipse className={s.shade} cx="124" cy="94" rx="32" ry="6" />
                <ellipse className={s.shade} cx="192" cy="90" rx="20" ry="4" />
                <ellipse className={s.stoneB} cx="52" cy="88" rx="22" ry="14" transform="rotate(8 52 88)" />
                <ellipse className={s.stoneA} cx="122" cy="80" rx="30" ry="18" transform="rotate(-6 122 80)" />
                <ellipse className={s.stoneC} cx="190" cy="78" rx="18" ry="13" transform="rotate(10 190 78)" />
              </svg>
              <h3>Settle</h3>
              <p>
                Engram reads what you set down and quietly links it to what’s already there. You
                don’t organise. It settles.
              </p>
            </article>
            <article>
              <svg viewBox="0 0 240 150" aria-hidden="true">
                <ellipse className={s.rip} cx="120" cy="112" rx="88" ry="24" opacity="0.35" />
                <ellipse className={s.rip} cx="120" cy="112" rx="54" ry="15" opacity="0.6" />
                <path className={s.trail} d="M120 104V74" />
                <ellipse className={s.stoneC} cx="120" cy="52" rx="20" ry="14" transform="rotate(-8 120 52)" />
                <path className={s.lift} d="M150 60c10-10 10-24 0-34M146 28l4-3 4 4" />
                <path className={s.lift} d="M90 60c-10-10-10-24 0-34M94 28l-4-3-4 4" />
              </svg>
              <h3>Return</h3>
              <p>
                When you’re writing or wondering, the right notes rise on their own. And each
                morning, three you’d forgotten you had.
              </p>
            </article>
          </div>
        </section>

        {/* --------------------------------------------------------- quiet */}
        <section id="quiet" className={s.quiet}>
          <InView className={s.quietInner} amount={0.35}>
            <p className={s.eyebrow}>Quiet by design</p>
            <ul className={s.struck} aria-label="Things Engram does not have">
              <li>Streaks</li>
              <li>Badges</li>
              <li>Red dots</li>
              <li>Feeds</li>
              <li>Nudges</li>
            </ul>
            <h2>
              Engram never asks for your attention.
              <br />
              It waits until you need it.
            </h2>
            <p>
              No notifications unless you ask for one. Your notes are plain text files on your own
              device, encrypted before they travel. Nobody here is measured on how often you open
              the app.
            </p>
          </InView>
        </section>

        {/* ----------------------------------------------------------- day */}
        <section className={s.section}>
          <header className={s.head}>
            <p className={s.eyebrow}>A day, a little lighter</p>
            <h2>It takes about a minute. Spread across a day.</h2>
          </header>
          <ol className={s.day}>
            <li>
              <i />
              <time>07:40</time>
              <h3>On the train</h3>
              <p>
                A thought about Thursday’s one-on-ones. You say it to your phone. It’s kept before
                the next stop.
              </p>
            </li>
            <li>
              <i />
              <time>11:15</time>
              <h3>Mid-meeting</h3>
              <p>
                Someone mentions the ferry. Two taps: <em>ask Sam about the ferry story.</em> Back
                to the meeting.
              </p>
            </li>
            <li>
              <i />
              <time>16:30</time>
              <h3>Writing</h3>
              <p>
                You start chapter three. Three old notes about bridges settle beside the page.
                You’d forgotten all of them.
              </p>
            </li>
            <li>
              <i />
              <time>21:30</time>
              <h3>Evening</h3>
              <p>
                Nothing left to hold. You close the laptop with an empty head, which is rather the
                point.
              </p>
            </li>
          </ol>
        </section>

        {/* --------------------------------------------------------- voice */}
        <section className={s.voice}>
          <blockquote>
            <p>“For the first time in years, the inside of my head is quiet at night.”</p>
            <footer>Ruth Okafor, charge nurse and mother of three</footer>
          </blockquote>
        </section>

        {/* --------------------------------------------------------- price */}
        <section id="price" className={s.section}>
          <header className={s.head}>
            <p className={s.eyebrow}>Price</p>
            <h2>
              Free, quietly.
              <br />
              Eight dollars, everywhere.
            </h2>
          </header>
          <div className={s.plans}>
            <article>
              <h3>On one device</h3>
              <p className={s.amount}>Free</p>
              <p>
                Everything Engram does, on the device in front of you. No account, no card, no
                catch.
              </p>
              <a href="#top" className={s.soft}>
                Get Engram
              </a>
            </article>
            <article data-warm>
              <h3>On all of them</h3>
              <p className={s.amount}>
                $8 <span>a month</span>
              </p>
              <p>
                Your notes on every device, encrypted so only you can read them. Morning notes. Ask
                your notes anything.
              </p>
              <a href="#top" className={s.solid}>
                Start a free month
              </a>
            </article>
          </div>
          <p className={s.fine}>
            Sharing with family or a team? It’s $12 a person. Your notes stay yours whether you pay
            us or not.
          </p>
        </section>

        {/* ----------------------------------------------------------- cta */}
        <section className={s.cta}>
          <svg viewBox="0 0 200 190" aria-hidden="true" className={s.cairn}>
            <ellipse className={s.shade} cx="100" cy="172" rx="78" ry="9" />
            <ellipse className={s.stoneA} cx="100" cy="152" rx="60" ry="21" transform="rotate(-2 100 152)" />
            <ellipse className={s.stoneD} cx="104" cy="117" rx="45" ry="17" transform="rotate(3 104 117)" />
            <ellipse className={s.stoneB} cx="97" cy="89" rx="34" ry="14" transform="rotate(-4 97 89)" />
            <ellipse className={s.stoneA} cx="102" cy="66" rx="24" ry="11" transform="rotate(5 102 66)" />
            <ellipse className={s.stoneC} cx="99" cy="48" rx="14" ry="8" transform="rotate(-6 99 48)" />
          </svg>
          <h2>Whenever you’re ready.</h2>
          <a href="#top" className={s.solid}>
            Get Engram
          </a>
          <p>Free on one device · Mac, Windows, Linux, iPhone, Android</p>
        </section>
      </main>

      <footer className={s.footer}>
        <Logo />
        <nav aria-label="Footer">
          <a href="#how">How it works</a>
          <a href="#price">Price</a>
          <a href="#top">The manual</a>
          <a href="#top">Privacy</a>
          <a href="#top">Say hello</a>
        </nav>
        <p>© 2026 Engram Labs. Made slowly, by nine people.</p>
      </footer>
    </div>
  );
}
