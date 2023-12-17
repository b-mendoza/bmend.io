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
  serverBuildPath: 'functions/[[path]].js',
  serverConditions: ['workerd', 'worker', 'browser'],
  serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
};
