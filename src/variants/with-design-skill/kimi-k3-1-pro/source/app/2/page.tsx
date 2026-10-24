import Link from "next/link";
import { ArrowRight, ArrowUpRight, LocusMark, PlusIcon, SearchIcon } from "../components/Icons";
import "@/generated/scoped-variant-css/with-design-skill/kimi-k3-1-pro/source/app/2/two.css";

export default function DesignTwo() {
  return (
    <main className="common-page" id="top">
      <header className="common-nav">
        <Link href="./2" className="common-brand"><LocusMark /> locus <span>Commonplace</span></Link>
        <nav aria-label="Main navigation"><a href="#inside">Look inside</a><a href="#practice">The practice</a></nav>
        <a className="common-underlined" href="#begin">Begin your book <ArrowUpRight /></a>
      </header>

      <section className="common-hero">
        <div className="common-hero-copy">
          <p className="common-edition">A digital commonplace book</p>
          <h1>For a life<br />of noticing.</h1>
          <p className="common-intro">Collect the passages that stop you. Keep the questions that won’t leave you. Let a lifetime of reading and thinking become something you can return to.</p>
          <a className="common-cta" href="#begin">Open your first page <ArrowRight /></a>
          <p className="common-small">A quiet place for loud ideas.</p>
        </div>
        <div className="common-book-scene" aria-label="An open commonplace notebook with reading notes and clippings">
          <div className="common-shadow-sheet" />
          <div className="common-book">
            <div className="common-page-left">
              <div className="common-date">24 September</div>
              <h2>On paying<br />attention</h2>
              <p>“Attention is the beginning of devotion.”</p>
              <span>Mary Oliver, Upstream</span>
              <div className="common-scribble">What am I<br />too busy to notice?</div>
              <svg viewBox="0 0 130 70" aria-hidden="true"><path d="M5 52c28-2 21-38 54-32 28 5 11 33 41 29 12-2 15-12 24-18M113 25l13 5-8 10" /></svg>
            </div>
            <div className="common-page-right">
              <div className="common-tape" />
              <div className="common-clipping">THE SLOW<br />LOOKING<br />CLUB</div>
              <p>Ideas worth keeping</p>
              <ul><li>Walk without headphones</li><li>Reread the margins</li><li>Follow the footnotes</li></ul>
              <div className="common-botanical">✣</div>
              <span className="common-page-number">42</span>
            </div>
          </div>
          <div className="common-tab common-tab-one">Reading</div>
          <div className="common-tab common-tab-two">Questions</div>
          <div className="common-pencil" />
        </div>
      </section>

      <div className="common-running-line"><span>Read</span><i>✳</i><span>Collect</span><i>✳</i><span>Connect</span><i>✳</i><span>Return</span><i>✳</i><span>Read</span><i>✳</i><span>Collect</span></div>

      <section className="common-inside" id="inside">
        <div className="common-section-title"><span>Not another filing cabinet.</span><h2>A book that becomes<br />more yours with time.</h2></div>
        <div className="common-columns">
          <article><div className="common-margin-symbol">❦</div><h3>Keep what moves you</h3><p>Save a sentence from an essay, a photograph from a walk, or the thought that arrived in the shower. Every fragment has a home.</p><a href="#begin">Make your first entry <ArrowUpRight /></a></article>
          <article><div className="common-margin-symbol">↳</div><h3>Follow your curiosity</h3><p>Links between entries reveal the subjects you keep circling back to. Your interests become a trail, not a folder tree.</p><a href="#practice">See the connections <ArrowUpRight /></a></article>
          <article><div className="common-margin-symbol">“</div><h3>Meet your past self</h3><p>A daily page brings back notes from this week, this season, and years ago. Old thoughts find new company.</p><a href="#begin">Start remembering <ArrowUpRight /></a></article>
        </div>
      </section>

      <section className="common-practice" id="practice">
        <div className="common-journal-window">
          <div className="common-window-bar"><LocusMark /><span>Today’s commonplace</span><SearchIcon /></div>
          <div className="common-journal-body">
            <aside><span>Library</span><a href="#practice" className="active">Today</a><a href="#inside">All entries</a><a href="#inside">Books & passages</a><a href="#inside">Unanswered questions</a><span>Recently opened</span><small>On paying attention</small><small>A garden in the city</small></aside>
            <article><div className="common-journal-date">Friday, 23 October</div><h3>What the garden<br />taught me</h3><p>A garden asks for a different kind of ambition. You cannot pull a plant upward to make it grow.</p><p className="common-highlight">Perhaps good work needs the same patience.</p><div className="common-source"><span>From</span> The Country Diary of an Edwardian Lady</div><div className="common-related">Related entries <span>Creative patience ↗</span><span>Notes on seasons ↗</span></div><button type="button" aria-label="Add a new journal entry"><PlusIcon /></button></article>
          </div>
        </div>
        <div className="common-practice-copy"><span>The daily practice</span><h2>Five minutes<br />is enough.</h2><p>No blank-page dread. No elaborate system to maintain. Just a gentle prompt, a place to put it, and something worth rediscovering.</p><ul><li>One thoughtful prompt each morning</li><li>Passages resurfaced when they’re useful</li><li>Your words, exportable at any time</li></ul></div>
      </section>

      <section className="common-quote"><span>From a reader’s notebook</span><blockquote>“Locus doesn’t feel like software. It feels like the margins of my favorite book—full of conversations between who I was and who I’m becoming.”</blockquote><p>— Elias, reader of 47 books this year</p></section>

      <section className="common-begin" id="begin"><LocusMark /><h2>What will you<br />want to remember?</h2><a href="mailto:hello@locus.so?subject=Open%20my%20commonplace%20book">Begin your commonplace book <ArrowRight /></a><p>Start free. Bring your old notes with you.</p></section>
      <footer className="common-footer"><Link href="./2"><LocusMark /> locus</Link><p>A place to gather what matters.</p><div><a href="#top">To the beginning ↑</a><a href="mailto:hello@locus.so">Write to us</a></div></footer>
    </main>
  );
}
