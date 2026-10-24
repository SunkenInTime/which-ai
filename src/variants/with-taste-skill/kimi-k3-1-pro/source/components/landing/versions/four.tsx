import { BrainSearch } from "../brain-search";
import { capabilities } from "../data";
import { FaqList, Footer, SiteNav, WaitlistForm } from "../chrome";

export function VersionFour() {
  return (
    <main className="version version-four">
      <section className="v4-hero" aria-labelledby="v4-title">
        <div className="v4-hero-card">
          <SiteNav current={4} />
          <div className="v4-hero-card__body">
            <h1 id="v4-title" data-hero>Your mind,<br />well kept.</h1>
            <p>Morrow is a quiet second brain for notes, references, and the ideas that connect them.</p>
          </div>
          <div className="v4-hero-card__foot"><span>Make a note. Keep the thread.</span><a className="button button--green" href="#start">Start your space</a></div>
        </div>
        <div className="v4-background-note" aria-hidden="true">A thought worth returning to.</div>
      </section>

      <section className="v4-search section-pad" id="how" aria-labelledby="v4-search-title">
        <div className="v4-search__intro" data-reveal><h2 id="v4-search-title">The index<br />remembers.</h2><p>Ask with whatever fragment stayed with you. This working sample holds six notes and all their loose connections.</p></div>
        <div className="v4-search__paper" data-reveal><BrainSearch compact /></div>
        <p className="v4-section-note">Six sample notes, with every connection intact.</p>
      </section>

      <section className="v4-method section-pad" aria-labelledby="v4-method-title">
        <div data-reveal><h2 id="v4-method-title">A gentle<br />daily practice.</h2><p>No elaborate system to maintain. Morrow gives each thought a useful place in the flow of your day.</p></div>
        <div className="v4-itinerary" data-reveal>
          <h3>One day with Morrow</h3>
          <dl><div><dt>Morning pages</dt><dd>8:10</dd></div><div><dt>Clip a useful passage</dt><dd>11:42</dd></div><div><dt>Save a voice note</dt><dd>15:06</dd></div><div><dt>Return to an old idea</dt><dd>20:18</dd></div></dl>
          <p>Four moments. Nothing to file.</p>
        </div>
        <p className="v4-section-note">A sample day, not a schedule you have to keep.</p>
      </section>

      <section className="v4-features section-pad" aria-labelledby="v4-features-title">
        <h2 id="v4-features-title" data-reveal>Everything<br />in its place.</h2>
        <div className="v4-paper-stack">
          {capabilities.map((capability, index) => (
            <article key={capability.title} data-reveal>
              <h3>{capability.title}</h3><p>{capability.body}</p>
              <div data-ui><span>{index === 0 ? "Quick note" : index === 1 ? "A useful connection" : index === 2 ? "Search your memory" : "Private by default"}</span><strong>{capability.detail}</strong></div>
            </article>
          ))}
        </div>
        <p className="v4-section-note">Private spaces and complete exports are included.</p>
      </section>

      <section className="v4-pricing section-pad" id="pricing" aria-labelledby="v4-pricing-title">
        <div data-reveal><h2 id="v4-pricing-title">One simple<br />subscription.</h2><p>Use the free plan for as long as it serves you. Upgrade for an unlimited, connected archive.</p></div>
        <div className="v4-price-list" data-reveal>
          <div><h3>Personal</h3><span>1,000 notes, natural search, offline capture</span><strong>Free</strong></div>
          <div><h3>Morrow+</h3><span>Unlimited notes, encrypted sync, connected recall</span><strong>$8 / month</strong></div>
          <a href="#start">Choose your space</a>
        </div>
      </section>

      <section className="v4-faq section-pad" aria-labelledby="v4-faq-title">
        <h2 id="v4-faq-title" data-reveal>Notes on<br />the details.</h2><div data-reveal><FaqList /></div>
      </section>

      <section className="v4-start section-pad" id="start" aria-labelledby="v4-start-title">
        <div className="v4-start__card" data-reveal><h2 id="v4-start-title">Begin a page<br />of your own.</h2><p>Start small. Your future self will know where to look.</p><WaitlistForm /></div>
      </section>
      <Footer current={4} />
    </main>
  );
}
