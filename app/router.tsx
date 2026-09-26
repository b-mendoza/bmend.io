import { createRouter } from '@tanstack/react-router';

import { routeTree } from '~/routeTree.gen';

export function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true });
}

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation requires an interface, not a type alias
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
