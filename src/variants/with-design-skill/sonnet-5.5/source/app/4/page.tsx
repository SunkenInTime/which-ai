import { Capture } from "./capture";
import s from "./page.module.css";

export default function Page() {
  return (
    <main>
      <section className={s.hero}>
        <div className={s.wrap}>
          <header className={s.top}>
            <a href="#top" className={s.brand}>
              Engram
            </a>
            <nav aria-label="Primary" className={s.nav}>
              <a href="#back">How it works</a>
              <a href="#plans">Pricing</a>
              <a className={s.btnWhite} href="#plans">
                Download
              </a>
            </nav>
          </header>

          <div className={s.heroGrid} id="top">
            <h1 className={s.h1}>Highlight it once. Find it forever.</h1>
            <Capture />
          </div>
        </div>
      </section>

      <section id="back" className={s.paper}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Old highlights come back on their own</h2>
          <p className={s.lede}>
            Each morning Engram picks a few older notes related to what
            you&rsquo;re working on now and pins them to the top of Today. It
            chooses for relevance, not age, and says why.
          </p>
          <ul className={s.rows}>
            <li>
              <span className={s.rowTitle}>Sourdough, week 3</span>
              <span className={s.rowWhy}>You&rsquo;re writing about baking today.</span>
              <span className={s.rowAge}>2 years ago</span>
            </li>
            <li>
              <span className={s.rowTitle}>Lisbon: restaurants to try</span>
              <span className={s.rowWhy}>You booked flights to Lisbon.</span>
              <span className={s.rowAge}>11 months ago</span>
            </li>
            <li>
              <span className={s.rowTitle}>Talk outline: memory and habit</span>
              <span className={s.rowWhy}>Related to the clip you saved this morning.</span>
              <span className={s.rowAge}>Last spring</span>
            </li>
          </ul>
        </div>
      </section>

      <section className={s.blue}>
        <div className={s.wrap}>
          <div className={s.askGrid}>
            <div>
              <h2 className={s.h2}>Ask, and the highlights show their sources</h2>
              <p className={s.lede}>
                Engram answers from your notes only. The passages it used are
                marked, so you can check every claim against what you wrote.
              </p>
            </div>
            <div className={s.qa}>
              <p className={s.q}>What did I decide about the kitchen counters?</p>
              <p className={s.a}>
                <mark>Oak, sealed with hard-wax oil.</mark> Marlowe &amp; Sons
                quoted <mark>$3,840 supplied and fitted</mark>, and{" "}
                <mark>you chose matte over gloss</mark> after the site visit.
              </p>
              <p className={s.from}>
                From <u>Kitchen quote, Marlowe &amp; Sons</u> (3 years ago) and{" "}
                <u>Site visit with Priya</u> (last month)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className={s.paper}>
        <div className={s.wrap}>
          <div className={s.filesGrid}>
            <div>
              <h2 className={s.h2}>Your notes are plain files</h2>
              <p className={s.lede}>
                Every note is a Markdown file in a folder on your device. Open
                them in any editor, back them up by copying the folder. Sync
                between devices is optional and end-to-end encrypted.
              </p>
            </div>
            <dl className={s.plans}>
              <div>
                <dt>Free</dt>
                <dd className={s.price}>$0</dd>
                <dd>One device, unlimited notes. Everything stays on your device.</dd>
              </div>
              <div>
                <dt>Plus</dt>
                <dd className={s.price}>$8 a month</dd>
                <dd>Sync across devices, Ask and the web clipper. $72 if you pay for a year.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className={s.yellow}>
        <div className={s.wrap}>
          <h2 className={s.closing}>Start with one highlight.</h2>
          <p className={s.actions}>
            <a className={s.btnBlue} href="#top">
              Download for Mac
            </a>
            <a className={s.btnLine} href="#top">
              Open in browser
            </a>
          </p>
          <p className={s.fine}>
            In public beta for Mac, Windows, iPhone, Android and the browser.
          </p>
        </div>
      </section>
    </main>
  );
}
