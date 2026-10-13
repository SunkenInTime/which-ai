"use client";

import { useState } from "react";
import Link from "next/link";

type SlipKey = "limestone" | "courtyards" | "humidity" | "ventilation";

interface MarginSlip {
  id: SlipKey;
  title: string;
  recordedAt: string;
  location: string;
  excerpt: string;
  observation: string;
  connectedNotes: { label: string; target: SlipKey }[];
  diagramType: "strata" | "airflow" | "hygro" | "flue";
}

const MARGIN_SLIPS: Record<SlipKey, MarginSlip> = {
  limestone: {
    id: "limestone",
    title: "Thermal inertia in oolitic limestone walls",
    recordedAt: "14 September 2025",
    location: "Notebook IV, Folio 38 (Bath & Cotswolds survey)",
    excerpt:
      "Walls thicker than 52 centimeters delay peak solar heat transfer by nearly eleven hours, releasing stored warmth into reading rooms only after nightfall.",
    observation:
      "Measured surface temperature inside the north archive remained within a 1.4°C band across a 16°C diurnal swing outside. Porous stone acts as a slow thermal capacitor rather than a static barrier.",
    connectedNotes: [
      { label: "Passive archive ventilation", target: "ventilation" },
      { label: "Salt-glaze humidity regulation", target: "humidity" },
    ],
    diagramType: "strata",
  },
  courtyards: {
    id: "courtyards",
    title: "Evaporative cooling in sunken stone peristyles",
    recordedAt: "3 August 2025",
    location: "Notebook III, Folio 112 (Cordoba field notes)",
    excerpt:
      "Shallowstone basins fed by narrow runnels lower ambient courtyard air by 4°C to 6°C before it enters adjacent study alcoves.",
    observation:
      "When paired with high clerestory vents, cool air pools at desk height while warm air exhausts near the timber coffered ceiling without mechanical fans.",
    connectedNotes: [
      { label: "Thermal inertia in limestone", target: "limestone" },
      { label: "Passive archive ventilation", target: "ventilation" },
    ],
    diagramType: "airflow",
  },
  humidity: {
    id: "humidity",
    title: "Hygroscopic buffering of lime-plastered vaults",
    recordedAt: "29 November 2025",
    location: "Notebook V, Folio 19 (St. Gallen abbey library)",
    excerpt:
      "Unpainted lime plaster and unfinished spruce shelving absorb excess atmospheric moisture during damp thaws and release it during dry winter frosts.",
    observation:
      "Vellum manuscripts stored in unsealed timber presses showed zero cockling over three centuries because the room itself breathes as a single moisture buffer.",
    connectedNotes: [
      { label: "Thermal inertia in limestone", target: "limestone" },
      { label: "Evaporative cooling courtyards", target: "courtyards" },
    ],
    diagramType: "hygro",
  },
  ventilation: {
    id: "ventilation",
    title: "Stack-effect flues in monastic scriptoria",
    recordedAt: "18 January 2026",
    location: "Notebook VI, Folio 7 (Durham dormitory survey)",
    excerpt:
      "Vertical masonry shafts embedded in the south wall warm under morning sun, drawing stale air upward from the writing carrels below.",
    observation:
      "By tuning the oak louver aperture at floor level, air exchange stays gentle enough not to disturb loose paper slips on the desk.",
    connectedNotes: [
      { label: "Evaporative cooling courtyards", target: "courtyards" },
      { label: "Salt-glaze humidity regulation", target: "humidity" },
    ],
    diagramType: "flue",
  },
};

function SpecimenDiagram({ type }: { type: MarginSlip["diagramType"] }) {
  return (
    <svg
      viewBox="0 0 280 96"
      className="w-full h-24 rounded border border-[#C5CEC0] bg-[#EAECE6]/70 p-2"
      aria-hidden="true"
    >
      {type === "strata" && (
        <g stroke="#254689" strokeWidth="1.2" fill="none">
          <rect x="20" y="14" width="76" height="68" fill="#DFE3DA" />
          <line x1="45" y1="14" x2="45" y2="82" strokeDasharray="3 3" />
          <line x1="70" y1="14" x2="70" y2="82" strokeDasharray="3 3" />
          <path
            d="M 110 26 C 145 26, 155 72, 195 72 C 225 72, 235 44, 260 44"
            stroke="#254689"
            strokeWidth="1.75"
          />
          <path
            d="M 110 50 C 145 50, 165 54, 260 52"
            stroke="#3B5243"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <text x="112" y="21" fill="#3B5243" fontSize="9" fontFamily="serif">
            Exterior 28°C swing
          </text>
          <text x="186" y="64" fill="#254689" fontSize="9" fontFamily="serif">
            Interior 1.4°C band
          </text>
        </g>
      )}
      {type === "airflow" && (
        <g stroke="#254689" strokeWidth="1.2" fill="none">
          <path d="M 24 20 L 24 78 L 136 78 L 136 20" stroke="#3B5243" strokeWidth="1.5" />
          <rect x="52" y="68" width="56" height="10" fill="#254689" fillOpacity="0.18" />
          <path d="M 80 24 C 80 48, 62 56, 42 58" />
          <path d="M 80 24 C 80 48, 98 56, 122 58" />
          <path d="M 152 60 C 185 60, 205 32, 248 26" stroke="#254689" strokeWidth="1.6" />
          <text x="152" y="76" fill="#3B5243" fontSize="9" fontFamily="serif">
            Convective lift across alcove
          </text>
        </g>
      )}
      {type === "hygro" && (
        <g stroke="#254689" strokeWidth="1.2" fill="none">
          <circle cx="58" cy="48" r="28" fill="#DFE3DA" />
          <circle cx="58" cy="48" r="18" strokeDasharray="2 3" />
          <path d="M 112 34 Q 150 14, 188 34 T 256 34" stroke="#3B5243" />
          <path d="M 112 52 Q 150 47, 188 52 T 256 52" stroke="#254689" strokeWidth="1.8" />
          <text x="112" y="76" fill="#254689" fontSize="9" fontFamily="serif">
            51% relative humidity equilibrium
          </text>
        </g>
      )}
      {type === "flue" && (
        <g stroke="#254689" strokeWidth="1.2" fill="none">
          <rect x="34" y="12" width="22" height="72" fill="#DFE3DA" />
          <path d="M 45 76 L 45 20" stroke="#254689" strokeWidth="1.6" />
          <path d="M 56 68 L 160 68 L 160 32 L 56 32" stroke="#3B5243" />
          <path d="M 140 58 C 110 58, 82 54, 48 42" strokeDasharray="3 3" />
          <text x="172" y="48" fill="#3B5243" fontSize="9" fontFamily="serif">
            Solar chimney draft
          </text>
          <text x="172" y="62" fill="#254689" fontSize="9" fontFamily="serif">
            0.2 m/s laminar flow
          </text>
        </g>
      )}
    </svg>
  );
}

export default function HerbariumIterationPage() {
  const [activeSlip, setActiveSlip] = useState<SlipKey>("limestone");
  const [userAnnotations, setUserAnnotations] = useState<Record<SlipKey, string[]>>({
    limestone: [
      "Compare with Hassan Fathy's mud-brick vault measurements in New Gourna (1948).",
    ],
    courtyards: [],
    humidity: [
      "Check whether unkilned clay brick shows an even steeper sorption isotherm.",
    ],
    ventilation: [],
  });
  const [draftNote, setDraftNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentSlip = MARGIN_SLIPS[activeSlip];

  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draftNote.trim();
    if (!trimmed) return;
    setUserAnnotations((prev) => ({
      ...prev,
      [activeSlip]: [...prev[activeSlip], trimmed],
    }));
    setDraftNote("");
  };

  const archiveEntries = [
    {
      title: "Capillary rise in lime-mortared rubble foundations",
      notebook: "Notebook II, Folio 84",
      date: "19 May 2025",
      summary:
        "Sacrificial lime renders draw dissolved salts outward from the structural core, preserving interior frescoes.",
      related: "limestone" as SlipKey,
    },
    {
      title: "Acoustic absorption of coffered larch ceilings",
      notebook: "Notebook IV, Folio 12",
      date: "02 October 2025",
      summary:
        "Deep timber coffers scatter mid-frequency speech reflections while preserving low-level ambient quiet.",
      related: "ventilation" as SlipKey,
    },
    {
      title: "Night-sky radiant cooling on limewashed roofs",
      notebook: "Notebook III, Folio 99",
      date: "11 August 2025",
      summary:
        "High-albedo calcium carbonate surfaces radiate long-wave infrared heat into clear nocturnal skies.",
      related: "courtyards" as SlipKey,
    },
    {
      title: "Oak gall ink permanence on rag laid paper",
      notebook: "Notebook I, Folio 4",
      date: "07 February 2025",
      summary:
        "Balanced iron-tannin complexes bind into linen fibers without eating through the sheet when buffered with chalk.",
      related: "humidity" as SlipKey,
    },
  ].filter(
    (entry) =>
      !searchQuery.trim() ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#EAECE6] text-[#18221D] font-newsreader selection:bg-[#254689]/15 selection:text-[#254689]">
      {/* Top Bar */}
      <header className="border-b border-[#C5CEC0] bg-[#EAECE6]/90 backdrop-blur-xs sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-4">
            <Link
              href="/with-design-skill/gemini-4-argon/1"
              className="text-2xl font-medium tracking-tight text-[#18221D]"
            >
              Marrow
            </Link>
            <span className="hidden sm:inline text-sm text-[#3B5243]">
              A field notebook and margin index for long-form research
            </span>
          </div>

          <nav className="flex items-center gap-6 font-jakarta text-sm text-[#3B5243]">
            <a
              href="#manuscript-desk"
              className="hover:text-[#18221D] transition-colors"
            >
              Manuscript desk
            </a>
            <a
              href="#maturation"
              className="hover:text-[#18221D] transition-colors hidden md:inline"
            >
              How notes mature
            </a>
            <a
              href="#herbarium-index"
              className="hover:text-[#18221D] transition-colors hidden md:inline"
            >
              Index ledger
            </a>
            <a
              href="#download"
              className="rounded-md bg-[#18221D] px-4 py-2 text-xs font-medium text-[#F5F7F2] transition-colors hover:bg-[#254689]"
            >
              Open a blank notebook
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-12 pb-28">
        {/* Hero Headline + Introduction */}
        <section className="mb-12 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-normal leading-[1.12] tracking-tight text-[#18221D]">
            Keep every observation in the margin of the thought that needs it.
          </h1>
          <p className="mt-5 text-lg sm:text-xl leading-[1.65] text-[#3B5243] max-w-[64ch]">
            Folders bury notes in the past. Marrow treats your notebooks like a
            naturalist’s herbarium: whenever you cite an earlier observation, that
            slip appears immediately in the right-hand margin so you can compare,
            annotate, and write without losing your place.
          </p>
        </section>

        {/* Interactive Hero: Manuscript Desk with Live Hanging Margin */}
        <section
          id="manuscript-desk"
          aria-label="Interactive manuscript and margin transclusion demo"
          className="rounded-xl border border-[#C5CEC0] bg-[#F5F7F2] shadow-xs overflow-hidden"
        >
          {/* Folio Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5CEC0] bg-[#DFE3DA] px-6 py-3 font-jakarta text-xs text-[#3B5243]">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-[#3B5243]" />
              <span className="font-medium text-[#18221D]">
                Drafting: Passive climate control in historic stone libraries
              </span>
            </div>
            <div>
              Click any underlined blue pencil reference in the text to inspect its
              field slip in the margin
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Primary Manuscript Sheet */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:border-r border-[#C5CEC0]">
              <div className="mb-6 flex items-baseline justify-between border-b border-[#C5CEC0]/70 pb-3 text-sm text-[#3B5243]">
                <span>Treatise Draft, Chapter II</span>
                <span>Last revised today at 11:42</span>
              </div>

              <article className="space-y-6 text-lg sm:text-[1.18rem] leading-[1.75] text-[#18221D] max-w-[62ch]">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#18221D] leading-snug">
                  Why sixteenth-century reading rooms rarely required mechanical
                  intervention
                </h2>

                <p>
                  Modern archival vaults rely on continuous chillers to hold
                  temperature steady, yet older stone repositories achieved
                  comparable stability through mass and geometry alone. When we
                  examined{" "}
                  <button
                    type="button"
                    onClick={() => setActiveSlip("limestone")}
                    className={`inline text-left font-medium underline decoration-2 underline-offset-4 transition-colors px-1 rounded ${
                      activeSlip === "limestone"
                        ? "bg-[#254689]/15 text-[#254689] decoration-[#254689]"
                        : "text-[#254689] decoration-[#254689]/50 hover:bg-[#254689]/10"
                    }`}
                  >
                    [[thermal inertia in limestone]]
                  </button>
                  , the interior wall surface barely registered afternoon heat
                  waves until midnight, long after the shutters were barred.
                </p>

                <p>
                  In warmer Mediterranean latitudes, mass alone is insufficient
                  without a heat sink. Builders paired deep masonry with{" "}
                  <button
                    type="button"
                    onClick={() => setActiveSlip("courtyards")}
                    className={`inline text-left font-medium underline decoration-2 underline-offset-4 transition-colors px-1 rounded ${
                      activeSlip === "courtyards"
                        ? "bg-[#254689]/15 text-[#254689] decoration-[#254689]"
                        : "text-[#254689] decoration-[#254689]/50 hover:bg-[#254689]/10"
                    }`}
                  >
                    [[evaporative cooling courtyards]]
                  </button>{" "}
                  so that pre-cooled air drifted across shaded cloisters before
                  entering the reading room floor.
                </p>

                <p>
                  Paper and parchment care even more about moisture than
                  temperature. Our measurements of{" "}
                  <button
                    type="button"
                    onClick={() => setActiveSlip("humidity")}
                    className={`inline text-left font-medium underline decoration-2 underline-offset-4 transition-colors px-1 rounded ${
                      activeSlip === "humidity"
                        ? "bg-[#254689]/15 text-[#254689] decoration-[#254689]"
                        : "text-[#254689] decoration-[#254689]/50 hover:bg-[#254689]/10"
                    }`}
                  >
                    [[salt-glaze humidity regulation]]
                  </button>{" "}
                  and breathable lime plasters show that unpainted mineral surfaces
                  absorb dampness during rainstorms and release it during dry
                  spells, while{" "}
                  <button
                    type="button"
                    onClick={() => setActiveSlip("ventilation")}
                    className={`inline text-left font-medium underline decoration-2 underline-offset-4 transition-colors px-1 rounded ${
                      activeSlip === "ventilation"
                        ? "bg-[#254689]/15 text-[#254689] decoration-[#254689]"
                        : "text-[#254689] decoration-[#254689]/50 hover:bg-[#254689]/10"
                    }`}
                  >
                    [[passive archive ventilation]]
                  </button>{" "}
                  exhausts stagnant air through solar-warmed masonry flues.
                </p>
              </article>

              {/* Quick switcher pills for mobile/convenience */}
              <div className="mt-8 pt-5 border-t border-[#C5CEC0]/70 flex flex-wrap items-center gap-2 font-jakarta text-xs">
                <span className="text-[#3B5243] mr-1">Referenced field slips:</span>
                {(Object.keys(MARGIN_SLIPS) as SlipKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSlip(key)}
                    className={`rounded-full px-3 py-1 transition-colors ${
                      activeSlip === key
                        ? "bg-[#254689] text-white font-medium"
                        : "bg-[#DFE3DA] text-[#18221D] hover:bg-[#C5CEC0]"
                    }`}
                  >
                    {MARGIN_SLIPS[key].title.split(" in ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Live Hanging Margin Transclusion */}
            <aside className="lg:col-span-5 bg-[#DFE3DA]/65 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-[#C5CEC0] pb-3">
                  <span className="font-jakarta text-xs font-medium text-[#254689]">
                    Transcluded Margin Slip
                  </span>
                  <span className="text-xs italic text-[#3B5243]">
                    {currentSlip.recordedAt}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-xs text-[#3B5243] mb-1">
                    {currentSlip.location}
                  </div>
                  <h3 className="text-2xl font-normal text-[#18221D] leading-snug">
                    {currentSlip.title}
                  </h3>

                  <div className="mt-4">
                    <SpecimenDiagram type={currentSlip.diagramType} />
                  </div>

                  <blockquote className="mt-4 border-l-2 border-[#254689] pl-4 italic text-base leading-[1.65] text-[#18221D]">
                    “{currentSlip.excerpt}”
                  </blockquote>

                  <p className="mt-3 text-base leading-[1.65] text-[#3B5243]">
                    {currentSlip.observation}
                  </p>
                </div>

                {/* User's Marginalia on this slip */}
                <div className="mt-6 border-t border-[#C5CEC0] pt-4">
                  <div className="font-jakarta text-xs font-medium text-[#18221D] mb-2">
                    Penciled marginalia ({userAnnotations[activeSlip].length})
                  </div>
                  {userAnnotations[activeSlip].length === 0 ? (
                    <p className="text-sm italic text-[#3B5243]">
                      No margin notes penciled on this slip yet. Add one below to
                      test live annotation.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {userAnnotations[activeSlip].map((note, idx) => (
                        <li
                          key={idx}
                          className="rounded border border-[#C5CEC0] bg-[#F5F7F2] px-3 py-2 text-sm text-[#254689]"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}

                  <form onSubmit={handleAddAnnotation} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={draftNote}
                      onChange={(e) => setDraftNote(e.target.value)}
                      placeholder="Pencil a note onto this slip..."
                      aria-label="Pencil a note onto this slip"
                      className="flex-1 rounded border border-[#C5CEC0] bg-[#F5F7F2] px-3 py-1.5 font-jakarta text-xs text-[#18221D] placeholder:text-[#3B5243]/60 focus:border-[#254689] focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="rounded bg-[#254689] px-3 py-1.5 font-jakarta text-xs font-medium text-white hover:bg-[#1c366b] transition-colors"
                    >
                      Pin note
                    </button>
                  </form>
                </div>
              </div>

              {/* Outgoing associations from the margin slip itself */}
              <div className="mt-6 border-t border-[#C5CEC0] pt-4">
                <div className="font-jakarta text-xs text-[#3B5243] mb-2">
                  Follow connected slips from this margin:
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentSlip.connectedNotes.map((link) => (
                    <button
                      key={link.target}
                      type="button"
                      onClick={() => setActiveSlip(link.target)}
                      className="rounded border border-[#254689]/30 bg-[#F5F7F2] px-3 py-1 font-jakarta text-xs text-[#254689] hover:bg-[#254689] hover:text-white transition-colors"
                    >
                      [[{link.label}]]
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Chronological Sequence: How a fleeting observation matures */}
        <section id="maturation" className="mt-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-normal leading-tight text-[#18221D]">
              How a field observation matures into a finished argument
            </h2>
            <p className="mt-3 text-lg leading-[1.65] text-[#3B5243]">
              Because thoughts rarely arrive in their final outline, Marrow
              preserves every stage of a note’s growth across time.
            </p>
          </div>

          <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="rounded-xl border border-[#C5CEC0] bg-[#F5F7F2] p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between border-b border-[#C5CEC0] pb-3 text-sm text-[#3B5243]">
                  <span className="font-jakarta font-semibold text-[#18221D]">
                    1. Field jotting
                  </span>
                  <span className="italic">Day one</span>
                </div>
                <h3 className="mt-5 text-xl font-normal text-[#18221D]">
                  Capture the raw measurement before it fades
                </h3>
                <p className="mt-3 text-base leading-[1.65] text-[#3B5243]">
                  Drop a quick sensor reading, a photograph of stone tooling, or a
                  half-formed question into your daily sheet without deciding
                  which folder it belongs to.
                </p>
              </div>
              <div className="mt-6 rounded border border-[#C5CEC0] bg-[#EAECE6] p-3.5 text-sm italic text-[#18221D]">
                “North wall feels cool to the palm at 4pm despite 31°C outside;
                check wall thickness on survey drawing.”
              </div>
            </li>

            <li className="rounded-xl border border-[#C5CEC0] bg-[#F5F7F2] p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between border-b border-[#C5CEC0] pb-3 text-sm text-[#3B5243]">
                  <span className="font-jakarta font-semibold text-[#18221D]">
                    2. Cross-pollination
                  </span>
                  <span className="italic">Three months later</span>
                </div>
                <h3 className="mt-5 text-xl font-normal text-[#18221D]">
                  Notice unexpected kinship across notebooks
                </h3>
                <p className="mt-3 text-base leading-[1.65] text-[#3B5243]">
                  As you write a new note in winter, Marrow surfaces your autumn
                  field slips that share vocabulary or citations, linking them
                  with bidirectional thread.
                </p>
              </div>
              <div className="mt-6 rounded border border-[#C5CEC0] bg-[#EAECE6] p-3.5 text-sm text-[#254689]">
                Linked to [[Hygroscopic buffering of lime-plastered vaults]] and
                [[Stack-effect flues]].
              </div>
            </li>

            <li className="rounded-xl border border-[#C5CEC0] bg-[#F5F7F2] p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between border-b border-[#C5CEC0] pb-3 text-sm text-[#3B5243]">
                  <span className="font-jakarta font-semibold text-[#18221D]">
                    3. Manuscript synthesis
                  </span>
                  <span className="italic">Year end</span>
                </div>
                <h3 className="mt-5 text-xl font-normal text-[#18221D]">
                  Write with your evidence open beside you
                </h3>
                <p className="mt-3 text-base leading-[1.65] text-[#3B5243]">
                  Pull a dozen linked slips into the margin of a fresh draft. Drag
                  verified quotes directly into your prose while keeping every
                  citation intact.
                </p>
              </div>
              <div className="mt-6 rounded border border-[#C5CEC0] bg-[#EAECE6] p-3.5 text-sm text-[#18221D]">
                Exported as clean Markdown, LaTeX, or archival PDF with complete
                footnote lineage.
              </div>
            </li>
          </ol>
        </section>

        {/* Interactive Herbarium Index Ledger */}
        <section
          id="herbarium-index"
          className="mt-24 rounded-xl border border-[#C5CEC0] bg-[#DFE3DA] p-6 sm:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C5CEC0] pb-6">
            <div>
              <h2 className="text-3xl font-normal text-[#18221D]">
                Search across decades of notebooks in milliseconds
              </h2>
              <p className="mt-2 text-base leading-[1.6] text-[#3B5243] max-w-[58ch]">
                Every slip is stored on your disk as plain, human-readable text.
                Filter the sample botanical and architectural ledger below, or
                click any entry to load its connected slip into the manuscript desk
                above.
              </p>
            </div>
            <div className="w-full md:w-72">
              <label htmlFor="ledger-search" className="sr-only">
                Filter notebook entries
              </label>
              <input
                id="ledger-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by stone, lime, acoustic..."
                className="w-full rounded-lg border border-[#C5CEC0] bg-[#F5F7F2] px-3.5 py-2 font-jakarta text-sm text-[#18221D] placeholder:text-[#3B5243]/70 focus:border-[#254689] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-6 divide-y divide-[#C5CEC0]">
            {archiveEntries.length === 0 ? (
              <div className="py-8 text-center text-base text-[#3B5243]">
                No field slips match “{searchQuery}”. Clear the filter to see all
                recorded observations.
              </div>
            ) : (
              archiveEntries.map((entry) => (
                <div
                  key={entry.title}
                  className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
                >
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-normal text-[#18221D]">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-base text-[#3B5243] leading-[1.6]">
                      {entry.summary}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-baseline sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-sm italic text-[#3B5243]">
                      {entry.notebook} ({entry.date})
                    </span>
                    <a
                      href="#manuscript-desk"
                      onClick={() => setActiveSlip(entry.related)}
                      className="font-jakarta text-xs font-medium text-[#254689] underline underline-offset-4 hover:text-[#18221D]"
                    >
                      Inspect linked margin slip
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Closing Call to Action */}
        <section
          id="download"
          className="mt-24 border-t border-[#C5CEC0] pt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#18221D]">
              Begin your own field archive today.
            </h2>
            <p className="mt-3 text-lg text-[#3B5243] leading-[1.6]">
              Marrow runs locally on macOS, Linux, and iOS. Your notes remain in a
              plain folder of Markdown and SVG files that you own forever, with no
              account required to start writing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-jakarta">
            <button
              type="button"
              onClick={() => {
                setActiveSlip("courtyards");
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              className="rounded-lg bg-[#18221D] px-5 py-3 text-sm font-medium text-[#F5F7F2] hover:bg-[#254689] transition-colors"
            >
              Download Marrow for macOS
            </button>
            <a
              href="#manuscript-desk"
              className="rounded-lg border border-[#3B5243] bg-transparent px-5 py-3 text-sm font-medium text-[#18221D] hover:bg-[#DFE3DA] transition-colors"
            >
              Explore the sample notebook
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
