#!/usr/bin/env bash
# launch.sh <slug> [label] [prompt-file] [--browser-mcp]: starts run.sh as a transient user service, so the
# session survives this terminal and T3 restarts. Follow it with status.sh.
set -euo pipefail
SLUG=${1:?slug}
LABEL=${2:-$SLUG}
systemd-run --user --unit "neon-agy-$LABEL" --collect --property=KillMode=mixed \
  /bin/bash "$(dirname "$(readlink -f "$0")")/run.sh" "$SLUG" "$LABEL" ${3:+"$3"} ${4:+"$4"}
