import { Drawer } from "./drawer";
import s from "./page.module.css";

function Mark() {
  return (
    <svg viewBox="0 0 28 22" width="28" height="22" aria-hidden className={s.mark}>
      <rect x="1" y="1" width="26" height="20" rx="2" fill="#f7f6f0" />
      <path d="M1 7h26" stroke="#d2493f" strokeWidth="1.6" />
      <path d="M4 12h20M4 16h20" stroke="#9db8df" strokeWidth="1.2" />
    </svg>
  );
}

export default function Page() {
  return (
    <main className={s.page}>
      <header className={s.top}>
        <a href="#top" className={s.brand}>
          <Mark />
          Engram
        </a>
        <nav aria-label="Primary" className={s.nav}>
          <a href="#pull">How it works</a>
          <a href="#plans">Pricing</a>
          <a className={s.tabBtn} href="#plans">
            Download
          </a>
        </nav>
      </header>

      <section id="top" className={s.hero}>
        <div className={`${s.card} ${s.headline}`}>
          <div className={s.cardHead}>
            <span>Engram</span>
            <span className={s.idRed}>0</span>
          </div>
          <div className={s.cardBody}>
            <h1>Every idea gets a card. Every card knows where it belongs.</h1>
            <p>
              Engram is a notebook built like a slip box. Write one idea per
              note, link it to the notes it belongs with, and let the links do
              the remembering.
            </p>
            <p className={s.actions}>
              <a className={s.btnInk} href="#plans">
                Download for Mac
              </a>
              <a className={s.btnLine} href="#plans">
                Open in browser
              </a>
            </p>
          </div>
        </div>

        <Drawer />
      </section>

      <section id="pull" className={s.section}>
        <div className={s.deskCopy}>
          <h2>Three old notes on top of every morning</h2>
          <p>
            Engram reads what you&rsquo;re working on today and pulls the older
            notes that belong with it. It picks for relevance, not age, and
            tells you why.
          </p>
        </div>
        <ul className={s.pulled}>
          <li className={`${s.card} ${s.pulled1}`}>
            <div className={s.cardHead}>
              <span>Sourdough, week 3</span>
              <span className={s.stamp}>2 years ago</span>
            </div>
            <div className={s.cardBody}>
              <p>
                Hydration up to 78%. Crumb tighter than last week. Next time: a
                longer first rise.
              </p>
              <p className={s.why}>Pulled because you&rsquo;re writing about baking.</p>
            </div>
          </li>
          <li className={`${s.card} ${s.pulled2}`}>
            <div className={s.cardHead}>
              <span>Lisbon: restaurants to try</span>
              <span className={s.stamp}>11 months ago</span>
            </div>
            <div className={s.cardBody}>
              <p>
                The grill place by the ferry. Ask Ana about the tiny one in
                Alfama.
              </p>
              <p className={s.why}>Pulled because you booked flights.</p>
            </div>
          </li>
          <li className={`${s.card} ${s.pulled3}`}>
            <div className={s.cardHead}>
              <span>Talk outline: memory and habit</span>
              <span className={s.stamp}>Last spring</span>
            </div>
            <div className={s.cardBody}>
              <p>Open with the forgetting curve. End on one small habit.</p>
              <p className={s.why}>Pulled because of this morning&rsquo;s clip.</p>
            </div>
          </li>
        </ul>
      </section>

      <section className={s.section}>
        <div className={s.deskCopy}>
          <h2>Ask a question and see the notes behind the answer</h2>
          <p>
            Engram answers from your notes only. Every sentence carries the ID of
            the note it came from, and if your notes don&rsquo;t say, it says so.
          </p>
        </div>
        <div className={s.qa}>
          <div className={`${s.card} ${s.question}`}>
            <div className={s.cardHead}>
              <span>Ask</span>
            </div>
            <div className={s.cardBody}>
              <p>What did I decide about the kitchen counters?</p>
            </div>
          </div>
          <div className={`${s.card} ${s.answer}`}>
            <div className={s.cardHead}>
              <span>Answer</span>
            </div>
            <div className={s.cardBody}>
              <p>
                Oak, sealed with hard-wax oil. <sup>41a</sup> Marlowe &amp; Sons
                quoted $3,840 supplied and fitted. <sup>41a</sup> You chose matte
                over gloss after the site visit. <sup>41b</sup>
              </p>
              <p className={s.cited}>
                41a Kitchen quote, Marlowe &amp; Sons
                <br />
                41b Site visit with Priya
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.deskCopy}>
          <h2>The cards stay yours</h2>
          <p>
            Every note is a Markdown file in a folder on your device. Open them
            in any editor, back them up by copying the folder, keep them for
            decades. Sync between your devices is optional and end-to-end
            encrypted.
          </p>
        </div>
        <div className={`${s.card} ${s.files}`}>
          <div className={s.cardHead}>
            <span>Notes/</span>
            <span className={s.idRed}>4 files</span>
          </div>
          <div className={s.cardBody}>
            <ul>
              <li>41a Kitchen quote, Marlowe &amp; Sons.md</li>
              <li>41b Site visit with Priya.md</li>
              <li>57 Sourdough, week 3.md</li>
              <li>2026-09-29.md</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="plans" className={`${s.section} ${s.plansSection}`}>
        <div className={s.plans}>
          <div className={`${s.card} ${s.plan}`}>
            <div className={s.cardHead}>
              <span>Free</span>
              <span className={s.idRed}>$0</span>
            </div>
            <div className={s.cardBody}>
              <p>One device, unlimited notes. Everything stays on your device.</p>
            </div>
          </div>
          <div className={`${s.card} ${s.plan}`}>
            <div className={s.cardHead}>
              <span>Plus</span>
              <span className={s.idRed}>$8 a month</span>
            </div>
            <div className={s.cardBody}>
              <p>
                Sync across devices, Ask and the web clipper. $72 if you pay for
                a year.
              </p>
            </div>
          </div>
        </div>

        <div className={s.closing}>
          <h2>Write your first note today</h2>
          <p className={s.actions}>
            <a className={s.btnCream} href="#top">
              Download for Mac
            </a>
            <a className={s.btnOutline} href="#top">
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
