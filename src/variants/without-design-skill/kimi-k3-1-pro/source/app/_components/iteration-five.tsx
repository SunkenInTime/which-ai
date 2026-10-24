import { ActionButton, Footer } from "./interactions";
import { Icon, Logo } from "./icons";

export function IterationFive() {
  return (
    <div className="landing v5">
      <header className="v5-header page-width">
        <a href="#top" aria-label="Soma home"><Logo /></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#garden">How it grows <span>↗</span></a><a href="#possibilities">What you can do</a><a href="#love">Kind words</a><a href="#pricing">Pricing</a></nav>
        <ActionButton className="v5-nav-cta">Come on in <Icon name="arrow-up-right" size={17}/></ActionButton>
        <details className="mobile-nav"><summary aria-label="Open menu"><Icon name="menu"/></summary><nav><a href="#garden">How it grows</a><a href="#possibilities">What you can do</a><a href="#pricing">Pricing</a><ActionButton>Come on in</ActionButton></nav></details>
      </header>
      <main id="top">
        <section className="v5-hero page-width">
          <div className="v5-hero-copy"><p className="v5-eyebrow"><Icon name="sparkle" size={14}/> A SOFT PLACE FOR YOUR THOUGHTS</p><h1>Where your<br/>ideas <span>find<br/>each other.</span><i>✳</i></h1><p className="v5-lede">Meet Soma, the second brain that turns scattered thoughts into surprising connections—and helps your curiosity grow.</p><div className="v5-actions"><ActionButton className="v5-primary">Plant your first thought <Icon name="arrow-right" size={18}/></ActionButton><ActionButton className="v5-text-button" action="demo">Take a little tour <span>↗</span></ActionButton></div><p className="v5-small-print"><i/><span>A little calmer. A little more curious.<br/>Free to start, lovely to use.</span></p></div>
          <div className="v5-garden" id="garden" aria-label="Connected ideas visual">
            <div className="v5-blob v5-blob-one"/><div className="v5-blob v5-blob-two"/>
            <svg className="v5-doodles" viewBox="0 0 600 620" aria-hidden="true"><path d="M157 159C217 151 203 261 290 282S421 192 463 181M290 282c-14 90-109 78-124 146M290 282c55 41 52 122 131 160"/><path className="dashed" d="M83 355c-54 7-57-62-27-72M471 396c79 16 65-58 45-74"/></svg>
            <article className="v5-idea v5-idea-one"><div><span>SHOWER THOUGHT · 08:42</span><i>💭</i></div><p>What if rest is not the opposite of creativity, but part of it?</p><small><span>#creative-life</span><span>#slow-down</span></small></article>
            <article className="v5-idea v5-idea-two"><div className="v5-book-art"><span>THE<br/>SHAPE<br/>OF<br/>IDEAS</span><i/></div><div><small>A LINE YOU SAVED</small><p>“Ideas need room to wander.”</p><span>The Shape of Ideas</span></div></article>
            <article className="v5-idea v5-idea-three"><span>FROM YOUR WANDERINGS</span><div className="v5-land-art"><i/><b/><em/></div><p>A field, somewhere in Portugal</p></article>
            <article className="v5-idea v5-idea-four"><span><Icon name="sparkle" size={15}/> A LITTLE CONNECTION</span><p>These three thoughts seem to belong together.</p><div><i>R</i><i>W</i><i>C</i><small>Curiosity needs breathing room</small></div></article>
            <div className="v5-center"><Icon name="brain" size={32}/><span>your mind,<br/>growing</span></div>
            <span className="v5-flower">✿</span><span className="v5-spark">✦</span>
          </div>
        </section>
        <section className="v5-note-strip"><p>For the big questions, tiny details, half-ideas, wild dreams, and everything in between.</p><div><span>WRITERS</span><i>✿</i><span>RESEARCHERS</span><i>✿</i><span>DAYDREAMERS</span><i>✿</i><span>BUILDERS</span><i>✿</i><span>WANDERERS</span></div></section>
        <section className="v5-features page-width" id="possibilities"><div className="v5-section-title"><p>LESS MANAGING. MORE MULLING.</p><h2>A home for the way<br/><em>your mind already works.</em></h2></div><div className="v5-feature-grid"><article><div className="v5-feature-visual capture"><span>new thought...</span><i>↵</i><b>✦</b></div><span className="v5-feature-label">01 / CAPTURE</span><h3>Before it flutters away.</h3><p>A thought arrives. A line, a link, a voice note. Catch it in a moment, from anywhere.</p></article><article><div className="v5-feature-visual connect"><span>slow living</span><span>creative work</span><span>attention</span><i/><i/></div><span className="v5-feature-label">02 / CONNECT</span><h3>Follow the happy accidents.</h3><p>Soma finds the gentle threads between your notes. You decide where they lead.</p></article><article><div className="v5-feature-visual revisit"><small>A THOUGHT FROM LAST AUTUMN</small><p>“Make more things without knowing where they’re going.”</p><span>↻ welcome back, idea</span></div><span className="v5-feature-label">03 / REDISCOVER</span><h3>Old ideas, new possibilities.</h3><p>Resurface the right thought at the right time, and watch a new idea take shape.</p></article></div></section>
        <section className="v5-testimonial page-width" id="love"><div className="v5-quote-flower">✿</div><blockquote>“My notes used to be where ideas went to be forgotten. Now they’re where ideas go to meet.”</blockquote><p>— ELENA, POET & PROFESSIONAL WANDERER</p><div className="v5-rating">✦ ✦ ✦ ✦ ✦ <span>4.9 from 2,000+ lovely humans</span></div></section>
        <section className="v5-bottom-cta page-width"><div><p>YOUR NEXT IDEA STARTS WITH A LITTLE SPACE</p><h2>Come as you are.<br/><em>Bring your curious mind.</em></h2><ActionButton className="v5-primary">Start growing with Soma <Icon name="arrow-right" size={18}/></ActionButton><small>No credit card. No complicated setup. Just you and your thoughts.</small></div></section>
      </main>
      <Footer className="page-width"/>
    </div>
  );
}
