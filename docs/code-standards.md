# Code Standards

## TypeScript Configuration

- **Strict mode enabled**: All strict TypeScript checks are active
- **Notable settings**:
  - `noUncheckedIndexedAccess: true` - Array access returns `T | undefined`
  - `noUnusedLocals: true` and `noUnusedParameters: true`
  - `verbatimModuleSyntax: true` - Explicit type imports required
  - Module resolution: `Bundler`
  - Target: `ES2022`

## ESLint Configuration

Extremely strict setup with:

- TypeScript strict and stylistic type checking
- React, React Hooks, and JSX a11y (accessibility) strict rules
- SonarJS for code quality
- Deprecation warnings enabled
- Simple import sort for consistent import ordering

### Key Rules

- **Type imports**: Must use `import type` syntax (consistent-type-imports)
- **Type definitions**: Must use `type` not `interface` (consistent-type-definitions)
- **Import order**: Enforced by simple-import-sort plugin
- **Accessibility**: jsx-a11y strict mode enforced - all components must be accessible

## React Patterns

- **React version**: 18.3.0-canary (experimental build)
- **UI patterns**:
  - Typography components in `app/components/typography/`
  - Radix UI primitives used for accessible components
  - Component props follow strict typing
- **Development mode**: Development scripts only loaded in development environment
