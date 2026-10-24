"use client";

import { useState } from "react";
import { useScrollReveal } from "@/variants/with-taste-skill/gemini-4-argon/source/components/useScrollReveal";
import { AssetCredits } from "@/variants/with-taste-skill/gemini-4-argon/source/components/AssetCredits";

const POSTER_CARDS = [
  {
    code: "21 / 3a",
    title: "Folders kill surprise.",
    words: "178 / 240w",
    body: "When you file a note into a topic folder, you only ever re-read it when you are already thinking about that topic. The slip-box breaks this echo chamber by filing thoughts behind neighboring arguments instead of abstract categories.",
    links: ["21/3a1", "14/8b", "9c/2a"],
  },
  {
    code: "21 / 3a1",
    title: "Enforce 240-word cards.",
    words: "164 / 240w",
    body: "An A6 paper slip holds roughly 240 words. Kasten locks every note to that exact boundary. When an argument grows longer, you split it into a new branching address and link the two slips explicitly.",
    links: ["21/3a", "21/3a2", "33/1a"],
  },
  {
    code: "14 / 8b",
    title: "Index entry doors only.",
    words: "152 / 240w",
    body: "Never tag every note. In Luhmann's Bielefeld archive, the Schlagwort register listed only one or two starting addresses per keyword. Once inside the chain, internal links carry you across decades of work.",
    links: ["14/8b1", "21/3a"],
  },
  {
    code: "9c / 2a4",
    title: "Compile drafts in 1 second.",
    words: "142 / 240w",
    body: "Pull any Folgezettel branch onto the Manuscript Desk. Kasten concatenates the plain Markdown slips in sequence and generates a clean LaTeX, DOCX, or Pandoc chapter with all citations intact.",
    links: ["9c/2a3", "21/3a1"],
  },
];

export default function IterationFourPage() {
  useScrollReveal();

  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);

  const activeCard = POSTER_CARDS[activeCardIdx];

  return (
    <div className="theme-iter4">
      {/* ================================================================
          SECTION 1 · HERO: Poster type and an angled slip-card
          ================================================================ */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "3px solid #0a0a0a",
        }}
      >
        {/* Top Utility Strip */}
        <div
          className="iter4-container"
          style={{
            paddingTop: "22px",
            paddingBottom: "22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "18px",
              letterSpacing: "-0.04em",
            }}
          >
            KASTEN!
          </div>

          <nav
            aria-label="Primary navigation"
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            <a
              href="#poster-showcase"
              style={{ color: "#0a0a0a", textDecoration: "none" }}
            >
              Slip-Box
            </a>
            <a
              href="#colour-quadrant"
              style={{ color: "#0a0a0a", textDecoration: "none" }}
            >
              Rules
            </a>
            <a
              href="#four-stages"
              style={{ color: "#0a0a0a", textDecoration: "none" }}
            >
              Ritual
            </a>
            <a
              href="#poster-pricing"
              style={{
                backgroundColor: "var(--field-1)",
                color: "#ffffff",
                padding: "10px 20px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Get Kasten ($0 / $68)
            </a>
          </nav>
        </div>

        {/* Hero Main Stage */}
        <div
          className="iter4-container iter4-hero-grid"
          style={{
            paddingTop: "48px",
            paddingBottom: "72px",
          }}
        >
          {/* Columns 1–7: Oversized Poster Headline */}
          <div className="anim-load-1">
            <h1
              className="iter4-h1"
              style={{
                lineHeight: 0.92,
                marginBottom: "28px",
              }}
            >
              FILE BY{" "}
              <span style={{ color: "var(--field-1)" }}>SPINE.</span>
            </h1>

            <p
              style={{
                fontSize: "18px",
                maxWidth: "48ch",
                margin: "0 0 32px 0",
                color: "#0a0a0a",
              }}
            >
              Kasten is a brutalist, local-first Zettelkasten where every note
              is a 240-word plain Markdown slip filed along Luhmann&apos;s
              branching alphanumeric spine.
            </p>

            <div
              className="anim-load-2"
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="#poster-showcase"
                style={{
                  backgroundColor: "var(--field-2)",
                  color: "#ffffff",
                  padding: "18px 28px",
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "15px",
                  border: "3px solid #0a0a0a",
                }}
              >
                INSPECT LIVE BOARD ↓
              </a>
              <span style={{ fontWeight: 500, fontSize: "18px" }}>
                macOS · Linux · Windows · 100% Offline .md
              </span>
            </div>
          </div>

          {/* Columns 8–12: Physical Slip-Card Tilted over Electric Blue Block */}
          <div
            className="anim-load-3"
            style={{
              position: "relative",
              padding: "28px 16px",
            }}
          >
            {/* Electric Blue Poster Backdrop */}
            <div
              style={{
                backgroundColor: "var(--field-1)",
                padding: "24px",
                border: "3px solid #0a0a0a",
              }}
            >
              {/* Archival Photo Window */}
              <div
                style={{
                  height: "240px",
                  overflow: "hidden",
                  border: "2px solid #0a0a0a",
                  marginBottom: "20px",
                }}
              >
                <img
                  src="/variants/with-taste-skill/gemini-4-argon/assets/catalog-card-for-kazantzakis-askitiki-the-photo.jpg"
                  width={1920}
                  height={1440}
                  alt="Archival library index card with blue ink classification and brass rod punch hole"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Tilted Physical Slip Card (-3deg) */}
              <div
                data-ui="hero-angled-slip"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0a0a0a",
                  padding: "24px",
                  border: "3px solid #0a0a0a",
                  transform: "rotate(-3deg)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "var(--field-2)",
                      color: "#ffffff",
                      padding: "4px 10px",
                      fontWeight: 700,
                      fontSize: "15px",
                    }}
                  >
                    SLIP 21 / 3a1
                  </span>
                  <span style={{ fontWeight: 500, fontSize: "15px" }}>
                    A6 · 240W MAX
                  </span>
                </div>

                <p
                  style={{
                    margin: "0 0 14px 0",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  &ldquo;A note that requires scrolling is not an atomic
                  thought; it is an unedited draft hiding inside your
                  cabinet.&rdquo;
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "15px",
                    color: "var(--muted)",
                  }}
                >
                  <span>~/Kasten/21-3a1.md</span>
                  <strong style={{ color: "var(--field-1)" }}>↗ [[14/8b]]</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================
          SECTION 2 · SHOWCASE: Product on a colour block
          ================================================================ */}
      <section
        id="poster-showcase"
        style={{
          backgroundColor: "var(--field-1)",
          color: "#ffffff",
          padding: "88px 0",
          borderBottom: "3px solid #0a0a0a",
        }}
      >
        <div className="iter4-container">
          <div
            data-reveal
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            <div>
              <h2 className="iter4-h2">
                FOUR SLIPS. ONE SPINE.
              </h2>
            </div>
            <p style={{ margin: 0, maxWidth: "42ch", fontSize: "18px" }}>
              Click any Folgezettel address below to inspect the live A6 card on
              the cobalt worktable.
            </p>
          </div>

          <div className="iter4-showcase-grid">
            {/* Left Column: Address Selector Buttons */}
            <div
              data-reveal
              data-ui="poster-card-tabs"
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {POSTER_CARDS.map((c, idx) => {
                const active = idx === activeCardIdx;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setActiveCardIdx(idx)}
                    style={{
                      padding: "20px",
                      backgroundColor: active ? "#ffffff" : "#050a5c",
                      color: active ? "#0a0a0a" : "#ffffff",
                      border: "3px solid #0a0a0a",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "24px",
                          fontWeight: 800,
                          marginBottom: "4px",
                        }}
                      >
                        {c.code}
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: 500 }}>
                        {c.title}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                      }}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Crisp White Slip Canvas */}
            <div
              data-reveal
              data-ui="poster-slip-canvas"
              style={{
                backgroundColor: "#ffffff",
                color: "#0a0a0a",
                border: "3px solid #0a0a0a",
                padding: "36px",
                minHeight: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "3px solid #0a0a0a",
                    paddingBottom: "16px",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "var(--field-1)",
                    }}
                  >
                    {activeCard.code}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#0a0a0a",
                      color: "#ffffff",
                      padding: "6px 14px",
                      fontWeight: 500,
                      fontSize: "15px",
                    }}
                  >
                    {activeCard.words}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "24px",
                    marginBottom: "16px",
                    textTransform: "none",
                  }}
                >
                  {activeCard.title}
                </h3>

                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {activeCard.body}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "20px",
                  borderTop: "2px solid #0a0a0a",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {activeCard.links.map((lk) => (
                    <span
                      key={lk}
                      style={{
                        backgroundColor: "var(--field-2)",
                        color: "#ffffff",
                        padding: "4px 12px",
                        fontWeight: 700,
                        fontSize: "15px",
                      }}
                    >
                      ↗ [[{lk}]]
                    </span>
                  ))}
                </div>
                <span style={{ fontWeight: 500, fontSize: "15px" }}>
                  ~/Kasten/Hauptkasten/
                  {activeCard.code.replace(/\s+/g, "").replace("/", "-")}.md
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 · FEATURES: Four-colour quadrant grid (2×2 edge-to-edge)
          ================================================================ */}
      <section id="colour-quadrant">
        <div className="iter4-quadrant-grid">
          {/* Quadrant 1: Electric Blue */}
          <div
            data-reveal
            style={{
              backgroundColor: "var(--field-1)",
              color: "#ffffff",
              padding: "56px 28px",
              borderBottom: "3px solid #0a0a0a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "420px",
              gap: "28px",
            }}
          >
            <div>
              <h2 className="iter4-h2" style={{ marginBottom: "16px" }}>
                240-WORD CAP.
              </h2>
              <p style={{ margin: 0, fontSize: "18px", maxWidth: "44ch" }}>
                Long documents become graveyards of half-baked paragraphs.
                Kasten caps every card at 240 words, forcing you to distill each
                idea down to one sharp, linkable brick.
              </p>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "44px",
                fontWeight: 800,
                lineHeight: 0.9,
              }}
            >
              148 × 105 MM
            </div>
          </div>

          {/* Quadrant 2: Poster Red */}
          <div
            data-reveal
            style={{
              backgroundColor: "var(--field-2)",
              color: "#ffffff",
              padding: "56px 28px",
              borderBottom: "3px solid #0a0a0a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "420px",
              gap: "28px",
            }}
          >
            <div>
              <h2 className="iter4-h2" style={{ marginBottom: "16px" }}>
                MIDNIGHT INBOX.
              </h2>
              <p style={{ margin: 0, fontSize: "18px", maxWidth: "44ch" }}>
                Your Flüchtige Notizen tray holds quick captures for 24 hours
                only. At midnight, promote the survivors into permanent slips or
                let them clear cleanly.
              </p>
            </div>
            <div
              style={{
                height: "170px",
                overflow: "hidden",
                border: "3px solid #0a0a0a",
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
          </div>

          {/* Quadrant 3: Stark Black */}
          <div
            data-reveal
            style={{
              backgroundColor: "#0a0a0a",
              color: "#ffffff",
              padding: "56px 28px",
              borderBottom: "3px solid #0a0a0a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "420px",
              gap: "28px",
            }}
          >
            <div>
              <h2 className="iter4-h2" style={{ marginBottom: "16px" }}>
                ZERO LOCK-IN.
              </h2>
              <p style={{ margin: 0, fontSize: "18px", maxWidth: "44ch" }}>
                No proprietary SQLite blobs. No mandatory account creation.
                Every card is a standard UTF-8 Markdown file inside{" "}
                <strong>~/Kasten/</strong> that you can grep, git-commit, or
                read in fifty years.
              </p>
            </div>
            <div
              style={{
                height: "170px",
                overflow: "hidden",
                border: "2px solid #ffffff",
              }}
            >
              <img
                src="/variants/with-taste-skill/gemini-4-argon/assets/index-card-3-by-5-inch-agr.jpg"
                width={1920}
                height={1198}
                alt="1919 United States Department of Agriculture typed index card"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Quadrant 4: Crisp White */}
          <div
            data-reveal
            style={{
              backgroundColor: "#ffffff",
              color: "#0a0a0a",
              padding: "56px 28px",
              borderBottom: "3px solid #0a0a0a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "420px",
              gap: "28px",
            }}
          >
            <div>
              <h2 className="iter4-h2" style={{ marginBottom: "16px" }}>
                0.8 MS GRAPH.
              </h2>
              <p style={{ margin: 0, fontSize: "18px", maxWidth: "44ch" }}>
                Written in native Rust with a memory-mapped link table. Traverse
                ninety thousand cards, backlinks, and Folgezettel branches in
                0.8 milliseconds flat.
              </p>
            </div>
            <div
              style={{
                height: "170px",
                overflow: "hidden",
                border: "3px solid #0a0a0a",
              }}
            >
              <img
                src="/variants/with-taste-skill/gemini-4-argon/assets/cololejeunea-khanii-holotype-index-card-at-museum.jpg"
                width={1824}
                height={1399}
                alt="Museum botanical holotype index card with blue fountain pen notes"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 · HOW IT WORKS: Four-column colour-block process
          ================================================================ */}
      <section id="four-stages">
        <div className="iter4-process-grid">
          {[
            {
              bg: "#ffffff",
              fg: "#0a0a0a",
              title: "I. JOT FAST",
              body: "Hit Cmd+Shift+K anywhere to drop a fleeting thought into the 24-hour tray without breaking reading flow.",
            },
            {
              bg: "#1422cc",
              fg: "#ffffff",
              title: "II. CUT TO A6",
              body: "Rewrite the surviving thought in your own prose under the 240-word A6 ceiling with its page citation.",
            },
            {
              bg: "#a81800",
              fg: "#ffffff",
              title: "III. PIN SPINE",
              body: "Slot the card directly behind the argument it continues or contradicts (21/3a → 21/3a1).",
            },
            {
              bg: "#0a0a0a",
              fg: "#ffffff",
              title: "IV. COMPILE",
              body: "Select any branch and export a finished chapter draft with automatic footnotes in one keystroke.",
            },
          ].map((col, idx) => (
            <div
              key={col.title}
              data-reveal
              onMouseEnter={() => setHoveredStage(idx)}
              onMouseLeave={() => setHoveredStage(null)}
              style={{
                backgroundColor: hoveredStage === idx ? "#050a5c" : col.bg,
                color: hoveredStage === idx ? "#ffffff" : col.fg,
                padding: "48px 24px",
                minHeight: "340px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background-color 320ms ease, color 320ms ease",
              }}
            >
              <h3 style={{ fontSize: "24px", lineHeight: 1.05 }}>
                {col.title}
              </h3>

              <p style={{ margin: 0, fontSize: "18px" }}>{col.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          SECTION 5 · SOCIAL PROOF: Full-bleed quote on Red
          ================================================================ */}
      <section
        style={{
          backgroundColor: "var(--field-2)",
          color: "#ffffff",
          padding: "96px 0",
          borderBottom: "3px solid #0a0a0a",
        }}
      >
        <div className="iter4-container" data-reveal>
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                lineHeight: 1.2,
                margin: "0 0 28px 0",
                maxWidth: "36ch",
              }}
            >
              &ldquo;MY ARCHIVE FINALLY ARGUES BACK.&rdquo;
            </p>
            <footer style={{ fontSize: "18px", fontWeight: 500 }}>
              — DR. MAREN VOGEL, HISTORIAN OF MEDIA AT BASEL · 18,400 SLIPS ON
              DISK AFTER DELETING 14,000 TAGGED CLOUD NOTES
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 · PRICING: Two-column colour split
          ================================================================ */}
      <section id="poster-pricing">
        <div className="iter4-pricing-grid">
          {/* Free Tier on White */}
          <div
            data-reveal
            style={{
              backgroundColor: "#ffffff",
              color: "#0a0a0a",
              padding: "64px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "32px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
                STARTER DRAWER
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "44px",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  marginBottom: "20px",
                }}
              >
                $0
              </div>
              <p style={{ margin: "0 0 24px 0", fontSize: "18px" }}>
                Full local Markdown storage for up to 500 permanent slips. No
                time limit, no telemetry, no account required.
              </p>
            </div>

            <a
              href="#poster-pricing"
              style={{
                display: "inline-block",
                backgroundColor: "#0a0a0a",
                color: "#ffffff",
                padding: "18px 24px",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              DOWNLOAD MAC / LINUX / WIN
            </a>
          </div>

          {/* Paid Tier on Electric Blue */}
          <div
            data-reveal
            style={{
              backgroundColor: "var(--field-1)",
              color: "#ffffff",
              padding: "64px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "32px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
                PERMANENT CABINET
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "44px",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  marginBottom: "20px",
                }}
              >
                $68
              </div>
              <p
                style={{
                  margin: "0 0 24px 0",
                  fontSize: "18px",
                  maxWidth: "46ch",
                }}
              >
                One-time lifetime license. Unlimited drawers (tested to 90,000+
                slips), full BibTeX Literaturkasten, Manuscript Desk compiler,
                and 5 years of native updates.
              </p>
            </div>

            <div>
              <a
                href="#poster-pricing"
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--field-2)",
                  color: "#ffffff",
                  padding: "18px 28px",
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "15px",
                  border: "3px solid #0a0a0a",
                }}
              >
                BUY LIFETIME KEY ($68) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 · FAQ: Split heading and accordion
          ================================================================ */}
      <section
        style={{
          backgroundColor: "#ffffff",
          color: "#0a0a0a",
          padding: "88px 0",
          borderBottom: "3px solid #0a0a0a",
        }}
      >
        <div className="iter4-container iter4-faq-grid" data-reveal>
          <div>
            <h2 className="iter4-h2" style={{ marginBottom: "16px" }}>
              BLUNT ANSWERS.
            </h2>
            <p style={{ margin: 0, color: "#0a0a0a" }}>
              Everything you need to know before moving your notes out of the
              cloud.
            </p>
          </div>

          <div data-ui="poster-faq-accordion">
            {[
              {
                q: "Why 240 words? What if I write long essays?",
                a: "Long essays are built by chaining atomic slips together on the Manuscript Desk. Keeping individual slips under 240 words lets you recombine the same evidence across multiple essays without copy-pasting.",
              },
              {
                q: "Can I import an existing Obsidian or Roam vault?",
                a: "Yes. Kasten includes a local vault importer that converts existing [[wikilinks]] and helps you assign initial Folgezettel spine addresses.",
              },
              {
                q: "How do I sync across my laptop and phone?",
                a: "Because every card is a plain file inside ~/Kasten/, you can use Syncthing, iCloud Drive, Git, or our optional $2/mo zero-knowledge relay.",
              },
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  style={{
                    borderBottom: "3px solid #0a0a0a",
                    padding: "20px 0",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
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
                      gap: "16px",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0a0a0a",
                    }}
                  >
                    <span>{item.q}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--field-1)",
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      style={{
                        margin: "14px 0 0 0",
                        fontSize: "18px",
                        color: "#0a0a0a",
                      }}
                    >
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
          SECTION 8 · FOOTER: Minimal bar with Oversized Wordmark
          ================================================================ */}
      <footer
        style={{
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          padding: "56px 0 40px 0",
        }}
      >
        <div className="iter4-container">
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
                fontFamily: "var(--font-display)",
                fontSize: "44px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              KASTEN!
            </div>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <a
                href="#poster-showcase"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                Slip-Box
              </a>
              <a
                href="#colour-quadrant"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                240-Word Rule
              </a>
              <a
                href="#poster-pricing"
                style={{
                  color: "#ffffff",
                  textDecoration: "underline",
                  fontWeight: 700,
                }}
              >
                Download v2.4
              </a>
            </div>

            <div style={{ color: "#d4d4d4", fontSize: "15px" }}>
              © 2026 KASTEN · SPEC v2.4
            </div>
          </div>

          <AssetCredits color="#d4d4d4" linkColor="#ffffff" />
        </div>
      </footer>
    </div>
  );
}
