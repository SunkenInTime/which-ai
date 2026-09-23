import Link from "next/link";
import type { ReactNode } from "react";

export type Iteration = {
  id: string;
  name: string;
  headline: string;
  description: string;
  proofTitle: string;
};

export const iterations: Iteration[] = [
  {
    id: "1",
    name: "Living index",
    headline: "Your notes are better together.",
    description:
      "Morrow links the things you save, then brings the right thought back when you need it.",
    proofTitle: "Ideas find their neighbors.",
  },
  {
    id: "2",
    name: "Pocket notebook",
    headline: "You saved that thought for a reason.",
    description:
      "Keep the fragments, half-formed questions, and lines you want to remember. Morrow gives them somewhere to meet.",
    proofTitle: "A loose thought can lead somewhere.",
  },
  {
    id: "3",
    name: "Blue index",
    headline: "Ask the question. Find what you meant.",
    description:
      "Search your own notes in the words you remember. Morrow brings back the pages and ideas behind them.",
    proofTitle: "Search can follow the idea, too.",
  },
  {
    id: "4",
    name: "Reading room",
    headline: "A useful thought knows when to return.",
    description:
      "Morrow notices when an old note belongs in the work you are doing now, and puts the connection back in view.",
    proofTitle: "Good notes get another life.",
  },
  {
    id: "5",
    name: "Signal room",
    headline: "Follow one note. Find the whole thread.",
    description:
      "Start with a question, a phrase, or a scrap of an idea. Morrow traces the notes that give it meaning.",
    proofTitle: "One question can open a line of thought.",
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function LivingIndex() {
  return (
    <figure className="preview preview--map">
      <svg className="map-lines" viewBox="0 0 570 450" aria-hidden="true">
        <path d="M133 136 C188 141 197 201 265 215 S361 154 423 167" />
        <path d="M265 215 C259 274 206 320 160 350" />
        <path d="M265 215 C319 269 380 300 438 316" />
        <path d="M133 136 C114 225 117 286 160 350" />
        <circle cx="133" cy="136" r="5" />
        <circle cx="265" cy="215" r="7" />
        <circle cx="423" cy="167" r="5" />
        <circle cx="160" cy="350" r="5" />
        <circle cx="438" cy="316" r="5" />
      </svg>
      <span className="map-note map-note--one">quiet rituals</span>
      <span className="map-note map-note--two">a place to think</span>
      <span className="map-note map-note--three">attention is a room</span>
      <span className="map-note map-note--four">walk before writing</span>
      <span className="map-note map-note--five">small beginnings</span>
      <figcaption className="preview-caption">One note, held in context</figcaption>
    </figure>
  );
}

function PocketNotebook() {
  return (
    <figure className="preview preview--pocket">
      <div className="pocket-date">Tuesday, 9:18 am</div>
      <article className="paper-slip paper-slip--back">
        <span className="slip-source">from a book</span>
        <p>“Attention is the beginning of devotion.”</p>
        <span className="slip-author">— Mary Oliver</span>
      </article>
      <article className="paper-slip paper-slip--middle">
        <span className="slip-source">a passing thought</span>
        <p>Make a room for the idea before you decide what it is.</p>
      </article>
      <article className="paper-slip paper-slip--front">
        <span className="slip-source">connected to both</span>
        <p>Maybe a walk is a kind of blank page.</p>
        <span className="slip-tags">walking&nbsp;&nbsp; · &nbsp;&nbsp;attention</span>
      </article>
      <figcaption className="pocket-caption">Kept close, ready to find</figcaption>
    </figure>
  );
}

function BlueIndex() {
  return (
    <figure className="preview preview--search">
      <div className="search-window-head">
        <span className="search-window-mark"><BrandMark /></span>
        <span>Ask your notes</span>
        <span className="search-shortcut">↵</span>
      </div>
      <div className="search-query">
        <span className="query-symbol">⌕</span>
        <p>What did I save about places that help people think?</p>
      </div>
      <div className="search-result-heading">
        <span>3 notes are connected</span>
        <span className="result-rule" />
      </div>
      <div className="search-result search-result--first">
        <span className="result-kind">from a conversation</span>
        <strong>Walkable cities make room for unplanned meetings</strong>
        <span className="result-match">“a place to think”</span>
      </div>
      <div className="search-result search-result--second">
        <span className="result-kind">from your reading</span>
        <strong>Public space is where a city thinks out loud</strong>
      </div>
      <figcaption className="preview-caption">A question answered in your own words</figcaption>
    </figure>
  );
}

function ReadingRoom() {
  return (
    <figure className="preview preview--reading">
      <div className="reading-date">
        <span>From your notes</span>
        <span>Saved last spring</span>
      </div>
      <article className="returned-note">
        <span className="returned-note__mark" aria-hidden="true">“</span>
        <blockquote>
          A city is not just a place to live. It is a way to notice one another.
        </blockquote>
        <div className="returned-note__source">
          <span>From “Notes on the third place”</span>
          <span className="source-dot" aria-hidden="true" />
          <span>March 14</span>
        </div>
      </article>
      <div className="reading-connection">
        <span className="reading-connection__line" aria-hidden="true" />
        <span>It connects to what you are thinking about now</span>
        <span className="reading-topic">Making a neighborhood feel alive</span>
      </div>
      <figcaption className="preview-caption">A note comes back with its source</figcaption>
    </figure>
  );
}

function SignalRoom() {
  return (
    <figure className="preview preview--signal">
      <div className="signal-start">
        <span className="signal-label">Start with</span>
        <strong>attention</strong>
        <span className="signal-pin" aria-hidden="true" />
      </div>
      <svg className="signal-paths" viewBox="0 0 520 400" aria-hidden="true">
        <path d="M139 197 H222 C260 197 254 95 302 95 H389" />
        <path d="M222 197 H389" />
        <path d="M222 197 C260 197 254 299 302 299 H389" />
        <circle cx="222" cy="197" r="8" />
        <circle cx="302" cy="95" r="5" />
        <circle cx="302" cy="299" r="5" />
        <circle cx="389" cy="95" r="5" />
        <circle cx="389" cy="197" r="5" />
        <circle cx="389" cy="299" r="5" />
      </svg>
      <div className="signal-end signal-end--top">
        <span>from an article</span>
        <strong>Design for attention</strong>
      </div>
      <div className="signal-end signal-end--middle">
        <span>from a journal</span>
        <strong>A room to think</strong>
      </div>
      <div className="signal-end signal-end--bottom">
        <span>from a conversation</span>
        <strong>Walks without a plan</strong>
      </div>
      <figcaption className="preview-caption">A question opens a thread</figcaption>
    </figure>
  );
}

const previews: Record<string, () => ReactNode> = {
  "1": LivingIndex,
  "2": PocketNotebook,
  "3": BlueIndex,
  "4": ReadingRoom,
  "5": SignalRoom,
};

const steps = [
  {
    number: "01",
    title: "Save what stays with you",
    description: "A sentence, a link, a question. Keep it without sorting your life first.",
  },
  {
    number: "02",
    title: "Let ideas meet",
    description: "Related notes build context as your collection grows.",
  },
  {
    number: "03",
    title: "Find your way back",
    description: "Search naturally or let a useful old thought resurface in the moment.",
  },
];

function HowItWorks({ title }: { title: string }) {
  return (
    <section className="how-section" id="how-it-works" aria-labelledby="how-heading">
      <div className="how-intro">
        <h2 id="how-heading">{title}</h2>
      </div>
      <ol className="how-steps">
        {steps.map((step) => (
          <li className="how-step" key={step.number}>
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function IterationLanding({ iteration }: { iteration: Iteration }) {
  const Preview = previews[iteration.id];

  return (
    <div className={`iteration-shell iteration-shell--${iteration.id}`} id="top">
      <div className="page-wrap">
        <header className="site-header">
          <Link className="brand" href="/with-design-skill/luna-6/1" aria-label="Morrow home">
            <BrandMark />
            <span>Morrow</span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#closing-note">The idea</a>
            <a className="nav-action" href="#how-it-works">Take a look</a>
          </nav>
        </header>

        <main>
          <section className={`hero hero--${iteration.id}`} aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title">{iteration.headline}</h1>
              <p className="hero-description">{iteration.description}</p>
              <div className="hero-actions">
                <a className="primary-action" href="#how-it-works">
                  See how it works
                </a>
              </div>
            </div>
            <Preview />
          </section>

          <HowItWorks title={iteration.proofTitle} />

          <section className="closing-note" id="closing-note">
            <p>Make room for the next good idea.</p>
            <a href="#top">Back to the beginning <span aria-hidden="true">↑</span></a>
          </section>
        </main>

        <footer className="site-footer">
          <Link className="brand brand--footer" href="/with-design-skill/luna-6/1">
            <BrandMark />
            <span>Morrow</span>
          </Link>
          <span>A home for what you want to remember.</span>
        </footer>
      </div>
    </div>
  );
}
