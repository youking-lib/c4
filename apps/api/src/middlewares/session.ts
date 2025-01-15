import { MiddlewareHandler } from 'hono';

import type { Env } from '@/ctx/interface';
import { APIContext, getClerkSession } from '@/ctx/adapter';

export const jwt = (): MiddlewareHandler<Env> => {
  return async (c, next) => {
    const api = new APIContext(c);

    const session = await getClerkSession(api);
    const client = await api.getClerkClient();

    if (!session) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const clerkUser = await client.users.getUser(session.userId);

    if (!clerkUser) {
      return c.json({ error: 'Unauthorized, user not found' }, 401);
    }

    const user = await getOrCreateUserByClerk(api, clerkUser.id);
    const porject = user.defaultProject!;

    c.set('session', {
      userId: user.id,
      username: user.name,
      projectId: porject.id,
      projectName: porject.name
    });

    await next();
  };
};

export async function getOrCreateUserByClerk(api: APIContext, userId: string) {
  const prisma = await api.getPrismaClient();
  const client = await api.getClerkClient();
  const clerkUser = await client.users.getUser(userId);

  if (!clerkUser) {
    throw new Error('User not found');
  }

  const user = await prisma.user.upsert({
    where: {
      id: clerkUser.id
    },
    update: {
      avatar: clerkUser.imageUrl,
      name: clerkUser.firstName + ' ' + clerkUser.lastName,
      email: clerkUser.emailAddresses[0].emailAddress
    },
    create: {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: clerkUser.firstName + ' ' + clerkUser.lastName,
      avatar: clerkUser.imageUrl,
      defaultProject: {
        create: {
          name: 'Default Project'
        }
      }
    },
    include: {
      defaultProject: {
        select: {
          name: true,
          id: true
        }
      }
    }
  });

  return user;
}
