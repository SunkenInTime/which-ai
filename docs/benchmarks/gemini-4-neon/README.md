# Gemini 4 Neon in Antigravity

Two frontend runs on 2026-11-19 (UTC), with Gemini 4 Neon at thinking level `xhigh` in Google's Antigravity, driven headless over ACP on t3os (Ubuntu 26.04). They replace the Cursor CLI runs from earlier the same day, which Dara suspected the Cursor harness had made worse than Neon is. Those runs' records are in [cursor/](cursor/README.md). Everything but the harness is the same: model and reasoning level, prompts (only the port differs), starter, skill file and browser.

## How it ran

Antigravity has no headless CLI on Linux. Its agent runs as an ACP (Agent Client Protocol) server: `agy_acp_server.par` with `localharness_external`, release 1.4.5, the build T3 Code installs. [runner/acp-run.mjs](runner/acp-run.mjs) is a small client for it. It opens one session in the workspace, switches to full-access mode (`yolo`), selects `gemini-4-neon` and `thinking_level` `xhigh`, sends the prompt once, approves every permission request, and logs every message both ways. It offers no file system or terminal of its own, so the agent uses Antigravity's built-in tools. The other scripts in [runner/](runner/) set up the workspaces and run sessions; [provenance.json](provenance.json) has the exact environment and hashes.

Isolation matches the Cursor runs. Each session had its own home whose `GEMINI_HOME` held only a copy of the Antigravity sign-in, ran under `env -i` with a short PATH, and ran in a private mount namespace with an empty folder over `/etc/codex` and `/etc/claude-code` (the box's own agent instructions) and its own folder over `/tmp`.

Antigravity's ACP server has no browser. An unscored preflight without one listed no browser tool, browser subagent or MCP server, and couldn't take the test screenshot. So the scored sessions got the same browser as the Cursor, GPT-6.2 Astra and GPT-6.2 Sol runs: Playwright MCP 0.0.83 with isolated headless Chromium 1247 at 1440×960 and screenshots returned to the model, passed as a session MCP server. A preflight with it ([prompt](preflight.prompt.txt), [reply](preflight.final.txt)) listed the workspace's frontend-design skill, Antigravity's built-in `run-workflow` skill, the 25 browser tools, Antigravity's built-in tools (files, shell, web search, image generation, subagents), and no personal, user-level or box instructions beyond the starter's `AGENTS.md` and `CLAUDE.md` and Antigravity's own system prompt. It described the canvas test page from screenshot pixels.

Antigravity writes its `run-workflow` skill into every workspace it opens, at `skills/system/run-workflow/SKILL.md`. That file is in the source hashes and left out of the gallery copy.

## Sessions

| Condition | Product | Started (UTC) | Model time | Browser use | Instruction files read | Tokens (cached) | API-equivalent cost |
| --- | --- | --- | ---: | --- | --- | ---: | ---: |
| Without Design Skill | Engram | 05:39:35 | 18m 42s | 7 navigations, 9 screenshots, 3 clicks | `AGENTS.md` | 2.19M (1.99M) | $1.62 |
| With Design Skill | Commonplace | 05:39:35 | 20m 39s | 18 navigations, 19 screenshots, 2 clicks | `AGENTS.md`, `frontend-design/SKILL.md` | 2.64M (2.43M) | $1.77 |

Each session got one prompt and nothing else, and ended on its own with a final reply ([without](no-skills.final.txt), [with](frontend-design.final.txt)), after a production build, lint and a look at all five pages. Neither used a subagent. The Cursor sessions both went silent before their final message and were ended by the run operator. The two ran at the same time on one machine, alongside a Motion session, so the times aren't a latency comparison.

Costs are API-equivalent estimates at Google's paid-tier rates for Neon ($3 per million input tokens, $0.15 cached, $15 output including thinking), from the usage Antigravity reports at the end of each turn; [costs.json](costs.json) has the arithmetic. Antigravity ran on Dara's subscription, so they aren't charges. The Cursor runs had no cost, because the Cursor CLI never wrote its usage.

## What it made

- **Without Design Skill (Engram):** Editorial Atelier (paper and ink, a note reader with marginalia and backlinks), Neural Cosmos (a dark knowledge graph), Swiss Index (a brutalist grid), Digital Garden (botanical), and Cognitive Deck (a hardware-style console in aluminium and charcoal where typed notes append to a "memory tape").
- **With Design Skill (Commonplace):** Index-Card Desk (an archival paper grid), Botanical Garden, Swiss Spatial Studio, Midnight Observatory (notes as stars joined by sight-lines, with a memory-depth slider), and Risograph Notebook (violet and citron, with a quick-capture playground).

## Gallery adaptation

The same as the Cursor runs' and Gemini 4 Carbon's:

- `<html>`/`<body>` become `data-source-html`/`data-source-body` divs, `globals.css` goes through the scoped copy, the layout takes a plain `{ children }` type instead of Next's generated `LayoutProps`, and the model's iteration switcher isn't rendered (the gallery has its own). Imports through `@/components/` point into the variant folder.
- The gallery strips Tailwind's `@theme`. Without Design Skill's theme set Geist as the sans and mono fonts and defined `--font-serif-editorial`, `--font-serif-garden` and `--font-grotesk`, which its pages use in arbitrary values such as `font-[family-name:var(--font-serif-editorial)]`. Those variables are set on the wrapper instead, with `.font-sans` and `.font-mono` written out. Its theme's `--font-jakarta` pointed at itself, so the wrapper keeps next/font's own `--font-jakarta`. The `html`/`body` rules move onto the wrapper divs, and `overflow-x: hidden` on body becomes `clip`, so the div doesn't become a scroll container.
- Without Design Skill added `lucide-react` 1.75. It uses four icons (Check, ChevronLeft, ChevronRight, Layers), all of which exist in the gallery's 0.542, so the gallery's dependency is unchanged.

Source hashes for every file the models changed or added are in `no-skills.source-sha256.json` and `frontend-design.source-sha256.json`.

## Gallery verification

Each original ran on its own production server on t3os next to the production gallery build. All 10 pages were loaded at 1440×1000 and 390×844 with reduced motion, from both. In all 20 pairs, every element with its own text had the same computed font family, size, weight and style on both sides, in the same order. Neither side had page errors, failed requests, broken images or horizontal overflow. The only extra text on the originals is the model's own iteration switcher.

8 of the 20 gallery pages are the same height as the original. The rest are 1 to 71 px shorter, because some text wraps differently. The clearest case is the hero on With Design Skill /3, which takes two lines in the gallery and three in the original. The cause is gallery-wide, not this entry. Every entry's fonts load into one page, and next/font names each face after its font, so the gallery registers dozens to hundreds of faces under each family name (for example 29 for Schibsted Grotesk and 270 for Newsreader, against 2 to 6 in the original), many of them static cuts with slightly different metrics. That is the same font collision the Cursor runs' [verification](cursor/README.md#gallery-verification) found with Fraunces and Space Grotesk, and it's left for its own change.

The complete Playwright suite passed (565 tests) against the final production build, including the route smoke tests for the 10 Neon pages. `npm run lint` reports 209 errors, the same count as master, and nothing in the new or changed files.
