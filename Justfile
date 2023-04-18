git-hooks-dir := ".git/hooks"
current-app-version := `jq -r .version ./package.json`
keycloak-port := "8085"

# Colors
red := "\\033[1;31m"
green := "\\033[1;32m"
nc := "\\033[0m"

default:
  @just --list --unsorted

# Initial Project Setup
init: move-git-hooks
    VALUE_HOME=${NVM_HOME:=$HOME/.nvm}; source $VALUE_HOME/nvm.sh; nvm use
    npm i --force

# Move git hooks (Renames them with a .local suffix)
move-git-hooks:
    if [ -d {{ git-hooks-dir }} ]; then for file in {{ git-hooks-dir }}/*; do mv -- "$file" "${file}.local"; done && cp .hooks/* {{ git-hooks-dir }}/; fi

# Clean The Code
clean-code: lint format

# ES Lint
lint:
    npm run lint

# Prettier Formatting
format:
    npm run format

# Run Cypress Tests
cypress:
    npx cypress run

# Start Development Server
dev:
    npm run dev

# Build Static Assets
build: clean-code
    npm run build

# Static Asset Preview
preview: build
    npm run preview

# Quick Start
quick: init keycloak sleep15 dev

# Docker Builder Build
dockerize-builder: clean-code
    docker build . -f Dockerfile.builder -t avail-ui-builder:v{{ current-app-version }} -t avail-ui-builder:latest --no-cache --progress plain

# Docker Build
dockerize: clean-code
    source ./.env && docker build . -t avail-ui:v{{ current-app-version }} -t avail-ui:latest --no-cache --build-arg keycloak_service_protocol=${KEYCLOAK_SERVICE_PROTOCOL} --build-arg keycloak_service_host=${KEYCLOAK_SERVICE_HOST} --build-arg keycloak_service_port=${KEYCLOAK_SERVICE_PORT} --build-arg keycloak_realm=${VITE_KEYCLOAK_REALM} --build-arg keycloak_client_id=${VITE_KEYCLOAK_CLIENT_ID} --progress plain

# Docker Run
docker:
    docker run -d --name avail-ui -p 8080:80 avail-ui

# Start Local Keycloak
keycloak:
    if lsof -Pi :{{ keycloak-port }} -sTCP:LISTEN -t >/dev/null; then echo "Keycloak already running..."; else docker run --name avail-keycloak -d -p {{ keycloak-port }}:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin ghcr.io/absc-labs/avail-keycloak:main start-dev --import-realm; fi

# Version Print
version:
    echo "{{ green }}Avail{{ nc }}: {{ current-app-version }}\n{{ green }}Node.js{{ nc }}: $(node --version)\n{{ green }}Vite.js{{ nc }}: $(npx vite --version)\n{{ green }}Docker{{ nc }}: $(docker version)"

# Sleep Helper
sleep5:
    just sleep 5

sleep10:
    just sleep 10

sleep15:
    just sleep 15

sleep n:
    for ((i=1; i<={{ n }}; i++)); do sleep 1 && echo "$i..."; done;