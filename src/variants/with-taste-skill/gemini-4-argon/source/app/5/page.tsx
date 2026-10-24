"use client";

import { useState } from "react";
import { useScrollReveal } from "@/variants/with-taste-skill/gemini-4-argon/source/components/useScrollReveal";
import { AssetCredits } from "@/variants/with-taste-skill/gemini-4-argon/source/components/AssetCredits";

const SPINE_CARDS = [
  {
    code: "21 / 3a1",
    heading: "Branching coordinates.",
    body: "When an argument contradicts an existing note, file it directly behind that note as 21/3a1. Future readers encounter the tension immediately without searching.",
    words: 168,
    links: ["21/3a", "21/3a2", "14/8b"],
  },
  {
    code: "14 / 8b",
    heading: "Curated keyword doors.",
    body: "Your Schlagwort index points to only two or three entry cards per keyword. The internal Folgezettel chain handles the rest of the navigation.",
    words: 149,
    links: ["14/8b1", "9c/2a4"],
  },
  {
    code: "9c / 2a4",
    heading: "A6 slips compile clean.",
    body: "Pull any sequence of chamfered slips onto the Manuscript Desk to export a clean Markdown, LaTeX, or DOCX draft with automatic citations.",
    words: 156,
    links: ["9c/2a3", "21/3a1"],
  },
];

export default function IterationFivePage() {
  useScrollReveal();

  const [activeSpineIdx, setActiveSpineIdx] = useState(0);
  const [dailySlips, setDailySlips] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "cabinet">(
    "cabinet"
  );
  const [openFaq, setOpenFaq] = useState<number>(0);

  const activeSpine = SPINE_CARDS[activeSpineIdx];
  const fiveYearSlips = dailySlips * 312 * 5;
  const bookEquivalents = Math.max(1, Math.round((fiveYearSlips * 175) / 70000));

  return (
    <div className="theme-iter5">
      {/* ================================================================
          SECTION 1 · HERO: The chamfered stage
          ================================================================ */}
      <header className="iter5-container" style={{ paddingTop: "24px" }}>
        {/* Minimal Header Bar outside the chamfered stage */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "20px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontWeight: 500,
              fontSize: "24px",
              letterSpacing: "-0.04em",
            }}
          >
            Kasten / Cut-Card System
          </div>

          <nav
            aria-label="Primary navigation"
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#chamfer-bento"
              style={{ color: "#232323", textDecoration: "none" }}
            >
              Architecture
            </a>
            <a
              href="#chamfer-spine"
              style={{ color: "#232323", textDecoration: "none" }}
            >
              Folgezettel
            </a>
            <a
              href="#compound-calc"
              style={{ color: "#232323", textDecoration: "none" }}
            >
              Compound Math
            </a>
            <a
              href="#chamfer-pricing"
              style={{
                color: "#232323",
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              Download v2.4 →
            </a>
          </nav>
        </div>

        {/* Full-Viewport Mint Container (#A1FFCB) with 45° Top-Left Chamfer */}
        <div
          className="chamfer-stage anim-load-1"
          style={{
            backgroundColor: "var(--accent)",
            color: "#232323",
            padding: "56px 40px",
            marginBottom: "80px",
          }}
        >
          <div className="iter5-hero-grid">
            {/* Columns 1–7: Tightly Tracked Display Headline */}
            <div>
              <h1
                className="iter5-h1"
                style={{
                  marginBottom: "24px",
                }}
              >
                One sharp card per thought.
              </h1>

              <p
                style={{
                  fontSize: "16px",
                  maxWidth: "46ch",
                  margin: "0 0 32px 0",
                }}
              >
                Just as physical library cards have their top-left corner
                chamfered so you immediately spot a mis-turned slip in the
                drawer, Kasten enforces a strict 240-word Plain Markdown format
                with branching Folgezettel coordinates.
              </p>

              <div
                className="anim-load-2"
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <a
                  href="#chamfer-pricing"
                  className="chamfer-btn"
                  style={{
                    backgroundColor: "#232323",
                    color: "#ffffff",
                    padding: "16px 28px",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  Download Kasten v2.4 →
                </a>
                <a
                  href="#chamfer-spine"
                  className="chamfer-btn"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#232323",
                    padding: "16px 24px",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  Inspect Spine Logic
                </a>
              </div>
            </div>

            {/* Columns 8–12: Crisp White Chamfered Index Card */}
            <div className="anim-load-3">
              {/* Chamfered Card Header + Body */}
              <div
                data-ui="chamfered-hero-card"
                className="chamfer-card"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#232323",
                  padding: "28px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingBottom: "14px",
                    borderBottom: "1px solid #d8d8d8",
                    marginBottom: "18px",
                  }}
                >
                  <strong style={{ fontSize: "24px" }}>
                    Slip 21 / 3a1 · Permanent
                  </strong>
                  <span style={{ color: "var(--muted)", fontSize: "16px" }}>
                    168 / 240 words
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "16px",
                    margin: "0 0 16px 0",
                    lineHeight: 1.5,
                  }}
                >
                  A notched index card reveals its orientation by touch alone.
                  In Kasten, every plain-text `.md` file carries a three-line
                  YAML header (address, parent link, and creation date) so your
                  notes stay self-orienting even outside the app.
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "16px",
                    color: "var(--muted)",
                  }}
                >
                  <span>~/Kasten/Hauptkasten/21-3a1.md</span>
                  <strong style={{ color: "#232323" }}>↗ [[14/8b]]</strong>
                </div>
              </div>

              {/* Archival Specimen Photograph */}
              <div
                className="chamfer-card"
                style={{
                  height: "240px",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/variants/with-taste-skill/gemini-4-argon/assets/the-fine-art-of-literary-mayhem-card.jpg"
                  width={1920}
                  height={1440}
                  alt="Typed library catalog card with red top-edge tint and bottom rod notch"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================
          SECTION 2 · SHOWCASE: Asymmetric chamfered bento
          ================================================================ */}
      <section
        id="chamfer-bento"
        className="iter5-container"
        style={{ paddingBottom: "88px" }}
      >
        <div
          data-reveal
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "36px",
          }}
        >
          <h2 className="iter5-h2">
            Five instruments on one stage.
          </h2>
          <p
            style={{
              margin: 0,
              color: "#232323",
              maxWidth: "42ch",
            }}
          >
            Every container on the page shares the same 45° top-left corner cut
            taken from DIN-standard library index cards.
          </p>
        </div>

        {/* Top Row: 7 cols + 5 cols */}
        <div className="iter5-bento-top">
          {/* Card 1 (7 cols): Live File-Tree & YAML Preview */}
          <div
            data-reveal
            data-ui="bento-yaml-card"
            className="chamfer-card"
            style={{
              backgroundColor: "var(--surface)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>
                Plain UTF-8 Markdown on Local Disk
              </h3>
              <p style={{ margin: 0, color: "#232323" }}>
                Your vault is an ordinary folder (`~/Kasten/`). Open any slip in
                Vim, VS Code, or TextEdit at any time.
              </p>
            </div>

            <div
              className="chamfer-card"
              style={{
                backgroundColor: "#232323",
                color: "#ffffff",
                padding: "24px",
                fontSize: "16px",
                lineHeight: 1.55,
              }}
            >
              <div style={{ color: "var(--accent)", marginBottom: "8px" }}>
                ---
                <br />
                folgezettel: &quot;21/3a1&quot;
                <br />
                parent: &quot;[[21/3a]]&quot;
                <br />
                words: 168
                <br />
                ---
              </div>
              <div>
                Retrieving only what you filed under a predictable folder name
                echoes your past assumptions back to you without surprise.
              </div>
            </div>
          </div>

            {/* Card 2 (5 cols): Archival Teleprinter Video */}
          <div
            data-reveal
            className="chamfer-card"
            style={{
              backgroundColor: "#232323",
              color: "#ffffff",
              padding: "28px 0 28px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div style={{ paddingRight: "28px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  marginBottom: "10px",
                  color: "var(--accent)",
                }}
              >
                0.8 ms Memory-Mapped Index
              </h3>
              <p style={{ margin: 0, color: "#ffffff" }}>
                Instant backlink resolution across 90,000 cards with zero
                background CPU drain.
              </p>
            </div>
            <div
              className="chamfer-card"
              style={{ height: "180px", overflow: "hidden" }}
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
          </div>
        </div>

        {/* Bottom Row: 5 cols + 4 cols + 3 cols */}
        <div className="iter5-bento-bottom">
          {[
            {
              bg: "var(--surface)",
              fg: "#232323",
              title: "240-Word Ceiling",
              body: "Hard stop at A6 card capacity so every note remains a single, reusable argument.",
              stat: "148 × 105 mm",
              spec: "DIN A6 Card",
              img: "/variants/with-taste-skill/gemini-4-argon/assets/index-card-3-by-5-inch-agr.jpg",
              alt: "1919 USDA typed index card specimen",
            },
            {
              bg: "var(--accent)",
              fg: "#232323",
              title: "24-Hour Flüchtig Tray",
              body: "Fleeting captures expire cleanly at midnight unless promoted into the permanent cabinet.",
              stat: "00:00 Triage",
              spec: "Daily Reset",
              img: null,
              alt: "",
            },
            {
              bg: "var(--surface)",
              fg: "#232323",
              title: "BibTeX Spine",
              body: "Every literature slip binds directly to your `.bib` file and exact page citation.",
              stat: "@luhmann1981",
              spec: "Page Anchor",
              img: "/variants/with-taste-skill/gemini-4-argon/assets/schlagwortkatalog.jpg",
              alt: "Open drawer of a German Schlagwortkatalog subject index",
            },
          ].map((b) => (
            <div
              key={b.title}
              data-reveal
              className="chamfer-card"
              style={{
                backgroundColor: b.bg,
                color: b.fg,
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "220px",
                gap: "16px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>
                  {b.title}
                </h3>
                <p style={{ margin: 0 }}>{b.body}</p>
              </div>
              {b.img && (
                <div
                  className="chamfer-card"
                  style={{ height: "130px", overflow: "hidden" }}
                >
                  <img
                    src={b.img}
                    width={1920}
                    height={1440}
                    alt={b.alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <strong style={{ fontSize: "24px", letterSpacing: "-0.03em" }}>
                  {b.stat}
                </strong>
                <span style={{ color: "var(--muted)" }}>{b.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          SECTION 3 · FEATURES: Sticky chamfered card stack
          ================================================================ */}
      <section
        id="chamfer-spine"
        style={{
          backgroundColor: "var(--surface)",
          padding: "88px 0",
        }}
      >
        <div className="iter5-container">
          <div className="iter5-feature-split" data-reveal>
            {/* Left Column: Selector Stack */}
            <div>
              <h2 className="iter5-h2" style={{ marginBottom: "16px" }}>
                Step through the chamfered spine.
              </h2>
              <p style={{ margin: "0 0 28px 0", color: "#232323" }}>
                Select a slip in the chain to see how Kasten links arguments
                across drawers without folders.
              </p>

              <div
                data-ui="chamfer-spine-selector"
                style={{ display: "grid", gap: "12px" }}
              >
                {SPINE_CARDS.map((sc, idx) => {
                  const active = idx === activeSpineIdx;
                  return (
                    <button
                      key={sc.code}
                      type="button"
                      onClick={() => setActiveSpineIdx(idx)}
                      className="chamfer-btn"
                      style={{
                        padding: "18px 24px",
                        backgroundColor: active ? "#232323" : "#ffffff",
                        color: active ? "#ffffff" : "#232323",
                        border: 0,
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <strong style={{ fontSize: "16px" }}>
                        {sc.code} · {sc.heading}
                      </strong>
                      <span
                        style={{
                          color: active ? "var(--accent)" : "var(--muted)",
                        }}
                      >
                        {sc.words}w
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Chamfered Card Detail */}
            <div>
              <div
                data-ui="chamfer-active-card"
                className="chamfer-stage"
                style={{
                  backgroundColor: "#ffffff",
                  padding: "40px",
                  minHeight: "340px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "24px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "24px",
                      marginBottom: "16px",
                    }}
                  >
                    {activeSpine.code} · {activeSpine.heading}
                  </h3>
                  <p style={{ fontSize: "16px", margin: 0, lineHeight: 1.55 }}>
                    {activeSpine.body}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "20px",
                    borderTop: "1px solid #e0e0e0",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {activeSpine.links.map((lk) => (
                      <span
                        key={lk}
                        className="chamfer-btn"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "#232323",
                          padding: "6px 14px",
                          fontWeight: 500,
                          fontSize: "16px",
                        }}
                      >
                        ↗ [[{lk}]]
                      </span>
                    ))}
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: "16px" }}>
                    {activeSpine.words} / 240 words
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 · HOW IT WORKS: Chamfered ribbon chevrons
          ================================================================ */}
      <section className="iter5-container" style={{ padding: "88px 28px" }}>
        <h2
          data-reveal
          className="iter5-h2"
          style={{
            marginBottom: "36px",
          }}
        >
          From jotting to ordered chain.
        </h2>

        <div className="iter5-bento-bottom">
          {[
            {
              step: "Stage I · Capture",
              title: "Drop into Flüchtig",
              desc: "Capture fleeting thoughts in 15 seconds with a global hotkey. Every note carries a 24-hour expiration clock.",
            },
            {
              step: "Stage II · Distill",
              title: "Rewrite on A6 Slip",
              desc: "Before midnight, rewrite the surviving idea in self-contained prose under 240 words and attach its source.",
            },
            {
              step: "Stage III · Thread",
              title: "Lock into Hauptkasten",
              desc: "Assign its Folgezettel address behind the card it extends or challenges, building an evergreen argument tree.",
            },
          ].map((st, i) => (
            <div
              key={st.step}
              data-reveal
              className="chamfer-card"
              style={{
                backgroundColor: i === 1 ? "var(--accent)" : "var(--surface)",
                color: "#232323",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <h3 style={{ fontSize: "24px" }}>{st.title}</h3>
              <p style={{ margin: 0 }}>{st.desc}</p>
              <strong style={{ fontSize: "16px", color: "var(--muted)" }}>
                {st.step}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          SECTION 5 · STATS: Interactive Slip-Box Compounding Calculator
          ================================================================ */}
      <section
        id="compound-calc"
        style={{
          backgroundColor: "#232323",
          color: "#ffffff",
          padding: "88px 0",
        }}
      >
        <div className="iter5-container">
          <div className="iter5-calc-grid" data-reveal>
            {/* Left Column: Interactive Slider */}
            <div>
              <h2
                className="iter5-h2"
                style={{
                  marginBottom: "16px",
                  color: "#ffffff",
                }}
              >
                Daily slips compound into books.
              </h2>
              <p style={{ margin: "0 0 28px 0", color: "#ffffff" }}>
                Niklas Luhmann wrote 6 permanent slips a day, publishing 70 books
                and nearly 400 scholarly articles from his Bielefeld cabinet.
                Adjust your daily pace below:
              </p>

              <div
                data-ui="compound-slider-box"
                className="chamfer-card"
                style={{
                  backgroundColor: "#2f2f2f",
                  padding: "28px",
                }}
              >
                <label
                  htmlFor="daily-slips-range"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                    fontWeight: 500,
                  }}
                >
                  <span>Permanent slips filed per day</span>
                  <strong
                    style={{ color: "var(--accent)", fontSize: "24px" }}
                  >
                    {dailySlips} slips / day
                  </strong>
                </label>
                <input
                  id="daily-slips-range"
                  type="range"
                  min={1}
                  max={10}
                  value={dailySlips}
                  onChange={(e) => setDailySlips(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "#a1ffcb",
                    cursor: "pointer",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "16px",
                    color: "#d4d4d4",
                    marginTop: "8px",
                  }}
                >
                  <span>1 slip/day (Casual)</span>
                  <span>6 slips/day (Luhmann)</span>
                  <span>10 slips/day (Lab)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Compounding Output on Mint Stage */}
            <div>
              <div
                data-ui="compound-output-stage"
                className="chamfer-stage"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#232323",
                  padding: "40px",
                }}
              >
                <div
                  className="iter5-figure"
                  style={{
                    fontWeight: 500,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.88,
                    fontVariantNumeric: "tabular-nums",
                    marginBottom: "16px",
                  }}
                >
                  {fiveYearSlips.toLocaleString()}
                </div>
                <p style={{ fontSize: "16px", margin: 0 }}>
                  Five-year permanent slip archive: interconnected A6 Markdown
                  cards on local disk, equivalent to{" "}
                  <strong>
                    {bookEquivalents} full-length scholarly monographs
                  </strong>{" "}
                  ready for assembly on the Manuscript Desk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 · PRICING: Interactive Edition Selector + Single Stage
          ================================================================ */}
      <section
        id="chamfer-pricing"
        className="iter5-container"
        style={{ padding: "88px 28px" }}
      >
        <div className="iter5-pricing-grid" data-reveal>
          {/* Columns 1–5: Stacked Chamfered Edition Selector Buttons */}
          <div>
            <h2 className="iter5-h2" style={{ marginBottom: "16px" }}>
              Two honest editions.
            </h2>
            <p style={{ margin: "0 0 28px 0", color: "#232323" }}>
              Select an edition below to inspect its capabilities on the
              chamfered stage.
            </p>

            <div
              data-ui="edition-selector-tabs"
              style={{ display: "grid", gap: "12px" }}
            >
              <button
                type="button"
                onClick={() => setSelectedPlan("cabinet")}
                className="chamfer-card"
                style={{
                  padding: "24px",
                  backgroundColor:
                    selectedPlan === "cabinet" ? "#232323" : "var(--surface)",
                  color: selectedPlan === "cabinet" ? "#ffffff" : "#232323",
                  border: 0,
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong style={{ fontSize: "24px", display: "block" }}>
                    Permanent Cabinet
                  </strong>
                  <span
                    style={{
                      fontSize: "16px",
                      color:
                        selectedPlan === "cabinet"
                          ? "var(--accent)"
                          : "var(--muted)",
                    }}
                  >
                    One-time lifetime key · Unlimited slips
                  </span>
                </div>
                <strong style={{ fontSize: "24px" }}>$68</strong>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan("starter")}
                className="chamfer-card"
                style={{
                  padding: "24px",
                  backgroundColor:
                    selectedPlan === "starter" ? "#232323" : "var(--surface)",
                  color: selectedPlan === "starter" ? "#ffffff" : "#232323",
                  border: 0,
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong style={{ fontSize: "24px", display: "block" }}>
                    Starter Drawer
                  </strong>
                  <span
                    style={{
                      fontSize: "16px",
                      color:
                        selectedPlan === "starter"
                          ? "var(--accent)"
                          : "var(--muted)",
                    }}
                  >
                    Free forever · Up to 500 permanent slips
                  </span>
                </div>
                <strong style={{ fontSize: "24px" }}>$0</strong>
              </button>
            </div>
          </div>

          {/* Columns 6–12: Single Large Chamfered Pricing Stage */}
          <div>
            <div
              data-ui="pricing-stage-card"
              className="chamfer-stage"
              style={{
                backgroundColor:
                  selectedPlan === "cabinet"
                    ? "var(--accent)"
                    : "var(--surface)",
                color: "#232323",
                padding: "40px",
              }}
            >
              <div
                className="iter5-figure"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.88,
                  marginBottom: "18px",
                }}
              >
                {selectedPlan === "cabinet" ? "$68" : "$0"}
              </div>

              <p style={{ fontSize: "16px", margin: "0 0 24px 0" }}>
                {selectedPlan === "cabinet"
                  ? "Permanent Cabinet Edition: pay once, own the native binary forever. Includes unlimited Hauptkasten drawers, BibTeX Literaturkasten integration, and the Manuscript Desk compiler."
                  : "Starter Drawer Edition: full local plain-text Markdown storage in ~/Kasten/ for your first 500 permanent slips, with no account or credit card required."}
              </p>

              <ul
                style={{
                  margin: "0 0 32px 0",
                  paddingLeft: "20px",
                  display: "grid",
                  gap: "8px",
                }}
              >
                {selectedPlan === "cabinet" ? (
                  <>
                    <li>Unlimited permanent slips (tested to 90,000+ cards)</li>
                    <li>5 years of native macOS, Linux, and Windows updates</li>
                    <li>
                      Optional $2/mo encrypted end-to-end mobile relay
                    </li>
                  </>
                ) : (
                  <>
                    <li>Up to 500 permanent slips in ~/Kasten/</li>
                    <li>24-hour Flüchtige Notizen inbox triage</li>
                    <li>100% offline UTF-8 `.md` files</li>
                  </>
                )}
              </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#chamfer-pricing"
                className="chamfer-btn"
                style={{
                  display: "inline-block",
                  backgroundColor: "#232323",
                  color: "#ffffff",
                  padding: "16px 32px",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {selectedPlan === "cabinet"
                  ? "Purchase Permanent Cabinet ($68) →"
                  : "Download Starter Drawer ($0) →"}
              </a>
              <span style={{ fontWeight: 500 }}>
                SHA-256 Verified · macOS / Linux / Win
              </span>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 · FAQ: Chamfered accordion rows
          ================================================================ */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          padding: "88px 0",
        }}
      >
        <div className="iter5-container iter5-faq-grid" data-reveal>
          <div>
            <h2 className="iter5-h2">
              Questions &amp; file specs.
            </h2>
          </div>

          <div
            data-ui="chamfer-faq-list"
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {[
              {
                q: "Why does every container have a 45° top-left cut?",
                a: "In physical card catalogs, a single chamfered corner lets an archivist tell at a glance if any card in a 1,000-slip drawer has been inserted upside-down or backwards.",
              },
              {
                q: "What happens if I edit a note outside Kasten?",
                a: "Kasten watches ~/Kasten/ via native OS file-system events. Edit any `.md` file in Vim or VS Code and the Folgezettel tree updates in under a millisecond.",
              },
              {
                q: "Can I use Git to version-control my slip-box?",
                a: "Yes. Because every slip is a small, atomic UTF-8 file under 240 words, Git diffs are clean and human-readable.",
              },
            ].map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="chamfer-card"
                  style={{
                    backgroundColor: open ? "var(--accent)" : "#ffffff",
                    color: "#232323",
                    padding: "24px 28px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: 0,
                      padding: 0,
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#232323",
                    }}
                  >
                    <strong>{item.q}</strong>
                    <span>{open ? "−" : "+"}</span>
                  </button>
                  {open && (
                    <p style={{ margin: "12px 0 0 0", color: "#232323" }}>
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 · FOOTER: Chamfered dark slab (#232323)
          ================================================================ */}
      <footer className="iter5-container" style={{ padding: "48px 28px" }}>
        <div
          className="chamfer-stage"
          style={{
            backgroundColor: "#232323",
            color: "#ffffff",
            padding: "48px 0 48px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: 500,
                letterSpacing: "-0.05em",
                color: "var(--accent)",
              }}
            >
              Kasten
            </div>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <a
                href="#chamfer-bento"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                Architecture
              </a>
              <a
                href="#chamfer-spine"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                Folgezettel
              </a>
              <a
                href="#chamfer-pricing"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                Download v2.4
              </a>
            </div>
          </div>

          <div style={{ paddingRight: "40px" }}>
            <AssetCredits color="#bdbdbd" linkColor="#a1ffcb" />
          </div>
        </div>
      </footer>
    </div>
  );
}
