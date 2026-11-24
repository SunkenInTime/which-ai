import s from "./page.module.css";
import Header from "./Header";
import Workbench from "./Workbench";
import AskDemo from "./AskDemo";
import IdeaGraph from "./IdeaGraph";
import Pricing from "./Pricing";

function LinkToken() {
  return (
    <span className={s.token} aria-hidden="true">
      <svg viewBox="0 0 170 80" className={s.tokenSvg}>
        <g className={s.tokenNoteA}>
          <rect x="14" y="16" width="46" height="48" rx="7" />
          <path d="M24 31h26M24 40h20M24 49h24" />
        </g>
        <path className={s.tokenLink} d="M60 40 C 78 18, 92 62, 110 40" />
        <circle className={s.tokenPulse} cx="110" cy="40" r="5" />
        <g className={s.tokenNoteB}>
          <rect x="110" y="16" width="46" height="48" rx="7" />
          <path d="M120 31h26M120 40h18M120 49h22" />
        </g>
      </svg>
    </span>
  );
}

const CAPTURE = [
  {
    name: "Typed notes",
    text: "Markdown that stays out of your way, with headings, tasks and tables when you want them.",
    icon: <path d="M5 6h14M5 11h14M5 16h9" />,
  },
  {
    name: "Web clips",
    text: "Save an article from any browser. Kept keeps the text, the source and your highlights.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2.5 2.4 2.5 13.6 0 16M12 4c-2.5 2.4-2.5 13.6 0 16" />
      </>
    ),
  },
  {
    name: "PDFs and papers",
    text: "Drop in a PDF and every page becomes searchable, quotable and linkable.",
    icon: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4M10 13h5M10 17h5" />
      </>
    ),
  },
  {
    name: "Voice memos",
    text: "Talk on the walk home. Kept transcribes it and files it next to related notes.",
    icon: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
      </>
    ),
  },
  {
    name: "Quick capture",
    text: "Press Option and Space anywhere on your computer to jot a thought without leaving what you are doing.",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="11" rx="2" />
        <path d="M7 14h10" />
      </>
    ),
  },
];

const HEADLINE = ["Notes", "that", "TOKEN", "connect", "themselves."];

export default function GalleryPage() {
  return (
    <div className={s.page} id="top">
      <Header />

      <main>
        <section className={s.hero}>
          <h1 className={s.h1}>
            {HEADLINE.map((w, i) => (
              <span key={w} className={s.word} style={{ animationDelay: `${i * 70}ms` }}>
                {w === "TOKEN" ? <LinkToken /> : w}
              </span>
            ))}
          </h1>
          <p className={s.heroLine}>
            Kept links every note, clip and voice memo to what you already know, so the right idea shows up
            when you need it.
          </p>
          <a href="#start" className={s.button}>
            Start free
          </a>
          <div className={s.benchStage}>
            <Workbench />
          </div>
        </section>

        <section id="capture" className={s.section}>
          <div className={s.split}>
            <div className={s.splitLead}>
              <h2 className={s.h2}>Catch the thought before it is gone</h2>
              <p className={s.body}>
                Ideas arrive in the shower, on the train and halfway through a meeting. Kept takes them in any
                form and files them for you, so capturing never turns into organising.
              </p>
            </div>
            <ul className={s.captureList}>
              {CAPTURE.map((c) => (
                <li key={c.name}>
                  <svg viewBox="0 0 24 24" className={s.icon} aria-hidden="true">
                    {c.icon}
                  </svg>
                  <div>
                    <h3 className={s.h3}>{c.name}</h3>
                    <p className={s.body}>{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="links" className={s.section}>
          <div className={s.graphSection}>
            <div className={s.graphText}>
              <h2 className={s.h2}>Links you never had to make</h2>
              <p className={s.body}>
                Kept reads what you write and connects it to related notes, people and sources. Every note
                shows its backlinks, and the map shows how your thinking fits together.
              </p>
              <p className={s.body}>Point at any idea on the map to see what it touches.</p>
            </div>
            <IdeaGraph />
          </div>
        </section>

        <section id="ask" className={s.section}>
          <div className={s.askGrid}>
            <div className={s.askText}>
              <h2 className={s.h2}>Ask your notes anything</h2>
              <p className={s.body}>
                Ask a question in plain words and get an answer written from your own notes, with every claim
                cited so you can jump straight to the source.
              </p>
            </div>
            <AskDemo />
          </div>
        </section>

        <section id="resurface" className={s.section}>
          <div className={s.resurface}>
            <div className={s.daily}>
              <div className={s.dailyHead}>
                <span className={s.dailyDate}>Tuesday, November 24</span>
                <span className={s.muted}>Daily note</span>
              </div>
              <ul className={s.dailyTasks}>
                <li>
                  <label>
                    <input type="checkbox" defaultChecked /> Send offsite summary to Priya
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" /> Draft the onboarding email
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" /> Finish chapter six of Four Thousand Weeks
                  </label>
                </li>
              </ul>
              <div className={s.dailyResurface}>
                <p className={s.dailyResTitle}>Back from your notes today</p>
                <ul>
                  <li>
                    <span className={s.muted}>One year ago today</span>
                    <span>&ldquo;Ship the smallest thing that proves the idea, then listen.&rdquo;</span>
                  </li>
                  <li>
                    <span className={s.muted}>Linked four times this month</span>
                    <span>Why walking helps us think</span>
                  </li>
                  <li>
                    <span className={s.muted}>Not opened in six weeks</span>
                    <span>Pricing interviews, round two</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={s.resurfaceText}>
              <h2 className={s.h2}>Old ideas come back at the right moment</h2>
              <p className={s.body}>
                Each day starts with a fresh daily note. Kept brings back what you wrote a year ago, notes you
                keep linking to and ideas you have not seen in a while, spaced so they stick.
              </p>
            </div>
          </div>
        </section>

        <section id="private" className={s.section}>
          <h2 className={`${s.h2} ${s.privateTitle}`}>Private by default and yours to keep</h2>
          <div className={s.trio}>
            <div>
              <h3 className={s.h3}>Works offline</h3>
              <p className={s.body}>
                Your notes live on your device first. Write on a plane, in a tunnel or anywhere with bad signal.
              </p>
            </div>
            <div>
              <h3 className={s.h3}>End to end encrypted</h3>
              <p className={s.body}>
                Notes are encrypted before they leave your device. Not even Kept can read them.
              </p>
            </div>
            <div>
              <h3 className={s.h3}>Plain markdown out</h3>
              <p className={s.body}>
                Export everything as ordinary markdown files whenever you like. No lock in, ever.
              </p>
            </div>
          </div>
          <p className={`${s.body} ${s.platforms}`}>
            Syncs across Mac, Windows, iPhone, iPad, Android and the web.
          </p>
        </section>

        <section className={s.section} aria-label="What people say">
          <div className={s.quotes}>
            <figure className={s.quoteMain}>
              <blockquote>
                &ldquo;I stopped losing ideas. Kept found a note from 2023 that turned into our best launch.&rdquo;
              </blockquote>
              <figcaption>
                <strong>Maya Okafor</strong>
                <span className={s.muted}>Head of product, Fieldnote</span>
              </figcaption>
            </figure>
            <figure className={s.quoteSide}>
              <blockquote className={s.body}>
                &ldquo;My thesis research is four years of PDFs and voice memos. Asking my notes saves me an
                afternoon every week.&rdquo;
              </blockquote>
              <figcaption>
                <strong>Tomás Reyes</strong>
                <span className={s.muted}>PhD candidate, marine biology</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="pricing" className={s.section}>
          <Pricing />
        </section>

        <section id="start" className={s.finale}>
          <h2 className={s.h2}>Give every idea a place to land</h2>
          <p className={s.body}>Free on every device. Set up in under a minute.</p>
          <a href="#top" className={s.buttonInverse}>
            Start free
          </a>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerTop}>
          <span className={s.footerMark}>Kept</span>
          <nav className={s.footerCols} aria-label="Footer">
            <div>
              <h3 className={s.h3}>Product</h3>
              <a href="#capture">Capture</a>
              <a href="#links">Links and graph</a>
              <a href="#ask">Ask your notes</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div>
              <h3 className={s.h3}>Company</h3>
              <a href="#top">About</a>
              <a href="#top">Careers</a>
              <a href="#top">Journal</a>
            </div>
            <div>
              <h3 className={s.h3}>Trust</h3>
              <a href="#private">Security</a>
              <a href="#private">Privacy</a>
              <a href="#private">Export your data</a>
            </div>
          </nav>
        </div>
        <p className={s.footerBase}>
          <span>&copy; 2026 Kept Labs</span>
          <span>Made for people who think on paper</span>
        </p>
      </footer>
    </div>
  );
}
