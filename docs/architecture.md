# Architecture

## Platform and Runtime

- **Target platform**: Cloudflare Pages with Workers
- **Server framework**: Hono (lightweight web framework)
- **Remix adapter**: Uses `remix-hono` to integrate Remix with Hono on Cloudflare Pages
- **Server entry point**: `server.ts` - Configures Hono server with Remix handler
- **Build output**: Functions are built to `functions/[[path]].js` for Cloudflare Pages

## Routing and Server Configuration

### Remix Configuration

Uses Cloudflare-specific settings in `remix.config.js`:

- Server platform: `neutral`
- Server conditions: `['workerd', 'worker', 'browser']`
- All server dependencies bundled
- Server code minified for production

### Routing

- **File-based routing**: Routes live in `app/routes/`
- **Static assets**: Served from `./public` directory

## Application Structure

- **Path alias**: `~/*` maps to `./app/*` (configured in tsconfig.json)
- **Component organization**: Components use folder structure with `*.component.tsx` + `index.ts` pattern
  - Example: `app/components/button/button.component.tsx` + `app/components/button/index.ts`
- **Server-only code**: Files ending with `.server.ts` contain server-only logic (models, utilities)
- **Data models**: Located in `app/models/*.server.ts` - contain data fetching functions
  - Current models use in-memory data with comments indicating future database/CMS integration

## Environment and Context

- **Cloudflare environment**: Environment variables validated using Zod schema in `server.ts`
- **Load context**: Remix loaders/actions receive typed `env` from Cloudflare context
