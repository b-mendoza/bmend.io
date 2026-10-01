# Patterns and Conventions

## File Naming Conventions

- **Components**: `component-name.component.tsx`
- **Server-only code**: `*.server.ts`
- **Type-only files**: `*.d.ts`

## Component Organization

Components use folder structure and are imported directly by path:

- `component-name.component.tsx` - Component implementation

Example:

```
app/components/external-link/
  └── external-link.component.tsx
```

## Data Fetching

- Use loader functions in routes, which call server functions in `app/functions/*.ts` as the client/server boundary
- Server-only logic goes in `app/models/*.server.ts`
- Cache-control headers can be set via the `headers` option on `createFileRoute`

## Code Organization

- **Server-only imports**: Keep in `.server.ts` files to prevent client bundling
- **Path alias**: Use the `~/*` alias for app imports instead of relative paths
