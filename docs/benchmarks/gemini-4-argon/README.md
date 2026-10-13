# Gemini 4 Argon in Cursor

These runs use Cursor desktop 3.24.12 on macOS, Gemini 4 Argon at High reasoning, in fresh local chats. There is one session for each of the three frontend conditions and one session for all three motion videos. The sessions ran concurrently. This tests the model in Cursor's desktop environment; it is not equivalent to the stripped-down CLI environment used by some other motion entries.

## Prompts and source

The frontend prompts are saved next to this file. They request the same five second-brain landing pages, with the assigned skill prefix and a separate dev-server port per condition. The motion prompt is the unchanged [baseline prompt](../motion/baseline.prompt.txt), SHA-256 `6e6d97b80212486a941151d8836dc47da228230cdb0c808a8d6c27c7f93f16fc`.

Each frontend run started from the same Next.js 16.3.8 / React 19.2.8 starter and lockfile. The skill files match the previous Muse Wonder run. Generation happened outside the gallery checkout. Gallery adaptations preserve the generated designs and are limited to embedding, imports, asset paths, CSS scoping, and routing.

## Instruction isolation

All scored workspaces live under `/Users/Shared`, outside the user's home and Which AI checkout. The user's global `~/.agents/skills` and `~/.cursor/rules` directories were temporarily moved out of Cursor's search paths before fresh scored chats were created. They were preserved without edits and restored at 17:18:02 UTC, after all four sessions had completed. The two skill conditions contain only their assigned project skill. The baseline and motion projects contain no project design skill.

A separate, unscored preflight after this change reported no personal frontend-design skill and no personal todo rule in startup context. The frontend starter's stock Next.js `AGENTS.md` remains; it directs the agent to the version-specific Next.js documentation. Cursor also advertises 17 built-in skills and four installed-plugin skills (Supabase, Postgres practices, pstack setup, and X's API guide). Native and installed-plugin tools remain available. This is personal-instruction isolation, not an empty skill catalog or a filesystem security boundary.

The scored-session access audit distinguishes skills available in context from skill files actually read. No extra design feedback or follow-up coaching was sent during generation. Preflight sessions are excluded from scored time and cost.

## Visual feedback

Cursor's native browser stays enabled. An unscored canvas-only probe verified that the model could describe screenshot pixels, including a gold circle, a cyan square, and text painted on the canvas. The prompt prohibited reading source or using DOM text for that probe. This establishes screenshot access; it does not establish continuous video perception.

The motion prompt already offers Framekit's `frame`, `sheet`, and `preview` commands. The agent decides whether and how to inspect its output. Final motion validation and 1080p60 rendering use Framekit on Windows with its supported SwiftShader setting for all three videos; see the renderer note below. These entries are explicitly recorded as `source: "manual"`, since the generation sessions were driven through the Cursor desktop app.

## Cost basis

Use Cursor's exported per-session token usage, matched to the scored user-turn timestamps. API-equivalent estimates use the rates published on the run date: $2 per million uncached input tokens, $0.10 per million cache-read tokens, and $10 per million output tokens. The estimate is separate from Cursor's subscription billing classification and is not an additional cash invoice.

Sources checked 2026-10-13: [Cursor model pricing](https://cursor.com/docs/models-and-pricing), [Google's Argon announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/). The announced introductory pricing can change; the saved calculation uses the run-date rates.

## Recorded usage

| Scored session | Outputs | Wall time | API-equivalent estimate |
| --- | ---: | ---: | ---: |
| No design skill | 5 pages | 586.754 s | $1.5663151 |
| Anthropic frontend-design | 5 pages | 525.266 s | $1.7564933 |
| Design Taste | 5 pages | 766.535 s | $3.1876009 |
| Motion baseline | 3 videos | 937.812 s | $4.4417659 |
| **Total** | **18** | Concurrent sessions | **$10.9521752** |

Every exported event was classified **Included**, with no extra charge reported. The two unscored preflights total $0.2507139 API-equivalent and are excluded above. The motion figure covers the entire three-video session and is repeated on its cards; do not sum it three times. See [costs.json](costs.json) for tokens, rates, raw scoped export rows, and attribution limits.

The first billing event for each scored chat matches its initial prompt within one second. Two later motion events are attributed by timing and the active-session record; the export has no composer/request IDs. Cursor issued terminal-completion system notifications and automatically continued the motion chat after its initial final reply. Those are recorded separately from the single human prompt. Wall time ends at the last final reply, not Cursor's earlier stale completion timestamp. No latency ranking is implied by these concurrent sessions. Cursor's persisted model configuration says `maxMode: true`, but its billing export says `Max Mode: No`; the run is labeled High reasoning, not Max Mode.

The baseline and frontend-design sessions each called the native screenshot tool five times. Design Taste navigated all five pages with `take_screenshot_afterwards: true`; it did not call the separate screenshot tool. Motion read 22 generated image files, including repeated contact sheets, through Cursor's image-capable file reader. This is discrete frame feedback, not evidence of continuous video playback perception.

## Renderer note

The generated motion source passed its Framekit contract checks on the Mac. Two ordinary Windows GPU attempts produced inconsistent captures: the first failed reload checks for all three pages; the second rendered video 1 but failed videos 2 and 3. Diagnostic captures showed entire visual layers missing while fixed header/footer text remained, including a broken-image indicator. The generated source contains no image element at that position. No generated source was changed to address this.

With the same browser version, machine, source and Framekit checks, all three pages passed using `gl: "swiftshader"`. The final batch uses that setting uniformly. This strongly implicates the hardware capture path, but the driver-level cause has not been isolated. These renders therefore differ from corpus entries using ANGLE D3D11; the registry records the actual renderer. The override affects only this isolated rendering process, not the repository's default renderer. Failed attempts are retained in [renderer-evidence.json](renderer-evidence.json).

## Gallery verification

All 15 original pages and gallery embeddings were captured at 1440×1000. Their first headings match in text, computed font, size, canonical RGBA color and width; all returned HTTP 200 without page errors. The comparable [source overview](source-overview.jpg) and [gallery overview](gallery-overview.jpg) document the embedding. This checks preservation, not an aesthetic score or comprehensive responsive behavior.

The complete Playwright suite passed **427 tests** against the final production build, including frontend routes, visual checks, comparison, recency, motion routes, Google search, session cost and video switching. Repository-wide lint has 209 errors and 200 warnings both before and after the frontend import; these existing failures are not claimed fixed. Targeted lint of the new source and integration files is checked separately. Original generated source is preserved in the source archives, with per-file hashes alongside this document.

## Original-source downloads

- [All three frontend projects](https://media.whichai.dev/benchmarks/gemini-4-argon/2026-10-13/frontend-source.tar.gz)
- [All three motion projects with Framekit and font licenses](https://media.whichai.dev/benchmarks/gemini-4-argon/2026-10-13/motion-source.tar.gz)

[archives.json](archives.json) records archive hashes and byte counts. The motion archive contains the original generated pages, audio, fonts and inspected frames, plus the unchanged renderer needed to run them. Source hashes cover the original project files. Generated product names and marketing claims are benchmark output, not verified facts.

All final motion renders have zero reported page errors and warnings. The delivered web videos were fully decoded by ffmpeg and checked for 900 frames, 1920×1080, 60 fps, 15 seconds and an AAC audio stream. See [media-verification.json](media-verification.json).

Hosted playback was verified in Chromium for all three videos: each reached 1920×1080, 15-second metadata, advanced past 0.5 seconds, and sought to 7.5 seconds without video or page errors. [media-verification.json](media-verification.json) records the actual CDN URLs. All 11 hosted media/source assets returned HTTP 200 with matching byte counts; see [hosted-assets.json](hosted-assets.json).
