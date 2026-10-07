// Shared bits for the motion runner: config, paths, and the isolated environment each harness runs in.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const root = path.resolve(import.meta.dirname, "..", "..");
export const config = JSON.parse(fs.readFileSync(path.join(root, "src/lib/motion-config.json"), "utf8"));
export const runsFile = path.join(root, "src/lib/motion-runs.json");

// Credentials and templates live in the real home; runs do not. Claude Code and Grok CLI walk up from the
// working directory and load any .claude/ they find, so a workdir under the user's home picks up their skills.
export const benchHome = path.join(os.homedir(), ".motionbench");
export const templatesDir = path.join(benchHome, "homes");
export const workRoot = process.env.MOTION_WORK_ROOT ?? "/Users/Shared/motionbench/work";

const agentConfig = [".claude", ".agents", ".codex", ".grok", ".cursor", "CLAUDE.md", "AGENTS.md", "AGENTS.local.md"];

/** Throws if any folder above the run root holds agent config that a harness would load. */
export function assertCleanAncestors(dir) {
  for (let d = path.resolve(dir); ; d = path.dirname(d)) {
    const hit = agentConfig.find((name) => fs.existsSync(path.join(d, name)));
    if (hit) throw new Error(`${path.join(d, hit)} would leak into runs. Set MOTION_WORK_ROOT to a folder with no agent config above it.`);
    if (d === path.dirname(d)) return;
  }
}

// Files copied from the real home into each run's fresh home. Only credentials, never config or skills.
// They are synced back after a run when the harness refreshed its tokens, so the real login keeps working.
export const authFiles = {
  "claude-code": [], // Logs in with the token below instead.
  codex: [".codex/auth.json"],
  "grok-cli": [".grok/auth.json"],
};

// Claude Code keeps its login in the keychain keyed to the config dir, so a fresh HOME is logged out.
// It reads a long-lived token from `claude setup-token` instead, saved to this file (never to the repo).
export const claudeTokenFile = path.join(benchHome, "claude-oauth-token");

export function resolveBin(bin) {
  return execFileSync("/bin/sh", ["-c", `command -v ${bin}`], { encoding: "utf8" }).trim();
}

// Agents run with approvals off, so they only get an allowlisted environment: no tokens, no agent context.
const passEnv = ["PATH", "LANG", "LC_ALL", "LC_CTYPE", "TERM", "COLORTERM", "SHELL", "USER", "LOGNAME", "TMPDIR", "TZ"];

export function isolatedEnv(home, harnessId) {
  const env = {};
  for (const key of passEnv) {
    if (process.env[key] !== undefined) env[key] = process.env[key];
  }
  env.HOME = home;
  env.XDG_CONFIG_HOME = path.join(home, ".config");
  env.XDG_CACHE_HOME = path.join(home, ".cache");
  env.XDG_DATA_HOME = path.join(home, ".local", "share");
  env.CODEX_HOME = path.join(home, ".codex");
  env.GROK_HOME = path.join(home, ".grok");
  // Only Claude Code gets the token; the other harnesses run with approvals off and could read it.
  if (harnessId === "claude-code" && fs.existsSync(claudeTokenFile)) {
    env.CLAUDE_CODE_OAUTH_TOKEN = fs.readFileSync(claudeTokenFile, "utf8").trim();
  }
  return env;
}

// Every model runs at the same reasoning effort, set once in the config.
export function harnessCommand(harness, model, prompt, workdir) {
  const effort = model.effort ?? config.effort;
  switch (harness.id) {
    case "claude-code":
      return ["-p", prompt, "--model", model.modelArg, "--effort", effort, "--dangerously-skip-permissions", "--output-format", "stream-json", "--verbose"];
    case "codex":
      return ["exec", "--model", model.modelArg, "-c", `model_reasoning_effort="${effort}"`, "--dangerously-bypass-approvals-and-sandbox", "--skip-git-repo-check", "--json", "-C", workdir, prompt];
    case "grok-cli":
      return ["-p", prompt, "--model", model.modelArg, "--reasoning-effort", effort, "--always-approve", "--output-format", "streaming-json", "--cwd", workdir];
    default:
      throw new Error(`Unknown harness ${harness.id}`);
  }
}

export function harnessVersion(bin) {
  try {
    const out = execFileSync(bin, ["--version"], { encoding: "utf8" });
    return out.match(/\d+\.\d+\.\d+/)?.[0] ?? out.trim().split("\n")[0];
  } catch {
    return "unknown";
  }
}
