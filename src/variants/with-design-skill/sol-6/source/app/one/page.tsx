import { ArrowIcon, Brand } from "../components";

export default function One() {
  return (
    <main id="top" className="v1 page-shell">
      <header className="site-header v1-header">
        <Brand />
        <nav aria-label="Page navigation"><a href="#how-it-works">How it works</a><a href="#workspace">The workspace</a></nav>
        <a className="header-cta" href="#workspace">See it in action <ArrowIcon diagonal /></a>
      </header>
      <section className="v1-hero" aria-labelledby="v1-title">
        <div className="v1-copy">
          <div className="v1-scribble" aria-hidden="true"><span>✳</span> a place to think out loud</div>
          <h1 id="v1-title">Your thoughts<br />deserve to <em>meet.</em></h1>
          <p>Capture what matters. Commonplace quietly links the people, ideas, and moments in your notes—so your next thought has somewhere to begin.</p>
          <a className="v1-primary" href="#workspace">Explore your second brain <ArrowIcon /></a>
          <div className="v1-caption"><span className="v1-caption-line" /> Less filing. More finding.</div>
        </div>
        <div id="workspace" className="v1-stage" aria-label="Preview of a connected note">
          <div className="v1-paper-shadow" />
          <div className="v1-paper">
            <div className="v1-paper-top"><span className="v1-breadcrumb">My space <span>/</span> Notes <span>/</span> Today</span><span className="v1-paper-more">•••</span></div>
            <p className="v1-date">Tuesday, September 22</p>
            <h2>The good ideas start as small ones.</h2>
            <p>On the walk home, I kept thinking about <mark>the conversation with Maya</mark>. What if the workshop felt less like a class and more like a shared notebook?</p>
            <p>Something to bring up when we plan the <span className="v1-linked">autumn gathering</span>.</p>
            <div className="v1-note-footer"><span>✦</span> Connected to 3 notes <span className="v1-footer-end">Saved just now</span></div>
          </div>
          <div className="v1-mini-note"><span className="v1-mini-symbol">↗</span><small>Connection found</small><strong>Workshop ideas</strong><p>“Make people feel like they belong before they learn.”</p></div>
          <div className="v1-handdrawn" aria-hidden="true">your ideas find each other <span>↗</span></div>
        </div>
      </section>
      <section id="how-it-works" className="v1-bottom">
        <div><span className="v1-bottom-icon">✳</span><h2>Write naturally.</h2><p>No folders to plan. Just get the thought down.</p></div>
        <div><span className="v1-bottom-icon">⌁</span><h2>See the connections.</h2><p>Related notes come to you when they matter.</p></div>
        <div><span className="v1-bottom-icon">◌</span><h2>Keep the thread.</h2><p>Follow an idea from first spark to finished work.</p></div>
      </section>
      
    </main>
  );
}
