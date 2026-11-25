# SWE-2.1

Three frontend runs (Without Design Skill, With Design Skill, With Taste Skill) on 2026-11-25, with Cognition's SWE-2.1 at xhigh reasoning (`swe-2-1-xhigh`) in Devin CLI 3000.14.30821, headless on t3os (Ubuntu 26.04). SWE-2.1 is listed as Free in `devin models list` for this account, so the runs cost nothing.

## Prompts and source

The prompts are the gallery prompt with only the port changed (3511, 3512, 3513), saved next to this file. They match the GLM 5.4 prompts word for word apart from the port. Each workspace is a fresh copy of the usual Next.js 16.3.8 / React 19.2.8 starter (`@eeeb008`, lockfile SHA-256 `ce550054…cb915`, the same tarball as the GLM 5.4, GPT-6.2 Astra and Fable 5.2 runs), with the condition's skill in `.agents/skills/<name>` and a baseline commit. The skill files are byte-identical to the GLM 5.4 run's. [provenance.json](provenance.json) has the exact argv, token counts and hashes.

## Settings

- **Reasoning: xhigh.** Devin picks the tier through the model id, and SWE-2.1 offers low, medium, high, xhigh and max. A first batch at medium was stopped about eight minutes in when Dara asked for xhigh. Two of its three sessions had already finished, in about five and six minutes. None of it is scored, and the xhigh sessions started from fresh workspaces.
- **Context: 262K tokens**, Devin's limit for SWE-2.1. With Taste Skill reached it 13 minutes in, and Devin summarized the conversation once and kept going.
- **Screenshots: SWE-2.1 sees them.** In an unscored check, it described a canvas-only test page (blue background, yellow circle, the word KESTREL) from a Playwright screenshot alone. SWE-2 Flash couldn't do that in the same harness. In the scored runs it took 12 to 17 screenshots per session.

## Isolation

Each session had its own `HOME` and XDG folders holding only a copy of the Devin login, a Devin config, one MCP server and a machine-only plugin whose manifest forbids every other plugin. The config turns off Devin's imports from Cursor, Windsurf, Claude Code, Copilot, Codex, Kiro, OpenCode, Zed and Devin Cloud. `agents_standard` stays on so the starter's `AGENTS.md` and the condition's `.agents/skills` load, as in the SWE-2 Flash run. The MCP server was Playwright MCP 0.0.83 (isolated headless Chromium 1247, 1440×960, screenshots returned to the model), as in every earlier gallery run.

Sessions ran in a private mount namespace with their own folder over `/tmp` and an empty read-only folder over `~/.claude`, `~/.agents`, `~/.cursor`, `~/.gemini`, `~/.codex`, `/etc/claude-code` and `/etc/codex`. They then ran as the normal user with only the listed environment, and with `--process-model in-process`, so no shared Devin daemon served them.

Before the runs, `devin skills list`, `rules list`, `mcp list` and `plugins list` in each condition showed Devin's three built-in skills (devin-cli, declarative-repo-setup, upload-secrets) plus the condition's skill, the starter's `AGENTS.md`, the playwright server and the lockdown plugin. The account also loads an uploaded plugin called `default`. It has no skills, agents, hooks, rules or MCP servers. Three unscored preflight sessions listed the same skills and rules files. A file-access trace of one showed Devin opened nothing in the home folder outside the run and nothing in `/etc/t3os`. This is context isolation, not a filesystem jail.

## Sessions

| Condition | Product | Working time | Steps | Input tokens (cached) | Output tokens |
| --- | --- | ---: | ---: | ---: | ---: |
| Without Design Skill | Engram | 13m 23s | 120 | 9.43M (9.31M) | 49.2K |
| With Design Skill | Commonplace | 28m 22s | 111 | 9.75M (9.61M) | 58.0K |
| With Taste Skill | Notomind | 23m 39s | 116 | 10.33M (10.11M) | 53.5K |

All three ran at once, got one prompt each, and ended on their own with a final reply ([without](no-skills.final.txt), [design skill](frontend-design.final.txt), [taste skill](design-taste.final.txt)) after a production build, lint and a browser pass at desktop and phone widths. With Design Skill and With Taste Skill both invoked their skill first. With Taste Skill also ran the skill's own layout checker, copy lint and consistency audit against its pages. Its session export only holds the steps after the context summary, so its tool counts in provenance.json leave out the first 13 minutes. Devin's saved transcript of those minutes shows the skill invocation.

## What it made

- **Without Design Skill (Engram):** a dark knowledge-graph page, a warm paper notebook page with a serif headline, a loud brutalist "Total recall" page in lime and black, a soft pastel page, and a dark terminal-style "memory console".
- **With Design Skill (Commonplace):** an annotated manuscript with paper slips, a memory palace drawn as a floor plan, a night-sky constellation map, a graph-paper field notebook with tape, and a mycelium network that grows notes. It set the type in URW base35 fonts (P052, C059, Nimbus Narrow, URW Gothic, URW Bookman, Nimbus Mono) copied from the box's system font folder, with their copyright file.
- **With Taste Skill (Notomind):** five takes on one product site with the same structure: a pink-accented graph page, a salmon page with tilted note cards, a blue "answers from your sources" page, a dark recall queue in orange, and a writing-desk page in navy. Each uses its own typeface (Geist, Epilogue, Instrument Sans, Chivo, Manrope) with JetBrains Mono.

## Gallery adaptation

All three: `<html>`/`<body>` become `data-source-html`/`data-source-body` divs, and their rules in `globals.css` (with `:root`) move onto those divs. `globals.css` goes through the scoped copy, `@/` imports point at the copied source, and the models' iteration switchers aren't rendered.

- **Without Design Skill:** the switcher lived in the root layout and isn't rendered there. The logo links that pointed at `/<n>` point at the gallery route. The source's `@theme` maps `font-sans` and `font-mono` to Geist and Geist Mono, which the scoper strips, so those two utilities are written out in the scoped `globals.css`. Geist and Geist Mono load through `next/font/local` from the Latin files the original `next/font/google` build served, under SWE-2.1 family names and without preload, as in the GLM 5.4 import.
- **With Design Skill:** the source serves all five pages and its switcher from `app/[iteration]/page.tsx`, so the gallery wrapper renders the five design components directly. The fonts move to `public/variants/with-design-skill/swe-2.1/fonts` and the `@font-face` URLs point there.
- **With Taste Skill:** the source serves all five from `app/[variant]/page.tsx`, so the gallery wrapper renders `<LandingPage variant={n} />` directly. The iteration dock inside `LandingPage` is turned off with a constant. The six Google fonts load through `next/font/local` from the Latin files the original build served, under SWE-2.1 family names and the source's CSS variables, without preload. The OFL notices are in `app/fonts/licenses.txt`.

Source hashes for every file the models changed or added are in the `*.source-sha256.json` files.

## Gallery verification

Each original ran as a production build with `next start` on t3os, next to the production gallery build. All 15 pages were loaded at 1440×1000 and 390×844 with reduced motion, from the original and from the gallery's preview route. In all 30 pairs:

- the page height and the first heading's size, weight, line height, letter spacing and box match;
- the first paragraph's box matches;
- every text element renders in the same font family as in the original, apart from the renamed families and the original's closed switcher button;
- neither side has page errors, failed requests, broken images or horizontal overflow.

Full-page screenshots at 1440 wide, with animations off and the originals' switchers hidden, are pixel-identical for all 15 pages. In the gallery, every animated element checked points at a keyframe that exists after scoping. The home page shows SWE-2.1 first in all three groups with a "New · Nov 25" badge.

This checks that the embed is faithful. It is not an aesthetic score.
