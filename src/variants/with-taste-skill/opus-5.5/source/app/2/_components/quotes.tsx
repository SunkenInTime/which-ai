const QUOTES = [
  {
    text: "I used to lose the best lines in a drawer of notebooks. Now they find me while I’m drafting.",
    name: "Marguerite Aubry",
    role: "Novelist",
    place: "lg:col-span-9 lg:col-start-1",
    size: "text-[2rem] md:text-5xl",
  },
  {
    text: "Three years of fieldwork, and Kept still connects an interview from the first month to what I wrote this morning.",
    name: "Tomasz Wierzbicki",
    role: "PhD student in sociolinguistics",
    place: "lg:col-span-8 lg:col-start-5",
    size: "text-[1.75rem] md:text-[2.5rem]",
  },
  {
    text: "It answers my questions with my own notes and shows its sources. That is the only kind of answer I trust.",
    name: "Adaeze Nwosu",
    role: "Research scientist, soil ecology",
    place: "lg:col-span-8 lg:col-start-2",
    size: "text-[1.75rem] md:text-[2.5rem]",
  },
];

export function Quotes() {
  return (
    <section
      aria-labelledby="quotes-title"
      className="border-t border-(--rule)"
    >
      <h2 id="quotes-title" className="sr-only">
        What people who keep notes in Kept say
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-20 px-5 py-28 md:px-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-28 lg:py-40">
        {QUOTES.map((q) => (
          <figure key={q.name} className={`reveal ${q.place}`}>
            <blockquote
              className={`font-serif-v2 relative pb-1 leading-[1.18] tracking-[-0.005em] ${q.size}`}
            >
              <span
                aria-hidden
                className="absolute top-0 -left-[0.5em] hidden text-(--accent) md:inline"
              >
                &ldquo;
              </span>
              <span className="md:hidden">&ldquo;</span>
              {q.text}&rdquo;
            </blockquote>
            <figcaption className="font-ui mt-6 text-[0.9375rem]">
              <span className="font-medium">{q.name}</span>
              <span className="text-(--ink-soft)">, {q.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
