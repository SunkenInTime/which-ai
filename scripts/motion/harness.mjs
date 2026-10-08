// Shared bits for the motion runner: config, paths, and the isolated environment each harness runs in.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile, execFileSync, spawn, spawnSync } from "node:child_process";

export const root = path.resolve(import.meta.dirname, "..", "..");
export const config = JSON.parse(fs.readFileSync(path.join(root, "src/lib/motion-config.json"), "utf8"));
export const runsFile = path.join(root, "src/lib/motion-runs.json");

// Everything a run touches lives outside the repo so no AGENTS.md / CLAUDE.md is discovered from a parent dir.
export const benchHome = path.join(os.homedir(), ".motionbench");
export const templatesDir = path.join(benchHome, "homes");
// Run folders live outside the user's home: harnesses look for CLAUDE.md / AGENTS.md in every parent folder,
// and the real ~/.claude, ~/.codex, and ~/.agents would count. prepareRun refuses to start if any parent has them.
export const workRoot =
  process.env.MOTIONBENCH_WORK ??
  (process.platform === "win32"
    ? path.join(path.parse(os.homedir()).root, "motionbench", "work")
    : process.platform === "darwin"
      ? "/Users/Shared/motionbench/work"
      : "/var/tmp/motionbench/work");

// Files or folders that would hand a harness instructions, skills, or MCP servers if found in a parent folder.
const configMarkers = ["CLAUDE.md", "CLAUDE.local.md", "AGENTS.md", "AGENTS.override.md", ".claude", ".agents", ".codex", ".grok", ".mcp.json", ".cursor"];

export function assertCleanAncestors(dir) {
  for (let d = path.dirname(path.resolve(dir)); ; d = path.dirname(d)) {
    const found = configMarkers.filter((m) => fs.existsSync(path.join(d, m)));
    if (found.length) throw new Error(`${d} holds ${found.join(", ")}, which a harness could load. Set MOTIONBENCH_WORK to a folder outside it.`);
    if (path.dirname(d) === d) return;
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

// On Windows and Linux, Claude Code keeps its login in ~/.claude/.credentials.json instead of the keychain.
// Without a setup-token file, runs borrow that login's current access token. Only the token goes into the run,
// never the refresh token, so a run can't rotate the real login out from under the user's own sessions.
const claudeCredentialsFile = path.join(os.homedir(), ".claude", ".credentials.json");

export function claudeAuth() {
  if (fs.existsSync(claudeTokenFile)) return { token: fs.readFileSync(claudeTokenFile, "utf8").trim(), expiresAt: null, source: claudeTokenFile };
  try {
    const oauth = JSON.parse(fs.readFileSync(claudeCredentialsFile, "utf8")).claudeAiOauth;
    if (oauth?.accessToken) return { token: oauth.accessToken, expiresAt: oauth.expiresAt ?? null, source: claudeCredentialsFile };
  } catch {
    // No file login either.
  }
  return null;
}

// Fails before spending anything when Claude Code has no login, or the borrowed token would expire mid-run.
export function assertClaudeAuth(minutesNeeded) {
  const auth = claudeAuth();
  if (!auth) throw new Error(`Claude Code has no login for runs. Run \`claude setup-token\` and save the token to ${claudeTokenFile}.`);
  if (auth.expiresAt === null) return auth;
  const minutesLeft = Math.floor((auth.expiresAt - Date.now()) / 60_000);
  if (minutesLeft < minutesNeeded) {
    throw new Error(
      `The access token in ${auth.source} expires in ${minutesLeft} minutes, and a run may take ${minutesNeeded}. ` +
        `Use Claude Code normally until it refreshes, or save a \`claude setup-token\` token to ${claudeTokenFile}.`,
    );
  }
  return auth;
}

export const isWindows = process.platform === "win32";

export function resolveBin(bin) {
  if (isWindows) {
    const found = execFileSync("where.exe", [bin], { encoding: "utf8" }).split(/\r?\n/).filter(Boolean);
    return found.find((p) => /\.(exe|cmd)$/i.test(p)) ?? found[0];
  }
  return execFileSync("/bin/sh", ["-c", `command -v ${bin}`], { encoding: "utf8" }).trim();
}

// Playwright looks for its browsers under HOME (LOCALAPPDATA on Windows), which the fresh home hides,
// so point every run at the real install that `npx playwright install chromium` filled.
export function playwrightBrowsersPath() {
  if (process.env.PLAYWRIGHT_BROWSERS_PATH) return process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (isWindows) return path.join(process.env.LOCALAPPDATA ?? path.join(os.homedir(), "AppData", "Local"), "ms-playwright");
  if (process.platform === "darwin") return path.join(os.homedir(), "Library", "Caches", "ms-playwright");
  return path.join(process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache"), "ms-playwright");
}

// Runs get an allowlisted environment, not a filtered copy of ours: nothing that says "you're inside another
// agent" (AI_AGENT, CLAUDECODE, ...), no API keys, no SSH agent, no app identifiers. Windows keys are case-insensitive.
const passEnv = new Set(
  [
    "PATH", "LANG", "LANGUAGE", "TERM", "USER", "LOGNAME", "SHELL", "__CF_USER_TEXT_ENCODING", "MOTION_FFMPEG",
    "SYSTEMROOT", "SYSTEMDRIVE", "WINDIR", "COMSPEC", "PATHEXT", "OS", "NUMBER_OF_PROCESSORS", "PROCESSOR_ARCHITECTURE",
    "PROCESSOR_IDENTIFIER", "PROGRAMFILES", "PROGRAMFILES(X86)", "PROGRAMW6432", "PROGRAMDATA", "COMMONPROGRAMFILES",
    "COMMONPROGRAMFILES(X86)", "COMMONPROGRAMW6432", "USERNAME", "USERDOMAIN", "COMPUTERNAME", "PUBLIC", "ALLUSERSPROFILE",
  ].map((k) => k.toUpperCase()),
);

export function isolatedEnv(home, harnessId) {
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (passEnv.has(key.toUpperCase()) || key.startsWith("LC_")) env[key] = value;
  }
  env.HOME = home;
  env.XDG_CONFIG_HOME = path.join(home, ".config");
  env.XDG_CACHE_HOME = path.join(home, ".cache");
  env.XDG_DATA_HOME = path.join(home, ".local", "share");
  env.CODEX_HOME = path.join(home, ".codex");
  env.GROK_HOME = path.join(home, ".grok");
  const tmp = path.join(home, ".tmp");
  fs.mkdirSync(tmp, { recursive: true });
  env.TMPDIR = env.TMP = env.TEMP = tmp;
  if (isWindows) {
    env.USERPROFILE = home;
    env.APPDATA = path.join(home, "AppData", "Roaming");
    env.LOCALAPPDATA = path.join(home, "AppData", "Local");
    env.HOMEDRIVE = path.parse(home).root.replace(/\\$/, "");
    env.HOMEPATH = home.slice(env.HOMEDRIVE.length);
  }
  env.PLAYWRIGHT_BROWSERS_PATH = playwrightBrowsersPath();
  // Only Claude Code gets the Claude login; other harnesses never see it.
  if (harnessId === "claude-code") {
    const auth = claudeAuth();
    if (auth) env.CLAUDE_CODE_OAUTH_TOKEN = auth.token;
  }
  return env;
}

// Every model runs at the same reasoning effort, set once in the config. Claude Code and Codex read the
// prompt from stdin, which keeps the multi-line prompt out of the command line (cmd.exe can't carry newlines).
// Claude Code ships built-in skills (one is a design skill); --disable-slash-commands turns them all off.
export function harnessCommand(harness, model, prompt, workdir) {
  const effort = model.effort ?? config.effort;
  switch (harness.id) {
    case "claude-code":
      return {
        args: ["-p", "--model", model.modelArg, "--effort", effort, "--strict-mcp-config", "--disable-slash-commands", "--dangerously-skip-permissions", "--output-format", "stream-json", "--verbose"],
        stdin: prompt,
      };
    case "codex":
      return {
        args: ["exec", "--model", model.modelArg, "-c", `model_reasoning_effort=${effort}`, "--dangerously-bypass-approvals-and-sandbox", "--skip-git-repo-check", "--json", "-C", workdir, "-"],
        stdin: prompt,
      };
    case "grok-cli":
      return {
        args: ["-p", prompt, "--model", model.modelArg, "--reasoning-effort", effort, "--always-approve", "--output-format", "streaming-json", "--cwd", workdir],
        stdin: null,
      };
    default:
      throw new Error(`Unknown harness ${harness.id}`);
  }
}

// npm installs CLIs on Windows as .cmd shims, which Node can only run through cmd.exe, and cmd.exe mangles
// arguments with quotes or newlines. Read the shim and launch its target directly instead.
export function resolveLaunch(bin) {
  if (!isWindows || !/\.(cmd|bat)$/i.test(bin)) return { command: bin, prefix: [] };
  const shim = fs.readFileSync(bin, "utf8");
  // Only the plain npm forms are supported: `"%_prog%" "%dp0%\cli.js" %*` or `"%dp0%\cli.exe" %*`.
  // A shim that passes extra interpreter flags would lose them, so it's refused instead of guessed at.
  const node = shim.match(/"%_prog%"\s+"%~?dp0%?\\([^"]+\.c?m?js)"\s+%\*/i);
  const exe = shim.match(/(?:^|[\s&])"%~?dp0%?\\([^"]+\.exe)"\s+%\*/im);
  const target = node?.[1] ?? exe?.[1];
  if (!target || (node && exe && !/node\.exe$/i.test(exe[1]))) {
    throw new Error(`Can't safely tell how ${bin} starts its CLI. Point the harness's bin at its .exe or .js instead.`);
  }
  const resolved = path.join(path.dirname(bin), target);
  return node ? { command: process.execPath, prefix: [resolved] } : { command: resolved, prefix: [] };
}

// Starts the harness in its own process group (POSIX) so the whole tree can be killed later.
export function spawnHarness(bin, args, options) {
  const { command, prefix } = resolveLaunch(bin);
  return spawn(command, [...prefix, ...args], { ...options, detached: !isWindows, windowsHide: true });
}

export function killTree(child, signal = "SIGKILL") {
  if (!child.pid) return;
  if (isWindows) {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
    return;
  }
  try {
    process.kill(-child.pid, signal);
  } catch {
    // Already gone.
  }
}

// Windows has no process groups, and once the harness exits, its children are orphaned and taskkill /T can't
// find them from the dead root. So while the harness runs, poll the process table and remember every
// descendant (by pid and start time, so a reused pid is never killed), then kill whatever is still alive.
export function trackDescendants(rootPid) {
  const tracked = new Map();
  let rootCreated = null;
  if (!isWindows) return { stop: async () => {}, killAll: async () => {} };
  const snapshot = () =>
    new Promise((resolve) => {
      execFile(
        "powershell.exe",
        [
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          "Get-CimInstance Win32_Process | ForEach-Object { \"$($_.ProcessId),$($_.ParentProcessId),$($_.CreationDate.ToFileTimeUtc())\" }",
        ],
        { windowsHide: true, maxBuffer: 16 * 1024 * 1024 },
        (err, stdout) => {
          if (err) return resolve([]);
          resolve(
            stdout
              .split(/\r?\n/)
              .filter(Boolean)
              .map((line) => line.trim().split(","))
              .filter((parts) => parts.length === 3 && /^\d+$/.test(parts[2]))
              // FILETIMEs are around 1.3e17, past Number's exact range, so they stay BigInts.
              .map(([pid, ppid, created]) => ({ pid: Number(pid), ppid: Number(ppid), created: BigInt(created) })),
          );
        },
      );
    });
  const collect = (procs) => {
    // A tracked pid only counts as an ancestor while it's still the same process (same start time);
    // otherwise Windows may have handed the pid to something unrelated.
    const alive = new Map(procs.map((p) => [p.pid, p.created]));
    rootCreated ??= alive.get(rootPid) ?? null;
    const live = [...tracked].filter(([pid, created]) => alive.get(pid) === created).map(([pid]) => pid);
    const roots = new Set(rootCreated !== null && alive.get(rootPid) === rootCreated ? [rootPid, ...live] : live);
    let grew = true;
    while (grew) {
      grew = false;
      for (const p of procs) {
        // A real descendant can't predate the harness itself.
        if (roots.has(p.ppid) && !roots.has(p.pid) && (rootCreated === null || p.created >= rootCreated)) {
          roots.add(p.pid);
          tracked.set(p.pid, p.created);
          grew = true;
        }
      }
    }
  };
  // Poll once a second, skipping a tick while the previous PowerShell call is still running.
  let polling = Promise.resolve();
  let busy = false;
  const timer = setInterval(() => {
    if (busy) return;
    busy = true;
    polling = snapshot().then((procs) => {
      collect(procs);
      busy = false;
    });
  }, 1000);
  return {
    async stop() {
      clearInterval(timer);
      await polling;
    },
    async killAll() {
      clearInterval(timer);
      await polling;
      const procs = await snapshot();
      collect(procs);
      const alive = new Map(procs.map((p) => [p.pid, p.created]));
      for (const [pid, created] of tracked) {
        if (alive.get(pid) === created) spawnSync("taskkill", ["/pid", String(pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
      }
    },
  };
}

export function harnessVersion(bin) {
  try {
    const { command, prefix } = resolveLaunch(bin);
    const out = execFileSync(command, [...prefix, "--version"], { encoding: "utf8", windowsHide: true });
    return out.match(/\d+\.\d+\.\d+/)?.[0] ?? out.trim().split("\n")[0];
  } catch {
    return "unknown";
  }
}
