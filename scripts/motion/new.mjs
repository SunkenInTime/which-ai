// Sets up a session: a sandbox with one empty folder per video and the `node motion.mjs` tools (see sandbox.mjs),
// plus a run folder holding run.json and the prompt. One session makes all of a model's videos, the way the UI
// gallery asks for every iteration in one prompt, so the model knows it is making several.
// The headless runner uses this for every session. To run a model by hand in an agent thread instead:
//
//   node scripts/motion/new.mjs <model-id> [--group baseline]
//
// then open an agent thread in the printed project folder, paste the prompt from PROMPT.txt (next to the
// project, not inside it), and when the agent is done run `node scripts/motion/finish.mjs <run-dir>`.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { config, root, workRoot } from "./harness.mjs";
import { writeRunMeta } from "./finish.mjs";
import { createSandbox } from "./sandbox.mjs";

export function loadPrompt(groupId) {
  const promptFile = path.join(root, "docs/benchmarks/motion", `${groupId}.prompt.txt`);
  const prompt = fs.readFileSync(promptFile, "utf8").trim();
  if (prompt.includes("PLACEHOLDER")) throw new Error(`${path.relative(root, promptFile)} still holds the placeholder.`);
  return { prompt, promptSha256: crypto.createHash("sha256").update(prompt).digest("hex") };
}

export function prepareRun({ groupId, model, source, harnessVersion = null }) {
  const { prompt, promptSha256 } = loadPrompt(groupId);
  // The record (run.json, prompt, transcript) lives in runDir; the agent only ever sees its sandbox.
  const runDir = path.join(workRoot, groupId, model.id, String(Date.now()));
  fs.mkdirSync(runDir, { recursive: true });
  const { sandbox, workdir, home } = createSandbox();
  fs.writeFileSync(path.join(runDir, "PROMPT.txt"), prompt + "\n");
  writeRunMeta(runDir, {
    source,
    group: groupId,
    model: model.id,
    iterations: config.iterations,
    modelArg: model.modelArg,
    effort: model.effort ?? config.effort,
    harnessVersion,
    promptSha256,
    sandbox,
    startedAt: new Date().toISOString(),
  });
  return { runDir, workdir, home, prompt, promptSha256 };
}

if (import.meta.filename === path.resolve(process.argv[1] ?? "")) {
  const args = process.argv.slice(2);
  const groupFlag = args.indexOf("--group");
  const groupId = groupFlag === -1 ? "baseline" : args[groupFlag + 1];
  const [modelId] = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--group");
  const model = config.models.find((m) => m.id === modelId);
  if (!model || !config.groups.some((g) => g.id === groupId)) {
    console.error(`Usage: node scripts/motion/new.mjs <${config.models.map((m) => m.id).join("|")}> [--group baseline]`);
    process.exit(1);
  }
  const { runDir, workdir } = prepareRun({ groupId, model, source: "manual" });
  console.log(`run folder:  ${runDir}`);
  console.log(`open the agent in: ${workdir}`);
  console.log(`paste the prompt from: ${path.join(runDir, "PROMPT.txt")}`);
  console.log(`model: ${model.label} (${model.modelArg}), effort ${model.effort ?? config.effort}`);
  console.log(`when it's done: node scripts/motion/finish.mjs "${runDir}"`);
}
