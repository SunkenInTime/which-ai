// Sets up a run: a sandbox with an empty project and the `node motion.mjs` tools (see sandbox.mjs), plus a run
// folder holding run.json and the prompt.
// The headless runner uses this for every session. To run a model by hand in an agent thread instead:
//
//   node scripts/motion/new.mjs <model-id> <iteration> [--group baseline]
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

export function prepareRun({ groupId, model, iteration, source, harnessVersion = null }) {
  const { prompt, promptSha256 } = loadPrompt(groupId);
  // The record (run.json, prompt, transcript) lives in runDir; the agent only ever sees its sandbox.
  const runDir = path.join(workRoot, groupId, model.id, `${iteration}-${Date.now()}`);
  fs.mkdirSync(runDir, { recursive: true });
  const { sandbox, workdir, home } = createSandbox();
  fs.writeFileSync(path.join(runDir, "PROMPT.txt"), prompt + "\n");
  writeRunMeta(runDir, {
    source,
    group: groupId,
    model: model.id,
    iteration,
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
  const [modelId, iterArg] = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--group");
  const model = config.models.find((m) => m.id === modelId);
  const iteration = Number(iterArg);
  if (!model || !Number.isInteger(iteration) || iteration < 1 || iteration > config.iterations || !config.groups.some((g) => g.id === groupId)) {
    console.error(`Usage: node scripts/motion/new.mjs <${config.models.map((m) => m.id).join("|")}> <1-${config.iterations}> [--group baseline]`);
    process.exit(1);
  }
  const { runDir, workdir } = prepareRun({ groupId, model, iteration, source: "manual" });
  console.log(`run folder:  ${runDir}`);
  console.log(`open the agent in: ${workdir}`);
  console.log(`paste the prompt from: ${path.join(runDir, "PROMPT.txt")}`);
  console.log(`model: ${model.label} (${model.modelArg}), effort ${model.effort ?? config.effort}`);
  console.log(`when it's done: node scripts/motion/finish.mjs "${runDir}"`);
}
