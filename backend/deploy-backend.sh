#!/bin/bash

set -o allexport
source .env.deploy
set +o allexport

declare -A DIRS=(
  ["backend/app"]="public_html/app"
  ["backend/helpers"]="public_html/helpers"
  ["backend/routes"]="public_html/routes"
  ["backend/public"]="public_html"
)

lftp -u "$USER","$PASS" "$HOST" <<EOF
set ssl:verify-certificate no
$(for LOCAL in "${!DIRS[@]}"; do
  REMOTE="${DIRS[$LOCAL]}"
  echo "mirror -R --verbose --overwrite --delete \"$LOCAL\" \"$REMOTE\""
done)
quit
EOF
