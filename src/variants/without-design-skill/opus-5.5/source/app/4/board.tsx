"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { CORK, Pin, tornBottom, type PinColor } from "./bits";

type Scrap = {
  id: string;
  label: string;
  w: number;
  mess: { x: number; y: number; r: number };
  tidy: { x: number; y: number };
  pin: PinColor;
  z: number;
  paper?: CSSProperties;
  torn?: boolean;
  body: ReactNode;
};

const STAGE_W = 600;
const STAGE_H = 620;

const WAVE = [
  6, 10, 18, 12, 24, 30, 16, 9, 20, 34, 28, 14, 8, 22, 36, 26, 12, 18, 30, 20,
  10, 6, 16, 26, 32, 18, 11, 24, 14, 8, 12, 20, 9, 5,
];

const SCRAPS: Scrap[] = [
  {
    id: "index",
    label: "Index card: reading note",
    w: 180,
    mess: { x: 14, y: 26, r: -6 },
    tidy: { x: 10, y: 24 },
    pin: "cobalt",
    z: 2,
    paper: {
      background:
        "linear-gradient(#E4472C, #E4472C) 0 34px / 100% 1.5px no-repeat, repeating-linear-gradient(#FFFDF6 0 19px, #BCD2EC 19px 20px) 0 36px / 100% calc(100% - 36px) no-repeat, #FFFDF6",
    },
    body: (
      <div className="px-3.5 pb-4 pt-3 font-(family-name:--font-type) text-[12px] leading-[20px] text-[#2B2520]">
        <p className="mb-[9px] font-bold tracking-wide">EXTENDED MIND, p.114</p>
        <p>&ldquo;We think with things, not just about them.&rdquo;</p>
        <p className="mt-[20px]">&rarr; ch.5: gesture, place, rhythm. Reread.</p>
      </div>
    ),
  },
  {
    id: "sticky",
    label: "Sticky note",
    w: 170,
    mess: { x: 405, y: 18, r: 6 },
    tidy: { x: 415, y: 24 },
    pin: "tomato",
    z: 3,
    paper: {
      background:
        "linear-gradient(160deg, #FFD867 0%, #F7C23E 70%, #EDB12C 100%)",
    },
    body: (
      <div className="flex h-[160px] flex-col justify-center px-4 pt-3 font-(family-name:--font-hand) text-[25px] leading-[1.02] text-[#3A2A10]">
        <p>
          ask Priya about the{" "}
          <span className="underline decoration-[#E4472C] decoration-2 underline-offset-4">
            spaced-repetition
          </span>{" "}
          paper she mentioned!!
        </p>
      </div>
    ),
  },
  {
    id: "note",
    label: "The Mneme note linking everything together",
    w: 200,
    mess: { x: 200, y: 205, r: -1.5 },
    tidy: { x: 205, y: 24 },
    pin: "tomato",
    z: 5,
    paper: { background: "#FFFFFF" },
    body: (
      <div className="px-4 pb-4 pt-4 text-[#231C15]">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7B6A]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4472C]" />
            Mneme
          </span>
          <span>Sep 22</span>
        </div>
        <p className="mt-2 text-[17px] font-extrabold leading-[1.1] tracking-[-0.01em]">
          Why do songs stick when books don&rsquo;t?
        </p>
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7B6A]">
          Linked by Mneme &middot; 5
        </p>
        <ul className="mt-1.5 space-y-1 text-[12px] leading-tight">
          {[
            ["#2446C8", "Extended Mind, p.114"],
            ["#E4472C", "Priya: spaced rep?"],
            ["#F5B83D", "Voice memo, 0:47"],
            ["#231C15", "Half Moon receipt (!)"],
            ["#2446C8", "Why melodies stick"],
          ].map(([c, t]) => (
            <li key={t} className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ background: c }}
              />
              <span className="underline decoration-[#231C15]/25 underline-offset-2">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "voice",
    label: "Voice memo",
    w: 180,
    mess: { x: 8, y: 360, r: 4 },
    tidy: { x: 10, y: 318 },
    pin: "marigold",
    z: 4,
    paper: { background: "#2446C8" },
    body: (
      <div className="px-3.5 pb-4 pt-4 text-white">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
          <span>Voice memo</span>
          <span>0:47</span>
        </div>
        <div className="mt-3 flex h-10 items-center gap-[2px]" aria-hidden>
          {WAVE.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: h,
                background: i < 13 ? "#F5B83D" : "rgba(255,255,255,.55)",
              }}
            />
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-snug text-white/90">
          &ldquo;&hellip;okay so why can I sing every word of <em>Dreams</em>{" "}
          but not one chapter of&hellip;&rdquo;
        </p>
        <p className="mt-2 text-[10px] text-white/70">Sep 3 &middot; walking home</p>
      </div>
    ),
  },
  {
    id: "clip",
    label: "Clipped web article",
    w: 180,
    mess: { x: 222, y: 452, r: -3 },
    tidy: { x: 210, y: 318 },
    pin: "cobalt",
    z: 3,
    paper: { background: "#FFFFFF" },
    body: (
      <div className="p-2.5 pt-4 text-[#231C15]">
        <div
          aria-hidden
          className="relative h-14 overflow-hidden rounded-[3px] bg-[#F5B83D]"
        >
          <svg viewBox="0 0 160 56" className="h-full w-full" preserveAspectRatio="none">
            {[14, 22, 30, 38, 46].map((y) => (
              <line key={y} x1="0" x2="160" y1={y} y2={y} stroke="#231C15" strokeOpacity=".35" strokeWidth="1" />
            ))}
            {[
              [24, 38], [44, 30], [62, 34], [84, 22], [104, 26], [128, 18],
            ].map(([x, y]) => (
              <g key={x}>
                <ellipse cx={x} cy={y} rx="5" ry="3.6" fill="#231C15" transform={`rotate(-20 ${x} ${y})`} />
                <line x1={x + 4.5} x2={x + 4.5} y1={y} y2={y - 16} stroke="#231C15" strokeWidth="1.4" />
              </g>
            ))}
          </svg>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7B6A]">
          <span className="grid h-3 w-3 place-items-center rounded-[2px] bg-[#231C15] text-[7px] text-white">
            a
          </span>
          aeon.co &middot; clipped
        </p>
        <p className="mt-1 text-[14px] font-bold leading-[1.15]">
          Why melodies stick in the mind like burrs
        </p>
        <p className="mt-1 text-[10px] text-[#8A7B6A]">Aug 28 &middot; 9 min read</p>
      </div>
    ),
  },
  {
    id: "receipt",
    label: "Coffee receipt with a scribbled idea",
    w: 170,
    mess: { x: 420, y: 270, r: 3 },
    tidy: { x: 415, y: 318 },
    pin: "ink",
    z: 4,
    torn: true,
    paper: { background: "#FAF8F2" },
    body: (
      <div className="relative px-3.5 pb-6 pt-5 font-(family-name:--font-type) text-[11px] leading-[16px] text-[#3B3530]">
        <p className="text-center font-bold tracking-[0.12em]">HALF MOON COFFEE</p>
        <p className="text-center">41 Linden St &middot; SF</p>
        <p className="mt-1 text-center">09/03/26&nbsp;&nbsp;08:12</p>
        <p className="my-1.5 border-t border-dashed border-[#3B3530]/50" />
        <p className="flex justify-between"><span>1 CORTADO</span><span>5.25</span></p>
        <p className="flex justify-between"><span>1 CROISSANT</span><span>4.50</span></p>
        <p className="mt-1 flex justify-between font-bold"><span>TOTAL</span><span>9.75</span></p>
        <p className="mt-3 -rotate-6 font-(family-name:--font-hand) text-[22px] leading-none text-[#D13A22]">
          chorus = a <span className="underline decoration-2 underline-offset-2">retrieval cue</span>??
        </p>
      </div>
    ),
  },
];

const CENTER = SCRAPS.find((s) => s.id === "note")!;
const pinOf = (s: Scrap) => ({ x: s.mess.x + s.w / 2, y: s.mess.y + 9 });

function stringPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return `M ${from.x} ${from.y} Q ${mx} ${my + 18 + dist * 0.12} ${to.x} ${to.y}`;
}

export function Board() {
  const [locked, setLocked] = useState(false);
  const [preview, setPreview] = useState(false);
  const tidy = locked || preview;
  const center = pinOf(CENTER);

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-end gap-3">
        <span
          aria-hidden
          className="font-(family-name:--font-hand) text-[22px] leading-none text-[#231C15]/70"
        >
          {tidy ? "ahh, much better" : "a bit much?"}
        </span>
        <button
          type="button"
          aria-pressed={locked}
          onPointerEnter={() => setPreview(true)}
          onPointerLeave={() => setPreview(false)}
          onClick={() => {
            setLocked((v) => !v);
            setPreview(false);
          }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#231C15] bg-[#FBF4E4] px-4 py-1.5 text-[14px] font-bold text-[#231C15] shadow-[3px_3px_0_#231C15] transition-transform hover:-translate-y-px focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2446C8] active:translate-y-px active:shadow-[1px_1px_0_#231C15]"
        >
          <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none">
            {locked ? (
              <path d="M3 4.5l3.5 1-1 3.5M13 6l-2.5 3 3 2M6 12.5l3-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
              </>
            )}
          </svg>
          {locked ? "Make a mess again" : "Tidy up"}
        </button>
      </div>

      <figure
        className="relative overflow-hidden rounded-[22px] border-[10px] border-[#8A5A2E] p-3 shadow-[inset_0_2px_10px_rgba(60,30,0,.45),0_24px_50px_-20px_rgba(70,35,0,.55)] sm:p-5"
        style={{ ...CORK, borderColor: "#9A6636 #7E4F26 #6E421E #8A5A2E" }}
        aria-label="A corkboard of notes: an index card, a sticky note, a voice memo, a coffee receipt and a clipped article, all tied with red string to one Mneme note"
      >
        <div className="mx-auto w-fit [zoom:0.5] min-[400px]:[zoom:0.56] min-[480px]:[zoom:0.68] sm:[zoom:0.86] md:[zoom:1] lg:[zoom:0.78] xl:[zoom:0.92] 2xl:[zoom:1]">
          <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
            {SCRAPS.map((s, i) => {
              const pos = tidy ? { ...s.tidy, r: 0 } : s.mess;
              return (
                <div
                  key={s.id}
                  aria-label={s.label}
                  role="group"
                  className="absolute left-0 top-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(.3,1.35,.5,1)]"
                  style={{
                    width: s.w,
                    zIndex: s.z,
                    transformOrigin: `50% 9px`,
                    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.r}deg)`,
                    transitionDelay: `${(tidy ? i : SCRAPS.length - i) * 45}ms`,
                    filter:
                      "drop-shadow(0 1px 1px rgba(40,20,0,.25)) drop-shadow(0 10px 12px rgba(60,30,0,.28))",
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      ...s.paper,
                      clipPath: s.torn ? tornBottom(14, 7) : undefined,
                      borderRadius: s.torn ? 0 : 3,
                    }}
                  >
                    {s.body}
                  </div>
                  <Pin color={s.pin} className="left-1/2 top-0 -translate-x-1/2" />
                </div>
              );
            })}

            {/* red string */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 motion-safe:transition-opacity motion-safe:duration-300"
              style={{ opacity: tidy ? 0 : 1 }}
              width={STAGE_W}
              height={STAGE_H}
              viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            >
              {SCRAPS.filter((s) => s !== CENTER).map((s) => {
                const d = stringPath(pinOf(s), center);
                return (
                  <g key={s.id}>
                    <path d={d} fill="none" stroke="rgba(40,15,0,.28)" strokeWidth="2.5" transform="translate(2 4)" />
                    <path d={d} fill="none" stroke="#D32F1A" strokeWidth="2.2" strokeLinecap="round" />
                    <path d={d} fill="none" stroke="#FF8C73" strokeWidth=".7" strokeDasharray="2 5" strokeLinecap="round" opacity=".8" />
                  </g>
                );
              })}
            </svg>
            <Pin
              color="tomato"
              className="z-20 -translate-x-1/2 motion-safe:transition-opacity"
              style={{ left: center.x, top: center.y - 9, opacity: tidy ? 0 : 1 }}
            />

            {/* handwritten annotation */}
            <div
              aria-hidden
              className="pointer-events-none absolute z-20 w-[190px] text-center font-(family-name:--font-hand) text-[26px] leading-[0.95] text-[#FFF6E2] motion-safe:transition-opacity motion-safe:duration-300"
              style={{ left: 205, top: 36, opacity: tidy ? 0 : 1, textShadow: "0 1px 2px rgba(60,30,0,.6)" }}
            >
              five scraps,
              <br />
              four weeks,
              <br />
              one idea
              <svg width="60" height="70" viewBox="0 0 60 70" className="mx-auto mt-1 block" fill="none">
                <path d="M20 4 C 44 14, 46 36, 30 56" stroke="#FFF6E2" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M22 50 L 30 58 L 38 49" stroke="#FFF6E2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute z-20 font-(family-name:--font-hand) text-[28px] leading-none text-[#FFF6E2] motion-safe:transition-opacity motion-safe:duration-500"
              style={{ left: 190, top: 548, opacity: tidy ? 1 : 0, textShadow: "0 1px 2px rgba(60,30,0,.6)" }}
            >
              same thoughts. findable now.
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}
