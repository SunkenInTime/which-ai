"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type AnnotationKey = "commonplace" | "marginalia" | "synthesis";

interface MarginNote {
  id: AnnotationKey;
  phrase: string;
  sourceBook: string;
  author: string;
  year: string;
  commentary: string;
  connectedNotes: string[];
}

const ANNOTATIONS: Record<AnnotationKey, MarginNote> = {
  commonplace: {
    id: "commonplace",
    phrase: "commonplace books",
    sourceBook: "Too Much to Know",
    author: "Ann Blair",
    year: "2010",
    commentary:
      "Renaissance scholars copied striking passages under thematic headings so an argument could be assembled years later without rereading an entire shelf.",
    connectedNotes: ["Zettelkasten Method", "Memory Palaces", "Reading Rituals"],
  },
  marginalia: {
    id: "marginalia",
    phrase: "margin dialogue",
    sourceBook: "Marginalia: Readers Writing in Books",
    author: "H. J. Jackson",
    year: "2001",
    commentary:
      "Writing a brief disagreement or cross-reference beside a paragraph triples recall compared to passive underlining alone.",
    connectedNotes: ["Active Reading Checklist", "Coleridge Notebooks"],
  },
  synthesis: {
    id: "synthesis",
    phrase: "patient synthesis",
    sourceBook: "How to Take Smart Notes",
    author: "Sönke Ahrens",
    year: "2017",
    commentary:
      "Drafting feels effortless when you begin from a cluster of already-linked permanent notes instead of staring at an empty page.",
    connectedNotes: ["Essay Outline Template", "Weekly Review Habit"],
  },
};

export default function IterationFourPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeAnnotation, setActiveAnnotation] =
    useState<AnnotationKey>("commonplace");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentMargin = ANNOTATIONS[activeAnnotation];

  return (
    <div className="min-h-screen bg-[#F2F6FB] text-[#0E1E36]">
      {/* Borderless top header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "bg-[#F2F6FB]/92 backdrop-blur-md border-b border-[#D6E1EF]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="text-[1.85rem] font-medium leading-none tracking-[-0.03em] text-[#0E1E36]"
            style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
          >
            Cairn
          </a>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-8 text-[length:var(--text-sm)] text-[#465A76]"
          >
            <a href="#margins" className="hover:text-[#0E1E36] transition-colors duration-150">
              Margin notes
            </a>
            <a href="#sanctuary" className="hover:text-[#0E1E36] transition-colors duration-150">
              Reading desk
            </a>
            <a href="#practice" className="hover:text-[#0E1E36] transition-colors duration-150">
              Daily rhythm
            </a>
            <a href="#membership" className="hover:text-[#0E1E36] transition-colors duration-150">
              Membership
            </a>
          </nav>

          <a
            href="#membership"
            className="rounded-full bg-[#0E1E36] px-5 py-2.5 text-[length:var(--text-sm)] font-medium text-white hover:bg-[#1B3358] transition-colors duration-150"
          >
            Begin your library
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero: Layered depth & foreground occlusion */}
        <section className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-24 pb-24 sm:pb-16 px-6 overflow-hidden">
          {/* Centerpiece layered stage: ultra-wide background display type behind sculptural studio object */}
          <div className="relative mx-auto w-full max-w-6xl flex-1 flex items-center justify-center my-6">
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-light tracking-[-0.04em] text-[#D4E1F2] leading-none whitespace-nowrap overflow-hidden"
              style={{
                fontFamily: "var(--font-iter4-display), Georgia, serif",
                fontSize: "clamp(7rem, 26vw, 24rem)",
              }}
            >
              Cairn
            </div>

            <div className="relative z-10 w-[260px] sm:w-[320px] md:w-[360px] animate-reveal">
              <Image
                src="/variants/with-gemini-design-skill/gemini-4-neon/images/iter4-sculpture.jpg"
                alt="Stacked translucent marine-cobalt glass plates and fine cotton folios bound with a brushed brass clip"
                width={900}
                height={1200}
                priority
                className="w-full h-auto rounded-2xl shadow-[0_32px_70px_-28px_rgba(14,30,54,0.28)]"
              />
            </div>
          </div>

          {/* Lower horizon typography and single marigold primary action */}
          <div className="relative z-20 mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-[#D2DFEE] animate-reveal-delay-1">
            <div className="lg:col-span-7">
              <h1
                className="text-[clamp(2.8rem,6.2vw,5.2rem)] font-normal leading-[0.96] tracking-[-0.03em] text-[#0E1E36]"
                style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
              >
                A quiet home for deep memory
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end lg:text-right gap-6">
              <p className="text-[length:var(--text-body)] leading-relaxed text-[#465A76] max-w-[38ch]">
                Gather book passages, margin thoughts, and research notes in a serene desktop library built to last decades.
              </p>
              <a
                href="#margins"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#F4B41A] px-7 py-3.5 text-[length:var(--text-body)] font-semibold text-[#0E1E36] hover:bg-[#E5A50F] transition-colors duration-150"
              >
                <span>Try margin linking</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Margin Annotation Reader */}
        <section id="margins" className="py-24 md:py-32 px-6 bg-white border-t border-[#DAE4F0]">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2
                className="text-[length:var(--text-heading)] font-normal leading-[1.08] tracking-[-0.025em] text-[#0E1E36]"
                style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
              >
                Read in conversation with everything you have saved
              </h2>
              <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[#465A76]">
                Click any highlighted phrase inside the passage below to open its linked source and margin note.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Interactive essay surface */}
              <div className="lg:col-span-7 border-t border-[#D2DFEE] pt-8 space-y-6 max-w-[60ch]">
                <p className="text-[length:var(--text-body)] leading-[1.85] text-[#0E1E36]">
                  Long before digital folders existed, writers kept{" "}
                  <button
                    type="button"
                    onClick={() => setActiveAnnotation("commonplace")}
                    className={`inline font-medium px-1.5 py-0.5 rounded cursor-pointer transition-colors duration-150 ${
                      activeAnnotation === "commonplace"
                        ? "bg-[#F4B41A] text-[#0E1E36]"
                        : "bg-[#E6EEF9] text-[#1E40AF] hover:bg-[#D5E4F7]"
                    }`}
                  >
                    commonplace books
                  </button>{" "}
                  to hold excerpts worth returning to. The secret was never collecting more pages, but keeping every passage easy to cross-reference when a new question appeared.
                </p>

                <p className="text-[length:var(--text-body)] leading-[1.85] text-[#0E1E36]">
                  When reading turns into{" "}
                  <button
                    type="button"
                    onClick={() => setActiveAnnotation("marginalia")}
                    className={`inline font-medium px-1.5 py-0.5 rounded cursor-pointer transition-colors duration-150 ${
                      activeAnnotation === "marginalia"
                        ? "bg-[#F4B41A] text-[#0E1E36]"
                        : "bg-[#E6EEF9] text-[#1E40AF] hover:bg-[#D5E4F7]"
                    }`}
                  >
                    margin dialogue
                  </button>
                  , your library stops feeling like cold storage. Cairn attaches your reflections directly to their source citation and displays related notes quietly beside the draft.
                </p>

                <p className="text-[length:var(--text-body)] leading-[1.85] text-[#0E1E36]">
                  Over months, scattered highlights settle into{" "}
                  <button
                    type="button"
                    onClick={() => setActiveAnnotation("synthesis")}
                    className={`inline font-medium px-1.5 py-0.5 rounded cursor-pointer transition-colors duration-150 ${
                      activeAnnotation === "synthesis"
                        ? "bg-[#F4B41A] text-[#0E1E36]"
                        : "bg-[#E6EEF9] text-[#1E40AF] hover:bg-[#D5E4F7]"
                    }`}
                  >
                    patient synthesis
                  </button>
                  , giving every new chapter or memo a foundation already written in your own voice.
                </p>
              </div>

              {/* Margin note inspector */}
              <div className="lg:col-span-5 bg-[#F2F6FB] rounded-2xl p-7 md:p-8 border border-[#D8E3F0]">
                <div className="pb-5 border-b border-[#D2DFEE]">
                  <div className="text-[length:var(--text-sm)] font-semibold text-[#1E40AF]">
                    {currentMargin.sourceBook}
                  </div>
                  <div className="mt-1 text-[length:var(--text-sm)] text-[#465A76] tabular-nums">
                    {currentMargin.author}, {currentMargin.year}
                  </div>
                </div>

                <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-[#0E1E36]">
                  {currentMargin.commentary}
                </p>

                <div className="mt-7 pt-5 border-t border-[#D2DFEE]">
                  <div className="text-[length:var(--text-sm)] font-semibold text-[#465A76] mb-3">
                    Linked in your library
                  </div>
                  <ul className="space-y-2 text-[length:var(--text-body)] text-[#0E1E36]">
                    {currentMargin.connectedNotes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-[#1E40AF]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Full-bleed Sunlit Reading Sanctuary */}
        <section id="sanctuary" className="py-24 md:py-32 px-6 bg-[#F2F6FB]">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/variants/with-gemini-design-skill/gemini-4-neon/images/iter4-desk.jpg"
                alt="Sunlit reading table in cool morning daylight with open marine navy hardcover books and fine stationery"
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>

            <div
              id="practice"
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pt-10 border-t border-[#CFDCEE]"
            >
              <div>
                <h3
                  className="text-[length:var(--text-body)] font-semibold text-[#0E1E36]"
                  style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
                >
                  Import from books and articles
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-[#465A76]">
                  Bring in e-reader highlights, PDF annotations, and clipped essays with complete citations preserved automatically.
                </p>
              </div>

              <div>
                <h3
                  className="text-[length:var(--text-body)] font-semibold text-[#0E1E36]"
                  style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
                >
                  Write without interface noise
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-[#465A76]">
                  Toolbars stay out of sight while you draft. Press one shortcut to pull a reference note alongside your paragraph.
                </p>
              </div>

              <div>
                <h3
                  className="text-[length:var(--text-body)] font-semibold text-[#0E1E36]"
                  style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
                >
                  Publish clean documents
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-[#465A76]">
                  Export finished essays to print-ready PDF, clean HTML, or plain Markdown with formatted footnotes included.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Deep Marine Navy Closing Membership */}
        <section id="membership" className="py-24 md:py-32 px-6 bg-[#0E1E36] text-white">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h2
                className="text-[length:var(--text-heading)] font-normal leading-[1.08] tracking-[-0.025em] text-white"
                style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
              >
                Own your library from day one
              </h2>
              <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[#B6C7DE] max-w-[48ch]">
                Use Cairn free on your laptop forever, or subscribe for $8 per month for encrypted mobile sync, book highlight imports, and automatic backups.
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <a
                href="#top"
                className="inline-flex items-center justify-center rounded-full bg-[#F4B41A] px-8 py-4 text-[length:var(--text-body)] font-semibold text-[#0E1E36] hover:bg-[#E5A50F] transition-colors duration-150"
              >
                Download Cairn free
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0E1E36] text-[#B6C7DE] border-t border-[#1E3557] py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div
            className="text-[1.75rem] font-medium text-white tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-iter4-display), Georgia, serif" }}
          >
            Cairn
          </div>
          <div className="flex flex-wrap gap-7 text-[length:var(--text-sm)]">
            <a href="#margins" className="hover:text-white transition-colors duration-150">
              Margin notes
            </a>
            <a href="#sanctuary" className="hover:text-white transition-colors duration-150">
              Reading desk
            </a>
            <a href="#practice" className="hover:text-white transition-colors duration-150">
              Daily rhythm
            </a>
            <a href="#membership" className="hover:text-white transition-colors duration-150">
              Membership
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
