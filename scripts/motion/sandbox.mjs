// The folder an agent session works in. It holds only what the session needs: a project with an empty folder per
// video (1, 2, 3), a fresh home,
// and a private copy of framekit with the render spec. Nothing in it points back at the repo, so an agent that
// reads its tools (they often do) can't wander into the site's design docs, skills, or other models' videos.
// Its name is random and it lives apart from the run records, so a session can't find earlier tries either.
// When the session ends, the sandbox moves into the run folder.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { assertCleanAncestors, config, root, workRoot } from "./harness.mjs";

export const sandboxRoot = process.env.MOTIONBENCH_SANDBOX ?? path.join(path.dirname(workRoot), "sandbox");

const framekitSource = path.join(root, "scripts/motion/framekit");
const playwrightCore = path.dirname(fs.realpathSync(path.join(root, "node_modules/playwright-core/package.json")));

export function createSandbox() {
  const sandbox = path.join(sandboxRoot, crypto.randomUUID());
  const workdir = path.join(sandbox, "project");
  assertCleanAncestors(workdir);
  fs.mkdirSync(workdir, { recursive: true });
  const framekit = path.join(sandbox, "framekit");
  fs.mkdirSync(framekit);
  for (const file of ["cli.mjs", "kit.mjs"]) fs.copyFileSync(path.join(framekitSource, file), path.join(framekit, file));
  fs.writeFileSync(path.join(framekit, "spec.json"), JSON.stringify(config.render, null, 2) + "\n");
  fs.cpSync(playwrightCore, path.join(framekit, "node_modules", "playwright-core"), { recursive: true });
  // The only thing in each video's folder at the start: a pointer to the sandbox's framekit. It's relative, so the
  // project keeps working after it and framekit move into the run folder.
  for (let n = 1; n <= config.iterations; n++) {
    fs.mkdirSync(path.join(workdir, String(n)));
    fs.writeFileSync(path.join(workdir, String(n), "motion.mjs"), `import "../../framekit/cli.mjs";\n`);
  }
  return { sandbox, workdir, home: path.join(sandbox, "home") };
}

// Moves the session's project, home, and framekit into the run folder and deletes the empty sandbox.
// Windows can hold a file open for a moment after its process dies, so moves are retried before copying;
// a move across drives copies straight away.
export async function collectSandbox(sandbox, runDir) {
  for (const name of ["project", "home", "framekit"]) {
    const from = path.join(sandbox, name);
    if (fs.existsSync(from)) await move(from, path.join(runDir, name));
  }
  fs.rmSync(sandbox, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
}

async function move(from, to) {
  for (let attempt = 0; ; attempt++) {
    try {
      fs.renameSync(from, to);
      return;
    } catch (err) {
      if (attempt >= 10 || !["EPERM", "EBUSY", "EACCES"].includes(err.code)) {
        fs.cpSync(from, to, { recursive: true });
        fs.rmSync(from, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}
