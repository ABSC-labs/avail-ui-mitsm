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

### Docker

To help with fast pace deployments you can quickly get a new docker image built. This `just` command will perform lint and prettier before building a Docker image. The Docker build process will copy over necessary files and then perform a `vite build` process to create bundled assets. After the vite build is complete all assets will be copied over to a base NGINX Docker image and expose port 80.

```bash
just dockerize
```

After the build is finished you can run the container with the following:

```bash
just docker
```

Browse to [http://localhost:8080](http://localhost:8080)

## Keycloak

This UI runs on a Keycloak AuthN and AuthZ solution.

1. `just keycloak`
2. Import `deploy/local/keycloak/test.realm-export` to Keycloak when [creating a new realm](https://www.keycloak.org/docs/13.0/getting_started/#creating-a-realm-and-a-user) in Keycloak.
3. [Create a new user](https://www.keycloak.org/docs/13.0/getting_started/#creating-a-realm-and-a-user).
4. Add the `user` and/or `admin` role to the new user.

## Documentation

https://docs.cremawork.com/
