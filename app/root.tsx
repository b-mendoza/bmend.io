import type { LinksFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
/* import { href as iconsSpriteHref } from '~/components/icon'; */
import fontStyles from '~/styles/fonts.styles.css';
import globalStyles from '~/styles/globals.styles.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      href: '/fonts/geist-regular.woff2',
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    },
    {
      rel: 'preload',
      href: '/fonts/geist-medium.woff2',
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    },
    {
      rel: 'preload',
      href: '/fonts/geist-semibold.woff2',
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
      <body className="min-h-screen bg-background text-white">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
