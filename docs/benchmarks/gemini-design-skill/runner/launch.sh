#!/usr/bin/env bash
# launch.sh <run> [label] [prompt-file]: starts run.sh as a transient user service, so the session survives
# this terminal and T3 restarts. Follow it with: journalctl --user -u gemskill-<label> -f
set -euo pipefail
RUN=${1:?run}
LABEL=${2:-$RUN}
systemd-run --user --unit "gemskill-$LABEL" --collect --property=KillMode=mixed \
  /bin/bash "$(dirname "$(readlink -f "$0")")/run.sh" "$RUN" "$LABEL" ${3:+"$3"}
