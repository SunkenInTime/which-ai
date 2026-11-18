"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CirclePlay,
  CornerDownLeft,
  Feather,
  ListTree,
  LockKeyhole,
  Orbit,
  Paperclip,
  PencilLine,
  Search,
  Sparkle,
  Sun,
  Waypoints,
  X,
} from "lucide-react";
import Brand from "./Brand";
import Notebook, { FieldGuide } from "./Notebook";
import { chapters, type Edition } from "./editions";

type Action = () => void;
type HeroActions = { notebook: Action; guide: Action };
type ModalChoice =
  { name: "guide"; step: number } | { name: "notebook"; note?: string } | null;

function HeroButtons({
  notebook,
  guide,
  primary = "Start your notebook",
  secondary = "Take a tour",
}: HeroActions & { primary?: string; secondary?: string }) {
  return (
    <div className="hero-buttons">
      <button className="button primary" onClick={notebook}>
        {primary}
        <ArrowRight size={17} />
      </button>
      <button className="button secondary" onClick={guide}>
        <CirclePlay size={17} />
        {secondary}
      </button>
    </div>
  );
}

function AlpineHero(actions: HeroActions) {
  return (
    <section className="alpine-hero">
      <picture>
        <source media="(max-width: 1000px)" srcSet="/variants/without-design-skill/gpt-6.2-astra/art/alpine-mobile.webp" />
        <Image
          className="alpine-art"
          src="/variants/without-design-skill/gpt-6.2-astra/art/alpine-panorama.webp"
          alt=""
          fill
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
        />
      </picture>
      <div className="alpine-copy">
        <span className="eyebrow hero-kicker">
          <Sun size={15} /> A notebook for your mind
        </span>
        <h1>
          A second brain.<em>A clearer mind.</em>
        </h1>
        <p>
          One quiet place to capture your thoughts, connect your ideas,
          <br className="wide-break" /> and find them again when it matters.
        </p>
        <HeroButtons {...actions} />
      </div>
    </section>
  );
}

const stars = [
  { id: "walk", title: "On the walk home", x: 20, y: 34 },
  { id: "reading", title: "The reading shelf", x: 66, y: 21 },
  { id: "attention", title: "The art of noticing", x: 48, y: 50 },
  { id: "seed", title: "A seed of an idea", x: 69, y: 74 },
];

function NightHero({
  note,
  ...actions
}: HeroActions & { note: (id: string) => void }) {
  return (
    <section className="night-hero">
      <div className="night-inner section-width">
        <div className="night-copy">
          <span className="eyebrow">
            <Orbit size={16} /> A connected notebook
          </span>
          <h1>
            Every idea
            <br />
            has an <em>orbit.</em>
          </h1>
          <p>
            Give your scattered thoughts a constellation. Follow the connections
            between notes, books, and the ideas they spark.
          </p>
          <HeroButtons {...actions} primary="Build your notebook" />
        </div>
        <div className="star-map" aria-label="Interactive map of sample notes">
          <Image
            src="/variants/without-design-skill/gpt-6.2-astra/art/galaxy.webp"
            alt=""
            fill
            sizes="(max-width: 760px) 95vw, 52vw"
            preload
          />
          <svg
            className="star-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M20 34 34 29 48 50 66 21M48 50 69 74 79 60 83 48M48 50 27 68 13 62M66 21 81 31" />
            {[
              [34, 29],
              [79, 60],
              [83, 48],
              [27, 68],
              [13, 62],
              [81, 31],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r=".52" />
            ))}
          </svg>
          {stars.map((star) => (
            <button
              className={`star-node node-${star.id}`}
              key={star.id}
              style={{ left: star.x + "%", top: star.y + "%" }}
              onClick={() => note(star.id)}
            >
              <Sparkle size={16} fill="currentColor" />
              <span>{star.title}</span>
            </button>
          ))}
          <div className="map-caption">
            <span className="live-dot" /> Explore a note{" "}
            <ArrowUpRight size={12} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PaperHero(actions: HeroActions) {
  return (
    <section className="paper-hero section-width">
      <div className="book-photo">
        <Image
          fill
          sizes="(max-width: 760px) 100vw, 48vw"
          src="/variants/without-design-skill/gpt-6.2-astra/art/commonplace.webp"
          alt="A blue linen commonplace book resting on an orange notebook"
          preload
        />
      </div>
      <div className="paper-copy">
        <span className="eyebrow">
          <BookOpen size={16} /> The digital commonplace book
        </span>
        <h1>
          A life,
          <br />
          <em>in notes.</em>
        </h1>
        <p>
          Quotations, questions, and things worth keeping. Gather the fragments
          of your day in a notebook that becomes more personal with every entry.
        </p>
        <HeroButtons {...actions} primary="Begin a notebook" />
      </div>
    </section>
  );
}

function BoardHero(actions: HeroActions) {
  return (
    <section className="board-hero">
      <div className="board-copy">
        <span className="eyebrow">
          <Paperclip size={17} /> Your digital pinboard
        </span>
        <h1>
          Think outside
          <br />
          the <em>folder.</em>
        </h1>
        <p>
          Catch the scribbles, the sparks, and the half-formed thoughts. Give
          your best ideas a place to stick.
        </p>
        <HeroButtons {...actions} primary="Pin your first idea" />
      </div>
      <div className="board-photo">
        <Image
          src="/variants/without-design-skill/gpt-6.2-astra/art/pinboard.webp"
          alt="A playful pinboard of handwritten ideas, a beach photograph, and sketches"
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          preload
        />
      </div>
    </section>
  );
}

function DeskHero(actions: HeroActions) {
  return (
    <section className="desk-hero">
      <Image
        fill
        src="/variants/without-design-skill/gpt-6.2-astra/art/writing-desk.webp"
        alt="An open notebook and a fountain pen in the afternoon sun"
        sizes="100vw"
        preload
      />
      <div className="desk-overlay" />
      <div className="desk-copy section-width">
        <span className="eyebrow">
          <Feather size={16} /> A personal writing space
        </span>
        <h1>
          Make room
          <br />
          for <em>thought.</em>
        </h1>
        <p>
          A quiet notebook for a busy mind. Set down a thought, stay with it a
          while, and come back when you’re ready.
        </p>
        <HeroButtons {...actions} primary="Open your notebook" />
      </div>
    </section>
  );
}

const tools = [
  { icon: PencilLine, name: "Quick capture" },
  { icon: Waypoints, name: "Connected notes" },
  { icon: Search, name: "Instant recall" },
  { icon: LockKeyhole, name: "Private by design" },
];
function FeatureStrip() {
  return (
    <div className="feature-strip">
      <ul className="section-width">
        {tools.map(({ icon: Icon, name }) => (
          <li key={name}>
            <Icon size={21} strokeWidth={1.65} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureIllustration({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="feature-art capture-art" aria-hidden="true">
        <div className="card-paper">
          <i />
          <span>
            <Feather size={13} /> Quick note
          </span>
          <strong>Something to remember</strong>
          <b />
          <b />
        </div>
        <PencilLine className="art-corner" size={21} />
      </div>
    );
  if (index === 1)
    return (
      <div className="feature-art connect-art" aria-hidden="true">
        <div className="connect-line line-a" />
        <div className="connect-line line-b" />
        <span className="bubble bubble-one">
          <BookOpen size={13} />
          Reading
        </span>
        <span className="bubble bubble-two">
          <Waypoints size={15} />
          Creative practice
        </span>
        <span className="bubble bubble-three">
          <Feather size={13} />
          Field notes
        </span>
      </div>
    );
  return (
    <div className="feature-art recall-art" aria-hidden="true">
      <div className="search-card">
        <span>
          <Search size={15} />
          the walk home
          <CornerDownLeft size={12} />
        </span>
        <small>
          <Feather size={13} />
          On the walk home
        </small>
      </div>
    </div>
  );
}

const featureCopy = [
  {
    title: "Capture the moment",
    description:
      "Give passing thoughts a page of their own before the details slip away.",
  },
  {
    title: "Connect the dots",
    description:
      "Bring related notes together and discover the thread that runs between them.",
  },
  {
    title: "Find it again",
    description:
      "Search a word, a phrase, or a topic to return to the thought you need.",
  },
];
const sectionTitles: Record<Edition, string> = {
  1: "Made for the way you think.",
  2: "Follow the connections.",
  3: "Inside the notebook.",
  4: "A home for the good stuff.",
  5: "The writing practice.",
};

function Features({
  edition,
  guide,
  notebook,
}: {
  edition: Edition;
  guide: (step: number) => void;
  notebook: Action;
}) {
  return (
    <section className="features section-width" id="features">
      <div className="features-heading">
        <div>
          <span className="eyebrow">
            <span className="small-rule" /> How it works
          </span>
          <h2>{sectionTitles[edition]}</h2>
        </div>
        <button className="text-button feature-open" onClick={notebook}>
          Explore the notebook <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="feature-cards">
        {featureCopy.map((item, i) => (
          <button
            key={item.title}
            className="feature-card"
            onClick={() => guide(i)}
            aria-label={`Read about ${chapters[i].label.toLowerCase()}`}
          >
            <FeatureIllustration index={i} />
            <div className="card-copy">
              <span className="card-title">
                {item.title}
                <ArrowUpRight size={18} />
              </span>
              <p>{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function Landing({ edition }: { edition: Edition }) {
  const [modal, setModal] = useState<ModalChoice>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const notebook = (note?: string) => {
    setMobileNav(false);
    setModal({ name: "notebook", note });
  };
  const guide = (step = 0) => {
    setMobileNav(false);
    setModal({ name: "guide", step });
  };
  const actions = {
    notebook: () => notebook(edition === 5 ? undefined : "new"),
    guide: () => guide(),
  };
  return (
    <div className={`landing edition-${edition}`} id="top">
      <header className="site-header">
        <div className="header-inner section-width">
          <Link
            href={`/without-design-skill/gpt-6.2-astra/${edition}`}
            className="brand-link"
            aria-label="Daymark home"
          >
            <Brand />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="#features">How it works</a>
            <button onClick={() => guide()}>Field guide</button>
          </nav>
          <div className="header-actions">
            <button className="header-cta" onClick={() => notebook()}>
              Open notebook <ArrowUpRight size={16} />
            </button>
            <button
              className="mobile-menu-button icon-button"
              aria-label={mobileNav ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileNav}
              onClick={() => setMobileNav(!mobileNav)}
            >
              {mobileNav ? <X size={19} /> : <ListTree size={19} />}
            </button>
          </div>
        </div>
        {mobileNav && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#features" onClick={() => setMobileNav(false)}>
              How it works <ArrowDown size={15} />
            </a>
            <button onClick={() => guide()}>
              Field guide <BookOpen size={15} />
            </button>
          </nav>
        )}
      </header>
      <main>
        {edition === 1 && <AlpineHero {...actions} />}
        {edition === 2 && <NightHero {...actions} note={notebook} />}
        {edition === 3 && <PaperHero {...actions} />}
        {edition === 4 && <BoardHero {...actions} />}
        {edition === 5 && <DeskHero {...actions} />}
        <FeatureStrip />
        <Features
          edition={edition}
          guide={guide}
          notebook={() => notebook("walk")}
        />
      </main>
      <footer className="site-footer">
        <div className="section-width">
          <a href="#top" aria-label="Daymark, back to top">
            <Brand />
          </a>
          <button className="text-button" onClick={() => guide()}>
            Field guide <ArrowUpRight size={14} />
          </button>
        </div>
      </footer>
      {/* Gallery adaptation: the model's design switcher isn't rendered; the gallery has its own. */}
      {modal?.name === "guide" && (
        <FieldGuide
          start={modal.step}
          onClose={() => setModal(null)}
          onNotebook={actions.notebook}
        />
      )}
      {modal?.name === "notebook" && (
        <Notebook initialNote={modal.note} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
