"use client";

import { useMemo, useRef, useState } from "react";
import { PRODUCT } from "../../_shared/facts";
import {
  ADDR,
  childAddress,
  linkedIn,
  nextTrunk,
  pick,
  suggest,
} from "../addresses";
import s from "./showcase.module.css";

type Start = { tab: string; title: string; body: string };

const STARTS: Start[] = [
  {
    tab: "Maya’s interview",
    title: "Why Maya left her old app",
    body: "She could not find anything she had written. Price was not the issue. She stopped trusting that her notes were there, and she wanted to be able to leave with them. [[Plain text lasts]]",
  },
  {
    tab: "The shelf",
    title: "Shelf for the alcove",
    body: "Oak, 22 mm, hardwax oil. Two thin coats, then wait a day before the oil bottles and the spice jars go on. Brackets every 40 cm. [[Oak, how to finish]]",
  },
  {
    tab: "A chapter I’m reading",
    title: "Half the chapter is already gone",
    body: "I read it on Sunday and by Wednesday I could say about half of it. I should return to it sooner, and ask myself what it said instead of reading it again. [[The forgetting curve]]",
  },
];

export function Showcase() {
  const [which, setWhich] = useState(0);
  const [title, setTitle] = useState(STARTS[0].title);
  const [body, setBody] = useState(STARTS[0].body);
  const [caret, setCaret] = useState(STARTS[0].body.length);
  const area = useRef<HTMLTextAreaElement>(null);

  const linked = useMemo(() => linkedIn(body), [body]);
  const suggestions = useMemo(
    () => suggest(`${title} ${body}`, new Set(linked.map((n) => n.id))),
    [title, body, linked],
  );

  // An open "[[" just before the caret turns on the picker.
  const open = /\[\[([^\]\n]*)$/.exec(body.slice(0, caret));
  const choices = open ? pick(open[1]) : [];

  const address = linked.length
    ? childAddress(ADDR[linked[0].id])
    : nextTrunk();

  function choose(i: number) {
    setWhich(i);
    setTitle(STARTS[i].title);
    setBody(STARTS[i].body);
    setCaret(STARTS[i].body.length);
  }

  function put(text: string, from: number, to: number) {
    const next = body.slice(0, from) + text + body.slice(to);
    setBody(next);
    const at = from + text.length;
    setCaret(at);
    requestAnimationFrame(() => {
      area.current?.focus();
      area.current?.setSelectionRange(at, at);
    });
  }

  function link(titleToLink: string) {
    if (open) {
      put(`[[${titleToLink}]] `, open.index, caret);
    } else {
      const sep = body.endsWith(" ") || body === "" ? "" : " ";
      put(`${sep}[[${titleToLink}]]`, body.length, body.length);
    }
  }

  return (
    <section
      className={s.showcase}
      id="write"
      aria-labelledby="write-h"
    >
      <div className={s.plate} data-reveal>
        <div className={s.live} data-ui>
          <div className={s.card}>
            <div className={s.head}>
              <span>Card</span>
              <strong className={s.addr} aria-live="polite" key={address}>
                {address}
              </strong>
            </div>
            <label className={s.sr} htmlFor="live-title">
              Title
            </label>
            <input
              id="live-title"
              className={s.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              spellCheck={false}
            />
            <label className={s.sr} htmlFor="live-body">
              Note. Type [[ to link a card.
            </label>
            <div className={s.bodyWrap}>
            <textarea
              id="live-body"
              ref={area}
              className={s.body}
              value={body}
              rows={5}
              placeholder="Type, then [[ to link a card by name"
              onChange={(e) => {
                setBody(e.target.value);
                setCaret(e.target.selectionStart);
              }}
              onSelect={(e) => setCaret(e.currentTarget.selectionStart)}
              onKeyUp={(e) => setCaret(e.currentTarget.selectionStart)}
              onClick={(e) => setCaret(e.currentTarget.selectionStart)}
              spellCheck={false}
            />
            {open && (
              <ul className={s.picker} aria-label="Cards to link">
                {choices.map((n) => (
                  <li key={n.id}>
                    <button type="button" onClick={() => link(n.title)}>
                      <span>{ADDR[n.id]}</span>
                      {n.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            </div>
            <div className={s.see}>
              <p>See also</p>
              {linked.length === 0 ? (
                <p className={s.none}>
                  Nothing yet. This card will be filed at the end of the drawer.
                </p>
              ) : (
                <ul>
                  {linked.map((n) => (
                    <li key={n.id}>
                      <span>{ADDR[n.id]}</span>
                      {n.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className={s.hole} aria-hidden="true" />
          </div>

          <div className={s.suggest}>
            <p>Engram suggests</p>
            {suggestions.length === 0 ? (
              <p className={s.none}>
                Write a little more and neighbours will turn up.
              </p>
            ) : (
              <ul>
                {suggestions.map(({ note, shared }) => (
                  <li key={note.id}>
                    <div>
                      <span className={s.sa}>{ADDR[note.id]}</span>
                      <span className={s.st}>{note.title}</span>
                      <span className={s.sw}>
                        Shares “{shared.slice(0, 2).join("”, “")}”
                      </span>
                    </div>
                    <button type="button" onClick={() => link(note.title)}>
                      Link
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={s.text}>
        <ul className={s.tabs} aria-label="Start from">
          {STARTS.map((st, i) => (
            <li key={st.tab}>
              <button
                type="button"
                aria-pressed={i === which}
                onClick={() => choose(i)}
              >
                {st.tab}
              </button>
            </li>
          ))}
        </ul>
        <div className={s.copy}>
          <h2 id="write-h" className={s.h2} data-reveal style={{ "--i": 0 } as React.CSSProperties}>
            Write a card
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Type as you would on paper. Engram suggests the cards yours belongs
            beside. Link one, and your card gets an address and a See&nbsp;also
            line.
          </p>
        </div>
        <div className={s.cells} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          <a className={s.cellInk} href={PRODUCT.primaryHref}>
            {PRODUCT.primaryAction}
          </a>
          <a className={s.cellTone} href="#returns">
            How a card comes back
          </a>
        </div>
      </div>
    </section>
  );
}
