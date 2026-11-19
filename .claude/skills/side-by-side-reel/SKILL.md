---
name: side-by-side-reel
description: Render a side-by-side scrolling video of two gallery pages for a social post (Twitter/X). Use when asked for a reel, clip or video comparing gallery pages, such as one model with and without a skill.
---

The reel puts two gallery pages next to each other, each taking half the frame, and scrolls them top to bottom at the same speed. `scripts/reel/render.mjs` does all of it; the layout below is the one Dara signed off on, so keep it unless asked otherwise:

- **Frame:** 1848×1200, the screen ratio of current MacBooks, inside X's 1920×1200 landscape upload limit.
- **Pages:** each side is the gallery's `/preview/{group}/{model}/{iteration}` page (no gallery chrome) at a 1440px desktop width, scaled to fill its half. Only a 52px header uses frame space: model logo, "{Model} · {without skill | with frontend-design skill | with taste skill}", and the page number.
- **Motion:** 1.5s hold on the hero, then both scroll at one speed (`--speed`, default 220 page px/s). The shorter page reaches its footer first and rests there; that is intended, it shows the length difference honestly. Pages run on a fake clock stepped one video frame at a time, so their own animations play at real speed. Short fades in and out. 60fps H.264.

## Steps

1. **Pick the sides** as `group/model/iteration`, matching the gallery URL (for example `without-design-skill/gemini-4-neon/1`). The script reads the model label from `src/lib/gallery-manifest.ts` and the logo from `src/lib/model-brand-logo.ts`, preferring the dark-theme logo because the header is dark. Pass `--left-label` / `--right-label` only when the default wording is wrong for the post.
2. **Render stills** and look at them:
   ```sh
   node scripts/reel/render.mjs --left <side> --right <side> --out ~/Code/reels/<name>.mp4 --stills 1
   ```
   The first line printed gives each page's scroll distance and the video length. Run again with `--stills` at a few times inside that length (before the last 2 seconds, which fade out). Done when both pages are fully loaded, the labels and logos are right, and the scroll distances match what you see: a page that clearly continues below the fold but reports `0px` scrolls inside its own container, and this script can't record it. A long page makes a long video (about 14 s per 3,000 px); raise `--speed` if the post needs it shorter.
3. **Render the video**: the same command without `--stills`. Capture runs at roughly 7 video frames per second on t3os. It writes `<name>.mp4` and `<name>-sheet.png`, nine frames spread across the whole video.
4. **Check the MP4**: look at the sheet, and count repeated frames in each half separately (a repeat is a visible stutter; one half moving can hide the other freezing):
   ```sh
   for x in 0 926; do echo "half at x=$x:"; ffmpeg -i <name>.mp4 -vf "crop=922:1148:$x:52,mpdecimate" -loglevel debug -f null - 2>&1 | grep -oE "drop pts:[0-9]+ pts_time:[0-9.]+" | awk -F'pts_time:' '{c[int($2)]++} END{for (k in c) printf "%ss:%d ", k, c[k]; print ""}'; done
   ```
   It prints repeated frames per second of video for each half. Done when every page reaches its footer in the sheet, and each half's repeats fall only in the opening hold (0–1s) and after that page's scroll ends (1.5s plus its time from the first line).

Hand the user the MP4 path and the sheet.

## Pages that aren't on whichai.dev yet

`--base` defaults to `https://www.whichai.dev`, so it only sees merged entries; the script stops with the URL if a page returns an error. For an entry on a branch, build it, run `npm run start` and pass `--base http://localhost:3000`.
