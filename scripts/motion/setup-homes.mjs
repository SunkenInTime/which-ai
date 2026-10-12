// Builds one template HOME per harness under ~/.motionbench/homes. Each holds credentials only.
// Every run copies its template into a fresh HOME, so nothing a run writes leaks into the next one.
//
//   node scripts/motion/setup-homes.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { authFiles, claudeAuth, claudeTokenFile, config, templatesDir } from "./harness.mjs";

for (const harness of config.harnesses) {
  const home = path.join(templatesDir, harness.id);
  fs.rmSync(home, { recursive: true, force: true });
  fs.mkdirSync(home, { recursive: true });
  for (const rel of authFiles[harness.id] ?? []) {
    const src = path.join(os.homedir(), rel);
    if (!fs.existsSync(src)) {
      console.warn(`${harness.label}: ${src} is missing. Log in with ${harness.bin} first.`);
      continue;
    }
    fs.mkdirSync(path.dirname(path.join(home, rel)), { recursive: true });
    fs.copyFileSync(src, path.join(home, rel));
    fs.chmodSync(path.join(home, rel), 0o600);
  }
  console.log(`${harness.label}: ${home}`);
}

if (!claudeAuth()) {
  console.warn(`Claude Code: run \`claude setup-token\` and save the token to ${claudeTokenFile}`);
}
