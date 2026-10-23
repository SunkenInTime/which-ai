import { ActionButton, Footer } from "./interactions";
import { Icon, Logo } from "./icons";

export function IterationThree() {
  return (
    <div className="landing v3">
      <header className="v3-header">
        <a href="#top" aria-label="Soma home"><Logo /></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#why">WHY SOMA?</a><a href="#features">FEATURES</a><a href="#people">FOR CURIOUS PEOPLE</a><a href="#pricing">PRICING</a></nav>
        <ActionButton className="v3-nav-cta">GET SOMA — IT’S FREE <Icon name="arrow-up-right" size={19}/></ActionButton>
        <details className="mobile-nav"><summary aria-label="Open menu"><Icon name="menu"/></summary><nav><a href="#why">Why Soma?</a><a href="#features">Features</a><a href="#pricing">Pricing</a><ActionButton>Get Soma free</ActionButton></nav></details>
      </header>
      <main id="top">
        <section className="v3-hero">
          <div className="v3-headline"><p className="v3-sticker">FINALLY, A PLACE<br/>FOR EVERY THOUGHT <span>✳</span></p><h1>YOUR BRAIN.<br/><span>BUT BETTER.</span></h1><div className="v3-starburst">✳</div></div>
          <div className="v3-hero-bottom"><p>Capture anything. Connect everything.<br/><b>Never lose a good idea again.</b></p><div><ActionButton className="v3-primary">START YOUR SECOND BRAIN <Icon name="arrow-right"/></ActionButton><small>Free forever for your first 100 notes. No card. No catch.</small></div></div>
        </section>
        <section className="v3-collage" aria-label="A collection of connected Soma notes">
          <article className="v3-paper v3-paper-quote"><span className="v3-tape"/><small>NOTE TO SELF / 024</small><blockquote>“You are what you pay attention to.”</blockquote><p>Make a list of things worth noticing.</p><span className="v3-handwritten">pay more attention! ↗</span></article>
          <article className="v3-paper v3-paper-photo"><div className="v3-photo-art"><span/><i/><b/></div><div className="v3-photo-caption"><p><small>TRAVEL / COPENHAGEN</small><b>Color studies, everywhere.</b></p><span>4<br/>notes</span></div></article>
          <article className="v3-paper v3-paper-tasks"><div className="v3-paper-title"><span>PROJECT / NEW WEBSITE</span><Icon name="arrow-up-right"/></div><h3>Make it feel human.</h3><ul><li className="done"><i><Icon name="check" size={13}/></i>Collect visual references</li><li className="done"><i><Icon name="check" size={13}/></i>Write the manifesto</li><li><i/>Prototype the strange idea</li><li><i/>Share with the team</li></ul><div className="v3-tags"><span>#design</span><span>#work</span></div></article>
          <article className="v3-paper v3-paper-link"><Icon name="sparkle" size={25}/><small>SOMA FOUND A CONNECTION</small><p>Your note <b>“Make it feel human”</b> connects with <b>“The sociology of interfaces.”</b></p><button type="button">EXPLORE THE THREAD <Icon name="arrow-right" size={15}/></button></article>
          <article className="v3-paper v3-paper-book"><span className="v3-tape"/><small>READING / THE CREATIVE ACT</small><p>“The object is not to make art, it’s to be in that wonderful state which makes art inevitable.”</p><b>— RICK RUBIN</b></article>
        </section>
        <section className="v3-marquee" aria-hidden="true"><div>A HOME FOR YOUR HALF-FORMED IDEAS <span>✳</span> YOUR RABBIT HOLES <span>✳</span> YOUR BIG PLANS <span>✳</span> YOUR SHOWER THOUGHTS <span>✳</span></div></section>
        <section className="v3-features" id="features"><div className="v3-section-title"><span>01 / WHY SOMA</span><h2>MESSY MIND.<br/>MEET YOUR MATCH.</h2><p>Your thoughts don’t fit in neat little boxes. Good. Soma is built for how your mind actually works.</p></div><div className="v3-feature-cards" id="why"><article className="yellow"><span>01</span><Icon name="plus" size={32}/><h3>THROW IT ALL IN.</h3><p>Notes, links, images, PDFs, voice memos, midnight epiphanies. If it matters to you, it belongs here.</p></article><article className="pink"><span>02</span><Icon name="link" size={32}/><h3>CONNECT THE WEIRD STUFF.</h3><p>Link a recipe to a research paper. A dream to a business plan. The unexpected connections are the good ones.</p></article><article className="cream"><span>03</span><Icon name="search" size={32}/><h3>FIND IT. EVERY TIME.</h3><p>Search the way you remember: a word, a feeling, a half-remembered phrase. Soma knows where to look.</p></article></div></section>
        <section className="v3-cta" id="people"><div><span>NO MORE “WHERE DID I PUT THAT?”</span><h2>MAKE ROOM<br/>FOR YOUR MIND.</h2></div><ActionButton className="v3-primary">GET STARTED FOR FREE <Icon name="arrow-up-right"/></ActionButton></section>
      </main>
      <Footer/>
    </div>
  );
}
