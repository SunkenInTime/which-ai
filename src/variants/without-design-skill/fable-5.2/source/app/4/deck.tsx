"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import s from "./deck.module.css";

const CARDS = [
  {
    id: "1",
    title: "You were never supposed to remember all this.",
    body: "That is the card’s job. Yours is to have the next idea.",
    see: "1a",
  },
  {
    id: "1a",
    title: "One idea per card.",
    body: "If it needs an “and”, it needs another card. Small notes are the ones that get used twice.",
    see: "1a1",
  },
  {
    id: "1a1",
    title: "Every card gets an address.",
    body: "Type [[ and point it at the card it answers. Nothing is lost, only unvisited.",
    see: "1b",
  },
  {
    id: "1b",
    title: "The box answers back.",
    body: "Ask it a question. It replies with your own cards, and the addresses to prove it.",
    see: "2",
  },
  {
    id: "2",
    title: "Yours, in plain text.",
    body: "Each card is a .md file in a folder you own. Encrypted in transit. Legible in fifty years.",
    see: "1",
  },
];

/* How untidy each position in the pile is. */
const TILT = [-3, 2.6, -1.4, 4.2, -2.4];

/**
 * A pile of index cards. Drag the top one away (or press the button)
 * and it tucks itself behind the rest.
 */
export function Deck() {
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i));
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [leaving, setLeaving] = useState<{ card: number; x: number; y: number } | null>(null);
  const origin = useRef<{ x: number; y: number } | null>(null);

  const dismiss = (dx = 1, dy = -0.25) => {
    if (leaving) return;
    const len = Math.hypot(dx, dy) || 1;
    setLeaving({ card: order[0], x: (dx / len) * 620, y: (dy / len) * 620 });
    setDrag(null);
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
    }, 240);
  };

  const onDown = (e: PointerEvent<HTMLLIElement>) => {
    if (leaving || (e.pointerType === "mouse" && e.button !== 0)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    origin.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0 });
  };

  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    if (!origin.current) return;
    setDrag({ x: e.clientX - origin.current.x, y: e.clientY - origin.current.y });
  };

  const onUp = (e: PointerEvent<HTMLLIElement>) => {
    if (!origin.current) return;
    const dx = e.clientX - origin.current.x;
    const dy = e.clientY - origin.current.y;
    origin.current = null;
    const far = Math.hypot(dx, dy);
    if (far > 90) dismiss(dx, dy);
    else if (far < 6) dismiss();
    else setDrag(null);
  };

  const onCancel = () => {
    origin.current = null;
    setDrag(null);
  };

  const top = CARDS[order[0]];

  return (
    <div className={s.deck}>
      <ol className={s.pile}>
        {CARDS.map((card, i) => {
          const pos = order.indexOf(i);
          const isTop = pos === 0;
          const isLeaving = leaving?.card === i;
          let transform = `translate(${pos * 13}px, ${pos * 10}px) rotate(${TILT[pos]}deg)`;
          if (isLeaving) {
            transform = `translate(${leaving.x}px, ${leaving.y}px) rotate(${leaving.x / 22}deg)`;
          } else if (isTop && drag) {
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${TILT[0] + drag.x / 24}deg)`;
          }
          return (
            <li
              key={card.id}
              className={s.card}
              data-top={isTop || undefined}
              data-dragging={(isTop && drag !== null) || undefined}
              aria-hidden={!isTop}
              style={{ transform, zIndex: CARDS.length - pos }}
              onPointerDown={isTop ? onDown : undefined}
              onPointerMove={isTop ? onMove : undefined}
              onPointerUp={isTop ? onUp : undefined}
              onPointerCancel={isTop ? onCancel : undefined}
            >
              <p className={s.head}>
                <b>{card.id}</b>
                <span>Engram · slip-box</span>
              </p>
              <h3>{card.title}</h3>
              <p className={s.body}>{card.body}</p>
              <p className={s.foot}>
                <span>see also → {card.see}</span>
                {isTop ? <em>drag me away ↗</em> : null}
              </p>
              <i className={s.hole} />
            </li>
          );
        })}
      </ol>

      {/* Dragging and clicking need a pointer; this is the keyboard route. */}
      <button type="button" className={s.next} onClick={() => dismiss()}>
        Next card ({top.see})
      </button>
      <p className={s.status} aria-live="polite">
        Showing card {top.id}, {order[0] + 1} of {CARDS.length}
      </p>
    </div>
  );
}
