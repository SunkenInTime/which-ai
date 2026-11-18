import type { ReactNode } from "react";
import Link from "next/link";
import { DemoButton, DemoProvider } from "./demo";
import { Icon } from "./icons";
import { AtlasPreview, LibraryPreview } from "./previews";

export const editions = [
  { id: "1", name: "Signal", tone: "#c5dc72", theme: "signal" },
  { id: "2", name: "Field Notes", tone: "#ebbc5b", theme: "field" },
  { id: "3", name: "Atlas", tone: "#5169f3", theme: "atlas" },
  { id: "4", name: "After Hours", tone: "#c676a0", theme: "after" },
  { id: "5", name: "Commonplace", tone: "#f27357", theme: "common" },
] as const;

type Edition = (typeof editions)[number];

function Brand() {
  return <a className="brand" href="#top" aria-label="Morrow, back to top"><span className="brand-icon"><Icon name="mark" size={21} /></span><span>morrow</span></a>;
}

function DesignSwitcher({ design }: { design: Edition }) {
  return (
    <div className="design-switcher">
      <button className="switcher-toggle" type="button" popoverTarget="design-picker" aria-label={`Switch design, currently ${design.id} of 5: ${design.name}`}>
        <Icon name="grid" size={15} />
        <span>Design {design.id}<span className="switcher-total"> / 5</span></span>
        <Icon name="chevronUp" size={14} />
      </button>
      <nav className="switcher-options" id="design-picker" popover="auto" aria-label="Landing page designs">
        <p>Switch design</p>
        {editions.map(({ id, name, tone }) => (
          <Link href={`/${id}`} key={id} aria-current={design.id === id ? "page" : undefined}>
            <span className="switcher-swatch" style={{ background: tone }} /><span>{name}</span><span className="switcher-index">/{id}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function HeroActions({ label = "Try the demo", mode = "capture" }: { label?: string; mode?: "capture" | "search" }) {
  return (
    <div className="hero-actions">
      <DemoButton className="action primary-action" mode={mode}>{label}<Icon name="arrow" size={19} /></DemoButton>
      <a className="secondary-action" href="#workflow">See how it works<Icon name="down" size={17} /></a>
    </div>
  );
}

function SignalHero() {
  return (
    <section className="shell signal-hero">
      <div className="signal-copy">
        <p className="signal-category"><span /> Your second brain</p>
        <h1>Make room<br />for better<br />thinking.</h1>
        <p className="hero-description">A home for everything worth remembering. Capture ideas, connect the dots, and find what you need when you need it.</p>
        <HeroActions />
      </div>
      <div className="signal-art" role="img" aria-label="A luminous, tangled sphere of green fibers with two linked sample notes">
        <div className="signal-grid" />
        <div className="signal-threads" aria-hidden="true"><i /><i /><i /></div>
        <div className="signal-note signal-note-lime" aria-hidden="true">
          <div className="signal-note-meta"><Icon name="bolt" size={15} /> Quick thought</div>
          <strong>Everything starts<br />with a question.</strong>
          <span className="signal-note-tag">#ideas</span>
        </div>
        <div className="signal-note signal-note-glass" aria-hidden="true">
          <div className="signal-note-meta"><Icon name="notes" size={15} /> Linked note</div>
          <strong>The shape of an idea</strong>
          <p>Ideas grow through association.</p>
        </div>
        <div className="signal-art-caption" aria-hidden="true">
          <span><span className="signal-live-dot" /> A connected workspace</span>
          <Icon name="network" size={19} />
        </div>
      </div>
    </section>
  );
}

function FieldHero() {
  return (
    <section className="shell field-hero">
      <div className="field-copy">
        <p className="field-category"><Icon name="book" size={18} /> A digital commonplace book</p>
        <h1>The things<br />you notice<br />matter.</h1>
        <p className="hero-description">Keep the quotes, questions, and passing thoughts you want to come back to. Give them a place to meet.</p>
        <HeroActions label="Open the demo" />
      </div>
      <div className="field-scrapbook">
        <figure className="field-plate">
          <div className="field-photo" role="img" aria-label="A pressed purple flower in a handwritten field notebook" />
          <figcaption>From the collection <span>Ways of seeing</span></figcaption>
        </figure>
        <div className="field-clip" aria-hidden="true" />
        <div className="field-label" aria-hidden="true">Filed under<br /><strong>Observations</strong></div>
        <div className="field-note">
          <span>October 12</span>
          <strong>On paying attention</strong>
          <p>Take the same walk twice. On the second walk, look for what you missed the first time.</p>
          <span className="field-note-link"><Icon name="link" size={15} /> Ways of seeing</span>
        </div>
      </div>
    </section>
  );
}

function AtlasHero() {
  return (
    <section className="atlas-hero">
      <div className="shell atlas-intro">
        <h1>Follow the thought.</h1>
        <p className="hero-description">Write it down. Link it to something you know. Watch your notes turn into a map you can explore.</p>
        <HeroActions />
      </div>
      <div className="shell atlas-stage">
        <AtlasPreview />
      </div>
    </section>
  );
}

function AfterHero() {
  return (
    <section className="after-hero">
      <div className="after-image" aria-hidden="true" />
      <div className="shell after-inner">
        <div className="after-copy">
          <h1>Find the<br />thought again.</h1>
          <p className="hero-description">The line you underlined. The idea you had on the train. Morrow keeps your notes within reach, even when all you remember is a word.</p>
          <HeroActions label="Try searching" mode="search" />
        </div>
        <div className="after-preview">
          <DemoButton className="after-search" mode="search">
            <Icon name="search" size={21} />
            <span>Find a thought…</span>
            <Icon name="upRight" size={19} />
          </DemoButton>
          <div className="after-result">
            <Icon name="notes" size={19} />
            <div><strong>On paying attention</strong><p>Found in Observations</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommonHero() {
  return (
    <section className="shell common-hero">
      <div className="common-intro">
        <h1>All your thinking.<br />One place.</h1>
        <div>
          <p className="hero-description">Project notes, reading lists, and ideas for later. Make space for all of it in a library you can shape as you go.</p>
          <HeroActions label="Explore the demo" />
        </div>
      </div>
      <LibraryPreview />
    </section>
  );
}

const heroes: Record<Edition["theme"], () => ReactNode> = {
  signal: SignalHero,
  field: FieldHero,
  atlas: AtlasHero,
  after: AfterHero,
  common: CommonHero,
};

const features = [
  { icon: "bolt", heading: "Quick capture", copy: "Get it down while it’s fresh." },
  { icon: "link", heading: "Linked notes", copy: "See how your ideas fit together." },
  { icon: "search", heading: "Instant recall", copy: "Find it with a word you remember." },
] as const;

const workflow = [
  { title: "Write it down.", copy: "Save an idea, a quote, or a question as soon as it comes to you." },
  { title: "Make a connection.", copy: "Link your new note to something you already know. Related ideas stay a click away." },
  { title: "Come back to it.", copy: "Search for a word you remember or follow a link from another note." },
];

export function LandingPage({ design }: { design: Edition }) {
  const Hero = heroes[design.theme];
  return (
    <div className={`site theme-${design.theme}`} id="top">
      <DemoProvider>
        <header className="site-header shell">
          <Brand />
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#workflow">How it works</a>
          </nav>
          <DemoButton className="action header-action">Try the demo <Icon name="upRight" size={16} /></DemoButton>
        </header>
        <main>
          <Hero />
          <section id="features" className="shell feature-strip" aria-label="Features">
            {features.map(({ icon, heading, copy }) => (
              <article className="feature" key={heading}>
                <span className="feature-icon"><Icon name={icon} size={24} /></span>
                <div><h2>{heading}</h2><p>{copy}</p></div>
              </article>
            ))}
          </section>
          <section className="shell workflow" id="workflow" aria-labelledby="workflow-title">
            <div className="workflow-intro">
              <h2 id="workflow-title">From first thought to next idea.</h2>
              <DemoButton className="action primary-action">Try the demo <Icon name="arrow" size={18} /></DemoButton>
            </div>
            <ol>
              {workflow.map(({ title, copy }) => (
                <li key={title}><div><h3>{title}</h3><p>{copy}</p></div></li>
              ))}
            </ol>
          </section>
        </main>
        <footer className="shell site-footer">
          <Brand />
          <p>A second brain for your ideas.</p>
        </footer>
      </DemoProvider>
      {/* Gallery adaptation: the model's design switcher isn't rendered; the gallery has its own. */}
    </div>
  );
}
