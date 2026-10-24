"use client";

import { useState } from "react";
import { useScrollReveal } from "@/variants/with-taste-skill/gemini-4-argon/source/components/useScrollReveal";
import { AssetCredits } from "@/variants/with-taste-skill/gemini-4-argon/source/components/AssetCredits";

const DRAWER_CLUSTERS = [
  {
    id: "21",
    label: "Drawer 21 · Systems & Contingency",
    slips: [
      {
        code: "21/3a",
        title: "Dialogue needs double contingency",
        words: 178,
        links: ["21/3a1", "14/8b", "9c/2a"],
        excerpt:
          "Dialogue only begins when neither participant can predict the other's next move with certainty; the slip-box acts as that unpredictable interlocutor.",
      },
      {
        code: "21/3a1",
        title: "Topical folders kill surprise",
        words: 164,
        links: ["21/3a", "21/3a2", "33/1a"],
        excerpt:
          "Retrieving only what you filed under a predictable heading echoes your past assumptions back to you without friction.",
      },
      {
        code: "21/3a2",
        title: "Branching addresses keep friction",
        words: 212,
        links: ["21/3a1", "7b/4a"],
        excerpt:
          "Inserting card 21/3a2 directly behind 21/3a1 keeps two competing dates of thought side by side in the same physical sequence.",
      },
    ],
  },
  {
    id: "14",
    label: "Drawer 14 · Schlagwort Register",
    slips: [
      {
        code: "14/8b",
        title: "Keywords point to chains",
        words: 152,
        links: ["14/8b1", "21/3a"],
        excerpt:
          "An index entry should list at most three entry-point addresses; from those doors, the internal Folgezettel links guide the reader.",
      },
      {
        code: "14/8b1",
        title: "Hub slips bridge drawers",
        words: 196,
        links: ["14/8b", "9c/2a4"],
        excerpt:
          "When a sequence in Drawer 14 begins colliding with Drawer 9c, create a bridge card that lists the four pivotal intersections.",
      },
    ],
  },
  {
    id: "9c",
    label: "Drawer 9c · Manuscript Assembly",
    slips: [
      {
        code: "9c/2a4",
        title: "A6 cards become chapters",
        words: 142,
        links: ["9c/2a3", "21/3a1"],
        excerpt:
          "Because every card is already written in publishable sentences under 240 words, pulling ten cards onto the desk produces a draft chapter.",
      },
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "How does Kasten store links in plain Markdown?",
    a: "Each card in ~/Kasten/ uses standard [[21/3a1]] wikilinks and a three-line YAML frontmatter block. Kasten rebuilds its in-memory index from raw files in 18 milliseconds.",
  },
  {
    q: "What happens when a branch goes four levels deep?",
    a: "Alternate numerals and letters without limit: 21 → 21a → 21a1 → 21a1a. Kasten indents the active branch while keeping sibling arguments one keystroke away.",
  },
  {
    q: "Can I edit slips in Neovim, Emacs, or VS Code?",
    a: "Yes. Kasten watches ~/Kasten/ via native filesystem events. Save any file externally and the board updates its link counters within a single frame.",
  },
  {
    q: "Does the $68 Permanent Cabinet license ever expire?",
    a: "Never. Your license key unlocks the native binary on macOS, Linux, and Windows forever, and your notes always remain ordinary UTF-8 Markdown files.",
  },
];

export default function IterationThreePage() {
  useScrollReveal();

  const [clusterIdx, setClusterIdx] = useState(0);
  const [slipIdx, setSlipIdx] = useState(0);
  const [faqIdx, setFaqIdx] = useState(0);

  const activeCluster = DRAWER_CLUSTERS[clusterIdx];
  const activeSlip =
    activeCluster.slips[slipIdx] || activeCluster.slips[0];

  return (
    <div className="theme-iter3">
      <div className="iter3-board">
        {/* ================================================================
            SECTION 1 · HERO: Name band and rails (Dense tiles board)
            ================================================================ */}
        <header style={{ marginBottom: "8px" }}>
          {/* Full-width top band tile holding oversized wordmark */}
          <div
            className="anim-load-1"
            style={{
              backgroundColor: "var(--surface)",
              padding: "20px 28px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: "clamp(64px, 7.6vw, 96px)",
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 0.88,
                color: "#ffffff",
              }}
            >
              KASTEN
            </div>
            <div style={{ color: "var(--accent)", fontSize: "16px", fontWeight: 500 }}>
              BIELEFELD SLIP-BOX ENGINE · v2.4 LOCAL ARCHIVE
            </div>
          </div>

          {/* 4-column row of navigation link tiles */}
          <nav
            aria-label="Primary navigation"
            className="iter3-nav-grid anim-load-2"
            style={{ marginBottom: "8px" }}
          >
            {[
              { href: "#live-board-demo", label: "Drawer Inspector", sub: "90k graph" },
              { href: "#macro-board", label: "Close-Up Tools", sub: "300% UI" },
              { href: "#four-fields", label: "Card Progression", sub: "Four stages" },
              { href: "#table-pricing", label: "Permanent License", sub: "$68 key" },
            ].map((nav) => (
              <a
                key={nav.href}
                href={nav.href}
                style={{
                  backgroundColor: "var(--surface)",
                  color: "#ffffff",
                  padding: "14px 20px",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "8px",
                }}
              >
                <strong style={{ fontSize: "16px" }}>{nav.label}</strong>
                <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                  {nav.sub}
                </span>
              </a>
            ))}
          </nav>

          {/* Lower 3-column unequal board: Left rail (3fr) + Centre column (5fr) + Right stack (4fr) */}
          <div className="iter3-hero-board anim-load-3">
            {/* Left Rail */}
            <div
              className="iter3-hide-mobile"
              style={{ display: "grid", gap: "8px" }}
            >
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  overflow: "hidden",
                  height: "190px",
                }}
              >
                <img
                  src="/variants/with-taste-skill/gemini-4-argon/assets/card-catalog-at-the-indiana-state-library-2.jpg"
                  width={1920}
                  height={2560}
                  alt="Brass drawer plates 808 and 809 on a dark wooden card catalog"
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
                  backgroundColor: "var(--surface)",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <strong style={{ color: "var(--accent)", fontSize: "16px" }}>
                  ARCHIVE SPECIFICATION
                </strong>
                <div style={{ fontSize: "16px", color: "#ffffff" }}>
                  Card ceiling: <strong>240 words (A6)</strong>
                </div>
                <div style={{ fontSize: "16px", color: "#ffffff" }}>
                  Addressing: <strong>Folgezettel spine</strong>
                </div>
                <div style={{ fontSize: "16px", color: "#ffffff" }}>
                  Disk format: <strong>Plain UTF-8 .md</strong>
                </div>
                <div style={{ fontSize: "16px", color: "#ffffff" }}>
                  Graph latency: <strong>0.8 ms local</strong>
                </div>
              </div>
            </div>

            {/* Wide Centre Column: Statement Tile on Top + Hero Photograph Below */}
            <div style={{ display: "grid", gap: "8px" }}>
              <div
                style={{
                  backgroundColor: "var(--surface-alt)",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "14px",
                }}
              >
                <h1
                  style={{
                    fontSize: "40px",
                    lineHeight: 0.96,
                    color: "#ffffff",
                  }}
                >
                  Plain-text slip-box on disk.
                </h1>
                <p style={{ margin: 0, color: "#ffffff", fontSize: "16px" }}>
                  Kasten replaces sprawling cloud documents with atomic A6
                  Markdown slips filed along an alphanumeric Folgezettel spine
                  right on your local drive.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "var(--surface)",
                  overflow: "hidden",
                  height: "210px",
                }}
              >
                <img
                  src="/variants/with-taste-skill/gemini-4-argon/assets/cardfile-at-indiana-state-library-35426.jpg"
                  width={1920}
                  height={2654}
                  alt="Grand dark mahogany sixty-drawer library card catalog illuminated by warm brass lamps"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* Right Rail: Vertical Stack of 5 Filled Colour Tiles */}
            <div style={{ display: "grid", gap: "8px" }}>
              <a
                href="#table-pricing"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-ink)",
                  padding: "20px 22px",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "22px",
                }}
              >
                <span>Download Kasten v2.4</span>
                <span>→</span>
              </a>
              <div
                style={{
                  backgroundColor: "#1d1914",
                  padding: "16px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--muted)" }}>I. Flüchtige Notizen</span>
                <strong style={{ color: "#ffffff" }}>24h Inbox Triage</strong>
              </div>
              <div
                style={{
                  backgroundColor: "#241f18",
                  padding: "16px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--muted)" }}>II. Literaturkasten</span>
                <strong style={{ color: "#ffffff" }}>BibTeX + Page Cite</strong>
              </div>
              <div
                style={{
                  backgroundColor: "#2b241c",
                  padding: "16px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--muted)" }}>III. Hauptkasten</span>
                <strong style={{ color: "#ffffff" }}>Branching 21/3a1</strong>
              </div>
              <div
                style={{
                  backgroundColor: "#332a1f",
                  padding: "16px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--muted)" }}>IV. Schlagwort Index</span>
                <strong style={{ color: "var(--accent)" }}>Entry Doors</strong>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
            SIGNATURE MOTION · Edge-to-edge Marquee Strip Tile
            ================================================================ */}
        <div
          data-ui="address-ticker"
          style={{
            backgroundColor: "var(--surface)",
            padding: "14px 0",
            marginBottom: "8px",
            overflow: "hidden",
          }}
        >
          <div className="iter3-marquee-track">
            {[1, 2].map((pass) => (
              <div
                key={pass}
                style={{
                  display: "flex",
                  gap: "44px",
                  paddingRight: "44px",
                  whiteSpace: "nowrap",
                  fontSize: "16px",
                  color: "#ffffff",
                }}
              >
                <span>
                  <strong style={{ color: "var(--accent)" }}>21/3a1</strong> · Why
                  folders destroy surprise
                </span>
                <span>
                  <strong style={{ color: "var(--accent)" }}>14/8b</strong> ·
                  Keywords point to chains, not buckets
                </span>
                <span>
                  <strong style={{ color: "var(--accent)" }}>9c/2a4</strong> · 240
                  words per A6 slip
                </span>
                <span>
                  <strong style={{ color: "var(--accent)" }}>33/1a</strong> ·
                  Sub-millisecond local graph traversal
                </span>
                <span>
                  <strong style={{ color: "var(--accent)" }}>1a/1</strong> · Plain
                  UTF-8 Markdown inside ~/Kasten/
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================
            SECTION 2 · SHOWCASE: Live demo with controls (62% / 38% split)
            ================================================================ */}
        <section id="live-board-demo" style={{ marginBottom: "8px" }}>
          <div data-reveal className="iter3-showcase-split">
            {/* Left 62% Tile: Live Interactive Slip-Box Inspector */}
            <div
              data-ui="live-drawer-stage"
              style={{
                backgroundColor: "var(--surface)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <strong
                  style={{
                    color: "var(--accent)",
                    fontSize: "16px",
                  }}
                >
                  ACTIVE DRAWER: {activeCluster.label.toUpperCase()}
                </strong>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {activeCluster.slips.map((s, idx) => (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => setSlipIdx(idx)}
                      style={{
                        padding: "6px 14px",
                        backgroundColor:
                          slipIdx === idx ? "var(--accent)" : "#26211b",
                        color: slipIdx === idx ? "#0c0a08" : "#ffffff",
                        border: 0,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {s.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Card Surface */}
              <div
                style={{
                  backgroundColor: "#221e19",
                  padding: "24px",
                  border: "1px solid #383129",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "14px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "22px",
                      color: "var(--accent)",
                    }}
                  >
                    Slip {activeSlip.code}
                  </strong>
                  <span style={{ color: "var(--muted)", fontSize: "14px" }}>
                    {activeSlip.words} / 240 words · ~/Kasten/
                    {activeSlip.code.replace("/", "-")}.md
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "22px",
                    marginBottom: "12px",
                    color: "#ffffff",
                  }}
                >
                  {activeSlip.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "16px",
                    color: "#ffffff",
                    lineHeight: 1.55,
                  }}
                >
                  {activeSlip.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                    Connected addresses:
                  </span>
                  {activeSlip.links.map((lk) => (
                    <span
                      key={lk}
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "#14110e",
                        color: "var(--accent)",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      ↗ [[{lk}]]
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--muted)",
                  fontSize: "14px",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span>Folgezettel Spine Depth: 4 levels</span>
                <span>Graph Index Rebuilt in 0.8 ms</span>
              </div>
            </div>

            {/* Right 38% Tile: Heading, Copy & Stacked Drawer Controls */}
            <div
              style={{
                backgroundColor: "var(--surface-alt)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "40px",
                    marginBottom: "14px",
                  }}
                >
                  Pull any drawer to trace its chain.
                </h2>
                <p style={{ margin: 0, color: "#ffffff", fontSize: "16px" }}>
                  Select a drawer below to switch the live cabinet view on the
                  left and inspect how individual A6 slips cross-reference one
                  another.
                </p>
              </div>

              <div
                data-ui="drawer-selector-controls"
                style={{ display: "grid", gap: "8px" }}
              >
                {DRAWER_CLUSTERS.map((cl, idx) => {
                  const active = idx === clusterIdx;
                  return (
                    <button
                      key={cl.id}
                      type="button"
                      onClick={() => {
                        setClusterIdx(idx);
                        setSlipIdx(0);
                      }}
                      style={{
                        padding: "16px 18px",
                        backgroundColor: active ? "var(--accent)" : "#14110e",
                        color: active ? "#0c0a08" : "#ffffff",
                        border: 0,
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontWeight: 600,
                      }}
                    >
                      <span>{cl.label}</span>
                      <span>{cl.slips.length} slips</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 3 · FEATURES: Close-ups on a board (Macro UI details)
            ================================================================ */}
        <section id="macro-board" style={{ marginBottom: "8px" }}>
          <div
            data-reveal
            style={{
              backgroundColor: "var(--surface)",
              padding: "28px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h2 style={{ fontSize: "40px" }}>
              Fifty years of daily filing.
            </h2>
            <p style={{ margin: 0, color: "#ffffff", maxWidth: "46ch" }}>
              Every tile on the Kasten board exposes one physical instrument at
              macro scale, with no nested settings menus.
            </p>
          </div>

          <div
            data-reveal
            className="grid-12"
            style={{ gap: "8px" }}
          >
            {/* Tile 1 (Span 5): Macro Folgezettel Address Stamp */}
            <div
              data-ui="macro-address-tile"
              style={{
                gridColumn: "span 5",
                backgroundColor: "var(--surface)",
                padding: "28px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "260px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>
                  Alphanumeric Spine
                </h3>
                <p style={{ margin: 0, color: "#ffffff" }}>
                  Branch infinitely between any two existing thoughts without
                  renumbering your drawer.
                </p>
              </div>
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: 600,
                  color: "var(--accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                21/3a1b
              </div>
            </div>

            {/* Tile 2 (Span 4): Macro 240-Word Gauge */}
            <div
              data-ui="macro-word-gauge"
              style={{
                gridColumn: "span 4",
                backgroundColor: "var(--surface-alt)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "260px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>
                  240-Word A6 Cap
                </h3>
                <p style={{ margin: 0, color: "#ffffff" }}>
                  Prevents collector&apos;s dumps by enforcing the exact capacity
                  of a 148 × 105 mm paper index card.
                </p>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "22px",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  <span>184 words</span>
                  <span style={{ color: "var(--accent)" }}>56 left</span>
                </div>
                <div
                  style={{
                    height: "18px",
                    backgroundColor: "#12100d",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "76%",
                      height: "100%",
                      backgroundColor: "var(--accent)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tile 3 (Span 3): Archival Teleprinter Video Tile */}
            <div
              style={{
                gridColumn: "span 3",
                backgroundColor: "var(--surface)",
                overflow: "hidden",
                minHeight: "260px",
              }}
            >
              <video
                src="/variants/with-taste-skill/gemini-4-argon/assets/teleprinter-automatic-printing.webm"
                poster="/variants/with-taste-skill/gemini-4-argon/assets/teleprinter-automatic-printing-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Tile 4 (Span 4): Archival Photo Tile 2 */}
            <div
              style={{
                gridColumn: "span 4",
                backgroundColor: "var(--surface)",
                overflow: "hidden",
                minHeight: "250px",
              }}
            >
              <img
                src="/variants/with-taste-skill/gemini-4-argon/assets/schlagwortkatalog.jpg"
                width={1920}
                height={1624}
                alt="Open drawer of a German Schlagwortkatalog subject index"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Tile 5 (Span 8): Macro Bidirectional Link Matrix */}
            <div
              data-ui="macro-backlink-matrix"
              style={{
                gridColumn: "span 8",
                backgroundColor: "var(--surface)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "250px",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <h3 style={{ fontSize: "22px" }}>
                  Sub-Millisecond Local Link Graph
                </h3>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                  ~/Kasten/Hauptkasten · 0.8 ms traversal
                </span>
              </div>

              <div className="iter3-edge-grid">
                {[
                  { from: "21/3a1", to: "14/8b", label: "Contradicts folder taxonomy" },
                  { from: "14/8b", to: "9c/2a4", label: "Feeds chapter outline III" },
                  { from: "9c/2a4", to: "33/1a", label: "Transcludes Spinoza citation" },
                ].map((edge) => (
                  <div
                    key={edge.from}
                    style={{
                      backgroundColor: "#241f18",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--accent)",
                        fontSize: "22px",
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      {edge.from} → {edge.to}
                    </div>
                    <div style={{ fontSize: "14px", color: "#ffffff" }}>
                      {edge.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 4 · HOW IT WORKS: One card, four fields
            ================================================================ */}
        <section id="four-fields" style={{ marginBottom: "8px" }}>
          <div
            data-reveal
            style={{
              backgroundColor: "var(--surface)",
              padding: "28px",
              marginBottom: "8px",
            }}
          >
            <h2 style={{ fontSize: "40px" }}>
              One card across four stages.
            </h2>
          </div>

          <div
            data-reveal
            className="iter3-four-fields"
          >
            {[
              {
                bg: "#161310",
                stage: "Stage I · Fleeting Inbox",
                badge: "11:42 AM · Unfiled",
                code: "Flüchtig #4",
                text: "Quick hunch while reading: folders group notes by where they came from, not where they are going.",
                footer: "Expires in 12h 18m · ~/Kasten/Fluechtig",
              },
              {
                bg: "#1f1a15",
                stage: "Stage II · Source Attached",
                badge: "08:15 PM · Cited",
                code: "Lit · Luhmann 1981",
                text: "Luhmann (1981, p. 224) notes that fixed thematic categories stifle combinatorial surprise over multi-year spans.",
                footer: "BibTeX key: luhmann1981k · ~/Kasten/Lit",
              },
              {
                bg: "#28221b",
                stage: "Stage III · Folgezettel Filed",
                badge: "08:19 PM · Indexed",
                code: "Slip 21 / 3a1",
                text: "Filing a note behind 21/3a forces it into dialogue with prior arguments instead of hiding it inside a topic folder.",
                footer: "Parent: 21/3a · 38 words · ~/Kasten/Haupt",
              },
              {
                bg: "#332b20",
                stage: "Stage IV · Manuscript Draft",
                badge: "Chapter II · Transcluded",
                code: "Slip 21 / 3a1 → §2.4",
                text: "Transcluded directly into Chapter II ('Architecture of Surprise') with automatic footnote generation.",
                footer: "3 outbound · 4 inbound links",
              },
            ].map((item) => (
              <div
                key={item.stage}
                style={{
                  backgroundColor: item.bg,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <strong
                  style={{
                    fontSize: "16px",
                    color: "var(--accent)",
                  }}
                >
                  {item.stage}
                </strong>

                {/* The same card maturing across each field */}
                <div
                  data-ui={`stage-card-${item.code}`}
                  style={{
                    backgroundColor: "#0c0a08",
                    padding: "20px",
                    border: "1px solid #3c342a",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      color: "var(--muted)",
                      marginBottom: "8px",
                    }}
                  >
                    <span>{item.code}</span>
                    <span>{item.badge}</span>
                  </div>
                  <p
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "16px",
                      color: "#ffffff",
                    }}
                  >
                    {item.text}
                  </p>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--accent)",
                    }}
                  >
                    {item.footer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            SECTION 5 · STATS: Stepped figure tiles
            ================================================================ */}
        <section style={{ marginBottom: "8px" }}>
          <div
            data-reveal
            style={{
              backgroundColor: "var(--surface)",
              padding: "28px",
              marginBottom: "8px",
            }}
          >
            <h2 style={{ fontSize: "40px" }}>
              Archival scale without bloat.
            </h2>
          </div>

          <div data-reveal className="iter3-stepped-stats">
            <div
              style={{
                backgroundColor: "var(--surface)",
                padding: "28px",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: 600,
                  color: "var(--accent)",
                  lineHeight: 0.9,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                0.8 ms
              </div>
              <p style={{ margin: 0, color: "#ffffff", fontSize: "16px" }}>
                Full backlink and Folgezettel tree traversal across ninety
                thousand local Markdown slips on an M2 Air.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--surface-alt)",
                padding: "28px",
                minHeight: "230px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 0.9,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                90,000
              </div>
              <p style={{ margin: 0, color: "#ffffff", fontSize: "16px" }}>
                Tested Bielefeld cabinet card capacity in plain UTF-8 files.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--surface)",
                padding: "28px",
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 0.9,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                14 MB
              </div>
              <p style={{ margin: 0, color: "#ffffff", fontSize: "16px" }}>
                Native desktop binary size for macOS, Linux, and Windows.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 6 · PRICING: Plans as a large table (Words, no checkmarks)
            ================================================================ */}
        <section id="table-pricing" style={{ marginBottom: "8px" }}>
          <div
            data-reveal
            style={{
              backgroundColor: "var(--surface)",
              padding: "28px",
            }}
          >
            <h2
              style={{
                fontSize: "40px",
                marginBottom: "24px",
              }}
            >
              Editions in plain words.
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "16px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "14px",
                      borderBottom: "1px solid #332c24",
                      color: "var(--muted)",
                      width: "34%",
                    }}
                  >
                    Capability
                  </th>
                  <th
                    style={{
                      padding: "14px",
                      borderBottom: "1px solid #332c24",
                      width: "33%",
                    }}
                  >
                    <div style={{ fontSize: "22px", fontWeight: 600 }}>
                      Starter · $0
                    </div>
                  </th>
                  <th
                    style={{
                      padding: "14px",
                      backgroundColor: "var(--accent)",
                      color: "#0c0a08",
                      width: "33%",
                    }}
                  >
                    <div style={{ fontSize: "22px", fontWeight: 600 }}>
                      Cabinet · $68
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    cap: "Hauptkasten capacity",
                    free: "Up to 500 slips",
                    paid: "Unlimited (90,000+)",
                  },
                  {
                    cap: "Disk storage format",
                    free: "Plain UTF-8 .md",
                    paid: "Plain .md + Git bridge",
                  },
                  {
                    cap: "Daily Flüchtig inbox",
                    free: "24-hour triage timer",
                    paid: "Triage + BibTeX cite",
                  },
                  {
                    cap: "Manuscript Desk",
                    free: "Single-chain export",
                    paid: "Full chapter compiler",
                  },
                ].map((row) => (
                  <tr key={row.cap}>
                    <td
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid #2b251e",
                        fontWeight: 500,
                      }}
                    >
                      {row.cap}
                    </td>
                    <td
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid #2b251e",
                        color: "#ffffff",
                      }}
                    >
                      {row.free}
                    </td>
                    <td
                      style={{
                        padding: "14px",
                        backgroundColor: "#bf994f",
                        color: "#0c0a08",
                        borderBottom: "1px solid #a6823c",
                        fontWeight: 500,
                      }}
                    >
                      {row.paid}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: "14px", fontWeight: 500 }}>
                    Native desktop installer package for macOS, Linux, and Windows
                  </td>
                  <td style={{ padding: "14px" }}>
                    <a
                      href="#table-pricing"
                      style={{
                        display: "inline-block",
                        padding: "10px 14px",
                        backgroundColor: "#2b251e",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Get Starter ($0)
                    </a>
                  </td>
                  <td
                    style={{
                      padding: "14px",
                      backgroundColor: "var(--accent)",
                    }}
                  >
                    <a
                      href="#table-pricing"
                      style={{
                        display: "inline-block",
                        padding: "10px 14px",
                        backgroundColor: "#0c0a08",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Buy Key ($68)
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ================================================================
            SECTION 7 · FAQ: Question index, one answer
            ================================================================ */}
        <section style={{ marginBottom: "8px" }}>
          <div data-reveal className="iter3-faq-split">
            {/* Columns 1–5: Question List with 8px dot indicators */}
            <div
              style={{
                backgroundColor: "var(--surface)",
                padding: "28px",
              }}
            >
              <h2
                style={{
                  fontSize: "40px",
                  marginBottom: "20px",
                }}
              >
                Technical Questions
              </h2>

              <div
                data-ui="faq-index-list"
                style={{ display: "grid", gap: "8px" }}
              >
                {FAQ_ITEMS.map((item, idx) => {
                  const active = idx === faqIdx;
                  return (
                    <button
                      key={item.q}
                      type="button"
                      onClick={() => setFaqIdx(idx)}
                      style={{
                        padding: "14px 16px",
                        backgroundColor: active ? "#28221b" : "#14110e",
                        color: "#ffffff",
                        border: 0,
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "16px",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: active
                            ? "var(--accent)"
                            : "transparent",
                          border: "1px solid var(--accent)",
                          flexShrink: 0,
                        }}
                      />
                      <span>{item.q}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Columns 6–12: Answer Pane */}
            <div
              style={{
                backgroundColor: "var(--surface-alt)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <h3 style={{ fontSize: "22px", color: "var(--accent)" }}>
                {FAQ_ITEMS[faqIdx].q}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "22px",
                  lineHeight: 1.48,
                  color: "#ffffff",
                }}
              >
                {FAQ_ITEMS[faqIdx].a}
              </p>
              <div style={{ color: "var(--muted)", fontSize: "14px" }}>
                Verified on Kasten v2.4 · Local File Tree Specification
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 8 · FOOTER: A footer of tiles
            ================================================================ */}
        <footer>
          <div className="iter3-footer-grid" style={{ marginBottom: "8px" }}>
            <div
              style={{
                backgroundColor: "var(--surface)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <strong
                style={{
                  fontSize: "16px",
                  color: "var(--accent)",
                }}
              >
                KASTEN ARCHIVE
              </strong>
              <p style={{ margin: 0, color: "#ffffff" }}>
                The plain-text Zettelkasten board for researchers, historians,
                and long-form writers.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--surface)",
                padding: "28px",
                display: "grid",
                gap: "8px",
              }}
            >
              <strong style={{ color: "#ffffff" }}>Direct Downloads</strong>
              <a
                href="#table-pricing"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                macOS Universal (.dmg · Apple Silicon & Intel)
              </a>
              <a
                href="#table-pricing"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                Linux AppImage & .deb (x86_64 & ARM64)
              </a>
              <a
                href="#table-pricing"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                Windows 11 Native Installer (.msi)
              </a>
            </div>

            <div
              style={{
                backgroundColor: "var(--accent)",
                color: "#0c0a08",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <strong style={{ fontSize: "16px" }}>
                Start your permanent drawer today.
              </strong>
              <a
                href="#table-pricing"
                style={{
                  color: "#0c0a08",
                  fontWeight: 600,
                  textDecoration: "underline",
                  fontSize: "16px",
                }}
              >
                Download Kasten v2.4 Free →
              </a>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--surface)",
              padding: "24px 28px",
            }}
          >
            <AssetCredits color="#b8b2a8" linkColor="#c9a45a" />
          </div>
        </footer>
      </div>
    </div>
  );
}
