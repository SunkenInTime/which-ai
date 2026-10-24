"use client";

import { useState } from "react";
import { useScrollReveal } from "@/variants/with-taste-skill/gemini-4-argon/source/components/useScrollReveal";
import { AssetCredits } from "@/variants/with-taste-skill/gemini-4-argon/source/components/AssetCredits";

const HERO_FOLDERS = [
  {
    id: "inbox",
    tab: "Flüchtige Notizen",
    bg: "#cbbba6",
    ink: "#2a1d17",
    tabX: "2%",
    summary: "Daily fleeting capture tray that empties itself at midnight.",
  },
  {
    id: "biblio",
    tab: "Literaturkasten",
    bg: "#d8c8b2",
    ink: "#2a1d17",
    tabX: "14%",
    summary: "Source citations tied to page numbers and marginalia.",
  },
  {
    id: "spine",
    tab: "Folgezettel Spine",
    bg: "#b8c2ac",
    ink: "#2a1d17",
    tabX: "26%",
    summary: "Alphanumeric branching chains (21a → 21a1 → 21b) without folders.",
  },
  {
    id: "index",
    tab: "Schlagwort Register",
    bg: "#456f3a",
    ink: "#ffffff",
    tabX: "38%",
    summary: "Entry-point keyword slips that point into the middle of an argument.",
  },
  {
    id: "cabinet",
    tab: "Hauptkasten Drawer",
    bg: "#2a1d17",
    ink: "#e5e1d8",
    tabX: "50%",
    summary: "Your permanent plain-text slip-box stored locally in ~/Kasten/.",
  },
];

const SHOWCASE_SLIPS = [
  {
    code: "21 / 3a1",
    label: "21/3a1 · Contingency",
    title: "Why folders destroy surprise across long research projects",
    image: "/variants/with-taste-skill/gemini-4-argon/assets/catalog-card-for-kazantzakis-askitiki-the-photo.jpg",
    alt: "Close-up of a typed library index card with black ruling and archival classification marks",
    body: "When you file a note inside a topic folder, you trap it inside the single context you had on the day you wrote it. Filing it behind slip 21/3a forces it to sit next to older arguments you had forgotten.",
    backlinks: ["21/3a · Double contingency", "14/8b · Serendipity in indices"],
    wordCount: 164,
    date: "14 Oct · Bielefeld format",
  },
  {
    code: "14 / 8b",
    label: "14/8b · Index Keys",
    title: "An index is not a taxonomy; it is a set of doors into chains",
    image: "/variants/with-taste-skill/gemini-4-argon/assets/the-fine-art-of-literary-mayhem-card.jpg",
    alt: "Typewritten catalog card for The Fine Art of Literary Mayhem showing numbered subject tracers at the bottom",
    body: "Never reorganize the slip-box when your thinking shifts. Add one keyword slip to the Schlagwortkatalog pointing to the first card of the new sequence, and let the branching addresses carry the weight.",
    backlinks: ["14/8a · Entry points", "21/3a1 · Folder decay"],
    wordCount: 188,
    date: "19 Oct · Bielefeld format",
  },
  {
    code: "9c / 2a4",
    label: "9c/2a4 · Atomicity",
    title: "One card holds one self-contained claim in 240 words or fewer",
    image: "/variants/with-taste-skill/gemini-4-argon/assets/cololejeunea-khanii-holotype-index-card-at-museum.jpg",
    alt: "Botanical holotype specimen index card with red typewritten classification and archival barcode",
    body: "An A6 card measures 148 by 105 millimetres. If an argument spills past that physical boundary, it contains two thoughts masquerading as one and cannot be linked cleanly from unrelated domains.",
    backlinks: ["9c/2a3 · Card geometry", "33/1a · Recombination"],
    wordCount: 142,
    date: "21 Oct · Bielefeld format",
  },
];

const ARCHIVE_INDEX_PREVIEW = [
  {
    address: "1a / 1",
    title: "Principle of Fixed Address",
    note: "Once a slip receives its alphanumeric coordinate, it never moves.",
    img: "/variants/with-taste-skill/gemini-4-argon/assets/schlagwortkatalog.jpg",
    alt: "Open wooden drawer of a German Schlagwortkatalog filled with paper index slips",
  },
  {
    address: "7b / 4a2",
    title: "Two-Box Daily Triage",
    note: "Fleeting jottings expire at midnight unless rewritten in your own prose.",
    img: "/variants/with-taste-skill/gemini-4-argon/assets/manuscript-notes-of-john-j-audubon-for.jpg",
    alt: "Folded 1830 manuscript slip by John James Audubon with handwritten plate reference",
  },
  {
    address: "19 / 2a1",
    title: "Cross-Drawer Folgezettel",
    note: "Insert a new line of reasoning between any two existing cards without renumbering.",
    img: "/variants/with-taste-skill/gemini-4-argon/assets/card-catalog-at-the-indiana-state-library-2.jpg",
    alt: "Close-up of brass drawer hardware and label slips 808 and 809 on a wooden catalog",
  },
  {
    address: "32 / 6c",
    title: "Plain UTF-8 Longevity",
    note: "Every slip is an ordinary Markdown file on your disk that outlives any vendor.",
    img: "/variants/with-taste-skill/gemini-4-argon/assets/herbarium.jpg",
    alt: "Open 1484 printed Herbarium showing structured Latin headings and woodcut plate",
  },
];

export default function IterationOnePage() {
  useScrollReveal();

  const [activeFolder, setActiveFolder] = useState(4);
  const [selectedSlipIdx, setSelectedSlipIdx] = useState(0);
  const [draftText, setDraftText] = useState(
    "A second brain fails the moment it becomes a warehouse of unread clippings. In Kasten, a note enters the permanent drawer only after you rewrite it in your own words inside a 240-word A6 frame and assign its Folgezettel parent."
  );
  const [branchCode, setBranchCode] = useState("21/3a2");
  const [hoveredArchive, setHoveredArchive] = useState(0);
  const [planChoice, setPlanChoice] = useState<"cabinet" | "starter">("cabinet");

  const currentSlip = SHOWCASE_SLIPS[selectedSlipIdx];
  const wordCount = draftText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="theme-iter1">
      {/* ================================================================
          SECTION 1 · HERO: Tabbed folder stack (The page is the object)
          ================================================================ */}
      <header
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "24px",
        }}
      >
        <div className="iter1-container" style={{ width: "100%" }}>
          {/* Top bar */}
          <nav
            aria-label="Primary navigation"
            className="anim-load-1"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              paddingBottom: "28px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
              <strong
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  letterSpacing: "0.02em",
                }}
              >
                KASTEN
              </strong>
              <span style={{ color: "var(--muted)", fontSize: "16px" }}>
                Bielefeld Slip-Box · Plain-Text Second Brain
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                flexWrap: "wrap",
                fontSize: "19px",
              }}
            >
              <a
                href="#plate-showcase"
                style={{ color: "var(--ink)", textDecoration: "none" }}
              >
                Archival Plate
              </a>
              <a
                href="#daily-ritual"
                style={{ color: "var(--ink)", textDecoration: "none" }}
              >
                Daily Slip
              </a>
              <a
                href="#capability-sheets"
                style={{ color: "var(--ink)", textDecoration: "none" }}
              >
                Four Sheets
              </a>
              <a
                href="#admission-ticket"
                style={{ color: "var(--ink)", textDecoration: "none" }}
              >
                Drawer Pass
              </a>
            </div>
          </nav>

          {/* Upper 48% Exposed Desk Surface with Display Headline */}
          <div
            className="grid-12"
            style={{
              alignItems: "end",
              paddingTop: "12px",
              paddingBottom: "36px",
            }}
          >
            <div style={{ gridColumn: "span 8" }} className="anim-load-2">
              <h1
                style={{
                  fontSize: "clamp(48px, 7.6vw, 108px)",
                  lineHeight: 0.88,
                  color: "var(--ink)",
                }}
              >
                THE WOODEN SLIP-BOX,
                <br />
                REBUILT IN PLAIN TEXT.
              </h1>
            </div>
            <div style={{ gridColumn: "span 4" }} className="anim-load-3">
              <p
                style={{
                  margin: 0,
                  fontSize: "19px",
                  color: "var(--ink)",
                  maxWidth: "56ch",
                }}
              >
                Kasten is a local-first second brain modeled on Niklas
                Luhmann&apos;s 90,000-card archive. Every thought is an atomic
                A6 Markdown slip filed by a branching Folgezettel address on
                your own disk.
              </p>
            </div>
          </div>
        </div>

        {/* Lower 52% · 5 Stacked Full-Width File Folders with Trapezoid Tabs */}
        <div
          data-ui="hero-folder-stack"
          style={{ width: "100%", marginTop: "auto" }}
          className="anim-load-4"
        >
          {HERO_FOLDERS.map((folder, idx) => {
            const isLast = idx === HERO_FOLDERS.length - 1;
            const isSelected = activeFolder === idx;
            return (
              <div key={folder.id} style={{ width: "100%" }}>
                {/* Trapezoid Tab Row */}
                <div
                  className="iter1-container"
                  style={{
                    position: "relative",
                    height: "34px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFolder(idx)}
                    className="iter1-folder-tab"
                    style={{
                      position: "absolute",
                      left: folder.tabX,
                      bottom: 0,
                      backgroundColor: folder.bg,
                      color: folder.ink,
                      fontSize: "19px",
                    }}
                  >
                    {folder.tab}
                  </button>
                </div>

                {/* Folder Body Strip or Open Front Folder */}
                {!isLast ? (
                  <div
                    onClick={() => setActiveFolder(idx)}
                    style={{
                      backgroundColor: folder.bg,
                      color: folder.ink,
                      minHeight: isSelected ? "76px" : "44px",
                      cursor: "pointer",
                      transition: "min-height 240ms ease",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="iter1-container"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        gap: "16px",
                        flexWrap: "wrap",
                      }}
                    >
                      <strong style={{ fontSize: "19px" }}>{folder.tab}</strong>
                      <span style={{ fontSize: "19px" }}>{folder.summary}</span>
                    </div>
                  </div>
                ) : (
                  /* Front-most folder open to bottom edge of viewport */
                  <div
                    style={{
                      backgroundColor: folder.bg,
                      color: folder.ink,
                      paddingTop: "36px",
                      paddingBottom: "44px",
                    }}
                  >
                    <div className="iter1-container">
                      <div
                        className="grid-12"
                        style={{ alignItems: "center" }}
                      >
                        <div style={{ gridColumn: "span 7" }}>
                          <h2
                            style={{
                              fontSize: "clamp(34px, 4.2vw, 54px)",
                              color: "#e5e1d8",
                              marginBottom: "12px",
                            }}
                          >
                            OPEN DRAWER: ~/KASTEN/
                          </h2>
                          <p
                            style={{
                              margin: "0 0 24px 0",
                              fontSize: "19px",
                              color: "#dad5ca",
                              maxWidth: "58ch",
                            }}
                          >
                            Active Tray:{" "}
                            <strong>{HERO_FOLDERS[activeFolder].tab}</strong> ·{" "}
                            {HERO_FOLDERS[activeFolder].summary} No cloud sync
                            databases, no proprietary blocks, and sub-millisecond
                            local graph traversal across 90,000 cards.
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                              flexWrap: "wrap",
                            }}
                          >
                            <a
                              href="#admission-ticket"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "var(--accent)",
                                color: "var(--accent-ink)",
                                fontFamily: "var(--font-display)",
                                fontSize: "20px",
                                letterSpacing: "0.02em",
                                padding: "14px 28px",
                                textDecoration: "none",
                              }}
                            >
                              DOWNLOAD KASTEN v2.4
                            </a>
                            <span style={{ color: "#cbbba6", fontSize: "16px" }}>
                              UTF-8 Markdown · 14 MB Universal Binary
                            </span>
                          </div>
                        </div>

                        {/* Live Index Card Specimen inside the open drawer */}
                        <div style={{ gridColumn: "span 5" }}>
                          <div
                            data-ui="hero-drawer-card"
                            style={{
                              backgroundColor: "#e5e1d8",
                              color: "#2a1d17",
                              padding: "22px 24px",
                              border: "1px solid #bfae96",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                paddingBottom: "10px",
                                marginBottom: "12px",
                                borderBottom: "2px solid #b5483a",
                              }}
                            >
                              <strong
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontSize: "20px",
                                  color: "#b5483a",
                                }}
                              >
                                SLIP 21 / 3a1b
                              </strong>
                              <span style={{ fontSize: "16px", color: "#52433a" }}>
                                148 × 105 mm · 47 / 240 words
                              </span>
                            </div>
                            <p
                              style={{
                                margin: "0 0 14px 0",
                                fontSize: "19px",
                                lineHeight: 1.42,
                                maxWidth: "56ch",
                              }}
                            >
                              “An archive begins to think for you only when you
                              stop filing by subject and start filing each slip
                              directly behind the note it answers.”
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "16px",
                                color: "#456f3a",
                                fontWeight: 500,
                              }}
                            >
                              <span>← Branches from 21/3a1</span>
                              <span>Continues to 21/3a2 →</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </header>

      {/* ================================================================
          SECTION 2 · SHOWCASE: Square plate, spare text
          ================================================================ */}
      <section
        id="plate-showcase"
        style={{ paddingTop: "104px", paddingBottom: "104px" }}
      >
        <div className="iter1-container">
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>
              PERMANENT COORDINATES FOR EVERY CARD.
            </h2>
          </div>
          <div
            className="grid-12"
            data-reveal
            style={{ alignItems: "stretch" }}
          >
            {/* Left half: Square plate with generous mat */}
            <div
              style={{
                gridColumn: "span 6",
                backgroundColor: "var(--surface)",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div
                style={{
                  aspectRatio: "4 / 3",
                  width: "100%",
                  overflow: "hidden",
                  backgroundColor: "#2a1d17",
                }}
              >
                <img
                  src={currentSlip.image}
                  width={1920}
                  height={1440}
                  alt={currentSlip.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Working HTML Slip Inspector underneath the plate */}
              <div
                data-ui="plate-slip-inspector"
                style={{
                  backgroundColor: "var(--bg)",
                  color: "#2a1d17",
                  padding: "20px 22px",
                  border: "1px solid #b5a895",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <strong
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "20px",
                      color: "#456f3a",
                    }}
                  >
                    ADDRESS {currentSlip.code}
                  </strong>
                  <span style={{ fontSize: "16px", color: "#52433a" }}>
                    {currentSlip.wordCount} words · {currentSlip.date}
                  </span>
                </div>
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "19px",
                    maxWidth: "58ch",
                  }}
                >
                  {currentSlip.body}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {currentSlip.backlinks.map((link) => (
                    <span
                      key={link}
                      style={{
                        backgroundColor: "var(--surface)",
                        padding: "3px 10px",
                        fontSize: "16px",
                      }}
                    >
                      ↗ {link}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right half: Top row of 3 edition tabs, lower block with title, paragraph, 2 rectangular action cells */}
            <div
              style={{
                gridColumn: "span 6",
                backgroundColor: "#d8c8b2",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "36px",
              }}
            >
              {/* Top row of 3 edition tabs */}
              <div
                data-ui="edition-tabs"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                }}
              >
                {SHOWCASE_SLIPS.map((slip, idx) => {
                  const active = idx === selectedSlipIdx;
                  return (
                    <button
                      key={slip.code}
                      type="button"
                      onClick={() => setSelectedSlipIdx(idx)}
                      style={{
                        padding: "12px 14px",
                        backgroundColor: active
                          ? "var(--accent)"
                          : "var(--bg)",
                        color: active ? "var(--accent-ink)" : "var(--ink)",
                        border: 0,
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "var(--font-display)",
                        fontSize: "19px",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {slip.label}
                    </button>
                  );
                })}
              </div>

              {/* Lower block: section title, short paragraph, 2 rectangular action cells */}
              <div>
                <h3
                  style={{
                    fontSize: "34px",
                    marginBottom: "18px",
                  }}
                >
                  BRANCHING ALPHANUMERIC ADDRESSES.
                </h3>
                <p
                  style={{
                    margin: "0 0 28px 0",
                    fontSize: "19px",
                    color: "#2a1d17",
                    maxWidth: "56ch",
                  }}
                >
                  {currentSlip.title}. Instead of burying notes in nested
                  project folders, Kasten gives each card an immutable
                  alphanumeric address so arguments branch organically over
                  decades.
                </p>

                {/* Two full-width rectangular action cells */}
                <div
                  data-ui="plate-actions"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSlipIdx(
                        (selectedSlipIdx + 1) % SHOWCASE_SLIPS.length
                      )
                    }
                    style={{
                      padding: "16px 18px",
                      backgroundColor: "var(--ink)",
                      color: "#e5e1d8",
                      border: 0,
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--font-display)",
                      fontSize: "19px",
                    }}
                  >
                    NEXT SLIP IN CHAIN →
                  </button>
                  <a
                    href="#daily-ritual"
                    style={{
                      padding: "16px 18px",
                      backgroundColor: "var(--bg)",
                      color: "var(--ink)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: "19px",
                    }}
                  >
                    DAILY TRIAGE SLIP ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 · HOW IT WORKS: Itinerary on a slip
          ================================================================ */}
      <section
        id="daily-ritual"
        style={{
          paddingTop: "96px",
          paddingBottom: "96px",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="iter1-container">
          <div className="grid-12" style={{ alignItems: "start" }}>
            {/* Columns 1–5: Section heading, copy, and archival teleprinter footage */}
            <div style={{ gridColumn: "span 5" }} data-reveal>
              <h2
                style={{
                  fontSize: "clamp(34px, 4.4vw, 54px)",
                  marginBottom: "18px",
                }}
              >
                FROM FLEETING NOTE TO PERMANENT SLIP.
              </h2>
              <p
                style={{
                  margin: "0 0 24px 0",
                  fontSize: "19px",
                  color: "#4a3b32",
                  maxWidth: "54ch",
                }}
              >
                Luhmann never wrote directly into his main cabinet. He kept a
                day-slip for raw thoughts and literature quotes, then spent
                twenty quiet minutes each evening translating the survivors into
                atomic cards.
              </p>

              {/* Real archival video clip of mechanical printing */}
              <div
                style={{
                  backgroundColor: "#2a1d17",
                  padding: "14px",
                }}
              >
                <video
                  src="/variants/with-taste-skill/gemini-4-argon/assets/teleprinter-automatic-printing.webm"
                  poster="/variants/with-taste-skill/gemini-4-argon/assets/teleprinter-automatic-printing-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                  }}
                />
                <p
                  style={{
                    margin: "10px 0 0 0",
                    fontSize: "16px",
                    color: "#dad5ca",
                    maxWidth: "54ch",
                  }}
                >
                  Mechanical keystroke log: every slip in Kasten is stamped to
                  disk as raw UTF-8 text the instant you press Enter.
                </p>
              </div>
            </div>

            {/* Columns 7–12: Paper slip panel with sawtooth bottom edge & dot leaders */}
            <div
              style={{ gridColumn: "span 7" }}
              data-reveal
              data-reveal-delay="1"
            >
              <div
                className="iter1-slip-zigzag"
                style={{
                  backgroundColor: "var(--bg)",
                  color: "#2a1d17",
                  padding: "36px 36px 56px 36px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "28px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <h3 style={{ fontSize: "34px", color: "var(--ink)" }}>
                    EVENING TRIAGE ITINERARY
                  </h3>
                  <span style={{ fontSize: "16px", color: "#52433a" }}>
                    Form A6-240 · Bielefeld Protocol
                  </span>
                </div>

                {/* 4 Itinerary rows with round 4px dot leaders */}
                {[
                  {
                    stage: "Capture in Flüchtige Notizen",
                    detail: "Expires at 24:00",
                    sub: "Jot fleeting ideas with a global shortcut without leaving your book or browser.",
                  },
                  {
                    stage: "Extract bibliographic source",
                    detail: "Cite page in YAML",
                    sub: "Attach the exact page number to a Literaturkasten card so quotes never float free.",
                  },
                  {
                    stage: "Rewrite in 240-word A6 frame",
                    detail: "148 × 105 mm cap",
                    sub: "State one self-contained claim in your own prose so a stranger can read it cold.",
                  },
                  {
                    stage: "Assign Folgezettel address",
                    detail: "0.8 ms local index",
                    sub: "Slot the card directly behind the argument it extends (21/3a1 → 21/3a2).",
                  },
                ].map((item) => (
                  <div key={item.stage} style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "10px",
                      }}
                    >
                      <strong style={{ fontSize: "19px" }}>{item.stage}</strong>
                      <span
                        aria-hidden="true"
                        style={{
                          flex: 1,
                          borderBottom: "4px dotted #9e8f7c",
                          height: "12px",
                          minWidth: "24px",
                        }}
                      />
                      <strong
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "19px",
                          color: "var(--accent)",
                        }}
                      >
                        {item.detail}
                      </strong>
                    </div>
                    <p
                      style={{
                        margin: "4px 0 0 0",
                        fontSize: "19px",
                        color: "#4a3b32",
                        maxWidth: "58ch",
                      }}
                    >
                      {item.sub}
                    </p>
                  </div>
                ))}

                {/* Interactive live A6 card composer on the slip */}
                <div
                  data-ui="slip-composer"
                  style={{
                    marginTop: "28px",
                    backgroundColor: "var(--surface)",
                    padding: "20px",
                    border: "1px solid #b5a895",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <label
                      htmlFor="iter1-draft"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                      }}
                    >
                      240-WORD A6 CARD GAUGE · ADDRESS {branchCode}
                    </label>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["21/3a2", "21/3b", "14/8b1"].map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => setBranchCode(code)}
                          style={{
                            padding: "4px 10px",
                            backgroundColor:
                              branchCode === code ? "var(--accent)" : "var(--bg)",
                            color:
                              branchCode === code ? "#ffffff" : "var(--ink)",
                            border: "1px solid #9e8f7c",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    id="iter1-draft"
                    rows={3}
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "var(--bg)",
                      color: "#2a1d17",
                      border: "1px solid #9e8f7c",
                      fontSize: "19px",
                      resize: "vertical",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "8px",
                      fontSize: "16px",
                      color: wordCount > 240 ? "#8a251b" : "#2d4c25",
                      fontWeight: 500,
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <span>
                      {wordCount} / 240 words on this A6 card (
                      {Math.max(0, 240 - wordCount)} remaining)
                    </span>
                    <span>Saved to ~/Kasten/{branchCode.replace("/", "-")}.md</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 · FEATURES: Stacking colour sheets
          ================================================================ */}
      <section
        id="capability-sheets"
        style={{ paddingTop: "96px", paddingBottom: "96px" }}
      >
        <div className="iter1-container" style={{ marginBottom: "40px" }}>
          <div className="grid-12" data-reveal style={{ alignItems: "end" }}>
            <div style={{ gridColumn: "span 7" }}>
              <h2 style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>
                FOUR SHEETS FROM THE PERMANENT CABINET.
              </h2>
            </div>
            <div style={{ gridColumn: "span 5" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "19px",
                  color: "#4a3b32",
                  maxWidth: "54ch",
                }}
              >
                Each drawer rule prevents collector&apos;s fallacy and turns
                isolated notes into publishable chapters.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Full-Width Colour Sheets with exposed index tab headers */}
        <div>
          {[
            {
              bg: "#d8c8b2",
              ink: "#2a1d17",
              muted: "#4a3b32",
              sheetNo: "SHEET I · ALPHANUMERIC SPINE",
              title: "FOLGEZETTEL WITHOUT FOLDERS",
              copy: "Every card branches directly from an existing card. Alternate numbers and letters (21 → 21a → 21a1 → 21b) so related lines of inquiry stay physically adjacent while remaining infinitely extensible.",
              img: "/variants/with-taste-skill/gemini-4-argon/assets/schlagwortkatalog.jpg",
              alt: "Vintage light-oak library card catalog with open Schlagwortkatalog drawer",
              caption: "Schlagwortkatalog drawer · Direct adjacency of branching slips",
            },
            {
              bg: "#c7d1bc",
              ink: "#1e291b",
              muted: "#33422f",
              sheetNo: "SHEET II · CARD GEOMETRY",
              title: "THE 240-WORD A6 BOUNDARY",
              copy: "Long pages invite sprawling dumps you never re-read. Kasten frames every note to the exact capacity of a 148 × 105 mm paper slip so each thought can be cited or rearranged across ten essays.",
              img: "/variants/with-taste-skill/gemini-4-argon/assets/index-card-3-by-5-inch-agr.jpg",
              alt: "Classic white ruled 3 by 5 inch index card with red top margin line and ten blue body lines",
              caption: "Ruled A6 card geometry · Red header rule and ten body lines",
            },
            {
              bg: "#456f3a",
              ink: "#ffffff",
              muted: "#e2ede0",
              sheetNo: "SHEET III · MANUSCRIPT DESK",
              title: "SUB-MILLISECOND CITATION GRAPH",
              copy: "Drag any Folgezettel chain onto the Manuscript Desk and Kasten concatenates the slips into a clean Markdown draft with footnotes intact. Every inbound and outbound reference updates in 0.8 milliseconds.",
              img: "/variants/with-taste-skill/gemini-4-argon/assets/benedictus-de-spinoza-manuscript-notes-with-tractatus.jpg",
              alt: "Handwritten Latin manuscript notes by Benedictus de Spinoza with marginal citations",
              caption: "Marginal cross-references · Every citation resolves in 0.8 ms",
            },
            {
              bg: "#2a1d17",
              ink: "#e5e1d8",
              muted: "#cbbba6",
              sheetNo: "SHEET IV · PLAIN UTF-8 STORAGE",
              title: "FILES THAT OUTLIVE EVERY VENDOR",
              copy: "Your slip-box lives in an ordinary folder on your hard drive. Read it with grep, version it with Git, or open it in Vim fifty years from now. Zero proprietary cloud databases.",
              img: "/variants/with-taste-skill/gemini-4-argon/assets/cardfile-at-indiana-state-library-35426.jpg",
              alt: "Floor-to-ceiling wooden card catalog cabinet at the Indiana State Library",
              caption: "60-drawer oak archive · Built for multi-decade compounding",
            },
          ].map((sheet) => (
            <article
              key={sheet.title}
              data-reveal
              style={{
                backgroundColor: sheet.bg,
                color: sheet.ink,
                paddingTop: "48px",
                paddingBottom: "48px",
              }}
            >
              <div className="iter1-container">
                <div className="grid-12" style={{ alignItems: "stretch" }}>
                  <div
                    style={{
                      gridColumn: "span 5",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "24px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "34px",
                        color: sheet.ink,
                      }}
                    >
                      {sheet.title}
                    </h3>
                    <div>
                      <p
                        style={{
                          margin: "0 0 12px 0",
                          fontSize: "19px",
                          color: sheet.muted,
                          maxWidth: "54ch",
                        }}
                      >
                        {sheet.copy}
                      </p>
                      <div style={{ fontSize: "16px", color: sheet.muted }}>
                        {sheet.sheetNo} · ~/Kasten/Hauptkasten
                      </div>
                    </div>
                  </div>

                  <div style={{ gridColumn: "span 7" }}>
                    <div
                      style={{
                        backgroundColor: "rgba(0,0,0,0.12)",
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          aspectRatio: "16 / 9",
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={sheet.img}
                          width={1920}
                          height={1200}
                          alt={sheet.alt}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "16px",
                          color: sheet.ink,
                        }}
                      >
                        {sheet.caption}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          SIGNATURE MOTION · Index with preview (Hover/Select Slip Register)
          ================================================================ */}
      <section
        style={{
          paddingTop: "88px",
          paddingBottom: "88px",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="iter1-container">
          <div className="grid-12" data-reveal style={{ alignItems: "center" }}>
            <div style={{ gridColumn: "span 7" }}>
              <h2
                style={{
                  fontSize: "clamp(34px, 4.4vw, 54px)",
                  marginBottom: "24px",
                }}
              >
                SCHLAGWORT REGISTER WITH CARD PREVIEW.
              </h2>

              <div
                data-ui="index-preview-list"
                style={{ display: "grid", gap: "10px" }}
              >
                {ARCHIVE_INDEX_PREVIEW.map((row, idx) => {
                  const active = hoveredArchive === idx;
                  return (
                    <button
                      key={row.address}
                      type="button"
                      onMouseEnter={() => setHoveredArchive(idx)}
                      onClick={() => setHoveredArchive(idx)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "16px",
                        padding: "18px 22px",
                        backgroundColor: active ? "#2a1d17" : "var(--bg)",
                        color: active ? "#e5e1d8" : "#2a1d17",
                        border: 0,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background-color 180ms ease",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "20px",
                            color: active ? "#a8d09e" : "var(--accent)",
                            marginRight: "12px",
                          }}
                        >
                          {row.address}
                        </strong>
                        <strong style={{ fontSize: "19px" }}>{row.title}</strong>
                        <p
                          style={{
                            margin: "4px 0 0 0",
                            fontSize: "19px",
                            color: active ? "#dad5ca" : "#4a3b32",
                            maxWidth: "56ch",
                          }}
                        >
                          {row.note}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "19px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        INSPECT →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ gridColumn: "span 5" }}>
              <div
                style={{
                  backgroundColor: "var(--bg)",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={ARCHIVE_INDEX_PREVIEW[hoveredArchive].img}
                    width={1920}
                    height={1440}
                    alt={ARCHIVE_INDEX_PREVIEW[hoveredArchive].alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <strong
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "20px",
                      color: "var(--accent)",
                    }}
                  >
                    SLIP {ARCHIVE_INDEX_PREVIEW[hoveredArchive].address}
                  </strong>
                  <span style={{ fontSize: "16px", color: "#4a3b32" }}>
                    {ARCHIVE_INDEX_PREVIEW[hoveredArchive].title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 · PRICING: The ticket (Admission Pass with Stub)
          ================================================================ */}
      <section
        id="admission-ticket"
        style={{ paddingTop: "104px", paddingBottom: "104px" }}
      >
        <div className="iter1-container">
          <div
            data-reveal
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>
                ONE PERMANENT DRAWER PASS. NO RENT.
              </h2>
              <p
                style={{
                  margin: "10px 0 0 0",
                  fontSize: "19px",
                  color: "#4a3b32",
                  maxWidth: "56ch",
                }}
              >
                Your second brain should never hold your notes hostage behind a
                monthly subscription.
              </p>
            </div>

            <div
              data-ui="ticket-toggle"
              style={{ display: "inline-flex", gap: "8px" }}
            >
              <button
                type="button"
                onClick={() => setPlanChoice("cabinet")}
                style={{
                  padding: "10px 18px",
                  backgroundColor:
                    planChoice === "cabinet" ? "var(--accent)" : "var(--surface)",
                  color: planChoice === "cabinet" ? "#ffffff" : "var(--ink)",
                  border: 0,
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: "19px",
                }}
              >
                PERMANENT CABINET ($68)
              </button>
              <button
                type="button"
                onClick={() => setPlanChoice("starter")}
                style={{
                  padding: "10px 18px",
                  backgroundColor:
                    planChoice === "starter" ? "var(--accent)" : "var(--surface)",
                  color: planChoice === "starter" ? "#ffffff" : "var(--ink)",
                  border: 0,
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: "19px",
                }}
              >
                STARTER DRAWER ($0)
              </button>
            </div>
          </div>

          {/* Horizontal Admission Ticket (7fr / 3fr with semi-circular notches & dot perforation) */}
          <div
            data-reveal
            className="grid-12"
            style={{
              position: "relative",
              backgroundColor: "var(--surface)",
              color: "#2a1d17",
              gap: 0,
              overflow: "hidden",
            }}
          >
            {/* Left 8 cols Ticket Body */}
            <div
              style={{
                gridColumn: "span 8",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "34px",
                    marginBottom: "14px",
                  }}
                >
                  {planChoice === "cabinet"
                    ? "OWN THE FULL CABINET FOREVER."
                    : "FIRST 500 PERMANENT SLIPS FREE."}
                </h3>
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "19px",
                    color: "#4a3b32",
                    maxWidth: "56ch",
                  }}
                >
                  {planChoice === "cabinet"
                    ? "Includes unlimited permanent slips, Folgezettel spine visualizer, LaTeX & citation engine, Manuscript Desk export, and five full years of native desktop updates."
                    : "Full local Markdown storage in ~/Kasten/, daily Flüchtige Notizen inbox, and Folgezettel addressing for your first 500 permanent slips with no time limit."}
                </p>
                <div style={{ fontSize: "16px", color: "#4a3b32" }}>
                  {planChoice === "cabinet"
                    ? "Kasten Archive Pass · Unlimited slips · macOS, Linux, Windows"
                    : "Kasten Starter Pass · 500 slips · macOS, Linux, Windows"}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "16px",
                  paddingTop: "12px",
                }}
              >
                <div>
                  <strong style={{ fontSize: "19px", display: "block" }}>
                    Storage Format
                  </strong>
                  <span style={{ fontSize: "16px", color: "#4a3b32" }}>
                    Plain UTF-8 .md + YAML
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: "19px", display: "block" }}>
                    Link Graph Speed
                  </strong>
                  <span style={{ fontSize: "16px", color: "#4a3b32" }}>
                    0.8 ms at 90,000 slips
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: "19px", display: "block" }}>
                    License Terms
                  </strong>
                  <span style={{ fontSize: "16px", color: "#4a3b32" }}>
                    {planChoice === "cabinet"
                      ? "One-time purchase · 3 machines"
                      : "Free forever · Offline first"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 cols Perforated Stub */}
            <div
              style={{
                gridColumn: "span 4",
                backgroundColor: "#d8c8b2",
                padding: "40px 32px",
                borderLeft: "6px dotted var(--bg)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              {/* Top & Bottom Half-Round 28px Notches */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "-17px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg)",
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-14px",
                  left: "-17px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg)",
                }}
              />

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "54px",
                    lineHeight: 0.9,
                    color: "var(--ink)",
                  }}
                >
                  {planChoice === "cabinet" ? "$68" : "$0"}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#4a3b32",
                    marginTop: "8px",
                  }}
                >
                  {planChoice === "cabinet"
                    ? "One-time license · Optional E2E relay $2/mo"
                    : "No credit card · Upgrade any time"}
                </div>
              </div>

              <a
                href="#admission-ticket"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 20px",
                  backgroundColor: "var(--accent)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  letterSpacing: "0.02em",
                }}
              >
                {planChoice === "cabinet"
                  ? "ISSUE PERMANENT PASS"
                  : "GET STARTER DRAWER"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 · FAQ: Answers as reading text (Two-column continuous prose)
          ================================================================ */}
      <section
        style={{
          paddingTop: "96px",
          paddingBottom: "96px",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="iter1-container">
          <div className="grid-12" data-reveal>
            {/* Columns 1–4: Heading */}
            <div style={{ gridColumn: "span 4" }}>
              <h2 style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>
                QUESTIONS ON THE SLIP-BOX.
              </h2>
              <p
                style={{
                  marginTop: "14px",
                  fontSize: "19px",
                  color: "#4a3b32",
                  maxWidth: "48ch",
                }}
              >
                Read continuously like an archival monograph.
              </p>
            </div>

            {/* Columns 5–12: Two-column continuous text with bold run-in questions */}
            <div
              style={{
                gridColumn: "span 8",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "32px",
                fontSize: "19px",
                lineHeight: 1.5,
              }}
            >
              <div>
                <p style={{ marginTop: 0, marginBottom: "22px", maxWidth: "58ch" }}>
                  <strong>Why does Kasten cap every card at 240 words?</strong>{" "}
                  Physical A6 index cards forced Niklas Luhmann to separate one
                  observation from the next. When a digital page stretches
                  infinitely downward, notes turn into essays that cannot be
                  re-ordered or linked at the sentence level. Keeping each slip
                  under 240 words guarantees that every link points to a single,
                  sharp claim.
                </p>
                <p style={{ marginTop: 0, marginBottom: 0, maxWidth: "58ch" }}>
                  <strong>
                    How is a Folgezettel address different from tags or folders?
                  </strong>{" "}
                  Tags group notes by broad topic after the fact, returning
                  hundreds of flat matches once your archive grows past a
                  thousand entries. A Folgezettel coordinate such as 21/3a1
                  places a slip directly behind the exact thought it answers or
                  contradicts, preserving the narrative spine of an argument
                  across years.
                </p>
              </div>
              <div>
                <p style={{ marginTop: 0, marginBottom: "22px", maxWidth: "58ch" }}>
                  <strong>
                    What happens if I stop using the Kasten application?
                  </strong>{" "}
                  Nothing is locked inside a database. Your entire Hauptkasten
                  is a directory of plain UTF-8 Markdown files named by their
                  alphanumeric address, with standard YAML frontmatter and
                  wikilinks. Every file remains readable in any text editor on
                  earth.
                </p>
                <p style={{ marginTop: 0, marginBottom: 0, maxWidth: "58ch" }}>
                  <strong>
                    Can I import an existing Obsidian, Roam, or Notion vault?
                  </strong>{" "}
                  Yes. Kasten includes a guided Triage Importer that mounts your
                  existing Markdown folder as a read-only reference shelf so you
                  can promote worthwhile notes into your permanent slip-box as
                  you cite them, rather than dumping thousands of unexamined
                  clips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 · FOOTER: Name first, places under it
          ================================================================ */}
      <footer
        style={{
          paddingTop: "64px",
          paddingBottom: "84px",
          backgroundColor: "#2a1d17",
          color: "#e5e1d8",
          overflow: "hidden",
        }}
      >
        <div className="iter1-container">
          {/* Oversized wordmark cropped slightly at bottom edge, never top edge */}
          <div
            style={{
              overflow: "hidden",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(68px, 16vw, 220px)",
                lineHeight: 0.84,
                color: "#e5e1d8",
                transform: "translateY(8%)",
              }}
            >
              KASTEN ARCHIV
            </div>
          </div>

          {/* 3-column row of places / archive editions */}
          <div
            className="grid-12"
            style={{
              paddingBottom: "36px",
              marginBottom: "28px",
            }}
          >
            <div style={{ gridColumn: "span 4" }}>
              <strong style={{ fontSize: "19px", color: "#a8d09e" }}>
                Bielefeld Specification
              </strong>
              <p
                style={{
                  margin: "6px 0 0 0",
                  color: "#cbbba6",
                  fontSize: "19px",
                  maxWidth: "46ch",
                }}
              >
                Modeled on Zettelkasten Collection I & II (1952–1997) · A6
                148 × 105 mm slip geometry.
              </p>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <strong style={{ fontSize: "19px", color: "#a8d09e" }}>
                Local-First File Tree
              </strong>
              <p
                style={{
                  margin: "6px 0 0 0",
                  color: "#cbbba6",
                  fontSize: "19px",
                  maxWidth: "46ch",
                }}
              >
                ~/Kasten/Hauptkasten · ~/Kasten/Literatur · ~/Kasten/Fluechtig
              </p>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <strong style={{ fontSize: "19px", color: "#a8d09e" }}>
                Releases & Documentation
              </strong>
              <p
                style={{
                  margin: "6px 0 0 0",
                  color: "#cbbba6",
                  fontSize: "19px",
                  maxWidth: "46ch",
                }}
              >
                v2.4.1 Universal Binary · Manual · Folgezettel Primer · Git CLI
                Bridge
              </p>
            </div>
          </div>

          <AssetCredits color="#cbbba6" linkColor="#e5e1d8" />
        </div>
      </footer>
    </div>
  );
}
