"use client";

import { useState, type CSSProperties } from "react";
import s from "../p4.module.css";

type Band = {
  id: string;
  sentence: string;
  figure: string;
  more: string;
  /** Field colour when on, and the ink that sits on it. */
  bg: string;
  fg: string;
  on?: boolean;
};

const BANDS: Band[] = [
  {
    id: "capture",
    sentence: "Capture anything in under a second.",
    figure: "Six ways in, one inbox.",
    more: "Option+Space opens a blank note over whatever you are doing. Share from your phone, forward an email, clip a page, snap a whiteboard or say it aloud: voice memos are written out on your device.",
    bg: "var(--deep)",
    fg: "var(--paper)",
    on: true,
  },
  {
    id: "link",
    sentence: "Link two notes by typing two brackets.",
    figure: "Every link has two ends.",
    more: "Type [[ and pick a note. The other note shows the link too. Engram suggests links as you write; you accept or ignore them. Nothing is linked without you.",
    bg: "var(--teal)",
    fg: "var(--paper)",
  },
  {
    id: "find",
    sentence: "Find notes by meaning, not wording.",
    figure: "Every answer points to its source.",
    more: "Ask for “what Maya said about pricing” and get the note that never uses the word. Ask a question and read the answer in sentences, with the notes it drew on as footnotes.",
    bg: "var(--mint)",
    fg: "var(--ink)",
  },
  {
    id: "resurface",
    sentence: "Old notes come back before you forget.",
    figure: "Five returns in sixty days, five notes a day at most.",
    more: "Resurface brings a note back after 1, 3, 7, 21 and 60 days, unless you opened it since. It is the forgetting curve, answered.",
    bg: "var(--mid)",
    fg: "var(--paper)",
    on: true,
  },
  {
    id: "own",
    sentence: "Keep every note as a plain file.",
    figure: "Nothing to export, because they are already out.",
    more: "A folder of Markdown on your disk, readable by any editor. It works offline, and sync between your devices is end-to-end encrypted.",
    bg: "var(--sage)",
    fg: "var(--ink)",
  },
];

export function Features() {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(BANDS.map((b) => [b.id, !!b.on])),
  );

  return (
    <section className={s.features} id="features">
      {BANDS.map((b, i) => {
        const open = on[b.id];
        const Tag = i === 0 ? "h2" : "h3";
        return (
          <div
            key={b.id}
            className={s.band}
            data-on={open ? "true" : "false"}
            data-reveal="rise"
            style={{ "--bg": b.bg, "--fg": b.fg, "--i": i } as CSSProperties}
          >
            <div className={s.bandRow}>
              <Tag className={s.bandSentence} id={`band-${b.id}`}>
                {b.sentence}
              </Tag>
              <button
                type="button"
                role="switch"
                aria-checked={open}
                aria-labelledby={`band-${b.id}`}
                className={s.bandSwitch}
                onClick={() => setOn((p) => ({ ...p, [b.id]: !p[b.id] }))}
                data-ui
              >
                <span className={s.bandKnob} />
              </button>
            </div>
            <div className={s.bandMore} aria-hidden={!open}>
              <div className={s.bandMoreIn}>
                <p className={s.bandMoreText}>
                  <strong>{b.figure}</strong> {b.more}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
