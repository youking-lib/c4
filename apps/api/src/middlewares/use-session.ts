import { MiddlewareHandler } from 'hono';
import * as jose from 'jose';

import type { Env } from '@/ctx/interface';
import { APIContext } from '@/ctx/adapter';
import { Prisma } from '@prisma/client';

export const useJwtSession = (options: { whitelist: string[] }): MiddlewareHandler<Env> => {
  return async (c, next) => {
    const api = new APIContext(c);
    const env = await api.getEnv();

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
        return null;
      });

    if (!valid || !valid.payload.sub) {
      return c.json(
        {
          status: 'error',
          error: {
            message: '',
            code: 'bad_request'
          }
        },
        401
      );
    }

    const user = await getOrInitUserTeam(api, valid.payload.sub);

    if (!user) {
      return c.json({ error: 'Unauthorized, user not found' }, 401);
    }

    c.set('session', {
      uid: user.id,
      name: user.name,
      email: user.email,
      projectId: user.defaultProject?.id!,
      projectName: user.defaultProject?.name!
    });

    return next();
  };
};

export async function getOrInitUserTeam(api: APIContext, id: string) {
  const prisma = await api.getPrismaClient();

  const include: Prisma.UserInclude = {
    defaultProject: {
      select: {
        name: true,
        id: true
      }
    }
  };

  const existingUser = await prisma.user.findUnique({
    where: {
      id
    },
    include
  });

  if (existingUser) {
    return existingUser;
  }

  const stack = await api.getStackServerClient();
  const stackUser = await stack.getServerUserById(id);

  if (stackUser.status !== 'ok') {
    return null;
  }

  const teams = await stack.listServerTeams({
    userId: id
  });

  const user = await prisma.user.upsert({
    where: {
      id: id
    },
    update: {
      avatar: stackUser.data.profile_image_url,
      name: stackUser.data.display_name || 'Unnamed',
      email: stackUser.data.primary_email!
    },
    create: {
      id: id,
      email: stackUser.data.primary_email!,
      name: stackUser.data.display_name || 'Unnamed',
      avatar: stackUser.data.profile_image_url,
      defaultProject: {
        create: {
          id: teams[0]!.id,
          name: teams[0]!.display_name || 'Unnamed'
        }
      }
    },
    include
  });

  return user;
}
