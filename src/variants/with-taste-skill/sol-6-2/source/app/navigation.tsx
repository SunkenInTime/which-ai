"use client";

import { useEffect, useRef, useState } from "react";
import { editions, type EditionId } from "./editions";
import { Icon, Mark } from "./icons";

export function Brand() {
  return <a className="brand nav__logo" href="#top" aria-label="Veybrin home"><Mark /> <span>veybrin</span></a>;
}

export function WorkspaceLink({ className = "" }: { className?: string }) {
  return <a className={`btn btn--primary ${className}`} href="#workspace">Open workspace <Icon name="arrow" size={18} /></a>;
}

export function Header({ edition }: { edition: EditionId }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const secondary = edition === "4" ? "Collections" : edition === "5" ? "Search" : "Connections";

  useEffect(() => {
    if (open) firstLink.current?.focus();
  }, [open]);

  function closeMenu() {
    setOpen(false);
    toggle.current?.focus();
  }

  return (
    <header className="nav" data-edition={edition} onKeyDown={(event) => { if (open && event.key === "Escape") closeMenu(); }}>
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Skip to content</a>
        <Brand />
        <nav className={`nav__links${open ? " is-open" : ""}`} aria-label="Main" id="site-menu" onClick={(event) => {
          if ((event.target as Element).closest("a")) setOpen(false);
        }}>
          <a className="nav__link" href="#top" ref={firstLink}>Overview</a>
          <a className="nav__link" href="#workspace">Notebook</a>
          <a className="nav__link" href="#connections">{secondary}</a>
        </nav>
        <div className="nav__actions">
          {/* Gallery adaptation: the model's design switcher isn't rendered; the gallery has its own. */}
          <WorkspaceLink />
          <button className="nav__toggle" type="button" ref={toggle} aria-label={open ? "Close menu" : "Open menu"} aria-controls="site-menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} size={21} /></button>
        </div>
      </div>
    </header>
  );
}

function EditionSwitcher({ current }: { current: EditionId }) {
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!details.current?.contains(event.target as Node) && details.current) details.current.open = false;
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);

  return (
    <details className="edition-switcher" ref={details} onKeyDown={(event) => {
      if (event.key === "Escape" && details.current?.open) {
        details.current.open = false;
        summary.current?.focus();
      }
    }}>
      <summary ref={summary} aria-label={`Switch design, currently design ${current} of 5`}>
        <Icon name="layers" size={17} />
        <span>Design {current} / 5</span>
        <Icon name="down" size={15} />
      </summary>
      <nav aria-label="Landing page designs">
        {editions.map(({ id, name }) => (
          <a href={`/${id}`} key={id} aria-current={id === current ? "page" : undefined}>
            <span className={`edition-dot edition-dot--${id}`} aria-hidden="true" />
            <span>{name}</span>
            {id === current && <Icon name="check" size={16} />}
          </a>
        ))}
      </nav>
    </details>
  );
}
