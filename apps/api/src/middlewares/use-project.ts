import { MiddlewareHandler } from 'hono';
import { APIContext } from '@/ctx/adapter';
import { Env } from '@/ctx/interface';

export const useProjectAuth = (): MiddlewareHandler<Env> => {
  return async (c, next) => {
    const api = new APIContext(c);

    const projectId = c.req.param('projectId');
    const userId = c.get('session')?.userId;

    if (!projectId || !userId) {
      throw new Error('Project not found');
    }

    const project = await getProject(api, projectId, userId);

    if (!project) {
      throw new Error('Project not found');
    }

    c.set('session', {
      ...c.get('session'),

      projectId: project.id,
      projectName: project.name
    });

    return next();
  };
};

export async function getProject(api: APIContext, projectId: string, userId: string) {
  const prisma = await api.getPrismaClient();

  return prisma.project.findUnique({
    where: { id: projectId, ownerId: userId }
  });
}
