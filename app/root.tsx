import type { LinkDescriptor, LinksFunction } from '@remix-run/cloudflare';
import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import tailwindStyles from '~/styles/tailwind.css';

export const links: LinksFunction = () => {
  const baseLinks = [
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
