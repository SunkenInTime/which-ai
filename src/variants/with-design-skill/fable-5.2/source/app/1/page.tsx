import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Courier_Prime } from "next/font/google";
import s from "./page.module.css";

const typed = Courier_Prime({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-typed",
});

export const metadata: Metadata = {
  title: "Mull, a slip box for your notes (design 1 of 5)",
};

function tilt(deg: number): CSSProperties {
  return { "--tilt": `${deg}deg` } as CSSProperties;
}

function Card({
  id,
  no,
  title,
  deg = 0,
  children,
}: {
  id: string;
  no: string;
  title: string;
  deg?: number;
  children: ReactNode;
}) {
  return (
    <article id={id} className={s.card} style={tilt(deg)}>
      <header className={s.cardHead}>
        <span className={s.no}>{no}</span>
        <h2 className={s.cardTitle}>{title}</h2>
      </header>
      <div className={s.cardBody}>{children}</div>
    </article>
  );
}

function Slip({
  no,
  title,
  date,
  deg = 0,
  yellow = false,
  className = "",
  children,
}: {
  no?: string;
  title: string;
  date?: string;
  deg?: number;
  yellow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${s.slip} ${yellow ? s.slipYellow : ""} ${className}`}
      style={tilt(deg)}
    >
      <div className={s.slipHead}>
        {no ? <span className={s.no}>{no}</span> : null}
        <span className={s.slipTitle}>{title}</span>
        {date ? <span className={s.slipDate}>{date}</span> : null}
      </div>
      <div className={s.slipBody}>{children}</div>
    </div>
  );
}

export default function SlipBox() {
  return (
    <div className={`${s.desk} ${typed.variable}`} data-iteration="1">
      <div className={s.wrap}>
        <header className={s.top}>
          <a className={s.wordmark} href="#c1">
            Mull
          </a>
          <a className={s.topButton} href="#c8">
            Download Mull
          </a>
        </header>

        <main>
          <section className={s.hero}>
            <div className={s.heroStack}>
              <nav className={s.divider} aria-label="Sections">
                <a className={s.tab} href="#c2">
                  How it works
                </a>
                <a className={s.tab} href="#c6">
                  Your files
                </a>
                <a className={s.tab} href="#c7">
                  Price
                </a>
              </nav>

              <article id="c1" className={`${s.card} ${s.heroCard}`} style={tilt(-0.6)}>
                <header className={s.cardHead}>
                  <span className={s.no}>1</span>
                  <p className={s.cardTitle}>Mull</p>
                </header>
                <div className={s.cardBody}>
                  <h1 className={s.heroTitle}>Hold that thought.</h1>
                  <p className={s.lede}>
                    Mull is a note-taking app built like a slip box. Type a thought onto a
                    card once. Mull files it beside the cards it belongs with, and hands it
                    back on the day you need it.
                  </p>
                  <div className={s.actions}>
                    <a className={s.button} href="#c8">
                      Download Mull
                    </a>
                    <span className={s.aside}>Free on one device, with no card limit.</span>
                  </div>
                  <p className={s.refs}>
                    see also <a href="#c2">2 Capture</a>, <a href="#c6">6 Your files</a>
                  </p>
                </div>
              </article>
            </div>

            <div className={s.fan} role="group" aria-label="Three example notes">
              <Slip no="14" title="Desire paths" date="14 Mar 2024" deg={4} className={s.fanA}>
                <p>People wear the route they want into the grass. Pave those.</p>
                <p className={s.slipRefs}>see also 14a, 9c</p>
              </Slip>
              <Slip
                no="14a"
                title="Pave the cowpaths"
                date="2 Feb 2026"
                deg={-3}
                className={s.fanB}
              >
                <p>Watch what users already do, then make that the official way.</p>
                <p className={s.slipRefs}>from 14</p>
              </Slip>
              <Slip no="9c" title="Pace layers" date="30 Aug 2022" deg={6} className={s.fanC}>
                <p>Fast layers learn. Slow layers remember.</p>
                <p className={s.slipRefs}>from 14</p>
              </Slip>
            </div>
          </section>

          <section className={s.pair}>
            <div className={s.cell}>
              <Card id="c2" no="2" title="Capture" deg={0.6}>
                <p>
                  Press Ctrl+Space in any app. Type the thought. Press Enter. It is on a
                  card before the window you were in has lost focus.
                </p>
                <p>
                  There is no title to invent and no folder to choose. On a phone, share to
                  Mull, or hold the button and say it.
                </p>
                <p className={s.refs}>
                  see also <a href="#c3">3 Link</a>
                </p>
              </Card>
              <div className={s.pinned}>
                <Slip title="today" date="10:42" deg={3} yellow>
                  <p>onboarding emails all land on day one. space them out?</p>
                </Slip>
              </div>
            </div>

            <div className={`${s.cell} ${s.cellLow}`}>
              <Card id="c3" no="3" title="Link" deg={-0.5}>
                <p>
                  Type [[ and the first letters of a title to link two cards. Mull writes
                  the return address on the other card, so every link runs both ways.
                </p>
                <p>
                  When you forget, Mull notices that two cards are about the same thing and
                  offers to link them. It asks first.
                </p>
                <p className={s.refs}>
                  see also <a href="#c4">4 Resurface</a>
                </p>
              </Card>
              <div className={`${s.pinned} ${s.pinnedPair}`}>
                <Slip no="22" title="Forgetting curve" date="2 Sep 2023" deg={-3}>
                  <p>Ebbinghaus, 1885. Without review, most of a new thing is gone in days.</p>
                  <p className={s.slipRefs}>see also 22a</p>
                </Slip>
                <Slip
                  no="22a"
                  title="Spacing effect"
                  date="2 Sep 2023"
                  deg={2.5}
                  className={s.pairSecond}
                >
                  <p>Review just before you would forget, and the curve flattens.</p>
                  <p className={s.slipRefs}>from 22</p>
                </Slip>
              </div>
            </div>
          </section>

          <section className={s.pair}>
            <div className={s.cell}>
              <Card id="c4" no="4" title="Resurface" deg={-0.4}>
                <p>
                  Start writing and Mull pulls the old cards that bear on it. The onboarding
                  note from card 2 brings up 22a, Spacing effect: written in September 2023
                  and not opened since.
                </p>
                <p>Once a week it also hands you a few cards that are about to go cold.</p>
                <p className={s.refs}>
                  see also <a href="#c2">2 Capture</a>, <a href="#c5">5 Ask</a>
                </p>
              </Card>
              <div className={s.pinned}>
                <div className={s.dateSlip} style={tilt(-4)}>
                  <p className={s.dateSlipHead}>22a came back</p>
                  <ol className={s.stamps}>
                    <li>2 Sep 2023</li>
                    <li>11 Jan 2024</li>
                    <li>30 Jun 2025</li>
                    <li>9 Nov 2026</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className={`${s.cell} ${s.cellLow}`}>
              <Card id="c5" no="5" title="Ask" deg={0.5}>
                <p>
                  Ask a question in plain words. Mull answers from your own cards and lists
                  the ones it used, so you can check its work.
                </p>
                <dl className={s.qa}>
                  <dt>Q.</dt>
                  <dd>what do I know about spacing things out?</dd>
                  <dt>A.</dt>
                  <dd>
                    Three cards. Review works best just before you would forget (22a). The
                    onboarding emails all land on day one (today, 10:42). Dough folded every
                    half hour holds its shape (31).
                  </dd>
                </dl>
                <p className={s.refs}>
                  see also <a href="#c6">6 Your files</a>
                </p>
              </Card>
            </div>
          </section>

          <section className={s.pair}>
            <div className={s.cell}>
              <Card id="c6" no="6" title="Your files" deg={0.4}>
                <p>
                  Every card is a plain text file in a folder on your computer. Any editor
                  opens them. Mull works with no connection.
                </p>
                <p>
                  Sync between devices is encrypted end to end, so nobody at Mull can read a
                  word. If you leave, you take the folder.
                </p>
                <ul className={s.listing}>
                  <li>notes/</li>
                  <li>14 desire-paths.md</li>
                  <li>14a pave-the-cowpaths.md</li>
                  <li>22 forgetting-curve.md</li>
                  <li>22a spacing-effect.md</li>
                </ul>
                <p className={s.refs}>
                  see also <a href="#c7">7 Price</a>
                </p>
              </Card>
            </div>

            <div className={`${s.cell} ${s.cellLow}`}>
              <Card id="c7" no="7" title="Price" deg={-0.6}>
                <dl>
                  <div className={s.price}>
                    <dt>Mull</dt>
                    <dd className={s.amount}>free</dd>
                    <dd className={s.detail}>
                      Everything on these cards, on one device. No card limit, no trial.
                    </dd>
                  </div>
                  <div className={s.price}>
                    <dt>Mull Sync</dt>
                    <dd className={s.amount}>$6 a month</dd>
                    <dd className={s.detail}>
                      The same on every device you own, encrypted end to end.
                    </dd>
                  </div>
                </dl>
                <p className={s.refs}>
                  see also <a href="#c8">8 Download</a>
                </p>
              </Card>
            </div>
          </section>

          <section className={s.last}>
            <article id="c8" className={s.card} style={tilt(-0.5)}>
              <header className={s.cardHead}>
                <span className={s.no}>8</span>
                <h2 className={s.cardTitle}>Download</h2>
              </header>
              <div className={s.cardBody}>
                <p className={s.heroTitle}>Start a card.</p>
                <p className={s.lede}>
                  Pick a device. Your first thought is on a card about four seconds after
                  Mull opens.
                </p>
                <ul className={s.platforms}>
                  <li>
                    <a className={s.button} href="#c8">
                      Download for Windows
                    </a>
                  </li>
                  <li>
                    <a className={s.buttonQuiet} href="#c8">
                      Mac
                    </a>
                  </li>
                  <li>
                    <a className={s.buttonQuiet} href="#c8">
                      Linux
                    </a>
                  </li>
                  <li>
                    <a className={s.buttonQuiet} href="#c8">
                      iPhone
                    </a>
                  </li>
                  <li>
                    <a className={s.buttonQuiet} href="#c8">
                      Android
                    </a>
                  </li>
                </ul>
                <p className={s.refs}>
                  back to <a href="#c1">1 Mull</a>
                </p>
              </div>
            </article>
          </section>
        </main>

        <footer className={s.foot}>
          <p>Mull, 2026. Made by six people who also forget things.</p>
          <p>
            <a href="#c6">Privacy</a> <a href="#c7">Terms</a> <a href="#c1">Changelog</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
