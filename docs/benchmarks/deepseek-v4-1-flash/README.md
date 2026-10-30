# DeepSeek V4.1 Flash in the Cursor CLI, 2026-10-29

DeepSeek V4.1 Flash is the first DeepSeek model in the gallery. Cursor is the only harness here that offers it, as `deepseek-v41-flash-1017` at none, low, medium, high and max reasoning. Dara picked High, which matches the Gemini 4 Argon Cursor entries. Four sessions ran at the same time on the Windows PC: the three frontend conditions and one motion session. Each condition has its prompt, final reply where there was one, and source file hashes in this folder. [provenance.json](provenance.json) records every session.

## Setup

The harness is the one the Gemini 4 Argon taste-skill v2 run used ([../taste-skill-v2](../taste-skill-v2)): cursor-agent 2026.10.19-6bbf2c4 headless, `--print --output-format stream-json --model deepseek-v41-flash-1017-high --force --approve-mcps --trust --sandbox disabled`. Each session had its own home folder holding only a copy of Cursor's CLI login, and a PATH limited to PowerShell 7 (with profiles off), Node.js and Git. Cursor syncs the account's marketplace plugins into any home it runs in. Their nine MCP servers were turned off per workspace, but their skills still show in Cursor's catalog. An unscored preflight listed what the model sees: 14 Cursor built-in skills, 16 plugin skills and the workspace's own skill.

The frontend sessions start from the usual Next.js 16.3.8 starter (`@eeeb008`) with Playwright MCP 0.0.83 as a headless 1440×960 browser. The prompts are the gallery prompts with only the port changed. Skills: Anthropic frontend-design at `anthropics/skills@683bc88` (same SKILL.md as upstream today) and design-taste-frontend at **v2.1.5** (`Leonxlnx/taste-skill@12af471f`). The other v2 cards ran v2.1.4; v2.1.5 came out on October 24 with community fixes, and the standing rule is to use the newest release. The card shows `v2` either way.

Motion used the motion runner's sandbox (`motion:new`) and the current motion prompt, with no MCP server, like the other isolated motion sessions.

Every shell command the model ran went through a Cursor hook that blocks process kills by name, deletes outside the run folder and similar, and asks Claude Haiku about anything unfamiliar. It exists because the Gemini run's `Stop-Process -Name node` stopped every Node process on this PC. Two of its rules were too broad for the first 23 minutes: `format` matched `Format-Table` and ffprobe's `format=duration`, and the path check read `http://localhost` as a drive path. That blocked three harmless commands, which the model reran another way. Both rules were fixed while design-taste and motion were still running. The hook also blocked design-taste from stopping its own Next.js server by PID, because nothing in that process's command line ties it to the run.

## How the sessions ended

Headless cursor-agent went silent at the very end of three of the four sessions. The process stayed alive, with no new output after a shell command or a screenshot read, and before the model's final message. Cursor desktop continues on its own at that point. The CLI doesn't. The run operator (the orchestrating agent, not Dara) ended a session after ten minutes of silence.

| Condition | Model time | How it ended |
| --- | --- | --- |
| Without skills | 12 min + 8 min | Stalled before a final message. Resumed once with "Continue.", which fixed dead nav links, made the email forms submit with a success state, added focus rings and page titles, and stalled again at the same point. No final message. |
| Frontend design | 13 min | Wrote its final summary, then asked an optional "where next?" question through Cursor's AskQuestion tool, which headless mode rejects. Ended there without a resume. |
| Design taste | 90 min + 1 min | Stalled after reading its last inspector screenshot, with the final build done. Resumed once: it restarted its dev server, confirmed the five pages load and stalled after `git status`. No final message. |
| Motion | 38 min | Final reply and exit code 0. |

Model time runs from the start to the last model event, not to when the process was ended. The two "Continue." messages are the only input after each prompt and carry no design feedback. A second resume wasn't sent, because each resume started another polishing round.

## What it made

Without skills, "Cortex": paper and ink, a dark note graph, a product-first page with an app window, loud black type on lime, and a quiet thread line. It checked its pages with the browser (12 screenshots, 40 scripted checks).

Frontend design, "Cairn": a filing-cabinet catalogue, a cyanotype note map, a field ledger, a cobalt and yellow highlighter page, and a working notes window on page 5 with live search. It found and fixed its own bug on page 2, where SVG labels used plain class names against a CSS module. Its summary is in [frontend-design.final.txt](frontend-design.final.txt).

Design taste, "Lattice": five art directions built from photographs it fetched with the skill's asset script (Wikimedia Commons library reading rooms, card catalogues, the British Museum roof, an Olivetti typewriter clip). Credits are on page 5. It never used the browser MCP. It worked through the skill's own headless-Chrome inspector and opened 37 images with Cursor's file reader.

Motion, "noema" in all three: "Constellation" (note cards in a starfield linked into a ring), "Commonplace" (index cards on paper joined by ink lines) and "Signal" (THINK IN LINKS, a graph, then the app's interface). Each has its own generated score. Its reply is in [motion.final.txt](motion.final.txt). One gap in the harness: the run's `PLAYWRIGHT_BROWSERS_PATH` pointed at a Chromium build that didn't match the sandbox's Playwright, so the model installed Chromium inside its sandbox before `node motion.mjs` would run.

## Motion render

`finish.mjs` on the same PC after all sessions ended: contract check, then 1080p60 on the RTX 4070 (ANGLE/D3D11). All three passed and rendered in 39 to 47 s. The runs are recorded as `source: "runner"` with `harnessVersion: "cursor-agent 2026.10.19-6bbf2c4"`, as Kimi K3.1 Pro's OpenCode runs were: an isolated headless session, not a hand-driven chat with personal setup (which is what `manual` means). The motion runner itself doesn't drive Cursor, so the session went through this folder's launcher and `finish.mjs`. Masters, web encodes, previews and posters are on `https://media.whichai.dev/baseline/deepseek-v4.1-flash/`. All 9 hosted files were downloaded back and match the local SHA-256.

## Gallery adaptation

Each condition was imported in its own worktree and checked against the original app running next to it.

- `<html>`/`<body>` became `<div data-source-html>`/`<div data-source-body>`, and every source stylesheet goes through the gallery's scoped copy. Body rules target the inner wrapper so the source's font variables still apply.
- The models' own iteration switchers aren't rendered; the gallery has its own. Their component files stay in the source copy.
- Imports through the source's `@/` alias point into the variant folder, and layout props use a plain `{ children }` type instead of Next's generated `LayoutProps`.
- Without skills: the scoper drops Tailwind's `@theme`, so eight `.font-*` classes are added back as plain rules (as for Gemini 4 Argon), and five inline `animation` names use the scoper's renamed keyframes.
- Frontend design: the brand link `href="/N"` points at the gallery route.
- Design taste: the 9 media files moved to `/variants/with-taste-skill/deepseek-v4-1-flash/` (largest 1.9 MB). A short block restores browser defaults that the gallery's base styles change (letter-spacing on form controls, button appearance, range input margins, inline SVG and image alignment). Without it pages 3 to 5 came out 2 to 7 px shorter.

Results: without skills matches the original on heading, h1 font and size, page height and overflow at 1440 and 390 on all five pages. Frontend design is pixel-identical with both switchers hidden and the page 4 marquee frozen. Design taste matches on all of those except one thing: the original sets `scrollbar-gutter: stable both-edges` on `html`, which leaves a 15 px strip on each side on Windows desktop. In the gallery that rule lands on a div that doesn't scroll. Reproducing it would mean changing the gallery's own root. Phones and macOS overlay scrollbars, so there it makes no difference.

## Cost

Unknown. cursor-agent printed no usage and the logs have no token fields, so the cards show no cost. Cursor's usage export for the four chats in [provenance.json](provenance.json) would fill it in.

## Not archived

The original projects aren't uploaded anywhere. They stay on the PC (`E:\w\deepseek-v41\<condition>\work` and the motion run folder), and `*.source-sha256.json` record every file.
