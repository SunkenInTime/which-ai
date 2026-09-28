import { Vault } from "./vault";
import { Wikilink } from "./wikilink";
import s from "./page.module.css";

function Mark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className={s.mark}>
      <rect x="3" y="3" width="13" height="13" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="8" y="8" width="13" height="13" rx="3.5" fill="var(--paper)" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

const today = (
  <Wikilink
    title="Today"
    footer="Starts fresh every morning"
    peek={
      <>
        <span className={s.peekLine}>Tuesday 29 September</span>
        <span className={s.peekLine}>Call plumber about the bathroom fan</span>
        <span className={s.peekLine}>Clipped: The rebuilt memory</span>
        <span className={s.peekLine}>Ask Priya to resend the Marlowe quote</span>
      </>
    }
  >
    Today
  </Wikilink>
);

function Priya({ children = "Priya" }: { children?: React.ReactNode }) {
  return (
    <Wikilink
      title="Priya"
      footer="Mentioned in 12 notes"
      peek={
        <>
          <span className={s.peekLine}>Priya Raman, design lead. Tom introduced us in March.</span>
          <span className={s.peekLine}>Prefers a written brief before any call.</span>
        </>
      }
    >
      {children}
    </Wikilink>
  );
}

function Kitchen({ children = "Kitchen quote" }: { children?: React.ReactNode }) {
  return (
    <Wikilink
      title="Kitchen quote"
      footer="Linked from 5 notes"
      peek={
        <>
          <span className={s.peekLine}>Marlowe &amp; Sons. Oak worktop sealed with hard-wax oil.</span>
          <span className={s.peekLine}>$3,840 supplied and fitted. Chose matte over gloss on 14 March 2023.</span>
        </>
      }
    >
      {children}
    </Wikilink>
  );
}

function Sourdough({ children = "Sourdough, week 3" }: { children?: React.ReactNode }) {
  return (
    <Wikilink
      title="Sourdough, week 3"
      footer="Written two years ago"
      peek={
        <>
          <span className={s.peekLine}>Hydration up to 78%. The crumb came out tighter than last week.</span>
          <span className={s.peekLine}>Next time: a longer first rise, and less flour on the bench.</span>
        </>
      }
    >
      {children}
    </Wikilink>
  );
}

export default function Page() {
  return (
    <div className={s.app}>
      <aside className={s.rail}>
        <a href="#top" className={s.brand}>
          <Mark />
          Engram
        </a>
        <Vault />
        <div className={s.railFoot}>
          <a className={s.buttonSolid} href="#try">
            Download for Mac
          </a>
        </div>
      </aside>

      <div className={s.workspace}>
        <header className={s.topbar}>
          <a href="#top" className={s.brandSmall}>
            <Mark />
            Engram
          </a>
          <p className={s.crumb}>
            Engram <span aria-hidden>/</span> <b>Welcome</b>
          </p>
          <div className={s.topActions}>
            <a className={s.textLink} href="#try">
              Open in browser
            </a>
            <a className={s.buttonSolid} href="#try">
              Download
            </a>
          </div>
        </header>

        <div className={s.sheet}>
          <article className={s.note} id="top">
            <h1 className={s.title}>A second brain that remembers for you</h1>

            <dl className={s.props}>
              <div>
                <dt>Status</dt>
                <dd>Public beta</dd>
              </div>
              <div>
                <dt>Runs on</dt>
                <dd>Mac, Windows, iPhone, Android and the browser</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>Free on one device. Plus is $8 a month.</dd>
              </div>
              <div>
                <dt>Your notes</dt>
                <dd>Plain Markdown files on your device</dd>
              </div>
            </dl>

            <p className={s.lead}>
              Most of what you read, think and decide is gone within a week.
              Engram is a notebook that catches it first, then puts it back in
              front of you when it matters.
            </p>

            <p>
              Try it on this page. Every underlined name is a link to another
              note: hover or tap one, like {today} or <Priya />, and the note
              opens in place.
            </p>

            <h2 id="write" className={s.h2}>
              Write it down once
            </h2>
            <p>
              Open Engram and start typing. Whatever you write lands in{" "}
              {today}, a page that starts fresh each morning, so there&rsquo;s
              nothing to name and nowhere to file it.
            </p>
            <ul>
              <li>Type or paste anything.</li>
              <li>Clip a web page with the browser extension.</li>
              <li>Forward an email to your Engram address.</li>
              <li>Record a voice memo. It&rsquo;s transcribed on your device.</li>
            </ul>

            <h2 id="links" className={s.h2}>
              Notes find each other
            </h2>
            <p>
              When a note mentions a person, a project or a book, put double
              brackets around the name, like <code className={s.inline}>[[Priya]]</code>.
              That&rsquo;s the whole filing system. The page you linked to
              lists every note that points back at it, so <Priya />&rsquo;s page
              collects each meeting, idea and email she appears in.
            </p>

            <figure className={s.backlinks}>
              <figcaption>Linked mentions of Priya</figcaption>
              <ul>
                <li>
                  <span className={s.src}>Site visit, 12 Sept</span>
                  <p>
                    <mark>Priya</mark> thinks the island should move 30 cm toward the window.
                  </p>
                </li>
                <li>
                  <span className={s.src}>Intro call, March</span>
                  <p>
                    Tom put me in touch with <mark>Priya</mark>. She wants a written brief first.
                  </p>
                </li>
                <li>
                  <span className={s.src}>Unlinked mention, Groceries</span>
                  <p>
                    Ask <mark>Priya</mark> which oil she used on her worktop.{" "}
                    <button type="button" className={s.linkNow}>
                      Link it
                    </button>
                  </p>
                </li>
              </ul>
            </figure>
            <p>
              Names you forgot to bracket show up as unlinked mentions, and one
              click links them.
            </p>

            <h2 id="ask" className={s.h2}>
              Ask, and get the sources with the answer
            </h2>
            <p>
              Type a question in plain language. Engram answers from your notes
              only, and each sentence links to the note it came from. If your
              notes don&rsquo;t say, Engram tells you that instead of guessing.
            </p>

            <aside className={s.callout} aria-label="Example question">
              <p className={s.q}>
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
                  <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M6.2 6.3a1.9 1.9 0 1 1 2.6 1.8c-.5.3-.8.6-.8 1.2M8 11.4v.1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                What did we decide about the kitchen worktop?
              </p>
              <p>
                Oak, sealed with hard-wax oil. Marlowe &amp; Sons quoted $3,840
                supplied and fitted.<sup><Kitchen>1</Kitchen></sup> You chose
                the matte finish over gloss after the site visit.
                <sup>
                  <Priya>2</Priya>
                </sup>
              </p>
            </aside>

            <h2 id="back" className={s.h2}>
              Old notes come back
            </h2>
            <p>
              Each morning Engram picks a few older notes related to what
              you&rsquo;re working on now and pins them to the top of{" "}
              {today}. It chooses for relevance, not age. On Monday a
              two-year-old note about dough hydration, <Sourdough />, turned up
              beside a new recipe from a friend. You hadn&rsquo;t searched for it, and
              you&rsquo;d forgotten you wrote it.
            </p>

            <h2 id="files" className={s.h2}>
              A folder of text files
            </h2>
            <p>
              Your notes are plain Markdown files in a folder on your device.
              Open them in any editor and back them up however you like. If
              Engram ever stopped existing, you&rsquo;d lose nothing. Sync
              between devices is optional and end-to-end encrypted.
            </p>
            <pre className={s.code} aria-label="Example folder">
{`Notes/
  Today/2026-09-29.md
  Kitchen quote.md
  Priya.md
  Sourdough, week 3.md`}
            </pre>

            <h2 id="try" className={s.h2}>
              Start with one note
            </h2>
            <p>
              Engram is free on one device, with no limit on notes. Plus is $8
              a month, or $72 a year, and adds sync, Ask and the web clipper.
            </p>
            <p className={s.actions}>
              <a className={s.buttonSolidLg} href="#top">
                Download for Mac
              </a>
              <a className={s.buttonQuietLg} href="#top">
                Open in browser
              </a>
            </p>
          </article>

          <aside className={s.mentions} aria-label="Linked mentions">
            <h2>Linked mentions</h2>
            <ul>
              <li>
                <a href="#try">
                  <span className={s.src}>Pricing</span>
                  <p>
                    Free on one device. <mark>Plus</mark> is $8 a month.
                  </p>
                </a>
              </li>
              <li>
                <a href="#files">
                  <span className={s.src}>Privacy</span>
                  <p>
                    Notes stay on your device unless you turn on <mark>sync</mark>.
                  </p>
                </a>
              </li>
              <li>
                <a href="#ask">
                  <span className={s.src}>Changelog</span>
                  <p>
                    <mark>Ask</mark> now links to the exact paragraph it used.
                  </p>
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <footer className={s.foot}>
          <p>Engram is in public beta. Made for people with too many tabs open.</p>
        </footer>
      </div>
    </div>
  );
}
