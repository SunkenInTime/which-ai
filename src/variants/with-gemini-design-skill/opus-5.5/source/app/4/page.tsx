import s from "./page.module.css";
import Header from "./Header";
import Hero from "./Hero";
import Stage from "./Stage";
import Resurface from "./Resurface";
import Pricing from "./Pricing";

export default function DaylightPage() {
  return (
    <div className={s.page}>
      <Header />
      <main>
        <Hero />
        <Stage />

        <section className={s.privacy} id="privacy" aria-labelledby="privacy-title">
          <div className={`${s.container} ${s.privacyGrid}`}>
            <div>
              <h2 id="privacy-title" className={s.h2}>Your notes stay yours</h2>
              <p className={s.body}>
                Kept is built so you never have to wonder who else can read your thinking, or what happens to it in
                ten years.
              </p>
              <ul className={s.promises}>
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                  <div>
                    <h3 className={s.h3}>End-to-end encrypted</h3>
                    <p className={s.body}>Notes are locked on your device before they sync. We cannot read them, and neither can anyone else.</p>
                  </div>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5a12 12 0 0116 0M7 13a7.5 7.5 0 0110 0M10 16.4a3 3 0 014 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                  <div>
                    <h3 className={s.h3}>Works offline</h3>
                    <p className={s.body}>Write on a plane or a mountain. Everything syncs across Mac, Windows, iPhone, Android, and the web once you are back.</p>
                  </div>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l4.5 4.5v12.5H7z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M14 3.5V8h4.5M12.5 11.5v6M10 15l2.5 2.5L15 15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <div>
                    <h3 className={s.h3}>Plain markdown, always</h3>
                    <p className={s.body}>Export everything as ordinary files any editor can open. No lock-in, no special format.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={s.fileStage} aria-hidden="true">
              <div className={s.fileSun} />
              <div className={s.file}>
                <div className={s.fileBar}>
                  <svg viewBox="0 0 20 20"><path d="M2.5 5.5a2 2 0 012-2h3.2l1.8 2h6a2 2 0 012 2v7a2 2 0 01-2 2h-11a2 2 0 01-2-2z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  <span>Kept / Projects / lisbon-offsite.md</span>
                </div>
                <pre className={s.md}>
{`# Lisbon offsite

Book the [[riverside venue]] before Friday.
[[Maya]] liked the warm-up from the
[[March retro]], so we open with that.

- [x] Shortlist venues
- [ ] Confirm headcount
- [ ] Draft agenda with Maya`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <Resurface />

        <section className={s.voices} aria-labelledby="voices-title">
          <div className={s.container}>
            <h2 id="voices-title" className={s.srOnly}>What people say about Kept</h2>
            <div className={s.voicesGrid}>
              <figure className={s.quoteBig}>
                <blockquote>
                  “I used to lose half my ideas between the shower and my desk. Now I ask Kept what I was thinking
                  last spring and it tells me, with receipts.”
                </blockquote>
                <figcaption className={s.who}>
                  <span className={s.avatar} style={{ background: "linear-gradient(135deg,#bfe3ff,#2563eb)" }}>AO</span>
                  <span><strong>Adaeze Okafor</strong><br />Product designer, Lagos</span>
                </figcaption>
              </figure>
              <figure className={s.quoteSmall}>
                <blockquote className={s.body}>
                  “The automatic links are the part I did not know I needed. I write a meeting note and it quietly
                  connects it to the research from three months ago.”
                </blockquote>
                <figcaption className={s.who}>
                  <span className={s.avatar} style={{ background: "linear-gradient(135deg,#dcd3ff,#7c3aed)" }}>JL</span>
                  <span><strong>Jonas Lindqvist</strong><br />PhD student, Uppsala</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <Pricing />

        <section className={s.final} aria-labelledby="final-title">
          <div className={s.finalSky} aria-hidden="true" />
          <div className={s.finalInner}>
            <h2 id="final-title" className={s.finalTitle}>Give your ideas somewhere to live</h2>
            <p className={s.body}>Free for personal notes. No card needed.</p>
            <a href="#signup" className={s.btnPrimary}>Start free</a>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.container} ${s.footerGrid}`}>
          <div>
            <a href="#top" className={s.brand}>Kept</a>
            <p className={s.footMuted}>A second brain that remembers for you.</p>
          </div>
          <nav aria-label="Product" className={s.footCol}>
            <p className={s.footHead}>Product</p>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#download">Download</a>
          </nav>
          <nav aria-label="Company" className={s.footCol}>
            <p className={s.footHead}>Company</p>
            <a href="#about">About</a>
            <a href="#privacy">Privacy</a>
            <a href="#security">Security</a>
          </nav>
          <nav aria-label="Help" className={s.footCol}>
            <p className={s.footHead}>Help</p>
            <a href="#guides">Guides</a>
            <a href="#import">Import from other apps</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className={`${s.container} ${s.footBottom}`}>
          <p className={s.footMuted}>© 2026 Kept Labs</p>
        </div>
      </footer>
    </div>
  );
}
