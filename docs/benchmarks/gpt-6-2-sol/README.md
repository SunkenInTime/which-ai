# GPT-6.2 Sol

Three frontend runs (Without Design Skill, With Design Skill, With Taste Skill) on 2026-11-18 and three Motion sessions on 2026-11-17/18, all with `gpt-6.2-sol` at xhigh reasoning through the Codex CLI 0.169.0. The frontend runs ran headless on t3os (Ubuntu 26.04); the Motion sessions ran on the Windows PC through the usual runner (`npm run motion:run`), like every other model's. The setup is the one the GPT-6.2 Astra runs used ([../gpt-6-2-astra](../gpt-6-2-astra/README.md)), with only the model and ports changed.

## Prompts and source

The prompts are the gallery prompt with only the port changed (3431, 3432, 3433), saved next to this file. Each workspace is a fresh copy of the usual Next.js 16.3.8 / React 19.2.8 starter (`@eeeb008`, the same tarball as the Fable 5.2 and GPT-6.2 Astra runs, lockfile SHA-256 `ce550054…cb915`), with the condition's skill in Codex's project skill folder, `.agents/skills/<name>`, and a baseline commit. The frontend-design `SKILL.md` is the one the Fable 5.2, Gemini 4 Carbon and GPT-6.2 Astra runs used. The taste skill is tasteskill 2.5.1, the copy the Fable 5.2 taste run used; all 1,633 of its files match that run's hash list. The taste cards label it v2, as they do every 2.x run. [provenance.json](provenance.json) has the exact argv, environment and hashes.

## Isolation

The same as GPT-6.2 Astra's. Each session had a fresh `HOME` and `CODEX_HOME` holding only a copy of the Codex ChatGPT login and a config with one MCP server, the browser (Playwright MCP 0.0.83, isolated headless Chromium 1247, 1440×960, screenshots returned to the model). Bundled skills, skill search, ChatGPT apps, plugins, tool suggestions, memories, Codex's built-in browser and computer use were off; shell, patches, web search, image generation and subagents stayed on. Sessions ran in a private mount namespace with an empty folder over `/etc/codex` (which holds the box's own Codex instructions) and their own folder over `/tmp`, then as the normal user with only the listed environment. This is context isolation, not a filesystem jail.

An unscored preflight with the taste skill ([preflight.final.txt](preflight.final.txt)) listed one skill and one MCP server, and described the canvas test page correctly from screenshot pixels; its rollout file holds no box or personal instructions. In the scored sessions' rollout files, the developer messages are Codex's built-in ones and the skill catalog lists only the condition's skill (none for Without Design Skill).

## Sessions

| Condition | Product | Started (UTC) | Time | Requests | Generated images |
| --- | --- | --- | ---: | ---: | ---: |
| Without Design Skill | Morrow | 01:41:01 | 15m 02s | 35 | 5 |
| With Design Skill | Morrow | 01:41:01 | 20m 42s | 42 | 3 |
| With Taste Skill | Veybrin | 01:41:01 | 32m 37s | 90 | 2 |

Each session got one prompt and nothing else, launched once, and exited with code 0. The three ran at the same time on one machine, so the times aren't a latency comparison. Without Design Skill and With Design Skill checked their pages in the browser (mostly through Playwright scripts, `browser_run_code_unsafe`) and looked at screenshots. With Taste Skill never called the browser; it used the skill's own headless-Chrome scripts, and ran two web searches. Its final message opens with `GATE: OPEN`: the skill's design audit still listed eight findings on /1 when it stopped.

## What it made

- **Without Design Skill (Morrow):** five pages from one `Landing` component, each with its own generated picture: editorial type with a cobalt paper sculpture, a dark page around a glowing knowledge graph, a botanical collage of linked notes, bold orange type with a paper inbox, and a lavender page with a workspace preview. Each page has an editable demo that lasts until reload.
- **With Design Skill (Morrow):** Signal (luminous artwork and floating notes), Field Notes (scrapbook), Atlas (a clickable map of linked notes), After Hours (dark and search-first) and Commonplace (a library of sample collections). Demo notes are saved in the browser and searchable from every design.
- **With Taste Skill (Veybrin):** Field notes, Mind map, Scratchpad, The index and Recall, each carrying one of the skill's scroll moments (pinned chapters, cursor spotlight, word highlight, marquee row, line carries colour). Its preview lets you write, link and search notes, saved in the browser across all five.

Both Without Design Skill and With Design Skill named the app Morrow, and so did the Motion session. The models' own summaries are in the `*.final.txt` files.

## Cost

API-equivalent, at OpenAI's Standard rates for `gpt-6.2-sol` (checked 2026-11-18 on [OpenAI's pricing page](https://developers.openai.com/api/docs/pricing)): $2.00 per million uncached input tokens, $0.10 cached and $10.00 output, with long-context rates above 272K input tokens. No request went over 272K.

| Condition | Input tokens (cached) | Output tokens (reasoning) | Cost |
| --- | --- | --- | ---: |
| Without Design Skill | 1,894,549 (1,791,488) | 30,731 (5,855) | $0.69 |
| With Design Skill | 2,680,457 (2,575,872) | 34,491 (6,998) | $0.81 |
| With Taste Skill | 14,337,523 (14,096,256) | 66,298 (19,958) | $2.56 |

Image generation is billed separately from tokens and isn't priced here. Codex ran on a ChatGPT sign-in, so these are estimates, not charges. [costs.json](costs.json) has the per-request tiers.

## Gallery adaptation

The same adaptation as GPT-6.2 Astra's: `<html>`/`<body>` become `data-source-html`/`data-source-body` divs, the source CSS goes through scoped copies, pictures and fonts move under `/variants/<group>/sol-6-2/`, the models' design switchers aren't rendered, and the gallery renders the same component each source's dynamic route renders. The Without Design Skill wordmark link that pointed at `/<n>` points at the gallery route. Each copied `globals.css` starts with the block that reverts the gallery's Tailwind base resets to browser defaults, and the `@font-face` families get a "Sol62 Plain", "Sol62 Design" or "Sol62 Taste" prefix so other entries' faces with the same names can't stand in for them. Source hashes for every file the models changed or added are in the `*.source-sha256.json` files.

- **With Taste Skill:** the source's layout loaded the skill's `motion.css`, `motion.js` and `moments/moments.js`, with a head script that marks `<html>` for the hero entrance (`m-enter`, `mo-js`, then `m-enter-done` and `mo-safe`). The gallery copy uses the same changes as GPT-6.2 Astra's: the scoped `motion.css`, the same short patch at the top of both scripts so they mark `[data-source-html]` (or a detached element when no design is showing) instead of the gallery's `<html>`, an inline script for the first-load marks, and `TasteSkillRuntime`, which starts and tears down each design's moments and keeps only that design's moment stylesheets on. `TasteSkillRuntime` used to be GPT-6.2 Astra's own `TasteRuntime.tsx`; it now lives in `src/components/gallery/taste-skill-runtime.tsx` and takes the entry's assets folder, and both entries use it.

GPT-6.2 Sol gets a `gpt-sol` lineage with Sol 6.1, so **Sol 6.1 moves under Show Archived in all three sections**, as GPT-6 Astra did when GPT-6.2 Astra arrived. The v2 card label test now opens every archived fold, because Sol 6.1's taste entry is a v2 entry under a newer model.

## Motion

`npm run motion:run -- gpt-6.2-sol` on the Windows PC, with the same runner settings as GPT-6.2 Astra's. A model's published videos always come from one session. Running the runner again gives a model a new session until one makes all its videos, and a new session replaces the published set when it has at least as many good videos. It took three sessions; running the third was Dara's call:

| Session | Agent time | Video 1 | Video 2 | Video 3 |
| --- | ---: | --- | --- | --- |
| 1 | 20m 23s | ok | failed the determinism check | ok |
| 2 | 15m 54s | failed the determinism check | failed the determinism check | ok |
| 3 (published) | 22m 13s | ok | ok | ok |

The determinism check renders a frame, reloads the page and renders it again; the failures had parts of the 7.5 s frame come out different (from 51 to 7,773 of 8,160 16 px areas). Session 2 kept session 1's videos; session 3 replaced them.

Session 3 named the app Morrow, like the frontend runs. Video 1 is a lime product tour (capture a note, search for it, open it) ending on a dark Morrow card with a four-leaf mark. Video 2 is a greenhouse with nasturtiums in editorial serif type: a photo becomes linked notes, then a garden plan, ending on "Give ideas room to grow." Video 3 is an indigo knowledge graph: scattered notes link up around "Kyoto" and become a weekend plan, ending on a pale lavender Morrow card. Usage: 4,463,653 input tokens (4,356,608 cached) and 43,425 output tokens (9,769 reasoning); Codex reports tokens, not dollars, so the motion cards show no cost.

## Gallery verification

Each original ran on its own server on t3os next to the production gallery build. All 15 pages were captured full-page at 1440×1000 and 390×844, with reduced motion, from both. In all 30 pairs the first heading matches in text, size, weight and rendered width (fonts differ only by the "Sol62 …" prefix), the first paragraph's rendered width matches, page heights are equal, and neither side has page errors, broken images, failed requests or horizontal overflow at 390 px, apart from the gallery's own Greptile sponsor badge. This checks that the embed is faithful. It is not an aesthetic score.

In the gallery, with a normal Chrome user agent (motion.js skips the hero entrance for headless captures), the With Taste Skill hero entrance ran on /1 (`is-entering`, then `is-entered`). Moving /1 → /2 → /3 → /4 → /5 → /1 with the gallery's own iteration links mounted each design's moment with no failures, and each time only that moment's stylesheet was on. Scrolling /1's pinned chapters moved the highlight from chapter to chapter. After leaving for the gallery home, including leaving /3 before its 2.5 s timer fired, the gallery's `<html>` carried none of the skill's classes or data attributes and no moment stylesheet was on. "Open demo" (Without Design Skill) and "Try the demo" (With Design Skill) open their demo dialogs; "Open workspace" (With Taste Skill) scrolls to the page's workspace section, as in the original. No page errors or failed requests along the way. On the gallery home each section shows a Sol 6.2 card with the New badge and its cost, and Sol 6.1 shows only under Show Archived.

The complete Playwright suite passed (555 tests) against the final production build, including route smoke tests for all 15 new pages and the v2 card label and picker check, which now covers this entry. `npm run lint` reports 209 errors, the same count as master. The 10 new warnings are in the new files: anonymous default exports in the taste skill's motion and moment scripts, and the unrendered switchers on With Design Skill and With Taste Skill.

Motion: one frame per second of each of the three published videos was checked by eye (1920×1080, 60 fps, H.264 with AAC audio).
