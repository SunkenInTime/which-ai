import Image from "next/image";
import Link from "next/link";
import { Demo, DemoButton } from "./demo";
import { designs, type Design } from "./designs";
import { BrandMark, Icon } from "./ui-icons";

const copy = {
  "1": {
    featureTitle: "Turn thoughts into ideas.",
    features: [
      ["Capture freely", "Give fleeting ideas, links, and loose notes a place to land."],
      ["Connect the dots", "Link one note to another and see where an idea can take you."],
      ["Find it again", "Pick up a train of thought right where you left it."],
    ],
  },
  "2": {
    featureTitle: "Follow the thread.",
    features: [
      ["Frictionless capture", "Get the thought down while it’s still fresh."],
      ["A living graph", "See the connections forming across your notes."],
      ["Fast retrieval", "Find the original idea and everything it led to."],
    ],
  },
  "3": {
    featureTitle: "Give your ideas time to grow.",
    features: [
      ["Plant a seed", "Save the line, the question, or the little thing you noticed."],
      ["Make a connection", "Bring two notes together and see what they have in common."],
      ["Revisit your notes", "Return to a half-formed thought when you’re ready."],
    ],
  },
  "4": {
    featureTitle: "Get it out of your head.",
    features: [
      ["Write it down", "A single inbox for rough ideas, quotes, and quick reminders."],
      ["Make it click", "Link related notes as your next project takes shape."],
      ["Pull it back up", "Find the note you need, even months after you wrote it."],
    ],
  },
  "5": {
    featureTitle: "Everything has a place.",
    features: [
      ["A home for every note", "Put daily plans, project ideas, and passing thoughts in one workspace."],
      ["Ideas that link together", "Group related thoughts with links that work across your workspace."],
      ["Right where you left it", "Find a favorite note or a forgotten idea in seconds."],
    ],
  },
} as const;

const featureIcons = ["write", "link", "search"] as const;

const questions = [
  ["What is a second brain?", "A second brain is a trusted place to save ideas and information outside your head, then connect and revisit them as you learn."],
  ["What can I keep in Morrow?", "Start with whatever you want to remember. Meeting notes, reading lists, project plans, and half-formed ideas can all live together."],
  ["What can I do in the demo?", "Open a sample note, make it your own, or create a new one. Your edits are available until you reload or leave the page."],
];

function Wordmark({ design }: { design: Design }) {
  return <Link href={`/without-design-skill/sol-6-2/${design}`} className="wordmark" aria-label="Morrow home"><BrandMark />morrow<span>.</span></Link>;
}

function Header({ design }: { design: Design }) {
  return (
    <header className="site-header wrap" id="top">
      <Wordmark design={design} />
      <nav aria-label="Main navigation" className="site-nav">
        <a href="#product">Product</a>
        <a href="#how-it-works">How it works</a>
        <a href="#faq">FAQ</a>
      </nav>
      <DemoButton className="header-action" arrow={false}>Open demo <Icon name="diagonal" size={15} /></DemoButton>
    </header>
  );
}

function HeroActions({ label = "Try Morrow", secondary = "See how it works" }: {
  label?: string;
  secondary?: string;
}) {
  return (
    <div className="hero-actions">
      <DemoButton>{label}</DemoButton>
      <a className="secondary-action" href="#how-it-works">{secondary}<Icon name="down" size={15} /></a>
    </div>
  );
}

function PaperHero() {
  return (
    <section className="paper-hero wrap" aria-labelledby="hero-title">
      <div className="paper-copy">
        <p className="eyebrow"><span />THE SECOND BRAIN FOR CURIOUS MINDS</p>
        <h1 id="hero-title">Make room<br />for better<br /><em>thoughts.</em></h1>
        <p className="hero-description">A second brain for everything you want to remember, connect, and come back to.</p>
        <HeroActions />
      </div>
      <figure className="paper-visual">
        <div className="paper-image">
          <Image src="/variants/without-design-skill/sol-6-2/art/paper.webp" fill alt="Folded pages of an ivory notebook forming a sculptural brain on a cobalt backdrop" sizes="(max-width: 720px) 92vw, 52vw" loading="eager" />
        </div>
        <figcaption><span><i /> The shape of a thought</span></figcaption>
      </figure>
    </section>
  );
}

function NetworkHero() {
  return (
    <section className="network-hero wrap" aria-labelledby="hero-title">
      <div className="network-copy">
        <p className="eyebrow"><span /> THE CONNECTED NOTEBOOK</p>
        <h1 id="hero-title">Think in<br /><em>connections.</em></h1>
        <p className="hero-description">A second brain that links what you know, so you can see what you might have missed.</p>
        <HeroActions label="Enter workspace" secondary="How it works" />
      </div>
      <figure className="graph-frame">
        <figcaption><span><Icon name="graph" size={16} /> Knowledge graph</span><span><i /> Linked notes</span></figcaption>
        <div className="graph-image">
          <Image src="/variants/without-design-skill/sol-6-2/art/network.webp" fill alt="A many-branched constellation of mint lines and glowing points representing linked notes" sizes="(max-width: 720px) 92vw, 52vw" loading="eager" />
          <span className="graph-label graph-field">Field notes</span>
          <span className="graph-label graph-ideas">New ideas</span>
          <span className="graph-label graph-reading">Reading list</span>
        </div>
        <div className="graph-legend"><span><i /> Note</span><span><i /> Connection</span></div>
      </figure>
    </section>
  );
}

function GardenHero() {
  return (
    <section className="garden-hero wrap" aria-labelledby="hero-title">
      <div className="garden-copy">
        <p className="eyebrow"><Icon name="sun" size={17} /> A PERSONAL KNOWLEDGE GARDEN</p>
        <h1 id="hero-title">Good ideas <em>grow together.</em></h1>
        <p className="hero-description">A quiet space to collect what you learn and see what your ideas become over time.</p>
        <HeroActions label="Start a notebook" />
      </div>
      <div className="garden-collage">
        <div className="garden-card garden-observation">
          <span className="garden-card-tag"><Icon name="note" size={15} /> Field notes</span>
          <p>Things I noticed<br />on the long<br />way home.</p>
          <span className="garden-card-foot">OBSERVATIONS</span>
        </div>
        <figure className="garden-photo">
          <div>
            <Image src="/variants/without-design-skill/sol-6-2/art/garden.webp" fill alt="Green fern leaves resting on an open notebook and olive linen" sizes="(max-width: 720px) 68vw, 480px" loading="eager" />
          </div>
          <figcaption>Notes from the everyday</figcaption>
        </figure>
        <div className="garden-card garden-connection">
          <span className="garden-card-tag"><Icon name="link" size={15} /> Linked thought</span>
          <p>Paying attention<br />is a practice.</p>
          <span className="garden-card-foot">LINKED TO FIELD NOTES</span>
        </div>
      </div>
    </section>
  );
}

function StudioHero() {
  return (
    <section className="studio-hero wrap" aria-labelledby="hero-title">
      <div className="studio-stage">
        <div className="studio-image">
          <Image src="/variants/without-design-skill/sol-6-2/art/clip.webp" fill alt="A dark binder clip gripping a fan of off-white notes against a bright orange backdrop" sizes="(max-width: 720px) 94vw, 53vw" loading="eager" />
        </div>
        <div className="studio-copy">
          <p className="eyebrow"><Icon name="inbox" size={17} /> THE INBOX FOR YOUR BRAIN</p>
          <h1 id="hero-title">Catch the<br />thought.</h1>
          <p className="hero-description">Ideas move fast. Morrow gives every one of them a place to land.</p>
          <HeroActions label="Open notebook" secondary="See the workflow" />
        </div>
      </div>
      <div className="studio-ribbon" aria-hidden="true">
        <span>QUICK NOTES</span><b>✳</b><span>CONNECTED IDEAS</span><b>✳</b><span>PERSONAL WIKI</span><b>✳</b><span>PROJECT INBOX</span>
      </div>
    </section>
  );
}

function WorkspacePreview() {
  return (
    <div className="workspace-preview" aria-label="Preview of the Morrow workspace">
      <div className="workspace-bar">
        <span className="workspace-dots" aria-hidden="true"><i /><i /><i /></span>
        <span><Icon name="note" size={13} /> My workspace</span>
        <Icon name="search" size={15} />
      </div>
      <div className="workspace-columns">
        <div className="workspace-sidebar">
          <div><BrandMark /> Personal space</div>
          <p><Icon name="inbox" size={15} /> Inbox</p>
          <p className="workspace-selected"><Icon name="sun" size={15} /> Daily notes</p>
          <p><Icon name="note" size={15} /> Reading list</p>
          <p><Icon name="graph" size={15} /> Idea graph</p>
        </div>
        <div className="workspace-note">
          <span className="workspace-crumb">Daily notes <span>›</span> Tuesday</span>
          <span className="workspace-sun"><Icon name="sun" size={20} /></span>
          <h2>Tuesday thoughts</h2>
          <p>Follow up on the ideas that came up on our walk.</p>
          <div className="workspace-link"><Icon name="link" size={15} /> Field notes from the long way home</div>
        </div>
        <div className="workspace-related">
          <span><Icon name="graph" size={16} /> Linked notes</span>
          <p><Icon name="note" size={14} /> Field notes</p>
          <p><Icon name="note" size={14} /> Little rituals</p>
        </div>
      </div>
    </div>
  );
}

function CloudHero() {
  return (
    <section className="cloud-hero" aria-labelledby="hero-title">
      <div className="cloud-backdrop">
        <Image src="/variants/without-design-skill/sol-6-2/art/cloud.webp" fill alt="" sizes="100vw" loading="eager" />
      </div>
      <div className="cloud-copy wrap">
        <p className="eyebrow"><BrandMark /> YOUR MIND, WITH MORE SPACE</p>
        <h1 id="hero-title">A home for your<br /><em>whole mind.</em></h1>
        <p className="hero-description">From today’s to-do list to the idea you can’t stop thinking about, keep it all in one connected workspace.</p>
        <HeroActions label="Explore the demo" />
      </div>
      <WorkspacePreview />
    </section>
  );
}

const heroes = {
  "1": PaperHero,
  "2": NetworkHero,
  "3": GardenHero,
  "4": StudioHero,
  "5": CloudHero,
};

function Features({ design }: { design: Design }) {
  const content = copy[design];

  return (
    <section className="feature-strip wrap" id="product" aria-labelledby="features-title">
      <div className="feature-intro">
        <p className="eyebrow">THE MORROW WORKFLOW</p>
        <h2 id="features-title">{content.featureTitle}</h2>
      </div>
      {content.features.map(([title, description], index) => (
        <article className="feature" key={title}>
          <span className="feature-icon"><Icon name={featureIcons[index]} size={21} /></span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="workflow wrap" id="how-it-works" aria-labelledby="workflow-title">
      <div className="workflow-copy">
        <p className="eyebrow">HOW IT WORKS</p>
        <h2 id="workflow-title">Start with one thought.</h2>
        <p>Write a note in the moment. When it reminds you of another idea, link the two. The next time you open either note, you’ll have a thread to follow.</p>
        <DemoButton>Try it with a note</DemoButton>
      </div>
      <div className="workflow-example">
        <div className="example-card">
          <span><Icon name="note" size={16} /> Field notes</span>
          <p>Take the long way home and notice what’s changed.</p>
        </div>
        <span className="example-link"><Icon name="link" size={17} /></span>
        <div className="example-card">
          <span><Icon name="note" size={16} /> Little rituals</span>
          <p>Make some room in the week for a walk without a plan.</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq wrap" id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">A few questions</h2>
      <div>
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<Icon name="plus" size={19} /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Landing({ design }: { design: Design }) {
  const Hero = heroes[design];

  return (
    <div className={`site ${designs[design].theme}`}>
      <Demo>
        <Header design={design} />
        <main>
          <Hero />
          <Features design={design} />
          <HowItWorks />
          <Faq />
        </main>
        <footer className="site-footer wrap">
          <Wordmark design={design} />
          <p>A second brain for your notes.</p>
          <a href="#top">Back to top <Icon name="diagonal" size={15} /></a>
        </footer>
      </Demo>
      {/* Gallery adaptation: the model's design switcher isn't rendered; the gallery has its own. */}
    </div>
  );
}
