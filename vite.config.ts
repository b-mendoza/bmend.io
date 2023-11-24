import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createRoutesFromFolders } from '@remix-run/v1-route-convention';

export default defineConfig({
  plugins: [
    remix({
      routes: (defineRoutes) => {
        return Promise.resolve(createRoutesFromFolders(defineRoutes));
      },
    }),
    tsconfigPaths(),
  ],
});
