# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend for [investbook](https://github.com/spacious-team/investbook) — an investment portfolio management application. Built as an Nx monorepo with Yarn as the package manager.

## Commands

```bash
# Install dependencies and set up git hooks
yarn && yarn prepare

# Dev server at http://localhost:4200
yarn dev

# Production build (outputs to dist/apps/local)
yarn build

# Run tests (all projects)
yarn test

# Lint (all projects)
yarn lint

# Lint with auto-fix (all projects)
yarn lint:fix

# Preview production build at http://localhost:4300
yarn preview
```

### Running per-project Nx targets

```bash
# Run tests for a specific lib
npx nx test common-ui
npx nx test products

# Lint a specific lib
npx nx lint common-ui
npx nx lint products

# Build a lib
npx nx build common-ui
```

## Architecture

### Monorepo structure

- **`apps/local`** — The single application. Entry point: `src/main.tsx`. Routes are defined in `src/app/app.tsx` using React Router v7 `createBrowserRouter`. Pages live in `src/app/pages/`.
- **`libs/common-ui`** — Shared React UI components. Import via `@investbook-pages/common-ui`. All public exports go through `src/index.ts`.
- **`libs/products`** — Business logic / data layer. Import via `@investbook-pages/products`. All public exports go through `src/index.ts`.

### Path aliases (tsconfig.base.json)

```
@investbook-pages/common-ui  →  libs/common-ui/src/index.ts
@investbook-pages/products   →  libs/products/src/index.ts
```

### Key technology choices

- **React 19** with functional components and hooks
- **Tailwind CSS v4** + **shadcn/ui** (new-york style, zinc base color) for styling — use Tailwind utility classes; `cn()` helper from `@investbook-pages/common-ui` for conditional class merging
- **React Router v7** — `createBrowserRouter` pattern
- **Vitest** + **@testing-library/react** for tests
- **Nx 22** for monorepo task orchestration and caching

### Styling setup

- Tailwind entry point: `apps/local/src/index.css` — imports `tailwindcss`, `tw-animate-css`, and adds `@source` directives to scan `libs/common-ui/src`
- shadcn/ui config: `components.json` at repo root
- OKLCH design tokens (zinc palette, light + dark) defined in `index.css`
- `cn` utility (`clsx` + `tailwind-merge`): `libs/common-ui/src/lib/utils.ts`, re-exported from `@investbook-pages/common-ui`
- Vite integration via `@tailwindcss/vite` plugin

### Nx module boundary enforcement

The `@nx/enforce-module-boundaries` ESLint rule is active. Apps can import from libs; libs must not import from apps or create circular dependencies.

## Code conventions

- Component files use PascalCase (`MainPage.tsx`, `banner.tsx`)
- New shared UI components go in `libs/common-ui/src/lib/` and must be re-exported from `libs/common-ui/src/index.ts`
- New business logic goes in `libs/products/src/lib/` and must be re-exported from `libs/products/src/index.ts`
- Nx generators default to `none` for styling (no CSS-in-JS), `eslint`, `vite`, and `vitest` — use these defaults when scaffolding new apps/libs
- New shadcn/ui components: run `npx shadcn add <component>` from repo root; components land in `libs/common-ui/src/lib/` and must be re-exported from `libs/common-ui/src/index.ts`

## API client generation (openapi-ts)

```bash
# Requires the backend running at http://localhost:2030
yarn openapi-ts
```

Two-step process:

1. `scripts/transform-spec.mjs` — fetches spec from `http://localhost:2030/v3/api-docs/public`, transliterates Cyrillic schema names to Latin, generates `operationId`s from HTTP method + path, writes `openapi-spec.json`
2. `openapi-ts` — reads `openapi-ts.config.ts`, generates TypeScript client into `libs/products/src/client/`

Generated files (auto-generated, do not edit manually):

- `types.gen.ts` — request/response types
- `sdk.gen.ts` — typed SDK functions per endpoint
- `client.gen.ts` — Fetch client instance
- `core/` — internal serialization/auth utilities

Everything is re-exported from `libs/products/src/index.ts` and available via `@investbook-pages/products`.

### Environment variables

The project is designed for local use. `.env` is committed with sane defaults:

| Variable            | Used by                                | Default                                    | Purpose                                      |
| ------------------- | -------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| `VITE_API_BASE_URL` | Vite / browser bundle                  | `http://localhost:2030`                    | Runtime base URL for all API calls           |
| `OPENAPI_SPEC_URL`  | `scripts/transform-spec.mjs` (Node.js) | `http://localhost:2030/v3/api-docs/public` | URL to fetch the OpenAPI spec during codegen |

To override without editing `.env`, create a `.env.local` file (gitignored by Vite) or set the variable inline:

```bash
OPENAPI_SPEC_URL=http://myhost:2030/v3/api-docs/public yarn openapi-ts
VITE_API_BASE_URL=http://myhost:2030 yarn dev
```

## Pre-commit hooks

Husky runs `lint-staged` on commit, which automatically applies:

- `eslint --fix` on `*.{js,ts,jsx,tsx}`
- `prettier --write` on `*.{js,ts,jsx,tsx,css,md}`
