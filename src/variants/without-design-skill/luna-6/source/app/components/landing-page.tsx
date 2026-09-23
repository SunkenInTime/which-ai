import Link from "next/link";

const directions = {
  1: {
    name: "Fieldnotes",
    eyebrow: "A quieter place for a busy mind",
    first: "A home for",
    second: "everything your",
    third: "mind collects.",
    description: "Save the thought. Find it when it matters. Fieldnotes connects the little things you notice into a second brain that feels like yours.",
    action: "Start your garden",
    secondary: "Take a 60-second tour",
    note: "Your ideas, growing together",
    signal: "2,408 thoughts connected",
    sectionTitle: "Good ideas like good company.",
    sectionCopy: "Drop in a quote, a passing thought, a page worth keeping. The connections show up when you need them.",
  },
  2: {
    name: "INDEX",
    eyebrow: "Your mind, with a search bar",
    first: "Notice more.",
    second: "Remember",
    third: "all of it.",
    description: "A fast, searchable home for the ideas, links, and half-finished thoughts you don't want to lose.",
    action: "Build your index",
    secondary: "See how it works",
    note: "Your thinking, in one place",
    signal: "Everything is findable",
    sectionTitle: "The thought you forgot. Found.",
    sectionCopy: "Search the way you think. INDEX finds the note, the quote, or that link you saved on a Tuesday three months ago.",
  },
  3: {
    name: "mindgarden",
    eyebrow: "Make room for the thought",
    first: "Let your ideas",
    second: "take the long",
    third: "way around.",
    description: "A soft place to collect what you're reading, learning, and wondering about. Patterns can wait until they're ready.",
    action: "Make a little room",
    secondary: "Wander through",
    note: "A thought found its people",
    signal: "Your week in bloom",
    sectionTitle: "Nothing has to be finished.",
    sectionCopy: "Keep the loose note. Add context later. Your garden makes space for ideas before you know what they're for.",
  },
  4: {
    name: "LOOM / MEMORY SYSTEM",
    eyebrow: "A personal knowledge system",
    first: "Everything",
    second: "you know",
    third: "threads together.",
    description: "Capture once. Connect as you go. LOOM turns your notes into a living map of what you're learning.",
    action: "Open your workspace",
    secondary: "View the system",
    note: "Live graph / 14,082 links",
    signal: "Your map is up to date",
    sectionTitle: "Built to think across notes.",
    sectionCopy: "Links form a useful map. Search and filters help you trace a line of thought back to where it started.",
  },
  5: {
    name: "sonder",
    eyebrow: "Your life has a lot of tabs open",
    first: "Keep the things",
    second: "you don't want",
    third: "to forget.",
    description: "A thoughtful home for the lines, plans, people, and little details that make up your life.",
    action: "Save a first thought",
    secondary: "Meet Sonder",
    note: "Little things, held onto",
    signal: "Sunday, September 20",
    sectionTitle: "Memory, with a little more care.",
    sectionCopy: "Save a sentence from a book, a place to come back to, or what you meant to ask someone. Find it again in your own words.",
  },
} as const;

function Mark({ version }: { version: number }) {
  return <span className={`brand-mark brand-mark-${version}`} aria-hidden="true"><i /><i /><i /><i /></span>;
}

function Brand({ version }: { version: number }) {
  const direction = directions[version as keyof typeof directions];
  return (
    <Link className="brand" href="/without-design-skill/luna-6/1" aria-label={`${direction.name} home`}>
      <Mark version={version} />
      <span>{direction.name}</span>
    </Link>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" /></svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10m-4-4 4 4-4 4" /></svg>
  );
}

function NoteCard({ className, label, title, copy }: { className: string; label: string; title: string; copy: string }) {
  return (
    <article className={`floating-note ${className}`}>
      <span className="note-label">{label}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function GardenPreview({ version }: { version: number }) {
  return (
    <div className={`preview-stage stage-${version}`}>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="orbit-center"><Mark version={version} /></div>
      <NoteCard className="note-a" label="READING NOTE · 2H AGO" title="Attention is a form of care." copy="A line from Jenny Odell that keeps following me around." />
      <NoteCard className="note-b" label="FRIDAY THOUGHT" title="Make a map, not a list." copy="What if the studio wall worked like a memory?" />
      <NoteCard className="note-c" label="SAVED · THE CREATIVE ACT" title="Trust the slow parts." copy="Related to: practice, process, patience" />
      <span className="map-caption">{directions[version as keyof typeof directions].note}</span>
      <span className="map-coordinate">35° 41′ 22″ N</span>
    </div>
  );
}

function AppWindow({ version }: { version: number }) {
  const direction = directions[version as keyof typeof directions];
  return (
    <div className={`app-window app-window-${version}`}>
      <aside className="app-sidebar">
        <div className="app-user"><span className="avatar">D</span><span>personal space</span><span className="tiny-chevron">⌄</span></div>
        <div className="app-search"><span className="search-glyph">⌕</span> Find anything <kbd>⌘ K</kbd></div>
        <div className="sidebar-label">YOUR SPACE</div>
        <div className="sidebar-link selected"><span className="sidebar-icon">◫</span> All notes <span className="sidebar-number">48</span></div>
        <div className="sidebar-link"><span className="sidebar-icon">✳</span> Daily notes</div>
        <div className="sidebar-link"><span className="sidebar-icon">⌘</span> Connections</div>
        <div className="sidebar-label sidebar-label-spaced">COLLECTIONS</div>
        <div className="sidebar-link"><span className="collection-dot dot-orange" /> Reading list</div>
        <div className="sidebar-link"><span className="collection-dot dot-blue" /> Things to make</div>
        <div className="sidebar-link"><span className="collection-dot dot-green" /> Small joys</div>
        <div className="app-sidebar-bottom"><span className="sidebar-avatar">DS</span><span>Dara&apos;s brain</span><span className="tiny-chevron">⌄</span></div>
      </aside>
      <section className="app-main">
        <div className="app-topline"><span className="crumb">All notes</span><span className="topline-status"><i /> All changes saved</span><button aria-label="More options">•••</button></div>
        <div className="app-content">
          <div className="app-kicker"><span className="kicker-spark">✳</span> {version === 4 ? "KNOWLEDGE GRAPH" : version === 2 ? "PERSONAL INDEX" : "YOUR SECOND BRAIN"}</div>
          <h2>{version === 2 ? "Find the thread." : version === 3 ? "A few things growing" : version === 5 ? "A life in notes." : version === 4 ? "Everything connects." : "Your mind, in the making."}</h2>
          <p className="app-subhead">{version === 2 ? "48 notes · indexed just now" : "A little more connected than yesterday."}</p>
          <div className="app-panel">
            <div className="panel-toolbar"><span>{direction.note}</span><button>↗</button></div>
            <GardenPreview version={version} />
          </div>
          <div className="app-insight"><span className="insight-spark">✳</span><span><b>A new connection.</b> Your note on attention is linked to 3 thoughts in <u>Reading list</u>.</span><span className="insight-arrow">↗</span></div>
        </div>
      </section>
    </div>
  );
}

function VersionTwoPreview() {
  return (
    <div className="index-board">
      <div className="board-head"><span>RECENTLY CAPTURED</span><span>VIEW ALL ↗</span></div>
      <div className="index-note index-note-large"><span className="index-label">01 / READING</span><h3>“Pay attention. Be astonished. Tell about it.”</h3><p>Mary Oliver · Upstream · saved from my notes</p><span className="index-link-pill">attention <span>↗ 4</span></span></div>
      <div className="index-row"><span className="index-emoji">✳</span><span><b>Ideas for the tiny studio</b><small>yesterday · 4 connections</small></span><span className="row-arrow">↗</span></div>
      <div className="index-row"><span className="index-emoji">↗</span><span><b>A useful way to think about practice</b><small>monday · 2 connections</small></span><span className="row-arrow">↗</span></div>
      <div className="index-searchbar"><span>⌕</span> Search your 2,408 notes <kbd>⌘ K</kbd></div>
    </div>
  );
}

function VersionThreePreview() {
  return (
    <div className="garden-cards">
      <div className="garden-toolbar"><span>YOUR COLLECTIONS</span><span className="garden-add">+ New thought</span></div>
      <div className="garden-card-row">
        <article className="garden-card garden-card-peach"><span>READING GARDEN</span><strong>Things that<br />stay with me</strong><div className="garden-sprout">✳</div><small>12 notes <i>·</i> 4 new blooms</small></article>
        <article className="garden-card garden-card-lilac"><span>PROJECT GARDEN</span><strong>Maybe a book<br />one day</strong><div className="garden-orbit-mark">◌</div><small>8 notes <i>·</i> just starting</small></article>
      </div>
      <div className="garden-footnote"><span className="garden-plant">✳</span><span><b>A quiet connection appeared</b><small>“Attention” is growing in two gardens.</small></span><span>↗</span></div>
    </div>
  );
}

function VersionFourPreview() {
  return (
    <div className="loom-graph">
      <div className="loom-graph-meta"><span>MAP / 0001</span><span>+ ADD A NODE</span></div>
      <svg className="loom-lines" viewBox="0 0 560 330" preserveAspectRatio="none" aria-hidden="true"><path d="M275 160 130 82M275 160 420 67M275 160 112 250M275 160 436 260M130 82 420 67M112 250 260 285M420 67 436 260M130 82 112 250" /></svg>
      <div className="loom-node node-center"><span>THE CREATIVE<br />PRACTICE</span><i>12</i></div>
      <div className="loom-node node-top-left">ATTENTION <i>4</i></div>
      <div className="loom-node node-top-right">PROCESS <i>8</i></div>
      <div className="loom-node node-bottom-left">DAILY NOTES <i>16</i></div>
      <div className="loom-node node-bottom-right">READING <i>21</i></div>
      <div className="loom-node node-lower">A SMALL STUDIO <i>3</i></div>
      <span className="loom-zoom">−　100%　+</span>
    </div>
  );
}

function VersionFivePreview() {
  return (
    <div className="sonder-journal">
      <div className="sonder-journal-head"><span>✳ SUNDAY NOTES</span><span>SEPTEMBER 20</span></div>
      <div className="journal-entry"><span className="journal-time">08:42</span><div><h3>At the little bookstore on Charles St.</h3><p>That woman at the counter recommended a book about paying attention. I forgot to ask her name. Go back soon.</p><div className="journal-tags"><span>places</span><span>people</span><span>come back to</span></div></div></div>
      <div className="journal-entry journal-entry-second"><span className="journal-time">10:16</span><div><h3>“To pay attention, this is our endless and proper work.”</h3><p>Mary Oliver, Upstream · remembered from Friday</p></div></div>
      <div className="sonder-thread"><span>↗</span> This connects to <b>Reading list</b> and <b>Places to return</b></div>
    </div>
  );
}

function Preview({ version }: { version: number }) {
  if (version === 2) return <VersionTwoPreview />;
  if (version === 3) return <VersionThreePreview />;
  if (version === 4) return <VersionFourPreview />;
  if (version === 5) return <VersionFivePreview />;
  return <AppWindow version={version} />;
}

function FeatureGlyph({ kind }: { kind: "capture" | "connect" | "return" }) {
  if (kind === "capture") return <span className="feature-glyph glyph-capture">↘</span>;
  if (kind === "connect") return <span className="feature-glyph glyph-connect">⌘</span>;
  return <span className="feature-glyph glyph-return">⌕</span>;
}

export default function LandingPage({ version }: { version: number }) {
  const direction = directions[version as keyof typeof directions];
  const features = version === 2
    ? [["Capture at the speed of thought", "Save a note, link, or quote before it slips away."], ["Search like a person", "Use the words you remember. Find what you meant."], ["Keep your own index", "Your notes stay yours, ready to export any time."]]
    : version === 3
      ? [["Start with a scrap", "A sentence is enough. Come back when you're ready."], ["Notice what grows", "Related notes find their way into the same garden."], ["Keep a little wonder", "There is no inbox zero for being a person."]]
      : version === 4
        ? [["Capture the signal", "Quick notes and daily logs keep the input flowing."], ["Link concepts as you go", "Build a map that reflects the way you actually think."], ["Follow a thread back", "Trace an idea to its source in a couple of clicks."]]
        : version === 5
          ? [["Hold onto a detail", "A place, a name, the sentence you want to remember."], ["Give it a little context", "A note connects to the people and moments around it."], ["Return in your own time", "Search your history by the feeling or detail you recall."]]
          : [["Catch a passing thought", "Save a quote, a link, or the idea on the walk home."], ["Let connections happen", "Related notes surface when they have something to say."], ["Find the thought again", "Search by a word, a feeling, or the thing it reminded you of."]];

  return (
    <main className={`landing landing-${version}`}>
      <div className="page-shell">
        <header className="site-header">
          <Brand version={version} />
          <nav className="main-nav" aria-label="Main navigation"><a href="#why">Why {direction.name}</a><a href="#how">How it works</a></nav>
          <div className="header-actions"><a className="login-link" href="#start">Log in</a><a className="header-cta" href="#start">Get started <Arrow diagonal /></a></div>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-mark">✳</span>{direction.eyebrow}</div>
            <h1 id="hero-title">{direction.first}<br /><span>{direction.second}</span><br /><em>{direction.third}</em></h1>
            <p className="hero-description">{direction.description}</p>
            <div className="hero-buttons"><a className="primary-button" href="#start">{direction.action}<Arrow /></a><a className="text-button" href="#how">{direction.secondary}<span>↗</span></a></div>
            <div className="hero-proof"><span className="proof-avatars"><i>D</i><i>M</i><i>J</i><i>A</i></span><span>Made for curious minds<br /><b>2,400+ thoughts, and counting</b></span></div>
          </div>
          <div className="hero-art" aria-label="Preview of the note-taking workspace">
            <div className="art-orbit art-orbit-outer" /><div className="art-orbit art-orbit-inner" />
            <div className="art-label"><span className="live-dot" />{direction.signal}</div>
            <Preview version={version} />
            <div className="art-index">{String(version).padStart(2, "0")} / 05</div>
          </div>
        </section>

        <section className="trusted-row" aria-label="Product principles"><span>YOUR THOUGHTS BELONG TO YOU</span><div className="trust-divider" /><span>NO PERFECT SYSTEM REQUIRED</span><div className="trust-divider" /><span>BUILT FOR THE LONG GAME</span></section>

        <section className="feature-section" id="why">
          <div className="section-heading"><div><span className="section-kicker">A SECOND BRAIN, WITH ROOM TO BREATHE</span><h2>{direction.sectionTitle}</h2></div><p>{direction.sectionCopy}</p></div>
          <div className="feature-grid" id="how">{features.map(([title, copy], index) => <article className="feature-card" key={title}><FeatureGlyph kind={index === 0 ? "capture" : index === 1 ? "connect" : "return"} /><span className="feature-index">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="closing-card" id="start"><div className="closing-orb" /><span className="section-kicker">A PLACE FOR YOUR NEXT THOUGHT</span><h2>Start with whatever<br />is on your mind.</h2><a className="primary-button" href="mailto:hello@example.com">{direction.action}<Arrow /></a><span className="closing-note">Free to start · Yours to keep</span></section>
        <footer className="site-footer"><Brand version={version} /><span>A little more room to think.</span><span>© 2026 {direction.name}</span></footer>
      </div>
    </main>
  );
}
