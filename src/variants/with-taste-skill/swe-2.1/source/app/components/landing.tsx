import type { ReactNode } from "react";

export const variantMeta = {
  "1": {
    short: "graph memory",
    description: "A precise pink-accented landing page for notes linked into a personal memory graph.",
  },
  "2": {
    short: "research archive",
    description: "A warm editorial landing page for a second brain built around sources and research.",
  },
  "3": {
    short: "assistant notes",
    description: "An airy software landing page for AI notes that answer with citations.",
  },
  "4": {
    short: "recall engine",
    description: "A dark technical landing page for notes that resurface at the right moment.",
  },
  "5": {
    short: "commonplace book",
    description: "A calm literary landing page for a working commonplace book and weekly review.",
  },
} as const;

export type Variant = keyof typeof variantMeta;

export function isVariant(value: string): value is Variant {
  return value in variantMeta;
}

const variants = Object.keys(variantMeta) as Variant[];

function Logo({ variant }: { variant: Variant }) {
  return (
    <a className="logo" href="#main" aria-label="Notomind home">
      <span className={`logo-mark logo-mark--${variant}`} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>Notomind</span>
    </a>
  );
}

function Header({ variant }: { variant: Variant }) {
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a className="skip-link" href="#main">Skip to content</a>
        <Logo variant={variant} />
        <nav className="nav-links" aria-label="Page sections">
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#memory">Memory</a>
          <a href="#access">Access</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-signin" href="#access">Sign in</a>
          <a className="button button-primary button-small" href="#access">Request beta access</a>
        </div>
      </div>
    </header>
  );
}

const SHOW_SOURCE_DOCK = false;

function VariantDock({ current }: { current: Variant }) {
  return (
    <nav className="variant-dock" aria-label="Design iterations">
      <span className="dock-label">Iteration</span>
      {variants.map((variant) => (
        <a
          key={variant}
          href={`/${variant}`}
          aria-current={variant === current ? "page" : undefined}
          aria-label={`Open iteration ${variant}`}
        >
          {variant}
        </a>
      ))}
    </nav>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2 7h8M6.5 3.5 10 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionIntro({ kicker, title, children, invert = false }: {
  kicker: string;
  title: string;
  children?: ReactNode;
  invert?: boolean;
}) {
  return (
    <div className={`section-intro${invert ? " section-intro--invert" : ""}`}>
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      {children ? <p className="section-lead">{children}</p> : null}
    </div>
  );
}

function WindowShell({ label, children, className = "" }: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`window-shell ${className}`} role="img" aria-label={label}>
      <div className="window-chrome" aria-hidden="true">
        <span className="chrome-dots"><i /><i /><i /></span>
        <span className="chrome-title">{label}</span>
        <span className="chrome-command">⌘K</span>
      </div>
      {children}
    </div>
  );
}

function SidebarNotes() {
  const rows = [
    ["IN", "Inbox", "12"],
    ["RD", "Reading", "31"],
    ["WR", "Writing", "8"],
    ["EV", "Evergreen", "46"],
  ];
  return (
    <aside className="mock-sidebar" aria-hidden="true">
      {rows.map(([key, label, count], index) => (
        <span className={index === 1 ? "is-active" : ""} key={label}>
          <b>{key}</b>{label}<em>{count}</em>
        </span>
      ))}
      <div className="mock-sidebar-foot">Local vault · synced 09:42</div>
    </aside>
  );
}

function NoteList() {
  const notes = [
    ["Mara Voss", "Habitat corridors", "linked to Urban wetlands", "2m"],
    ["Jonas Reid", "Memory palaces", "3 new highlights", "18m"],
    ["Iris Chen", "Permaculture notes", "source verified", "42m"],
    ["Noor Aziz", "Attention residue", "needs synthesis", "1h"],
    ["Kai Weber", "Mushroom foraging", "ready for review", "2h"],
    ["Elif Demir", "Zettel methods", "6 backlinks", "3h"],
  ];
  return (
    <div className="note-list" aria-hidden="true">
      <div className="list-head"><span>Owner</span><span>Note</span><span>Status</span><span>Age</span></div>
      {notes.map(([who, title, status, age]) => (
        <div className="note-row" key={title}>
          <span className="avatar">{who.split(" ").map((x) => x[0]).join("")}</span>
          <b>{title}</b>
          <span>{status}</span>
          <time>{age}</time>
        </div>
      ))}
    </div>
  );
}

function EditorPane({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`editor-pane${compact ? " editor-pane--compact" : ""}`} aria-hidden="true">
      <div className="doc-toolbar"><span>Evergreen note</span><b>Urban wetlands</b><em>4 sources</em></div>
      <h3>Wetlands make the city porous</h3>
      <p>
        A wetland is infrastructure before it is scenery. It stores water, slows runoff and gives a district
        a margin of error during a storm.
      </p>
      <p className="highlight-line">
        The useful question is not how much green a city adds, but how much water its ground can hold.
      </p>
      <div className="backlink-box">
        <span>Linked from</span>
        <b>Flood-plain housing</b>
        <b>Reading: Sponge cities</b>
      </div>
    </article>
  );
}

function GraphVisual({ dense = false }: { dense?: boolean }) {
  return (
    <div className={`graph-visual${dense ? " graph-visual--dense" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 520 420" preserveAspectRatio="xMidYMid meet">
        <path className="edge" d="M260 210 140 112M260 210 388 116M260 210 128 310M260 210 390 304M140 112 196 52M388 116 318 48M128 310 78 238M390 304 448 228M196 52 318 48M78 238 140 112" />
        <g className="node node-core"><circle cx="260" cy="210" r="43"/><text x="260" y="207">Memory</text><text x="260" y="224">46 notes</text></g>
        <g className="node"><circle cx="140" cy="112" r="29"/><text x="140" y="116">Reading</text></g>
        <g className="node"><circle cx="388" cy="116" r="29"/><text x="388" y="120">Sources</text></g>
        <g className="node"><circle cx="128" cy="310" r="29"/><text x="128" y="314">Writing</text></g>
        <g className="node"><circle cx="390" cy="304" r="29"/><text x="390" y="308">Review</text></g>
        <g className="node node-small"><circle cx="196" cy="52" r="17"/><circle cx="318" cy="48" r="17"/><circle cx="78" cy="238" r="17"/><circle cx="448" cy="228" r="17"/></g>
      </svg>
      <div className="graph-chip graph-chip-a">highlight attached</div>
      <div className="graph-chip graph-chip-b">3 backlinks</div>
    </div>
  );
}

function CapturePanel() {
  const items = [
    ["PDF", "Sponge cities, chapter 4", "12 highlights"],
    ["WEB", "The geography of memory", "read later"],
    ["VOICE", "Idea for the wetland essay", "0:38"],
    ["IMG", "Diagram: retention basin", "tagged"],
  ];
  return (
    <div className="capture-panel" aria-hidden="true">
      <div className="panel-title">Capture inbox</div>
      {items.map(([type, title, meta]) => (
        <div className="capture-item" key={title}>
          <span>{type}</span><b>{title}</b><em>{meta}</em>
        </div>
      ))}
      <div className="capture-input">Drop a link, file or thought</div>
    </div>
  );
}

function AssistantPanel() {
  return (
    <div className="assistant-panel" aria-hidden="true">
      <div className="ask-row"><span>Ask</span><b>What have I already learned about sponge cities?</b></div>
      <div className="tool-row">Reading 8 notes · checking 14 sources</div>
      <div className="answer-card">
        <p>
          Your notes treat sponge cities as a water-storage problem, not a planting style. The strongest
          supporting source is the Rotterdam retention study you saved on 12 May.
        </p>
        <div className="sources"><span>Urban wetlands</span><span>Flood-plain housing</span><span>Rotterdam study</span></div>
      </div>
      <div className="answer-actions"><span>Copy answer</span><span>Open sources</span></div>
    </div>
  );
}

function ReviewPanel() {
  return (
    <div className="review-panel" aria-hidden="true">
      <div className="review-head"><span>Today’s recall</span><b>6 notes</b></div>
      {[
        ["Attention residue", "What did Sophie Leroy measure?", "due now"],
        ["Urban wetlands", "Storage before scenery", "3 days"],
        ["Memory palaces", "Place, image, order", "6 days"],
      ].map(([title, question, due], index) => (
        <div className={`review-card${index === 0 ? " is-current" : ""}`} key={title}>
          <b>{title}</b><span>{question}</span><em>{due}</em>
        </div>
      ))}
    </div>
  );
}

function FullProductWindow({ mode }: { mode: "graph" | "assistant" | "editor" | "review" }) {
  return (
    <WindowShell label="Notomind · memory workspace" className={`product-window product-window--${mode}`}>
      <div className="app-frame-grid">
        <SidebarNotes />
        <div className="app-main">
          {mode === "graph" ? <><NoteList /><div className="split-pane"><EditorPane compact /><GraphVisual dense /></div></> : null}
          {mode === "assistant" ? <><NoteList /><div className="split-pane"><AssistantPanel /><EditorPane compact /></div></> : null}
          {mode === "editor" ? <><NoteList /><div className="split-pane split-pane--wide"><EditorPane /><CapturePanel /></div></> : null}
          {mode === "review" ? <><NoteList /><div className="split-pane"><ReviewPanel /><GraphVisual dense /></div></> : null}
        </div>
      </div>
    </WindowShell>
  );
}

function MiniVisual({ type }: { type: "capture" | "link" | "recall" | "export" | "source" | "privacy" }) {
  return (
    <div className={`mini-visual mini-visual--${type}`} aria-hidden="true">
      {type === "capture" ? <><span className="mini-pill">PDF</span><b>Chapter highlight</b><i /><i /><em>sent to inbox</em></> : null}
      {type === "link" ? <><span className="node-a" /><span className="node-b" /><svg viewBox="0 0 180 90"><path d="M35 48C72 8 105 8 145 44" /></svg><b>backlink created</b></> : null}
      {type === "recall" ? <><b>What did you save?</b><p>Storage before scenery</p><div><span>Show answer</span><span>Again</span></div></> : null}
      {type === "export" ? <><b>memory-export.md</b><p>46 notes · 14 sources</p><div className="export-lines"><i /><i /><i /></div></> : null}
      {type === "source" ? <><span className="mini-pill">p. 42</span><b>Rotterdam study</b><p>highlight keeps page and paragraph</p></> : null}
      {type === "privacy" ? <><b>Local vault</b><p>encrypted sync</p><div className="lock-shape" /></> : null}
    </div>
  );
}

function FeatureCard({ title, children, visual }: { title: string; children: ReactNode; visual: "capture" | "link" | "recall" | "export" | "source" | "privacy" }) {
  return (
    <article className="feature-card">
      <div className="feature-copy"><h3>{title}</h3><p>{children}</p></div>
      <MiniVisual type={visual} />
    </article>
  );
}

function AccessBlock({ variant }: { variant: Variant }) {
  return (
    <div className="access-grid">
      <div>
        <p className="eyebrow">Beta access</p>
        <h2>Request beta access</h2>
        <p className="section-lead">The first beta opens to a small group of readers, researchers and writers. Leave an email and we will send one invite when your platform is ready.</p>
        <ul className="plain-list">
          <li>Mac, Windows and web beta first</li>
          <li>Markdown export included from day one</li>
          <li>No card needed for the beta</li>
        </ul>
      </div>
      <form className="access-form" action="mailto:hello@notomind.example" method="post" encType="text/plain">
        <label htmlFor={`email-${variant}`}>Email</label>
        <input id={`email-${variant}`} name="email" type="email" autoComplete="email" placeholder="name@example.com" required />
        <label htmlFor={`platform-${variant}`}>Platform</label>
        <select id={`platform-${variant}`} name="platform" defaultValue="Mac">
          <option>Mac</option><option>Windows</option><option>Web</option>
        </select>
        <button className="button button-primary" type="submit">Request beta access<Arrow /></button>
        <p role="status" aria-live="polite">We reply only when an invite is ready.</p>
      </form>
    </div>
  );
}

function Footer({ variant }: { variant: Variant }) {
  return (
    <footer className="footer" id="contact">
      <div className="wrap footer-grid">
        <div className="footer-cta">
          <p className="eyebrow">Notomind</p>
          <h2>Keep what your mind cannot hold.</h2>
          <a className="button button-primary" href="#access">Request beta access<Arrow /></a>
        </div>
        <div className="footer-links">
          <Logo variant={variant} />
          <div>
            <h3>Page</h3>
            <a href="#product">Product</a>
            <a href="#workflow">Workflow</a>
            <a href="#memory">Memory</a>
          </div>
          <div>
            <h3>Access</h3>
            <a href="#access">Beta</a>
            <a href="#access">Sign in</a>
          </div>
        </div>
      </div>
      <div className="wrap legal"><span>© 2026 Notomind</span><span>Design study {variant} of 5</span></div>
    </footer>
  );
}

function GraphInterfaceHero() {
  return (
    <div className="hero-product hero-product--graph">
      <div className="floating-toolbar" aria-hidden="true"><span>⌘K</span><b>Search memory</b><em>46 notes</em></div>
      <GraphVisual />
      <div className="hero-note-card" aria-hidden="true">
        <span>Resurfaced</span>
        <b>Attention residue</b>
        <p>Context switching leaves part of the mind on the last task.</p>
      </div>
    </div>
  );
}

function SplitHero({ variant, eyebrow, title, lead, children }: {
  variant: Variant;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section data-enter className={`hero hero--split-screen hero-v${variant}`} id="main" aria-labelledby="hero-heading">
      <div className="wrap hero-split-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{eyebrow}</p>
          <h1 id="hero-heading">{title}</h1>
          <p className="hero-lead">{lead}</p>
          <div className="button-row">
            <a className="button button-primary" href="#access">Request beta access<Arrow /></a>
            <a className="button button-secondary" href="#product">See the product</a>
          </div>
          <dl className="hero-facts">
            <div><dt>Capture</dt><dd>1 inbox</dd></div>
            <div><dt>Memory</dt><dd>3 views</dd></div>
            <div><dt>Export</dt><dd>Markdown</dd></div>
          </dl>
        </div>
        <div className="hero-visual">{children}</div>
      </div>
    </section>
  );
}

function VariantOne() {
  return (
    <>
      <SplitHero
        variant="1"
        eyebrow="Private beta · local-first notes"
        title="Note-taking app for people who think in links"
        lead="Notomind turns notes, highlights and files into one memory you can search, cite and reuse. Every capture lands in one inbox before it joins the graph."
      >
        <GraphInterfaceHero />
      </SplitHero>
      <section className="screen product-section" id="product">
        <div className="wrap">
          <SectionIntro kicker="Product" title="Every note stays attached to its context">
            The library sits beside the open note, so a source, its highlight and the thought it caused never drift apart.
          </SectionIntro>
          <FullProductWindow mode="graph" />
        </div>
      </section>
      <section className="screen surface-section" id="workflow">
        <div className="wrap">
          <SectionIntro kicker="Workflow" title="Capture first, organise when it matters">
            Notomind keeps the first step small, then gives each note a way back into the work.
          </SectionIntro>
          <div className="feature-grid feature-grid--four">
            <FeatureCard title="Catches rough input" visual="capture">Drop links, PDFs, voice notes and fragments into one inbox with their source intact.</FeatureCard>
            <FeatureCard title="Builds deliberate links" visual="link">Backlinks are suggested, never forced; the note you confirm becomes part of the graph.</FeatureCard>
            <FeatureCard title="Resurfaces old notes" visual="recall">A short review brings back the notes most likely to matter in current work.</FeatureCard>
            <FeatureCard title="Exports clean files" visual="export">Every note leaves as readable Markdown with titles, links and source references.</FeatureCard>
          </div>
        </div>
      </section>
      <section className="screen statement-section" id="memory">
        <div className="wrap statement-wrap">
          <p className="statement-kicker">A second brain is not a bigger inbox.</p>
          <h2>It is a smaller distance between what you read and what you write.</h2>
          <div className="statement-strip"><span>read</span><i /><span>remember</span><i /><span>connect</span><i /><span>write</span></div>
        </div>
      </section>
      <section className="screen access-section" id="access"><div className="wrap"><AccessBlock variant="1" /></div></section>
    </>
  );
}

function TriptychPiece({ className, children }: { className: string; children: ReactNode }) {
  return <div className={`triptych-piece ${className}`} aria-hidden="true">{children}</div>;
}

function VariantTwo() {
  return (
    <>
      <section data-enter className="hero hero-triptych" id="main" aria-labelledby="hero-heading">
        <div className="wrap triptych-grid">
          <div className="triptych-copy">
            <p className="eyebrow">Research memory · beta</p>
            <h1 id="hero-heading">Note-taking app for research that sticks</h1>
            <p className="hero-lead">Keep the PDF, the page, your highlight and the thought it caused together from the first capture.</p>
          </div>
          <div className="triptych-visual">
            <TriptychPiece className="piece-inbox"><CapturePanel /></TriptychPiece>
            <TriptychPiece className="piece-note"><EditorPane compact /></TriptychPiece>
            <TriptychPiece className="piece-map"><GraphVisual dense /></TriptychPiece>
            <TriptychPiece className="piece-source"><MiniVisual type="source" /></TriptychPiece>
          </div>
          <div className="triptych-action">
            <a className="button button-primary" href="#access">Request beta access<Arrow /></a>
            <p>One inbox. Every source attached.</p>
          </div>
        </div>
      </section>
      <section className="screen product-section" id="product">
        <div className="wrap split-layout">
          <div className="text-column">
            <SectionIntro kicker="Sources" title="A highlight never leaves its evidence">
              Save the passage once. Notomind keeps the publication, page, paragraph and your own note in the same object.
            </SectionIntro>
            <div className="numbered-rows">
              <div><b>01</b><span>Clip the passage or drop the PDF.</span></div>
              <div><b>02</b><span>Write the thought in your own words.</span></div>
              <div><b>03</b><span>Link it to the project it changes.</span></div>
            </div>
          </div>
          <div className="visual-column warm-stack">
            <MiniVisual type="source" />
            <EditorPane compact />
          </div>
        </div>
      </section>
      <section className="screen surface-section" id="workflow">
        <div className="wrap">
          <SectionIntro kicker="Workflow" title="The archive grows in three quiet passes">
            Capture stays fast, sorting stays explicit, and synthesis happens when there is enough material to think with.
          </SectionIntro>
          <div className="chapter-layout">
            <div className="chapter-list">
              <article><span>Pass 1</span><h3>Collect without filing</h3><p>Everything enters the same inbox, even a voice note recorded on a walk.</p></article>
              <article><span>Pass 2</span><h3>Attach the source</h3><p>The citation, page and timestamp stay beside the passage they belong to.</p></article>
              <article><span>Pass 3</span><h3>Write the permanent note</h3><p>A weekly review turns clusters into short notes written in your own words.</p></article>
            </div>
            <div className="chapter-visual"><CapturePanel /><ReviewPanel /></div>
          </div>
        </div>
      </section>
      <section className="screen memory-band" id="memory">
        <div className="wrap memory-band-grid">
          <h2>Research you can leave, then trust again.</h2>
          <p>Notomind is built for the project paused for a month: the sources still say where they came from, and the notes still say why they mattered.</p>
        </div>
      </section>
      <section className="screen access-section" id="access"><div className="wrap"><AccessBlock variant="2" /></div></section>
    </>
  );
}

function VariantThree() {
  return (
    <>
      <section data-enter className="hero hero-centred-page" id="main" aria-labelledby="hero-heading">
        <div className="wrap centred-wrap">
          <a className="hero-pill" href="#product"><span>Assistant beta</span><b>Answers cite your notes</b></a>
          <h1 id="hero-heading">AI notes that answer with your sources</h1>
          <p className="hero-lead">Ask a question across everything you saved. Notomind answers from your own notes and shows the passages it used.</p>
          <div className="button-row"><a className="button button-primary" href="#access">Request beta access<Arrow /></a><a className="button button-secondary" href="#product">See it answer</a></div>
          <WindowShell label="Notomind · ask memory" className="centred-window"><AssistantPanel /></WindowShell>
        </div>
      </section>
      <section className="screen product-section" id="product">
        <div className="wrap">
          <SectionIntro kicker="Product" title="The answer opens beside the library">
            A response is only useful when its evidence is one click away, so citations sit in the same window as the notes behind them.
          </SectionIntro>
          <FullProductWindow mode="assistant" />
        </div>
      </section>
      <section className="screen surface-section" id="workflow">
        <div className="wrap">
          <SectionIntro kicker="Workflow" title="One memory across the tools you already read in">
            Browser clips, PDFs, Markdown files and quick notes enter the same library without turning it into a filing chore.
          </SectionIntro>
          <div className="integration-row">
            {[
              ["Browser clipper", "Saves page, author and selection"],
              ["PDF reader", "Keeps page and paragraph"],
              ["Markdown folder", "Imports links without lock-in"],
              ["Quick capture", "Writes before the thought leaves"],
            ].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="screen memory-split" id="memory">
        <div className="wrap split-layout">
          <div className="text-column">
            <SectionIntro kicker="Memory rules" title="The assistant stays inside your library">
              Answers cite your own notes first. Sync is encrypted, export is plain Markdown, and deletion removes the note from every index.
            </SectionIntro>
          </div>
          <div className="visual-column"><FeatureCard title="Private by construction" visual="privacy">Your vault remains yours; the assistant reads the library you choose, nothing outside it.</FeatureCard></div>
        </div>
      </section>
      <section className="screen access-section" id="access"><div className="wrap"><AccessBlock variant="3" /></div></section>
    </>
  );
}

function VariantFour() {
  return (
    <>
      <section data-enter className="hero hero-collage-dark" id="main" aria-labelledby="hero-heading">
        <div className="wrap hero-split-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Recall engine · private beta</p>
            <h1 id="hero-heading">Notes that come back when you need them</h1>
            <p className="hero-lead">Notomind resurfaces the right note inside review, writing and search, so memory becomes a system instead of a hope.</p>
            <div className="button-row"><a className="button button-primary" href="#access">Request beta access<Arrow /></a><a className="button button-secondary" href="#product">Inspect recall</a></div>
            <dl className="hero-facts"><div><dt>Queue</dt><dd>1 place</dd></div><div><dt>Review</dt><dd>6 cards</dd></div><div><dt>Vault</dt><dd>Local first</dd></div></dl>
          </div>
          <div className="hero-visual dark-collage">
            <WindowShell label="Notomind · capture queue" className="dark-window"><CapturePanel /></WindowShell>
            <div className="recall-float"><ReviewPanel /></div>
          </div>
        </div>
      </section>
      <section className="screen product-section" id="product">
        <div className="wrap">
          <SectionIntro kicker="Product" title="Recall sits inside the memory workspace" invert>
            The review queue, the note graph and the original source share one frame, so recall never becomes another app to check.
          </SectionIntro>
          <FullProductWindow mode="review" />
        </div>
      </section>
      <section className="screen surface-section dark-surface" id="workflow">
        <div className="wrap">
          <SectionIntro kicker="Workflow" title="A small review keeps the whole graph warm" invert>
            Six precise prompts a day beat a hundred cards you never open.
          </SectionIntro>
          <div className="console-grid">
            <div className="console-panel" aria-hidden="true">
              <div className="console-line"><span>09:00</span><b>Attention residue</b><em>remembered</em></div>
              <div className="console-line"><span>09:01</span><b>Wetland storage</b><em>again</em></div>
              <div className="console-line"><span>09:03</span><b>Memory palace order</b><em>remembered</em></div>
              <div className="console-meter"><i style={{ width: "68%" }} /></div>
            </div>
            <div className="console-copy"><h3>Recall is scheduled by use</h3><p>Notes return sooner when a project cites them, later when you remember them cleanly, and never as a gamified streak.</p></div>
          </div>
        </div>
      </section>
      <section className="screen memory-terminal" id="memory">
        <div className="wrap terminal-grid">
          <div><p className="eyebrow">Memory architecture</p><h2>Local notes. encrypted sync. plain files out.</h2></div>
          <div className="terminal-card" aria-hidden="true"><span>$ notomind export</span><p>46 notes written to memory-export.zip</p><p>links, citations and media preserved</p></div>
        </div>
      </section>
      <section className="screen access-section" id="access"><div className="wrap"><AccessBlock variant="4" /></div></section>
    </>
  );
}

function VariantFive() {
  return (
    <>
      <SplitHero
        variant="5"
        eyebrow="Commonplace book · beta"
        title="A commonplace book for work in progress"
        lead="Notomind keeps reading notes, drafts and references in one quiet place, then brings the right passage back while you write."
      >
        <WindowShell label="Notomind · writing desk" className="desk-window"><div className="desk-grid"><EditorPane /><ReviewPanel /></div></WindowShell>
      </SplitHero>
      <section className="screen product-section" id="product">
        <div className="wrap">
          <SectionIntro kicker="Product" title="The library sits beside the sentence">
            Notes are never a separate destination. The draft, its references and the passages behind them share one writing desk.
          </SectionIntro>
          <FullProductWindow mode="editor" />
        </div>
      </section>
      <section className="screen surface-section" id="workflow">
        <div className="wrap split-layout">
          <div className="text-column">
            <SectionIntro kicker="Workflow" title="Writing starts from material already gathered">
              Open a draft and the margin offers notes linked to its themes, without autocomplete trying to finish the thought for you.
            </SectionIntro>
            <div className="quote-card"><p>“A note matters when it changes the next sentence.”</p></div>
          </div>
          <div className="visual-column desk-side"><MiniVisual type="recall" /><MiniVisual type="export" /></div>
        </div>
      </section>
      <section className="screen memory-review" id="memory">
        <div className="wrap">
          <SectionIntro kicker="Weekly review" title="One hour turns fragments into permanent notes">
            The week ends with a small queue: merge duplicates, write the thought in your own words and archive what no longer matters.
          </SectionIntro>
          <div className="review-strip" aria-hidden="true">
            <div><b>Inbox</b><span>12</span></div><i /><div><b>Clusters</b><span>5</span></div><i /><div><b>Evergreen</b><span>7</span></div><i /><div><b>Archive</b><span>3</span></div>
          </div>
        </div>
      </section>
      <section className="screen access-section" id="access"><div className="wrap"><AccessBlock variant="5" /></div></section>
    </>
  );
}

export function LandingPage({ variant }: { variant: Variant }) {
  return (
    <div className={`page-root variant-${variant}`} data-type="software">
      <Header variant={variant} />
      <main>
        {variant === "1" ? <VariantOne /> : null}
        {variant === "2" ? <VariantTwo /> : null}
        {variant === "3" ? <VariantThree /> : null}
        {variant === "4" ? <VariantFour /> : null}
        {variant === "5" ? <VariantFive /> : null}
      </main>
      <Footer variant={variant} />
      {/* Gallery adaptation: the source's iteration dock isn't rendered; the gallery has its own switcher. */}
      {SHOW_SOURCE_DOCK ? <VariantDock current={variant} /> : null}
    </div>
  );
}
