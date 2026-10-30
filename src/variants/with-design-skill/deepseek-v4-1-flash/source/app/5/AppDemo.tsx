"use client";

import { useMemo, useState } from "react";
import s from "./AppDemo.module.css";

type Note = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  keywords: string;
  body: string[];
  links: { title: string; why: string }[];
};

const NOTES: Note[] = [
  {
    id: "merge",
    title: "The merge bug was a policy bug",
    date: "14 March",
    tags: ["engineering", "postmortem"],
    keywords: "conflict crdt sync last write wins transport testing",
    body: [
      "Nine days went into the transport layer. The transport layer was fine.",
      "The conflict rule assumed last-write-wins on the whole document, so two people editing different paragraphs still produced a fight. The fix was four lines of policy and a test harness we should have written in week one.",
      "I keep coming back to this because it is the same mistake in a new costume: we debug the thing that is loud instead of the thing that is wrong.",
    ],
    links: [
      { title: "Auth rollback plan", why: "same week, same assumption" },
      { title: "Write the test that fails first", why: "quoted twice" },
      { title: "Marisol on design tokens", why: "“audit before you abstract”" },
    ],
  },
  {
    id: "commonplace",
    title: "On keeping a commonplace book",
    date: "2 April",
    tags: ["reading", "method"],
    keywords: "locke index reading notes commonplace book shelves",
    body: [
      "Locke's method is two columns: one for the head, one for the subject, and a page of pure index at the front. The index is the actual work.",
      "What makes it survive four centuries is that it does not ask you to be original. It asks you to notice where a sentence belongs, which is a much smaller job you can do on a bad day.",
      "Every good note app I have used is a worse version of this, plus sync.",
    ],
    links: [
      { title: "The merge bug was a policy bug", why: "same claim about indexes" },
      { title: "Why I stopped tagging by project", why: "follows from this" },
    ],
  },
  {
    id: "tokens",
    title: "Marisol on design tokens",
    date: "21 August",
    tags: ["interview", "design"],
    keywords: "design system tokens naming figma audit contract",
    body: [
      "“A token is a contract you sign with your future self. If you sign it before you have audited the inventory, you have frozen the wrong decisions in amber.”",
      "She audits before she abstracts, every time: dump every raw value in the product, group them by intent, and only then name anything. Naming is the last step, not the first.",
      "Her test for a good token name: a new hire should be able to pick the right one without opening Figma.",
    ],
    links: [
      { title: "The merge bug was a policy bug", why: "policy, not tooling" },
      { title: "On keeping a commonplace book", why: "naming as the real work" },
    ],
  },
  {
    id: "sourdough",
    title: "Hydration, 70 to 78 percent",
    date: "9 July",
    tags: ["kitchen", "tables"],
    keywords: "sourdough bread baking flour salt oven crumb",
    body: [
      "70% for sandwich loaves, 78% for the open crumb. Salt at two percent of flour weight.",
      "The open crumb turned out to be a temperature problem more than a water problem — the same dough at 24°C and 27°C is two different breads. Revisit in winter before changing anything else.",
    ],
    links: [
      { title: "Notes on changing one variable", why: "the method, applied" },
    ],
  },
  {
    id: "variables",
    title: "Notes on changing one variable",
    date: "12 September",
    tags: ["method"],
    keywords: "experiment expectation write it down learning",
    body: [
      "The rule I keep relearning: change one thing, write down what you expected, then change it. If you did not write the expectation down, you will invent one afterwards.",
      "This is the only difference I can find between people who get better at things and people who get busier at them.",
    ],
    links: [
      { title: "Hydration, 70 to 78 percent", why: "same rule, in a kitchen" },
      { title: "The merge bug was a policy bug", why: "the expectation was never written" },
    ],
  },
];

export function AppDemo() {
  const [activeId, setActiveId] = useState(NOTES[0].id);
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NOTES;
    return NOTES.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.keywords.includes(q) ||
        n.tags.some((t) => t.includes(q)) ||
        n.body.some((p) => p.toLowerCase().includes(q)),
    );
  }, [query]);

  const active =
    shown.find((n) => n.id === activeId) ??
    shown[0] ??
    NOTES.find((n) => n.id === activeId) ??
    NOTES[0];

  return (
    <div className={s.window}>
      <div className={s.topBar}>
        <span className={s.mark} aria-hidden="true" />
        <span className={s.workspace}>Ada&apos;s notes</span>
        <label className={s.searchWrap}>
          <span className={s.srOnly}>Search notes</span>
          <input
            className={s.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the way you remember it"
            type="search"
          />
        </label>
        <span className={s.sync}>synced 2s ago</span>
      </div>

      <div className={s.body}>
        <div className={s.sidebar}>
          <p className={s.sideLabel}>
            {query ? `${shown.length} matching` : "Recent"}
          </p>
          <ul className={s.noteList}>
            {shown.map((note) => (
              <li key={note.id}>
                <button
                  type="button"
                  className={s.noteButton}
                  data-active={note.id === active.id || undefined}
                  onClick={() => setActiveId(note.id)}
                >
                  <span className={s.noteTitle}>{note.title}</span>
                  <span className={s.noteMeta}>
                    {note.date} · {note.tags[0]}
                  </span>
                </button>
              </li>
            ))}
            {shown.length === 0 ? (
              <li className={s.empty}>
                Nothing matches “{query}”. Try a word you used in the note.
              </li>
            ) : null}
          </ul>
        </div>

        <article className={s.note} key={active.id}>
          <p className={s.noteDate}>{active.date}</p>
          <h3 className={s.noteHeading}>{active.title}</h3>
          <div className={s.noteTags}>
            {active.tags.map((t) => (
              <span key={t} className={s.tag}>
                {t}
              </span>
            ))}
          </div>
          {active.body.map((para, i) => (
            <p key={i} className={i === 0 ? s.noteLead : s.notePara}>
              {para}
            </p>
          ))}
        </article>

        <aside className={s.links}>
          <p className={s.sideLabel}>Cairn found {active.links.length}</p>
          <ul className={s.linkList}>
            {active.links.map((link) => (
              <li key={link.title} className={s.linkItem}>
                <span className={s.linkTitle}>{link.title}</span>
                <span className={s.linkWhy}>{link.why}</span>
              </li>
            ))}
          </ul>
          <p className={s.linksFoot}>
            You never made these links. Cairn read the notes and found them.
          </p>
        </aside>
      </div>
    </div>
  );
}
