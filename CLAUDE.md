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
- **shadcn/ui components are built on individual `@radix-ui/*` packages** — always use individual Radix UI packages (e.g. `@radix-ui/react-dialog`, `@radix-ui/react-slot`) as the primitive layer; do NOT use the monolithic `radix-ui` package, `@base-ui/react`, or other component libraries
- **React Router v7** — `createBrowserRouter` pattern
- **Zustand** — app-level client state manager. Store: `apps/local/src/app/store.ts`, exported as `useAppStore`. Extend `AppState` interface as features are added. No provider required.
- **TanStack Query v5** — server state and data fetching. Singleton `QueryClient` in `apps/local/src/app/query-client/query-client.ts`. `QueryClientProvider` wraps the app in `main.tsx`. `ReactQueryDevtools` active in dev only (`import.meta.env.DEV`). Feature-scoped query hooks live in `apps/local/src/app/hooks/queries/`.
- **Vitest** + **@testing-library/react** for tests
- **Nx 22** for monorepo task orchestration and caching

### Styling setup

- Tailwind entry point: `apps/local/src/index.css` — imports `tailwindcss`, `tw-animate-css`, the palette, and adds `@source` directives to scan `libs/common-ui/src`
- shadcn/ui config: `components.json` at repo root
- **Color palette:** OKLCH design tokens (light + dark) live in `libs/common-ui/src/styles/theme.css` — this is the single source of truth for all CSS custom properties
- **Adding colors:** always add new tokens to `libs/common-ui/src/styles/theme.css` (both `:root` and `.dark`), then expose via `--color-<name>: var(--<name>)` inside `@theme inline` in `apps/local/src/index.css`. Never hardcode color values in components.
- `cn` utility (`clsx` + `tailwind-merge`): `libs/common-ui/src/lib/utils.ts`, re-exported from `@investbook-pages/common-ui`
- Vite integration via `@tailwindcss/vite` plugin

### Nx module boundary enforcement

The `@nx/enforce-module-boundaries` ESLint rule is active. Apps can import from libs; libs must not import from apps or create circular dependencies.

**Important:** The wildcard path alias `"*": ["apps/local/src/app/*"]` lives only in `apps/local/tsconfig.json`, NOT in `tsconfig.base.json`. Putting app-level paths in `tsconfig.base.json` causes Nx to detect a circular dependency (lib → app → lib). Libs only inherit the `@investbook-pages/*` paths from `tsconfig.base.json`.

## Testing conventions

Do **not** write tests unless the user explicitly asks for them. This project uses Vitest + @testing-library/react, but tests are added on demand only — not as a default step when creating components or pages.

## Code conventions

- Component files use PascalCase (`MainPage.tsx`, `Banner.tsx`)
- **No `export default`** — always use named exports (`export function Foo` / `export const Foo`)
- **Component props:** always extract into a named `interface` above the component (`interface FooProps { ... }`), never inline in the function signature
- **Strict equality only:** always use `===` / `!==`; loose `==` / `!=` is forbidden (enforced by ESLint `eqeqeq`). For null + undefined checks use `value === null || value === undefined` (or `!== null && !== undefined`)
- New shared UI components go in `libs/common-ui/src/lib/` and must be re-exported from `libs/common-ui/src/index.ts`
- Shared formatting and conversion utilities go in `libs/products/src/utils/` and must be re-exported from `libs/products/src/index.ts` (e.g. `format.ts` for currency/number formatting)
- Nx generators default to `none` for styling (no CSS-in-JS), `eslint`, `vite`, and `vitest` — use these defaults when scaffolding new apps/libs
- New shadcn/ui components: run `npx shadcn add <component>` from repo root; components land in `libs/common-ui/src/lib/` and must be re-exported from `libs/common-ui/src/index.ts`
- **Tooltips on interactive elements:** use `AdaptiveTooltip` / `AdaptiveTooltipTrigger` / `AdaptiveTooltipContent` from `@investbook-pages/common-ui` instead of plain `Tooltip`. It renders `Tooltip` on hover-capable devices and `Popover` (click/tap) on touch. Use plain `Tooltip` only for purely decorative/non-interactive hints where touch support is irrelevant.
- **Active states:** whenever you add `hover:bg-*` or `hover:text-*` to a clickable element, always add a matching `active:bg-*` / `active:text-*` with higher contrast (e.g. `hover:bg-primary-foreground/10` → `active:bg-primary-foreground/20`). This gives tactile click feedback, especially on touch.
- **React imports:** always import React APIs as named imports — never use the `React.*` namespace. Use `import { useState, useEffect, ComponentProps, ... } from 'react'` instead of `import * as React from 'react'`.
- **Responsive priority:** medium and large screens are the primary target. Small-screen support is allowed but low priority — don't block features on it and don't add mobile-specific logic by default.

## Internationalisation (i18n)

The project uses `react-i18next` with a single Russian locale. No other languages are planned.

- **Translation file:** `libs/products/src/i18n/ru.json` — single source of truth for all UI strings, organised by area (`nav`, `pageTitles`, `header`, `header.menu`)
- **Init module:** `libs/products/src/i18n/index.ts` — initialises i18next synchronously (`initAsync: false`) and re-exports `useTranslation`
- **Import:** `import { useTranslation } from '@investbook-pages/products'`
- **Usage:** call `const { t } = useTranslation()` inside the component, then `t('pageTitles.portfolio')` etc.

All hardcoded Russian strings must go through `t()`. When adding new UI copy, add the key to `ru.json` first, then use it in the component.

Key namespaces in `ru.json`:

| Namespace                                                                | Used in                                       |
| ------------------------------------------------------------------------ | --------------------------------------------- |
| `nav.*`                                                                  | Sidebar navigation labels (short form)        |
| `pageTitles.*`                                                           | Header title per route + Banner text on pages |
| `header.menu.*`                                                          | User dropdown menu items                      |
| `header.theme`, `header.themeLight`, `header.themeDark`, `header.logout` | Theme submenu and logout button               |

## API client generation (openapi-ts)

```bash
# Requires the backend running at http://localhost:2030
yarn openapi-ts
```

Two-step process:

1. `scripts/transform-spec.mjs` — fetches spec from `http://localhost:2030/v3/api-docs/public`, generates `operationId`s from HTTP method + path, writes `openapi-spec.json`
2. `openapi-ts` — reads `openapi-ts.config.ts`, generates TypeScript client into `libs/products/src/investbook-api/`

Generated files (auto-generated, do not edit manually):

- `types.gen.ts` — request/response types
- `sdk.gen.ts` — typed SDK functions per endpoint
- `client.gen.ts` — Fetch client instance
- `core/` — internal serialization/auth utilities

Hand-written file outside the codegen folder (safe from `clean: true`):

- `libs/products/src/configure-api.ts` — sets `baseUrl`, camelCase↔kebab-case body/response transformers; exports `configureApiClient()` called once in `main.tsx`

Everything is re-exported from `libs/products/src/index.ts` and available via `@investbook-pages/products`.

### Environment variables

The project is designed for local use. `.env` is committed with sane defaults:

| Variable            | Used by                                | Default                             | Purpose                                      |
| ------------------- | -------------------------------------- | ----------------------------------- | -------------------------------------------- |
| `VITE_API_BASE_URL` | Vite / browser bundle                  | `http://localhost:2030`             | Runtime base URL for all API calls           |
| `OPENAPI_SPEC_URL`  | `scripts/transform-spec.mjs` (Node.js) | `http://localhost:2030/v3/api-docs` | URL to fetch the OpenAPI spec during codegen |

To override without editing `.env`, create a `.env.local` file (gitignored by Vite) or set the variable inline:

```bash
OPENAPI_SPEC_URL=http://myhost:2030/v3/api-docs yarn openapi-ts
VITE_API_BASE_URL=http://myhost:2030 yarn dev
```

## Pre-commit hooks

Husky runs `lint-staged` on commit, which automatically applies:

- `eslint --fix` on `*.{js,ts,jsx,tsx}`
- `prettier --write` on `*.{js,ts,jsx,tsx,css,md}`
