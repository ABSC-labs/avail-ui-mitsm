git-hooks-dir := ".git/hooks"

##### DEFAULT

default:
  @just --list --unsorted
  
##### ADMIN ACTIONS
# Initial Project Setup
init: move-git-hooks
    source $HOME/.nvm/nvm.sh; nvm use
    npm i --force

# Move git hooks (Renames them with a .local suffix)
move-git-hooks:
    for file in {{ git-hooks-dir }}/*; do mv -- "$file" "${file}.local"; done
    cp .hooks/* {{ git-hooks-dir }}/

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

# Quick Start
quick: init dev