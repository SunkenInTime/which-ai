"use client";

import { motion, useMotionValue, useReducedMotion, type MotionStyle } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { Photo } from "../_components/photo";
import { cn } from "../_lib/cn";

/*
  Draggable desk of notes and photos for the hero. Purely a toy: the content
  is sample material and nothing here is needed to read the page. Dragging is
  on from 1280px up; below that the same items sit in a static grid.
*/

type Item =
  | {
      id: string;
      kind: "note";
      title: string;
      body: string;
      link: string;
      x: string;
      y: string;
      rotate: number;
      w: number;
    }
  | { id: string; kind: "sticky"; body: string; x: string; y: string; rotate: number; w: number }
  | {
      id: string;
      kind: "photo";
      photo: number;
      alt: string;
      caption: string;
      x: string;
      y: string;
      rotate: number;
      w: number;
    };

const ITEMS: Item[] = [
  {
    id: "yellow-garage",
    kind: "photo",
    photo: 133,
    alt: "Two vintage cars parked in front of bright yellow garage doors",
    caption: "Saved on a walk",
    x: "53%",
    y: "5%",
    rotate: 5,
    w: 250,
  },
  {
    id: "launch",
    kind: "note",
    title: "Launch retro",
    body: "Vendor slipped, then scope crept. Freeze scope earlier next time.",
    link: "Roadmap draft",
    x: "73%",
    y: "13%",
    rotate: -3,
    w: 270,
  },
  {
    id: "berries",
    kind: "photo",
    photo: 102,
    alt: "Three raspberries on a pale ledge in warm light",
    caption: "Jam, take two",
    x: "60%",
    y: "43%",
    rotate: -6,
    w: 215,
  },
  {
    id: "licensing",
    kind: "sticky",
    body: "Ask Priya about the licensing clause.",
    x: "84%",
    y: "47%",
    rotate: 4,
    w: 190,
  },
  {
    id: "bread",
    kind: "note",
    title: "Sourdough",
    body: "Wetter dough, longer rest. The starter wants a warm shelf.",
    link: "Starter log",
    x: "48%",
    y: "68%",
    rotate: 2,
    w: 250,
  },
  {
    id: "reading",
    kind: "note",
    title: "Reading list",
    body: "Deep Work, The Overstory, Antifragile. Start with the one about trees.",
    link: "Books to read next",
    x: "13%",
    y: "69%",
    rotate: -2,
    w: 255,
  },
  {
    id: "trike",
    kind: "photo",
    photo: 146,
    alt: "A small red tricycle chained beside a doorway",
    caption: "Dad's old trike",
    x: "71%",
    y: "65%",
    rotate: -2,
    w: 225,
  },
];

const SURFACE =
  "bg-[color:var(--surface,var(--bg-2))] shadow-[0_18px_30px_-16px_rgb(22_22_34/0.38)] ring-1 ring-[color:var(--line)]";

const mq = "(min-width: 1280px)";
function subscribe(cb: () => void) {
  const list = window.matchMedia(mq);
  list.addEventListener("change", cb);
  return () => list.removeEventListener("change", cb);
}
const useIsDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mq).matches,
    () => false,
  );

function Card({
  item,
  index,
  canDrag,
  bounds,
  frontRef,
}: {
  item: Item;
  index: number;
  canDrag: boolean;
  bounds: React.RefObject<HTMLDivElement | null>;
  frontRef: React.RefObject<number>;
}) {
  const reduce = useReducedMotion();
  const zIndex = useMotionValue(1);
  const bringToFront = () => {
    frontRef.current += 1;
    zIndex.set(frontRef.current);
  };

  return (
    <motion.div
      drag={canDrag}
      dragConstraints={bounds}
      dragElastic={0.12}
      dragMomentum={false}
      onPointerDown={bringToFront}
      initial={reduce ? false : { opacity: 0, y: -28, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.45 + index * 0.09 }}
      whileHover={canDrag ? { scale: 1.03 } : undefined}
      whileDrag={{ scale: 1.06 }}
      style={
        {
          rotate: item.rotate,
          zIndex,
          "--x": item.x,
          "--y": item.y,
          "--w": `${item.w}px`,
        } as unknown as MotionStyle
      }
      className={cn(
        "w-full select-none xl:absolute xl:left-(--x) xl:top-(--y) xl:w-(--w)",
        canDrag && "cursor-grab touch-none active:cursor-grabbing",
      )}
    >
      {item.kind === "note" && (
        <div className={cn("rounded-md p-4", SURFACE)}>
          <p className="font-semibold tracking-tight">{item.title}</p>
          <p className="mt-1.5 text-sm leading-snug text-[color:var(--fg-2)]">{item.body}</p>
          <p className="mt-3 font-[family-name:var(--v-mono)] text-[12px]">
            <span className="hl hl-static">[[{item.link}]]</span>
          </p>
        </div>
      )}
      {item.kind === "sticky" && (
        <div className="rounded-md bg-[color:var(--accent)] p-5 text-[color:var(--on-accent)] shadow-[0_18px_30px_-16px_rgb(70_56_0/0.55)]">
          <p className="text-lg font-semibold leading-snug tracking-tight">{item.body}</p>
        </div>
      )}
      {item.kind === "photo" && (
        <figure className={cn("rounded-md p-2.5 pb-3", SURFACE)}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
            <Photo
              id={item.photo}
              alt={item.alt}
              sizes="250px"
              className="pointer-events-none"
            />
          </div>
          <figcaption className="mt-2.5 text-[13px] text-[color:var(--fg-2)]">{item.caption}</figcaption>
        </figure>
      )}
    </motion.div>
  );
}

export function HeroDesk() {
  const bounds = useRef<HTMLDivElement>(null);
  const frontRef = useRef(10);
  const canDrag = useIsDesktop();

  return (
    <div
      ref={bounds}
      role="group"
      aria-label="Sample notes and photos. On large screens you can drag them around."
      className="grid grid-cols-2 gap-x-5 gap-y-7 px-5 pb-16 md:grid-cols-3 md:px-8 xl:absolute xl:inset-0 xl:block xl:p-0"
    >
      {ITEMS.map((item, i) => (
        <Card
          key={item.id}
          item={item}
          index={i}
          canDrag={canDrag}
          bounds={bounds}
          frontRef={frontRef}
        />
      ))}
    </div>
  );
}
