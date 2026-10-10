# Motion benchmark handoff

Status as of 2026-10-10. Read `README.md` in this folder first; it explains the contract, setup, and commands.

## Where things stand

- Opus 5.5, Fable 5.1, and Haiku 5.5 have each had one isolated session under the current prompt, making three videos each, on Windows (Ryzen 7 5800X, RTX 4070, GPU WebGL through ANGLE/D3D11). Results are in `src/lib/motion-runs.json`; videos and posters are in the `whichai-motion` R2 bucket, served from `https://media.whichai.dev`.
- Every Windows code path has now run for real: the `.cmd` shim launcher, process-tree tracking and cleanup, the work root (set with `MOTIONBENCH_WORK=E:\w\motionbench\work` on this machine), and GPU rendering (about 60 s per 1080p60 video with 4 workers).
- Claude Code logged in by borrowing the access token of the machine's normal Claude Code login (see README, setup step 5). No `claude setup-token` file exists yet.

## The prompt

The first prompt asked for "a motion designer's showreel" and let the model pick the subject. Each try ran in its own session. Every Opus try made the same point-line-plane-volume piece, and Haiku's tries were near-identical abstract reels. The word "showreel" set the subject, and a session that doesn't know about the other tries gives the model's single favorite answer every time.

The prompt is now a concrete brief, three launch videos for a note-taking app that works as a second brain, in one session, like the UI gallery's five iterations in one prompt. Like the gallery's prompt, it leaves the app unnamed, so naming and branding are the model's call. What I tried on the way, all with Haiku:

- A launch video for an unnamed second-brain app, two separate sessions: both invented "Cairn" with a stacked-stone logo and told the same story.
- The same brief naming the app Hollis, two separate sessions: same story, same palette, same logo idea.
- Three Hollis videos in one session: three different concepts under one brand.
- Three videos for the unnamed app in one session (the current prompt): three different concepts again. Opus and Haiku both named the app "Engram" and Fable named it "Mnemo", which is fine; a model's default name is part of what the benchmark shows.

Under the current prompt, Opus's session took 89 minutes and $34.38, Fable's 42 minutes and $18.29, and Haiku's 22 minutes and $5.13. The Opus and Haiku sessions ran at the same time, against the advice below, and Haiku's video 2 lost its browser 750 frames into the render. Rendering it again by hand worked, so I re-ran `finishRun` on that session folder with the session's recorded exit code, time, and cost, and all three of its videos rendered. Fable ran later on its own, and all three of its videos rendered on the first try.

## What the first runs changed

- **Sandboxes.** The first Opus test session followed `motion.mjs` into the repo, read `motion-config.json`, and listed `node_modules`. Sessions now work in a randomly named sandbox with a private framekit copy, so nothing they run points at the repo or at earlier tries.
- **No built-in skills.** Claude Code ships built-in skills, one of them a design skill. Runs pass `--disable-slash-commands`; an isolation probe confirmed the session sees no skills, MCP servers, or instruction files.
- **Determinism check.** On Windows, a heavy shader can come out a few levels off in scattered pixels between page loads. The bit-exact check failed on that, and one Opus session spent its whole 90 minutes on it and timed out. The check now averages pixel differences over 16px areas (see README). That Opus try and the next one were rerun, and so was try 1, which had passed only after shrinking its particles to dodge the check.
- **Web encodes.** Published videos are H.264 at CRF 20 capped at 25 Mbps, plus a 640px preview for card hover. At 10 Mbps, dense particle scenes smeared (VMAF about 40 against the master in those seconds).

## Not yet tested

- Codex and Grok CLI runs. Their homes, auth sync, and event parsing are untouched since the first branch.
- macOS since the sandbox change. The sandbox copies `playwright-core` from the repo's `node_modules`; it should behave the same there.

## Next steps

- Add more models with `npm run motion:run -- <model>`, one runner at a time.
- Launch long sessions so they outlive the terminal that started them. On this machine a T3 restart killed an Opus session 34 minutes in (archived as `1791500485567-killed-by-t3-restart`); starting the runner through `Invoke-CimMethod Win32_Process Create` avoided that.
- `npm run motion:upload`, then commit `src/lib/motion-runs.json`.
