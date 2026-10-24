import { BrainSearch } from "../brain-search";
import { CapabilitySwitches, FaqList, Footer, SiteNav, WaitlistForm } from "../chrome";

export function VersionThree() {
  return (
    <main className="version version-three">
      <section className="v3-hero chapter" aria-labelledby="v3-title">
        <SiteNav current={3} />
        <h1 id="v3-title" data-hero><span>Second</span><span>brain.</span></h1>
        <div className="v3-hero__aside"><p>Morrow keeps your notes, reading, and half-formed ideas connected—and ready when you need them.</p><a className="v3-hero__button" href="#start">Start remembering</a></div>
      </section>

      <section className="v3-recall chapter" id="how" aria-labelledby="v3-recall-title">
        <div className="v3-chapter-heading" data-reveal><h2 id="v3-recall-title">Just<br />remember.</h2><p>Search by meaning, a date, or the words you actually used.</p></div>
        <div data-reveal><BrainSearch compact /></div>
      </section>

      <section className="v3-capture chapter" aria-labelledby="v3-capture-title">
        <h2 id="v3-capture-title" data-reveal>Catch it.<br />Recall it.</h2>
        <div className="v3-capture__copy" data-reveal><p>A sentence is enough to begin. Add voice, images, links, and documents without stopping to decide where they belong.</p><div className="v3-capture-slip" data-ui><span>Today, 8:14 am</span><strong>“Keep the first hour unclaimed.”</strong><span>Saved to your morning thread</span></div><div className="v3-source-tray" data-ui><span>Connected source</span><strong>The attention residue essay</strong><p>Saved from your reading · 18 October</p></div></div>
      </section>

      <section className="v3-features chapter" aria-labelledby="v3-features-title">
        <h2 id="v3-features-title" data-reveal>Memory<br />habits.</h2><div data-reveal><CapabilitySwitches /></div>
      </section>

      <section className="v3-pricing chapter" id="pricing" aria-labelledby="v3-pricing-title">
        <h2 id="v3-pricing-title" data-reveal>Fair<br />pricing.</h2>
        <div className="v3-prices">
          <article data-reveal><h3>Personal</h3><strong>Free</strong><p>1,000 notes, natural search, offline capture, and full exports.</p><a href="#start">Start collecting</a></article>
          <article data-reveal><h3>Morrow+</h3><strong>$8 <span>/ month</span></strong><p>Unlimited notes, encrypted sync, connected recall, and attachment history.</p><a href="#start">Choose Morrow+</a></article>
        </div>
      </section>

      <section className="v3-faq chapter" aria-labelledby="v3-faq-title">
        <h2 id="v3-faq-title" data-reveal>Worth<br />asking.</h2><div data-reveal><FaqList /></div>
      </section>

      <section className="v3-start chapter" id="start" aria-labelledby="v3-start-title">
        <h2 id="v3-start-title" data-reveal>Ideas live<br />here.</h2><div data-reveal><WaitlistForm /></div>
      </section>
      <Footer current={3} />
    </main>
  );
}
