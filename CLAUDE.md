# CLAUDE.md

A Remix application running on Cloudflare Pages with Hono, using strict TypeScript and accessibility standards.

## Quick Reference

- **Package manager**: pnpm 8.15.9 (via corepack - ensure it's enabled)
- **Dev server**: `pnpm run dev`
- **Build**: `pnpm run build`
- **Lint & type-check**: `pnpm run lint`
- **Auto-fix**: `pnpm run fix`
- **Path alias**: `~/*` maps to `./app/*`

## Detailed Documentation

When working on specific areas, consult these guides:

- **[Development Workflow](docs/development.md)** - Commands, scripts, git hooks, and cleanup
- **[Architecture](docs/architecture.md)** - Platform, runtime, routing, and deployment
- **[Code Standards](docs/code-standards.md)** - ESLint, TypeScript, accessibility, and import conventions
- **[Styling](docs/styling.md)** - Tailwind CSS, design system, and component patterns
- **[Patterns](docs/patterns.md)** - File naming, data fetching, and code organization

## Core Principles

- **Follow existing strict patterns**: This codebase uses strict ESLint, TypeScript, and accessibility rules. Maintain these standards when modifying code.
- **Avoid over-engineering**: Only make changes directly requested or clearly necessary. Don't add features, refactoring, or "improvements" beyond what was asked.
- **Server-only code**: Keep server imports in `.server.ts` files to prevent client bundling.
