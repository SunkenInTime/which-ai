import { BrainSearch } from "../brain-search";
import { capabilities } from "../data";
import { FaqList, Footer, SiteNav, WaitlistForm } from "../chrome";

export function VersionFive() {
  return (
    <main className="version version-five">
      <section className="v5-hero" aria-labelledby="v5-title">
        <SiteNav current={5} />
        <div className="v5-hero__intro"><h1 id="v5-title" data-hero>Think it.<br />Find it.</h1><p>Morrow connects the notes behind your ideas, so one small thought can lead you back to everything else.</p><a className="button button--magenta" href="#start">Build your second brain</a></div>
        <div className="v5-hero__stage" data-hero><div className="v5-orbit-note"><span>A thought</span><span>finds another.</span></div><BrainSearch compact /></div>
      </section>

      <section className="v5-search section-pad" id="how" aria-labelledby="v5-search-title">
        <div className="v5-search__sample" data-reveal><BrainSearch compact id="follow" /></div>
        <div className="v5-search__copy" data-reveal><h2 id="v5-search-title">Follow<br />the thread.</h2><p>Search “garden” and Morrow finds the north wall, the ferns, and the weekend errand. Your own associations become a map.</p><a href="#pricing">See what’s included</a></div>
      </section>

      <section className="v5-method section-pad" aria-labelledby="v5-method-title">
        <div className="section-heading" data-reveal><h2 id="v5-method-title">A loop,<br />not a library.</h2><p>The best second brain does more than store. It brings old material into the next new idea.</p></div>
        <div className="v5-loop">
          <article data-reveal><span className="v5-node" /><h3>Notice</h3><p>Save the line, image, or question while it is still alive.</p></article>
          <article data-reveal><span className="v5-node" /><h3>Connect</h3><p>See the notes and sources that belong beside it.</p></article>
          <article data-reveal><span className="v5-node" /><h3>Return</h3><p>Find the thread by asking in your own natural words.</p></article>
        </div>
        <div className="v5-method__fragments" data-reveal>
          <div data-ui><span>Quick capture</span><strong>“Ask about soil depth.”</strong><p>Saved to A garden for the north wall</p></div>
          <div data-ui><span>Thread found</span><strong>Garden · 3 connected notes</strong><p>North wall, shade plants, and weekend errands</p></div>
        </div>
      </section>

      <section className="v5-features section-pad" aria-labelledby="v5-features-title">
        <h2 id="v5-features-title" data-reveal>Memory<br />at work.</h2>
        <div className="v5-feature-lines">
          {capabilities.map((capability) => <article key={capability.title} data-reveal><span className="v5-node" /><h3>{capability.title}</h3><p>{capability.body}</p></article>)}
        </div>
      </section>

      <section className="v5-pricing section-pad" id="pricing" aria-labelledby="v5-pricing-title">
        <h2 id="v5-pricing-title" data-reveal>Room to<br />grow.</h2>
        <div className="v5-prices">
          <article data-reveal><h3>Personal</h3><strong>Free</strong><p>1,000 notes</p><p>Natural search</p><p>Offline capture</p><a href="#start">Start small</a></article>
          <article data-reveal><h3>Morrow+</h3><strong>$8 <span>/ month</span></strong><p>Unlimited notes</p><p>Connected recall</p><p>Encrypted sync</p><p>Attachment history</p><a href="#start">Think bigger</a></article>
        </div>
      </section>

      <section className="v5-faq section-pad" aria-labelledby="v5-faq-title"><h2 id="v5-faq-title" data-reveal>Good<br />questions.</h2><div data-reveal><FaqList /></div></section>
      <section className="v5-start section-pad" id="start" aria-labelledby="v5-start-title"><h2 id="v5-start-title" data-reveal>Keep the<br />thread.</h2><div data-reveal><WaitlistForm /></div></section>
      <Footer current={5} />
    </main>
  );
}
