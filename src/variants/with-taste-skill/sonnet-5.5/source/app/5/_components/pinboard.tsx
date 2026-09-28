"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Microphone } from "@phosphor-icons/react";

type Item = {
  id: string;
  x: number;
  y: number;
  rotate: number;
  tone: string;
  body: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    id: "call",
    x: 4,
    y: 5,
    rotate: -5,
    tone: "bg-(--c-accent) text-(--c-on-accent)",
    body: <p className="text-[18px] font-bold leading-tight">Call Marta about week one drop-off</p>,
  },
  {
    id: "photo",
    x: 50,
    y: 8,
    rotate: 4,
    tone: "bg-(--c-surface) text-(--c-ink)",
    body: (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/cairn-whiteboard-sketch-tuesday/400/300"
          alt="A whiteboard covered in diagrams"
          width={400}
          height={300}
          draggable={false}
          className="aspect-[4/3] w-full object-cover"
        />
        <p className="mono mt-2 text-[12px]">Whiteboard, Tuesday</p>
      </>
    ),
  },
  {
    id: "spaced",
    x: 8,
    y: 40,
    rotate: 3,
    tone: "bg-(--c-surface) text-(--c-ink)",
    body: <p className="text-[16px] font-bold leading-tight">Spaced repetition beats rereading</p>,
  },
  {
    id: "memo",
    x: 46,
    y: 50,
    rotate: -3,
    tone: "bg-(--c-ink) text-(--c-bg)",
    body: (
      <p className="flex items-center gap-3 text-[16px] font-bold">
        <Microphone size={22} weight="bold" />
        Voice memo, 0:42
      </p>
    ),
  },
  {
    id: "article",
    x: 12,
    y: 72,
    rotate: -2,
    tone: "bg-(--c-surface-2) text-(--c-ink)",
    body: (
      <>
        <p className="text-[16px] font-bold leading-tight">Why we forget most of what we read</p>
        <p className="mono mt-2 text-[12px]">Saved article</p>
      </>
    ),
  },
];

function SortedCard({ item, span }: { item: Item; span: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      layoutId={reduce ? undefined : `pin-${item.id}`}
      initial={false}
      animate={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`self-start border-[3px] border-(--c-ink) p-4 shadow-[5px_5px_0_var(--c-ink)] ${
        span ? "col-span-2" : ""
      } ${item.tone}`}
    >
      {item.body}
    </motion.div>
  );
}

function PileCard({
  item,
  boardRef,
  onGrab,
  zIndex,
}: {
  item: Item;
  boardRef: React.RefObject<HTMLDivElement | null>;
  onGrab: () => void;
  zIndex: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      layoutId={reduce ? undefined : `pin-${item.id}`}
      drag
      dragConstraints={boardRef}
      dragMomentum={false}
      dragElastic={0.05}
      onPointerDown={onGrab}
      whileDrag={{ scale: 1.05, rotate: 0 }}
      initial={false}
      animate={{ rotate: item.rotate }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      style={{ left: `${item.x}%`, top: `${item.y}%`, zIndex }}
      className={`absolute w-[44%] cursor-grab touch-none select-none border-[3px] border-(--c-ink) p-4 shadow-[5px_5px_0_var(--c-ink)] active:cursor-grabbing ${item.tone}`}
    >
      {item.body}
    </motion.div>
  );
}

export function Pinboard() {
  const [sorted, setSorted] = useState(false);
  const [order, setOrder] = useState<string[]>(ITEMS.map((i) => i.id));
  const boardRef = useRef<HTMLDivElement>(null);

  function raise(id: string) {
    setOrder((o) => [...o.filter((x) => x !== id), id]);
  }

  return (
    <div>
      <div
        ref={boardRef}
        className="board-dots relative isolate h-[600px] overflow-hidden border-[3px] border-(--c-ink) bg-(--c-surface-2) shadow-[8px_8px_0_var(--c-ink)]"
      >
        {sorted ? (
          <div className="grid h-full grid-cols-2 content-start gap-4 p-4">
            {ITEMS.map((item, i) => (
              <SortedCard key={item.id} item={item} span={i === ITEMS.length - 1} />
            ))}
          </div>
        ) : (
          ITEMS.map((item) => (
            <PileCard
              key={item.id}
              item={item}
              boardRef={boardRef}
              onGrab={() => raise(item.id)}
              zIndex={order.indexOf(item.id) + 1}
            />
          ))
        )}
      </div>
      <button
        type="button"
        onClick={() => setSorted((s) => !s)}
        aria-pressed={sorted}
        className="mono mt-8 inline-flex h-11 items-center whitespace-nowrap border-[3px] border-(--c-ink) bg-(--c-surface) px-5 text-[14px] font-bold shadow-[4px_4px_0_var(--c-ink)] transition-transform hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--c-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-accent)"
      >
        {sorted ? "Back to the pile" : "Sort my notes"}
      </button>
      <p className="mt-3 text-[14px] text-(--c-fg-2)">Drag the cards around. Then let Cairn tidy them.</p>
    </div>
  );
}
