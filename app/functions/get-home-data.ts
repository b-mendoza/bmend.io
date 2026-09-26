import { createServerFn } from '@tanstack/react-start';

export const getHomeData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getHomeData: readHomeData } =
      await import('~/models/get-home-data.server');
    return readHomeData();
  },
);
