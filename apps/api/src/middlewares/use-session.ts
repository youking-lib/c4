import { MiddlewareHandler } from 'hono';
import * as jose from 'jose';

import type { Env } from '@/ctx/interface';
import { APIContext } from '@/ctx/adapter';

export const useJwtSession = (options: { whitelist: string[] }): MiddlewareHandler<Env> => {
  return async (c, next) => {
    const api = new APIContext(c);
    const env = await api.getEnv();

    console.log(
      c.req.path,
      options.whitelist,
      options.whitelist.some(path => c.req.path.startsWith(path))
    );

    if (options.whitelist.some(path => c.req.path.startsWith(path))) {
      return next();
    }

    const jwks = jose.createRemoteJWKSet(
      new URL(
        `https://api.stack-auth.com/api/v1/projects/${env.NEXT_PUBLIC_STACK_PROJECT_ID}/.well-known/jwks.json`
      )
    );

    const token = c.req.header('Authorization')?.split(' ')[1] || '';

    const valid = await jose
      .jwtVerify(token, jwks, {
        algorithms: ['ES256']
      })
      .catch(err => {
        console.error(err);
        return null;
      });

    if (!valid || !valid.payload.sub) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const stack = await api.getStackServerClient();
    const user = await stack.getServerUserById(valid.payload.sub);

    if (user.status !== 'ok') {
      return c.json({ error: 'Unauthorized, user not found' }, 401);
    }

    const team = await getOrInitUserTeam(api, user.data.id);

    c.set('session', {
      uid: user.data.id,
      name: user.data.display_name!,
      email: user.data.primary_email!,
      projectId: team?.id!,
      projectName: team?.display_name!
    });

    return next();
  };
};

export async function getOrInitUserTeam(api: APIContext, id: string) {
  const stack = await api.getStackServerClient();
  const teams = await stack.listServerTeams({
    userId: id
  });

  return teams[0]!;
}
