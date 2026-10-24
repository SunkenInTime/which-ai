import { BrainSearch } from "../brain-search";
import { capabilities } from "../data";
import { FaqList, Footer, SiteNav, WaitlistForm } from "../chrome";

export function VersionTwo() {
  return (
    <main className="version version-two">
      <section className="v2-hero" aria-labelledby="v2-title">
        <SiteNav current={2} inverted />
        <div className="v2-hero__intro">
          <h1 id="v2-title" data-hero>A second brain<br />with recall.</h1>
          <div className="v2-hero__aside"><p>Morrow turns scattered notes into a living memory. Search the working sample below and open what comes back.</p><a className="v2-hero__cta" href="#start">Start for free</a></div>
        </div>
        <div className="v2-hero__product" data-hero><BrainSearch /></div>
      </section>

      <section className="v2-method section-pad" id="how" aria-labelledby="v2-method-title">
        <div className="section-heading" data-reveal><h2 id="v2-method-title">Your thoughts,<br />still in motion.</h2><p>A note is not the end of an idea. Morrow keeps its context close so you can pick up where you left off.</p></div>
        <div className="v2-timeline">
          <article data-reveal><span>At the moment of capture</span><h3>Keep everything, without the admin.</h3><p>Type, speak, clip, or forward. The original source and timestamp stay attached automatically.</p></article>
          <article data-reveal><span>As your archive grows</span><h3>See the thread between notes.</h3><p>Related reading, projects, and passing thoughts gather around the draft you are working on now.</p></article>
          <article data-reveal><span>When you come back</span><h3>Begin with a question, not a folder.</h3><p>Ask in natural language. Answers stay grounded in your notes, with every source one click away.</p></article>
        </div>
      </section>

      <section className="v2-features section-pad" aria-labelledby="v2-features-title">
        <h2 id="v2-features-title" data-reveal>Memory,<br />put to work.</h2>
        <div className="v2-feature-rows">
          {capabilities.map((capability, index) => (
            <article key={capability.title} data-reveal>
              <div><h3>{capability.title}</h3><p>{capability.body}</p></div>
              <div className={`v2-proof v2-proof--${index + 1}`} data-ui>
                <div className="v2-proof__bar"><span className="memory-mark" />Morrow <span>{capability.short}</span></div>
                <strong>{index === 0 ? "A walk, remembered" : index === 1 ? "3 connected notes" : index === 2 ? "Slower mornings" : "Private space"}</strong>
                <p>{index === 0 ? "Voice note · 00:18" : index === 1 ? "Reading note · Journal · Project" : index === 2 ? "Found by meaning, date, and your own words" : "Only your devices can read these notes"}</p>
                <span className="v2-proof__action">{index === 0 ? "Transcribed and saved" : index === 1 ? "Open the thread" : index === 2 ? "Open original note" : "Export archive"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-pricing section-pad" id="pricing" aria-labelledby="v2-pricing-title">
        <div className="section-heading" data-reveal><h2 id="v2-pricing-title">Free to start.<br />Yours to keep.</h2><p>No artificial limits on your own words. Every plan includes offline access and complete exports.</p></div>
        <div className="v2-prices">
          <article data-reveal><h3>Personal</h3><strong>$0</strong><p>For collecting the first thousand notes and making sense of them.</p><ul><li>Natural search</li><li>Offline capture</li><li>Complete export</li></ul><a href="#start">Start for free</a></article>
          <article data-reveal><h3>Morrow+</h3><strong>$8 <span>per month</span></strong><p>For a connected archive that stays with you across every device.</p><ul><li>Unlimited notes</li><li>Encrypted sync</li><li>Connected recall</li><li>Attachment history</li></ul><a href="#start">Request Morrow+</a></article>
        </div>
      </section>

      <section className="v2-faq section-pad" aria-labelledby="v2-faq-title">
        <div data-reveal><h2 id="v2-faq-title">Questions,<br />answered.</h2><p>Your notes are personal. The product should be easy to understand.</p></div><div data-reveal><FaqList /></div>
      </section>

      <section className="v2-start section-pad" id="start" aria-labelledby="v2-start-title">
        <div data-reveal><h2 id="v2-start-title">Make room<br />for every idea.</h2><p>Start with one note. Morrow will help you find your way back.</p></div><div data-reveal><WaitlistForm /></div>
      </section>
      <Footer current={2} />
    </main>
  );
}
