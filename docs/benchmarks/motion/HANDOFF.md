# Motion benchmark handoff

Status as of 2026-10-08, for whoever picks this branch up on another machine. Read `README.md` in this folder first; it explains the contract, setup, and commands.

## Where things stand

- This branch builds on PR #50 (`pc-style:adam/motion-tab`). It replaces the old "agent renders its own video" flow with framekit: the agent builds a page with `window.renderAt(t)`, and `scripts/motion/framekit/` renders every page the same way afterwards.
- Tested on macOS (Apple Silicon, GPU WebGL through `channel: "chromium"`): 900 frames at 1080p60 render in about 12 seconds with 4 workers, segment joins are seamless, and the determinism, page-error, service-worker, stuck-page, and bad-URL cases all behave.
- One manual Haiku run went end to end (check passed, 8 MB 1080p60 video with audio). It was thrown away because it ran inside a normal agent thread and wasn't isolated.
- `src/lib/motion-runs.json` is empty on purpose. No isolated run has happened yet.
- Two review rounds (23 findings) are fixed: Windows `.cmd` shims, process-tree cleanup, encoder failures, network escape, seeding, and atomic publishing.

## Not yet tested

- **Every Windows code path.** The `.cmd` shim launcher was only tested by faking `process.platform`. Watch these on the first run:
  - `resolveLaunch` in `scripts/motion/harness.mjs`. It refuses any shim it doesn't recognise, and the error names the file.
  - `trackDescendants`, which polls `Win32_Process` through PowerShell every second, and `killTree`, which uses `taskkill /T /F`.
  - The work root, `C:\motionbench\work`. The runner refuses to start if any parent folder holds `CLAUDE.md`, `AGENTS.md`, `.claude`, `.agents`, `.codex`, `.grok`, `.cursor`, or `.mcp.json`.
  - That the GPU is used. `node scripts/motion/framekit/cli.mjs check --project <folder>` should print your graphics card as the renderer, not SwiftShader.
- **The isolated runner itself (`npm run motion:run`).** It has not completed a real session yet. It needs `claude setup-token` saved to `%USERPROFILE%\.motionbench\claude-oauth-token`, then `npm run motion:homes`.

## Next steps

1. Do the setup in `README.md`: Node 22+, `npm install`, `npx playwright install chromium`, ffmpeg on PATH, the harness logins, the token, then `npm run motion:homes`.
2. Run one cheap isolation probe before spending on real runs. Start Claude Code with the same environment the runner builds: `isolatedEnv(home, "claude-code")`, `--strict-mcp-config`, and a run folder under the work root. Ask it to list any instructions, memory, skills, MCP tools, and environment variables it can see. It should report none of yours.
3. Run try 1 for each model, with one runner process per model in parallel:
   ```
   npm run motion:run -- opus-5.5 1
   npm run motion:run -- sonnet-5.5 1
   npm run motion:run -- haiku-5.5 1
   ```
   Then run tries 2 and 3. Results land in `public/motion/` and `src/lib/motion-runs.json`. Transcripts and source stay in the run folders.
4. These runs are for testing the base harness only, not for the site yet. Don't upload to R2 or commit `motion-runs.json` until the videos have been looked at.

## Hosting (not wired up yet)

- R2 bucket `whichai-motion`, served from `https://media.whichai.dev`.
- `npm run motion:upload` reads credentials from `~/.motionbench/r2.env`: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`. The access key ID and secret still need to be created as an R2 API token in the Cloudflare dashboard.
- The site needs `NEXT_PUBLIC_MOTION_VIDEO_BASE_URL=https://media.whichai.dev` set on Vercel before the clips go live.
