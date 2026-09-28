"use client";

import { useId, useState } from "react";
import s from "./page.module.css";

type Slip = {
  id: string;
  title: string;
  body: React.ReactNode;
  see?: string[];
};

const slips: Slip[] = [
  {
    id: "1",
    title: "Capture in one place",
    body: (
      <>
        Type it, paste it, clip it, forward it or say it out loud. It lands on
        today&rsquo;s note with the time and the source attached. Nothing to
        file, nothing to name.
      </>
    ),
    see: ["1a", "1b"],
  },
  {
    id: "1a",
    title: "Clip a page",
    body: (
      <>
        The browser extension saves the article and the passages you highlight.
        Each highlight becomes its own note, linked back to the page it came
        from.
      </>
    ),
    see: ["1"],
  },
  {
    id: "1b",
    title: "Say it out loud",
    body: (
      <>
        Voice memos are transcribed on your device. The audio stays there unless
        you turn on sync.
      </>
    ),
    see: ["1"],
  },
  {
    id: "2",
    title: "Link ideas by name",
    body: (
      <>
        Put double brackets around a name and the note joins every other note
        that mentions it. Names you forgot to bracket show up as unlinked
        mentions.
      </>
    ),
    see: ["2a"],
  },
  {
    id: "2a",
    title: "Follow a thread",
    body: (
      <>
        Open Priya and read down: a site visit from last month, an intro call
        from two years ago, a grocery note from yesterday. One click links the
        last one.
      </>
    ),
    see: ["2"],
  },
  {
    id: "3",
    title: "Ask your notes",
    body: (
      <>
        Ask in plain language. Engram answers from your notes only, and each
        sentence names the note it came from. If your notes don&rsquo;t say, it
        says so.
      </>
    ),
    see: ["2a"],
  },
  {
    id: "4",
    title: "Old notes come back",
    body: (
      <>
        Each morning Engram pins three older notes to Today, picked for what
        you&rsquo;re working on now. It chooses for relevance, not age.
      </>
    ),
    see: ["3"],
  },
  {
    id: "5",
    title: "Plain files, yours",
    body: (
      <>
        Every note is a Markdown file in a folder on your device. Open them in
        any editor, back them up by copying the folder.
      </>
    ),
    see: ["1"],
  },
];

/** A stack of index cards. One is open; the rest show their header strip and tab. */
export function Drawer() {
  const [open, setOpen] = useState("1");
  const base = useId();

  const pid = (id: string) => `${base}-${id}`;

  return (
    <div className={s.drawer}>
      <p className={s.drawerHint}>Pick a tab to open a note, or follow a See reference.</p>
      <div className={s.stack}>
        {slips.map((slip, i) => {
          const isOpen = open === slip.id;
          return (
            <article
              key={slip.id}
              className={s.slip}
              data-open={isOpen ? "true" : undefined}
              style={{ "--tab-x": `${(i % 4) * 4.2 + 1.25}rem` } as React.CSSProperties}
            >
              <button
                type="button"
                className={s.tab}
                tabIndex={-1}
                aria-hidden
                onClick={() => setOpen(slip.id)}
              >
                {slip.id}
              </button>
              <h3 className={s.slipHead}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={pid(slip.id)}
                  onClick={() => setOpen(slip.id)}
                >
                  <span className={s.srOnly}>{slip.id}, </span>
                  {slip.title}
                </button>
              </h3>
              <div
                id={pid(slip.id)}
                role="region"
                aria-label={`Note ${slip.id}: ${slip.title}`}
                className={s.slipPanel}
              >
                <div className={s.slipClip}>
                  <div className={s.slipBody}>
                    <p>{slip.body}</p>
                    {slip.see && (
                      <p className={s.see}>
                        See{" "}
                        {slip.see.map((ref, k) => (
                          <span key={ref}>
                            {k > 0 && ", "}
                            <button
                              type="button"
                              className={s.ref}
                              tabIndex={isOpen ? 0 : -1}
                              onClick={() => setOpen(ref)}
                            >
                              {ref}
                            </button>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
