# Shared settings for the Gemini 4 Neon gallery runs in Antigravity on t3os (headless, over ACP).
# Sourced by setup.sh and run.sh. Inputs, Playwright and the npm cache are shared with ~/Code/bench-neon (the
# Cursor runs) through symlinks, so both harnesses get the same starter, skill files and browser.
B=/home/dara/Code/bench-neon-agy
MODEL=gemini-4-neon
THINKING=xhigh
AGY_RELEASE=923923a0d7dc8073f66cc6f78647a3107e3a7ee2b7e1a24df8b3927b5188013b
AGY_DIR=/home/dara/.t3/tools/antigravity-acp/linux-x64/versions/$AGY_RELEASE
AGY_BIN=$AGY_DIR/agy_acp_server.par
AGY_HARNESS=$AGY_DIR/localharness_external
NODE_BIN=/home/dara/.local/share/vite-plus/js_runtime/node/26.13.1/bin/node
NODE_DIR=$(dirname "$NODE_BIN")
PW_BROWSERS=$B/ms-playwright
CHROME=$PW_BROWSERS/chromium-1247/chrome-linux64/chrome
STARTER_LOCK_SHA=ce550054f4cc7927b16ae799d6108b8e122542ea0f17dd57142fbbd4ec1cb915
# The Antigravity sign-in T3 keeps for this box (Google OAuth refresh token).
REAL_TOKEN=/home/dara/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/acp_token.json

skill_for() {
  case "$1" in
    frontend-design | preflight*) echo frontend-design ;;
    design-taste) echo design-taste-frontend ;;
    no-skills | probe) echo "" ;;
    *) echo "unknown slug: $1" >&2; return 1 ;;
  esac
}
