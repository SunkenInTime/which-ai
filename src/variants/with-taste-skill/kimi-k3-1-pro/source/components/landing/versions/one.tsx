import { BrainSearch } from "../brain-search";
import { capabilities } from "../data";
import { FaqList, Footer, SiteNav, WaitlistForm } from "../chrome";

export function VersionOne() {
  return (
    <main className="version version-one">
      <section className="v1-hero" aria-labelledby="v1-title">
        <SiteNav current={1} />
        <h1 id="v1-title" data-hero>
          <span>Keep every</span>
          <span><span className="v1-inline-note"><span>Thoughts, safely kept.</span></span> close.</span>
        </h1>
        <div className="v1-hero__foot">
          <p>Morrow is a second brain that connects your notes and brings the right thought back when you need it.</p>
          <a className="button button--lime" href="#start">Start remembering</a>
        </div>
      </section>

      <section className="v1-search section-pad" id="how" aria-labelledby="v1-search-title">
        <div className="section-heading" data-reveal>
          <h2 id="v1-search-title">Ask in your own words.</h2>
          <p>You remember the feeling, the place, or one loose phrase. That is enough. Try searching this small, working memory.</p>
        </div>
        <div data-reveal><BrainSearch /></div>
      </section>

      <section className="v1-ritual section-pad" aria-labelledby="v1-ritual-title">
        <h2 id="v1-ritual-title" data-reveal>Write now.<br />Find it later.</h2>
        <div className="v1-ritual__steps">
          <article data-reveal><h3>Catch the thought</h3><p>A line from your phone, a voice note on a walk, a PDF at your desk. Capture first; organise when you feel like it.</p></article>
          <article data-reveal><h3>Let context gather</h3><p>Morrow keeps the source, date, people, and nearby ideas. The note becomes richer without becoming more work.</p></article>
          <article data-reveal><h3>Return at the right moment</h3><p>Search naturally or let a related note surface beside your draft. Your past thinking becomes useful again.</p></article>
        </div>
      </section>

      <section className="v1-features section-pad" aria-labelledby="v1-features-title">
        <div className="section-heading" data-reveal><h2 id="v1-features-title">Less filing.<br />More finding.</h2><p>Your archive should grow more useful, not more demanding.</p></div>
        <div className="v1-feature-ledger">
          {capabilities.map((capability, index) => (
            <article key={capability.title} data-reveal>
              <span>{capability.short}</span><h3>{capability.title}</h3><p>{capability.body}</p>
              <div className={`v1-feature-proof v1-feature-proof--${index + 1}`} data-ui>
                <strong>{index === 0 ? "New thought" : index === 1 ? "Beside this note" : index === 2 ? "Recall" : "Your space"}</strong>
                <p>{index === 0 ? "“Call the garden centre about ferns.”" : index === 1 ? "The attention residue essay" : index === 2 ? "“that idea about quiet mornings”" : "End-to-end encrypted"}</p>
                <span>{index === 3 ? "Only you hold the key" : "Saved just now"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="v1-pricing section-pad" id="pricing" aria-labelledby="v1-pricing-title">
        <div data-reveal><h2 id="v1-pricing-title">A clear price.<br />A lasting archive.</h2><p>Begin with the essentials. Move up when your second brain becomes part of every day.</p></div>
        <div className="v1-price-menu" data-reveal>
          <div><h3>For getting started</h3><p>Up to 1,000 notes, natural search, offline capture, and complete exports.</p><strong>Free</strong><a href="#start">Begin there</a></div>
          <div><h3>For a lifetime of thinking</h3><p>Unlimited notes, connected recall, encrypted sync, and attachment history.</p><strong>$8 <span>/ month</span></strong><a href="#start">Make it yours</a></div>
        </div>
      </section>

      <section className="v1-faq section-pad" aria-labelledby="v1-faq-title">
        <h2 id="v1-faq-title" data-reveal>Good questions.</h2><div data-reveal><FaqList /></div>
      </section>

      <section className="v1-start section-pad" id="start" aria-labelledby="v1-start-title">
        <h2 id="v1-start-title" data-reveal>Give thoughts<br />a home.</h2><div data-reveal><WaitlistForm /></div>
      </section>
      <Footer current={1} />
    </main>
  );
}
