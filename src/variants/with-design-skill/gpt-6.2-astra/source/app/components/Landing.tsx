"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { editions } from "./content";
import { Icon, Mark } from "./Icons";
import { Notebook } from "./Notebook";
import { Paper, Pinboard, Constellation, Journal, CardIndex } from "./Designs";

const pages = [Paper, Pinboard, Constellation, Journal, CardIndex];
const sections = [
  [
    ["How it works", "#how-it-works"],
    ["Use cases", "#use-cases"],
    ["FAQ", "#faq"],
  ],
  [
    ["The board", "#pinboard"],
    ["Collections", "#collections"],
    ["FAQ", "#faq"],
  ],
  [
    ["Explore the map", "#map"],
    ["Connections", "#connections"],
    ["FAQ", "#faq"],
  ],
  [
    ["Field notes", "#field-notes"],
    ["FAQ", "#faq"],
  ],
  [
    ["Browse the index", "#index"],
    ["FAQ", "#faq"],
  ],
];
const faqs = [
  [
    "Do I need an account?",
    "You can start writing straight away. Open the notebook and choose New note to make your first entry.",
  ],
  [
    "Where are my notes saved?",
    "Your notes are saved automatically in this browser on this device. They stay here between visits. Clearing your browser’s site data will remove them.",
  ],
  [
    "How do I connect two notes?",
    "Open an entry, choose Link a note, and select another entry. Both notes will show the connection so you can follow it in either direction.",
  ],
];

function Switcher({ edition }: { edition: number }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    box.current
      ?.querySelector<HTMLAnchorElement>("a")
      ?.focus({ preventScroll: true });
    function outside(e: PointerEvent) {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    }
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <div className="switcher" ref={box}>
      {open && (
        <nav
          id="design-options"
          className="switcher-menu"
          aria-label="Landing page designs"
        >
          <p>Choose a design</p>
          {editions.map((d) => (
            <Link
              href={"/" + d.id}
              key={d.id}
              aria-current={d.id === edition ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <i style={{ background: d.color }} />
              <span>0{d.id}</span>
              {d.name}
              {d.id === edition && <Icon name="check" size={15} />}
            </Link>
          ))}
        </nav>
      )}
      <button
        ref={toggle}
        className="switcher-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={open ? "design-options" : undefined}
      >
        <Icon name="layers" size={16} />
        <span>Design</span>
        <b>{edition} / 5</b>
        <Icon name={open ? "down" : "up"} size={13} />
      </button>
    </div>
  );
}

export default function Landing({ edition }: { edition: number }) {
  const [noteId, setNoteId] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menu) return;
    nav.current?.querySelector("a")?.focus({ preventScroll: true });
    function closeMenu(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(false);
        menuToggle.current?.focus();
      }
    }
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, [menu]);
  const Page = pages[edition - 1];
  function openNotebook(id = "") {
    setNoteId(id);
    setMenu(false);
  }
  return (
    <div className={"landing theme-" + edition} id="top">
      <header className="site-header">
        <div className="header-inner">
          <Link
            className="brand"
            href={"/with-design-skill/gpt-6.2-astra/" + edition}
            aria-label="Notefold home"
          >
            <Mark />
            <span>Notefold</span>
          </Link>
          <nav
            ref={nav}
            id="main-menu"
            className={"primary-nav" + (menu ? " mobile-open" : "")}
            aria-label="Main navigation"
          >
            {sections[edition - 1].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <button className="open-notebook" onClick={() => openNotebook()}>
            Open notebook
            <Icon name="upRight" size={15} />
          </button>
          <button
            ref={menuToggle}
            aria-controls="main-menu"
            className="mobile-menu-button icon-btn"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "cross" : "menu"} />
          </button>
        </div>
      </header>
      <main>
        <Page openNotebook={openNotebook} />
        <section id="faq" className="faq-section wrap">
          <h2>A few questions</h2>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Icon name="plus" size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">
          <Link className="brand" href={"/with-design-skill/gpt-6.2-astra/" + edition}>
            <Mark />
            Notefold
          </Link>
          <a href="#top">
            Back to top <Icon name="up" size={14} />
          </a>
        </div>
      </footer>
      {/* Gallery adaptation: the model's design switcher isn't rendered; the gallery has its own. */}
      {noteId !== null && (
        <Notebook initialId={noteId} onClose={() => setNoteId(null)} />
      )}
    </div>
  );
}
