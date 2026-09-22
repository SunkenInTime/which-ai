type Ref = { page: number; href: string };
type Entry = {
  term: string;
  refs: Ref[];
  sub?: { term: string; refs: Ref[] }[];
  see?: string;
};

const P = {
  margins: { page: 4, href: "#how" },
  capture: { page: 11, href: "#capture" },
  recall: { page: 16, href: "#recall" },
  files: { page: 23, href: "#files" },
  pricing: { page: 29, href: "#pricing" },
} satisfies Record<string, Ref>;

const GROUPS: { letter: string; entries: Entry[] }[] = [
  {
    letter: "A",
    entries: [
      {
        term: "Ask your notes",
        refs: [P.recall],
        sub: [{ term: "answers cite your own notes", refs: [P.recall] }],
      },
    ],
  },
  {
    letter: "B",
    entries: [{ term: "Backlinks, written for you", refs: [P.margins] }],
  },
  {
    letter: "C",
    entries: [
      {
        term: "Capture",
        refs: [P.capture],
        sub: [
          { term: "quick-capture shortcut", refs: [P.capture] },
          { term: "voice memos, transcribed", refs: [P.capture] },
        ],
      },
    ],
  },
  {
    letter: "D",
    entries: [{ term: "Daily notes", refs: [P.capture] }],
  },
  {
    letter: "E",
    entries: [{ term: "Encryption, end to end", refs: [P.files, P.pricing] }],
  },
  {
    letter: "G",
    entries: [{ term: "Graph of your ideas", refs: [P.recall] }],
  },
  {
    letter: "H",
    entries: [{ term: "Highlights from books and articles", refs: [P.capture] }],
  },
  {
    letter: "L",
    entries: [{ term: "Links", refs: [P.margins], see: "Backlinks" }],
  },
  {
    letter: "M",
    entries: [{ term: "Markdown, plain files on disk", refs: [P.files] }],
  },
  {
    letter: "R",
    entries: [
      { term: "Related panel", refs: [P.recall] },
      { term: "Resurfacing", refs: [P.margins, P.recall] },
    ],
  },
];

function Refs({ refs }: { refs: Ref[] }) {
  return (
    <span className="font-ui lining text-[0.875rem] text-(--ink-soft)">
      {refs.map((r, i) => (
        <span key={r.href}>
          {i > 0 && ", "}
          <a href={r.href} className="ink-link hover:text-(--accent-text)">
            {r.page}
          </a>
        </span>
      ))}
    </span>
  );
}

export function IndexSection() {
  return (
    <section
      id="index"
      aria-labelledby="index-title"
      className="border-t border-(--rule)"
    >
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 lg:py-40">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <h2
            id="index-title"
            className="reveal font-serif-v2 pb-1 text-5xl leading-[1.1] italic md:text-6xl lg:col-span-3"
          >
            Index
          </h2>

          <div className="reveal font-serif-v2 columns-1 gap-x-12 sm:columns-2 lg:col-span-8 lg:col-start-5 lg:columns-3">
            {GROUPS.map((g) => (
              <div key={g.letter} className="mb-7 break-inside-avoid">
                <p
                  aria-hidden
                  className="mb-1 text-[1.375rem] leading-none text-(--accent-text)"
                >
                  {g.letter}
                </p>
                <ul className="space-y-1.5">
                  {g.entries.map((e) => (
                    <li key={e.term} className="text-[1.1875rem] leading-snug">
                      {e.term}, <Refs refs={e.refs} />
                      {e.see && (
                        <span className="text-(--ink-soft)">
                          ; <em>see also</em>{" "}
                          <a href="#how" className="ink-link">
                            {e.see}
                          </a>
                        </span>
                      )}
                      {e.sub && (
                        <ul className="mt-1 space-y-1 pl-5">
                          {e.sub.map((s) => (
                            <li
                              key={s.term}
                              className="text-[1.0625rem] text-(--ink-soft)"
                            >
                              {s.term}, <Refs refs={s.refs} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
