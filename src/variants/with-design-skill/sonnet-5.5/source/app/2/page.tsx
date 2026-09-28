import { Dig } from "./dig";
import { Ruler } from "./ruler";
import { beddingLine, edgeFill } from "./strata";
import s from "./page.module.css";

const tones = {
  bone: "#e7eae4",
  sage: "#cbd3cc",
  fog: "#a9b8c4",
  slate: "#4f6484",
  bedrock: "#232d4a",
} as const;

type Tone = keyof typeof tones;

const edges = [
  { seed: 11, amp: 16, tilt: 26 },
  { seed: 27, amp: 20, tilt: -30 },
  { seed: 41, amp: 14, tilt: 34 },
  { seed: 58, amp: 22, tilt: -22 },
];

function Band({
  id,
  tone,
  next,
  edge,
  children,
}: {
  id: string;
  tone: Tone;
  next?: Tone;
  edge?: number;
  children: React.ReactNode;
}) {
  const e = edge !== undefined ? edges[edge] : undefined;
  return (
    <section
      id={id}
      className={s.band}
      data-tone={tone}
      style={{ background: tones[tone] }}
    >
      <svg
        className={s.bedding}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={beddingLine(edge !== undefined ? 90 + edge : 3, 22, 4, 10)} />
        <path d={beddingLine(edge !== undefined ? 120 + edge : 4, 58, 5, -14)} />
        <path d={beddingLine(edge !== undefined ? 150 + edge : 5, 84, 4, 8)} />
      </svg>
      <div className={s.inner}>{children}</div>
      {e && next && (
        <svg
          className={s.edge}
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={edgeFill(e.seed, 90, e.amp, e.tilt)} fill={tones[next]} />
        </svg>
      )}
    </section>
  );
}

export default function Page() {
  return (
    <main className={s.page}>
      <Ruler />

      <Band id="surface" tone="bone" next="sage" edge={0}>
        <header className={s.top}>
          <a href="#surface" className={s.brand}>
            Engram
          </a>
          <nav className={s.topNav} aria-label="Primary">
            <a href="#today">How it works</a>
            <a href="#bedrock">Pricing</a>
            <a className={s.btnSmall} href="#bedrock">
              Download
            </a>
          </nav>
        </header>

        <div className={s.hero}>
          <div className={s.heroTitle}>
            <h1>
              <span>Notes sink.</span> <span>Engram digs</span>{" "}
              <span>them up.</span>
            </h1>
            <p className={s.lead}>
              You write things down and forget you did. Engram keeps every note,
              links it to the others and brings it back when you need it.
            </p>
          </div>
          <Dig />
        </div>
      </Band>

      <Band id="today" tone="sage" next="fog" edge={1}>
        <div className={s.split}>
          <div className={s.copy}>
            <h2>Everything goes in at the top</h2>
            <p>
              Type it, paste it, clip it, forward it or say it out loud. Every
              note lands in one place, stamped with the time and where it came
              from. There&rsquo;s nothing to file and nothing to name.
            </p>
          </div>
          <dl className={s.sources}>
            <div>
              <dt>Typed</dt>
              <dd>Call plumber about the fan</dd>
            </div>
            <div>
              <dt>Clipped</dt>
              <dd>The rebuilt memory, from a long read</dd>
            </div>
            <div>
              <dt>Forwarded</dt>
              <dd>Flight to Lisbon, 14 October</dd>
            </div>
            <div>
              <dt>Spoken</dt>
              <dd>Walk thoughts, 0:42, transcribed on your device</dd>
            </div>
          </dl>
        </div>
      </Band>

      <Band id="month" tone="fog" next="slate" edge={2}>
        <div className={s.split}>
          <div className={s.copy}>
            <h2>One name, every layer</h2>
            <p>
              Write a name in double brackets and the note joins everything else
              you&rsquo;ve written about it. Priya&rsquo;s page gathers a site
              visit from last month, an intro call from two years ago and a
              grocery note where you forgot the brackets.
            </p>
          </div>
          <ol className={s.vein} aria-label="Every note that mentions Priya">
            <li>
              <span className={s.age}>Yesterday</span>
              <span className={s.noteTitle}>Groceries</span>
              <p>
                Ask <mark>Priya</mark> which oil she used on her worktop.
              </p>
              <button type="button" className={s.linkIt}>
                Link it
              </button>
            </li>
            <li>
              <span className={s.age}>Last month</span>
              <span className={s.noteTitle}>Site visit</span>
              <p>
                <mark>Priya</mark> thinks the island should move 30 cm toward the
                window.
              </p>
            </li>
            <li>
              <span className={s.age}>2 years ago</span>
              <span className={s.noteTitle}>Intro call</span>
              <p>
                Tom put me in touch with <mark>Priya</mark>. She wants a written
                brief first.
              </p>
            </li>
          </ol>
        </div>
      </Band>

      <Band id="year" tone="slate" next="bedrock" edge={3}>
        <div className={s.split}>
          <div className={s.copy}>
            <h2>Old notes rise on their own</h2>
            <p>
              Each morning Engram picks a few older notes related to what
              you&rsquo;re working on now and pins them to the top of Today. It
              picks for relevance, not age.
            </p>
            <p className={s.askIntro}>
              Or ask a question. Engram answers from your notes only, with each
              sentence linked to its source.
            </p>
          </div>
          <div>
            <ul className={s.rising} aria-label="Notes that surfaced this morning">
              <li>
                <span className={s.noteTitle}>Sourdough, week 3</span>
                <span className={s.age}>2 years ago</span>
                <p>You&rsquo;re writing about baking today.</p>
              </li>
              <li>
                <span className={s.noteTitle}>Lisbon: restaurants to try</span>
                <span className={s.age}>11 months ago</span>
                <p>You booked flights to Lisbon.</p>
              </li>
              <li>
                <span className={s.noteTitle}>Talk outline: memory and habit</span>
                <span className={s.age}>Last spring</span>
                <p>Related to the clip you saved this morning.</p>
              </li>
            </ul>
            <figure className={s.answer}>
              <figcaption>What did I decide about the kitchen counters?</figcaption>
              <p>
                Oak, sealed with hard-wax oil. Marlowe &amp; Sons quoted $3,840
                supplied and fitted, and you chose matte over gloss.
              </p>
              <p className={s.sourcesRow}>
                <a href="#year">Kitchen quote, 3 years ago</a>
                <a href="#year">Priya: site visit, last month</a>
              </p>
            </figure>
          </div>
        </div>
      </Band>

      <Band id="bedrock" tone="bedrock">
        <div className={s.split}>
          <div className={s.copy}>
            <h2>Bedrock is plain text</h2>
            <p>
              Your notes are Markdown files in a folder on your device. Open
              them in any editor, back them up however you like and keep them
              for decades. Sync between devices is optional and end-to-end
              encrypted.
            </p>
          </div>
          <table className={s.files}>
            <caption className={s.srOnly}>Files in your Notes folder</caption>
            <tbody>
              <tr>
                <th scope="row">Kitchen quote, Marlowe &amp; Sons.md</th>
                <td>14 Mar 2023</td>
              </tr>
              <tr>
                <th scope="row">Sourdough, week 3.md</th>
                <td>2 Sep 2024</td>
              </tr>
              <tr>
                <th scope="row">Priya.md</th>
                <td>12 Sep 2026</td>
              </tr>
              <tr>
                <th scope="row">2026-09-29.md</th>
                <td>Today</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={s.pricing}>
          <div>
            <h3>Free</h3>
            <p className={s.price}>$0</p>
            <p>One device, unlimited notes. Everything stays on your device.</p>
          </div>
          <div>
            <h3>Plus</h3>
            <p className={s.price}>
              $8 <span>a month, or $72 a year</span>
            </p>
            <p>Sync across devices, Ask and the web clipper.</p>
          </div>
        </div>

        <div className={s.closing}>
          <h2>Write your first note today</h2>
          <div className={s.actions}>
            <a className={s.btnGold} href="#surface">
              Download for Mac
            </a>
            <a className={s.btnGhost} href="#surface">
              Open in browser
            </a>
          </div>
          <p className={s.fine}>Engram is in public beta for Mac, Windows, iPhone, Android and the browser.</p>
        </div>
      </Band>
    </main>
  );
}
