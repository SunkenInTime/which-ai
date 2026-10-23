import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckIcon, LocusMark, PlusIcon, SearchIcon, SparkIcon } from "../components/Icons";
import "@/generated/scoped-variant-css/with-design-skill/kimi-k3-1-pro/source/app/4/four.css";

export default function DesignFour() {
  return (
    <main className="work-page" id="top">
      <header className="work-nav">
        <Link href="./4" className="work-brand"><LocusMark /> locus<span>Second brain, clear mind.</span></Link>
        <nav aria-label="Main navigation"><a href="#workspace">Workspace</a><a href="#features">Features</a><a href="#principles">Principles</a></nav>
        <a className="work-nav-button" href="#start">Get Locus free <ArrowUpRight /></a>
      </header>

      <section className="work-hero">
        <div className="work-hero-heading"><p>Notes that do more than sit there.</p><h1>Think better.<br />Not more.</h1></div>
        <div className="work-hero-copy"><p>Locus brings your notes, ideas, and references into one focused workspace—then helps you turn them into your best thinking.</p><a href="#start">Make space to think <ArrowRight /></a><span>Free forever for personal use.</span></div>
      </section>

      <section className="work-app-wrap" id="workspace" aria-label="Preview of the Locus note-taking workspace">
        <div className="work-app">
          <div className="work-app-top"><div className="work-window-dots"><i /><i /><i /></div><span>locus / workspace</span><div><SearchIcon /><kbd>⌘ K</kbd></div></div>
          <div className="work-app-body">
            <aside className="work-sidebar">
              <div className="work-profile"><span>AM</span><div><strong>Alex’s brain</strong><small>Personal workspace</small></div><span>⌄</span></div>
              <button type="button"><PlusIcon /> New note <kbd>⌘ N</kbd></button>
              <nav><a href="#workspace" className="active"><span>⌂</span>Home</a><a href="#workspace"><span>▤</span>All notes <small>248</small></a><a href="#workspace"><span>◇</span>Connections</a><a href="#workspace"><span>↺</span>Resurface</a></nav>
              <div className="work-side-label">Collections <PlusIcon /></div>
              <a className="work-collection" href="#workspace"><i className="green" />Creative practice <small>42</small></a>
              <a className="work-collection" href="#workspace"><i className="orange" />Reading notes <small>86</small></a>
              <a className="work-collection" href="#workspace"><i className="blue" />Personal <small>31</small></a>
              <div className="work-side-bottom"><span>↗</span> Import your notes</div>
            </aside>
            <div className="work-main-pane">
              <div className="work-breadcrumb">Creative practice <span>/</span> The work is the reward</div>
              <div className="work-note-title"><span className="work-note-emoji">✳</span><h2>The work is<br />the reward</h2><p>A note on process, patience, and paying attention</p></div>
              <div className="work-note-body"><p>The goal isn’t to produce more. It’s to become more present to what I’m making.</p><p className="work-note-highlight">When I stop treating the work as a means to an end, the quality of my attention changes.</p><div className="work-linked-note"><span>↗</span><div><strong>Creative patience</strong><small>Last edited 3 days ago</small></div><span>12 links</span></div><h3>A gentler measure of progress</h3><ul><li>Did I notice something new?</li><li>Did I stay with the difficult part?</li><li>Did I leave room for surprise?</li></ul></div>
              <div className="work-note-footer"><span>Edited just now</span><span>342 words</span></div>
            </div>
            <aside className="work-context-pane"><div className="work-context-head"><SparkIcon /> Thought threads <span>3</span></div><p>Ideas connected to this note</p><article><span>PROCESS</span><h4>Make it exist first</h4><p>You can improve anything except a blank page.</p><small>Edited 8 days ago</small></article><article><span>ATTENTION</span><h4>The quality of the question</h4><p>Better questions change what you notice.</p><small>Edited 2 weeks ago</small></article><a href="#features">View all connections <ArrowUpRight /></a><div className="work-ai-note"><SparkIcon /><p><strong>A pattern in your notes</strong>You’ve connected “attention” to 6 notes about creative work this month.</p></div></aside>
          </div>
        </div>
      </section>

      <section className="work-trust"><span>One home for however you think.</span><div><span>Writers</span><i /> <span>Researchers</span><i /> <span>Founders</span><i /> <span>Students</span><i /> <span>Perpetually curious</span></div></section>

      <section className="work-features" id="features">
        <div className="work-features-heading"><span>Built for clarity</span><h2>The system gets out<br />of your way.</h2></div>
        <article><div className="work-feature-visual work-capture"><div><span>Quick capture</span><p>What’s on your mind?</p><div><span>Text</span><span>Voice</span><span>File</span><button type="button" aria-label="Save note"><ArrowRight /></button></div></div><small>Saved to your inbox</small></div><div className="work-feature-copy"><span>Capture without friction</span><h3>From thought to note<br />in one breath.</h3><p>Use the quick-capture bar, browser clipper, or your voice. Everything lands in one inbox, ready when you are.</p><a href="#start">Try quick capture <ArrowUpRight /></a></div></article>
        <article><div className="work-feature-visual work-search"><div><SearchIcon /><span>notes about creative constraints</span></div><p>8 notes found</p><article><span>The freedom of a small canvas</span><small>Creative practice</small></article><article><span>Less, but with more attention</span><small>Journal · May 12</small></article></div><div className="work-feature-copy"><span>Search by meaning</span><h3>You remember the idea.<br />Locus finds the words.</h3><p>Search the way you think. Find a note from a phrase, a topic, or the loose outline of a memory—no exact title required.</p><a href="#start">Find your first connection <ArrowUpRight /></a></div></article>
        <article><div className="work-feature-visual work-review"><div className="work-review-head"><span>Today’s resurfacing</span><span>3 notes</span></div><blockquote>“You do not rise to the level of your goals. You fall to the level of your systems.”</blockquote><span>James Clear · Atomic Habits</span><div><button type="button">Keep for later</button><button type="button">Add to a note +</button></div></div><div className="work-feature-copy"><span>Rediscover on purpose</span><h3>Old notes.<br />New relevance.</h3><p>A thoughtful daily review brings back what matters. Locus learns from what you use, not from what keeps you scrolling.</p><a href="#start">Resurface a good idea <ArrowUpRight /></a></div></article>
      </section>

      <section className="work-principles" id="principles"><span>Your thinking is not content.</span><h2>No feeds. No metrics.<br />No audience unless you want one.</h2><p>Locus is a private workspace, not another place to perform. Your notes are encrypted, exportable, and never used to train AI models.</p><a href="#start">Read our principles <ArrowUpRight /></a></section>

      <section className="work-final" id="start"><div><span>Less to manage. More to make.</span><h2>Your best thinking<br />starts here.</h2></div><div><a href="mailto:hello@locus.so?subject=Start%20my%20Locus%20workspace">Create your workspace <ArrowRight /></a><p><CheckIcon /> Free for personal use <CheckIcon /> Set up in two minutes</p></div></section>
      <footer className="work-footer"><Link href="./4"><LocusMark /> locus</Link><span>A second brain, on your side.</span><div><a href="#top">Back to top ↑</a><a href="mailto:hello@locus.so">Contact</a></div></footer>
    </main>
  );
}
