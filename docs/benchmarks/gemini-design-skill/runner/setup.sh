#!/usr/bin/env bash
# setup.sh <opus-5-5|fable-5-2|astra-6-2|neon|preflight-<model>>
# Creates $B/<run>/{work,home,tmp}: starter eeeb008 + npm ci, the gemini-frontend-design skill in the harness's
# project skill folder, a baseline commit, and an isolated HOME holding only a copy of the harness's sign-in
# (and, for Codex and Claude Code, a config naming the one MCP server, the browser).
set -euo pipefail
. "$(dirname "$0")/env.sh"
RUN=${1:?run}
H=$(harness_for "$RUN")
R=$B/$RUN
[ -e "$R" ] && { echo "exists: $R" >&2; exit 1; }
mkdir -p "$R/work" "$R/home" "$R/tmp"

tar -xf "$B/inputs/starter-eeeb008.tar" -C "$R/work"
lock=$(sha256sum "$R/work/package-lock.json" | cut -d' ' -f1)
[ "$lock" = "$STARTER_LOCK_SHA" ] || { echo "lockfile sha mismatch: $lock" >&2; exit 1; }
(cd "$R/work" && PATH="$NODE_DIR:/usr/bin:/bin" npm_config_cache="$B/npm-cache" npm ci --no-audit --no-fund --loglevel=error >"$R/npm-ci.log" 2>&1)

SD=$(skill_dir_for "$RUN")
mkdir -p "$R/work/$SD"
cp -r "$B/inputs/skills/$SKILL" "$R/work/$SD/$SKILL"
git -C "$R/work" init -q
git -C "$R/work" add -A
git -C "$R/work" -c user.name=bench -c user.email=bench@localhost commit -qm "Benchmark starter eeeb008 + $SKILL skill"
git -C "$R/work" rev-parse HEAD >"$R/baseline-commit.txt"

case "$H" in
  claude)
    mkdir -p "$R/home/.claude"
    chmod 700 "$R/home/.claude"
    if via_proxy "$RUN"; then :; else
    # The copy keeps only the current access token (about 4 h left when copied), not the refresh token, so a
    # session can never rotate the box's real Claude login out from under the other sessions using it.
    "$NODE_BIN" -e '
      const fs = require("fs");
      const [src, dst] = process.argv.slice(1);
      const c = JSON.parse(fs.readFileSync(src, "utf8"));
      const o = { ...c.claudeAiOauth };
      delete o.refreshToken; delete o.refreshTokenExpiresAt;
      fs.writeFileSync(dst, JSON.stringify({ claudeAiOauth: o }), { mode: 0o600 });
      console.log("access token hours left:", ((o.expiresAt - Date.now()) / 3.6e6).toFixed(2));
    ' "$REAL_CLAUDE_CREDS" "$R/home/.claude/.credentials.json"
    fi
    printf '{"hasCompletedOnboarding":true}\n' >"$R/home/.claude.json"
    # Claude Code 2.1.331 syncs the account's claude.ai skills (anthropic-skills:*) unless the user settings say not to;
    # the CLAUDE_CODE_SYNC_* variables in run.sh didn't stop it in the first preflight.
    if via_proxy "$RUN"; then
      printf '{"syncClaudeAiSkills":false,"syncClaudeAiPlugins":false,"apiKeyHelper":"cat %s"}\n' "$PROXY_KEY_FILE" >"$R/home/.claude/settings.json"
    else
      printf '{"syncClaudeAiSkills":false,"syncClaudeAiPlugins":false}\n' >"$R/home/.claude/settings.json"
    fi
    cat >"$R/mcp.json" <<EOF
{ "mcpServers": { "browser": { "command": "$NODE_BIN", "args": ["$PWMCP", "--browser", "chromium", "--isolated", "--headless", "--viewport-size", "1440x960", "--image-responses", "allow"], "env": { "PLAYWRIGHT_BROWSERS_PATH": "$PW_BROWSERS" } } } }
EOF
    ;;
  codex)
    mkdir -p "$R/home/.codex"
    install -m 600 "$REAL_CODEX_AUTH" "$R/home/.codex/auth.json"
    sha256sum "$REAL_CODEX_AUTH" | cut -d' ' -f1 >"$R/auth-copied.sha256"
    cat >"$R/home/.codex/config.toml" <<EOF
model = "$(model_id_for "$RUN")"
model_reasoning_effort = "$(effort_for "$RUN")"
check_for_update_on_startup = false

[mcp_servers.browser]
command = "$NODE_BIN"
args = ["$PWMCP", "--browser", "chromium", "--isolated", "--headless", "--viewport-size", "1440x960", "--image-responses", "allow"]
env = { PLAYWRIGHT_BROWSERS_PATH = "$PW_BROWSERS" }
startup_timeout_sec = 60
tool_timeout_sec = 180
EOF
    ;;
  agy)
    G=$R/home/.gemini
    mkdir -p "$G/antigravity-acp"
    chmod 700 "$G" "$G/antigravity-acp"
    for f in "${AGY_TOKEN_FILES[@]}"; do install -m 600 "$AGY_PROFILE/antigravity-acp/$f" "$G/antigravity-acp/$f"; done
    printf '{"auth":{"type":"oauth-personal"}}\n' >"$G/antigravity-acp/settings.json"
    ;;
esac
echo "ok $R harness=$H lock=$lock baseline=$(cat "$R/baseline-commit.txt") skill=$SD/$SKILL"
