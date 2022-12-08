# AVAIL UI

## Requirements

- Install [nvm](https://github.com/nvm-sh/nvm)
  - `brew install nvm`
- Install [Just](https://github.com/casey/just)
  - `brew install just`

## Quick Start

- `just quick`

## Development

### Just

This repository has a `Justfile` that operates with [Just](https://github.com/casey/just). This file defines easy to use commands to help operate this repository. Run `just` to list all of the available commands.

### Linting

This repository has installed [ES Lint](https://eslint.org/) to help handle coding standards and best practices for this project.

```bash
just lint
```

> :warning: Vite will automatically run lint during startup with `just start`

### Prettier

This repository has installed [Prettier]() to help with autoformatting TypeScript and JavaScript files.

```bash
just format
```

### Git Hooks

This repository has setup a `pre-commit` git hook in order to run linting and prettier prior to commits being executed. If either task fails, then the files cannot be commited. If you need to force the commit through, then add the `--no-verify` option to the `git commit` command.

## Documentation

https://docs.cremawork.com/
