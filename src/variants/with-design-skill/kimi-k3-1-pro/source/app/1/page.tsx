import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckIcon, LocusMark, SearchIcon, SparkIcon } from "../components/Icons";
import "@/generated/scoped-variant-css/with-design-skill/kimi-k3-1-pro/source/app/1/one.css";

export default function DesignOne() {
  return (
    <main className="atlas-page" id="top">
      <header className="atlas-nav">
        <Link className="atlas-brand" href="./1" aria-label="Locus home">
          <LocusMark width={27} height={27} />
          <span>locus</span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#possibilities">Possibilities</a>
          <a href="#method">How it works</a>
          <a href="#stories">Stories</a>
        </nav>
        <a className="atlas-nav-cta" href="#start">Try Locus <ArrowUpRight /></a>
      </header>

      <section className="atlas-hero">
        <div className="atlas-hero-copy">
          <div className="atlas-kicker"><SparkIcon /> Built for the way your mind works</div>
          <h1>Nothing you think<br />gets lost.</h1>
          <p>Locus turns scattered notes into a living map of your ideas—so the thought you need finds you when it matters.</p>
          <div className="atlas-actions">
            <a className="atlas-primary" href="#start">Build your second brain <ArrowRight /></a>
            <a className="atlas-text-link" href="#method">See how it connects</a>
          </div>
          <div className="atlas-assurance"><CheckIcon /> Free for your first 1,000 notes <span>·</span> No credit card</div>
        </div>

        <div className="atlas-visual" aria-label="A connected map of notes about creativity, cities, and reading">
          <div className="atlas-orbit atlas-orbit-one" />
          <div className="atlas-orbit atlas-orbit-two" />
          <svg className="atlas-lines" viewBox="0 0 600 580" fill="none" aria-hidden="true">
            <path d="M302 290 148 166M302 290 464 143M302 290 474 371M302 290 161 429M148 166 104 339M464 143 492 269M474 371 375 489M161 429 375 489" />
          </svg>
          <div className="atlas-center-node"><LocusMark /><span>Your mind,<br />mapped</span></div>
          <div className="atlas-note atlas-note-a"><span className="atlas-note-icon">✳</span><div><strong>Creative rituals</strong><small>12 connected notes</small></div></div>
          <div className="atlas-note atlas-note-b"><span className="atlas-note-icon atlas-lilac">↗</span><div><strong>Walkable cities</strong><small>Research collection</small></div></div>
          <div className="atlas-note atlas-note-c"><span className="atlas-note-icon atlas-peach">“</span><div><strong>The creative act</strong><small>Rick Rubin · p. 84</small></div></div>
          <div className="atlas-note atlas-note-d"><span className="atlas-note-icon atlas-mint">✓</span><div><strong>Field notes</strong><small>Lisbon · Tuesday</small></div></div>
          <div className="atlas-mini atlas-mini-a" />
          <div className="atlas-mini atlas-mini-b" />
          <div className="atlas-mini atlas-mini-c" />
          <div className="atlas-search"><SearchIcon /><span>Ask your brain anything…</span><kbd>⌘ K</kbd></div>
        </div>
      </section>

      <section className="atlas-proof" id="stories">
        <p>“I stopped organizing my notes and started <em>using</em> them.”</p>
        <div><span className="atlas-avatar">MK</span><span><strong>Mara Kim</strong><small>Writer & researcher</small></span></div>
      </section>

      <section className="atlas-possibilities" id="possibilities">
        <div className="atlas-section-heading">
          <span>Less filing. More finding.</span>
          <h2>A place for every thought.<br />A path back to every one.</h2>
        </div>
        <div className="atlas-feature-list">
          <article>
            <div className="atlas-feature-number">Capture</div>
            <div><h3>Keep up with your thinking.</h3><p>Drop in a voice memo, a half-formed idea, or a page from your book. Locus makes it useful without making you organize it first.</p></div>
            <div className="atlas-capture-demo"><span>Today, 9:41</span><p>The best ideas arrive<br />mid-sentence.</p><div><span>Voice note</span><i /><i /><i /><i /><i /><i /><i /></div></div>
          </article>
          <article id="method">
            <div className="atlas-feature-number">Connect</div>
            <div><h3>See what belongs together.</h3><p>Locus finds the quiet threads between your notes, surfacing connections you didn’t know you were making.</p></div>
            <div className="atlas-connect-demo"><span>Slow living</span><i /><span>Attention</span><i /><span>Deep work</span></div>
          </article>
          <article>
            <div className="atlas-feature-number">Remember</div>
            <div><h3>Return at the right moment.</h3><p>Ask a question in your own words. Get an answer grounded in what you’ve read, written, and learned.</p></div>
            <div className="atlas-answer-demo"><SearchIcon /><p>What have I learned about<br />doing better creative work?</p><span>Answer from 8 notes <ArrowUpRight /></span></div>
          </article>
        </div>
      </section>

      <section className="atlas-final" id="start">
        <div><LocusMark /><span>Your mind has enough to hold.</span></div>
        <h2>Give your ideas<br />somewhere to grow.</h2>
        <a href="mailto:hello@locus.so?subject=I%20want%20to%20try%20Locus">Start thinking with Locus <ArrowRight /></a>
        <p>Free to begin. Yours to keep.</p>
      </section>
      <footer className="atlas-footer"><span>© 2026 Locus</span><span>Made for curious minds.</span><div><a href="#top">Back to top ↑</a><a href="mailto:hello@locus.so">Contact</a></div></footer>
    </main>
  );
}
