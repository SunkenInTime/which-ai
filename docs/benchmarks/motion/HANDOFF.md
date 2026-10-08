# Motion benchmark handoff

Status as of 2026-10-08. Read `README.md` in this folder first; it explains the contract, setup, and commands.

## Where things stand

- Opus 5.5 and Haiku 5.5 have three isolated runs each under the current prompt and harness, on Windows (Ryzen 7 5800X, RTX 4070, GPU WebGL through ANGLE/D3D11). Results are in `src/lib/motion-runs.json`; videos and posters are in the `whichai-motion` R2 bucket, served from `https://media.whichai.dev`.
- Every Windows code path has now run for real: the `.cmd` shim launcher, process-tree tracking and cleanup, the work root (set with `MOTIONBENCH_WORK=E:\w\motionbench\work` on this machine), and GPU rendering (about 60 s per 1080p60 video with 4 workers).
- Claude Code logged in by borrowing the access token of the machine's normal Claude Code login (see README, setup step 5). No `claude setup-token` file exists yet.

## What the first runs changed

- **Sandboxes.** The first Opus test session followed `motion.mjs` into the repo, read `motion-config.json`, and listed `node_modules`. Sessions now work in a randomly named sandbox with a private framekit copy, so nothing they run points at the repo or at earlier tries.
- **No built-in skills.** Claude Code ships built-in skills, one of them a design skill. Runs pass `--disable-slash-commands`; an isolation probe confirmed the session sees no skills, MCP servers, or instruction files.
- **Determinism check.** On Windows, a heavy shader can come out a few levels off in scattered pixels between page loads. The bit-exact check failed on that, and one Opus session spent its whole 90 minutes on it and timed out. The check now averages pixel differences over 16px areas (see README). That Opus try and the next one were rerun, and so was try 1, which had passed only after shrinking its particles to dodge the check.
- **Web encodes.** Published videos are H.264 at CRF 20 capped at 25 Mbps, plus a 640px preview for card hover. At 10 Mbps, dense particle scenes smeared (VMAF about 40 against the master in those seconds).

## Not yet tested

- Codex and Grok CLI runs. Their homes, auth sync, and event parsing are untouched since the first branch.
- macOS since the sandbox change. The sandbox copies `playwright-core` from the repo's `node_modules`; it should behave the same there.

## Next steps

- Add more models with `npm run motion:run -- <model> all`, one runner at a time, so no session can see another's sandbox while both are live.
- `npm run motion:upload`, then commit `src/lib/motion-runs.json`.
