import type { LinksFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import geistFont from '~/assets/fonts/GeistVariableVF.woff2';
import fontStyles from '~/styles/fonts.styles.css';
import globalStyles from '~/styles/globals.styles.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      href: geistFont,
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    },
    {
      as: 'style',
      rel: 'preload',
      href: fontStyles,
    },
    {
      as: 'style',
      rel: 'preload',
      href: globalStyles,
    },
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
      <body className="min-h-screen bg-background p-4">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
