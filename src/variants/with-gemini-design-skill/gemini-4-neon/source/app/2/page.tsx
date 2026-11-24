"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TopicKey = "systems" | "climate" | "reading";

interface SynthesisTopic {
  id: TopicKey;
  label: string;
  centralNote: string;
  summary: string;
  fragments: { title: string; date: string; snippet: string; x: number; y: number }[];
  outline: string[];
}

const TOPICS: Record<TopicKey, SynthesisTopic> = {
  systems: {
    id: "systems",
    label: "Design systems",
    centralNote: "Spatial rhythm in quiet tools",
    summary:
      "Four scattered clippings from product teardowns and architectural books gathered automatically into one working outline.",
    fragments: [
      {
        title: "Dieter Rams interview notes",
        date: "Oct 12",
        snippet: "Clarity comes from removing competing chrome, not hiding capability.",
        x: 18,
        y: 26,
      },
      {
        title: "Grid proportions study",
        date: "Nov 03",
        snippet: "Consistent type scale lets readers scan dense tables without fatigue.",
        x: 78,
        y: 22,
      },
      {
        title: "Voice memo after critique",
        date: "Nov 14",
        snippet: "Keep interactive controls quiet until hover or focus.",
        x: 24,
        y: 74,
      },
      {
        title: "Motion timing benchmark",
        date: "Nov 19",
        snippet: "Transitions between 150ms and 220ms feel crisp without sluggishness.",
        x: 76,
        y: 78,
      },
    ],
    outline: [
      "Open with visual calm so content leads before controls.",
      "Limit typographic scale to three structural roles across body sections.",
      "Use swift ease-out transitions that follow direct manipulation.",
    ],
  },
  climate: {
    id: "climate",
    label: "Grid storage",
    centralNote: "Long-duration thermal storage",
    summary:
      "Field papers, podcast excerpts, and lab transcripts linked into a single comparative brief.",
    fragments: [
      {
        title: "Thermal brick efficiency",
        date: "Sep 28",
        snippet: "Industrial heat accounts for a quarter of global emissions.",
        x: 20,
        y: 24,
      },
      {
        title: "Nordic district heating",
        date: "Oct 18",
        snippet: "Sand batteries store excess wind power for winter weeks.",
        x: 80,
        y: 30,
      },
      {
        title: "Grid curtailment report",
        date: "Nov 02",
        snippet: "Midday solar prices dip negative across sunny corridors.",
        x: 22,
        y: 76,
      },
      {
        title: "Founder call with Henrik",
        date: "Nov 21",
        snippet: "Retrofitting existing steam boilers cuts installation time in half.",
        x: 74,
        y: 74,
      },
    ],
    outline: [
      "Pair surplus midday renewables with high-temperature refractory storage.",
      "Target industrial steam customers with direct boiler retrofits.",
      "Track regional curtailment curves to identify highest-margin sites.",
    ],
  },
  reading: {
    id: "reading",
    label: "Book highlights",
    centralNote: "Why small teams outlast large labs",
    summary:
      "Passages underlined across six biographies resurfaced automatically when drafting an essay.",
    fragments: [
      {
        title: "The Making of Prince of Persia",
        date: "Aug 14",
        snippet: "Daily notebooks preserve technical breakthroughs that memory smooths away.",
        x: 19,
        y: 28,
      },
      {
        title: "Bell Labs oral history",
        date: "Sep 09",
        snippet: "Long hallways force unplanned conversations across disciplines.",
        x: 79,
        y: 24,
      },
      {
        title: "Craft and attention essay",
        date: "Oct 30",
        snippet: "Tight feedback loops matter more than headcount.",
        x: 24,
        y: 72,
      },
      {
        title: "Marginalia on Deep Work",
        date: "Nov 11",
        snippet: "Protect four uninterrupted morning hours for hard synthesis.",
        x: 76,
        y: 76,
      },
    ],
    outline: [
      "Keep a dated log of unresolved questions rather than polished summaries.",
      "Design daily habits that bring different disciplines into contact.",
      "Protect quiet synthesis hours where scattered clips become arguments.",
    ],
  },
};

export default function IterationTwoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTopic, setActiveTopic] = useState<TopicKey>("systems");
  const [selectedFragmentIdx, setSelectedFragmentIdx] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topic = TOPICS[activeTopic];
  const selectedFragment = topic.fragments[selectedFragmentIdx] ?? topic.fragments[0];

  return (
    <div className="min-h-screen bg-[#0B1A16] text-[#EEF3F0]">
      {/* Borderless transparent header at y=0, frosted spruce surface on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "bg-[#0B1A16]/90 backdrop-blur-md border-b border-[#1D3B32]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="text-[1.75rem] font-bold leading-none tracking-[-0.03em] text-[#EEF3F0]"
            style={{ fontFamily: "var(--font-iter2-display), sans-serif" }}
          >
            Cairn
          </a>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-8 text-[length:var(--text-sm)] text-[#9BB0A7]"
          >
            <a href="#synthesis" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Synthesis
            </a>
            <a href="#craft" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Archive
            </a>
            <a href="#comparison" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Local speed
            </a>
            <a href="#access" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Download
            </a>
          </nav>

          <a
            href="#access"
            className="rounded-full bg-[#C8F558] px-5 py-2.5 text-[length:var(--text-sm)] font-semibold text-[#0B1A16] hover:bg-[#D7FA7E] transition-colors duration-150"
          >
            Start your vault
          </a>
        </div>
      </header>

      <main id="top">
        {/* Full-bleed photographic takeover from y=0 */}
        <section className="relative min-h-[100dvh] w-full flex items-end overflow-hidden">
          <Image
            src="/variants/with-gemini-design-skill/gemini-4-neon/images/iter2-hero.jpg"
            alt="Dark emerald glass prism refracting chartreuse light across archival index cards"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Targeted horizon gradient only on bottom-left for effortless AA contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(11,26,22,0.88) 0%, rgba(11,26,22,0.58) 48%, rgba(11,26,22,0.12) 100%), linear-gradient(180deg, rgba(11,26,22,0.42) 0%, rgba(11,26,22,0) 28%, rgba(11,26,22,0.92) 100%)",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-36 pb-24 sm:pb-24 md:pb-28">
            <div className="max-w-4xl animate-reveal">
              <h1
                className="text-[clamp(3.1rem,7.2vw,6.4rem)] font-bold leading-[0.94] tracking-[-0.035em] text-[#EEF3F0]"
                style={{ fontFamily: "var(--font-iter2-display), sans-serif" }}
              >
                Your ideas grow stronger together
              </h1>

              <p className="mt-6 max-w-[44ch] text-[length:var(--text-body)] leading-relaxed text-[#C2D4CC]">
                Capture reading notes, interviews, and fleeting sparks in a private vault that weaves connections while you think.
              </p>

              <div className="mt-9">
                <a
                  href="#synthesis"
                  className="inline-flex items-center gap-3 rounded-full bg-[#C8F558] px-7 py-3.5 text-[length:var(--text-body)] font-semibold text-[#0B1A16] hover:bg-[#D7FA7E] transition-colors duration-150"
                >
                  <span>Explore the live graph</span>
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
          </div>
        </section>

        {/* Section 2: Interactive Knowledge Graph & Synthesis Stage */}
        <section id="synthesis" className="py-24 md:py-32 px-6 border-t border-[#1A352D]">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-xl">
                <h2
                  className="text-[length:var(--text-heading)] font-bold leading-[1.08] tracking-[-0.025em] text-[#EEF3F0]"
                  style={{ fontFamily: "var(--font-iter2-display), sans-serif" }}
                >
                  Watch scattered notes form a clear argument
                </h2>
                <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[#9BB0A7] max-w-[54ch]">
                  Select a research thread below and click any connected node to inspect how Cairn assembles a structured outline from months of clippings.
                </p>
              </div>

              {/* Connected segmented toggle */}
              <div
                role="tablist"
                aria-label="Research topics"
                className="inline-flex self-start rounded-full bg-[#112520] p-1 border border-[#1F3F36]"
              >
                {(Object.values(TOPICS) as SynthesisTopic[]).map((item) => {
                  const active = item.id === activeTopic;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setActiveTopic(item.id);
                        setSelectedFragmentIdx(0);
                      }}
                      className={`rounded-full px-4 py-2 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                        active
                          ? "bg-[#C8F558] text-[#0B1A16] font-semibold"
                          : "text-[#9BB0A7] hover:text-[#EEF3F0]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Interactive spatial constellation canvas (desktop/tablet) + stacked selector (mobile) */}
              <div className="lg:col-span-7 relative sm:min-h-[380px] rounded-2xl bg-[#112520] border border-[#1E3D34] p-6 overflow-hidden">
                <div className="sm:hidden space-y-3">
                  <div className="rounded-xl bg-[#0B1A16] border border-[#C8F558]/60 px-4 py-3 text-[length:var(--text-sm)] font-semibold text-[#C8F558]">
                    {topic.centralNote}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {topic.fragments.map((frag, idx) => {
                      const isSelected = idx === selectedFragmentIdx;
                      return (
                        <button
                          key={frag.title}
                          type="button"
                          onClick={() => setSelectedFragmentIdx(idx)}
                          className={`rounded-xl px-4 py-3 text-left text-[length:var(--text-sm)] cursor-pointer border transition-colors duration-150 ${
                            isSelected
                              ? "bg-[#C8F558] text-[#0B1A16] border-[#C8F558] font-semibold"
                              : "bg-[#152E28] text-[#EEF3F0] border-[#274C41]"
                          }`}
                        >
                          {frag.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="hidden sm:block absolute inset-0">
                  <svg
                    className="absolute inset-0 h-full w-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {topic.fragments.map((frag, idx) => (
                      <line
                        key={frag.title}
                        x1="50"
                        y1="50"
                        x2={frag.x}
                        y2={frag.y}
                        stroke={idx === selectedFragmentIdx ? "#C8F558" : "#2B564A"}
                        strokeWidth={idx === selectedFragmentIdx ? "0.6" : "0.35"}
                        strokeDasharray={idx === selectedFragmentIdx ? "none" : "1.5 1.5"}
                      />
                    ))}
                  </svg>

                  {/* Central concept node */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-56 sm:w-60 rounded-xl bg-[#0B1A16] border border-[#C8F558]/60 px-4 py-3.5 text-center shadow-lg">
                    <div className="text-[length:var(--text-sm)] font-semibold text-[#C8F558]">
                      {topic.centralNote}
                    </div>
                  </div>

                  {/* Clickable surrounding fragment nodes */}
                  {topic.fragments.map((frag, idx) => {
                    const isSelected = idx === selectedFragmentIdx;
                    return (
                      <button
                        key={frag.title}
                        type="button"
                        onClick={() => setSelectedFragmentIdx(idx)}
                        style={{
                          left: `${frag.x}%`,
                          top: `${frag.y}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 max-w-[195px] rounded-xl px-3.5 py-2.5 text-left cursor-pointer border transition-colors duration-150 ${
                          isSelected
                            ? "bg-[#C8F558] text-[#0B1A16] border-[#C8F558] font-semibold"
                            : "bg-[#152E28] text-[#EEF3F0] border-[#274C41] hover:border-[#6A9989]"
                        }`}
                      >
                        <div className="text-[length:var(--text-sm)] leading-snug">
                          {frag.title}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live synthesis reader */}
              <div className="lg:col-span-5 rounded-2xl bg-[#112520] border border-[#1E3D34] p-7 flex flex-col justify-between">
                <div>
                  <div className="pb-5 border-b border-[#1E3D34]">
                    <div className="text-[length:var(--text-sm)] text-[#C8F558] font-semibold">
                      Selected clipping ({selectedFragment.date})
                    </div>
                    <h3 className="mt-2 text-[length:var(--text-body)] font-semibold text-[#EEF3F0]">
                      {selectedFragment.title}
                    </h3>
                    <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-[#C2D4CC]">
                      {selectedFragment.snippet}
                    </p>
                  </div>

                  <div className="pt-5">
                    <h3 className="text-[length:var(--text-body)] font-semibold text-[#EEF3F0]">
                      Synthesized outline
                    </h3>
                    <ul className="mt-3.5 space-y-3 text-[length:var(--text-body)] leading-relaxed text-[#9BB0A7]">
                      {topic.outline.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8F558]"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Atmospheric editorial reading moment */}
        <section id="craft" className="py-24 md:py-32 px-6 bg-[#112520]">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2
                className="text-[length:var(--text-heading)] font-bold leading-[1.08] tracking-[-0.025em] text-[#EEF3F0]"
                style={{ fontFamily: "var(--font-iter2-display), sans-serif" }}
              >
                Designed for late-night clarity
              </h2>
              <p className="text-[length:var(--text-body)] leading-relaxed text-[#C2D4CC]">
                Most note apps drown your thinking in nested folders, notification dots, and slow cloud spinners. Cairn strips the desk back to calm typography and instantaneous linking.
              </p>

              <div className="pt-4 border-t border-[#214339] divide-y divide-[#214339]">
                <div className="py-4">
                  <h3 className="text-[length:var(--text-body)] font-semibold text-[#EEF3F0]">
                    Open in one beat
                  </h3>
                  <p className="mt-1 text-[length:var(--text-body)] text-[#9BB0A7]">
                    Cold startup takes under a tenth of a second, even with thirty thousand notes in your vault.
                  </p>
                </div>
                <div className="py-4">
                  <h3 className="text-[length:var(--text-body)] font-semibold text-[#EEF3F0]">
                    Keep full ownership forever
                  </h3>
                  <p className="mt-1 text-[length:var(--text-body)] text-[#9BB0A7]">
                    Plain local files mean your research archive never depends on a startup staying online.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-[#214339]">
              <Image
                src="/variants/with-gemini-design-skill/gemini-4-neon/images/iter2-study.jpg"
                alt="Quiet midnight study desk with open dark linen notebook and botanical shadows"
                width={1500}
                height={1000}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Direct performance & storage comparison table */}
        <section id="comparison" className="py-24 md:py-32 px-6 border-t border-[#1A352D]">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-[length:var(--text-heading)] font-bold leading-[1.08] tracking-[-0.025em] text-[#EEF3F0] max-w-2xl"
              style={{ fontFamily: "var(--font-iter2-display), sans-serif" }}
            >
              Built like an archival instrument
            </h2>
            <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[#9BB0A7] max-w-[56ch]">
              Every interaction runs locally against your file system before syncing quietly in the background.
            </p>

            <div className="mt-12 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#23473D] text-[length:var(--text-sm)] font-semibold text-[#9BB0A7]">
                    <th className="py-4 pr-6">Capability</th>
                    <th className="py-4 px-6 text-[#C8F558]">Cairn</th>
                    <th className="py-4 pl-6">Cloud note tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A352D] text-[length:var(--text-body)] tabular-nums">
                  <tr>
                    <td className="py-5 pr-6 font-medium text-[#EEF3F0]">Full-vault search</td>
                    <td className="py-5 px-6 text-[#C8F558]">12 ms locally</td>
                    <td className="py-5 pl-6 text-[#9BB0A7]">450 to 1,200 ms over network</td>
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-medium text-[#EEF3F0]">Offline editing</td>
                    <td className="py-5 px-6 text-[#EEF3F0]">Complete access without internet</td>
                    <td className="py-5 pl-6 text-[#9BB0A7]">Read-only cache or sync conflicts</td>
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-medium text-[#EEF3F0]">Export format</td>
                    <td className="py-5 px-6 text-[#EEF3F0]">Native plain Markdown files</td>
                    <td className="py-5 pl-6 text-[#9BB0A7]">Proprietary database export</td>
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-medium text-[#EEF3F0]">Encryption</td>
                    <td className="py-5 px-6 text-[#EEF3F0]">Zero-knowledge keys on device</td>
                    <td className="py-5 pl-6 text-[#9BB0A7]">Provider-managed server storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Focused Closing Call */}
        <section id="access" className="py-24 md:py-32 px-6 bg-[#112520] border-t border-[#1E3D34]">
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="text-[length:var(--text-heading)] font-bold leading-[1.05] tracking-[-0.03em] text-[#EEF3F0]"
              style={{ fontFamily: "var(--font-iter2-display), sans-serif" }}
            >
              Give your best thinking a permanent home
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-[length:var(--text-body)] leading-relaxed text-[#C2D4CC]">
              Free for personal local vaults on macOS, Windows, and Linux. Add encrypted multi-device sync for $8 per month.
            </p>
            <div className="mt-9">
              <a
                href="#top"
                className="inline-flex items-center justify-center rounded-full bg-[#C8F558] px-8 py-4 text-[length:var(--text-body)] font-semibold text-[#0B1A16] hover:bg-[#D7FA7E] transition-colors duration-150"
              >
                Download Cairn free
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1A352D] py-12 px-6 bg-[#0B1A16]">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div
            className="text-[1.75rem] font-bold tracking-[-0.03em] text-[#EEF3F0]"
            style={{ fontFamily: "var(--font-iter2-display), sans-serif" }}
          >
            Cairn
          </div>
          <div className="flex flex-wrap gap-7 text-[length:var(--text-sm)] text-[#9BB0A7]">
            <a href="#synthesis" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Synthesis
            </a>
            <a href="#craft" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Archive
            </a>
            <a href="#comparison" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Local speed
            </a>
            <a href="#access" className="hover:text-[#EEF3F0] transition-colors duration-150">
              Download
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
