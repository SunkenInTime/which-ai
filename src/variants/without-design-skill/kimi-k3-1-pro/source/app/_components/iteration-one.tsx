import { ActionButton, Footer } from "./interactions";
import { Icon, Logo } from "./icons";

function EditorialWorkspace() {
  return (
    <div className="v1-workspace" aria-label="Soma notes workspace preview">
      <div className="v1-windowbar"><span className="v1-dots"><i/><i/><i/></span><span className="v1-workspace-name">Maya’s second brain</span><span className="v1-avatars"><i>JM</i><i>+</i></span></div>
      <div className="v1-appbody">
        <aside className="v1-sidebar">
          <div className="v1-side-search"><Icon name="search" size={13}/><span>Search anything</span><kbd>⌘ K</kbd></div>
          <p className="v1-side-label">YOUR SPACE</p>
          <div className="v1-side-item active"><Icon name="file" size={14}/> Today <span>4</span></div>
          <div className="v1-side-item"><Icon name="grid" size={14}/> All notes <span>248</span></div>
          <div className="v1-side-item"><Icon name="link" size={14}/> Connections</div>
          <p className="v1-side-label">COLLECTIONS</p>
          <div className="v1-side-item"><i className="v1-collection-dot peach"/> Creative practice</div>
          <div className="v1-side-item"><i className="v1-collection-dot green"/> Reading notes</div>
          <div className="v1-side-item"><i className="v1-collection-dot yellow"/> Personal</div>
          <div className="v1-side-bottom"><span className="v1-mini-avatar">M</span><span>Maya Chen</span><Icon name="plus" size={15}/></div>
        </aside>
        <div className="v1-note">
          <div className="v1-note-meta"><span>Creative practice</span><span>•••</span></div>
          <h3>The art of noticing</h3>
          <p className="v1-note-date">Monday, October 12</p>
          <p>Creativity begins with attention. The more carefully I notice the world, the more material I have to work with.</p>
          <div className="v1-quote">“We don’t see things as they are, we see them as we are.”<span>— Anaïs Nin</span></div>
          <p>A small practice: write down one thing you noticed today that you would usually miss.</p>
          <div className="v1-related"><span><Icon name="sparkle" size={13}/> CONNECTED THOUGHTS</span><div><i className="v1-related-icon">✳</i><p><b>On paying attention</b><small>From The Creative Act · 3 connections</small></p><Icon name="arrow-up-right" size={14}/></div><div><i className="v1-related-icon lilac">↗</i><p><b>A slower creative practice</b><small>Personal note · Edited last week</small></p><Icon name="arrow-up-right" size={14}/></div></div>
        </div>
      </div>
      <div className="v1-float-note"><span><Icon name="sparkle" size={15}/></span><div><b>A thought, rediscovered</b><small>Soma surfaced 3 related notes</small></div></div>
    </div>
  );
}

export function IterationOne() {
  return (
    <div className="landing v1">
      <header className="v1-header page-width">
        <a href="#top" aria-label="Soma home"><Logo /></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#how">How it works</a><a href="#features">Features</a><a href="#stories">Stories</a><a href="#pricing">Pricing</a></nav>
        <div className="v1-header-actions"><a href="#signin" className="v1-signin">Sign in</a><ActionButton className="v1-nav-cta">Try Soma free <Icon name="arrow-up-right" size={16}/></ActionButton></div>
        <details className="mobile-nav"><summary aria-label="Open menu"><Icon name="menu"/></summary><nav><a href="#how">How it works</a><a href="#features">Features</a><a href="#stories">Stories</a><ActionButton>Try Soma free</ActionButton></nav></details>
      </header>
      <main id="top">
        <section className="v1-hero page-width">
          <div className="v1-hero-copy">
            <p className="v1-eyebrow"><span/> A QUIETER PLACE TO THINK</p>
            <h1>Good ideas<br/>deserve to<br/><em>stay with you.</em></h1>
            <p className="v1-lede">Soma is your second brain—a thoughtful space to capture what matters, connect the dots, and return to your best ideas.</p>
            <div className="v1-hero-actions"><ActionButton className="v1-primary">Start thinking with Soma <Icon name="arrow-right" size={18}/></ActionButton><ActionButton className="v1-text-button" action="demo"><span><Icon name="play" size={14}/></span> See how it works</ActionButton></div>
            <div className="v1-proof"><div className="v1-proof-faces"><span>AM</span><span>JL</span><span>SK</span><span>+</span></div><p><span>★★★★★</span><br/>Loved by 12,000+ curious minds</p></div>
          </div>
          <div className="v1-visual"><div className="v1-visual-scribble">make space<br/>for wonder <span>↙</span></div><EditorialWorkspace /></div>
        </section>
        <section className="v1-logos page-width" aria-label="Used by teams at"><p>FOR THINKERS, MAKERS & TEAMS AT</p><div><span>notion</span><span>IDEO</span><span>fieldnotes</span><span>Linear</span><span>kinfolk</span></div></section>
        <section className="v1-features page-width" id="features">
          <div className="v1-section-intro"><p className="v1-eyebrow">A BRAIN THAT WORKS WITH YOURS</p><h2>Less organizing.<br/><em>More understanding.</em></h2></div>
          <div className="v1-feature-grid" id="how"><article><span className="v1-feature-number">01</span><Icon name="plus"/><h3>Catch the fleeting</h3><p>Thoughts, highlights, voice notes, and links—saved in seconds, before they slip away.</p><a href="#capture">Meet quick capture <Icon name="arrow-right" size={16}/></a></article><article><span className="v1-feature-number">02</span><Icon name="link"/><h3>Find the hidden thread</h3><p>Soma gently connects related ideas, helping your knowledge grow into something greater.</p><a href="#connect">Explore connections <Icon name="arrow-right" size={16}/></a></article><article><span className="v1-feature-number">03</span><Icon name="sparkle"/><h3>Return at the right time</h3><p>Resurface forgotten notes and old sparks just when they’re useful again.</p><a href="#resurface">See smart resurfacing <Icon name="arrow-right" size={16}/></a></article></div>
        </section>
        <section className="v1-closing page-width" id="stories"><span><Icon name="brain" size={30}/></span><h2>Your mind is for having ideas,<br/><em>not holding them.</em></h2><ActionButton className="v1-primary">Give your ideas a home <Icon name="arrow-right" size={18}/></ActionButton><p>Free for 14 days · No credit card · Your notes stay yours</p></section>
      </main>
      <Footer className="page-width"/>
    </div>
  );
}
