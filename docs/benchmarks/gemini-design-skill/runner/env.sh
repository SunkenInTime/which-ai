# Shared settings for the gemini-frontend-design skill runs on t3os. Sourced by setup.sh and run.sh.
# One condition (With Gemini Design Skill), four models, three harnesses:
#   opus-5-5   Claude Code, claude-opus-5-5, effort high
#   fable-5-2  Claude Code, claude-fable-5-2, effort high
#   astra-6-2  Codex CLI, gpt-6.2-astra, reasoning xhigh
#   neon       Antigravity (ACP server), gemini-4-neon, thinking high
# Starter, browser (Playwright MCP 0.0.83 + Chromium 1247, 1440x960) and isolation match the earlier gallery runs.
B=/home/dara/Code/bench-gemini-skill
SKILL=gemini-frontend-design
NODE_BIN=/home/dara/.local/share/vite-plus/js_runtime/node/26.13.1/bin/node
NODE_DIR=$(dirname "$NODE_BIN")
PW_BROWSERS=$B/ms-playwright
CHROME=$PW_BROWSERS/chromium-1247/chrome-linux64/chrome
PWMCP=$B/tools/pwmcp/node_modules/@playwright/mcp/cli.js
STARTER_LOCK_SHA=ce550054f4cc7927b16ae799d6108b8e122542ea0f17dd57142fbbd4ec1cb915

CLAUDE_BIN=$(readlink -f /home/dara/.local/bin/claude)
REAL_CLAUDE_CREDS=/home/dara/.claude/.credentials.json
# Fable 5.2 goes through Dara's CLIProxyAPI hub on this box (Anthropic Messages API, backed by Dara's Claude
# subscriptions), because the box's own Claude login had used its weekly Fable limit. Dara: "hit it from my cli proxy".
PROXY_URL=http://127.0.0.1:8317
PROXY_KEY_FILE=/home/dara/cliproxyapi/client-key
via_proxy() { [ "$(model_of "$1")" = fable-5-2 ]; }

CODEX_BIN=$(readlink -f /home/dara/.local/bin/codex)
REAL_CODEX_AUTH=/home/dara/.codex/auth.json

AGY_RELEASE=83311d3f354567612dc16c1ae2ea9b503d6f6833aa4e138d39aa229da3f3bb99
AGY_DIR=/home/dara/.t3/tools/antigravity-acp/linux-x64/versions/$AGY_RELEASE
# Antigravity CLI 1.5.14: one binary, started as `antigravity acp`, as T3 now starts it.
AGY_BIN=$AGY_DIR/antigravity
AGY_PROFILE=/home/dara/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32
# The sign-in files T3 keeps for this box (Google OAuth): the 1.5 CLI reads antigravity-oauth-token.
AGY_TOKEN_FILES=(acp_token.json antigravity-oauth-token)

# model <run>: everything after the optional "preflight-" prefix names the model.
model_of() { echo "${1#preflight-}"; }
harness_for() {
  case "$(model_of "$1")" in
    opus-5-5 | fable-5-2) echo claude ;;
    astra-6-2) echo codex ;;
    neon) echo agy ;;
    *) echo "unknown run: $1" >&2; return 1 ;;
  esac
}
model_id_for() {
  case "$(model_of "$1")" in
    opus-5-5) echo claude-opus-5-5 ;;
    fable-5-2) echo claude-fable-5-2 ;;
    astra-6-2) echo gpt-6.2-astra ;;
    neon) echo gemini-4-neon ;;
  esac
}
effort_for() {
  case "$(model_of "$1")" in
    opus-5-5 | fable-5-2 | neon) echo high ;;
    astra-6-2) echo xhigh ;;
  esac
}
# Where each harness looks for project skills.
skill_dir_for() {
  case "$(harness_for "$1")" in
    claude) echo .claude/skills ;;
    codex | agy) echo .agents/skills ;;
  esac
}

# Codex: turn off everything that would load beyond the condition's skill, and Codex's own browser and
# computer use, so the browser is Playwright MCP as in every earlier run (same list as the GPT-6.2 Astra runs).
CODEX_ISOLATION=(
  -c skills.bundled.enabled=false
  --disable skill_search
  --disable apps
  --disable plugins
  --disable remote_plugin
  --disable tool_suggest
  --disable memories
  --disable browser_use
  --disable browser_use_external
  --disable in_app_browser
  --disable computer_use
)
