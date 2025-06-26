#!/bin/bash

set -o allexport
source .env.deploy
set +o allexport

LCD="$PWD/backend/app"
RCD="public_html/app"

lftp -u "$USER","$PASS" $HOST <<EOF
set ssl:verify-certificate no
mirror -R --verbose "$LCD" "$RCD"
quit
EOF
