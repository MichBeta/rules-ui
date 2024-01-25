#!/bin/bash

# ATTENTION!: This script it's executed on PCF machine AND NOT ON Concourse Machine

set -xe

export TERM=xterm

VERSION=$(cat build/version.txt)

echo "window.__APPLICATION_SERVICES__=\"${APPLICATION_SERVICES}\"" > build/injected_values.js
echo "window.__AUTH_SERVER__=\"${AUTH_SERVER}\"" >> build/injected_values.js
echo "window.__LOGIN_SERVICES__=\"${LOGIN_SERVICES}\"" >> build/injected_values.js
echo "window.__MAPS_API_KEY__=\"${MAPS_API_KEY}\"" >> build/injected_values.js
echo "window.__VS__=\"${VS}\"" >> build/injected_values.js
echo "window.__VERSION__=\"${VERSION}\"" >> build/injected_values.js
echo "window.__PENDO_KEY__=\"${PENDO_KEY}\"" >> build/injected_values.js

export NODE_PATH=./src
export PORT=$PORT

mv build server

cd server

npm install && npm start