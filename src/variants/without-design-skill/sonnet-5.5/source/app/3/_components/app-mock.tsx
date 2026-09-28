"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/variants/without-design-skill/sonnet-5.5/source/app/_components/icons";

type Block =
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "todo"; items: [boolean, string][] };

type Note = {
  id: string;
  title: string;
  emoji: string;
  edited: string;
  tags: string[];
  blocks: Block[];
  backlinks: { from: string; snippet: string }[];
  related: [string, number][];
  outline: string[];
};

const notes: Note[] = [
  {
    id: "pricing",
    title: "Pricing v2",
    emoji: "💸",
    edited: "2 min ago",
    tags: ["strategy", "q4"],
    blocks: [
      { type: "p", text: "After the March call with [[Call with Jo]] we settled the shape of the plans: a generous free tier and one paid plan at $8/month." },
      { type: "quote", text: "Charge for the things that cost us money: sync, storage, and Ask." },
      { type: "p", text: "Open question: does defaulting to annual billing reduce support load? See [[Compounding ideas]] for the reasoning on retention." },
      { type: "todo", items: [[true, "Draft plan comparison table"], [true, "Confirm refund window (30 days)"], [false, "Update pricing page copy"]] },
    ],
    backlinks: [
      { from: "Call with Jo", snippet: "…agreed on [[Pricing v2]] as the starting point for the plans…" },
      { from: "Reading list", snippet: "…monetizing without lock-in informs [[Pricing v2]]…" },
      { from: "Weekly review · Mar 22", snippet: "…finalize [[Pricing v2]] before the launch plan…" },
    ],
    related: [["Support load model", 92], ["Launch plan", 87], ["Retention notes", 81]],
    outline: ["Plans", "Open questions", "Next steps"],
  },
  {
    id: "jo",
    title: "Call with Jo",
    emoji: "📞",
    edited: "Yesterday",
    tags: ["meeting"],
    blocks: [
      { type: "p", text: "Jo pushed hard on keeping the free tier useful. We agreed one vault with unlimited notes is the right line. Details live in [[Pricing v2]]." },
      { type: "p", text: "Suggestion: resurface old notes in a weekly digest rather than daily. It might feel less naggy. Related thinking in [[Compounding ideas]]." },
      { type: "todo", items: [[true, "Send recap to the team"], [false, "Prototype weekly digest"]] },
    ],
    backlinks: [
      { from: "Pricing v2", snippet: "…after the March call with [[Call with Jo]] we settled…" },
      { from: "Weekly review · Mar 15", snippet: "…follow up with [[Call with Jo]] on digest cadence…" },
    ],
    related: [["Onboarding feedback", 88], ["Digest experiment", 84]],
    outline: ["Takeaways", "Follow-ups"],
  },
  {
    id: "compounding",
    title: "Compounding ideas",
    emoji: "🌱",
    edited: "3 days ago",
    tags: ["essay", "thinking"],
    blocks: [
      { type: "p", text: "Notes compound the way interest does: every link you add makes future notes a little easier to find. The value isn't in any one note, it's in the [[Reading list]] you can connect it to." },
      { type: "quote", text: "You do not rise to the level of your goals. You fall to the level of your systems." },
      { type: "p", text: "Try this: revisit one old note a day and add a single link. It ties into the digest idea from [[Call with Jo]]." },
    ],
    backlinks: [
      { from: "Pricing v2", snippet: "…see [[Compounding ideas]] for the reasoning on retention…" },
      { from: "Call with Jo", snippet: "…related thinking in [[Compounding ideas]]…" },
      { from: "Essay draft", snippet: "…the core metaphor is [[Compounding ideas]]…" },
    ],
    related: [["Habit loops", 94], ["Systems thinking", 89], ["Zettelkasten", 86]],
    outline: ["Core idea", "Practice"],
  },
  {
    id: "reading",
    title: "Reading list",
    emoji: "📚",
    edited: "Last week",
    tags: ["books"],
    blocks: [
      { type: "p", text: "Books that keep coming up in my notes, sorted by how often I link to them rather than when I read them." },
      { type: "todo", items: [[true, "Building a Second Brain"], [true, "How to Take Smart Notes"], [false, "The Extended Mind"], [false, "Range"]] },
      { type: "p", text: "Highlights flow into [[Compounding ideas]] and feed the pricing thinking in [[Pricing v2]]." },
    ],
    backlinks: [
      { from: "Compounding ideas", snippet: "…in the [[Reading list]] you can connect it to…" },
      { from: "Weekly review · Mar 22", snippet: "…finish two from the [[Reading list]] this month…" },
    ],
    related: [["Highlights inbox", 90], ["Commonplace book", 85]],
    outline: ["Reading now", "Up next"],
  },
];

const tabs = ["Backlinks", "Related", "Outline"] as const;
type Tab = (typeof tabs)[number];

export function AppMock() {
  const [activeId, setActiveId] = useState("pricing");
  const [tab, setTab] = useState<Tab>("Backlinks");
  const note = notes.find((n) => n.id === activeId) ?? notes[0];

  function jump(title: string) {
    const target = notes.find((n) => n.title === title);
    if (target) setActiveId(target.id);
  }

  function rich(text: string): ReactNode[] {
    return text.split(/(\[\[[^\]]+\]\])/g).map((part, i) => {
      if (!part.startsWith("[[")) return part;
      const title = part.slice(2, -2);
      const linkable = notes.some((n) => n.title === title);
      const cls = "rounded-md bg-indigo-50 px-1.5 py-0.5 text-indigo-700";
      return linkable ? (
        <button key={i} type="button" onClick={() => jump(title)} className={`${cls} cursor-pointer font-medium transition hover:bg-indigo-100`}>
          {title}
        </button>
      ) : (
        <span key={i} className={cls}>{title}</span>
      );
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-[0_40px_100px_-30px_rgba(79,70,229,0.35),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <p className="mx-auto text-xs font-medium text-zinc-500">Personal vault</p>
        <span className="hidden items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] text-zinc-500 sm:flex">
          <Icon name="search" className="size-3" /> Search <kbd className="font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-zinc-400">⌘K</kbd>
        </span>
      </div>

      <div className="grid h-[500px] md:grid-cols-[200px_1fr] lg:grid-cols-[210px_1fr_270px]">
        {/* Sidebar */}
        <aside className="hidden flex-col border-r border-zinc-100 bg-zinc-50/60 p-3 md:flex">
          <p className="px-2 pt-1 pb-2 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">Notes</p>
          <ul className="space-y-0.5">
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(n.id)}
                  aria-current={n.id === activeId ? "true" : undefined}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                    n.id === activeId ? "bg-white font-medium text-zinc-950 shadow-sm ring-1 ring-zinc-200" : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  <span aria-hidden>{n.emoji}</span>
                  <span className="truncate">{n.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 px-2 pb-2 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">Tags</p>
          <ul className="flex flex-wrap gap-1.5 px-1 text-xs text-zinc-500">
            {["strategy", "meeting", "essay", "books"].map((t) => (
              <li key={t} className="rounded-md bg-zinc-100 px-2 py-0.5">#{t}</li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-2 rounded-lg border border-dashed border-zinc-300 px-2.5 py-2 text-xs text-zinc-500">
            <Icon name="inbox" className="size-4" /> Inbox
            <span className="ml-auto rounded-full bg-indigo-600 px-1.5 text-[10px] font-medium text-white">3</span>
          </div>
        </aside>

        {/* Editor */}
        <section className="flex min-h-0 flex-col">
          <div className="flex gap-2 overflow-x-auto border-b border-zinc-100 p-2 md:hidden">
            {notes.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setActiveId(n.id)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs ${n.id === activeId ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-600"}`}
              >
                {n.emoji} {n.title}
              </button>
            ))}
          </div>
          <article key={note.id} className="animate-rise min-h-0 flex-1 overflow-y-auto px-7 py-7 [animation-duration:0.35s] sm:px-10">
            <p className="text-3xl" aria-hidden>{note.emoji}</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">{note.title}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              Edited {note.edited}
              {note.tags.map((t) => (
                <span key={t} className="rounded-md bg-zinc-100 px-2 py-0.5">#{t}</span>
              ))}
            </p>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-zinc-700">
              {note.blocks.map((b, i) => {
                if (b.type === "p") return <p key={i}>{rich(b.text)}</p>;
                if (b.type === "quote")
                  return (
                    <blockquote key={i} className="border-l-2 border-indigo-300 pl-4 text-zinc-500 italic">
                      {b.text}
                    </blockquote>
                  );
                return (
                  <ul key={i} className="space-y-1.5">
                    {b.items.map(([done, label]) => (
                      <li key={label} className="flex items-center gap-2.5">
                        <span className={`grid size-4 place-items-center rounded border ${done ? "border-indigo-600 bg-indigo-600 text-white" : "border-zinc-300"}`}>
                          {done && <Icon name="check" className="size-3" strokeWidth={3} />}
                        </span>
                        <span className={done ? "text-zinc-400 line-through" : ""}>{label}</span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </article>
        </section>

        {/* Right panel */}
        <aside className="hidden min-h-0 flex-col border-l border-zinc-100 bg-zinc-50/60 lg:flex">
          <div role="tablist" aria-label="Note context" className="flex gap-1 border-b border-zinc-100 p-2">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${tab === t ? "bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-200" : "text-zinc-500 hover:text-zinc-800"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
            {tab === "Backlinks" && (
              <>
                <p className="px-1 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">{note.backlinks.length} linked mentions</p>
                {note.backlinks.map((b) => (
                  <div key={b.from} className="rounded-xl border border-zinc-200 bg-white p-3 text-xs leading-5 text-zinc-600">
                    <button type="button" onClick={() => jump(b.from)} className="font-medium text-zinc-900 hover:text-indigo-600">
                      {b.from}
                    </button>
                    <p className="mt-1">{rich(b.snippet)}</p>
                  </div>
                ))}
              </>
            )}
            {tab === "Related" && (
              <>
                <p className="px-1 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">Suggested by meaning</p>
                {note.related.map(([title, score]) => (
                  <div key={title} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-xs">
                    <span className="font-medium text-zinc-800">{title}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">{score}%</span>
                  </div>
                ))}
              </>
            )}
            {tab === "Outline" && (
              <>
                <p className="px-1 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">On this note</p>
                <ol className="space-y-1 text-xs">
                  {note.outline.map((h, i) => (
                    <li key={h} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-zinc-600">
                      <span className="grid size-5 place-items-center rounded-md bg-zinc-100 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[10px] text-zinc-500">{i + 1}</span>
                      {h}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
