#!/usr/bin/env bash
# run.sh <slug> [label] [prompt-file] [--browser-mcp]
# One headless Antigravity session (acp-run.mjs) in $B/<slug>/work with an isolated home and a minimal
# environment. Writes <slug>/<label>.started / .jsonl / .final.txt / .exitcode / .finished (UTC ISO, ms) and
# .invocation.json. Start it with launch.sh so it outlives the terminal.
set -euo pipefail
. "$(dirname "$0")/env.sh"
SLUG=${1:?slug}
LABEL=${2:-$SLUG}
PROMPT_FILE=${3:-$B/prompts/$SLUG.txt}
EXTRA=${4:-}
R=$B/$SLUG
for p in "$R/work" "$R/home/.gemini/antigravity-acp/acp_token.json" "$PROMPT_FILE" "$AGY_BIN" "$AGY_HARNESS" "$CHROME"; do
  [ -e "$p" ] || { echo "missing: $p" >&2; exit 1; }
done
[ -e "$R/$LABEL.started" ] && { echo "already started: $R/$LABEL.started" >&2; exit 1; }
stamp() { date -u +%Y-%m-%dT%H:%M:%S.%3NZ; }

ENVV=(
  HOME="$R/home"
  XDG_CONFIG_HOME="$R/home/.config"
  XDG_CACHE_HOME="$R/home/.cache"
  XDG_DATA_HOME="$R/home/.local/share"
  TMPDIR="$R/tmp"
  PATH="$NODE_DIR:/usr/local/bin:/usr/bin:/bin"
  SHELL=/bin/bash
  LANG=C.UTF-8
  TERM=dumb
  USER=dara
  CHROME_PATH="$CHROME"
  PLAYWRIGHT_BROWSERS_PATH="$PW_BROWSERS"
  npm_config_cache="$B/npm-cache"
  # What T3 sets when it starts the same server (antigravityAuthSupport.ts), minus T3's own paths.
  GEMINI_HOME="$R/home/.gemini"
  AGY_ACP_FORCE_FILE_STORAGE=1
  ANTIGRAVITY_HARNESS_PATH="$AGY_HARNESS"
  BROWSER=/bin/false
  PYTHONUNBUFFERED=1
  ELECTRON_RUN_AS_NODE=1
  # Read by acp-run.mjs only.
  AGY_BIN="$AGY_BIN"
  NODE_BIN="$NODE_BIN"
  BENCH_DIR="$B"
)
CLIENT_ARGS=(--workspace "$R/work" --prompt-file "$PROMPT_FILE" --log "$R/$LABEL.jsonl" --final "$R/$LABEL.final.txt"
  --model "$MODEL" --thinking "$THINKING" ${EXTRA:+"$EXTRA"})

"$NODE_BIN" -e '
  const [file, exe, release, model, thinking, prompt, sha, ...rest] = process.argv.slice(1);
  const i = rest.indexOf("--");
  require("fs").writeFileSync(file, JSON.stringify({
    runner: "acp-run.mjs (headless ACP client) driving agy_acp_server.par with localharness_external",
    exe, release, model, thinking,
    wrapper: "sudo unshare --mount; mount --bind empty-etc /etc/codex and /etc/claude-code; mount --bind <run>/tmp /tmp; setpriv --reuid=dara --regid=dara --init-groups; env -i",
    clientArgs: rest.slice(0, i), promptFile: prompt, promptSha256: sha, env: rest.slice(i + 1),
  }, null, 2) + "\n");
' "$R/$LABEL.invocation.json" "$AGY_BIN" "$AGY_RELEASE" "$MODEL" "$THINKING" "$PROMPT_FILE" \
  "$(sha256sum "$PROMPT_FILE" | cut -d' ' -f1)" "${CLIENT_ARGS[@]}" -- "${ENVV[@]}"

stamp >"$R/$LABEL.started"
set +e
# Same wrapper as the Cursor runs: a private mount namespace hides the box's agent instructions (/etc/codex,
# /etc/claude-code) and the shared /tmp, then the session runs as dara with only the environment above.
mkdir -p "$B/empty-etc"
sudo -n unshare --mount --propagation private -- /bin/sh -c '
  mount --bind "$1" /etc/codex && mount --bind "$1" /etc/claude-code && mount --bind "$2" /tmp && shift 2 &&
  exec setpriv --reuid=dara --regid=dara --init-groups -- "$@"
' sh "$B/empty-etc" "$R/tmp" env -i "${ENVV[@]}" "$NODE_BIN" "$B/bin/acp-run.mjs" "${CLIENT_ARGS[@]}" \
  </dev/null >"$R/$LABEL.client.log" 2>&1
code=$?
set -e
stamp >"$R/$LABEL.finished"
echo "$code" >"$R/$LABEL.exitcode"
exit "$code"
