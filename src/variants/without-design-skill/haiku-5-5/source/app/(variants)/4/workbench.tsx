"use client";

import { Fragment, useState } from "react";

type Note = { title: string; tags: string[]; body: string };

const NOTES: Note[] = [
  {
    title: "Thinking, Fast and Slow",
    tags: ["reading", "psychology"],
    body: "System 1 answers before anyone has asked the question. It's the reason [[Anchoring in pricing]] works, and the first thing I re-read before a big call in the [[Decision journal]].",
  },
  {
    title: "Anchoring in pricing",
    tags: ["psychology", "pricing"],
    body: "The first number on a page sets the frame. Our Q1 tests confirmed it: [[Pricing experiments]] moved conversion more with the anchor than with the discount.",
  },
  {
    title: "Decision journal",
    tags: ["work", "decisions"],
    body: "12 March: chose usage-based pricing over seats. The reasoning draws on [[Pricing experiments]] and a reminder from [[Thinking, Fast and Slow]] to write the reason down before the outcome is known.",
  },
  {
    title: "Pricing experiments",
    tags: ["work", "pricing"],
    body: "Three tests in Q1. Seat-based plans churned twice as fast after month two. Summary lives in the [[Decision journal]]; the anchor results are in [[Anchoring in pricing]].",
  },
  {
    title: "Hiring rubric",
    tags: ["work", "hiring"],
    body: "Four signals per candidate: scope, craft, judgement, and how they handle a bad week. Still open: the calibration for the staff role.",
  },
  {
    title: "Morning pages",
    tags: ["personal"],
    body: "Woke at six and wanted to rewrite onboarding. Maybe connect this to [[Pricing experiments]]; the trial-length question is still open.",
  },
];

const LINK_PATTERN = /\[\[(.+?)\]\]/;

export function Workbench() {
  const [selectedTitle, setSelectedTitle] = useState("Decision journal");
  const selected = NOTES.find((n) => n.title === selectedTitle) ?? NOTES[0];

  const linkedFrom = NOTES.filter(
    (n) => n.title !== selected.title && n.body.includes(`[[${selected.title}]]`),
  );
  const outgoing = Array.from(selected.body.matchAll(/\[\[(.+?)\]\]/g), (m) => m[1]);
  const suggested = NOTES.filter(
    (n) =>
      n.title !== selected.title &&
      !linkedFrom.includes(n) &&
      !outgoing.includes(n.title) &&
      n.tags.some((t) => selected.tags.includes(t)),
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-[0_40px_80px_-40px_rgba(68,40,10,0.35)]">
      <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-stone-300" />
        <span className="h-3 w-3 rounded-full bg-stone-300" />
        <span className="h-3 w-3 rounded-full bg-stone-300" />
        <span className="ml-4 text-xs text-stone-500">Synapse · Workbench</span>
      </div>

      <div className="grid md:grid-cols-[210px_1fr_240px]">
        <aside className="border-b border-stone-200 bg-stone-50/60 p-3 md:border-b-0 md:border-r">
          <p className="px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-stone-400">All notes</p>
          <ul className="space-y-0.5">
            {NOTES.map((n) => {
              const active = n.title === selected.title;
              return (
                <li key={n.title}>
                  <button
                    onClick={() => setSelectedTitle(n.title)}
                    aria-current={active ? "true" : undefined}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      active ? "bg-white font-medium text-stone-900 shadow-sm ring-1 ring-stone-200" : "text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {n.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <article className="min-h-[320px] p-6 md:p-8">
          <div className="flex flex-wrap gap-1.5">
            {selected.tags.map((t) => (
              <span key={t} className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs text-orange-700">
                #{t}
              </span>
            ))}
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">{selected.title}</h3>
          <p className="mt-5 text-[15px] leading-8 text-stone-700">
            {selected.body.split(LINK_PATTERN).map((part, i) =>
              i % 2 === 1 ? (
                <button
                  key={i}
                  onClick={() => setSelectedTitle(part)}
                  className="rounded bg-orange-100/70 px-1 font-medium text-orange-800 underline decoration-orange-400 decoration-2 underline-offset-4 transition-colors hover:bg-orange-200"
                >
                  {part}
                </button>
              ) : (
                <Fragment key={i}>{part}</Fragment>
              ),
            )}
          </p>
          <p className="mt-8 text-xs text-stone-400">
            Click any <span className="text-orange-700">linked</span> title to follow the thread.
          </p>
        </article>

        <aside className="space-y-6 border-t border-stone-200 bg-stone-50/60 p-5 md:border-l md:border-t-0">
          <section>
            <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">Linked from · {linkedFrom.length}</p>
            <ul className="mt-2 space-y-1.5">
              {linkedFrom.length === 0 && <li className="text-sm text-stone-400">Nothing points here yet.</li>}
              {linkedFrom.map((n) => (
                <li key={n.title}>
                  <button onClick={() => setSelectedTitle(n.title)} className="text-left text-sm text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-orange-700">
                    {n.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">Suggested</p>
            <ul className="mt-2 space-y-2">
              {suggested.length === 0 && <li className="text-sm text-stone-400">No suggestions right now.</li>}
              {suggested.map((n) => (
                <li key={n.title}>
                  <button onClick={() => setSelectedTitle(n.title)} className="w-full rounded-lg border border-dashed border-orange-300 bg-white px-3 py-2 text-left text-sm text-stone-700 transition-colors hover:border-orange-500">
                    <span className="block font-medium text-stone-900">{n.title}</span>
                    <span className="text-xs text-stone-500">Shares {n.tags.filter((t) => selected.tags.includes(t)).join(", ")}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
