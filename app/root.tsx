import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinkDescriptor, LinksFunction } from '@vercel/remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import tailwindStyles from '~/styles/tailwind.css';
import geistFont from '~/assets/fonts/GeistVariableVF.woff2';

export const links: LinksFunction = () => {
  const baseLinks = [
    {
      rel: 'preload',
      href: geistFont,
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    },
    { rel: 'stylesheet', href: tailwindStyles },
  ] satisfies LinkDescriptor[];

  if (typeof cssBundleHref === 'string') {
    return baseLinks.concat({
      rel: 'stylesheet',
      href: cssBundleHref,
    });
  }

  return baseLinks;
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
