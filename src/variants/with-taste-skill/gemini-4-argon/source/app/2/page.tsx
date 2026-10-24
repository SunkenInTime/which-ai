"use client";

import { useState } from "react";
import { useScrollReveal } from "@/variants/with-taste-skill/gemini-4-argon/source/components/useScrollReveal";
import { AssetCredits } from "@/variants/with-taste-skill/gemini-4-argon/source/components/AssetCredits";

const FEATURE_CONTROLS = [
  {
    id: "folgezettel",
    title: "Folgezettel Branching",
    body: "When an idea takes a turn, file it at 21/3a1 instead of creating a new folder. Kasten automatically maintains the parent-child spine so you can read an entire cluster of debates from top to bottom.",
    cardCode: "21 / 3a1",
    cardParent: "21 / 3a · Double contingency in dialogue",
    cardChild: "21 / 3a2 · Surprise as structural requirement",
    cardClaim:
      "A slip-box produces independent surprise only when notes sit directly behind the sentence they challenge.",
    cardSource: "Luhmann, 1981 · Kommunikation mit Zettelkästen, p. 224",
  },
  {
    id: "atomicity",
    title: "The 240-Word A6 Frame",
    body: "Physical 148 × 105 mm cards prevented sprawling dumps. Kasten enforces the same 240-word ceiling on every permanent card so each slip remains a sharp, reusable unit of argument.",
    cardCode: "9c / 2a4",
    cardParent: "9c / 2a3 · Unit granularity in archives",
    cardChild: "9c / 2a4a · Transclusion into chapter drafts",
    cardClaim:
      "If a note requires scrolling, it hides three separate thoughts that can no longer be linked cleanly.",
    cardSource: "Bielefeld Archive Specification · Series II, Drawer 9c",
  },
  {
    id: "register",
    title: "Schlagwort Register",
    body: "Full-text search returns noise once an archive passes five thousand notes. Kasten pairs instant search with a hand-curated keyword index that points only to the head card of each Folgezettel chain.",
    cardCode: "14 / 8b",
    cardParent: "14 / 8a · Alphabetical register design",
    cardChild: "14 / 8b1 · Hub slips vs leaf slips",
    cardClaim:
      "Point each keyword to two entry addresses (14/8b and 31/2a) and let the local chains carry the argument.",
    cardSource: "Schlagwortkatalog Register · Entry #412",
  },
  {
    id: "longevity",
    title: "Plain UTF-8 Markdown",
    body: "Every slip is stored as an ordinary .md file inside ~/Kasten/ with clean YAML metadata. Read your archive with grep, track revisions in Git, and never fear a cloud shutdown.",
    cardCode: "1a / 1",
    cardParent: "1a / 0 · Founding charter of the archive",
    cardChild: "1a / 1b · Zero-dependency file format",
    cardClaim:
      "An intellectual life spans fifty years; store every card in plain UTF-8 text that any operating system can read.",
    cardSource: "~/Kasten/Hauptkasten/1a-1.md · 618 bytes",
  },
];

export default function IterationTwoPage() {
  useScrollReveal();

  const [rawInput, setRawInput] = useState(
    "Reading Spinoza's Tractatus IX Adnotatio 14: marginal notes written directly next to a passage preserve the tension of the moment, whereas summarizing an entire chapter at the end flattens out the contradictions."
  );
  const [selectedAddress, setSelectedAddress] = useState("17 / 4a1");
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [stageSelect, setStageSelect] = useState(1);

  const words = rawInput.trim().split(/\s+/).filter(Boolean).length;
  const activeFeature = FEATURE_CONTROLS[activeFeatureIdx];

  return (
    <div className="theme-iter2">
      {/* ================================================================
          SECTION 1 · HERO: Mosaic masthead, title on 42% axis
          ================================================================ */}
      <header>
        {/* Top 52% · 6-column by 2-row edge-to-edge mosaic without gutters */}
        <div className="iter2-mosaic anim-load-1">
          {/* Tile 1: Bottle Ink Brand Tile */}
          <div
            style={{
              backgroundColor: "#0d2a1c",
              color: "#f7f7f7",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <strong style={{ fontSize: "20px", letterSpacing: "-0.02em" }}>
              KASTEN
            </strong>
            <span style={{ fontSize: "16px", color: "#d5e0da" }}>
              Annual Monograph · Vol. IV
            </span>
          </div>

          {/* Tile 2: Greyscale Photograph 1 */}
          <div style={{ overflow: "hidden", backgroundColor: "#1a241f" }}>
            <img
              src="/variants/with-taste-skill/gemini-4-argon/assets/schlagwortkatalog.jpg"
              width={1920}
              height={1624}
              alt="Open drawer of a German Schlagwortkatalog card catalog"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.08)",
              }}
            />
          </div>

          {/* Tile 3: Accent Yellow Tile */}
          <div
            style={{
              backgroundColor: "#f6e016",
              color: "#0d2a1c",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <strong style={{ fontSize: "20px", lineHeight: 1.05 }}>
              240 words per A6 slip
            </strong>
            <span style={{ fontSize: "16px" }}>148 × 105 mm standard</span>
          </div>

          {/* Tile 4: Greyscale Photograph 2 (Hidden on mobile so h1 stays on first screen) */}
          <div
            className="hide-mobile"
            style={{ overflow: "hidden", backgroundColor: "#1a241f" }}
          >
            <img
              src="/variants/with-taste-skill/gemini-4-argon/assets/catalog-card-for-kazantzakis-askitiki-the-photo.jpg"
              width={1920}
              height={1440}
              alt="Archival typed index card with ruling and classification code"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.1)",
              }}
            />
          </div>

          {/* Tile 5: Warm Paper Navigation Tile */}
          <div
            className="hide-mobile"
            style={{
              backgroundColor: "#ebebeb",
              color: "#0d2a1c",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <strong style={{ fontSize: "19px" }}>Report Contents</strong>
            <nav
              aria-label="Primary navigation"
              style={{ display: "grid", gap: "2px", fontSize: "16px" }}
            >
              <a
                href="#input-output"
                style={{ color: "#0d2a1c", textDecoration: "none" }}
              >
                I. Raw vs Cited Slip
              </a>
              <a
                href="#triage-bar"
                style={{ color: "#0d2a1c", textDecoration: "none" }}
              >
                II. Evening Triage
              </a>
              <a
                href="#decimal-stats"
                style={{ color: "#0d2a1c", textDecoration: "none" }}
              >
                III. Benchmarks
              </a>
            </nav>
          </div>

          {/* Tile 6: Greyscale Photograph 3 */}
          <div
            className="hide-mobile"
            style={{ overflow: "hidden", backgroundColor: "#1a241f" }}
          >
            <img
              src="/variants/with-taste-skill/gemini-4-argon/assets/benedictus-de-spinoza-manuscript-notes-with-tractatus.jpg"
              width={1794}
              height={3063}
              alt="Handwritten Latin manuscript notes by Benedictus de Spinoza"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.12)",
              }}
            />
          </div>

          {/* Row 2 Tile 7: Greyscale Photograph 4 */}
          <div
            className="hide-tablet hide-mobile"
            style={{ overflow: "hidden", backgroundColor: "#1a241f" }}
          >
            <img
              src="/variants/with-taste-skill/gemini-4-argon/assets/cardfile-at-indiana-state-library-35426.jpg"
              width={1920}
              height={2654}
              alt="Sixty-drawer wooden card catalog cabinet"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.08)",
              }}
            />
          </div>

          {/* Row 2 Tile 8: Muted Olive-Grey Tile */}
          <div
            className="hide-tablet hide-mobile"
            style={{
              backgroundColor: "#d9dedb",
              color: "#0d2a1c",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <strong style={{ fontSize: "20px", lineHeight: 1.05 }}>
              21/3a → 21/3a1
            </strong>
            <span style={{ fontSize: "16px", color: "#2b3b33" }}>
              Folgezettel branching spine
            </span>
          </div>

          {/* Row 2 Tile 9: Bottle Ink Tile */}
          <div
            className="hide-tablet hide-mobile"
            style={{
              backgroundColor: "#143826",
              color: "#f7f7f7",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <strong style={{ fontSize: "20px", lineHeight: 1.05 }}>
              0.8 ms at 90k cards
            </strong>
            <span style={{ fontSize: "16px", color: "#d5e0da" }}>
              Local graph latency
            </span>
          </div>

          {/* Row 2 Tile 10: Greyscale Video Tile */}
          <div
            className="hide-tablet hide-mobile"
            style={{ overflow: "hidden", backgroundColor: "#0d2a1c" }}
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
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.1)",
              }}
            />
          </div>

          {/* Row 2 Tile 11: Warm Paper Tile */}
          <div
            className="hide-tablet hide-mobile"
            style={{
              backgroundColor: "#ebebeb",
              color: "#0d2a1c",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <strong style={{ fontSize: "20px", lineHeight: 1.1 }}>
              Plain UTF-8 Markdown
            </strong>
            <span style={{ fontSize: "16px", color: "#2b3b33" }}>
              Stored in ~/Kasten/
            </span>
          </div>

          {/* Row 2 Tile 12: Deep Forest Tile */}
          <div
            className="hide-tablet hide-mobile"
            style={{
              backgroundColor: "#0d2a1c",
              color: "#f6e016",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <strong style={{ fontSize: "20px", lineHeight: 1.05 }}>
              Zero cloud lock-in
            </strong>
            <span style={{ fontSize: "16px", color: "#d9dedb" }}>
              Ownership charter
            </span>
          </div>
        </div>

        {/* Lower 48% · Open Paper Ground with Standfirst on Left and Display Title at 42% Axis */}
        <div
          className="iter2-container"
          style={{
            width: "100%",
            paddingTop: "40px",
            paddingBottom: "52px",
          }}
        >
          <div className="iter2-axis-grid" style={{ alignItems: "end" }}>
            {/* Left of 42% Axis: Short Standfirst + Primary Action */}
            <div className="anim-load-2">
              <p
                style={{
                  margin: "0 0 24px 0",
                  fontSize: "19px",
                  color: "var(--ink)",
                  maxWidth: "46ch",
                }}
              >
                Kasten is a second brain built as a disciplined literary
                archive. It replaces infinite pages and messy folders with
                atomic A6 Markdown slips linked along a branching Folgezettel
                spine.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="#two-fields-pricing"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "14px 24px",
                    backgroundColor: "var(--ink)",
                    color: "#f7f7f7",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "19px",
                  }}
                >
                  Download Kasten v2.4
                </a>
                <a
                  href="#input-output"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "14px 20px",
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-ink)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "19px",
                  }}
                >
                  Test the Slip Press →
                </a>
              </div>
            </div>

            {/* Starting at 42% Axis: Two-Line Display Headline with Masked Entrance */}
            <div>
              <h1
                style={{
                  fontSize: "clamp(36px, 5.8vw, 84px)",
                  lineHeight: 0.94,
                  color: "var(--ink)",
                }}
              >
                <span className="mask-line">
                  <span>Notes that branch</span>
                </span>
                <span className="mask-line">
                  <span>into manuscripts.</span>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================
          SECTION 2 · SHOWCASE: Input half, output half (50/50 split)
          ================================================================ */}
      <section id="input-output" style={{ width: "100%" }}>
        <div
          data-reveal
          className="iter2-split-50"
          style={{ minHeight: "580px" }}
        >
          {/* Left Half: Dark Bottle-Ink Field with Raw Unstructured Input */}
          <div
            style={{
              backgroundColor: "#0d2a1c",
              color: "#f7f7f7",
              padding: "56px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "36px",
            }}
          >
            <div>
              <div
                data-ui="raw-note-input"
                style={{
                  backgroundColor: "#143826",
                  padding: "24px",
                  border: "1px solid #27543d",
                }}
              >
                <label
                  htmlFor="iter2-raw"
                  style={{
                    display: "block",
                    fontSize: "19px",
                    color: "#f6e016",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  I. Flüchtige Notizen · Edit raw reading note:
                </label>
                <textarea
                  id="iter2-raw"
                  rows={4}
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#0d2a1c",
                    color: "#f7f7f7",
                    border: "1px solid #35694e",
                    padding: "14px",
                    fontSize: "19px",
                    lineHeight: 1.45,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "14px",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "16px", color: "#d5e0da" }}>
                    Parent coordinate:
                  </span>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["17 / 4a1", "21 / 3a2", "8b / 9c"].map((addr) => (
                      <button
                        key={addr}
                        type="button"
                        onClick={() => setSelectedAddress(addr)}
                        style={{
                          padding: "5px 12px",
                          backgroundColor:
                            selectedAddress === addr ? "#f6e016" : "#0d2a1c",
                          color:
                            selectedAddress === addr ? "#0d2a1c" : "#f7f7f7",
                          border: "1px solid #35694e",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      >
                        {addr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Left Half of Split Bottom Heading */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.8vw, 52px)",
                  color: "#f7f7f7",
                }}
              >
                Fleeting notes enter raw,
              </h2>
            </div>
          </div>

          {/* Right Half: Light Field with Formatted Kasten Permanent Slip */}
          <div
            style={{
              backgroundColor: "#ebebeb",
              color: "#0d2a1c",
              padding: "56px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "36px",
            }}
          >
            <div>
              <div
                data-ui="compiled-slip-output"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0d2a1c",
                  padding: "24px",
                  border: "1px solid #cfd6d2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingBottom: "12px",
                    marginBottom: "16px",
                    borderBottom: "2px solid #0d2a1c",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <strong style={{ fontSize: "20px" }}>
                    II. Hauptkasten · Slip {selectedAddress}
                  </strong>
                  <span
                    style={{
                      backgroundColor: "#f6e016",
                      padding: "2px 10px",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {words} / 240 words · A6 Valid
                  </span>
                </div>

                <p
                  style={{
                    margin: "0 0 18px 0",
                    fontSize: "19px",
                    lineHeight: 1.48,
                    maxWidth: "56ch",
                  }}
                >
                  {rawInput}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid #d9dedb",
                    fontSize: "16px",
                    color: "#2b3b33",
                  }}
                >
                  <div>
                    <strong>File path:</strong> ~/Kasten/
                    {selectedAddress.replace(/\s+/g, "").replace("/", "-")}.md
                  </div>
                  <div>
                    <strong>Spine:</strong> Parent {selectedAddress.slice(0, -1)}{" "}
                    · 2 citations
                  </div>
                </div>
              </div>
            </div>

            {/* Right Half of Split Bottom Heading */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.8vw, 52px)",
                  color: "#0d2a1c",
                }}
              >
                and leave as cited prose.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 · HOW IT WORKS: Stages as one bar (Proportional Bar)
          ================================================================ */}
      <section
        id="triage-bar"
        style={{ paddingTop: "96px", paddingBottom: "96px" }}
      >
        <div className="iter2-container">
          <div
            data-reveal
            className="iter2-axis-grid"
            style={{
              alignItems: "end",
              marginBottom: "44px",
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: "19px", color: "var(--ink)" }}>
                Evening Triage Cadence · Measured per Card
              </p>
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(32px, 3.8vw, 52px)" }}>
                Two minutes of evening writing saves hours.
              </h2>
            </div>
          </div>

          {/* 12-column horizontal bar divided into proportional segments */}
          <div
            data-ui="proportional-stage-bar"
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 7fr 3fr",
              width: "100%",
              minHeight: "136px",
            }}
          >
            <button
              type="button"
              onClick={() => setStageSelect(0)}
              style={{
                backgroundColor: stageSelect === 0 ? "#f6e016" : "#0d2a1c",
                color: stageSelect === 0 ? "#0d2a1c" : "#f7f7f7",
                padding: "20px",
                border: 0,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <strong style={{ fontSize: "20px" }}>15 sec</strong>
              <span style={{ fontSize: "16px" }}>Stage I · Capture</span>
            </button>

            <button
              type="button"
              onClick={() => setStageSelect(1)}
              style={{
                backgroundColor: stageSelect === 1 ? "#f6e016" : "#1c4430",
                color: stageSelect === 1 ? "#0d2a1c" : "#f7f7f7",
                padding: "20px",
                border: 0,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <strong style={{ fontSize: "20px" }}>120 sec</strong>
              <span style={{ fontSize: "16px" }}>
                Stage II · Rewrite in Your Own Prose (240w Cap)
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStageSelect(2)}
              style={{
                backgroundColor: stageSelect === 2 ? "#f6e016" : "#d9dedb",
                color: "#0d2a1c",
                padding: "20px",
                border: 0,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <strong style={{ fontSize: "20px" }}>0.8 ms</strong>
              <span style={{ fontSize: "16px" }}>
                Stage III · Address & Index
              </span>
            </button>
          </div>

          {/* 3 equal text columns beneath explaining each stage */}
          <div
            className="grid-12"
            data-reveal
            style={{ marginTop: "36px" }}
          >
            <div style={{ gridColumn: "span 4" }}>
              <h3 style={{ fontSize: "28px", marginBottom: "10px" }}>
                I. Fleeting Capture
              </h3>
              <p style={{ margin: 0, color: "var(--ink)", maxWidth: "54ch" }}>
                Press Cmd+Shift+K from any window to drop a quote or hunch into
                Flüchtige Notizen. Unprocessed inbox notes expire cleanly after
                24 hours so clutter never accumulates.
              </p>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <h3 style={{ fontSize: "28px", marginBottom: "10px" }}>
                II. Atomic Translation
              </h3>
              <p style={{ margin: 0, color: "var(--ink)", maxWidth: "54ch" }}>
                Most of the time belongs here: distilling the day&apos;s raw
                note into a self-contained claim under 240 words, written so
                clearly that future-you can drop it straight into a paper.
              </p>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <h3 style={{ fontSize: "28px", marginBottom: "10px" }}>
                III. Folgezettel Filing
              </h3>
              <p style={{ margin: 0, color: "var(--ink)", maxWidth: "54ch" }}>
                Pick the card your new thought answers. Kasten assigns the next
                alphanumeric coordinate (21/3a1) and recalculates all 90,000
                bidirectional links in 0.8 milliseconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 · FEATURES: Fixed output, live controls
          ================================================================ */}
      <section
        style={{
          paddingTop: "96px",
          paddingBottom: "96px",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="iter2-container">
          <div
            data-reveal
            className="iter2-axis-grid"
            style={{
              marginBottom: "48px",
              alignItems: "end",
            }}
          >
            <div>
              <p style={{ margin: 0, color: "var(--ink)" }}>
                Interactive Apparatus · Select any instrument on the right
              </p>
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(32px, 3.8vw, 52px)" }}>
                Four instruments inside one quiet window.
              </h2>
            </div>
          </div>

          <div className="grid-12" style={{ alignItems: "start" }}>
            {/* Left Columns 1–6: Colour Field holding the live specimen */}
            <div
              style={{
                gridColumn: "span 6",
                backgroundColor: "#0d2a1c",
                color: "#f7f7f7",
                padding: "36px",
              }}
            >
              <div
                data-ui="fixed-live-specimen"
                style={{
                  backgroundColor: "#f7f7f7",
                  color: "#0d2a1c",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingBottom: "12px",
                    marginBottom: "16px",
                    borderBottom: "2px solid #0d2a1c",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <strong style={{ fontSize: "20px" }}>
                    SLIP {activeFeature.cardCode}
                  </strong>
                  <span
                    style={{
                      backgroundColor: "#f6e016",
                      padding: "2px 10px",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Active Specimen
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    color: "#2b3b33",
                    marginBottom: "12px",
                  }}
                >
                  ↑ Parent: {activeFeature.cardParent}
                </div>

                <p
                  style={{
                    margin: "0 0 18px 0",
                    fontSize: "19px",
                    lineHeight: 1.45,
                    maxWidth: "54ch",
                  }}
                >
                  “{activeFeature.cardClaim}”
                </p>

                <div
                  style={{
                    fontSize: "16px",
                    color: "#0d2a1c",
                    backgroundColor: "#ebebeb",
                    padding: "10px 14px",
                    marginBottom: "12px",
                  }}
                >
                  ↓ Branches to: {activeFeature.cardChild}
                </div>

                <div style={{ fontSize: "16px", color: "#2b3b33" }}>
                  Citation: {activeFeature.cardSource}
                </div>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/variants/with-taste-skill/gemini-4-argon/assets/the-fine-art-of-literary-mayhem-card.jpg"
                  width={1920}
                  height={1440}
                  alt="Vintage catalog card showing subject tracers at the bottom"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "140px",
                    height: "100px",
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                  }}
                />
                <p style={{ margin: 0, fontSize: "16px", color: "#d5e0da" }}>
                  Modeled directly on physical library tracer slips with fixed
                  punched rod coordinates.
                </p>
              </div>
            </div>

            {/* Right Columns 7–12: Vertical stack of 4 capability blocks */}
            <div
              style={{
                gridColumn: "span 6",
                display: "grid",
                gap: "24px",
              }}
            >
              {FEATURE_CONTROLS.map((feat, idx) => {
                const selected = idx === activeFeatureIdx;
                return (
                  <article
                    key={feat.id}
                    onClick={() => setActiveFeatureIdx(idx)}
                    style={{
                      color: "#0d2a1c",
                      padding: "16px 0",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "10px",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      <h3 style={{ fontSize: "28px" }}>{feat.title}</h3>
                      <span
                        data-ui={`badge-${feat.id}`}
                        style={{
                          padding: "3px 10px",
                          backgroundColor: selected ? "#f6e016" : "#d9dedb",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        Slip {feat.cardCode}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0 0 16px 0",
                        color: "var(--ink)",
                        fontSize: "19px",
                      }}
                    >
                      {feat.body}
                    </p>
                    <button
                      type="button"
                      data-ui={`btn-${feat.id}`}
                      onClick={() => setActiveFeatureIdx(idx)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: selected ? "#0d2a1c" : "#ffffff",
                        color: selected ? "#ffffff" : "#0d2a1c",
                        border: "1px solid #0d2a1c",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      {selected
                        ? "Loaded in Specimen Stage"
                        : "Inspect Slip Specimen →"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 · STATS: Column aligned on the decimal
          ================================================================ */}
      <section
        id="decimal-stats"
        style={{ paddingTop: "96px", paddingBottom: "96px" }}
      >
        <div className="iter2-container">
          <div className="grid-12" data-reveal style={{ alignItems: "start" }}>
            {/* Columns 1–5: Statement heading */}
            <div style={{ gridColumn: "span 5" }}>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.8vw, 52px)",
                  marginBottom: "20px",
                }}
              >
                Measured against Luhmann&apos;s archive.
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "var(--ink)",
                  fontSize: "19px",
                  maxWidth: "52ch",
                }}
              >
                Between 1952 and 1997, Niklas Luhmann filed 90,000 handwritten
                index slips in Bielefeld and published 58 books. Kasten matches
                that exact archival scale on a modern laptop without lag.
              </p>
            </div>

            {/* Columns 6–12: Vertical stack of figures aligned on a shared decimal axis */}
            <div
              style={{
                gridColumn: "span 7",
                display: "grid",
                gap: "20px",
              }}
            >
              {[
                {
                  whole: "90,000",
                  dec: ".0",
                  unit: "cards",
                  caption:
                    "Indexed in Luhmann's Bielefeld slip-box and benchmarked in Kasten's local engine.",
                },
                {
                  whole: "0",
                  dec: ".8",
                  unit: "ms",
                  caption:
                    "Full Folgezettel backlink graph traversal across ninety thousand local Markdown files.",
                },
                {
                  whole: "240",
                  dec: ".0",
                  unit: "words",
                  caption:
                    "Maximum A6 card capacity that keeps every note atomic and combinable across chapters.",
                },
                {
                  whole: "58",
                  dec: ".0",
                  unit: "books",
                  caption:
                    "Monographs assembled directly from branching slip sequences using this method.",
                },
              ].map((stat) => (
                <div
                  key={stat.unit}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    alignItems: "baseline",
                    padding: "16px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      fontVariantNumeric: "tabular-nums",
                      fontSize: "clamp(36px, 4.2vw, 52px)",
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    <span>{stat.whole}</span>
                    <span style={{ color: "#394840" }}>{stat.dec}</span>
                    <span
                      style={{
                        fontSize: "19px",
                        marginLeft: "8px",
                        color: "var(--ink)",
                      }}
                    >
                      {stat.unit}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "19px",
                      color: "var(--ink)",
                    }}
                  >
                    {stat.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 · PRICING: Two plans, two fields (Columns 1–5 vs 6–12)
          ================================================================ */}
      <section id="two-fields-pricing" style={{ width: "100%" }}>
        <div data-reveal className="iter2-pricing-split">
          {/* Columns 1–5: Starter Drawer Field */}
          <div
            style={{
              backgroundColor: "#ebebeb",
              color: "#0d2a1c",
              padding: "64px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "36px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "clamp(32px, 3.8vw, 52px)" }}>
                Starter Drawer
              </h2>
              <div
                style={{
                  fontSize: "clamp(48px, 5.5vw, 84px)",
                  fontWeight: 500,
                  lineHeight: 1,
                  margin: "18px 0",
                }}
              >
                $0
              </div>
              <p
                style={{
                  margin: 0,
                  color: "var(--ink)",
                  fontSize: "19px",
                  maxWidth: "48ch",
                }}
              >
                Full local plain-text slip-box for your first 500 permanent
                cards. Includes daily Flüchtige Notizen inbox, A6 word counter,
                and Folgezettel branching.
              </p>
            </div>

            <a
              href="#two-fields-pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 28px",
                backgroundColor: "#0d2a1c",
                color: "#f7f7f7",
                textDecoration: "none",
                fontSize: "19px",
                fontWeight: 500,
                alignSelf: "flex-start",
              }}
            >
              Download Free Edition
            </a>
          </div>

          {/* Columns 6–12: Permanent Cabinet Field in Accent Tone */}
          <div
            style={{
              backgroundColor: "#f6e016",
              color: "#0d2a1c",
              padding: "64px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "36px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "clamp(32px, 3.8vw, 52px)" }}>
                Permanent Cabinet
              </h2>

              <div
                style={{
                  fontSize: "clamp(48px, 5.5vw, 84px)",
                  fontWeight: 500,
                  lineHeight: 1,
                  margin: "18px 0",
                }}
              >
                $68
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "19px",
                }}
              >
                One-time purchase with no subscription. Unlimited permanent
                slips, Manuscript Desk concatenation with live BibTeX footnotes,
                Schlagwort Register matrix, and five years of native macOS,
                Linux, and Windows updates.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#two-fields-pricing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 32px",
                  backgroundColor: "#0d2a1c",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "19px",
                  fontWeight: 500,
                }}
              >
                Purchase Permanent License ($68)
              </a>
              <span style={{ fontSize: "16px" }}>
                30-day unconditional trial · Keep your .md files forever
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 · FAQ: A band per question (Alternating full-bleed bands)
          ================================================================ */}
      <section aria-label="Frequently asked questions">
        {[
          {
            bg: "#0d2a1c",
            ink: "#f7f7f7",
            muted: "#d5e0da",
            q: "How do I migrate notes from Obsidian or Notion?",
            a: "Mount your existing vault as an external read-only shelf inside Kasten. Rather than polluting your permanent slip-box with thousands of unedited web clippings, promote only the notes you actively rewrite and connect.",
          },
          {
            bg: "#f7f7f7",
            ink: "#0d2a1c",
            muted: "#0d2a1c",
            q: "Why does Kasten reject folder hierarchies?",
            a: "A folder forces you to decide where a thought belongs before you know what it will grow into. Folgezettel branching lets a single card on botany connect directly to a card on epistemology without moving either file.",
          },
          {
            bg: "#ebebeb",
            ink: "#0d2a1c",
            muted: "#0d2a1c",
            q: "How does sync work without a cloud account?",
            a: "Because every slip is an atomic UTF-8 file under 2 KB, Kasten works directly with Git, Syncthing, iCloud Drive, or our optional $2/month zero-knowledge encrypted relay.",
          },
        ].map((band) => (
          <div
            key={band.q}
            style={{
              backgroundColor: band.bg,
              color: band.ink,
              paddingTop: "48px",
              paddingBottom: "48px",
            }}
          >
            <div className="iter2-container">
              <div
                className="grid-12"
                data-reveal
                style={{ alignItems: "baseline" }}
              >
                <div style={{ gridColumn: "span 5" }}>
                  <h2 style={{ fontSize: "28px" }}>{band.q}</h2>
                </div>
                <div style={{ gridColumn: "span 7" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "19px",
                      color: band.muted,
                    }}
                  >
                    {band.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================================================================
          SECTION 8 · FOOTER: Name first, places under it
          ================================================================ */}
      <footer
        style={{
          backgroundColor: "#0d2a1c",
          color: "#f7f7f7",
          paddingTop: "64px",
          paddingBottom: "84px",
          overflow: "hidden",
        }}
      >
        <div className="iter2-container">
          <div style={{ overflow: "hidden", marginBottom: "36px" }}>
            <div
              style={{
                fontSize: "clamp(64px, 15vw, 212px)",
                fontWeight: 500,
                lineHeight: 0.84,
                letterSpacing: "-0.03em",
                color: "#f6e016",
                transform: "translateY(8%)",
              }}
            >
              Kasten Annual
            </div>
          </div>

          <div
            className="grid-12"
            style={{ marginBottom: "36px", fontSize: "19px" }}
          >
            <div style={{ gridColumn: "span 4" }}>
              <strong style={{ color: "#f6e016" }}>Bielefeld Edition</strong>
              <p
                style={{
                  margin: "6px 0 0 0",
                  color: "#d5e0da",
                  maxWidth: "46ch",
                }}
              >
                Folgezettel Engine v2.4 · Plain UTF-8 Markdown Specification.
              </p>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <strong style={{ color: "#f6e016" }}>Field Monograph</strong>
              <p
                style={{
                  margin: "6px 0 0 0",
                  color: "#d5e0da",
                  maxWidth: "46ch",
                }}
              >
                42% Vertical Spine · Boska Literary Serif · Archival Plates.
              </p>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <strong style={{ color: "#f6e016" }}>Downloads & Checksums</strong>
              <p
                style={{
                  margin: "6px 0 0 0",
                  color: "#d5e0da",
                  maxWidth: "46ch",
                }}
              >
                macOS Universal (.dmg) · Linux AppImage · Windows Installer.
              </p>
            </div>
          </div>

          <AssetCredits color="#d5e0da" linkColor="#f6e016" />
        </div>
      </footer>
    </div>
  );
}
