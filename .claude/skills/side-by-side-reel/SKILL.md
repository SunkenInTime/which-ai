---
name: side-by-side-reel
description: Render a side-by-side scrolling video of two gallery pages for a social post (Twitter/X). Use when asked for a reel, clip or video comparing gallery pages, such as one model with and without a skill.
---

The reel puts two gallery pages next to each other, each taking half the frame, and scrolls them top to bottom at the same speed. `scripts/reel/render.mjs` does all of it; the layout below is the one Dara signed off on, so keep it unless asked otherwise:

- **Frame:** 1848×1200, the screen ratio of current MacBooks. It sits inside Twitter's 1920×1200 landscape limit, so Twitter shows it unscaled.
- **Pages:** each side is the gallery's `/preview/{group}/{model}/{iteration}` page (no gallery chrome) at a 1440px desktop width, scaled to fill its half. Only a 52px header uses frame space: model logo, "{Model} · {without skill | with frontend-design skill | with taste skill}", and the page number.
- **Motion:** 1.5s hold on the hero, then both scroll at one speed (`--speed`, default 220 page px/s). The shorter page reaches its footer first and rests there; that is intended, it shows the length difference honestly. Short fades in and out. 60fps H.264.

## Steps

1. **Pick the sides** as `group/model/iteration`, matching the gallery URL (for example `without-design-skill/gemini-4-neon/1`). The script reads the model label from `src/lib/gallery-manifest.ts` and the logo from `src/lib/model-brand-logo.ts`, preferring the dark-theme logo because the header is dark. Pass `--left-label` / `--right-label` only when the default wording is wrong for the post.
2. **Render stills** and look at them:
   ```sh
   node scripts/reel/render.mjs --left <side> --right <side> --out ~/Code/reels/<name>.mp4 --stills 1,8
   ```
   Done when both pages are fully loaded in the stills, the labels and logos are right, and the printed scroll distances match what you see: a page that clearly continues below the fold but reports `0px` scrolls inside its own container, and this script can't record it.
3. **Render the video**: the same command without `--stills` (about 2.5 minutes for 17 seconds of video on t3os).
4. **Check the MP4 itself**, not the stills: tile frames into a contact sheet and look at it, and count repeated frames during the scroll (a repeat is a visible stutter):
   ```sh
   ffmpeg -v error -y -i reel.mp4 -vf "select='not(mod(n\,130))',scale=616:-1,tile=3x3" -frames:v 1 sheet.png
   ffmpeg -i reel.mp4 -vf "trim=start=1.6:end=<scroll end>,mpdecimate" -loglevel debug -f null - 2>&1 | grep -oE "(keep|drop) pts" | sort | uniq -c
   ```
   Done when every page reaches its footer in the sheet and drops are only a handful at the slow start and end of the scroll.

Hand the user the MP4 path and the contact sheet.

## Pages that aren't on whichai.dev yet

`--base` defaults to `https://www.whichai.dev`, so it only sees merged entries. For an entry on a branch, build it, run `npm run start` and pass `--base http://localhost:3000`.
