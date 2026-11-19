#!/usr/bin/env bash
# run-motion.sh <run-dir> <sandbox>
# The Motion session for Gemini 4 Neon in Antigravity, headless over ACP (acp-run.mjs), in the sandbox that
# `node scripts/motion/new.mjs gemini-4-neon` printed. Like the repo's Motion runner (isolatedEnv in
# scripts/motion/harness.mjs): a fresh home in the sandbox holding only the login, an allowlisted environment,
# stock tools only (no browser MCP; the agent previews frames with `node motion.mjs`). Like the gallery runs, a
# private mount namespace hides the box's agent instructions and the shared /tmp. Writes antigravity.jsonl,
# final.txt, session.json into the run folder. Then run scripts/motion/finish.mjs on the run folder.
set -euo pipefail
. "$(dirname "$0")/env.sh"
RUN=${1:?run dir}
SB=${2:?sandbox}
H=$SB/home
W=$SB/project
[ -e "$RUN/antigravity.jsonl" ] && { echo "already ran: $RUN" >&2; exit 1; }
G=$H/.gemini
mkdir -p "$G/antigravity-acp" "$H/.tmp" "$B/motion-tools"
chmod 700 "$G" "$G/antigravity-acp"
install -m 600 "$REAL_TOKEN" "$G/antigravity-acp/acp_token.json"
printf '{"auth":{"type":"oauth-personal"}}\n' >"$G/antigravity-acp/settings.json"
# Only ffmpeg and ffprobe from ~/.local/bin, which also holds other agent CLIs.
ln -sf /home/dara/.local/bin/ffmpeg "$B/motion-tools/ffmpeg"
ln -sf /home/dara/.local/bin/ffprobe "$B/motion-tools/ffprobe"

ENVV=(
  HOME="$H"
  XDG_CONFIG_HOME="$H/.config"
  XDG_CACHE_HOME="$H/.cache"
  XDG_DATA_HOME="$H/.local/share"
  TMPDIR="$H/.tmp" TMP="$H/.tmp" TEMP="$H/.tmp"
  PATH="$NODE_DIR:$B/motion-tools:/usr/local/bin:/usr/bin:/bin"
  SHELL=/bin/bash LANG=C.UTF-8 TERM=dumb USER=dara LOGNAME=dara
  PLAYWRIGHT_BROWSERS_PATH=/home/dara/.cache/ms-playwright
  GEMINI_HOME="$G"
  AGY_ACP_FORCE_FILE_STORAGE=1
  ANTIGRAVITY_HARNESS_PATH="$AGY_HARNESS"
  BROWSER=/bin/false
  PYTHONUNBUFFERED=1
  ELECTRON_RUN_AS_NODE=1
  AGY_BIN="$AGY_BIN"
  NODE_BIN="$NODE_BIN"
  BENCH_DIR="$B"
)
ARGS=(--workspace "$W" --prompt-file "$RUN/PROMPT.txt" --log "$RUN/antigravity.jsonl" --final "$RUN/final.txt"
  --model "$MODEL" --thinking "$THINKING")
start=$(date +%s)
date -u +%Y-%m-%dT%H:%M:%S.%3NZ >"$RUN/antigravity.started"
set +e
sudo -n unshare --mount --propagation private -- /bin/sh -c '
  mount --bind "$1" /etc/codex && mount --bind "$1" /etc/claude-code && mount --bind "$2" /tmp && shift 2 &&
  exec setpriv --reuid=dara --regid=dara --init-groups -- "$@"
' sh "$B/empty-etc" "$H/.tmp" env -i "${ENVV[@]}" "$NODE_BIN" "$B/bin/acp-run.mjs" "${ARGS[@]}" \
  </dev/null >"$RUN/antigravity.client.log" 2>&1
code=$?
set -e
end=$(date +%s)
date -u +%Y-%m-%dT%H:%M:%S.%3NZ >"$RUN/antigravity.finished"
printf '{"exitCode":%s,"wallSeconds":%s}\n' "$code" "$((end - start))" >"$RUN/session.json"
# Each launch unpacks about 1 GB of runtime into TMPDIR; it isn't part of the record.
rm -rf "$H/.tmp"
exit "$code"
