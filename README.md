# Solid Polls

A polling platform.

## Setup

1. Run `npm run setup` to install all dependencies.
2. Start a postgres instance. You may use `npm run postgres` to start a docker container with the appropriate credentials.
3. To start development, run `npm run dev`.
4. The frontend is available at `http://localhost:8000`, the backend is available at `http://localhost:3000`.

## Code Generation

After changing the backend, run `npm run codegen:full` to copy `swagger.json` into the frontend and generate the API client.

## Tech stack

In the frontend, we use React with <https://github.com/molefrog/wouter> for routing and <https://react-query.tanstack.com> for data fetching.

In the backend, we use NestJS.

## Pre-Commit

Before committing, run `npm run precommit` to run tests and format the code.

## Generating migrations

Run `npm run migration:generate MigrationName` in the backend and edit the generated file, if necessary. Migrations are run automatically on startup.
