##### DEFAULT

default:
  @just --list
  
##### ADMIN ACTIONS
# Initial Project Setup
init:
    source $HOME/.nvm/nvm.sh; nvm use
    npm i --force

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