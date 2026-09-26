# bmendoza.io

Personal site built with TanStack Start on Cloudflare Workers.

## Setup

```shellscript
pnpm install
```

## Develop

```shellscript
pnpm run dev
```

## Build

```shellscript
pnpm run build
```

## Preview the production build

```shellscript
pnpm run start
```

## Test

Runs against the existing build (build first):

```shellscript
pnpm run build
pnpm run test
```

## Deploy (manual, not run by CI)

Build first, then deploy:

```shellscript
pnpm run build
pnpm exec wrangler deploy
```

This is not executed as part of this migration and requires Cloudflare account/auth setup for the live domain cutover.
