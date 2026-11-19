// acp-run.mjs: one headless Antigravity session over ACP (Agent Client Protocol, JSON-RPC on stdio).
//
//   node acp-run.mjs --workspace <dir> --prompt-file <file> --log <file.jsonl> --final <file.txt>
//                    [--model gemini-4-neon] [--thinking xhigh] [--browser-mcp]
//
// Starts agy_acp_server with the environment it was given (run.sh builds it), opens one session in the workspace,
// switches to full-access mode, picks the model and thinking level, sends the prompt once and waits for the turn
// to end. Every JSON-RPC message in both directions, and the server's stderr, goes to the log with a timestamp.
// Permission requests are approved; the client offers no file system or terminal of its own, so the agent uses
// its built-in tools. The agent's reply text is written to --final when the turn ends.
import fs from "node:fs";
import { spawn } from "node:child_process";
import { parseArgs } from "node:util";

const { values: o } = parseArgs({
  options: {
    workspace: { type: "string" },
    "prompt-file": { type: "string" },
    log: { type: "string" },
    final: { type: "string" },
    model: { type: "string", default: "gemini-4-neon" },
    thinking: { type: "string", default: "xhigh" },
    "browser-mcp": { type: "boolean", default: false },
  },
});
for (const k of ["workspace", "prompt-file", "log", "final"]) if (!o[k]) throw new Error(`--${k} is required`);

const env = process.env;
const log = fs.createWriteStream(o.log, { flags: "a" });
const write = (dir, msg) => log.write(JSON.stringify({ t: new Date().toISOString(), dir, msg }) + "\n");

const child = spawn(env.AGY_BIN, ["--uid="], { cwd: o.workspace, env, stdio: ["pipe", "pipe", "pipe"], detached: true });
child.stderr.setEncoding("utf8");
child.stderr.on("data", (d) => write("stderr", d));
let exited = null;
child.on("exit", (code, signal) => {
  exited = { code, signal };
  write("exit", exited);
  // A server that dies mid-turn never answers; fail whatever is waiting so the reply so far is saved and the client exits.
  for (const [id, p] of pending) {
    pending.delete(id);
    p.reject(new Error(`${p.method}: agy_acp_server exited (${signal ?? `code ${code}`}) before answering`));
  }
});

let nextId = 1;
const pending = new Map();
const send = (msg) => {
  write("out", msg);
  child.stdin.write(JSON.stringify(msg) + "\n");
};
const request = (method, params) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject, method });
    send({ jsonrpc: "2.0", id, method, params });
  });

let reply = "";
let buffer = "";
child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  buffer += chunk;
  let i;
  while ((i = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, i).trim();
    buffer = buffer.slice(i + 1);
    if (!line) continue;
    let msg;
    try {
      msg = JSON.parse(line);
    } catch {
      write("stdout-text", line);
      continue;
    }
    write("in", msg);
    if (msg.id !== undefined && msg.method === undefined) {
      const p = pending.get(msg.id);
      if (!p) continue;
      pending.delete(msg.id);
      if (msg.error) p.reject(Object.assign(new Error(`${p.method}: ${msg.error.message}`), { rpc: msg.error }));
      else p.resolve(msg.result);
    } else if (msg.method === "session/update") {
      const u = msg.params?.update;
      if (u?.sessionUpdate === "agent_message_chunk" && u.content?.type === "text") reply += u.content.text;
    } else if (msg.method === "session/request_permission") {
      const options = msg.params?.options ?? [];
      const pick =
        options.find((x) => x.kind === "allow_always") ?? options.find((x) => x.kind === "allow_once") ?? options[0];
      send({
        jsonrpc: "2.0",
        id: msg.id,
        result: pick ? { outcome: { outcome: "selected", optionId: pick.optionId } } : { outcome: { outcome: "cancelled" } },
      });
    } else if (msg.id !== undefined) {
      send({ jsonrpc: "2.0", id: msg.id, error: { code: -32601, message: `Method not offered by this client: ${msg.method}` } });
    }
  }
});

function stop(code) {
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {}
  setTimeout(() => {
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {}
    log.end(() => process.exit(code));
  }, 3000);
}
process.on("SIGTERM", () => {
  write("note", "client got SIGTERM; stopping the server");
  fs.writeFileSync(o.final, reply);
  stop(143);
});

try {
  const init = await request("initialize", {
    protocolVersion: 1,
    clientCapabilities: { fs: { readTextFile: false, writeTextFile: false }, terminal: false },
    clientInfo: { name: "bench-acp-run", version: "1.0.0" },
  });
  write("note", { agentInfo: init.agentInfo ?? null, protocolVersion: init.protocolVersion });

  const mcpServers = o["browser-mcp"]
    ? [
        {
          name: "browser",
          command: env.NODE_BIN,
          args: [
            `${env.BENCH_DIR}/tools/pwmcp/node_modules/@playwright/mcp/cli.js`,
            "--browser", "chromium", "--isolated", "--headless", "--viewport-size", "1440x960", "--image-responses", "allow",
          ],
          env: [{ name: "PLAYWRIGHT_BROWSERS_PATH", value: env.PLAYWRIGHT_BROWSERS_PATH }],
        },
      ]
    : [];
  const session = await request("session/new", { cwd: o.workspace, mcpServers });
  const sessionId = session.sessionId;
  let configOptions = session.configOptions ?? [];

  const modes = session.modes?.availableModes?.map((m) => m.id) ?? [];
  if (modes.includes("yolo")) await request("session/set_mode", { sessionId, modeId: "yolo" });

  const modelOption = configOptions.find((c) => c.id === "model");
  const modelValues = (modelOption?.options ?? []).flatMap((e) => ("value" in e ? [e.value] : e.options.map((x) => x.value)));
  if (!modelValues.includes(o.model)) throw new Error(`model ${o.model} not offered; got ${modelValues.join(", ")}`);
  const afterModel = await request("session/set_config_option", { sessionId, configId: "model", value: o.model });
  configOptions = afterModel?.configOptions ?? configOptions;
  const thinking = configOptions.find((c) => c.category === "thought_level");
  if (!thinking) throw new Error("no thinking-level option after selecting the model");
  const thinkingValues = (thinking.options ?? []).flatMap((e) => ("value" in e ? [e.value] : e.options.map((x) => x.value)));
  if (!thinkingValues.includes(o.thinking)) throw new Error(`thinking ${o.thinking} not offered; got ${thinkingValues.join(", ")}`);
  const afterThinking = await request("session/set_config_option", { sessionId, configId: thinking.id, value: o.thinking });
  configOptions = afterThinking?.configOptions ?? configOptions;
  write("note", {
    sessionId,
    mode: modes.includes("yolo") ? "yolo" : session.modes?.currentModeId ?? null,
    config: Object.fromEntries(configOptions.map((c) => [c.id, c.currentValue])),
  });

  const prompt = fs.readFileSync(o["prompt-file"], "utf8");
  const result = await request("session/prompt", { sessionId, prompt: [{ type: "text", text: prompt }] });
  write("note", { turnEnded: result });
  fs.writeFileSync(o.final, reply);
  stop(result?.stopReason === "end_turn" ? 0 : 2);
} catch (err) {
  write("error", { message: err.message, rpc: err.rpc ?? null, exited });
  fs.writeFileSync(o.final, reply);
  stop(1);
}
