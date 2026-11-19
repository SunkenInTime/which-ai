# Gemini 4 Neon Motion run in Antigravity

One Motion session on 2026-11-19 (UTC): Gemini 4 Neon at thinking level `xhigh` in Google's Antigravity, driven headless over ACP on t3os (Ubuntu 26.04), under the current baseline prompt (`docs/benchmarks/motion/baseline.prompt.txt`, SHA-256 `6e6d97b8…`). It made three videos for a second-brain app it named Kora.

## How it ran

The session used Antigravity's agent as an ACP (Agent Client Protocol) server, `agy_acp_server.par` with `localharness_external`, release 1.4.5: the build T3 Code installs, the same runner as the gallery runs. The repo's runner doesn't drive ACP servers (Antigravity's `agy` CLI, with `agy -p` for headless runs, wasn't tried), so the session was set up with `npm run motion:new -- gemini-4-neon`, run with [run-motion.sh](run-motion.sh), and recorded with `npm run motion:finish`. Antigravity is in `motion-config.json` as a `manualOnly` harness, so `motion:run -- all` skips it.

[run-motion.sh](run-motion.sh) starts [acp-run.mjs](acp-run.mjs) in the sandbox `motion:new` printed. On t3os both lived in `~/Code/bench-neon-agy/bin` with [env.sh](env.sh) (`run-motion.sh` runs the client from `$B/bin/acp-run.mjs`), so copy them there, or adjust `B`, to run it again. The client opens one session in the project folder, switches to full-access mode (`yolo`), selects `gemini-4-neon` and `thinking_level` `xhigh`, sends the prompt once, approves every permission request, and logs every message. Its isolation follows the runner's `isolatedEnv`: a fresh home in the sandbox whose `GEMINI_HOME` held only a copy of the Antigravity sign-in, and an allowlisted environment (PATH holds Node, ffmpeg and ffprobe, and system folders). It also follows the gallery runs: a private mount namespace hides the box's agent instructions (`/etc/codex`, `/etc/claude-code`) and the shared `/tmp`. Like the CLI harnesses' Motion sessions, it got Antigravity's stock tools and no browser MCP server; agents look at their frames with `node motion.mjs frame` and `sheet`. Antigravity writes its built-in `run-workflow` skill into the project folder (`skills/system/run-workflow/SKILL.md`), which is outside the three video folders.

The run is recorded with `"source": "headless"`: an isolated session like the runner's, but not started by `motion:run`. Cards show no "manual session" note for it.

## The session

- **Time and outcome:** 22 minutes from start to the end of the turn (05:41:49 to 06:03:56 UTC). It ended on its own with a final reply ([final.txt](final.txt)) after `node motion.mjs check` passed in all three folders. No subagents.
- **Usage:** 5.45M tokens: 5,331,788 input (5,088,369 cached), 94,283 output and 21,271 thinking. At Google's paid-tier rates for Neon ($3 per million input tokens, $0.15 cached, $15 output including thinking), that comes to an API-equivalent **$3.23**. Antigravity ran on Dara's subscription, so this is an estimate, not a charge.
- **Temp path workaround:** the session's own preview tools started Chromium with the sandbox's temp folder, whose path is too long for Chromium's socket on Linux (108 bytes). Neon worked around it by pointing `TMPDIR` at `/tmp`, which in this session was the sandbox's temp folder anyway.

## The videos

1. **Paper desk:** "Your best ideas don't wait for folders." Notes on warm paper connect by red threads into a synthesis card.
2. **Constellation:** "Every thought has gravity." A dark app window, wikilinks that spark across to backlinks, a dive into a 260-node particle graph, and a Kora lockup.
3. **128 BPM Swiss cut:** beat-locked type ("47 TABS.", "ZERO CLUE"), bento tiles, an "Ask your second brain" answer view, and "CAPTURE. CONNECT. RECALL."

All three have audio the model generated.

## Rendering

Rendered on t3os with framekit's `gl: "gpu"` setting. Headless Chromium there reports SwiftShader (`ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)))`), so this run is software-rendered, like Gemini 4 Argon's, and unlike the other models, which were rendered with the RTX 4070 on the Windows machine. 4 render workers: 72 s, 43 s and 20 s for videos 1 to 3.

**Video 2's page is flaky under the contract check.** Neon's own check passed during the session. Run on its own four times on t3os before `motion:finish`, it failed twice, each time with the same difference: the frame at 7.5 s came out different after a reload (55 of 8160 areas, by up to 23 levels). The page waits for a list of font weights before it sets `__ready`, and its stylesheet registers more weights than that list, so a late font is the likely cause; that isn't confirmed. Framekit renders each video in four segments, each in its own browser, so a load race could make one segment differ. The published video 2 has no jump at any segment boundary (frames 225, 450, 675). `motion:finish` then ran once, its check passed, and that run is what's published; nothing was re-run to get a pass.

[run.json](run.json) has the run record without the sandbox paths.
