// Picks the poster again for every published video, from the master in its run folder, with the same rule a new
// run uses (writePoster in finish.mjs). Run it after changing that rule, then `npm run motion:upload`.
//
//   node scripts/motion/posters.mjs
import fs from "node:fs";
import path from "node:path";
import { root, runsFile, workRoot } from "./harness.mjs";
import { readRunMeta, readRuns, writePoster, writeRunMeta } from "./finish.mjs";

const runs = readRuns();
for (const [key, run] of Object.entries(runs)) {
  if (run.status !== "ok" || !run.video) continue;
  const [group, model, n] = key.split("/");
  const runDir = findRunDir(group, model, run.startedAt);
  const master = runDir && path.join(runDir, n, "final.mp4");
  if (!master || !fs.existsSync(master)) {
    console.log(`skip ${key}: no master for the run that started at ${run.startedAt}`);
    continue;
  }
  const poster = path.join(runDir, n, "final.jpg");
  const posterSec = writePoster(master, poster, run.video.durationSec);
  fs.copyFileSync(poster, path.join(root, "public/motion", `${key}.jpg`));
  run.video.posterSec = posterSec;
  const meta = readRunMeta(runDir);
  if (meta.results?.[key]?.video) {
    meta.results[key].video.posterSec = posterSec;
    writeRunMeta(runDir, meta);
  }
  console.log(`${key}: poster at ${posterSec} s`);
}
fs.writeFileSync(runsFile, JSON.stringify(runs, null, 2) + "\n");

// Run folders are named by the time the runner created them, a moment before the session's recorded start.
function findRunDir(group, model, startedAt) {
  const dir = path.join(workRoot, group, model);
  if (!fs.existsSync(dir)) return null;
  return (
    fs
      .readdirSync(dir)
      .map((name) => path.join(dir, name))
      .find((runDir) => fs.existsSync(path.join(runDir, "run.json")) && readRunMeta(runDir).startedAt === startedAt) ?? null
  );
}
