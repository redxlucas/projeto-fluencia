#!/bin/bash

set -o allexport
source .env.deploy
set +o allexport

cd frontend
npm install
npm run build

LCD="$PWD/build"
RCD="public_html"

lftp -u "$USER","$PASS" $HOST <<EOF
set ssl:verify-certificate no
mirror -R --verbose "$LCD" "$RCD"
quit
EOF
