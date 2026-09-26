import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';

import interWoff2 from '~/assets/fonts/inter-latin-wght-normal.woff2';
/* import { href as iconsSpriteHref } from '~/components/icon'; */
import fontStyles from '~/styles/font.styles.css?url';
import globalStyles from '~/styles/global.styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    links: [
      {
        rel: 'preload',
        href: interWoff2,
        as: 'font',
        crossOrigin: 'anonymous',
        type: 'font/woff2',
      },
      {
        rel: 'preload',
        as: 'style',
        href: fontStyles,
      },
      {
        rel: 'preload',
        as: 'style',
        href: globalStyles,
      },
      /* {
        rel: 'preload',
        as: 'image',
        href: iconsSpriteHref,
        type: 'image/svg+xml',
      }, */
      {
        rel: 'stylesheet',
        href: fontStyles,
      },
      {
        rel: 'stylesheet',
        href: globalStyles,
      },
    ],
  }),
  component: Outlet,
  shellComponent: RootDocument,
  notFoundComponent: () => <p>Not Found</p>,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-white antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
