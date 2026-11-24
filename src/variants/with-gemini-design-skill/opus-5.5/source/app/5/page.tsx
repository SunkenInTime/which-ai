import styles from "./page.module.css";
import Constellation from "./Constellation";
import MarginNotes from "./MarginNotes";
import AskNotes from "./AskNotes";

const WAVE = Array.from({ length: 56 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.61) * 0.7 + Math.sin(i * 1.73) * 0.3);
  return Math.round(4 + v * 30);
});

// Five years of months; a few are notes Kept has brought back.
const MONTHS = Array.from({ length: 60 }, (_, i) => i);

export default function NightShift() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        {/* Gallery adaptation: the source linked to "/5", reloading the page at its top; inside the gallery (and its
            compare panes) a jump to the top of the page does the same without leaving the embed. */}
        <a href="#top" className={styles.brand} aria-label="Kept home">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <path d="M11 1.5l2.2 7.3 7.3 2.2-7.3 2.2-2.2 7.3-2.2-7.3-7.3-2.2 7.3-2.2z" fill="#ffb547" />
          </svg>
          Kept
        </a>
        <nav className={styles.nav} aria-label="Primary">
          <a href="#links" className={styles.navHide}>Features</a>
          <a href="#ask" className={styles.navHide}>Ask your notes</a>
          <a href="#pricing" className={styles.navHide}>Pricing</a>
          <a href="#start">Sign in</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <Constellation />
          <div className={styles.heroFade} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <h1 className={styles.h1}>
              <span style={{ animationDelay: "80ms" }}>A second brain</span>{" "}
              <span style={{ animationDelay: "200ms" }}>that remembers</span>{" "}
              <span style={{ animationDelay: "320ms" }}>what you meant.</span>
            </h1>
            <p className={styles.heroLede}>
              Kept links your notes as you write, so the idea from three winters ago finds you again tonight.
            </p>
            <a href="#start" className={styles.cta}>
              Start writing free
            </a>
          </div>
        </section>

        <section id="links" className={`${styles.section} ${styles.linksSection}`}>
          <div className={styles.container}>
            <div className={`${styles.split} ${styles.reveal}`}>
              <h2 className={styles.h2}>Your notes remember what they connect to.</h2>
              <p className={styles.body}>
                Write the way you always have. Kept notices the people, ideas and sources you have written about
                before and links them both ways, so every note shows what points back to it. Try it on the
                draft below.
              </p>
            </div>
            <div className={styles.reveal}>
              <MarginNotes />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.container} ${styles.captureGrid}`}>
            <div className={styles.reveal}>
              <h2 className={styles.h2}>Catch the thought before it leaves.</h2>
              <p className={styles.body}>
                Press Option and Space from any app and start talking or typing. Kept files whatever you hand it and
                links it to what you already know.
              </p>
              <dl className={styles.ledger}>
                <div>
                  <dt>Typed notes</dt>
                  <dd>Markdown that stays out of your way until you need it.</dd>
                </div>
                <div>
                  <dt>Web clips</dt>
                  <dd>Save the paragraph that mattered, with the source attached.</dd>
                </div>
                <div>
                  <dt>PDFs</dt>
                  <dd>Highlight a passage and it becomes a note of its own.</dd>
                </div>
                <div>
                  <dt>Voice memos</dt>
                  <dd>Speak at 2 a.m., read a clean transcript over breakfast.</dd>
                </div>
              </dl>
            </div>

            <figure className={`${styles.capture} ${styles.reveal}`} aria-label="Quick capture window recording a voice memo">
              <div className={styles.captureBar}>
                <span>Quick capture</span>
                <span className={styles.muted}>Option + Space</span>
              </div>
              <svg className={styles.wave} viewBox="0 0 336 40" preserveAspectRatio="none" aria-hidden="true">
                {WAVE.map((h, i) => (
                  <rect
                    key={i}
                    x={i * 6}
                    y={20 - h / 2}
                    width="3"
                    height={h}
                    rx="1.5"
                    fill={i < 38 ? "#ffb547" : "rgba(217,221,227,0.28)"}
                  />
                ))}
              </svg>
              <p className={styles.captureText}>
                Idea for chapter three: the tide does not go out, the land comes up to meet it. Ask the lighthouse
                keeper about this.
              </p>
              <figcaption className={styles.captureMeta}>
                <span>Voice memo, 0:41</span>
                <span>Linked to Draft: chapter three and Interview: the lighthouse keeper</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="ask" className={`${styles.section} ${styles.askSection}`}>
          <div className={styles.container}>
            <div className={`${styles.split} ${styles.reveal}`}>
              <h2 className={styles.h2}>Ask a question. Get an answer from your own notes.</h2>
              <p className={styles.body}>
                Ask your notes reads everything you have kept and answers in plain language, with every claim
                pointing to the note it came from.
              </p>
            </div>
            <div className={styles.reveal}>
              <AskNotes />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.resurface}`}>
          <div className={`${styles.container} ${styles.resurfaceInner}`}>
            <h2 className={`${styles.h2} ${styles.reveal}`}>On this night, two years ago</h2>
            <blockquote className={`${styles.resurfacedNote} ${styles.reveal}`}>
              <p>
                &ldquo;Maybe the essay is not about trains at all. Maybe it is about the hour when nobody needs
                anything from you.&rdquo;
              </p>
              <footer className={styles.resurfacedMeta}>
                Sunday 24 November 2024, 11:48 p.m. Voice memo, now linked to four notes.
              </footer>
            </blockquote>

            <svg className={`${styles.timeline} ${styles.reveal}`} viewBox="0 0 1000 120" aria-hidden="true">
              <path d="M 963 56 C 900 -8, 636 -8, 573 56" fill="none" stroke="#ffb547" strokeWidth="1.5" strokeDasharray="3 5" />
              {MONTHS.map((m) => {
                const x = 20 + m * (960 / 59);
                const back = m === 34;
                const now = m === 58;
                const kept = [4, 11, 17, 22, 26, 34, 39, 45, 51, 55].includes(m);
                return (
                  <circle
                    key={m}
                    cx={x}
                    cy={64}
                    r={back || now ? 6 : kept ? 3.5 : 2}
                    fill={back || now ? "#ffb547" : kept ? "#d9dde3" : "rgba(217,221,227,0.3)"}
                  />
                );
              })}
              {["2022", "2023", "2024", "2025", "2026"].map((y, i) => (
                <text key={y} x={20 + i * 12 * (960 / 59)} y={104} className={styles.timelineYear}>
                  {y}
                </text>
              ))}
            </svg>

            <p className={`${styles.body} ${styles.resurfaceBody} ${styles.reveal}`}>
              Every morning Kept opens a fresh daily note and brings back a few older ones on a spaced schedule,
              the way flashcards do, so good ideas get a second look before they fade.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.container} ${styles.trustGrid}`}>
            <div className={styles.reveal}>
              <h2 className={styles.h2}>Yours, even with the lights off.</h2>
              <dl className={styles.ledger}>
                <div>
                  <dt>Works offline</dt>
                  <dd>Write on a plane, in a cabin or in a tunnel. Kept syncs the moment you are back.</dd>
                </div>
                <div>
                  <dt>End-to-end encrypted</dt>
                  <dd>Notes are locked on your device before they leave it. We cannot read them, and never will.</dd>
                </div>
                <div>
                  <dt>Plain markdown, always</dt>
                  <dd>Export everything as ordinary .md files with folders intact, whenever you like.</dd>
                </div>
                <div>
                  <dt>On every screen</dt>
                  <dd>Mac, Windows, iPhone and iPad, Android and the web, in sync within seconds.</dd>
                </div>
              </dl>
            </div>

            <figure className={`${styles.file} ${styles.reveal}`} aria-label="An exported note as a markdown file">
              <div className={styles.fileBar}>
                <span>Kept/Journal/2026-11-24.md</span>
              </div>
              <pre className={styles.fileBody}>
                <span className={styles.muted}>---</span>
                {"\n"}
                <span className={styles.muted}>created: 2026-11-24 23:48</span>
                {"\n"}
                <span className={styles.muted}>tags: journal, essays</span>
                {"\n"}
                <span className={styles.muted}>---</span>
                {"\n\n"}
                <span className={styles.fileHeading}># Tuesday night</span>
                {"\n\n"}
                {"Reread the memo from two years ago. It still\nholds. Moving it into "}
                <span className={styles.fileLink}>[[Draft: chapter three, the tide]]</span>
                {"\nand linking "}
                <span className={styles.fileLink}>[[Memory is a field, not a vault]]</span>
                {"."}
              </pre>
            </figure>
          </div>
        </section>

        <section className={`${styles.section} ${styles.quotes}`}>
          <div className={styles.container}>
            <h2 className={`${styles.h2} ${styles.srOnly}`}>What writers say</h2>
            <figure className={`${styles.pull} ${styles.reveal}`}>
              <blockquote>
                <p>
                  &ldquo;I used to lose half my ideas between the notebook and the laptop. Now a note I wrote in a
                  Lisbon hotel shows up right when I am drafting the chapter that needs it.&rdquo;
                </p>
              </blockquote>
              <figcaption>
                <strong>In&ecirc;s Carvalho</strong>, novelist, writing her third book in Kept
              </figcaption>
            </figure>
            <figure className={`${styles.pull} ${styles.pullRight} ${styles.reveal}`}>
              <blockquote>
                <p>
                  &ldquo;Ask your notes is the first search that answers like a research assistant who has read
                  everything I have.&rdquo;
                </p>
              </blockquote>
              <figcaption>
                <strong>Tomasz Wren</strong>, historian, eleven years of archive notes imported
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="pricing" className={`${styles.section} ${styles.pricing}`}>
          <div className={styles.container}>
            <div className={`${styles.split} ${styles.reveal}`}>
              <h2 className={styles.h2}>Free to begin, fair as you grow.</h2>
              <p className={styles.body}>Every plan keeps your notes encrypted and exportable. Upgrade or leave whenever you want.</p>
            </div>
            <div className={`${styles.plans} ${styles.reveal}`}>
              <div className={styles.plan}>
                <h3 className={styles.planName}>Free</h3>
                <p className={styles.price}>
                  $0
                </p>
                <ul className={styles.planList}>
                  <li>Unlimited notes, links and backlinks</li>
                  <li>Quick capture and web clips</li>
                  <li>Sync across two devices</li>
                  <li>Markdown export</li>
                </ul>
              </div>
              <div className={`${styles.plan} ${styles.planFeatured}`}>
                <h3 className={styles.planName}>Plus</h3>
                <p className={styles.price}>
                  $8<span className={styles.per}> per month</span>
                </p>
                <ul className={styles.planList}>
                  <li>Everything in Free</li>
                  <li>Ask your notes</li>
                  <li>Voice memo transcripts and PDF highlights</li>
                  <li>Resurfacing and unlimited devices</li>
                </ul>
              </div>
              <div className={styles.plan}>
                <h3 className={styles.planName}>Teams</h3>
                <p className={styles.price}>
                  $14<span className={styles.per}> per person, per month</span>
                </p>
                <ul className={styles.planList}>
                  <li>Everything in Plus</li>
                  <li>Shared spaces beside private notes</li>
                  <li>Single sign-on and admin controls</li>
                  <li>Priority support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="start" className={styles.final}>
          <svg className={styles.finalSky} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <radialGradient id="k5-horizon" cx="0.5" cy="1" r="0.75">
                <stop offset="0" stopColor="#ffb547" stopOpacity="0.32" />
                <stop offset="0.45" stopColor="#ffb547" stopOpacity="0.06" />
                <stop offset="1" stopColor="#ffb547" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1440" height="600" fill="url(#k5-horizon)" />
            <path d="M -20 600 Q 720 470 1460 600" fill="#0b1626" />
            <path d="M -20 600 Q 720 470 1460 600" fill="none" stroke="#ffb547" strokeOpacity="0.5" strokeWidth="1" />
          </svg>
          <div className={`${styles.container} ${styles.finalInner}`}>
            <h2 className={styles.h2}>Tonight&rsquo;s idea deserves somewhere to land.</h2>
            <p className={styles.body}>Free for personal notes. Ready on every device in under a minute.</p>
            <a href="#start" className={styles.cta}>
              Start writing free
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div>
            <p className={styles.footerBrand}>Kept</p>
            <p className={styles.small}>A second brain for people who think at night.</p>
          </div>
          <nav aria-label="Product">
            <p className={styles.footerHead}>Product</p>
            <a href="#links">Features</a>
            <a href="#ask">Ask your notes</a>
            <a href="#pricing">Pricing</a>
            <a href="#start">Download</a>
          </nav>
          <nav aria-label="Company">
            <p className={styles.footerHead}>Company</p>
            <a href="#start">About</a>
            <a href="#start">Journal</a>
            <a href="#start">Careers</a>
          </nav>
          <nav aria-label="Trust">
            <p className={styles.footerHead}>Trust</p>
            <a href="#start">Security</a>
            <a href="#start">Privacy</a>
            <a href="#start">Export your data</a>
          </nav>
        </div>
        <div className={`${styles.container} ${styles.footerBase}`}>
          <span>&copy; 2026 Kept Labs. Written mostly after midnight.</span>
        </div>
      </footer>
    </div>
  );
}
