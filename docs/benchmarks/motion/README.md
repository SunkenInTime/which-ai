# Motion benchmark

Each model gets one session to make three 15-second launch videos, each as a web page in its own folder. Like the UI gallery's prompt, which asks for every iteration at once, the model knows it's making several, so whether they differ is its call. Framekit (`scripts/motion/framekit/`) renders every page the same way afterwards, so models compete on what they make, not on how they fought ffmpeg, and the session never renders a 1080p60 video on the machine it runs on.

## The contract

The prompt (`baseline.prompt.txt`) spells it out for the agent:

- One folder per video, `1`, `2` and `3`, each with its own `index.html`, served over HTTP on its own with the network switched off.
- `window.__ready = true` once assets have loaded.
- `window.renderAt(t)` draws the complete frame for `t` seconds. Same `t`, same pixels.
- Optional `audio.wav` or `audio.mp3`, cut or padded to 15 seconds.

Size, frame rate, length, and GPU mode come from `render` in `src/lib/motion-config.json` (1920×1080, 60fps, 15s). Framekit freezes `Date`, `performance.now`, `requestAnimationFrame`, and CSS animations at `t` and reseeds `Math.random` every frame, then captures each frame in headless Chromium and pipes it into x264 (CRF 18, capped at 30 Mbps, BT.709, a keyframe every second). Frames are independent, so the timeline is split across several browsers and rendered in parallel.

Agents get `node motion.mjs check | frame | sheet | preview | render` in each video's folder. `check` must pass before a run is published. `check` renders t=7.5s twice and again after a fresh page load, and averages each pixel's difference over 16px areas: GPU rounding, which can leave a few levels of difference in scattered pixels on Windows, passes; an area that differs by more than 6 levels (of 255) on average fails.

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
npm run motion:run -- opus-5.5     # one model: one session, three videos
npm run motion:run -- all          # every model; skips models already done with this prompt
```

Each session gets a fresh project with one empty folder per video and a fresh home holding only that harness's login, so no skills, plugins, MCP servers, or CLAUDE.md/AGENTS.md load. Claude Code also runs with `--disable-slash-commands`, which turns off its built-in skills (one of them is a design skill). Codex runs with bundled skills, the skill list, skill search, ChatGPT apps, and plugins turned off; on Windows it otherwise loads the skills in the real `~/.agents/skills`, because it finds the profile folder through the OS. The session works in a sandbox with a random name under `sandbox/` next to the work root, holding the project, the home, and a private copy of framekit with its own Playwright. Nothing in it points back at the repo or at earlier sessions, so an agent that reads its tools isn't led into the site's design docs, skills, or other models' videos. It isn't a filesystem jail; the aim is a stock setup with nothing injected. When the session ends, the sandbox moves into the run folder. The work root sits outside your home folder because harnesses read instruction files from every parent folder; the runner refuses to start if any parent holds one. When the agent exits, the runner kills anything it left running, then checks, renders, and records each video on its own: one empty or broken folder doesn't stop the other two. Sessions get up to 240 minutes (`timeoutMinutes`); Opus spent 41 to 54 minutes on a single video under the first prompt, and 89 minutes on all three under this one. Agent time and render time are stored apart. A timeout or a non-zero exit fails all of the session's videos, since a page may have been left half-done. A failed check or a page error on any rendered frame fails that video. Failed videos are never published. A model's published videos always come from one session: a new session replaces all of them, and only when it made at least as many good videos under the current prompt as the published set. A model counts as done when an isolated session under the current prompt made all its videos; anything less, manual results, and results from older prompts get a new session.

By hand, in an agent thread:

```
npm run motion:new -- opus-5.5
```

It prints a project folder and a `PROMPT.txt`. Open the agent in that folder, paste the prompt, and when it's done:

```
npm run motion:finish -- <run folder> [--wall-seconds 1234] [--cost 4.20]
```

A manual thread loads your own setup (global CLAUDE.md, skills, MCP servers), so its result isn't comparable with isolated runs. It's recorded with `"source": "manual"`.

Every run folder under the work root (`C:\motionbench\work` on Windows, `/Users/Shared/motionbench/work` on macOS, `/var/tmp/motionbench/work` on Linux, or `MOTIONBENCH_WORK`) keeps the agent's source, transcript, and full record in `run.json`, even when a rerun replaces the published video.

## Publishing

Each render is a CRF 18 master, kept in the run folder as `<n>/final.mp4`. What gets published to `public/motion/<group>/<model>/` is `<n>.mp4`, a full-size 60fps H.264 encode for the site (CRF 20, capped at 25 Mbps, since dense particles smear at lower caps); `<n>.preview.mp4`, a 640px 30fps silent clip that cards play on hover; and `<n>.jpg`, the poster.

`npm run motion:upload` copies `public/motion` to the `whichai-motion` R2 bucket (see `scripts/motion/upload.mjs`). It uses rclone when an R2 API token is set up, and otherwise wrangler's own login. Then commit `src/lib/motion-runs.json`. Production builds read videos from `https://media.whichai.dev`, the bucket's domain; `npm run dev` reads `public/motion`. `NEXT_PUBLIC_MOTION_VIDEO_BASE_URL` overrides both.
