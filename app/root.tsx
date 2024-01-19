import type { LinksFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import interWoff2 from '~/assets/fonts/inter-latin-wght-normal.woff2';
/* import { href as iconsSpriteHref } from '~/components/icon'; */
import fontStyles from '~/styles/font.styles.css';
import globalStyles from '~/styles/global.styles.css';

export const links: LinksFunction = () => {
  return [
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
  ];
};

export default function HomeLayoutRoute() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-white antialiased">
        <Outlet />
        <ScrollRestoration />
        {process.env['NODE_ENV'] === 'development' ? <Scripts /> : null}
        <LiveReload />
      </body>
    </html>
  );
}
