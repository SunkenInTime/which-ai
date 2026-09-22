function Wikilink({ children, to }: { children: string; to: string }) {
  return (
    <a href={to} className="wikilink">
      <span aria-hidden className="md-mark">
        [[
      </span>
      {children}
      <span aria-hidden className="md-mark">
        ]]
      </span>
    </a>
  );
}

function Ref({ n }: { n: number }) {
  return (
    <sup>
      <a
        id={`ref-${n}`}
        href={`#margin-${n}`}
        className="note-ref lining"
        aria-label={`Margin note ${n}`}
      >
        {n}
      </a>
    </sup>
  );
}

const MARGIN = [
  {
    kind: "Linked note",
    title: "Locke on indexing",
    body: "Three other notes link here too.",
  },
  {
    kind: "Backlink",
    title: "Reading log, March",
    body: "Quotes the same letter from Seneca, and now points back to this page.",
  },
  {
    kind: "Related, from 2023",
    title: "Why I stopped using folders",
    body: "Resurfaced while you were writing, because both notes are about finding things again.",
  },
];

export function Marginalia() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="mx-auto max-w-7xl scroll-mt-8 px-5 pt-28 pb-28 md:px-8 lg:pt-44 lg:pb-40"
    >
      <div className="reveal max-w-[40rem]">
        <h2
          id="how-title"
          className="font-serif-v2 text-4xl leading-[1.1] text-balance md:text-5xl"
        >
          Every note keeps the company of others.
        </h2>
        <p className="font-serif-v2 mt-5 text-xl leading-[1.55] text-(--ink-soft)">
          Type <span className="lining font-mono text-[0.85em]">[[</span> to
          link one note to another. Kept writes the backlinks in the margin for
          you, so nothing you save stands alone.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-y-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
        <article
          aria-label="Example note"
          className="reveal font-serif-v2 lg:col-span-7 lg:col-start-2"
        >
          <p className="font-ui text-sm text-(--ink-soft)">Tuesday, 14 May</p>
          <h3 className="mt-3 pb-1 text-[2rem] leading-[1.15] italic">
            On keeping a commonplace book
          </h3>
          <div className="mt-6 space-y-5 text-[1.3125rem] leading-[1.65]">
            <p>
              Locke kept his notebook by subject, with an index at the back so
              any entry could be found again in a minute (see{" "}
              <Wikilink to="#margin-1">Locke on indexing</Wikilink>).
              <Ref n={1} /> The point was never the copying. It was the finding.
            </p>
            <p>
              Seneca gives the same advice about reading: gather from many
              books, then blend what you gathered into one taste of your own.
              <Ref n={2} /> That is the part folders never did for me.
              <Ref n={3} />
            </p>
            <p>So, fewer categories and more links. Let the index do the work.</p>
          </div>
        </article>

        <aside
          aria-label="Margin notes"
          className="reveal lg:col-span-3 lg:col-start-10 lg:border-l lg:border-(--rule) lg:pl-8"
        >
          <ol className="space-y-8 border-t border-(--rule) pt-8 lg:border-t-0 lg:pt-14">
            {MARGIN.map((m, i) => (
              <li
                key={m.title}
                id={`margin-${i + 1}`}
                className="margin-note -mx-3 scroll-mt-24 px-3 py-2"
              >
                <p className="flex items-baseline gap-2 text-[0.8125rem] text-(--ink-soft)">
                  <span className="lining font-semibold text-(--accent-text)">
                    {i + 1}
                  </span>
                  {m.kind}
                </p>
                <a
                  href={`#ref-${i + 1}`}
                  className="ink-link font-serif-v2 mt-1 inline-block pb-0.5 text-[1.1875rem] leading-snug italic"
                >
                  {m.title}
                </a>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-(--ink-soft)">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
