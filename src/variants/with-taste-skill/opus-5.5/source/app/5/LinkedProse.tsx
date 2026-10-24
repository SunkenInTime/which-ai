"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { NOTES } from "./data";
import s from "./page.module.css";

type Ctx = { active: string; open: (slug: string, scroll?: boolean) => void };
const LinkCtx = createContext<Ctx | null>(null);

/**
 * A run of prose whose [[links]] open the note they name in the margin beside the column
 * (on a phone the margin sits under the paragraphs). Without script each link is an anchor
 * to the same note in "Every note this page links to".
 */
export function LinkedSection({ initial, children }: { initial: string; children: ReactNode }) {
  const [active, setActive] = useState(initial);
  const marginRef = useRef<HTMLElement>(null);

  const open = useCallback((slug: string, scroll = false) => {
    setActive(slug);
    if (scroll && marginRef.current && window.matchMedia("(max-width: 1099px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      marginRef.current.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
    }
  }, []);

  const note = NOTES[active];

  return (
    <LinkCtx.Provider value={{ active, open }}>
      <div className={s.prose}>{children}</div>
      <aside ref={marginRef} className={s.margin} aria-label="Linked note">
        <div className={s.marginNote} data-ui="" aria-live="polite">
          <div key={note.slug} className={s.marginNoteInner}>
            <p className={s.marginMeta}>
              {note.folder}, edited {note.edited}
            </p>
            <p className={s.marginTitle}>{note.title}</p>
            {note.body.map((line) => (
              <p key={line} className={s.marginBody}>
                {line}
              </p>
            ))}
            <p className={s.marginFoot}>
              Linked from {note.backlinks} {note.backlinks === 1 ? "note" : "notes"}
            </p>
          </div>
        </div>
      </aside>
    </LinkCtx.Provider>
  );
}

export function NoteLink({ slug, children }: { slug: string; children: ReactNode }) {
  const ctx = useContext(LinkCtx);
  const isActive = ctx?.active === slug;
  return (
    <a
      href={`#note-${slug}`}
      className={s.noteLink}
      data-active={isActive ? "" : undefined}
      onMouseEnter={() => ctx?.open(slug)}
      onFocus={() => ctx?.open(slug)}
      onClick={(event) => {
        if (!ctx) return;
        event.preventDefault();
        ctx.open(slug, true);
      }}
    >
      <span className={s.bracket} aria-hidden="true">
        [[
      </span>
      {children}
      <span className={s.bracket} aria-hidden="true">
        ]]
      </span>
    </a>
  );
}
