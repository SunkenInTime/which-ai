const titles = [
  "Salt and the night train",
  "Dock master interview",
  "Line about attention",
  "Open question on memory",
  "Tuesday stand-up",
  "Recipe for the lede",
  "Map of chapter two",
  "What the editor cut",
];

export function NoteMarquee() {
  return (
    <section
      id="week"
      aria-labelledby="week-heading"
      className="overflow-hidden border-y border-[var(--line)] py-8"
    >
      <h2 id="week-heading" className="sr-only">
        A working week of notes
      </h2>
      <div className="marquee-track flex w-max items-center gap-12 px-4">
        {titles.map((title) => (
          <span key={title} className="text-2xl font-medium md:text-4xl">
            {title}
          </span>
        ))}
        {titles.map((title) => (
          <span
            key={`${title}-dup`}
            data-dup="true"
            className="text-2xl font-medium md:text-4xl"
            aria-hidden="true"
          >
            {title}
          </span>
        ))}
      </div>
    </section>
  );
}
