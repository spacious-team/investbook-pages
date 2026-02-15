# InvestBook Pages - AI Coding Agent Instructions

## Project Overview
Frontend for [InvestBook](https://github.com/spacious-team/investbook) portfolio management. **Nx monorepo** (v16.2.2) with React 18.2, TypeScript 5.0, Vite, and Material-UI v5.

## Architecture

### Monorepo Structure
- **Apps**: `apps/local` - Main React application (port 4200)
- **Libraries**:
  - `libs/common-ui` - Shared UI components (tested with Jest)
  - `libs/products` - Product domain logic
- **TypeScript Path Aliases**: Use `@investbook-pages/common-ui` and `@investbook-pages/products` (defined in `tsconfig.base.json`)

### Tech Stack
- **Build**: Nx + Vite (@nx/vite:build)
- **Dev Server**: Vite with HMR on port 4200
- **Testing**: Vitest (apps), Jest (libraries)
- **Linting**: ESLint + Prettier, enforced via Husky pre-commit hooks
- **Routing**: React Router v6
- **UI**: Material-UI v5 with Emotion styling

## Critical Workflows

### Development
```bash
yarn                    # Install dependencies
yarn prepare           # Setup Husky git hooks
npx nx serve local     # Start dev server (http://localhost:4200)
```

### Build & Test
```bash
nx build local         # Build production bundle
nx test <project>      # Run tests (vitest for local, jest for libs)
nx lint <project>      # Run ESLint
nx affected:test       # Test only affected projects
```

### Nx Caching
- **Nx Cloud** enabled with distributed caching for `build`, `lint`, `test`, `e2e`
- Use `nx affected:<target>` to run tasks only on changed projects

## Key Conventions

### Project Configuration
- Each project has `project.json` defining targets (build, test, lint, serve)
- Libraries use Vite build executor: `@nx/vite:build`
- Main app uses Vite dev server: `@nx/vite:dev-server` with HMR enabled

### Testing
- **Apps** (`apps/local`): Vitest configured in `vite.config.ts`
- **Libraries** (`libs/*`): Jest with `jest.config.ts` + `@nx/jest:jest` executor
- All tests use `passWithNoTests: true` to avoid failures on empty test suites

### Code Quality
- **Pre-commit hooks** (lint-staged): Auto-fix ESLint + format with Prettier on `*.{js,ts,jsx,tsx}`
- **Module boundaries**: Enforced by `@nx/enforce-module-boundaries` ESLint rule
- Always run `yarn prepare` after cloning to setup Git hooks

### Component Structure
- React components use functional components with TypeScript interfaces for props
- Material-UI Typography and components imported from `@mui/material`
- Example: `libs/common-ui/src/lib/banner/banner.tsx` exports `Banner` component with typed props

## Important Files
- `nx.json` - Nx workspace config with task runners and caching
- `tsconfig.base.json` - Path aliases for library imports
- `package.json` - Dependencies + lint-staged configuration
- `apps/local/vite.config.ts` - Vite config with React plugin
- `.husky/pre-commit` - Triggers lint-staged on commit
