"use client";

import { useState } from "react";
import s from "./constellation.module.css";

type Node = { title: string; x: number; y: number };

const NODES: Node[] = [
  { title: "Lisbon offsite — budget", x: 196, y: 150 },
  { title: "Call w/ Inês — catering", x: 104, y: 92 },
  { title: "Daily — 9 Sep 2026", x: 292, y: 96 },
  { title: "Offsite venue shortlist", x: 70, y: 186 },
  { title: "Knee: left, lateral, again", x: 88, y: 292 },
  { title: "Physio — Dr. Okafor", x: 178, y: 318 },
  { title: "Long run — 18 km, easy", x: 150, y: 232 },
  { title: "The Extended Mind — A. M. Paul", x: 318, y: 196 },
  { title: "Quote — Vannevar Bush, 1945", x: 356, y: 292 },
  { title: "Voice memo — walking home", x: 262, y: 300 },
  { title: "Q4 planning — three themes", x: 196, y: 40 },
  { title: "Zettelkasten, honestly", x: 360, y: 60 },
  { title: "Sleep log, September", x: 34, y: 110 },
  { title: "Why I stopped using folders", x: 262, y: 218 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 3], [0, 10], [2, 10], [2, 11], [1, 12],
  [4, 5], [4, 6], [5, 6], [6, 12], [6, 0],
  [7, 8], [7, 9], [8, 9], [7, 11], [7, 13], [13, 0], [13, 9], [2, 13],
];

type Seg = string | { cite: number };

type QA = {
  q: string;
  answer: Seg[];
  sources: { node: number; date: string; excerpt: string }[];
};

const QAS: QA[] = [
  {
    q: "What did we decide about the Lisbon offsite budget?",
    answer: [
      "You capped it at €18,400 for 14 people, after dropping the Palácio venue for being too far from the airport",
      { cite: 1 },
      ". Inês quoted €2,150 for three days of catering, which you marked “fine if lunch only”",
      { cite: 2 },
      ". One loose end: flights still weren’t booked as of 9 September",
      { cite: 3 },
      ".",
    ],
    sources: [
      { node: 0, date: "2 Sep 2026", excerpt: "Hard cap €18,400 / 14 people. Dropping Palácio — 50 min from the airport." },
      { node: 1, date: "4 Sep 2026", excerpt: "€2,150 for three days. Fine if lunch only; dinners we do in town." },
      { node: 2, date: "9 Sep 2026", excerpt: "Still haven’t booked flights. Before Thursday, before prices jump." },
    ],
  },
  {
    q: "When did my knee start hurting, and what helped?",
    answer: [
      "The first mention is 17 May, after a 21 km run: “left knee, outside, sharp on stairs”",
      { cite: 1 },
      ". Dr. Okafor pointed to the IT band and prescribed clamshells and side planks, three times a week",
      { cite: 2 },
      ". It settled once you capped long runs at 16 km. Your 18 km on 13 September was pain-free",
      { cite: 3 },
      ".",
    ],
    sources: [
      { node: 4, date: "17 May 2026", excerpt: "Left knee, outside, sharp on stairs. Third time this spring." },
      { node: 5, date: "24 May 2026", excerpt: "Likely IT band. Clamshells 3×15, side plank 3×30s. Cap long runs." },
      { node: 6, date: "13 Sep 2026", excerpt: "Knee quiet the whole way. Kept cadence up, walked the hill." },
    ],
  },
  {
    q: "What have I read that connects to the extended mind?",
    answer: [
      "Three threads. Annie Murphy Paul’s chapter on thinking with space and gesture",
      { cite: 1 },
      "; the 1945 memex passage from Vannevar Bush you saved in July",
      { cite: 2 },
      "; and a late voice memo where you called your own graph “a memex that files itself”",
      { cite: 3 },
      ".",
    ],
    sources: [
      { node: 7, date: "14 Jul 2026", excerpt: "We think better with our bodies and our rooms than inside our skulls." },
      { node: 8, date: "8 Jul 2026", excerpt: "“A device in which an individual stores all his books, records, and communications…”" },
      { node: 9, date: "20 Sep 2026", excerpt: "(transcribed) …it’s a memex, basically, but one that files itself." },
    ],
  },
];

export function AskDemo() {
  const [qi, setQi] = useState(0);
  const [hot, setHot] = useState<number | null>(null);
  const qa = QAS[qi];
  const cited = qa.sources.map((src) => src.node);
  const hotNode = hot === null ? null : qa.sources[hot - 1].node;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-0">
      <div className={`${s.glass} rounded-2xl lg:rounded-r-none`}>
        <div
          role="tablist"
          aria-label="Example questions"
          className={`flex gap-1 overflow-x-auto border-b px-3 pt-3 ${s.hairline}`}
        >
          {QAS.map((item, i) => (
            <button
              key={i}
              role="tab"
              id={`ask-tab-${i}`}
              aria-selected={qi === i}
              aria-controls="ask-panel"
              onClick={() => {
                setQi(i);
                setHot(null);
              }}
              className={`${s.mono} shrink-0 rounded-t-md border-b-2 px-3 py-2 text-[11px] tracking-wide transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#f2d9a0] ${
                qi === i
                  ? "border-[#f2d9a0] text-[#f2d9a0]"
                  : "border-transparent text-[#8f9ab4] hover:text-[#dfe4f0]"
              }`}
            >
              {["offsite", "knee", "reading"][i]}
            </button>
          ))}
        </div>

        <div id="ask-panel" role="tabpanel" aria-labelledby={`ask-tab-${qi}`} className="p-5 sm:p-7">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3.5">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#f2d9a0]">
              <path
                d="M10 1.5 11.6 8.4 18.5 10l-6.9 1.6L10 18.5 8.4 11.6 1.5 10l6.9-1.6Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-[15.5px] leading-snug text-white">
              {qa.q}
              <span aria-hidden="true" className={`${s.caret} ml-0.5 inline-block h-[1.05em] w-px translate-y-[3px] bg-[#f2d9a0]`} />
            </p>
          </div>

          <p key={qi} className={`${s.fadeIn} mt-6 text-[16px] leading-[1.7] text-[#d3d9e8]`}>
            {qa.answer.map((seg, i) =>
              typeof seg === "string" ? (
                <span key={i}>{seg}</span>
              ) : (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHot(seg.cite)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(seg.cite)}
                  onBlur={() => setHot(null)}
                  aria-label={`Source ${seg.cite}: ${NODES[qa.sources[seg.cite - 1].node].title}`}
                  className={`${s.mono} mx-0.5 inline-flex h-[18px] min-w-[18px] -translate-y-px items-center justify-center rounded-[5px] border px-1 align-middle text-[10.5px] transition-colors ${
                    hot === seg.cite
                      ? "border-[#f2d9a0] bg-[#f2d9a0] text-[#0a0f1f]"
                      : "border-[#f2d9a0]/40 text-[#f2d9a0] hover:border-[#f2d9a0]"
                  }`}
                >
                  {seg.cite}
                </button>
              ),
            )}
          </p>

          <ol className="mt-7 space-y-2">
            {qa.sources.map((src, i) => (
              <li
                key={`${qi}-${i}`}
                onMouseEnter={() => setHot(i + 1)}
                onMouseLeave={() => setHot(null)}
                className={`flex gap-3 rounded-lg border px-3.5 py-2.5 transition-colors ${
                  hot === i + 1 ? "border-[#f2d9a0]/40 bg-[#f2d9a0]/[0.06]" : "border-white/[0.07]"
                }`}
              >
                <span className={`${s.mono} pt-0.5 text-[10.5px] text-[#f2d9a0]`}>{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-white">
                    {NODES[src.node].title}
                    <span className={`${s.mono} ml-2 text-[10.5px] font-normal text-[#8f9ab4]`}>{src.date}</span>
                  </p>
                  <p className="mt-0.5 truncate text-[13px] text-[#9aa4bd]">{src.excerpt}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className={`${s.mono} mt-5 text-[10.5px] tracking-wide text-[#7d88a3]`}>
            Answered from 3 of 2,418 notes · every claim cited · nothing sent for training
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c19] lg:rounded-l-none lg:border-l-0">
        <p className={`${s.mono} absolute left-5 top-4 text-[10.5px] uppercase tracking-[0.16em] text-[#7d88a3]`}>
          Sources, in your sky
        </p>
        <svg
          viewBox="0 0 400 360"
          className="h-full min-h-[300px] w-full"
          role="img"
          aria-label={`Mini graph highlighting the cited notes: ${cited.map((n) => NODES[n].title).join(", ")}`}
        >
          <defs>
            <radialGradient id="ask-glow">
              <stop offset="0%" stopColor="#f6e2b3" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f2d9a0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform="translate(0 16)">
            {EDGES.map(([a, b]) => {
              const lit = cited.includes(a) && cited.includes(b);
              return (
                <line
                  key={`${a}-${b}-${qi}`}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  pathLength={1}
                  stroke={lit ? "#f2d9a0" : "#9fb2e0"}
                  strokeOpacity={lit ? 0.75 : 0.13}
                  strokeWidth={lit ? 1.3 : 1}
                  className={lit ? s.suggested : undefined}
                />
              );
            })}
            {NODES.map((n, i) => {
              const c = cited.indexOf(i);
              const isCited = c !== -1;
              const isHot = hotNode === i;
              return (
                <g key={`${i}-${qi}`} transform={`translate(${n.x} ${n.y})`}>
                  {isCited && (
                    <>
                      <circle r={isHot ? 30 : 20} fill="url(#ask-glow)" style={{ transition: "r .3s" }} />
                      <circle
                        r={8}
                        fill="none"
                        stroke="#f2d9a0"
                        strokeOpacity={0.6}
                        className={s.pulse}
                        style={{ animationDelay: `${c * 0.4}s` }}
                      />
                    </>
                  )}
                  <circle
                    r={isCited ? (isHot ? 5 : 3.8) : 2.4}
                    fill={isCited ? "#fbecc6" : "#c9d4f0"}
                    fillOpacity={isCited ? 1 : 0.45}
                  />
                  {isCited && (
                    <text
                      x={n.x > 250 ? -12 : 12}
                      y={4}
                      textAnchor={n.x > 250 ? "end" : "start"}
                      fontSize={10.5}
                      fill={isHot ? "#f2d9a0" : "#aab4cc"}
                      className={s.mono}
                    >
                      {c + 1}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        <p
          aria-live="polite"
          className={`${s.mono} absolute bottom-4 left-5 right-5 truncate text-[11px] text-[#f2d9a0]`}
        >
          {hotNode === null ? "Hover a citation to find it" : `→ ${NODES[hotNode].title}`}
        </p>
      </div>
    </div>
  );
}
