# Gemini design skill

Google published a frontend design skill, [gemini-frontend-design](https://github.com/google-gemini/demolab/tree/cd0c1f8540c0186ec9592af972a0700fa20909d4/skills/gemini-frontend-design) (google-gemini/demolab, v1.0.0, one `SKILL.md`, copied here as [gemini-frontend-design.SKILL.md](gemini-frontend-design.SKILL.md)). These runs try it on four models with the gallery prompt, and add a new home-page section, **With Gemini Design Skill**, next to Anthropic's design skill and the taste skill.

The skill asks for one committed visual direction drawn from the subject, at most two font families and three body sizes, no eyebrow labels, badges or numbered headings, one primary button per section, generated pictures where a tool exists, and a screenshot pass at desktop and 390×844 before finishing.

All four ran on 2026-11-24 on t3os (Ubuntu 26.04), each from a fresh copy of the usual Next.js 16.3.8 / React 19.2.8 starter (`@eeeb008`, lockfile SHA-256 `ce550054…cb915`) with the skill in the harness's project skill folder and a baseline commit. The prompt is the gallery's design-skill prompt with the skill name changed to `gemini-frontend-design` and its own port (3441–3444). Each session got that one prompt and nothing else, and ended on its own. [provenance.json](provenance.json) has the exact argv, environment and hashes; [runner/](runner/) has the scripts (on t3os they lived in `~/Code/bench-gemini-skill/bin`).

## Harnesses

Each model ran in the harness people use it in, with the same browser as every earlier gallery run: Playwright MCP 0.0.83 with isolated headless Chromium 1247 at 1440×960, screenshots returned to the model.

| Model | Harness | Reasoning | Sign-in |
| --- | --- | --- | --- |
| Opus 5.5 | Claude Code 2.1.331, headless | `--effort high` | the box's claude.ai login |
| Fable 5.2 | Claude Code 2.1.331, headless | `--effort high` | Dara's CLIProxyAPI hub on the box |
| GPT-6.2 Astra | Codex CLI 0.172.0, headless | `xhigh` | the box's Codex ChatGPT login |
| Gemini 4 Neon | Antigravity CLI 1.5.14 over ACP, headless | thinking `high` | T3's Antigravity sign-in |

- **Fable 5.2 went through the proxy.** The box's own Claude login had used its weekly Fable limit (a check run got `usage_limit_reached`, resetting Nov 28), and Dara asked for the run to go through their CLIProxyAPI hub. Claude Code pointed `ANTHROPIC_BASE_URL` at the hub and read the hub's key with `apiKeyHelper`. The model, effort, tools and isolation are the same as Opus's.
- **Version changes from earlier runs of these models.** Codex is 0.172.0; the earlier GPT-6.2 Astra runs used 0.169.0, which is no longer installed. Antigravity updated itself from the 1.4.5 ACP server the earlier Neon runs used to the 1.5.14 CLI, started the way T3 now starts it (`antigravity acp --gemini-dir … --app-data-dir antigravity-acp`). Earlier Neon runs used thinking `xhigh`; this one used `high` as asked.

## Isolation

Each session ran in a private mount namespace with empty folders over `/etc/codex` and `/etc/claude-code` (the box's own agent instructions), read-only empty folders over Dara's `~/.claude`, `~/.agents` and `~/.gemini`, and its own folder over `/tmp`, then as the normal user under `env -i` with its own `HOME` holding only a copy of its sign-in. This is context isolation, not a filesystem jail.

The user-folder mounts came out of the first unscored Opus check run: it loaded Dara's personal `~/.claude/CLAUDE.md`. Claude Code reads `.claude/CLAUDE.md` in every folder above the workspace, and the workspaces sit under `/home/dara`. That same run also listed Dara's claude.ai skills, which Claude Code 2.1.331 syncs unless the user settings say `syncClaudeAiSkills: false` (the `CLAUDE_CODE_SYNC_*` variables the earlier Claude runs used no longer stop it). Both Claude sessions' settings now turn skill and plugin sync off. The repeat check listed only `gemini-frontend-design` plus Claude Code's built-in `design`, `doctor` and `plugin-authoring`, and no instructions beyond the starter's `CLAUDE.md`/`AGENTS.md`.

Each harness had an unscored check run ([prompt](preflight.prompt.txt)) that listed its skills, tools and instructions and described a canvas test page from screenshot pixels. All four passed. Astra's session file shows only Codex's built-in developer messages and one skill. Neon listed Antigravity 1.5's built-in skills (`agy-customizations`, `antigravity-guide`, `run-workflow`, `swarm_monitor`, `swarm_pane`) next to `gemini-frontend-design`; none of them exist as files in the workspace or home.

## Sessions

| Model | Product | Started (UTC) | Time | Helpers | Browser use | Generated pictures | API-equivalent cost |
| --- | --- | --- | ---: | --- | --- | ---: | ---: |
| Opus 5.5 | Kept | 19:06:07 | 15m 33s | 5, one per page | 70 calls, 31 screenshots | none (no tool) | $9.12 |
| Fable 5.2 | Engram | 19:36:34 | 29m 06s | none | 133 calls, 50 screenshots | none (no tool) | $11.19 |
| GPT-6.2 Astra | Folio | 19:06:07 | 14m 19s | none | 7 Playwright scripts | 2 | $2.15 |
| Gemini 4 Neon | Cairn | 19:06:07 | 10m 53s | 3, which made the pictures | 3 Playwright scripts | 9 (6 used) | $1.47 |

Opus, Astra and Neon ran at the same time on one machine, and Fable started 30 minutes later, so times aren't a latency comparison. Every session exited with code 0 after its own checks (production build, lint and a browser pass for all four). The models' own summaries are in the `*.final.txt` files.

- **Opus 5.5** wrote a shared switcher, then started five forked helpers, one per page, and fixed what their screenshots showed (lines through labels on /2 and /4, a clipped word on phones, late reveals on /5). One helper's shell heredoc was refused by Claude Code's command check; the helper wrote the files another way. No other tool call was refused.
- **Fable 5.2** did everything in its main thread: 214 turns, 50 browser screenshots at both widths.
- **GPT-6.2 Astra** generated a 2×2 contact sheet and one more picture with Codex's image tool, cut them into the eight pictures the pages use, and downloaded its two fonts from Google Fonts.
- **Gemini 4 Neon** used three subagents to generate nine pictures and used six. Its /5 adds JetBrains Mono as a third family, which the skill says not to do.

Costs are API-equivalent at list prices; every run used a subscription, so none are charges. Opus and Fable are Claude Code's own `total_cost_usd`. Astra and Neon are priced from their reported tokens; picture generation isn't priced. [costs.json](costs.json) has the arithmetic, including a change in how Antigravity 1.5 reports tokens.

## What they made

- **Opus 5.5 (Kept):** /1 a white Swiss grid with one cobalt and a working editor whose typing lights up related notes; /2 deep forest green with a mycelium network that follows the cursor and a pinned scroll story; /3 a loud red, blue and yellow poster with note cards you can drag together; /4 a pastel sky with a giant "Remember" behind a tilting card stack; /5 a navy night sky of linked notes with a serif essay and margin notes.
- **Fable 5.2 (Engram):** /1 deep marine with a citron accent and a full-bleed canvas of linked notes; /2 a cobalt, tomato and lemon poster with a wall where typed thoughts land as sticky notes; /3 a lilac editorial page with highlighter yellow and papers on a desk; /4 a white workbench where typing `[[` suggests links; /5 forest green and pink with giant "Total recall" lettering around a 3D card stack.
- **GPT-6.2 Astra (Folio):** five themes of one `Landing` component, each over generated pictures: a paper studio with taped notes, an alpine field journal, a purple idea atlas, a terracotta reading room and a lamp-lit night desk. All share a working notebook saved in the browser.
- **Gemini 4 Neon (Cairn):** a white page with a three-pane notebook, dark evergreen with a citron accent and a synthesis graph, a vermilion Swiss poster with a capture box, a pale blue monograph with a sculpture photo, and a page that opens straight into a working Markdown workspace with live backlinks.

## Gallery adaptation

All four: `<html>`/`<body>` become `data-source-html`/`data-source-body` divs, the global CSS goes through the gallery's scoped copy, the models' own design switchers aren't rendered (the gallery has its own), and pictures and fonts move under `/variants/with-gemini-design-skill/<model>/`. The switcher components stay in the source, unused.

- **Fonts (Opus, Fable, Neon).** These three load fonts with next/font, which registers faces under each font's plain name. The gallery loads every entry's fonts into one page, so other entries' faces called "Archivo", "Inter Tight" or "Newsreader" stood in for these. In the first gallery build, Opus /3's Archivo lost its condensed width and the page came out 509 px taller, and Opus /1 and /5 and Neon /4 headings set at different widths. Each entry now has a `fonts.css` with the exact `@font-face` rules and files its original production build served, under prefixed names ("Opus Gemini", "Fable Gemini", "Neon Gemini"), and classes that set the same CSS variables next/font's classes set ([runner/selfhost-fonts.py](runner/selfhost-fonts.py)). Fable's /1 and /5 reuse the variable names `--font-display` and `--font-body` for different fonts, so each page names its own classes. The fonts are all under the SIL Open Font License; each entry's font folder has a `licenses.txt` with the copyright lines read from the files.
- **Astra** has no Tailwind, so its CSS starts with the same block of browser defaults the earlier Astra imports use (the gallery's Tailwind base would otherwise reset them), and its two self-hosted fonts get an "Astra62 Gemini" prefix.
- **Opus** sets `overflow-x: hidden` on body; on the wrapper div that becomes `clip`, so the div doesn't turn into a scroll container and stop /2's and /4's pinned sections from sticking. Its route layouts take a plain `{ children }` type instead of Next's generated `LayoutProps`, and the gallery renders each route inside its layout, as Next did. The /5 logo linked to `/5`, reloading the page at its top; it now jumps to the top of the page, so it stays inside the gallery and its compare panes (Sol's review caught the earlier gallery-route link loading a whole gallery page inside a compare pane).

Source hashes for every file each model changed or added are in the `*.source-sha256.json` files.

## Gallery verification

Each original ran as its own production build (`next build`/`next start`) next to the gallery's production build. All 20 pages were captured full-page at 1440×900 and 390×844 with reduced motion, after scrolling through, from both. In all 40 pairs the page heights are equal, the first heading has the same font (up to the prefix), size and rendered width, and neither side has page errors, failed requests or horizontal overflow. Pixel differences are the models' own switchers at the bottom of the viewport, which the gallery doesn't render, plus, on Astra's pages, the animated dots on its thread lines and small re-encoding differences in pictures.

With reduced motion and the same random seed on both sides, every visible button, tab and radio on the 20 pages was clicked in turn (Opus 48, Astra 92, Neon 42, Fable 14), and the page text matched the original after every click, with no page errors ([runner/clickthrough.mjs](runner/clickthrough.mjs)). No control was clickable on only one side; 28 unlabeled controls (20 of them Astra's, 4 per page) couldn't be clicked on either side. Typing into the first text field on each page that has one (Opus /1 and /3, Astra /5, Neon /1, /3 and /5, Fable /2 and /4) gave the same result on both sides. This checks that the embed is faithful. It is not an aesthetic score.

The gallery's production build passed with webpack's persistent cache off, which is how `next.config.ts` builds on Vercel. With the local cache on (7.1 GB on t3os), the webpack build worker ran out of memory twice on this branch; that only affects local builds.
