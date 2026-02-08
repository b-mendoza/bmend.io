# Patterns and Conventions

## File Naming Conventions

- **Components**: `component-name.component.tsx`
- **Server-only code**: `*.server.ts`
- **Type-only files**: `*.d.ts`

## Component Organization

Components use folder structure with separate files:

- `component-name.component.tsx` - Component implementation
- `index.ts` - Barrel export file

Example:

```
app/components/button/
  ├── button.component.tsx
  └── index.ts
```

## Data Fetching

- Use loader functions in routes
- Server-only logic goes in `app/models/*.server.ts`
- Cache-control headers can be set via the `headers` export in routes

## Code Organization

- **Server-only imports**: Keep in `.server.ts` files to prevent client bundling
- **Barrel exports**: Export component logic from `index.ts` files
- **Path alias**: Use the `~/*` alias for app imports instead of relative paths
