import Link from "next/link";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="#" className={"brand" + (light ? " brand-light" : "")} aria-label="Mori home">
      <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>mori<span className="brand-period">.</span></span>
    </Link>
  );
}

export function One() {
  return (
    <main className="page one">
      <div className="one-shell">
        <header className="site-header one-header">
          <Brand />
          <nav className="header-links" aria-label="Main navigation">
            <a href="#one-product">Product</a><a href="#one-why">Why Mori</a><a href="#one-footer">About</a>
          </nav>
          <a className="one-header-cta" href="#one-product">Explore the app <Arrow diagonal /></a>
        </header>
        <section className="one-hero">
          <div className="one-copy">
            <p className="eyebrow one-eyebrow"><span className="eyebrow-line" /> YOUR MIND HAS A NEW HOME</p>
            <h1>A quieter place for your <em>loudest ideas.</em></h1>
            <p className="one-subtitle">Collect the things that move you. Connect the dots you didn’t know were there. Make space for the way your mind really works.</p>
            <div className="one-actions">
              <a className="button one-primary" href="#one-product">Discover Mori <Arrow /></a>
              <a className="one-text-link" href="#one-why">See how it works <Arrow diagonal /></a>
            </div>
            <div className="one-proof"><span className="one-proof-avatars"><b>J</b><b>M</b><b>A</b></span><span>Made for curious minds,<br />just like yours.</span></div>
          </div>
          <div className="one-art" aria-label="Preview of the Mori notes workspace">
            <div className="one-art-arch" />
            <div className="one-orbit one-orbit-one" /><div className="one-orbit one-orbit-two" />
            <div className="one-art-sun" />
            <div className="one-note one-note-main">
              <div className="note-topline"><span className="one-mini-brand">mori.</span><span>✦ &nbsp; ALL NOTES</span></div>
              <div className="one-note-content"><span className="note-date">MONDAY, SEPTEMBER 22</span><h3>On paying attention</h3><p>There is so much beauty in the small things we usually walk past. Maybe the work is simply to notice them.</p><span className="one-note-highlight">A thought worth keeping close.</span><div className="one-note-rule" /><div className="one-note-rule short" /><div className="one-note-rule shorter" /></div>
              <div className="one-note-footer"><span>◉ &nbsp; REFLECTIONS</span><span>↗</span></div>
            </div>
            <div className="one-note one-note-small"><span>✳ &nbsp; A CONNECTION</span><p>Your notes on <em>attention</em> and <em>creativity</em> might be related.</p><div>Explore the thread <Arrow /></div></div>
            <div className="one-art-caption">EVERY THOUGHT HAS SOMEWHERE TO GO <span>↗</span></div>
          </div>
        </section>
        <section className="one-bottom" id="one-why"><span>THE SPACE BETWEEN IDEAS IS WHERE THE MAGIC HAPPENS.</span><div><b>01</b><p>Capture freely.<br />Find meaning later.</p></div><div><b>02</b><p>One place for everything<br />worth remembering.</p></div></section>
      </div>
      <section className="one-feature" id="one-product"><span>MADE FOR A MIND IN MOTION</span><h2>Less organizing.<br /><em>More discovering.</em></h2><p>Mori keeps your fleeting thoughts, favorite finds, and big ideas together—so new connections can emerge naturally.</p></section>
      <footer id="one-footer" className="minimal-footer">mori. <span>A place for the way you think.</span></footer>
    </main>
  );
}

export function Two() {
  return (
    <main className="page two">
      <div className="two-glow" />
      <header className="site-header two-header"><Brand light /><nav className="header-links" aria-label="Main navigation"><a href="#two-how">How it works</a><a href="#two-features">Features</a><a href="#two-footer">Our story</a></nav><a className="two-header-cta" href="#two-how">Explore Mori <Arrow diagonal /></a></header>
      <section className="two-hero">
        <div className="two-top-pill"><span className="two-pill-spark">✳</span> A NEW WAY TO THINK OUT LOUD <span>↗</span></div>
        <h1>Your thoughts have<br />a <em>universe</em> inside them.</h1>
        <p>A second brain that sees the connections you can’t. Bring every note, spark, and rabbit hole into one beautiful orbit.</p>
        <div className="two-actions"><a className="button two-primary" href="#two-how">Enter your universe <Arrow /></a><a className="two-watch" href="#two-features"><span>▷</span> Take a closer look</a></div>
        <div className="two-cosmos" aria-label="Connected notes orbiting an idea">
          <div className="two-cosmos-grid" />
          <div className="two-ring ring-a" /><div className="two-ring ring-b" /><div className="two-ring ring-c" />
          <div className="two-center"><span className="two-center-mark">✳</span><strong>Your mind,<br />in motion.</strong><small>12 CONNECTED IDEAS</small></div>
          <div className="two-node node-one"><span>◉</span><div><small>NOTE · TODAY</small><strong>Why ideas need room to grow</strong></div></div>
          <div className="two-node node-two"><span>✦</span><div><small>CONNECTION FOUND</small><strong>Creativity ↔ Curiosity</strong></div></div>
          <div className="two-node node-three"><span>▣</span><div><small>SAVED THOUGHT</small><strong>The art of noticing</strong></div></div>
          <div className="two-tiny-star star-one">✦</div><div className="two-tiny-star star-two">✳</div><div className="two-tiny-star star-three">✦</div>
        </div>
      </section>
      <section className="two-bottom" id="two-how"><span>01 / CAPTURE WHAT MATTERS</span><span>02 / FOLLOW THE THREADS</span><span>03 / THINK WITHOUT LIMITS</span></section>
      <section className="two-feature" id="two-features"><p>YOUR IDEAS WERE NEVER MEANT TO LIVE IN ISOLATION.</p><h2>See the bigger picture<br />of your own thinking.</h2></section>
      <footer id="two-footer" className="minimal-footer">mori. <span>Make room for wonder.</span></footer>
    </main>
  );
}

export function Three() {
  return (
    <main className="page three">
      <div className="three-border">
        <header className="site-header three-header"><Brand /><div className="three-header-center">THE THINKING SPACE<br />YOU DIDN’T KNOW YOU NEEDED</div><a href="#three-product">THE IDEA, EXPLAINED <Arrow diagonal /></a></header>
        <section className="three-hero">
          <div className="three-left"><div className="three-index">ISSUE NO. 001 &nbsp; / &nbsp; MADE FOR THE CURIOUS</div><h1>Keep a<br /><em>thought.</em><br />Find a<br /><em>thread.</em></h1><div className="three-left-bottom"><p>All the little things you notice become something bigger when they have a place to land.</p><a className="three-round-arrow" href="#three-product" aria-label="Explore how Mori works">↗</a></div></div>
          <div className="three-right" aria-label="Mori note collection preview"><div className="three-stamp">A HOME FOR<br />YOUR HEAD<br /><span>✳</span></div><div className="three-product-card"><div className="three-card-head"><span>mori. / YOUR SPACE</span><span>○ ○ ○</span></div><div className="three-card-inner"><aside><span className="three-aside-title">YOUR WORLD</span><b>⌂ &nbsp; Home</b><span>✦ &nbsp; Discover</span><span>▦ &nbsp; Collections</span><hr /><span>RECENT SPACES</span><span>○ &nbsp; Things to make</span><span>○ &nbsp; Quiet mornings</span><span>○ &nbsp; Good questions</span></aside><div className="three-card-main"><div className="three-card-date">TUESDAY / 09:41 AM</div><h3>Today’s thoughts<span>✳</span></h3><p className="three-card-intro">A little space to think out loud.</p><div className="three-entry"><span>01 / A NEW THOUGHT</span><strong>What if the best ideas begin with paying attention?</strong><p>It started with a conversation over coffee, and somehow became a whole new direction.</p></div><div className="three-entry muted"><span>02 / SAVED FOR LATER</span><strong>The importance of being bored</strong></div></div></div><div className="three-card-foot">EVERYTHING YOU KEEP, CLOSE AT HAND. <span>↗</span></div></div><div className="three-side-note">GOOD IDEAS<br />GROW HERE. <span>↘</span></div></div>
        </section>
        <section className="three-strip" id="three-product"><div><span>01 — CAPTURE</span><p>Catch a thought<br />before it wanders.</p></div><div><span>02 — CONNECT</span><p>Let the interesting<br />threads reveal themselves.</p></div><div><span>03 — RETURN</span><p>Come back to ideas<br />with fresh eyes.</p></div></section>
      </div>
      <footer className="minimal-footer">mori. <span>For everything on your mind.</span></footer>
    </main>
  );
}

export function Four() {
  return (
    <main className="page four">
      <header className="site-header four-header"><Brand /><nav className="header-links" aria-label="Main navigation"><a href="#four-features">Why Mori</a><a href="#four-preview">Take a peek</a><a href="#four-footer">About us</a></nav><a className="four-header-cta" href="#four-preview">Explore the space <Arrow diagonal /></a></header>
      <section className="four-hero"><div className="four-hero-copy"><div className="four-eyebrow"><span>✳</span> AN UNREASONABLY GOOD PLACE FOR IDEAS</div><h1>Big ideas start<br />as <em>little notes.</em></h1><p>Save the sparks. Follow your curiosity. Watch your world of ideas come together, one thought at a time.</p><div className="four-actions"><a className="button four-primary" href="#four-preview">See what’s possible <Arrow /></a><div className="four-handdrawn">go on, get curious <span>⤴</span></div></div></div><div className="four-bento" id="four-preview" aria-label="Colorful preview of Mori notes and collections"><div className="four-card four-card-yellow"><div className="four-card-top"><span>01 / CAPTURE</span><span>↗</span></div><div className="four-yellow-icon">✳</div><strong>A little thought<br />can go a long way.</strong><div className="four-yellow-bottom">WRITE IT DOWN, MAKE IT REAL.</div></div><div className="four-card four-card-lilac"><div className="four-card-top"><span>YOUR SPACE</span><span>•••</span></div><div className="four-lilac-title">Good morning,<br />good ideas. <span>☺</span></div><div className="four-lilac-search">⌕ &nbsp; Search your thoughts...</div><div className="four-lilac-note"><span>✦ &nbsp; NEW CONNECTION</span><p>Your notes on <b>slow living</b> and <b>creative work</b> have something in common.</p></div></div><div className="four-card four-card-pink"><div className="four-card-top"><span>02 / CONNECT</span><span>↗</span></div><div className="four-pink-circles"><span>new<br />ideas</span><span>old<br />notes</span><i>✳</i></div><strong>Find the magic<br />in the middle.</strong></div><div className="four-card four-card-blue"><span>YOUR BRAIN, BUT WITH ROOM TO BREATHE.</span><strong>Everything<br />clicks eventually. <span>↗</span></strong></div></div></section>
      <section className="four-feature" id="four-features"><div><span>THINK FREELY. REMEMBER MORE.</span><h2>Every idea deserves<br />a place to grow.</h2></div><p>Mori is the playful, peaceful home for the things you don’t want to forget and the connections you haven’t made yet.</p></section>
      <footer id="four-footer" className="minimal-footer">mori. <span>Stay wonderfully curious.</span></footer>
    </main>
  );
}

export function Five() {
  return (
    <main className="page five">
      <header className="site-header five-header"><Brand /><span>AN EXTENSION OF YOUR MIND™</span><nav aria-label="Main navigation"><a href="#five-method">THE METHOD</a><a href="#five-product">THE PRODUCT</a><a href="#five-footer">THE STORY</a></nav><a className="five-menu" href="#five-product" aria-label="Jump to the product preview"><span /><span /></a></header>
      <section className="five-hero"><div className="five-meta"><span>INTRODUCING MORI</span><span>NOTES FOR THE DEEPLY CURIOUS</span><span>EST. 2026</span></div><div className="five-headline"><h1>REMEMBER<br /><em>MORE.</em><br />THINK FURTHER<span className="five-period">.</span></h1><div className="five-hero-side"><span className="five-asterisk">✳</span><p>A thinking space that keeps up with everything going on in your head.</p><a href="#five-product">DISCOVER THE PRODUCT <Arrow diagonal /></a></div></div><div className="five-hero-bottom"><span>THOUGHTS ARE ONLY THE BEGINNING.</span><span>SCROLL TO EXPLORE &nbsp; ↓</span></div></section>
      <section className="five-preview" id="five-product"><div className="five-preview-label"><span>FIG. 01 — THE MORI WORKSPACE</span><span>IDEAS, IN GOOD COMPANY.</span></div><div className="five-app"><aside><div className="five-app-brand">mori<span>.</span></div><div className="five-app-search">⌕ &nbsp; Search anything</div><p>WORKSPACE</p><a className="selected" href="#five-product">⌂ &nbsp; Home <span>↗</span></a><a href="#five-product">✳ &nbsp; Discover</a><a href="#five-product">▣ &nbsp; All notes</a><p>COLLECTIONS</p><a href="#five-product"><i className="dot-yellow" /> &nbsp; Ideas in progress</a><a href="#five-product"><i className="dot-blue" /> &nbsp; Things to read</a><a href="#five-product"><i className="dot-red" /> &nbsp; Everyday life</a></aside><div className="five-app-main"><div className="five-app-main-top"><span>HOME / YOUR SPACE</span><span>↗ &nbsp; NEW NOTE</span></div><div className="five-app-greeting"><small>TUESDAY, SEPTEMBER 22</small><h3>Make sense of<br />what matters to you<span>.</span></h3></div><div className="five-app-grid"><div className="five-app-note"><span>01 / RECENT THOUGHT</span><strong>The value of starting before you’re ready</strong><p>There’s a strange kind of clarity that only comes from beginning.</p><small>3 HOURS AGO &nbsp; ↗</small></div><div className="five-app-note dark"><span>02 / THREAD FOUND</span><strong>Two thoughts.<br />One new idea.</strong><div className="five-app-thread">Creativity <span>↗</span> Attention</div><small>EXPLORE CONNECTION &nbsp; ↗</small></div><div className="five-app-note small"><span>03 / SAVED FOR LATER</span><strong>The beautiful art of noticing</strong><small>YESTERDAY &nbsp; ↗</small></div></div></div></div></section>
      <section className="five-method" id="five-method"><span>THE METHOD / 001</span><h2>GET IT OUT OF YOUR HEAD.<br /><em>GET MORE OUT OF YOUR MIND.</em></h2><p>Write freely. Keep everything. Let the connections come to you.</p></section>
      <footer id="five-footer" className="minimal-footer">mori. <span>For a mind that never stops.</span></footer>
    </main>
  );
}
