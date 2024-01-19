import type { AppLoadContext } from '@remix-run/cloudflare';
import { logDevReady } from '@remix-run/cloudflare';
import * as build from '@remix-run/dev/server-build';
import { handle as honoCloudflarePagesHandle } from 'hono/cloudflare-pages';
import { Hono } from 'hono/quick';
import { staticAssets } from 'remix-hono/cloudflare';
import { remix as remixHonoHandle } from 'remix-hono/handler';
import { z } from 'zod';

if (process.env['NODE_ENV'] === 'development') {
  logDevReady(build);
}

const EnvSchema = z.object({}).passthrough();

type Env = z.infer<typeof EnvSchema>;

declare module '@remix-run/cloudflare' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface AppLoadContext {
    env: Env;
  }
}

type HonoServerContext = {
  Variables: AppLoadContext['env'];
};

const server = new Hono<HonoServerContext>();

server.use(
  '*',
  staticAssets(),
  remixHonoHandle({
    build,
    mode:
      process.env['NODE_ENV'] === 'development' ? 'development' : 'production',
    getLoadContext: (ctx) => {
      const parsedEnv = EnvSchema.parse(ctx.env);

      return { env: parsedEnv };
    },
  }),
);

export const onRequest = honoCloudflarePagesHandle(server);
