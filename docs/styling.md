# Styling

## CSS Framework

- **Framework**: Tailwind CSS
- **Custom design system**: Uses CSS custom properties (HSL color values) defined in global styles
- **Utility function**: `cn()` utility in `app/utils/cn.ts` for className merging with tailwind-merge
- **Font loading**: Custom Inter font preloaded in root.tsx

## Component Styling Patterns

- Use Tailwind utility classes for styling
- Leverage CSS custom properties for theme values
- Use the `cn()` utility to conditionally merge className strings
