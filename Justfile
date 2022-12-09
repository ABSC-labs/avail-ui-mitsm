git-hooks-dir := ".git/hooks"
current-app-version := `jq -r .version ./package.json`

##### DEFAULT

default:
  @just --list --unsorted
  
##### ADMIN ACTIONS
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
quick: init dev

# Docker Build
dockerize: clean-code
    docker build . -t avail-ui:v{{ current-app-version }} -t avail-ui:latest

# Docker Run
docker:
    docker run --rm --name avail-ui -p 8080:80 avail-ui

# Version Print
version:
    RED="\033[1;31m"; GREEN="\033[1;32m"; NC="\033[0m"; echo "${GREEN}Avail${NC}: {{ current-app-version }}\n${GREEN}Node.js${NC}: $(node --version)\n${GREEN}Vite.js${NC}: $(npx vite --version)\n${GREEN}Docker${NC}: $(docker version)"
