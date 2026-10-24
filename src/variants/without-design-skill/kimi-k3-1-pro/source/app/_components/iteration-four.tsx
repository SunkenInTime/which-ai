import { ActionButton, Footer } from "./interactions";
import { Icon, Logo } from "./icons";

export function IterationFour() {
  return (
    <div className="landing v4">
      <header className="v4-header page-width">
        <a href="#top" aria-label="Soma home"><Logo /></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#product">Product</a><a href="#method">Method</a><a href="#customers">Customers</a><a href="#pricing">Pricing</a></nav>
        <div className="v4-header-actions"><a href="#login">Log in</a><ActionButton className="v4-nav-cta">Get started <Icon name="arrow-right" size={15}/></ActionButton></div>
        <details className="mobile-nav"><summary aria-label="Open menu"><Icon name="menu"/></summary><nav><a href="#product">Product</a><a href="#method">Method</a><a href="#pricing">Pricing</a><ActionButton>Get started</ActionButton></nav></details>
      </header>
      <main id="top">
        <section className="v4-hero page-width">
          <div className="v4-pill"><span><Icon name="sparkle" size={12}/></span> Introducing Soma AI <Icon name="arrow-right" size={13}/></div>
          <h1>A clear mind<br/>starts here.</h1>
          <p>One calm, connected place for your notes, ideas, and everything you’re learning. Think better with a second brain that feels like your own.</p>
          <div className="v4-actions"><ActionButton className="v4-primary">Start for free <Icon name="arrow-right" size={17}/></ActionButton><ActionButton className="v4-secondary" action="demo"><Icon name="play" size={13}/> Watch 2-min demo</ActionButton></div>
          <small className="v4-no-card"><Icon name="check" size={13}/> Free 14-day trial <Icon name="check" size={13}/> No credit card required</small>
        </section>
        <section className="v4-product page-width" id="product" aria-label="Soma app preview">
          <div className="v4-product-glow"/>
          <div className="v4-window">
            <div className="v4-topbar"><div className="v4-traffic"><i/><i/><i/></div><div className="v4-quick-search"><Icon name="search" size={13}/>Search or ask Soma...<kbd>⌘ K</kbd></div><div className="v4-window-actions"><Icon name="plus" size={17}/><span>MC</span></div></div>
            <div className="v4-app">
              <aside className="v4-sidebar"><div className="v4-user"><span>MC</span><div><b>Maya’s Space</b><small>Personal workspace</small></div><Icon name="chevron-right" size={13}/></div><div className="v4-menu active"><Icon name="file" size={15}/>Home</div><div className="v4-menu"><Icon name="clock" size={15}/>Daily notes</div><div className="v4-menu"><Icon name="grid" size={15}/>All notes<span>248</span></div><p>COLLECTIONS <Icon name="plus" size={13}/></p><div className="v4-menu"><i className="yellow"/>Ideas & inspiration<span>34</span></div><div className="v4-menu"><i className="purple"/>Learning<span>61</span></div><div className="v4-menu"><i className="green"/>Work projects<span>27</span></div><div className="v4-menu"><i className="pink"/>Reading notes<span>48</span></div><div className="v4-side-tip"><Icon name="sparkle" size={17}/><b>Your weekly review</b><p>12 notes are ready to revisit.</p><button type="button">Review notes <Icon name="arrow-right" size={12}/></button></div></aside>
              <div className="v4-main-note"><div className="v4-breadcrumb">Daily notes <Icon name="chevron-right" size={11}/> October 23, 2026</div><div className="v4-note-title"><div><p>FRIDAY, OCTOBER 23</p><h2>Today’s thoughts</h2></div><button type="button"><Icon name="plus" size={14}/> Add note</button></div><div className="v4-focus"><span className="v4-focus-icon">☀</span><div><b>Today’s intention</b><p>Move one meaningful thing forward. Leave room for curiosity.</p></div><span className="v4-more">•••</span></div><div className="v4-note-entry"><span className="v4-time">09:41</span><div><h3>What makes a tool feel effortless?</h3><p>The best tools don’t demand attention. They remove the friction between having a thought and giving it form.</p><div className="v4-note-links"><a href="#link"><Icon name="link" size={12}/> Designing calm software</a><a href="#link"><Icon name="link" size={12}/> Cognitive load</a></div></div></div><div className="v4-note-entry"><span className="v4-time">11:26</span><div><h3>A useful question for research</h3><p>Instead of “What do I already know?” try “What would change my mind?”</p><span className="v4-inline-tag">#better-questions</span></div></div></div>
              <aside className="v4-context"><p><Icon name="sparkle" size={14}/> RELATED TO THIS DAY</p><article><span>FROM IDEAS & INSPIRATION</span><h4>The tools we use shape the work we make</h4><small>Edited 3 days ago</small></article><article><span>FROM READING NOTES</span><h4>Attention is the beginning of devotion</h4><small>From The Art of Attention</small></article><article><span>SUGGESTED CONNECTION</span><h4>Questions as a creative practice</h4><small>4 shared ideas</small></article><div className="v4-ask"><Icon name="sparkle" size={16}/><p>Ask Soma about these notes</p><Icon name="arrow-up-right" size={14}/></div></aside>
            </div>
          </div>
        </section>
        <section className="v4-trust page-width"><p>TRUSTED BY THOUGHTFUL PEOPLE AT</p><div><span>Airbnb</span><span>stripe</span><span>MIT</span><span>figma</span><span>Medium</span><span>Monocle</span></div></section>
        <section className="v4-feature-section page-width" id="method"><div className="v4-section-heading"><span>EVERYTHING IN ITS RIGHT PLACE</span><h2>A second brain,<br/>without the busywork.</h2><p>Soma keeps the mechanics quiet, so you can stay with the thought.</p></div><div className="v4-feature-grid"><article><span><Icon name="command"/></span><h3>Capture at the speed of thought</h3><p>From any app, on any device. Quick capture keeps up with wherever your mind goes.</p><a href="#capture">Explore capture <Icon name="arrow-right" size={14}/></a></article><article><span><Icon name="link"/></span><h3>Organize by connecting</h3><p>Natural links replace rigid folders, so your notes can belong wherever they make sense.</p><a href="#connections">Explore connections <Icon name="arrow-right" size={14}/></a></article><article><span><Icon name="sparkle"/></span><h3>Find more than you remember</h3><p>Search by meaning and ask questions across everything you’ve saved.</p><a href="#intelligence">Explore intelligence <Icon name="arrow-right" size={14}/></a></article></div></section>
        <section className="v4-quote page-width" id="customers"><blockquote>“Soma is the first notes app that has actually changed how I think. It feels less like software and more like an extension of my curiosity.”</blockquote><div><span>NS</span><p><b>Nadia Sapkota</b><small>Writer & independent researcher</small></p></div></section>
        <section className="v4-bottom-cta page-width"><div><span>START SMALL. THINK BIG.</span><h2>Your next idea<br/>is worth keeping.</h2></div><ActionButton className="v4-primary">Build your second brain <Icon name="arrow-right" size={17}/></ActionButton></section>
      </main>
      <Footer className="page-width"/>
    </div>
  );
}
