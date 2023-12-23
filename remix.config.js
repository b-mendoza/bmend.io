// @ts-check

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  cacheDirectory: './node_modules/.cache/remix',
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
  },
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: ['tailwind-merge'],
  serverMinify: process.env.NODE_ENV === 'production',
};
