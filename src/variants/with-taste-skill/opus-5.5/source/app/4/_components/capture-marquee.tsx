import {
  BookOpenText,
  Browser,
  CalendarBlank,
  FilePdf,
  ImageSquare,
  Microphone,
  Newspaper,
  Quotes,
} from "@phosphor-icons/react/ssr";

const SOURCES = [
  { label: "Articles", icon: Newspaper },
  { label: "Voice memos", icon: Microphone },
  { label: "Screenshots", icon: ImageSquare },
  { label: "Book highlights", icon: BookOpenText },
  { label: "PDFs", icon: FilePdf },
  { label: "Web pages", icon: Browser },
  { label: "Quotes", icon: Quotes },
  { label: "Daily notes", icon: CalendarBlank },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {SOURCES.map(({ label, icon: Glyph }) => (
        <li
          key={label}
          className="v4-display flex items-center gap-4 px-6 text-4xl font-[650] tracking-[-0.03em] md:px-10 md:text-6xl"
        >
          <Glyph weight="bold" className="size-9 text-(--v4-accent-ink) md:size-12" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** The page's single marquee: everything Kept can take in. CSS-only, paused under reduced motion. */
export function CaptureMarquee() {
  return (
    <section aria-label="Things you can capture" className="v4-marquee overflow-hidden border-y border-(--v4-line) py-8 md:py-12">
      <div className="v4-marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
