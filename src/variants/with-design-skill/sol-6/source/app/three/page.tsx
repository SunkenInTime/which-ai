import { ArrowIcon, Brand } from "../components";

export default function Three() {
  return (
    <main id="top" className="v3 page-shell">
      <header className="site-header v3-header"><Brand /><nav aria-label="Page navigation"><a href="#archive">The archive</a><a href="#practice">The practice</a></nav><a className="v3-header-link" href="#archive">Open the archive <ArrowIcon diagonal /></a></header>
      <section className="v3-hero" aria-labelledby="v3-title">
        <div className="v3-hero-copy"><span className="v3-small-type">For the curious mind</span><h1 id="v3-title">A place to keep<br />what stays with you.</h1><p>Not everything you notice needs a purpose today. Keep it close anyway. Commonplace gives every thought a home—and helps you return to it when the time is right.</p><a className="v3-primary" href="#archive">Step inside <ArrowIcon /></a></div>
        <div id="archive" className="v3-archive" aria-label="Preview of a personal archive">
          <div className="v3-archive-back"><span>COMMONPLACE</span><span>Thoughts worth keeping</span></div>
          <div className="v3-archive-sheet"><div className="v3-sheet-heading"><span>My archive</span><span>48 notes</span></div><h2>Small things,<br />remembered well.</h2><p>“The more you pay attention, the more there is to see.”</p><div className="v3-sheet-rule" /><div className="v3-sheet-row"><span className="v3-dot amber" />Why the café felt like home <time>Sep 19</time></div><div className="v3-sheet-row"><span className="v3-dot pink" />A sentence from the train <time>Sep 14</time></div><div className="v3-sheet-row"><span className="v3-dot green" />Maya&apos;s idea about belonging <time>Sep 08</time></div><div className="v3-sheet-footer">A growing collection of things that matter.</div></div>
          <div className="v3-tab">A little bit of everything.</div>
        </div>
      </section>
      <section id="practice" className="v3-practice"><span className="v3-practice-icon" aria-hidden="true">✳</span><p>Make a note today. Meet it again when it means something new.</p><a href="#archive">Take a closer look <ArrowIcon /></a></section>
      
    </main>
  );
}
