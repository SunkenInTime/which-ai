import Image from "next/image";
import { CaptureSection, SiteFooter, SiteHeader } from "./components/site-parts";

function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="primary-action" href="#capture">Try capture <span aria-hidden="true">↗</span></a>
      <a className="secondary-action" href="#method">See the method <span aria-hidden="true">↓</span></a>
    </div>
  );
}

export function EditorialLanding() {
  return (
    <main id="top" className="landing landing-one">
      <SiteHeader />
      <section className="hero hero-one">
        <div className="hero-copy">
          <p className="hero-eyebrow">A home for your thinking</p>
          <h1>Make room for <em>every</em> thought.</h1>
          <p className="hero-description">Catch what matters, connect what you know, and find the right idea when you need it.</p>
          <HeroActions />
        </div>
        <div className="hero-image hero-image-one">
          <Image src="/variants/with-taste-skill/sol-6/visuals/editorial-cards.png" alt="A stack of white note cards with one cobalt card and binder clips" fill sizes="(max-width: 768px) 100vw, 58vw" loading="eager" fetchPriority="high" />
        </div>
      </section>
      <section id="method" className="one-method section-shell">
        <div className="one-method-heading">
          <h2>Ideas have a way of finding each other.</h2>
          <p>Margin gives them a place to meet. Save a passing thought, then follow the connections as they grow.</p>
        </div>
        <div className="one-feature-list">
          <article><span>Capture</span><h3>Write it down while it is fresh.</h3><p>A sentence is enough. Start small and keep moving.</p></article>
          <article><span>Connect</span><h3>Put related thoughts together.</h3><p>One note can lead you back to another at the right moment.</p></article>
          <article><span>Return</span><h3>Find more than you remembered.</h3><p>Follow the thread from a question to an older insight.</p></article>
        </div>
      </section>
      <section className="one-statement section-shell">
        <p>The best ideas deserve more than a folder.</p>
        <div className="one-statement-photo">
          <Image src="/variants/with-taste-skill/sol-6/visuals/blue-pages.png" alt="White papers fanned around one blue sheet" fill sizes="(max-width: 768px) 100vw, 46vw" />
        </div>
      </section>
      <CaptureSection title="Start with one thought." body="You do not need a system before you begin. Just write down the thing you want to remember." />
      <SiteFooter />
    </main>
  );
}

export function DarkLanding() {
  return (
    <main id="top" className="landing landing-two">
      <SiteHeader />
      <section className="hero hero-two">
        <div className="hero-image hero-image-two">
          <Image src="/variants/with-taste-skill/sol-6/visuals/dark-archive.png" alt="A dark archive box holding neatly filed paper notes" fill sizes="100vw" loading="eager" fetchPriority="high" />
        </div>
        <div className="hero-copy">
          <p className="hero-eyebrow">Your ideas, close at hand</p>
          <h1>Everything you know, within reach.</h1>
          <p className="hero-description">Turn scattered notes into a place you can think from, not just search through.</p>
          <HeroActions />
        </div>
      </section>
      <section id="method" className="two-method section-shell">
        <h2>Less searching.<br /><span>More finding.</span></h2>
        <div className="two-steps">
          <article><h3>Catch it</h3><p>Save the thought before it slips away.</p></article>
          <article><h3>Give it context</h3><p>Place it beside the ideas it belongs with.</p></article>
          <article><h3>Use it again</h3><p>Return to what you know when new work begins.</p></article>
        </div>
      </section>
      <section className="two-focus section-shell">
        <div className="two-focus-photo">
          <Image src="/variants/with-taste-skill/sol-6/visuals/dark-detail.png" alt="A hand selecting one paper card from an archive" fill sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="two-focus-copy">
          <h2>A quieter kind of clarity.</h2>
          <p>When your thoughts have a home, there is less to hold in your head. Focus on the next idea instead.</p>
        </div>
      </section>
      <CaptureSection title="Put a thought somewhere useful." body="Try a quick capture. The demo keeps your notes in this browser so you can come back to them." />
      <SiteFooter />
    </main>
  );
}

export function PlayfulLanding() {
  return (
    <main id="top" className="landing landing-three">
      <SiteHeader />
      <section className="hero hero-three">
        <div className="hero-copy">
          <p className="hero-eyebrow">A little less mental clutter</p>
          <h1>Keep the spark.<br />Lose the clutter.</h1>
          <p className="hero-description">Catch ideas the moment they arrive, then find them when you need them.</p>
          <HeroActions />
        </div>
        <div className="hero-image hero-image-three">
          <Image src="/variants/with-taste-skill/sol-6/visuals/playful-notes.png" alt="Stacks of bright yellow and green paper balanced with playful shapes" fill sizes="(max-width: 768px) 100vw, 54vw" loading="eager" fetchPriority="high" />
        </div>
      </section>
      <section id="method" className="three-method section-shell">
        <h2>For all the thoughts that show up uninvited.</h2>
        <div className="three-feature-grid">
          <article><span aria-hidden="true">↗</span><h3>Catch the spark.</h3><p>When an idea shows up, give it a place to land.</p></article>
          <article><span aria-hidden="true">∞</span><h3>Let it grow.</h3><p>Link one thought to another and see what opens up.</p></article>
          <article><span aria-hidden="true">⌕</span><h3>Find it again.</h3><p>Your best ideas should never depend on perfect memory.</p></article>
        </div>
      </section>
      <section className="three-statement section-shell">
        <div className="three-statement-photo">
          <Image src="/variants/with-taste-skill/sol-6/visuals/playful-detail.png" alt="Blank green and yellow notes spread across a sunny desk" fill sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <p>Good thinking is messy. Your notes can still make sense.</p>
      </section>
      <CaptureSection title="Give that thought a home." body="A quick note is the start of something. Try the capture demo and see how easy it feels." />
      <SiteFooter />
    </main>
  );
}

export function TypographicLanding() {
  return (
    <main id="top" className="landing landing-four">
      <SiteHeader />
      <section className="hero hero-four">
        <div className="hero-copy">
          <p className="hero-eyebrow">Think beyond the page</p>
          <h1>Thoughts in.<br /><span>Connections out.</span></h1>
          <div className="four-hero-bottom">
            <p className="hero-description">A clear space to collect what you learn and discover what it adds up to.</p>
            <HeroActions />
          </div>
        </div>
        <div className="hero-image hero-image-four">
          <Image src="/variants/with-taste-skill/sol-6/visuals/blue-pages.png" alt="A fan of white papers with a single vivid blue sheet" fill sizes="100vw" loading="eager" fetchPriority="high" />
        </div>
      </section>
      <section id="method" className="four-method section-shell">
        <h2>Thinking does not happen in straight lines.</h2>
        <div className="four-grid">
          <article><span>Write</span><p>Start with the thought in front of you. A note is enough.</p></article>
          <article><span>Relate</span><p>Notice what connects. Let ideas build on one another.</p></article>
          <article><span>Recall</span><p>Bring useful knowledge back into your work.</p></article>
        </div>
      </section>
      <section className="four-large-type section-shell">
        <p>Keep the thread.</p>
        <div className="four-line" aria-hidden="true" />
        <div className="four-detail-photo">
          <Image src="/variants/with-taste-skill/sol-6/visuals/blue-detail.png" alt="Folded white and cobalt paper in a geometric arrangement" fill sizes="(max-width: 768px) 100vw, 90vw" />
        </div>
        <p>Follow the thought.</p>
      </section>
      <CaptureSection title="Write the first line." body="A second brain starts with one note. Use this small local demo to save a thought now." />
      <SiteFooter />
    </main>
  );
}

export function NatureLanding() {
  return (
    <main id="top" className="landing landing-five">
      <SiteHeader />
      <section className="hero hero-five">
        <div className="hero-image hero-image-five">
          <Image src="/variants/with-taste-skill/sol-6/visuals/green-archive.png" alt="Archival paper cards resting beside a fern and a smooth stone" fill sizes="100vw" loading="eager" fetchPriority="high" />
        </div>
        <div className="hero-copy">
          <p className="hero-eyebrow">A place to remember</p>
          <h1>Keep the things you don&apos;t want to lose.</h1>
          <p className="hero-description">Give your ideas room to settle, connect, and return when you need them.</p>
          <HeroActions />
        </div>
      </section>
      <section id="method" className="five-method section-shell">
        <div className="five-intro"><h2>Some thoughts are worth keeping close.</h2><p>Margin makes a quiet place for them, from passing observations to the ideas that shape your work.</p></div>
        <div className="five-journey">
          <article><span>Write freely</span><p>Capture what is on your mind before it fades.</p></article>
          <article><span>Make connections</span><p>See familiar ideas from a new angle.</p></article>
          <article><span>Find your way back</span><p>Return to a thought when it becomes useful.</p></article>
        </div>
      </section>
      <section className="five-statement section-shell">
        <div className="five-statement-photo">
          <Image src="/variants/with-taste-skill/sol-6/visuals/green-detail.png" alt="A blank note resting beneath soft fern shadows" fill sizes="(max-width: 768px) 100vw, 48vw" />
        </div>
        <h2>Let your knowledge take root.</h2>
      </section>
      <CaptureSection title="Start where you are." body="There is no setup to get right. Save one thought in the local demo and build from there." />
      <SiteFooter />
    </main>
  );
}
