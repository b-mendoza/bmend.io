// @ts-check

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*'],
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
  },
};
