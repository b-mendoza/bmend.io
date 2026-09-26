# Development Workflow

## Package Management

- **Install dependencies**: `pnpm install`
- **Corepack**: This project uses pnpm 8.15.9 via the `packageManager` field in package.json
- **Node version**: Requires Node.js `^22.12.0 || ^24.0.0` (see `.nvmrc`)

## Development Commands

### Running the Application

- **Start development server**: `pnpm run dev`
  - Runs Vite with the Cloudflare Vite plugin against workerd
- **Build for production**: `pnpm run build`
  - Outputs `dist/client` and `dist/server` via `vite build`
- **Preview the production build**: `pnpm run start`
  - Runs `vite preview` against workerd

### Linting and Formatting

- **Run all linters**: `pnpm run lint`
  - Runs ESLint, Prettier check, and TypeScript type checking in parallel
- **Fix all issues**: `pnpm run fix`
  - Auto-fixes ESLint and Prettier issues

### Individual Commands

- `pnpm run lint:eslint` - ESLint only
- `pnpm run lint:prettier` - Prettier check only
- `pnpm run lint:types` - TypeScript type check only
- `pnpm run fix:eslint` - Auto-fix ESLint issues
- `pnpm run fix:prettier` - Auto-format with Prettier

### Testing

- Build first, then test: `pnpm run build && pnpm run test` - the test run spawns a preview of the existing build (`node --test test/smoke.test.mjs`)

### Cleanup

- **Soft clean**: `pnpm run clean:soft` - Removes cache and build artifacts
- **Hard clean**: `pnpm run clean:hard` - Removes everything including node_modules and lock file

### Deploying (manual, not run by CI)

- `pnpm run build && pnpm exec wrangler deploy` - deploys the built Worker to Cloudflare
  - Not executed as part of this migration; requires Cloudflare account/auth configuration for the live domain cutover

## Git Hooks

- Husky is configured with a pre-commit hook
- Lint-staged runs on staged files:
  - Prettier on all files
  - ESLint on JS/TS files
  - TypeScript type checking on the entire project
