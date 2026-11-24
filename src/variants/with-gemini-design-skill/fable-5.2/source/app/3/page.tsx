// Gallery adaptation: fonts come from app/fonts.css (self-hosted, prefixed names) instead of next/font.
import styles from "./page.module.css";

const LINE = [
  { title: "Why I forget what I read", meta: "Written today", tilt: -3, drop: 2.55 },
  { title: "The palest ink", meta: "Highlight, last spring", tilt: 2.5, drop: 4.95 },
  { title: "Spaced repetition", meta: "Lecture notes, two years ago", tilt: -1.5, drop: 5.75 },
  { title: "Talk outline: memory", meta: "Draft, last month", tilt: 3, drop: 4.95 },
  { title: "Open with the proverb", meta: "Voice note, last week", tilt: -2.5, drop: 2.55 },
];

const MORNING = [
  {
    when: "14 months ago",
    title: "What Dana said about deadlines",
    text: "A date is only useful if someone can say no to it. Ask for the no early.",
  },
  {
    when: "Last March",
    title: "Things that made the Lisbon trip good",
    text: "One plan per day. Long lunches. Walking instead of the tram whenever we could.",
  },
  {
    when: "3 years ago",
    title: "Why the first draft felt easy",
    text: "I wrote it for one reader. The moment I pictured a crowd, every sentence slowed down.",
  },
];

export default function Page() {
  return (
    <div className={`${styles.page} gf-newsreader-serif gf-hanken-grotesk-sans`}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          Engram
        </a>
        <nav className={styles.nav} aria-label="Main">
          <a href="#keep">Keep</a>
          <a href="#connect">Connect</a>
          <a href="#return">Return</a>
          <a href="#begin">Pricing</a>
        </nav>
        <a href="#begin" className={styles.signin}>
          Sign in
        </a>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <h1>
            A place{" "}
            <svg className={styles.tokenCard} viewBox="0 0 64 48" aria-hidden="true">
              <rect x="1" y="1" width="62" height="46" rx="5" fill="#fff" stroke="#1d1147" strokeWidth="2" />
              <path d="M10 15h30M10 25h44M10 35h22" stroke="#1d1147" strokeWidth="3" strokeLinecap="round" />
              <circle cx="51" cy="14" r="5" fill="#ffd033" />
            </svg>{" "}
            to keep everything{" "}
            <svg className={styles.tokenVoice} viewBox="0 0 72 48" aria-hidden="true">
              <rect width="72" height="48" rx="24" fill="#1d1147" />
              <path
                d="M16 24v0M24 17v14M32 11v26M40 19v10M48 14v20M56 21v6"
                stroke="#ffd033"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>{" "}
            <span className={styles.swipe}>worth remembering.</span>
          </h1>
          <p className={styles.heroText}>
            Engram is a notebook for your whole mind. Save notes, quotes and passing
            thoughts, and it quietly connects them for you.
          </p>
          <a href="#begin" className={styles.button}>
            Start your notebook
          </a>

          <div className={styles.desk} aria-hidden="true">
            <div className={`${styles.paper} ${styles.paperQuote}`}>
              <p className={styles.paperSerif}>
                “The palest ink is better than the <mark>best memory</mark>.”
              </p>
              <span>Proverb, saved from a library book</span>
              <p className={styles.paperSerif}>
                Why it stopped me: I trust my memory far more than it deserves.
              </p>
            </div>
            <div className={`${styles.paper} ${styles.paperVoice}`}>
              <div className={styles.wave}>
                {[30, 62, 90, 48, 74, 100, 56, 38, 82, 60, 28, 70, 44, 22].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <p className={styles.paperSerif}>
                “Idea for the talk: open with the proverb about ink.”
              </p>
              <span>Voice note, 42 seconds</span>
              <p className={styles.paperSerif}>
                Then ask the room what they read last month, and what they kept.
              </p>
            </div>
            <div className={`${styles.paper} ${styles.paperMain}`}>
              <strong>Why I forget what I read</strong>
              <p className={styles.paperSerif}>
                I underline plenty and keep almost nothing. What stays is whatever I
                tie to a question I already have. See <u>the palest ink</u> and{" "}
                <u>spaced repetition</u>.
              </p>
              <span>Linked from 3 notes</span>
              <p className={styles.paperSerif}>
                The books I can still quote are the ones I argued with on paper.
                Writing one line back to the author seems to be enough.
              </p>
            </div>
          </div>
        </section>

        <section id="keep" className={styles.keep}>
          <div className={styles.keepCopy}>
            <h2>Save a line the moment it strikes you.</h2>
            <p>
              Highlight a sentence in a book, an article or a message and it lands in
              Engram with its source. Add a thought of your own in the margin, or
              leave it for later.
            </p>
            <p>
              On the move, say it out loud. Engram writes it down and keeps the
              recording beside the note.
            </p>
          </div>
          <figure className={styles.bookPage}>
            <p>
              Most of what we read leaves us within a week. Not because it was dull,
              but because nothing held it in place.
            </p>
            <p className={styles.pull}>
              <mark className={styles.hl}>
                A sentence stays when it is tied to something you already care about.
              </mark>
            </p>
            <p>
              A question you are chewing on, a project on your desk, a line from
              another book. The tying is the remembering. So when a line stops you,
              keep it, and say in a few words why it stopped you.
            </p>
            <figcaption>
              <em>In the margin:</em> this is why my reading notes never helped. Links
              to “Why I forget what I read”.
            </figcaption>
          </figure>
        </section>

        <section id="connect" className={styles.connect}>
          <h2>Old notes gather around new ones.</h2>
          <p className={styles.connectText}>
            Mention an idea and Engram pulls up every note that touches it, however
            long ago you wrote it. You never file a thing.
          </p>
          <div className={styles.line}>
            <svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 18 C 180 70, 330 96, 500 96 S 820 70, 1000 18" pathLength={1} />
            </svg>
            <ul>
              {LINE.map((note) => (
                <li
                  key={note.title}
                  style={
                    {
                      "--tilt": `${note.tilt}deg`,
                      "--drop": `${note.drop}rem`,
                    } as React.CSSProperties
                  }
                >
                  <strong>{note.title}</strong>
                  <span>{note.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="return" className={styles.morning}>
          <div className={styles.morningCopy}>
            <h2>Each morning, three notes from your past.</h2>
            <p>
              Engram picks notes that relate to what you are working on this week and
              sets them in front of you with your coffee. Most days, one of them is
              exactly what you needed.
            </p>
          </div>
          <ul className={styles.fan}>
            {MORNING.map((note) => (
              <li key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
                <span>{note.when}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.yours}>
          <h2>Written by you. Owned by you.</h2>
          <div className={styles.yoursBody}>
            <p>
              A notebook only works if you trust it for decades. So every note in
              Engram is a plain text file on your own device, readable by any app,
              with or without us.
            </p>
            <p>
              Sync between your devices is end-to-end encrypted, which means nobody
              at Engram can read a word. Your notes are never used to train anything.
              If you leave, your whole notebook leaves with you.
            </p>
          </div>
        </section>

        <section id="begin" className={styles.begin}>
          <h2>Begin the notebook you will still open in ten years.</h2>
          <p>
            Free on one device. Encrypted sync across phone, tablet and computer is
            $8 a month.
          </p>
          <a href="#top" className={styles.button}>
            Download Engram
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footBrand}>Engram</span>
        <nav aria-label="Footer">
          <a href="#keep">Keep</a>
          <a href="#connect">Connect</a>
          <a href="#return">Return</a>
          <a href="#top">Privacy</a>
        </nav>
        <span>© 2026 Engram Labs</span>
      </footer>
    </div>
  );
}
