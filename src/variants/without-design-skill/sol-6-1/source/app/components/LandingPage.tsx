"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon, MoriMark, Starburst } from "./Icons";

type Note = {
  id: string;
  title: string;
  body: string;
  category: string;
  updated: string;
};
const starterNotes: Note[] = [
  {
    id: "attention",
    title: "On the art of paying attention",
    body: "The best ideas often begin with noticing. A conversation that stays with you. A line in a book. The way the light falls on your desk at 4pm.\n\nI've been thinking about making more space for these little things. Not everything needs to be useful. Some things are just worth keeping.\n\nA few things to try\n• Go for a walk without a destination\n• Read something outside your usual orbit\n• Ask one more question\n\nCuriosity isn't a skill. It's a way of moving through the world.",
    category: "Personal",
    updated: "Just now",
  },
  {
    id: "evergreen",
    title: "Project Evergreen",
    body: "An idea for a slower, more intentional creative practice.\n\nThe big question\nWhat would I make if I wasn't in a hurry?\n\nNext steps\n• Collect references that feel alive\n• Sketch three directions\n• Make something small, every day\n\nConnected to: On the art of paying attention",
    category: "Projects",
    updated: "2 hours ago",
  },
  {
    id: "books",
    title: "Books that stay with me",
    body: "A little collection of ideas from the things I'm reading.\n\nThe Creative Act\nPay attention. The ordinary can be extraordinary when you look a little closer.\n\nA Field Guide to Getting Lost\nLeave a little room for the unknown.\n\nQuestion to come back to\nWhat am I noticing now that I wasn't noticing before?",
    category: "Reading",
    updated: "Yesterday",
  },
  {
    id: "weekend",
    title: "Weekend wanderings",
    body: "A trail, a lake, and absolutely no plans.\n\nBring the camera. Leave the headphones. Look for the little path that doesn't show up on the map.\n\nThings to remember\n• The smell of pine after the rain\n• The little bookstore by the river\n• That feeling of having nowhere else to be",
    category: "Personal",
    updated: "Yesterday",
  },
  {
    id: "ideas",
    title: "An idea worth exploring",
    body: "What if a notebook didn't just hold your ideas — it helped them find each other?\n\nA book connects to a project. A passing thought becomes a plan. Something you saved months ago is exactly what you need today.\n\nLeave this one open. The best ideas need a little room to grow.",
    category: "Ideas",
    updated: "Monday",
  },
];
const designNames = [
  "The calm mind",
  "The connected mind",
  "The curious mind",
  "The focused mind",
  "The growing mind",
];

function Header({
  version,
  openApp,
  openPricing,
}: {
  version: number;
  openApp: () => void;
  openPricing: () => void;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href={`/${version}`} aria-label="mori home">
        <MoriMark />
        <span>
          mori<span className="brand-dot">.</span>
        </span>
      </a>
      <nav
        className={`header-nav ${menu ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <a href="#features" onClick={() => setMenu(false)}>
          {version === 4 ? "Why mori" : "The product"}
        </a>
        <a href="#philosophy" onClick={() => setMenu(false)}>
          {version === 2 ? "The big picture" : "Our philosophy"}
        </a>
        <button
          onClick={() => {
            openPricing();
            setMenu(false);
          }}
        >
          Pricing
        </button>
      </nav>
      <button className="header-cta" onClick={openApp}>
        {version === 3 ? "Find your headspace" : "Open app"}
        <Icon name="diagonal" size={16} />
      </button>
      <button
        className="mobile-menu"
        onClick={() => setMenu(!menu)}
        aria-expanded={menu}
        aria-label={menu ? "Close navigation" : "Open navigation"}
      >
        <Icon name={menu ? "close" : "menu"} />
      </button>
    </header>
  );
}

function DesignSwitcher({ version }: { version: number }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside
      className={`design-switcher ${expanded ? "expanded" : "collapsed"}`}
      aria-label="Choose a landing page design"
    >
      <button
        className="switcher-toggle"
        aria-label={
          expanded ? "Collapse design switcher" : "Show all five designs"
        }
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <Icon name="grid" size={15} />
        <span>Design</span>
      </button>
      {expanded && (
        <div className="switcher-options">
          {[1, 2, 3, 4, 5].map((n) => (
            <Link
              key={n}
              href={`/${n}`}
              className={n === version ? "active" : ""}
              aria-current={n === version ? "page" : undefined}
              aria-label={`Design ${n}: ${designNames[n - 1]}`}
              title={designNames[n - 1]}
            >
              {n}
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}

function ActionButtons({
  openApp,
  alternate = "See how it works",
  primary = "Start your second brain",
}: {
  openApp: () => void;
  alternate?: string;
  primary?: string;
}) {
  return (
    <div className="hero-actions">
      <button className="button-primary" onClick={openApp}>
        {primary}
        <Icon name="arrow" size={19} />
      </button>
      <button className="button-secondary" onClick={openApp}>
        <span className="play-circle">
          <Icon name="play" size={12} />
        </span>
        {alternate}
      </button>
    </div>
  );
}

function CalmMind({ openApp }: { openApp: () => void }) {
  return (
    <>
      <section className="hero hero-calm">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-spark">✳</span> A LITTLE SPACE FOR YOUR WHOLE
            MIND
          </div>
          <h1>
            Less in your head.
            <br />
            More <em>on your mind.</em>
          </h1>
          <p>
            Your ideas deserve a place to call home. Capture the little things,
            connect the dots, and make room for your next big thought.
          </p>
          <ActionButtons openApp={openApp} primary="Find your headspace" />
          <div className="hero-footnote">
            <span className="small-check">
              <Icon name="check" size={12} />
            </span>
            Free to start. Yours to make.
          </div>
          <div className="calm-bottom-note">
            <span className="little-line" />
            For the beautifully busy mind.
          </div>
        </div>
        <div
          className="calm-canvas"
          aria-label="Notes and ideas finding their connections"
        >
          <div className="calm-backdrop" />
          <svg
            className="canvas-connections"
            viewBox="0 0 600 610"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M166 149C237 129 206 278 301 292M439 154C354 165 392 251 301 292M450 437C391 469 314 402 301 292M126 425C250 468 204 351 301 292"
              stroke="#8a9f87"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <circle
              cx="302"
              cy="292"
              r="105"
              stroke="#9aab94"
              strokeWidth="1"
              opacity=".35"
            />
            <circle
              cx="302"
              cy="292"
              r="119"
              stroke="#9aab94"
              strokeWidth="1"
              opacity=".2"
            />
          </svg>
          <button className="idea-card calm-card-one" onClick={openApp}>
            <div className="card-photo">
              <Image
                src="/variants/without-design-skill/sol-6-1/images/lake.jpg"
                width={800}
                height={533}
                sizes="220px"
                alt="Still water and mountains at sunrise"
                preload
              />
              <span>
                <Icon name="leaf" size={12} /> INSPIRATION
              </span>
            </div>
            <div className="card-inner">
              <span className="card-label">A little field note</span>
              <h3>
                Go where your
                <br />
                curiosity takes you.
              </h3>
              <div className="card-meta">
                <span className="tag">Everyday wonder</span>
                <Icon name="diagonal" size={13} />
              </div>
            </div>
          </button>
          <button className="idea-card calm-card-two" onClick={openApp}>
            <div className="note-card-top">
              <Icon name="spark" size={17} />
              <span>A passing thought</span>
              <span>•••</span>
            </div>
            <p>
              Ideas don’t have to
              <br />
              arrive fully formed.
            </p>
            <div className="small-card-lines">
              <span />
              <span />
            </div>
            <span className="card-label">
              Just give them somewhere to land.
            </span>
          </button>
          <div className="brain-center">
            <MoriMark size={37} />
            <span>
              Your own
              <br />
              <strong>little universe.</strong>
            </span>
          </div>
          <button className="idea-card calm-card-three" onClick={openApp}>
            <div className="note-card-top">
              <span className="folder-badge">
                <Icon name="folder" size={16} />
              </span>
              <span>PROJECTS</span>
              <Icon name="diagonal" size={14} />
            </div>
            <h3>Project Evergreen</h3>
            <p>A thought becoming a thing.</p>
            <div className="checklist-row">
              <span className="checked-box">
                <Icon name="check" size={9} />
              </span>
              Collect a little inspiration
            </div>
            <div className="checklist-row">
              <span className="empty-box" />
              Follow the interesting thread
            </div>
            <div className="card-meta">
              <span className="tag">3 connected notes</span>
              <span className="card-date">Today</span>
            </div>
          </button>
          <button className="calm-sticky" onClick={openApp}>
            <span>what if...</span>
            <svg viewBox="0 0 115 70" fill="none" aria-hidden="true">
              <path
                d="M10 47c8-51 45-31 33-2-11 25-4-59 33-37 30 19-19 36-25 12m39 31 9-21 11 14"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <small>follow that thought ↗</small>
          </button>
          <div className="handwritten calm-annotation">
            Everything has a place.
            <svg viewBox="0 0 75 45" aria-hidden="true">
              <path
                d="M5 8c33 4 48-6 51 23m-8-4 9 8 7-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </div>
          <span className="canvas-spark spark-one">✳</span>
          <span className="canvas-spark spark-two">✧</span>
        </div>
      </section>
      <div className="people-strip">
        <span>FOR MINDS OF EVERY KIND</span>
        <div>
          <Icon name="pen" size={20} />
          The writers
        </div>
        <div>
          <Icon name="spark" size={21} />
          The makers
        </div>
        <div>
          <Icon name="search" size={21} />
          The question-askers
        </div>
        <div>
          <Icon name="globe" size={21} />
          The daydreamers
        </div>
      </div>
    </>
  );
}

function ConnectedMind({ openApp }: { openApp: () => void }) {
  return (
    <>
      <section className="hero hero-connected">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            YOUR MIND IS NOT A FILING CABINET
          </div>
          <h1>
            Think freely.
            <br />
            Connect
            <br />
            <em>everything.</em>
          </h1>
          <p>
            A second brain for your first one. Turn scattered thoughts into a
            connected universe of ideas.
          </p>
          <ActionButtons
            openApp={openApp}
            primary="Enter your orbit"
            alternate="Explore the product"
          />
          <div className="hero-footnote">
            <span className="live-dot" />
            No folders required. No ideas left behind.
          </div>
        </div>
        <div className="orbit-canvas">
          <div className="orbit-glow" />
          <svg className="orbit-lines" viewBox="0 0 660 600" aria-hidden="true">
            <defs>
              <radialGradient id="orbitCore">
                <stop offset="0" stopColor="#ddfb98" stopOpacity=".17" />
                <stop offset="1" stopColor="#b6e77a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="332" cy="300" r="210" fill="url(#orbitCore)" />
            <g fill="none" stroke="#809477" strokeWidth=".65">
              <ellipse
                cx="332"
                cy="300"
                rx="276"
                ry="115"
                transform="rotate(-35 332 300)"
              />
              <ellipse
                cx="332"
                cy="300"
                rx="246"
                ry="158"
                transform="rotate(47 332 300)"
              />
              <circle cx="332" cy="300" r="218" strokeDasharray="2 8" />
              <circle cx="332" cy="300" r="164" opacity=".6" />
              <path
                d="m332 300-154-153m154 153 166-123m-166 123-166 122m166-122 179 149M332 300 352 57"
                stroke="#d7ed96"
                strokeOpacity=".4"
              />
            </g>
            <g fill="#dafa9f">
              <circle cx="178" cy="147" r="4" />
              <circle cx="498" cy="177" r="4" />
              <circle cx="166" cy="422" r="4" />
              <circle cx="511" cy="449" r="4" />
              <circle cx="352" cy="57" r="3" />
              <circle cx="548" cy="304" r="2" />
              <circle cx="264" cy="506" r="3" />
              <circle cx="114" cy="304" r="2" />
            </g>
          </svg>
          <div className="orbit-core">
            <MoriMark size={63} />
            <span>YOUR SECOND BRAIN</span>
          </div>
          <button className="orbit-note orbit-note-one" onClick={openApp}>
            <span>
              <Icon name="note" size={14} /> A THOUGHT
            </span>
            <h3>
              What if we tried
              <br />
              something different?
            </h3>
            <div className="orbit-note-footer">
              <span className="orbit-tag">Ideas</span>
              <span>02 connections</span>
            </div>
          </button>
          <button className="orbit-note orbit-note-two" onClick={openApp}>
            <span>
              <Icon name="book" size={14} /> FROM YOUR READING
            </span>
            <h3>
              Creativity is a way
              <br />
              of seeing.
            </h3>
            <div className="orbit-note-footer">
              <span className="orbit-tag">Reading</span>
              <Icon name="diagonal" size={13} />
            </div>
          </button>
          <button className="orbit-note orbit-note-three" onClick={openApp}>
            <span>
              <Icon name="folder" size={14} /> A WORK IN PROGRESS
            </span>
            <h3>The next big thing</h3>
            <div className="orbit-note-footer">
              <span className="orbit-tag">Projects</span>
              <span>05 connections</span>
            </div>
          </button>
          <div className="orbit-mini">
            <Icon name="headphones" size={16} />
            <span>That one podcast</span>
          </div>
          <div className="orbit-coordinate">
            40.7128° N &nbsp; 74.0060° W<br />
            <span>AN ENTIRE WORLD. UNIQUELY YOURS.</span>
          </div>
          <div className="orbit-discovery">
            <span className="live-dot" /> A new connection, waiting to happen.
          </div>
        </div>
      </section>
      <div className="connected-ticker">
        <span>CAPTURE THE SPARK</span>
        <Icon name="spark" />
        <span>CONNECT THE DOTS</span>
        <Icon name="spark" />
        <span>GO BEYOND THE OBVIOUS</span>
        <Icon name="spark" />
        <span>MAKE SOMETHING NEW</span>
      </div>
    </>
  );
}

function CuriousMind({ openApp }: { openApp: () => void }) {
  return (
    <>
      <section className="hero hero-curious">
        <div className="curious-intro">
          <div className="eyebrow">
            <Icon name="spark" size={15} /> GREAT IDEAS START WITH A LITTLE
            SPACE
          </div>
          <h1>
            A home for your
            <br />
            beautifully <em>busy mind.</em>
            <svg
              className="headline-underline"
              viewBox="0 0 480 25"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 14C123 2 287 4 470 12M44 22c137-10 254-12 391-4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </h1>
          <p>
            Big plans, tiny thoughts, rabbit holes. Keep them all in mori.
            <br />A second brain that feels a little more like you.
          </p>
          <ActionButtons
            openApp={openApp}
            primary="Make yourself at home"
            alternate="Take a little tour"
          />
        </div>
        <div className="notebook-canvas">
          <div className="notebook-grid" />
          <span className="handwritten curious-annotation">
            a thought here...
          </span>
          <span className="handwritten curious-annotation-two">
            ...a whole world in here.
          </span>
          <svg
            className="curious-doodle"
            viewBox="0 0 150 130"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 83c5-45 75-63 71-19-3 32-43 35-51 13-10-27 75-49 89-11 7 20-14 41-42 39m43-1 15-5-3 15M22 19l11 9m1-20 1 14M12 35l13 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <button className="paper-card paper-reading" onClick={openApp}>
            <div className="paper-card-top">
              <Icon name="book" size={17} />
              <span>THE READING CORNER</span>
            </div>
            <span className="paper-number">01 / TO COME BACK TO</span>
            <h3>
              “Pay attention.
              <br />
              Be astonished.
              <br />
              Tell about it.”
            </h3>
            <p>
              A reminder to keep noticing
              <br />
              the good stuff.
            </p>
            <div className="paper-bottom">
              <span>Words to live by</span>
              <Icon name="diagonal" size={16} />
            </div>
          </button>
          <button className="paper-card paper-main" onClick={openApp}>
            <div className="paper-card-top">
              <Icon name="note" size={16} />
              <span>JUST A LITTLE BRAIN DUMP</span>
              <span>•••</span>
            </div>
            <h3>Things on my mind</h3>
            <div className="paper-list">
              <p>
                <span>↳</span> That idea from my walk
              </p>
              <p>
                <span>↳</span> A book I want to write
              </p>
              <p>
                <span>↳</span> Why the sky looks like that
              </p>
              <p>
                <span>↳</span> Absolutely everything else
              </p>
            </div>
            <div className="paper-scribble">
              <span className="handwritten">no idea is too little.</span>
              <Icon name="spark" size={45} />
            </div>
            <div className="paper-bottom">
              <span>
                <span className="blue-dot" /> 4 thoughts. Endless possibilities.
              </span>
              <Icon name="connect" size={16} />
            </div>
          </button>
          <button className="paper-card paper-adventure" onClick={openApp}>
            <div className="paper-card-top">
              <Icon name="globe" size={17} />
              <span>OUT OF OFFICE, INTO THE WORLD</span>
            </div>
            <Image
              src="/variants/without-design-skill/sol-6-1/images/lake.jpg"
              width={800}
              height={533}
              sizes="280px"
              alt="An alpine lake surrounded by mountains"
              preload
            />
            <h3>Take the scenic route.</h3>
            <div className="paper-bottom">
              <span>Weekend wanderings</span>
              <Icon name="diagonal" size={16} />
            </div>
          </button>
          <button className="paper-sticky" onClick={openApp}>
            <span className="sticky-pin" />
            <span className="handwritten">
              Note to self:
              <br />
              follow the thing
              <br />
              that lights you up.
            </span>
            <svg viewBox="0 0 100 30" fill="none" aria-hidden="true">
              <path
                d="M3 17c15-18 67-15 93-9M13 24c24-13 52-13 72-9"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <Starburst text="100% you." className="curious-starburst" />
          <div className="curious-link">
            A book → a thought → your next big thing{" "}
            <Icon name="connect" size={16} />
          </div>
        </div>
      </section>
      <div className="curious-marquee">
        <span>LESS “WHERE DID I PUT THAT?”</span>
        <span>✳</span>
        <span>MORE “OH, THAT’S AN IDEA.”</span>
        <span>✳</span>
        <span>YOUR MIND. BUT ROOMIER.</span>
        <span>✳</span>
      </div>
    </>
  );
}

function FocusedMind({ openApp }: { openApp: () => void }) {
  return (
    <>
      <section className="hero hero-focused">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="orange-square" /> LESS NOISE. MORE POSSIBILITY.
          </div>
          <h1>
            A clear mind
            <br />
            starts <em>here.</em>
          </h1>
          <p>
            A considered space for your notes, knowledge, and next ideas.
            Everything you need. Nothing in your way.
          </p>
          <ActionButtons
            openApp={openApp}
            primary="Find your focus"
            alternate="See mori in action"
          />
          <div className="hero-footnote">
            YOUR SECOND BRAIN, MINUS THE CLUTTER.
          </div>
        </div>
        <div className="focused-product">
          <div className="focused-product-label">
            <span>ONE SPACE. A CLEARER PERSPECTIVE.</span>
            <span>FIG. 01 — YOUR MIND, ORGANIZED</span>
          </div>
          <ProductWindow openApp={openApp} variant="light" />
          <div className="focused-product-caption">
            <span className="live-dot" /> A little more space to think.
          </div>
        </div>
      </section>
      <div className="focused-features-strip">
        {[
          {
            num: "01",
            title: "Capture effortlessly.",
            body: "Good ideas don't wait. Neither should you.",
            icon: "pen",
          },
          {
            num: "02",
            title: "Connect naturally.",
            body: "Your notes are better together.",
            icon: "connect",
          },
          {
            num: "03",
            title: "Find your clarity.",
            body: "Less looking. More moving forward.",
            icon: "search",
          },
        ].map((f) => (
          <a href="#features" key={f.num}>
            <span className="focused-feature-number">{f.num}</span>
            <div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
            <Icon name={f.icon} size={26} />
          </a>
        ))}
      </div>
    </>
  );
}

function GrowingMind({ openApp }: { openApp: () => void }) {
  return (
    <>
      <section className="hero hero-growing">
        <div className="hero-copy">
          <div className="eyebrow">
            <Icon name="leaf" size={16} /> A DIGITAL GARDEN FOR YOUR IDEAS
          </div>
          <h1>
            Let your
            <br />
            mind <em>grow.</em>
          </h1>
          <p>
            Plant a thought. Follow a connection. See what blooms.
            <br />A softer space for your notes, your curiosity, and everything
            you’re becoming.
          </p>
          <ActionButtons
            openApp={openApp}
            primary="Plant your first idea"
            alternate="Wander a little"
          />
          <div className="growing-note">
            <svg viewBox="0 0 50 65" fill="none" aria-hidden="true">
              <path
                d="M24 61c2-21-1-34 2-52m-1 35C9 43 3 31 6 24c15 0 22 8 19 20Zm1-18C26 13 35 5 46 7c0 14-9 20-20 19Z"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
            <span>
              No perfect thoughts required.
              <br />
              <strong>Just a little room to grow.</strong>
            </span>
          </div>
        </div>
        <div className="garden-canvas">
          <div className="forest-arch">
            <Image
              src="/variants/without-design-skill/sol-6-1/images/forest.jpg"
              width={1400}
              height={932}
              sizes="(max-width: 760px) 400px, 600px"
              alt="Sunlight finding its way through a quiet green forest"
              preload
            />
            <div className="forest-shade" />
            <span className="forest-caption">
              SOMEWHERE BETWEEN A THOUGHT
              <br />
              AND A WHOLE NEW POSSIBILITY.
            </span>
            <span className="forest-coordinate">
              A PLACE TO BEGIN. &nbsp; ↗
            </span>
          </div>
          <div className="arch-outline" />
          <svg
            className="garden-lines"
            viewBox="0 0 600 640"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M465 174C446 300 155 234 177 411M177 411c19 112 193 116 241 75"
              stroke="#e4eebc"
              strokeDasharray="3 6"
            />
            <circle cx="460" cy="188" r="5" fill="#d6eab2" />
            <circle cx="177" cy="411" r="5" fill="#d6eab2" />
          </svg>
          <button className="garden-card garden-card-one" onClick={openApp}>
            <div className="garden-card-label">
              <Icon name="leaf" size={15} />
              <span>A SEED OF AN IDEA</span>
              <Icon name="diagonal" size={14} />
            </div>
            <h3>
              What if I made
              <br />a little more space?
            </h3>
            <span className="garden-card-tag">Personal growth</span>
          </button>
          <button className="garden-card garden-card-two" onClick={openApp}>
            <div className="garden-thumbnail">
              <Image
                src="/variants/without-design-skill/sol-6-1/images/deer.jpg"
                width={600}
                height={990}
                sizes="80px"
                alt="A mountain meadow with a deer"
              />
            </div>
            <div>
              <div className="garden-card-label">COLLECTED ALONG THE WAY</div>
              <h3>The art of noticing</h3>
              <span>
                <span className="green-dot" /> Connected to 3 ideas
              </span>
            </div>
          </button>
          <div className="garden-growth-pill">
            <Icon name="connect" size={15} />
            <span>A new connection is growing.</span>
          </div>
          <span className="garden-spark">✴</span>
        </div>
      </section>
      <div className="garden-bottom-strip">
        <span>A SMALL THOUGHT CAN BECOME SOMETHING WONDERFUL.</span>
        <a href="#features">
          Explore a little further <Icon name="arrow" size={16} />
        </a>
      </div>
    </>
  );
}

function GraphPreview({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="product-graph">
      <svg viewBox="0 0 540 330" preserveAspectRatio="none" aria-hidden="true">
        <g
          fill="none"
          stroke="currentColor"
          strokeOpacity=".25"
          strokeWidth="1"
        >
          <path d="M270 155 110 85M270 155l155-70M270 155 135 267M270 155l170 107M270 155 270 30M110 85 135 267M425 85l15 177M135 267l305-5" />
        </g>
        <g fill="currentColor" opacity=".3">
          <circle cx="270" cy="155" r="38" />
          <circle cx="110" cy="85" r="5" />
          <circle cx="425" cy="85" r="5" />
          <circle cx="135" cy="267" r="5" />
          <circle cx="440" cy="262" r="5" />
          <circle cx="270" cy="30" r="3" />
        </g>
      </svg>
      <div className="graph-center">
        <MoriMark size={27} />
        <span>Your mind</span>
      </div>
      {starterNotes.slice(0, 4).map((note, index) => (
        <button
          key={note.id}
          className={`graph-note graph-note-${index} ${note.id === selected ? "selected" : ""}`}
          onClick={() => onSelect(note.id)}
        >
          <Icon name={index === 2 ? "book" : "note"} size={13} />
          {note.title}
        </button>
      ))}
    </div>
  );
}

function ProductWindow({
  openApp,
  variant = "green",
  graph = false,
}: {
  openApp: () => void;
  variant?: string;
  graph?: boolean;
}) {
  const [selected, setSelected] = useState("attention");
  const [view, setView] = useState(graph ? "connections" : "notes");
  const note = starterNotes.find((n) => n.id === selected)!;
  return (
    <div className={`product-window product-${variant}`}>
      <div className="product-titlebar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>
          <MoriMark size={13} /> A little space for your whole mind
        </span>
        <button onClick={openApp} aria-label="Open the interactive workspace">
          <Icon name="diagonal" size={13} />
        </button>
      </div>
      <div className="product-body">
        <aside className="product-sidebar">
          <div className="product-user">
            <span className="user-monogram">J</span>
            <strong>Jamie’s space</strong>
            <Icon name="chevron" size={12} />
          </div>
          <button className="product-search" onClick={openApp}>
            <Icon name="search" size={13} />
            <span>Find a thought</span>
            <kbd>⌘ K</kbd>
          </button>
          <button
            className={`sidebar-nav ${view === "notes" ? "selected" : ""}`}
            onClick={() => setView("notes")}
          >
            <Icon name="note" size={14} />
            All notes<span>12</span>
          </button>
          <button
            className={`sidebar-nav ${view === "connections" ? "selected" : ""}`}
            onClick={() => setView("connections")}
          >
            <Icon name="connect" size={14} />
            Connections
          </button>
          <div className="sidebar-section-label">
            YOUR LITTLE WORLDS
            <button onClick={openApp} aria-label="Open your collections">
              <Icon name="plus" size={12} />
            </button>
          </div>
          {[
            { name: "Everyday thoughts", color: "#abb590", id: "attention" },
            { name: "Things I'm making", color: "#d5ad90", id: "evergreen" },
            { name: "The reading corner", color: "#a3a6c7", id: "books" },
            { name: "Out in the world", color: "#d9c787", id: "weekend" },
          ].map((item) => (
            <button
              key={item.id}
              className="sidebar-collection"
              onClick={() => {
                setSelected(item.id);
                setView("notes");
              }}
            >
              <span style={{ background: item.color }} />
              {item.name}
            </button>
          ))}
          <div className="sidebar-bottom">
            <Icon name="leaf" size={13} /> Room to grow.
          </div>
        </aside>
        <div className="product-document">
          <div className="document-toolbar">
            <span>
              {view === "connections"
                ? "Your connected world"
                : "Everyday thoughts / A little observation"}
            </span>
            <div>
              <span className="saved-dot" /> All changes saved{" "}
              <button onClick={openApp} aria-label="Open note options">
                •••
              </button>
            </div>
          </div>
          {view === "connections" ? (
            <>
              <div className="graph-title">
                <h3>Everything is connected.</h3>
                <p>Sometimes, you just need a different perspective.</p>
              </div>
              <GraphPreview
                selected={selected}
                onSelect={(id) => {
                  setSelected(id);
                  setView("notes");
                }}
              />
            </>
          ) : (
            <div className="document-content">
              <span className="document-category">
                <Icon name="leaf" size={13} />
                {note.category === "Personal"
                  ? "A little observation"
                  : note.category}
              </span>
              <h3>{note.title}</h3>
              <div className="document-meta">
                {note.updated}
                <span>·</span>3 min read<span>·</span>
                <Icon name="connect" size={12} />3 connections
              </div>
              <p>{note.body.split("\n\n")[0]}</p>
              <p>{note.body.split("\n\n")[1]}</p>
              <blockquote>Some things are just worth keeping.</blockquote>
              <div className="document-linked">
                <span>CONNECTED THOUGHTS</span>
                <button
                  onClick={() => {
                    setSelected(
                      selected === "evergreen" ? "attention" : "evergreen",
                    );
                  }}
                >
                  <Icon name="note" size={14} />
                  {selected === "evergreen"
                    ? "On the art of paying attention"
                    : "Project Evergreen"}
                  <Icon name="arrow" size={13} />
                </button>
                <button onClick={() => setSelected("ideas")}>
                  <Icon name="spark" size={14} />
                  An idea worth exploring
                  <Icon name="arrow" size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="product-status">
        <span>
          <Icon name="check" size={10} /> A little less scattered. A lot more
          you.
        </span>
        <button onClick={openApp}>
          <Icon name="diagonal" size={11} /> Open your space
        </button>
      </div>
    </div>
  );
}

function FeatureSections({
  version,
  openApp,
}: {
  version: number;
  openApp: () => void;
}) {
  const titles = [
    <>
      Your thoughts.
      <br />A little more <em>together.</em>
    </>,
    <>
      Your ideas are better
      <br />
      <em>when they’re connected.</em>
    </>,
    <>
      Less filing.
      <br />
      More <em>feeling inspired.</em>
    </>,
    <>
      Thoughtfully simple.
      <br />
      <em>Simply thoughtful.</em>
    </>,
    <>
      From a little thought
      <br />
      to a <em>world of possibility.</em>
    </>,
  ];
  return (
    <>
      <section className="features-section" id="features">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              {version === 4
                ? "01 / A BETTER WAY TO THINK"
                : "A SECOND BRAIN. A FIRST-CLASS FEELING."}
            </div>
            <h2>{titles[version - 1]}</h2>
          </div>
          <p>
            Not another place to put things.
            <br />A better place to find yourself.
          </p>
        </div>
        {version !== 4 && (
          <div className="large-product-wrap">
            <div className="product-wrap-caption">
              <span>
                <Icon name="spark" size={15} /> A LITTLE PREVIEW OF YOUR NEXT
                CHAPTER
              </span>
              <button onClick={openApp}>
                Make it yours <Icon name="diagonal" size={14} />
              </button>
            </div>
            <ProductWindow
              openApp={openApp}
              variant={
                version === 2
                  ? "dark"
                  : version === 3
                    ? "blue"
                    : version === 5
                      ? "sage"
                      : "green"
              }
              graph={version === 2}
            />
          </div>
        )}
        <div className="feature-columns">
          {[
            {
              icon: "pen",
              num: "01",
              title:
                version === 5 ? "Plant a thought." : "Catch the little things.",
              body: "A spark of inspiration, a passing thought, a link you love. Give it a home before it slips away.",
            },
            {
              icon: "connect",
              num: "02",
              title:
                version === 5
                  ? "Let connections grow."
                  : "Follow the connections.",
              body: "Link one idea to another. Turn a collection of notes into something a little more meaningful.",
            },
            {
              icon: "spark",
              num: "03",
              title:
                version === 5
                  ? "See what blooms."
                  : "Make room for what's next.",
              body: "Come back to the right thought at the right moment. The next big thing might already be in there.",
            },
          ].map((item) => (
            <article key={item.num}>
              <div className="feature-icon">
                <Icon name={item.icon} size={25} />
                <span>{item.num}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="philosophy-section" id="philosophy">
        <div className="philosophy-art" aria-hidden="true">
          {version === 5 ? (
            <svg viewBox="0 0 280 300" fill="none">
              <path
                d="M137 276c5-71-4-150 4-222M140 215c-55 9-95-27-91-62 65-3 96 24 91 62Zm1-58c-2-48 24-75 79-70 1 49-30 74-79 70Zm0-48c-38 5-64-19-60-47 36-5 67 14 60 47Zm1-36c0-31 17-52 46-52 3 35-14 51-46 52Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path d="M95 279h95" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          ) : (
            <>
              <div className="philosophy-orbit" />
              <MoriMark size={116} />
              <span className="art-spark art-spark-one">✳</span>
              <span className="art-spark art-spark-two">✧</span>
            </>
          )}
        </div>
        <div className="philosophy-copy">
          <div className="eyebrow">A LITTLE PHILOSOPHY</div>
          <h2>
            You’re a person.
            <br />
            <em>Not a productivity machine.</em>
          </h2>
          <p>
            We believe your mind deserves more than another system to keep up
            with. It deserves a place where messy thinking is welcome, curiosity
            comes first, and every idea has room to become something.
          </p>
          <p>
            That’s why we made mori. Less managing your life.
            <br />
            More living it.
          </p>
          <button className="text-link" onClick={openApp}>
            Make a little space for yourself <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>
      <section className="closing-section">
        <div className="eyebrow">YOUR NEXT GOOD IDEA IS ALREADY IN THERE.</div>
        <h2>
          {version === 5 ? (
            <>
              Give it a place to <em>grow.</em>
            </>
          ) : version === 2 ? (
            <>
              Make the next <em>connection.</em>
            </>
          ) : (
            <>
              Let’s give it a <em>home.</em>
            </>
          )}
        </h2>
        <button className="button-primary" onClick={openApp}>
          Start your second brain <Icon name="arrow" size={19} />
        </button>
        <span>Free to begin. No perfect thoughts required.</span>
      </section>
    </>
  );
}

function Footer({
  version,
  openApp,
  openPricing,
}: {
  version: number;
  openApp: () => void;
  openPricing: () => void;
}) {
  return (
    <footer className="site-footer">
      <a className="brand" href={`/${version}`} aria-label="mori home">
        <MoriMark size={25} />
        <span>mori.</span>
      </a>
      <span>A little space for your whole mind.</span>
      <div>
        <a href="#features">The product</a>
        <button onClick={openPricing}>Pricing</button>
        <button onClick={openApp}>
          Your space <Icon name="diagonal" size={12} />
        </button>
      </div>
      <small>Made with a little more care. © 2026 mori.</small>
    </footer>
  );
}

function ModalShell({
  children,
  onClose,
  className = "",
  label,
}: {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusable = Array.from(
          ref.current?.querySelectorAll<HTMLElement>(
            'button, a[href], input, textarea, select, [tabindex="0"]',
          ) || [],
        ).filter(
          (element) =>
            element.getClientRects().length > 0 &&
            !element.hasAttribute("disabled"),
        );
        if (!focusable.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`modal-panel ${className}`}
        ref={ref}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}

function PricingModal({
  onClose,
  openApp,
}: {
  onClose: () => void;
  openApp: () => void;
}) {
  const [yearly, setYearly] = useState(true);
  return (
    <ModalShell onClose={onClose} className="pricing-modal" label="Mori plans">
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Close pricing"
      >
        <Icon name="close" />
      </button>
      <div className="eyebrow">A LITTLE ROOM. OR A WHOLE WORLD.</div>
      <h2>Space for every kind of mind.</h2>
      <p>Begin with a little. Grow at your own pace.</p>
      <div className="billing-toggle">
        <button
          className={!yearly ? "selected" : ""}
          onClick={() => setYearly(false)}
        >
          Monthly
        </button>
        <button
          className={yearly ? "selected" : ""}
          onClick={() => setYearly(true)}
        >
          Yearly <span>Save 25%</span>
        </button>
      </div>
      <div className="pricing-cards">
        <div className="pricing-card">
          <span className="plan-label">THE LITTLE SPACE</span>
          <h3>Free</h3>
          <p>For your first ideas. And a lot more.</p>
          <div className="plan-price">
            $0<span>/ forever</span>
          </div>
          <ul>
            {[
              "Unlimited notes in this browser",
              "Note search and collections",
              "A beautiful, distraction-free editor",
            ].map((x) => (
              <li key={x}>
                <Icon name="check" size={15} />
                {x}
              </li>
            ))}
          </ul>
          <button className="button-primary" onClick={openApp}>
            Start your little space <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="pricing-card pricing-card-plus">
          <span className="plan-label">
            THE WHOLE WORLD <Icon name="spark" size={14} />
          </span>
          <h3>mori Plus</h3>
          <p>For the mind that keeps on growing.</p>
          <div className="plan-price">
            ${yearly ? "6" : "8"}
            <span>/ month{yearly ? ", billed yearly" : ""}</span>
          </div>
          <ul>
            {[
              "Everything in the little space",
              "Cloud sync across your devices",
              "Smart connections and rich attachments",
            ].map((x) => (
              <li key={x}>
                <Icon name="check" size={15} />
                {x}
              </li>
            ))}
          </ul>
          <button className="button-primary" onClick={openApp}>
            Explore the free preview <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
      <small className="pricing-disclaimer">
        A design preview. The workspace is free to try; paid plans and cloud
        sync are not active.
      </small>
    </ModalShell>
  );
}

function Workspace({ onClose }: { onClose: () => void }) {
  const [initial] = useState(() => {
    if (typeof window === "undefined")
      return { notes: starterNotes, error: false };
    try {
      const stored = localStorage.getItem("mori-notes");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (n) =>
              n &&
              typeof n.id === "string" &&
              typeof n.title === "string" &&
              typeof n.body === "string" &&
              typeof n.category === "string" &&
              typeof n.updated === "string",
          )
        ) {
          return { notes: parsed as Note[], error: false };
        }
      }
      return { notes: starterNotes, error: false };
    } catch {
      return { notes: starterNotes, error: true };
    }
  });
  const [notes, setNotes] = useState<Note[]>(initial.notes);
  const [selected, setSelected] = useState(initial.notes[0]?.id || "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All notes");
  const [saved, setSaved] = useState(true);
  const [storageError, setStorageError] = useState(initial.error);
  const [view, setView] = useState("notes");
  const [showNotes, setShowNotes] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const titleFocusRequested = useRef(false);
  const searchFocusRequested = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem("mori-notes", JSON.stringify(notes));
        setSaved(true);
      } catch {
        setStorageError(true);
      }
    }, 400);
    return () => {
      clearTimeout(timer);
      try {
        localStorage.setItem("mori-notes", JSON.stringify(notes));
      } catch {
        /* The editor remains usable without storage. */
      }
    };
  }, [notes]);
  useEffect(() => {
    function focusSearch(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchFocusRequested.current = true;
        setShowNotes(true);
        if (searchRef.current?.getClientRects().length) {
          searchRef.current.focus();
          searchFocusRequested.current = false;
        }
      }
    }
    document.addEventListener("keydown", focusSearch);
    return () => document.removeEventListener("keydown", focusSearch);
  }, []);
  useEffect(() => {
    if (showNotes && searchFocusRequested.current) {
      searchRef.current?.focus();
      searchFocusRequested.current = false;
    }
  }, [showNotes]);
  useEffect(() => {
    if (view === "notes" && titleFocusRequested.current) {
      titleRef.current?.focus();
      titleFocusRequested.current = false;
    }
  }, [selected, view]);
  const note = notes.find((n) => n.id === selected);
  const filtered = notes.filter(
    (n) =>
      (filter === "All notes" || n.category === filter) &&
      `${n.title} ${n.body}`.toLowerCase().includes(search.toLowerCase()),
  );
  function addNote() {
    const id = `note-${Date.now()}`;
    titleFocusRequested.current = true;
    setSaved(false);
    setNotes((prev) => [
      {
        id,
        title: "",
        body: "",
        category: filter === "All notes" ? "Ideas" : filter,
        updated: "Just now",
      },
      ...prev,
    ]);
    setSelected(id);
    setShowNotes(false);
    setSearch("");
    setView("notes");
  }
  function updateNote(field: keyof Note, value: string) {
    setSaved(false);
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selected ? { ...n, [field]: value, updated: "Just now" } : n,
      ),
    );
  }
  function deleteNote() {
    setSaved(false);
    const remaining = notes.filter((n) => n.id !== selected);
    setNotes(remaining);
    setSelected(remaining[0]?.id || "");
  }
  return (
    <ModalShell
      onClose={onClose}
      className="workspace-modal"
      label="Your mori workspace"
    >
      <div className="workspace-top">
        <div className="brand" aria-label="Mori workspace">
          <MoriMark size={24} />
          <span>mori.</span>
        </div>
        <button
          className="workspace-mobile-notes"
          aria-label={showNotes ? "Hide note list" : "Show note list"}
          aria-expanded={showNotes}
          aria-controls="workspace-note-navigation"
          onClick={() => setShowNotes(!showNotes)}
        >
          <Icon name={showNotes ? "close" : "book"} size={15} />
          <span>Notes</span>
        </button>
        <span role="status" aria-live="polite">
          <span className="saved-dot" />
          {storageError
            ? "Local storage unavailable"
            : saved
              ? "Saved in this browser"
              : "Saving your thought…"}
        </span>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close workspace"
        >
          <Icon name="close" size={20} />
        </button>
      </div>
      <div className={`workspace-main ${showNotes ? "mobile-notes-open" : ""}`}>
        {showNotes && (
          <button
            className="workspace-mobile-scrim"
            aria-label="Close note list"
            onClick={() => setShowNotes(false)}
          />
        )}
        <aside className="workspace-sidebar" id="workspace-note-navigation">
          <div className="workspace-space">
            <span className="user-monogram">Y</span>
            <div>
              <strong>Your little space</strong>
              <span>Room for every thought.</span>
            </div>
          </div>
          <button className="new-note-button" onClick={addNote}>
            <Icon name="plus" size={17} />A new thought
          </button>
          <label className="workspace-search">
            <Icon name="search" size={16} />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setView("notes");
              }}
              placeholder="Find a thought…"
              aria-label="Search notes"
            />
          </label>
          <div className="workspace-filters">
            {["All notes", "Personal", "Projects", "Reading", "Ideas"].map(
              (category) => (
                <button
                  key={category}
                  className={
                    filter === category && view === "notes" ? "selected" : ""
                  }
                  onClick={() => {
                    setFilter(category);
                    setView("notes");
                  }}
                >
                  <Icon
                    name={category === "All notes" ? "note" : "folder"}
                    size={14}
                  />
                  {category}
                  <span>
                    {
                      notes.filter(
                        (n) =>
                          category === "All notes" || n.category === category,
                      ).length
                    }
                  </span>
                </button>
              ),
            )}
            <button
              className={view === "connections" ? "selected" : ""}
              onClick={() => {
                setView("connections");
                setShowNotes(false);
              }}
            >
              <Icon name="connect" size={14} />
              Connections
            </button>
          </div>
          <div className="workspace-note-list">
            <span className="sidebar-section-label">
              {search ? `${filtered.length} THOUGHTS FOUND` : "YOUR THOUGHTS"}
            </span>
            {filtered.map((n) => (
              <button
                key={n.id}
                className={n.id === selected ? "selected" : ""}
                onClick={() => {
                  setSelected(n.id);
                  setView("notes");
                  setShowNotes(false);
                }}
              >
                <strong>{n.title || "Untitled thought"}</strong>
                <span>
                  {n.body.substring(0, 55) ||
                    "A little room for something new."}
                </span>
              </button>
            ))}
            {!filtered.length && (
              <p className="search-empty">
                No thoughts here yet.
                <br />
                Try another search, or make a little space for a new one.
              </p>
            )}
          </div>
          <div className="workspace-local-note">
            <Icon name="leaf" size={14} />A local preview, entirely yours.
          </div>
        </aside>
        <div className="workspace-editor">
          {view === "connections" ? (
            <div className="workspace-connections">
              <div className="eyebrow">THE BIG PICTURE</div>
              <h2>Your own little universe.</h2>
              <p>
                Every thought has somewhere to go. Choose one to keep exploring.
              </p>
              <div className="workspace-graph">
                <svg
                  viewBox="0 0 600 380"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <g stroke="#a7b495" strokeWidth="1" fill="none">
                    {notes.slice(0, 8).map((n, i) => {
                      const angle =
                        (i * 2 * Math.PI) / Math.min(notes.length, 8);
                      return (
                        <path
                          key={n.id}
                          d={`M300 190 L${300 + 205 * Math.cos(angle)} ${190 + 140 * Math.sin(angle)}`}
                        />
                      );
                    })}
                  </g>
                </svg>
                <div className="workspace-graph-core">
                  <MoriMark size={40} />
                </div>
                {notes.slice(0, 8).map((n, i) => {
                  const angle = (i * 2 * Math.PI) / Math.min(notes.length, 8);
                  return (
                    <button
                      style={{
                        left: `${50 + 34 * Math.cos(angle)}%`,
                        top: `${50 + 36 * Math.sin(angle)}%`,
                      }}
                      key={n.id}
                      onClick={() => {
                        setSelected(n.id);
                        setView("notes");
                      }}
                    >
                      <Icon name="note" size={14} />
                      {n.title || "Untitled thought"}
                    </button>
                  );
                })}
              </div>
              <small>
                This preview connects your notes to your space. Smart idea
                linking is part of the proposed Plus plan.
              </small>
            </div>
          ) : note ? (
            <>
              <div className="editor-toolbar">
                <select
                  aria-label="Note collection"
                  value={note.category}
                  onChange={(e) => updateNote("category", e.target.value)}
                >
                  {["Personal", "Projects", "Reading", "Ideas"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <span>{note.updated}</span>
                <button
                  onClick={deleteNote}
                  aria-label="Delete this note"
                  title="Delete this note"
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>
              <input
                ref={titleRef}
                className="note-title-input"
                aria-label="Note title"
                placeholder="A thought begins here…"
                value={note.title}
                onChange={(e) => updateNote("title", e.target.value)}
              />
              <div className="note-editor-meta">
                <Icon name="leaf" size={13} /> No perfect thoughts required.
              </div>
              <textarea
                className="note-body-input"
                aria-label="Note content"
                placeholder={
                  "What's on your mind?\n\nStart anywhere. This little space is yours."
                }
                value={note.body}
                onChange={(e) => updateNote("body", e.target.value)}
              />
              <div className="editor-bottom">
                <span>
                  {note.body.trim() ? note.body.trim().split(/\s+/).length : 0}{" "}
                  words
                </span>
                <span>Your thoughts stay in this browser.</span>
              </div>
            </>
          ) : (
            <div className="workspace-empty">
              <MoriMark size={58} />
              <h2>A little room for something new.</h2>
              <p>Every good idea starts somewhere.</p>
              <button className="button-primary" onClick={addNote}>
                Plant your first thought <Icon name="plus" size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
}

export default function LandingPage({ version }: { version: number }) {
  const [modal, setModal] = useState<"workspace" | "pricing" | null>(null);
  const openApp = () => setModal("workspace");
  const openPricing = () => setModal("pricing");
  const closeModal = () => setModal(null);
  const heroes = [
    CalmMind,
    ConnectedMind,
    CuriousMind,
    FocusedMind,
    GrowingMind,
  ];
  const Hero = heroes[version - 1];
  return (
    <div className={`landing design-${version}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header version={version} openApp={openApp} openPricing={openPricing} />
      <main id="main">
        <Hero openApp={openApp} />
        <FeatureSections version={version} openApp={openApp} />
      </main>
      <Footer version={version} openApp={openApp} openPricing={openPricing} />

      {modal === "workspace" && <Workspace onClose={closeModal} />}
      {modal === "pricing" && (
        <PricingModal onClose={closeModal} openApp={openApp} />
      )}
    </div>
  );
}
