# Development Workflow

## Package Management

- **Install dependencies**: `pnpm install`
- **Corepack**: This project uses pnpm 8.15.9 via the `packageManager` field in package.json
- **Node version**: Requires Node.js >=20.0.0 <21.0.0

## Development Commands

### Running the Application

- **Start development server**: `pnpm run dev`
  - Runs Remix in dev mode with manual HMR
  - Starts Wrangler Pages dev server on `./public` with compatibility date 2024-02-07
- **Build for production**: `pnpm run build`
- **Start production server**: `pnpm run start`

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

### Cleanup

- **Soft clean**: `pnpm run clean:soft` - Removes cache and build artifacts
- **Hard clean**: `pnpm run clean:hard` - Removes everything including node_modules and lock file

## Git Hooks

- Husky is configured with a pre-commit hook
- Lint-staged runs on staged files:
  - Prettier on all files
  - ESLint on JS/TS files
  - TypeScript type checking on the entire project
