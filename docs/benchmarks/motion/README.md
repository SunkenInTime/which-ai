# Motion benchmark

Each model builds a 15-second motion piece as a web page. Framekit (`scripts/motion/framekit/`) renders every page the same way afterwards, so models compete on what they make, not on how they fought ffmpeg, and the session never renders a 1080p60 video on the machine it runs on.

## The contract

The prompt (`baseline.prompt.txt`) spells it out for the agent:

- `index.html` in the project folder, served over HTTP with the network switched off.
- `window.__ready = true` once assets have loaded.
- `window.renderAt(t)` draws the complete frame for `t` seconds. Same `t`, same pixels.
- Optional `audio.wav` or `audio.mp3`, cut or padded to 15 seconds.

Size, frame rate, length, and GPU mode come from `render` in `src/lib/motion-config.json` (1920×1080, 60fps, 15s). Framekit freezes `Date`, `performance.now`, `requestAnimationFrame`, and CSS animations at `t` and reseeds `Math.random` every frame, then captures each frame in headless Chromium and pipes it into x264 (CRF 18, capped at 30 Mbps, BT.709, a keyframe every second). Frames are independent, so the timeline is split across several browsers and rendered in parallel.

Agents get `node motion.mjs check | frame | sheet | preview | render` in their project folder. `check` must pass before a run is published.

## Setup (Windows, macOS, or Linux)

1. Node 22 or newer, then `npm install` in the repo.
2. `npx playwright install chromium`.
3. ffmpeg and ffprobe on PATH. On Windows: `winget install Gyan.FFmpeg`, then open a new terminal.
4. Install and log in to each harness you'll run: `claude`, `codex`, `grok`.
5. Claude Code: run `claude setup-token` and save the token to `~/.motionbench/claude-oauth-token` (`%USERPROFILE%\.motionbench\claude-oauth-token` on Windows). On Windows and Linux you can skip this: without the file, runs borrow the access token of your normal Claude Code login (never its refresh token), and the runner won't start a run the token could expire during. Use Claude Code normally and it refreshes.
6. `npm run motion:homes` to build the credentials-only homes.

Check the renderer before the first batch: `node scripts/motion/framekit/cli.mjs check --project <any project folder>` prints the WebGL renderer it got. With `"gl": "gpu"` that should name your graphics card. Every final render in a batch must use the same machine and the same `gl` setting.

## Running

Headless, isolated (use this for published results):

```
npm run motion:run -- opus-5.5 1        # one model, one try
npm run motion:run -- haiku-5.5 all     # all tries for one model
npm run motion:run -- all all           # everything; skips tries already done with this prompt
```

Each session gets a fresh project folder and a fresh home holding only that harness's login, so no skills, plugins, MCP servers, or CLAUDE.md/AGENTS.md load. Claude Code also runs with `--disable-slash-commands`, which turns off its built-in skills (one of them is a design skill). The session works in a sandbox with a random name under `sandbox/` next to the work root, holding the project, the home, and a private copy of framekit with its own Playwright. Nothing in it points back at the repo, so an agent that reads its tools can't wander into the site's design docs, skills, or other models' videos, and it can't see earlier tries. When the session ends, the sandbox moves into the run folder. The work root sits outside your home folder because harnesses read instruction files from every parent folder; the runner refuses to start if any parent holds one. When the agent exits, the runner kills anything it left running, then checks, renders, and records the run. Agent time and render time are stored apart. A timeout, a non-zero exit, a failed check, or a page error on any rendered frame is recorded as failed and never published, and a failed retry doesn't replace a video that's already published. A slot counts as done only when an isolated run under the current prompt filled it; manual results and results from older prompts get redone.

By hand, in an agent thread:

```
npm run motion:new -- opus-5.5 1
```

It prints a project folder and a `PROMPT.txt`. Open the agent in that folder, paste the prompt, and when it's done:

```
npm run motion:finish -- <run folder> [--wall-seconds 1234] [--cost 4.20]
```

A manual thread loads your own setup (global CLAUDE.md, skills, MCP servers), so its result isn't comparable with isolated runs. It's recorded with `"source": "manual"`.

Every run folder under the work root (`C:\motionbench\work` on Windows, `/Users/Shared/motionbench/work` on macOS, `/var/tmp/motionbench/work` on Linux, or `MOTIONBENCH_WORK`) keeps the agent's source, transcript, and full record in `run.json`, even when a rerun replaces the published video.

## Publishing

The render is a CRF 18 master, kept in the run folder as `final.mp4`. What gets published to `public/motion/<group>/<model>/` is `<n>.mp4`, a full-size 60fps encode for streaming (CRF 20, capped at 10 Mbps); `<n>.preview.mp4`, a 640px 30fps silent clip that cards play on hover; and `<n>.jpg`, the poster.

`npm run motion:upload` copies `public/motion` to the `whichai-motion` R2 bucket (see `scripts/motion/upload.mjs`). It uses rclone when an R2 API token is set up, and otherwise wrangler's own login. Then commit `src/lib/motion-runs.json`. Production builds read videos from `https://media.whichai.dev`, the bucket's domain; `npm run dev` reads `public/motion`. `NEXT_PUBLIC_MOTION_VIDEO_BASE_URL` overrides both.
