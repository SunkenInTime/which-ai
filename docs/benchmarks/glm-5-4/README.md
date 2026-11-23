# GLM 5.4

Two frontend runs (Without Design Skill, With Design Skill) on 2026-11-23, with `glm-5.4` at high reasoning through OpenCode 1.19.6 on Z.ai's GLM Coding Plan, headless on t3os (Ubuntu 26.04). GLM-5.4 came out on 2026-11-23 for Coding Plan subscribers only; it has no pay-as-you-go API, OpenRouter listing or open weights yet. The With Taste Skill run is still going and will be added separately.

## Prompts and source

The prompts are the gallery prompt with only the port changed (3431, 3432), saved next to this file; they match the Kimi K3.1 Pro prompts word for word apart from the port. Each workspace is a fresh copy of the usual Next.js 16.3.8 / React 19.2.8 starter (`@eeeb008`, lockfile SHA-256 `ce550054…cb915`, the same tarball as the GPT-6.2 Astra and Fable 5.2 runs), with the condition's skill in `.agents/skills/<name>` and a baseline commit. The frontend-design `SKILL.md` is the one the Astra runs used. [provenance.json](provenance.json) has the exact argv, environment, hashes and per-attempt token counts.

## Settings

- **Reasoning: high.** GLM-5.4 offers low, high and max. High is what people use day to day and matches the Kimi K3.1 Pro run. A first no-skills attempt at max was stopped after six minutes and isn't scored.
- **Context: 1M tokens**, pinned in the run config.
- **Output cap: 131,072 tokens**, GLM-5.4's own limit. OpenCode caps each response at the smaller of the model's limit and `OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX`, which defaults to 32,000. In the first With Design Skill attempt, one step spent all 32,000 tokens on reasoning while planning the five pages, got cut off with finish reason `length`, and OpenCode ended the session with nothing built. That attempt isn't scored; the condition was rerun from a fresh workspace with the cap raised. Without Design Skill ran under the default cap, but its largest single step was 20,577 tokens, so the cap never cut into it.

## Isolation

Each session had its own `HOME` and XDG folders holding only an OpenCode config: the Z.ai provider (the API key read from a file outside the session's folders), one MCP server, the browser, and OpenCode's built-in `customize-opencode` skill denied, so the condition's skill was the only one listed. OpenCode ran with `--pure` (no external plugins) and `--auto` (every permission approved). The browser was Playwright MCP 0.0.83 (isolated headless Chromium 1247, 1440×960, screenshots returned to the model), as in every earlier gallery run. Sessions ran in a private mount namespace with their own folder over `/tmp`, then as the normal user with only the listed environment.

A file-access trace (`strace`) of an unscored preflight session showed OpenCode opened no instruction files outside the workspace: not the box's `/etc/t3os/AGENTS.md`, not `~/.claude` or `~/.agents`, and no `AGENTS.md` above the workspace. The only rules file it loaded was the starter's own `AGENTS.md`, which every starter-based run gets. This is context isolation, not a filesystem jail.

## Sessions

| Condition | Product | Attempts | Working time | Steps | Tool calls |
| --- | --- | --- | ---: | ---: | ---: |
| Without Design Skill | Axon | original + 1 resume | 61m 20s | 98 | 188 |
| With Design Skill | Slip | original + 1 resume | 59m 54s | 110 | 187 |

Each session got one prompt. Both stopped once on the Coding Plan's 5-hour usage limit ("Usage limit reached for 5 hour") and were continued after the reset in the same OpenCode session with one message, "Continue the original task from the interrupted request.", the message the Kimi K3.1 Pro design-taste run was resumed with. Without Design Skill had built all five pages and was fixing lint and type errors when it stopped; With Design Skill had built all five and was finishing its switcher. Both ended on their own with a final reply ([without](no-skills.final.txt), [with](frontend-design.final.txt)) after a production build, lint, typecheck and a browser pass at desktop and phone widths. Working time adds up the attempts and leaves out the hours waiting for the limit to reset.

**Discarded before scoring** (details in provenance.json): two preflights; the no-skills attempt at max reasoning; a first launch of With Design Skill that made no request because the limit was already reached; the With Design Skill attempt cut off at the 32,000-token default; and a no-skills resume that the runner started with a malformed session argument, which OpenCode refused before any model request.

## What it made

- **Without Design Skill (Axon):** five directions for one product, each with its own palette through shared Tailwind theme tokens: a warm minimal page with highlighter-yellow headline marks, a cream-and-green editorial page with a serif headline and drop caps, a dark page whose hero is an interactive knowledge graph, a playful cream page with thick outlines, stickers and hand-written notes, and a calm page with soft gradients and frosted glass.
- **With Design Skill (Slip):** each page is built on an object from note-taking: manila index cards on an oxblood desk with red threads between linked cards, a canary legal pad whose call to action is an unticked checkbox, a book page with highlights connected to margin notes, a chalkboard graph that draws itself in, and a black-and-white split with a forgetting curve you drag.

## Cost

Not shown. The runs used a Coding Plan subscription, which isn't billed per token, and GLM-5.4 has no published API price to estimate from yet. Token counts per attempt are in provenance.json.

## Gallery adaptation

Both: `<html>`/`<body>` become `data-source-html`/`data-source-body` divs and their rules in `globals.css` move onto those divs, `globals.css` goes through the scoped copy, the models' design switchers aren't rendered, and the logo links that pointed at `/<n>` point at the gallery route.

Both also load their fonts differently. The sources load Google fonts through `next/font/google` (Geist, Geist Mono, Manrope, Instrument Serif, Nunito and Caveat without the skill; Courier Prime, Shantell Sans, Newsreader, Rubik and Archivo with it). In the gallery's webpack build those keep their plain family names, and other entries load the same families, so the first gallery build rendered GLM's text in other entries' static faces: text came out a few pixels narrower, buttons stopped wrapping, and four pages differed in height by 22 to 52 px from the originals ([#81](https://github.com/SunkenInTime/which-ai/pull/81) describes the same problem). Each call is now `next/font/local` with the same CSS variable, weights and styles, pointing at the Latin file the original build was served (in `app/fonts/`, with the OFL notices in `licenses.txt`), and named after GLM 5.4 (`glm54DesignArchivo` and so on), which is the family name next/font/local gives it. Archivo keeps its width axis through `font-stretch: 62% 125%`, as Google declared it. Only the Latin subset is bundled; the pages' text is all Latin.

- **Without Design Skill:** the pages use the source's own Tailwind theme throughout (`bg-ink`, `text-soft`, `border-line`, `font-display`, `animate-marquee` and so on, swapped per page through `[data-iteration]` variables). The gallery strips each source's `@theme`, so these utilities came out missing. Earlier imports wrote such utilities back by hand as plain rules, but this source uses about a hundred of them with hover, breakpoint and opacity variants, and since the gallery's scope adds no specificity, hand-written rules in a separate stylesheet would win or lose against the gallery's own breakpoint utilities by stylesheet order. Instead, [`scripts/compile-variant-tailwind.mjs`](../../../scripts/compile-variant-tailwind.mjs) compiles every utility the source uses with the source's own theme, in Tailwind's order, into `app/tailwind-theme.css`, wrapped in one cascade layer above the gallery's utilities and scoped like any other source stylesheet. Within this entry that layer outranks the gallery's copies of the same utilities, and the CSS modules (unlayered) still outrank it, as in the source. Theme animations are written out in full so the scoper can rename their keyframes. `@/components` and `@/lib` imports point at the copied source. `/1`'s CSS module hid the FAQ's disclosure triangle with `details summary::-webkit-details-marker`, which has no local class: Turbopack applied it as a global rule, the gallery's webpack build refuses it, so it moves to the scoped `globals.css`.
- **With Design Skill:** each page uses its own CSS module, which works unchanged. One line in `app/1/deck.tsx` carries an `eslint-disable` comment: the source's own lint config (eslint-config-next 16.3.8) passes it, the gallery's older config flags a `setState` call inside a layout effect.

Source hashes for every file the models changed or added are in the `*.source-sha256.json` files.

## Gallery verification

Each original ran as a production build with `next start` on t3os, next to the production gallery build. All 10 pages were loaded at 1440×1000 and 390×844 with reduced motion, from the original and from the gallery's preview route. In all 20 pairs the page height, the first heading's size, weight, line height and rendered width, and the first paragraph's width match, and neither side has page errors, failed requests, broken images or horizontal overflow; the only difference in the fonts is the family name. On the pages that differed before the font change (Without Design Skill /2, /4 and /5, With Design Skill /2 to /5), every element inside the page has the same box height and the same computed size, weight, line height, letter spacing, spacing, display and width as in the original. In the gallery itself, the home page shows both entries with a "New · Nov 23" badge, and the gallery's own iteration links move between the designs.

This checks that the embed is faithful. It is not an aesthetic score.

The complete Playwright suite passed (581 tests) against the final production build, including route smoke tests for the 10 new pages and a new-arrival test for GLM 5.4. `npm run lint` reports 209 errors and 253 warnings, the same as master, and nothing in the new files.
