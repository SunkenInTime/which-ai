// Sets up a run folder: an empty project with the `node motion.mjs` tools, plus run.json describing the run.
// The headless runner uses this for every session. To run a model by hand in an agent thread instead:
//
//   node scripts/motion/new.mjs <model-id> <iteration> [--group baseline]
//
// then open an agent thread in the printed project folder, paste the prompt from PROMPT.txt (next to the
// project, not inside it), and when the agent is done run `node scripts/motion/finish.mjs <run-dir>`.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";
import { assertCleanAncestors, config, root, workRoot } from "./harness.mjs";
import { writeRunMeta } from "./finish.mjs";

const cli = path.join(root, "scripts/motion/framekit/cli.mjs");

export function loadPrompt(groupId) {
  const promptFile = path.join(root, "docs/benchmarks/motion", `${groupId}.prompt.txt`);
  const prompt = fs.readFileSync(promptFile, "utf8").trim();
  if (prompt.includes("PLACEHOLDER")) throw new Error(`${path.relative(root, promptFile)} still holds the placeholder.`);
  return { prompt, promptSha256: crypto.createHash("sha256").update(prompt).digest("hex") };
}

export function prepareRun({ groupId, model, iteration, source, harnessVersion = null }) {
  const { prompt, promptSha256 } = loadPrompt(groupId);
  const runDir = path.join(workRoot, groupId, model.id, `${iteration}-${Date.now()}`);
  const workdir = path.join(runDir, "project");
  assertCleanAncestors(workdir);
  fs.mkdirSync(workdir, { recursive: true });
  // The only thing in the project at the start: a pointer to the shared framekit CLI.
  fs.writeFileSync(path.join(workdir, "motion.mjs"), `import ${JSON.stringify(pathToFileURL(cli).href)};\n`);
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
    startedAt: new Date().toISOString(),
  });
  return { runDir, workdir, prompt, promptSha256 };
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
