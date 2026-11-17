# GPT-6.2 Astra

Three frontend runs (Without Design Skill, With Design Skill, With Taste Skill) and one Motion run on 2026-11-17, all with `gpt-6.2-astra` at xhigh reasoning through the Codex CLI 0.169.0. The frontend runs ran headless on t3os (Ubuntu 26.04); the Motion run ran on the Windows PC through the usual runner (`npm run motion:run`), like every other model's.

## Prompts and source

The prompts are the gallery prompt with only the port changed (3421, 3422, 3423), saved next to this file. Each workspace is a fresh copy of the usual Next.js 16.3.8 / React 19.2.8 starter (`@eeeb008`, the same tarball as the Fable 5.2 runs, lockfile SHA-256 `ce550054…cb915`), with the condition's skill in Codex's project skill folder, `.agents/skills/<name>`, and a baseline commit. The frontend-design `SKILL.md` is the one the Fable 5.2 and Gemini 4 Carbon runs used. The taste skill is tasteskill 2.5.1, the copy the Fable 5.2 taste run used; all 1,633 of its files match that run's hash list. The taste cards label it v2, as they do every 2.x run. [provenance.json](provenance.json) has the exact argv, environment and hashes.

## Isolation

Each session had a fresh `HOME` and `CODEX_HOME` holding only a copy of the Codex ChatGPT login and a config with one MCP server, the browser. Codex ran with bundled skills, skill search, ChatGPT apps, plugins, tool suggestions and memories off. Codex 0.169 also ships its own browser and computer use, which the earlier Codex runs didn't have; both were off, so the browser was Playwright MCP 0.0.83 (isolated headless Chromium 1247, 1440×960, screenshots returned to the model), as in every earlier gallery run. Shell, patches, web search, image generation and subagents stayed on.

The box adds its own instructions to every Codex session through `/etc/codex/managed_config.toml`, and a `-c developer_instructions=""` override doesn't outrank it. An unscored preflight showed this: the session's rollout file held the box's rules, while the model said no extra instructions had loaded. Sessions therefore ran in a private mount namespace with an empty folder over `/etc/codex` and their own folder over `/tmp`, then as the normal user with only the listed environment. In the scored sessions' rollout files, the developer messages are Codex's built-in ones and the skill catalog lists only the condition's skill (none for Without Design Skill). This is context isolation, not a filesystem jail.

A separate unscored preflight with the taste skill ([preflight.final.txt](preflight.final.txt)) listed one skill and one MCP server, and described the canvas test page correctly from screenshot pixels.

## Sessions

| Condition | Product | Started (UTC) | Time | Requests | Generated images |
| --- | --- | --- | ---: | ---: | ---: |
| Without Design Skill | Daymark | 18:39:56 | 15m 04s | 37 | 6 |
| With Design Skill | Notefold | 18:39:56 | 17m 32s | 38 | 3 |
| With Taste Skill | Foliohm | 18:39:56 | 30m 01s | 78 | 2 |

Each session got one prompt and nothing else, and exited with code 0. The three ran at the same time on one machine, so the times aren't a latency comparison. Codex ran its tools through its code-mode `exec`, so the browser shows up as Playwright scripts (`browser_run_code_unsafe`) rather than one call per click. Without Design Skill and With Design Skill checked their pages in the browser and looked at screenshots. With Taste Skill never called the browser; it used the skill's own headless-Chrome scripts and opened their screenshots with `view_image`, and ran two web searches, which found the Wikimedia Commons landscape credited on /2.

Near the end, Codex's own command check refused each of the first two sessions' cleanup command (`rm -f` on Playwright's log folder). Nothing else was refused. One frontend-design shell command failed with "argument list too long" and the session carried on.

**Discarded before scoring.** The first launch of all three conditions was stopped about a minute in, after the Without Design Skill session listed the box's shared `/tmp`, which held other projects' files. The workspaces were rebuilt from the starter and every session got its own `/tmp` before the scored launch. Two earlier preflights were discarded too (see provenance.json).

## What it made

- **Without Design Skill (Daymark):** five pages built from one `Landing` component, each with its own generated picture: an illustrated alpine valley, a spiral galaxy with linked notes, a clothbound commonplace book, a pinboard collage and a sunlit writing desk. Every page opens the same working notebook (search, editing, saved in the browser) and a field-guide dialog.
- **With Design Skill (Notefold):** an isometric note stack on a yellow-accented page, a sticky-note pinboard, a dark constellation of linked notes, a field journal over a mountain photograph and a bold blue card index. They share one working notebook.
- **With Taste Skill (Foliohm):** a commonplace page with cut-paper collage, a field journal over the Wikimedia landscape, a dark observatory with a note graph, a vermilion card index and a blue-ink daybook. Each page carries one of the skill's scroll moments (iris opens, pinned chapters, liquid type, letters assemble, line carries colour).

The three runs reuse the same ideas: a constellation or graph page, a pinboard, a mountain field journal and a card index appear in two or three of them. The models' own summaries are in the `*.final.txt` files.

## Cost

API-equivalent, at OpenAI's Standard rates for `gpt-6.2-astra` (checked 2026-11-17 on [OpenAI's pricing page](https://developers.openai.com/api/docs/pricing)): $8.00 per million uncached input tokens, $0.40 cached and $40.00 output, doubling input and cache rates above 272K input tokens. No request went over 272K.

| Condition | Input tokens (cached) | Output tokens (reasoning) | Cost |
| --- | --- | --- | ---: |
| Without Design Skill | 2,081,732 (2,008,576) | 31,437 (7,751) | $2.65 |
| With Design Skill | 2,233,972 (2,089,344) | 34,386 (6,340) | $3.37 |
| With Taste Skill | 8,672,971 (8,521,600) | 56,329 (15,577) | $6.87 |

The per-request sums equal each session's own totals. Image generation is billed separately from tokens and isn't priced here. Codex ran on a ChatGPT sign-in, so these are estimates, not charges. [costs.json](costs.json) has the per-request tiers.

## Gallery adaptation

All three: `<html>`/`<body>` become `data-source-html`/`data-source-body` divs, `globals.css` goes through the scoped copy, pictures and fonts move under `/variants/<group>/gpt-6.2-astra/`, the models' design switchers aren't rendered, and the logo links that pointed at `/<n>` point at the gallery route. The gallery renders the same `Landing` component each source's dynamic route renders. Source hashes for every file the models changed or added are in the `*.source-sha256.json` files.

The pages have no Tailwind, while the gallery's Tailwind base styles (in `@layer base`) reset browser defaults these pages relied on. The first gallery build came out 6 to 37 px taller on every Without Design Skill and With Design Skill page: `line-height` went from `normal` to 1.5, form controls grew, and headings lost their default bold (on With Design Skill /5 the computed heading weight went from 700 to 400). With Taste Skill /2 at 390 px came out 32 px shorter, because its chapter list lost the browser's list margin. Each copied `globals.css` now starts with a short block that reverts those properties to the browser's defaults: unlayered, so it beats the gallery's base, and with zero specificity, so every rule of the source's own still wins.

- **Without Design Skill:** the `:root`/`html`/`body` rules move onto the wrapper divs, where the `next/font/local` variables are set; otherwise the body text would fall back to the gallery's font. The source installed `lucide-react` ^1.74; the gallery resolves its own 0.542, which exports every icon used. Icon artwork can differ slightly between those versions.
- **With Design Skill:** the `@font-face` families get an "Astra62 Design" prefix, so other entries' faces with the same names can't stand in for them. The gallery loads every entry's CSS on every route; in the first build, With Design Skill and With Taste Skill shared one "Astra62" prefix, and the taste run's different DM Sans file set /1's heading 10% wider.
- **With Taste Skill:** the same, with an "Astra62 Taste" prefix. The source's layout linked the skill's `motion.css` and loaded its `motion.js` and `moments/moments.js` as module scripts, with a head script that marks `<html>` for the hero entrance. In the gallery, `motion.css` comes in through a scoped copy whose `html` selectors read `[data-source-html]`, and both scripts look up that div instead of `<html>` for the marks they set, and a detached element when no design is showing, so a timer that fires after the visitor has left can't mark the gallery's page (a short change at the top of each, noted there). An inline script sets the hero mark on first load, and `TasteRuntime` starts `init()`/`mountAll()` each time the gallery shows a design and `unmountAll()` when it leaves. The moments' own stylesheets are linked into the page head as the skill does it; their rules only match the moments' own class names. The font preload and the `metadataBase`/OpenGraph lines are dropped.

GPT-6.2 Astra gets its own `gpt-astra` lineage with GPT-6 Astra, so **GPT-6 Astra moves under Show Archived in each section where 6.2 has a card**, as Fable 5.1 did when Fable 5.2 arrived. Sol, Luna and Terra stay where they were.

## Motion

One isolated session through `npm run motion:run -- gpt-6.2-astra` on the Windows PC, from branch `agent/gpt-6-2-astra-bench` with the pinned Codex 0.169.0, 28m 21s of agent time. The runner's Codex settings now also turn off tool suggestions, memories, Codex's built-in browser and computer use (computer use would drive the real desktop of the machine running the session). An unscored probe through the runner's own launch path listed no skills, MCP servers or instruction files.

It named the app "Folio" and made three videos: a California poppy that leads to a lamp idea, a rotating chrome knot linking sound and architecture notes, and an illustrated blue dog that fetches a forgotten colour. It generated two images. All three passed `check` and rendered on the RTX 4070 (30–50 s each). Usage: 5,478,567 input tokens (5,364,736 cached) and 49,457 output tokens (16,354 reasoning); Codex reports tokens, not dollars, so the motion cards show no cost.

## Gallery verification

Each original ran on its own server on t3os (the two Next builds with `next start`, the taste run's static export with `serve`) next to the production gallery build. All 15 pages were captured full-page at 1440×1000 and 390×844, with reduced motion, from both. In all 30 pairs the first heading matches in text, size, weight and rendered width (fonts differ only by the "Astra62 Design"/"Astra62 Taste" prefix), the first paragraph's rendered width matches, page heights are equal, and neither side has page errors, broken images, failed requests or horizontal overflow at 390 px. The only failed request on the gallery side is the gallery's own Greptile sponsor badge. What still differs between the captures is the gallery's iteration rail, the models' design switchers the gallery doesn't render, the image optimizer's re-encode of the generated pictures, and a few pixels in icons from the older `lucide-react`. A computed-style comparison of every element on the Without Design Skill and With Design Skill pages found the Tailwind-base differences described above; with the defaults block, heights, heading weights and line heights match.

In the gallery, with a normal Chrome user agent (motion.js skips the hero entrance for headless captures), the With Taste Skill hero entrance ran on /1 (`is-entering`, then `is-entered`). Moving through /2 to /5 with the gallery's own iteration links mounted each design's moment (pinned-chapters, liquid-type, letters-assemble, line-carries-colour) with no failures, and after leaving for the gallery home, the gallery's `<html>` carried none of the skill's classes or data attributes. Each condition's "Open notebook" button opened its notebook dialog. This checks that the embed is faithful. It is not an aesthetic score.

The complete Playwright suite passed (541 tests) against the final production build, including route smoke tests for all 15 new pages and the v2 card label and picker check, which now covers this entry. `npm run lint` reports 209 errors, the same count as master. The 9 new warnings are in the new files: anonymous default exports in the taste skill's motion scripts and the unrendered switcher function on With Design Skill.

Motion: frames at 2 s, 7.5 s and 13 s of each of the three published videos were checked by eye (1920×1080, 60 fps, H.264 with AAC audio). The videos still have to be uploaded to the `whichai-motion` bucket before the motion cards can play in production.
