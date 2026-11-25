#!/usr/bin/env bash
# run.sh <run> [label] [prompt-file]
# One headless session in $B/<run>/work with an isolated home and a minimal environment, through the run's
# harness (Claude Code, Codex or Antigravity). Writes <run>/<label>.started / .jsonl / .stderr / .exitcode /
# .finished (UTC ISO, ms) and .invocation.json. Start it with launch.sh so it outlives the terminal.
set -euo pipefail
. "$(dirname "$0")/env.sh"
RUN=${1:?run}
LABEL=${2:-$RUN}
PROMPT_FILE=${3:-$B/prompts/$RUN.txt}
H=$(harness_for "$RUN")
MODEL=$(model_id_for "$RUN")
EFFORT=$(effort_for "$RUN")
R=$B/$RUN
for p in "$R/work" "$PROMPT_FILE" "$CHROME" "$PWMCP"; do
  [ -e "$p" ] || { echo "missing: $p" >&2; exit 1; }
done
[ -e "$R/$LABEL.started" ] && { echo "already started: $R/$LABEL.started" >&2; exit 1; }
stamp() { date -u +%Y-%m-%dT%H:%M:%S.%3NZ; }

ENVV=(
  HOME="$R/home"
  TMPDIR="$R/tmp"
  PATH="$NODE_DIR:/usr/local/bin:/usr/bin:/bin"
  SHELL=/bin/bash
  LANG=C.UTF-8
  TERM=dumb
  USER=dara
  CHROME_PATH="$CHROME"
  PLAYWRIGHT_BROWSERS_PATH="$PW_BROWSERS"
  npm_config_cache="$B/npm-cache"
)
case "$H" in
  claude)
    EXE=$CLAUDE_BIN
    VERSION=$("$CLAUDE_BIN" --version)
    ARGV=(-p --model "$MODEL" --effort "$EFFORT" --strict-mcp-config --mcp-config "$R/mcp.json"
      --dangerously-skip-permissions --output-format stream-json --verbose)
    # The same switches as the Opus 5.5 and Fable 5.1 taste-skill runs: no bundled skills, no account skill or
    # plugin sync, no policy skills, no autoupdater, no background tasks.
    ENVV+=(
      CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1
      CLAUDE_CODE_SYNC_SKILLS=0
      CLAUDE_CODE_SYNC_PLUGINS=0
      CLAUDE_CODE_DISABLE_POLICY_SKILLS=1
      DISABLE_AUTOUPDATER=1
      CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1
    )
    # Proxy runs: the key comes from apiKeyHelper in the run's settings.json (setup.sh), so it never appears on a
    # command line or in the invocation record.
    if via_proxy "$RUN"; then ENVV+=(ANTHROPIC_BASE_URL="$PROXY_URL"); fi
    STDIN=$PROMPT_FILE
    ;;
  codex)
    EXE=$CODEX_BIN
    VERSION=$("$CODEX_BIN" --version)
    ARGV=(exec --model "$MODEL" -c "model_reasoning_effort=$EFFORT" "${CODEX_ISOLATION[@]}"
      --dangerously-bypass-approvals-and-sandbox --skip-git-repo-check --json -C "$R/work" -)
    ENVV+=(CODEX_HOME="$R/home/.codex")
    STDIN=$PROMPT_FILE
    ;;
  agy)
    EXE=$NODE_BIN
    VERSION="antigravity-acp $AGY_RELEASE"
    ARGV=("$B/bin/acp-run.mjs" --workspace "$R/work" --prompt-file "$PROMPT_FILE" --log "$R/$LABEL.jsonl"
      --final "$R/$LABEL.final.txt" --model "$MODEL" --thinking "$EFFORT" --browser-mcp)
    # What T3 sets when it starts the same server, minus T3's own paths (as in the Gemini 4 Neon runs).
    ENVV+=(
      XDG_CONFIG_HOME="$R/home/.config"
      XDG_CACHE_HOME="$R/home/.cache"
      XDG_DATA_HOME="$R/home/.local/share"
      GEMINI_HOME="$R/home/.gemini"
      AGY_ACP_FORCE_FILE_STORAGE=1
      AGY_CLI_DISABLE_AUTO_UPDATE=1
      # The 1.5 CLI keeps Google sign-ins in the OS keyring unless it thinks it runs over SSH (T3 sets the same).
      SSH_CONNECTION="127.0.0.1 0 127.0.0.1 0"
      AGY_ARGS="[\"acp\",\"--gemini-dir\",\"$R/home/.gemini\",\"--app-data-dir\",\"antigravity-acp\"]"
      BROWSER=/bin/false
      PYTHONUNBUFFERED=1
      ELECTRON_RUN_AS_NODE=1
      AGY_BIN="$AGY_BIN"
      NODE_BIN="$NODE_BIN"
      BENCH_DIR="$B"
    )
    STDIN=/dev/null
    ;;
esac

"$NODE_BIN" -e '
  const [file, harness, exe, version, model, effort, prompt, sha, ...rest] = process.argv.slice(1);
  const i = rest.indexOf("--");
  require("fs").writeFileSync(file, JSON.stringify({
    harness, exe, version, model, effort,
    wrapper: "sudo unshare --mount; mount --bind empty-etc over /etc/codex and /etc/claude-code; read-only empty folder over /home/dara/.claude, .agents and .gemini; mount --bind <run>/tmp /tmp; setpriv --reuid=dara --regid=dara --init-groups; env -i",
    argv: rest.slice(0, i), promptFile: prompt, promptSha256: sha, env: rest.slice(i + 1),
  }, null, 2) + "\n");
' "$R/$LABEL.invocation.json" "$H" "$EXE" "$VERSION" "$MODEL" "$EFFORT" "$PROMPT_FILE" \
  "$(sha256sum "$PROMPT_FILE" | cut -d' ' -f1)" "${ARGV[@]}" -- "${ENVV[@]}"

OUT=$R/$LABEL.jsonl
[ "$H" = agy ] && OUT=$R/$LABEL.client.log
stamp >"$R/$LABEL.started"
set +e
# A private mount namespace (made as root, no user namespace) binds an empty folder over /etc/codex and
# /etc/claude-code, so the box's managed agent instructions don't reach the session, and the run's own tmp over
# /tmp, so the session doesn't see what other work on this box left there. The session then runs as dara with
# only the environment above. Context isolation, not a filesystem jail.
# The user's own agent folders (~/.claude, ~/.agents, ~/.gemini) get an empty folder too: the workspaces sit under
# /home/dara, and Claude Code reads .claude/CLAUDE.md from every folder above the workspace, so the first Opus
# preflight loaded Dara's personal CLAUDE.md. empty-user must stay empty (checked after the runs).
mkdir -p "$B/empty-user"
sudo -n unshare --mount --propagation private -- /bin/sh -c '
  mount --bind "$1" /etc/codex && mount --bind "$1" /etc/claude-code && mount --bind "$2" /tmp &&
  mount -o bind,ro "$4" /home/dara/.claude && mount -o bind,ro "$4" /home/dara/.agents && mount -o bind,ro "$4" /home/dara/.gemini &&
  cd "$3" && shift 4 &&
  exec setpriv --reuid=dara --regid=dara --init-groups -- "$@"
' sh "$B/empty-etc" "$R/tmp" "$R/work" "$B/empty-user" env -i "${ENVV[@]}" "$EXE" "${ARGV[@]}" <"$STDIN" >"$OUT" 2>"$R/$LABEL.stderr"
code=$?
set -e
stamp >"$R/$LABEL.finished"
echo "$code" >"$R/$LABEL.exitcode"

# Codex: if it refreshed its login during the run, copy the new one back, but only when the real login is still
# the one this run started from, so a refresh elsewhere is never overwritten.
if [ "$H" = codex ]; then
  copied=$(cat "$R/auth-copied.sha256")
  now_real=$(sha256sum "$REAL_CODEX_AUTH" | cut -d' ' -f1)
  now_run=$(sha256sum "$R/home/.codex/auth.json" | cut -d' ' -f1)
  if [ "$now_run" != "$copied" ]; then
    if [ "$now_real" = "$copied" ]; then
      install -m 600 "$R/home/.codex/auth.json" "$REAL_CODEX_AUTH"
      echo "$(stamp) synced refreshed login back" >>"$R/$LABEL.auth.log"
    else
      echo "$(stamp) run refreshed its login but the real one changed too; left the real one alone" >>"$R/$LABEL.auth.log"
    fi
  fi
fi
exit "$code"
