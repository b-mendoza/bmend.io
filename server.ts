import { logDevReady, type AppLoadContext } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';
import { z } from 'zod';

const EnvSchema = z.object({}).passthrough();

type Env = z.infer<typeof EnvSchema>;

declare module '@remix-run/cloudflare' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface AppLoadContext {
    env: Env;
  }
}

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler<AppLoadContext['env']>({
  build,
  getLoadContext: (context) => {
    const parsedEnv = EnvSchema.parse(context.env);

    return { env: parsedEnv };
  },
  mode: build.mode,
});
