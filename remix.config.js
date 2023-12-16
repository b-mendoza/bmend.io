// @ts-check

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  cacheDirectory: './node_modules/.cache/remix',
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
  },
  ignoredRouteFiles: ['**/.*'],
  server: './server.ts',
  serverConditions: ['workerd', 'worker', 'browser'],
  serverDependenciesToBundle: [
    // bundle everything except the virtual module for the static content manifest provided by wrangler
    /^(?!.*\b__STATIC_CONTENT_MANIFEST\b).*$/,
  ],
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
};
