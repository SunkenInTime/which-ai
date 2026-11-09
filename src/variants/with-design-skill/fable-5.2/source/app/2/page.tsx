import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Old_Standard_TT } from "next/font/google";
import { growNeuron, pickLabelled, VIEW } from "./neuron";
import s from "./page.module.css";

const plate = Old_Standard_TT({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-plate",
});

export const metadata: Metadata = {
  title: "Mull, notes that grow toward each other (design 2 of 5)",
};

const KEY = [
  { letter: "a", note: "Desire paths", when: "14 Mar 2024" },
  { letter: "b", note: "Pave the cowpaths", when: "2 Feb 2026" },
  { letter: "c", note: "Pace layers", when: "30 Aug 2022" },
  { letter: "d", note: "Onboarding review", when: "today" },
];

function timing(delay: number, dur: number): CSSProperties {
  return { "--delay": `${delay.toFixed(2)}s`, "--dur": `${dur.toFixed(2)}s` } as CSSProperties;
}

function Neuron() {
  const { limbs, spines, tips, boutons } = growNeuron(41);
  const labelled = pickLabelled(tips);
  const end = Math.max(...limbs.map((l) => l.delay + l.dur));

  return (
    <svg
      className={s.neuron}
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      role="img"
      aria-label="Ink drawing of a single neuron. Four of its branch tips are lettered a to d."
    >
      <g className={s.ink}>
        {limbs.map((l, i) => (
          <path
            key={i}
            className={s.limb}
            d={l.d}
            pathLength={1}
            strokeWidth={l.w}
            style={timing(l.delay, l.dur)}
          />
        ))}
        {spines.map((sp, i) => (
          <path key={i} className={s.spines} d={sp.d} style={timing(sp.delay, 0.5)} />
        ))}
      </g>
      <g className={s.soma} style={timing(0, 0.4)}>
        <path d="M500 750C508 768 536 806 540 826C542 840 528 846 510 846L490 846C472 846 458 840 460 826C464 806 492 768 500 750Z" />
        <path d="M488 844C494 852 498 858 498.8 866L501.2 866C502 858 506 852 512 844Z" />
      </g>
      {boutons.map((b, i) => (
        <circle key={i} className={s.bouton} cx={b.x} cy={b.y} r={4.5} style={timing(b.t, 0.3)} />
      ))}
      {labelled.map((tip, i) => {
        const cos = Math.cos(tip.a);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        return (
          <g key={KEY[i].letter} className={s.label} style={timing(end + i * 0.12, 0.5)}>
            <circle cx={tip.x} cy={tip.y} r={6.5} />
            <text
              x={tip.x + Math.cos(tip.a) * 26}
              y={tip.y + Math.sin(tip.a) * 26}
              textAnchor={anchor}
              dominantBaseline="middle"
            >
              {KEY[i].letter}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className={s.section}>
      <div className={s.collateral} aria-hidden="true" />
      <div className={s.sectionBody}>
        <h2 className={s.h2}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function GolgiPlate() {
  return (
    <div className={`${s.plate} ${plate.variable}`} data-iteration="2">
      <div className={s.wrap}>
        <header className={s.top}>
          <a className={s.wordmark} href="#top">
            Mull
          </a>
          <nav className={s.nav} aria-label="Sections">
            <a href="#capture">How it works</a>
            <a href="#files">Your files</a>
            <a href="#price">Price</a>
          </nav>
        </header>

        <main id="top">
          <section className={s.hero}>
            <div className={s.heroText}>
              <h1 className={s.h1}>Every note you write grows toward the others.</h1>
              <p className={s.lede}>
                Mull is a note-taking app that works the way memory does. It keeps what you
                write, finds what it connects to, and brings both back when you are thinking
                about either.
              </p>
              <div className={s.actions}>
                <a className={s.button} href="#download">
                  Download Mull
                </a>
                <p className={s.small}>Free on one device. Mac, Windows, Linux, iPhone and Android.</p>
              </div>

              <div className={s.caption}>
                <p>
                  <span className={s.figNo}>Fig. 1.</span> One note, drawn with the notes it
                  has grown toward.
                </p>
                <dl className={s.key}>
                  {KEY.map((k) => (
                    <div key={k.letter}>
                      <dt>{k.letter}</dt>
                      <dd>
                        {k.note}, <span>{k.when}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className={s.figure}>
              <Neuron />
            </div>
          </section>

          <div className={s.body}>
            <Section id="capture" title="Catch it before it fades">
              <p>
                An unprompted thought lasts a few seconds. Press Ctrl+Space from any app, type
                it, press Enter. Mull stores it in today&rsquo;s note with the time and gets
                out of the way. No title to invent, no folder to choose.
              </p>
              <p>On a phone, share to Mull, or hold the button and say it aloud.</p>
            </Section>

            <Section id="link" title="Links form on their own">
              <p>
                Type [[ and the first letters of a title to join two notes. The link runs both
                ways without further work from you.
              </p>
              <p>
                When you forget to link, Mull notices that two notes are about the same thing
                and proposes it. You accept or dismiss. It never rewires anything silently.
              </p>
            </Section>

            <section id="resurface" className={s.band}>
              <div className={s.bandInner}>
                <div className={s.bandIntro}>
                  <h2 className={s.h2}>Old notes fire again</h2>
                  <p>
                    While you write, Mull shows the notes that bear on the sentence in front of
                    you. Most weeks, one of them is something you wrote years ago and lost
                    track of.
                  </p>
                </div>

                <figure className={s.fig2}>
                  <div className={s.today}>
                    <p className={s.when}>Monday 9 November 2026</p>
                    <p className={s.writing}>
                      The onboarding emails all land on day one, and nobody opens the fourth.
                      Space them out?
                    </p>
                  </div>
                  <ul className={s.fired}>
                    <li>
                      <p className={s.firedTitle}>Spacing effect</p>
                      <p>Review just before you would forget, and the curve flattens.</p>
                      <p className={s.when}>2 September 2023</p>
                    </li>
                    <li>
                      <p className={s.firedTitle}>Forgetting curve</p>
                      <p>Ebbinghaus, 1885. Without review, most of a new thing is gone in days.</p>
                      <p className={s.when}>2 September 2023</p>
                    </li>
                  </ul>
                  <figcaption className={s.fig2Caption}>
                    <span className={s.figNo}>Fig. 2.</span> A note being written today, and
                    the two older notes Mull placed beside it.
                  </figcaption>
                </figure>
              </div>
            </section>

            <Section id="ask" title="Ask it what you think">
              <p>
                Put a question in plain words. Mull answers from your own notes and names every
                one it used, so you can check its work.
              </p>
              <div className={s.exchange}>
                <p className={s.question}>What do I know about spacing things out?</p>
                <p>
                  Three notes. Review works best just before you would forget{" "}
                  <cite>Spacing effect</cite>. The onboarding emails all land on day one{" "}
                  <cite>today</cite>. Dough folded every half hour holds its shape{" "}
                  <cite>Sourdough, 78%</cite>.
                </p>
              </div>
            </Section>

            <Section id="files" title="It lives on your disk">
              <p>
                Every note is a plain Markdown file in a folder on your computer. Any editor
                opens them, and Mull works with no connection.
              </p>
              <p>
                Sync between devices is encrypted end to end, so nobody at Mull can read a
                word. Leaving means copying a folder.
              </p>
            </Section>

            <Section id="price" title="Free on one device">
              <dl className={s.prices}>
                <div>
                  <dt>Mull</dt>
                  <dd className={s.amount}>Free</dd>
                  <dd>Every feature on this page, on one device, with no limit on notes.</dd>
                </div>
                <div>
                  <dt>Mull Sync</dt>
                  <dd className={s.amount}>$6 a month</dd>
                  <dd>The same on every device you own, encrypted end to end.</dd>
                </div>
              </dl>
            </Section>

            <Section id="download" title="Start with one note">
              <p>Pick a device. The first note takes about four seconds.</p>
              <ul className={s.platforms}>
                <li>
                  <a className={s.button} href="#download">
                    Download for Windows
                  </a>
                </li>
                <li>
                  <a href="#download">Mac</a>
                </li>
                <li>
                  <a href="#download">Linux</a>
                </li>
                <li>
                  <a href="#download">iPhone</a>
                </li>
                <li>
                  <a href="#download">Android</a>
                </li>
              </ul>
            </Section>

            <svg className={s.terminal} viewBox="0 0 120 104" aria-hidden="true">
              <path d="M60 0V30M60 30C60 52 36 56 28 80M60 30C60 56 63 70 58 92M60 30C62 50 86 56 94 74" />
              <circle cx="27" cy="83" r="5" />
              <circle cx="58" cy="96" r="5" />
              <circle cx="95" cy="77" r="5" />
            </svg>
          </div>
        </main>

        <footer className={s.foot}>
          <p>Mull, 2026. Made by six people who also forget things.</p>
          <p className={s.footLinks}>
            <a href="#files">Privacy</a>
            <a href="#price">Terms</a>
            <a href="#top">Changelog</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
