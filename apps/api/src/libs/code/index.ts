import { APIContext } from '@/ctx/adapter';
import { nanoid } from 'nanoid';

export async function retrieveCodeFiles(api: APIContext, code: string) {
  const prisma = await api.getPrismaClient();

  const result = await prisma.code.findUnique({
    where: {
      code
    },
    include: {
      files: true
    }
  });

  if (!result) {
    throw new Error('Code not found');
  }

  // stats
  await prisma.code.update({
    where: {
      id: result.id
    },
    data: {
      retrieves: {
        increment: 1
      },
      lastRetrievedAt: new Date()
    }
  });

  return result;
}

export async function createCode(api: APIContext, fileIds: string[]) {
  const prisma = await api.getPrismaClient();
  const session = await api.getSession();

  const result = await prisma.code.create({
    data: {
      files: {
        create: fileIds.map(id => {
          return {
            fileId: id,
            ownerId: session.uid
          };
        })
      },
      code: nanoid(6),
      slug: nanoid(10),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      projectId: session.projectId,
      ownerId: session.uid
    }
  });

  return result;
}
