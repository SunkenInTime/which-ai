#!/usr/bin/env bash
# setup.sh <no-skills|frontend-design|design-taste|preflight*|probe>
# Creates $B/<slug>/{work,home,tmp}: starter eeeb008 + npm ci, the condition's skill (if any) at
# work/.agents/skills/<name> (a project skill folder Antigravity reads), a baseline commit, and an isolated HOME
# whose GEMINI_HOME holds only a copy of the Antigravity sign-in. The browser (Playwright MCP 0.0.83, Chromium
# 1247, the same flags as the Cursor runs) is passed per session by acp-run.mjs, not written into the workspace.
set -euo pipefail
. "$(dirname "$0")/env.sh"
SLUG=${1:?slug}
SKILL=$(skill_for "$SLUG")
R=$B/$SLUG
[ -e "$R" ] && { echo "exists: $R" >&2; exit 1; }
G=$R/home/.gemini
mkdir -p "$R/work" "$G/antigravity-acp" "$R/tmp"
chmod 700 "$G" "$G/antigravity-acp"
install -m 600 "$REAL_TOKEN" "$G/antigravity-acp/acp_token.json"
printf '{"auth":{"type":"oauth-personal"}}\n' >"$G/antigravity-acp/settings.json"
if [ "$SLUG" = probe ]; then echo "ok $R (probe)"; exit 0; fi

tar -xf "$B/inputs/starter-eeeb008.tar" -C "$R/work"
lock=$(sha256sum "$R/work/package-lock.json" | cut -d' ' -f1)
[ "$lock" = "$STARTER_LOCK_SHA" ] || { echo "lockfile sha mismatch: $lock" >&2; exit 1; }
(cd "$R/work" && PATH="$NODE_DIR:/usr/bin:/bin" npm_config_cache="$B/npm-cache" npm ci --no-audit --no-fund --loglevel=error >"$R/npm-ci.log" 2>&1)

msg="Benchmark starter eeeb008"
if [ -n "$SKILL" ]; then
  mkdir -p "$R/work/.agents/skills"
  cp -r "$B/inputs/skills/$SKILL" "$R/work/.agents/skills/$SKILL"
  msg="Benchmark starter eeeb008 + $SKILL skill"
fi
git -C "$R/work" init -q
git -C "$R/work" add -A
git -C "$R/work" -c user.name=bench -c user.email=bench@localhost commit -qm "$msg"
git -C "$R/work" rev-parse HEAD >"$R/baseline-commit.txt"
echo "ok $R lock=$lock baseline=$(cat "$R/baseline-commit.txt") skill=${SKILL:-none}"
