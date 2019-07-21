#!/usr/bin/env sh
set -x

sudo apt install -y mongodb

mongo --eval 'db.runCommand({ connectionStatus: 1 })'

node db.js