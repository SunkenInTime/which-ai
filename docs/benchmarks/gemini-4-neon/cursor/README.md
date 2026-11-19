# Gemini 4 Neon in the Cursor CLI

Two frontend runs on 2026-11-19 (UTC): Without Design Skill and With Design Skill (Anthropic frontend-design), with Gemini 4 Neon at Extra High reasoning (`gemini-4-neon-xhigh`) in the headless Cursor CLI, cursor-agent 2026.11.17-f532c45, on t3os (Ubuntu 26.04). Google released Neon on 2026-11-18. Cursor offers it at low, medium, high and xhigh; Dara picked xhigh, Neon's top level and the level the GPT-6.2 and Claude entries run at. Argon and Carbon ran at High, their highest level, so the Gemini 4 cards aren't a like-for-like reasoning match. The taste-skill and motion runs will come later.

## Prompts and source

The prompts are the gallery prompt with only the port changed (3451, 3452), saved next to this file. Each workspace is a fresh copy of the usual Next.js 16.3.8 / React 19.2.8 starter (`@eeeb008`, the same tarball as the Fable 5.2, GPT-6.2 Astra and GPT-6.2 Sol runs, lockfile SHA-256 `ce550054…cb915`) with a baseline commit. The With Design Skill workspace has the frontend-design `SKILL.md` that the Fable 5.2, Gemini 4 Carbon, GPT-6.2 Astra and GPT-6.2 Sol runs used, at `.agents/skills/frontend-design`. [provenance.json](provenance.json) has the exact argv, environment and hashes.

## Isolation

Each session had its own home folder holding only a copy of the Cursor CLI login, and ran under `env -i` with a short PATH. It ran in a private mount namespace with an empty folder over `/etc/codex` and `/etc/claude-code` (the box's own agent instructions) and its own folder over `/tmp`. The browser was the same Playwright MCP setup as the GPT-6.2 runs: Playwright MCP 0.0.83, isolated headless Chromium 1247, 1440×960, screenshots returned to the model.

cursor-agent copies the account's marketplace plugins into any home it runs in, as it did for DeepSeek V4.1 Flash. Their ten MCP servers needed sign-in, and were also turned off in both workspaces with `cursor-agent mcp disable`. Their skills (Slack, ElevenLabs, Supabase, Granola and others; none are design skills) and plugin subagents still show in Cursor's catalog. Neither scored session read any file outside its workspace.

An unscored preflight ([prompt](preflight.prompt.txt), [reply](preflight.final.txt)) listed the workspace's frontend-design skill, Cursor's built-in skills, the plugin skills, the browser as the only working MCP server, and no personal, user-level or box instructions beyond the starter's `AGENTS.md` and `CLAUDE.md` and Cursor's own developer prompt. It described the canvas test page from screenshot pixels. This is context isolation, not a filesystem jail.

## Sessions

| Condition | Product | Started (UTC) | Model time | Browser use | Instruction files read |
| --- | --- | --- | ---: | --- | --- |
| Without Design Skill | Noema | 01:27:50 | 14m 08s | 4 navigations, 17 screenshots, 8 clicks | none |
| With Design Skill | Cairn | 01:27:50 | 15m 07s | 15 navigations, 23 screenshots, 6 scripted checks | `frontend-design/SKILL.md` |

Each session got one prompt and nothing else. They ran at the same time on one machine, so the times aren't a latency comparison. Model time runs from the start to the last model event.

Both sessions ended the way three of the four DeepSeek V4.1 Flash sessions did: headless cursor-agent went silent before the model's final message. Each had built the pages, run a production build and lint (both passing), fetched /1 to /5, marked its last to-do done and run `git status`. Then nothing more came for 10 minutes, and the run operator (the orchestrating agent, not Dara) ended the process. Neither was resumed: both had finished their own checks, and in the DeepSeek run a resume started another round of polishing. So there are no final replies in this folder.

## What it made

- **Without Design Skill (Noema):** five editions from one `Iteration*` component each: an editorial paper page with a Zettelkasten note reader, a dark "neural operating system" with a constellation graph, a Swiss-grid page in black and orange, a calm "mind garden" in greens and Fraunces italics, and a tactile studio of sticky-note cards on a dot grid.
- **With Design Skill (Cairn):** a drafting desk (a draft with related notes beside it), a botanical archive with a memory map, an index drawer of linked cards, a cobalt studio with a quick-capture window, and a reading room where clicking a sentence clips it into a note.

Cairn is also what Gemini 4 Carbon and DeepSeek V4.1 Flash named their With Design Skill apps.

## Cost

Unknown. cursor-agent only reports a session's token usage in its final result event, which neither stalled session wrote. The Cursor dashboard's usage list for this account shows nothing after 2026-10-31: on The X Subscription, third-party models such as Gemini are paid from prepaid credit managed at grok.com, which the CLI login can't read. The cards show no cost. For scale, the preflight used 37,114 input tokens, 52,994 cached and 6,824 output.

## Gallery adaptation

The same adaptation as Gemini 4 Carbon's:

- `<html>`/`<body>` become `data-source-html`/`data-source-body` divs, `globals.css` goes through the scoped copy, the layout takes a plain `{ children }` type instead of Next's generated `LayoutProps`, and the model's iteration switcher isn't rendered (the gallery has its own). Imports through `@/components/` point into the variant folder.
- The gallery strips Tailwind's `@theme`, which held the models' font utilities (`font-editorial`, `font-organic`, `font-mono` and others without the skill; `font-newsreader`, `font-fraunces` and others with it). They're written out as plain rules in `globals.css`, and the `html`/`body` rules move onto the wrapper divs. Without Design Skill's `overflow-x: hidden` on body becomes `clip` on its wrapper, so the div doesn't become a scroll container.

Source hashes for every file the models changed or added are in `no-skills.source-sha256.json` and `frontend-design.source-sha256.json`.

## Gallery verification

Each original ran on its own production server on t3os next to the production gallery build. All 10 pages were captured full-page at 1440×1000 and 390×844, with reduced motion, from both. In all 20 pairs the first heading matches in text, font family, weight and size, with no page errors, failed requests, broken images or horizontal overflow on the gallery side.

Rendered text widths first differed by 1–7%. The gallery builds with webpack and patches `next/font` to fetch Google's TTF response, so every `next/font` entry gets full TTF files where the originals (built with Turbopack) get WOFF2 subsets. Rebuilding copies of the originals with webpack and the same patch closed most of that: 14 of the 20 pairs then match exactly in heading width, paragraph width and page height. The rest:

- **Fraunces headings** (Without Design Skill /4 and With Design Skill /2, both widths). Two older entries, Mistral Large 4 and Muse Wonder 1.0, load Fraunces from Google Fonts with a global `@import`. Their variable face (with the optical-size axis) replaces every other entry's `next/font` Fraunces across the gallery, so these headings render in Fraunces' narrower display cut and wrap differently: "it." moves up a line on With Design Skill /2, which makes the page 60 px shorter at 1440. This affects every gallery entry that uses Fraunces through `next/font`, not only Neon, so it's left for its own change.
- **Without Design Skill /2** (both widths): 8 px taller in the gallery. The nav's Space Grotesk comes from another entry's global Google Fonts import the same way, and sits about 2 px off.

The complete Playwright suite passed (565 tests) against the final production build, including route smoke tests for the 10 new pages. In an earlier full run, one existing test (the gallery shell keeping its dark background after opening a Fable 5.2 page) timed out waiting for the click to navigate. It passed in five reruns on its own and in the final full run. `npm run lint` reports 209 errors, the same count as master, and nothing in the new or changed files. On the gallery home, With Design Skill and Without Design Skill each show a Gemini 4 Neon card with the New badge, first in its section, and Gemini 4 Carbon and Argon stay visible: Neon has its own archive family.

## Not archived

The original projects aren't uploaded anywhere. They stay on t3os under `~/Code/bench-neon/<condition>/work`, and the `*.source-sha256.json` files record every file.
