import { ActionButton, Footer } from "./interactions";
import { Icon, Logo } from "./icons";

const graphNotes = [
  { className: "g1", tag: "RESEARCH", title: "Collective intelligence", text: "What emerges when minds connect?", links: "6 links" },
  { className: "g2", tag: "IDEA", title: "Tools shape thought", text: "The medium becomes part of the message.", links: "4 links" },
  { className: "g3", tag: "BOOK", title: "The Extended Mind", text: "Annie Murphy Paul", links: "12 links" },
  { className: "g4", tag: "NOTE", title: "Knowledge gardens", text: "Tend ideas, don’t file them.", links: "8 links" },
];

export function IterationTwo() {
  return (
    <div className="landing v2">
      <div className="v2-grid-overlay"/>
      <header className="v2-header page-width">
        <a href="#top" aria-label="Soma home"><Logo /></a><span className="v2-beta">BETA / 2.0</span>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#manifesto">Manifesto</a><a href="#system">The system</a><a href="#network">Network</a><a href="#pricing">Access</a></nav>
        <div className="v2-header-right"><span className="v2-status"><i/> ALL SYSTEMS THINKING</span><ActionButton className="v2-nav-cta">ENTER SOMA <Icon name="arrow-up-right" size={16}/></ActionButton></div>
        <details className="mobile-nav"><summary aria-label="Open menu"><Icon name="menu"/></summary><nav><a href="#manifesto">Manifesto</a><a href="#system">The system</a><ActionButton>Enter Soma</ActionButton></nav></details>
      </header>
      <main id="top">
        <section className="v2-hero page-width">
          <div className="v2-hero-copy">
            <p className="v2-kicker"><span>01</span> YOUR MIND, EXTENDED</p>
            <h1>THINK IN<br/><span>CONNECTIONS.</span><br/>NOT FOLDERS.</h1>
            <p className="v2-lede">A living network for everything you know. Capture ideas. Build connections. Watch your thinking evolve.</p>
            <div className="v2-actions"><ActionButton className="v2-primary">BUILD YOUR SECOND BRAIN <Icon name="arrow-right" size={18}/></ActionButton><ActionButton className="v2-demo" action="demo"><Icon name="play" size={15}/> WATCH THE SYSTEM</ActionButton></div>
            <div className="v2-micro"><span><Icon name="lock" size={13}/> END-TO-END ENCRYPTED</span><span>LOCAL-FIRST</span><span>YOURS, FOREVER</span></div>
          </div>
          <div className="v2-graph" aria-label="Interactive knowledge graph preview">
            <svg className="v2-graph-lines" viewBox="0 0 620 560" preserveAspectRatio="none" aria-hidden="true"><path d="M304 282 132 126M304 282 507 112M304 282 116 442M304 282 520 432M132 126 507 112M116 442 520 432"/><circle cx="304" cy="282" r="180"/><circle cx="304" cy="282" r="252"/></svg>
            <div className="v2-core"><Icon name="brain" size={34}/><b>YOU</b><span>248 notes</span><i/></div>
            {graphNotes.map((note) => <article key={note.className} className={`v2-graph-note ${note.className}`}><span>{note.tag}</span><h3>{note.title}</h3><p>{note.text}</p><small><Icon name="link" size={11}/>{note.links}</small></article>)}
            <div className="v2-graph-search"><Icon name="command" size={16}/><span>Ask your second brain...</span><kbd>↵</kbd></div>
          </div>
        </section>
        <div className="v2-ticker"><div><span>CAPTURE</span><i>✳</i><span>CONNECT</span><i>✳</i><span>COMPOUND</span><i>✳</i><span>CAPTURE</span><i>✳</i><span>CONNECT</span><i>✳</i><span>COMPOUND</span></div></div>
        <section className="v2-system page-width" id="system">
          <div className="v2-section-heading"><p className="v2-kicker"><span>02</span> A SYSTEM FOR THOUGHT</p><h2>Your knowledge<br/>isn’t linear.<br/><em>Your notes shouldn’t be either.</em></h2></div>
          <div className="v2-system-grid"><article><span className="v2-card-index">[ 001 ]</span><div className="v2-card-icon"><Icon name="command"/></div><h3>Instant capture</h3><p>One shortcut between a passing thought and a permanent part of your mind.</p><small>⌘ + SHIFT + SPACE</small></article><article><span className="v2-card-index">[ 002 ]</span><div className="v2-card-icon"><Icon name="link"/></div><h3>Living connections</h3><p>Build a web of meaning with bidirectional links and intelligent associations.</p><small>248 NOTES → 1,406 LINKS</small></article><article><span className="v2-card-index">[ 003 ]</span><div className="v2-card-icon"><Icon name="sparkle"/></div><h3>Useful intelligence</h3><p>Ask questions across your knowledge. Get answers grounded in your own thinking.</p><small>PRIVATE AI · ON YOUR TERMS</small></article></div>
        </section>
        <section className="v2-manifesto page-width" id="manifesto"><div className="v2-orbit"><Icon name="brain" size={54}/><i/><i/><i/></div><div><p className="v2-kicker"><span>03</span> COMPOUND YOUR CURIOSITY</p><h2>Every note is<br/>a new beginning.</h2><p>Stop letting your best thinking disappear into forgotten files. Soma turns isolated notes into an ever-growing body of knowledge.</p><ActionButton className="v2-primary">START YOUR NETWORK <Icon name="arrow-right" size={18}/></ActionButton></div></section>
      </main>
      <Footer className="page-width"/>
    </div>
  );
}
