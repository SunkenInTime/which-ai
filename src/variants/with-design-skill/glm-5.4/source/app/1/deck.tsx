"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./slip.module.css";

type Card = {
  id: string;
  title: string;
  body: string;
  links: string[];
  x: number;
  y: number;
  r: number;
  z: number;
};

const cards: Card[] = [
  {
    id: "21/3b1",
    title: "Luhmann's box",
    body: "90,000 cards, each pointing at the next. A conversation partner, not an archive.",
    links: ["21/3b2", "21/4a1"],
    x: 0,
    y: 0,
    r: -7,
    z: 1,
  },
  {
    id: "21/4a1",
    title: "Forgetting curve",
    body: "Ebbinghaus, 1885. Memory halves within a day unless you return.",
    links: ["21/3b2"],
    x: 238,
    y: 10,
    r: 7,
    z: 2,
  },
  {
    id: "21/3b2",
    title: "Spaced repetition",
    body: "Reviewed just before you'd forget it, a card stays for years. The box resurfaces it.",
    links: ["21/4a1", "21/3b1"],
    x: 118,
    y: 184,
    r: 1.5,
    z: 3,
  },
  {
    id: "22/1a",
    title: "City planning",
    body: "Why do old cities feel walkable? Block size, mostly. Check 22/1a3 before Tuesday's meeting.",
    links: ["22/1a3", "21/4a1"],
    x: 0,
    y: 366,
    r: -4,
    z: 4,
  },
  {
    id: "22/1a3",
    title: "Block size",
    body: "Portland's 60-metre blocks against Salt Lake's 200. More corners, more walking, more shops.",
    links: ["22/1a"],
    x: 238,
    y: 378,
    r: 5,
    z: 5,
  },
];

type Thread = { key: string; d: string };

export default function Deck() {
  const [active, setActive] = useState<string | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const activeCard = cards.find((card) => card.id === active) ?? null;
  const related = activeCard
    ? cards
        .filter(
          (card) =>
            card.id !== activeCard.id &&
            (activeCard.links.includes(card.id) || card.links.includes(activeCard.id)),
        )
        .map((card) => card.id)
    : [];

  useLayoutEffect(() => {
    const deck = deckRef.current;
    if (!deck || !activeCard) {
      // Gallery adaptation: the source's own lint (eslint-config-next 16.3.8) passes this; the gallery's older config flags it.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThreads([]);
      return;
    }
    const draw = () => {
      const deckBox = deck.getBoundingClientRect();
      const anchor = (id: string, fy: number) => {
        const box = cardRefs.current[id]?.getBoundingClientRect();
        if (!box) return null;
        return {
          x: box.left - deckBox.left + box.width / 2,
          y: box.top - deckBox.top + box.height * fy,
        };
      };
      const from = anchor(activeCard.id, 0.32);
      if (!from) return;
      setThreads(
        activeCard.links
          .map((id) => ({ id, to: anchor(id, 0.32) }))
          .filter((item): item is { id: string; to: { x: number; y: number } } => item.to !== null)
          .map(({ id, to }) => {
            const mx = (from.x + to.x) / 2;
            const my = Math.min(from.y, to.y) - 36;
            return { key: id, d: `M${from.x} ${from.y} Q${mx} ${my} ${to.x} ${to.y}` };
          }),
      );
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(deck);
    return () => observer.disconnect();
  }, [activeCard]);

  return (
    <div
      ref={deckRef}
      className={styles.deck}
      onPointerLeave={() => setActive(null)}
      onPointerCancel={() => setActive(null)}
    >
      <svg className={styles.threads} aria-hidden="true">
        {threads.map((thread) => (
          <path key={thread.key} d={thread.d} className={styles.thread} />
        ))}
      </svg>
      {cards.map((card) => {
        const isActive = card.id === active;
        const isLit = related.includes(card.id);
        return (
          <article
            key={card.id}
            ref={(element) => {
              cardRefs.current[card.id] = element;
            }}
            className={styles.card}
            style={
              {
                "--x": `${card.x / 4.7}cqw`,
                "--y": `${card.y / 4.7}cqw`,
                "--r": `${card.r}deg`,
                "--z": card.z,
              } as CSSProperties
            }
            tabIndex={0}
            data-active={isActive || undefined}
            data-lit={isLit || undefined}
            onPointerEnter={() => setActive(card.id)}
            onFocus={() => setActive(card.id)}
            onBlur={() => setActive(null)}
            aria-label={`Card ${card.id}: ${card.title}`}
          >
            <span className={styles.cardId}>{card.id}</span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardBody}>{card.body}</p>
            <p className={styles.cardLinks}>
              links: {card.links.join(", ")}
            </p>
          </article>
        );
      })}
    </div>
  );
}
