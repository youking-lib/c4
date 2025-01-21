import { nanoid } from 'nanoid';
import { Prisma, PrismaClient } from '@prisma/client';

import { checkFiles } from '../file';

export async function listCodes(
  prisma: PrismaClient,
  options: {
    projectId: string;
    offset: number;
    limit: number;
  }
) {
  const where: Prisma.CodeWhereInput = {
    projectId: options.projectId
  };

  const [codes, total] = await Promise.all([
    prisma.code.findMany({
      where,
      skip: options.offset,
      take: options.limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        _count: {
          select: {
            files: true
          }
        }
      }
    }),
    prisma.code.count({
      where
    })
  ]);

  return {
    list: codes,
    total: total
  };
}

export async function retrieveCodeFiles(prisma: PrismaClient, code: string) {
  const result = await prisma.code.findUnique({
    where: {
      code
    },
    include: {
      files: {
        include: {
          file: true
        }
      }
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

export async function createCode(
  prisma: PrismaClient,
  options: {
    fileIds: string[];
    projectId: string;
    ownerId: string;
  }
) {
  const files = await checkFiles(prisma, {
    fileIds: options.fileIds,
    projectId: options.projectId
  });

  const result = await prisma.code.create({
    data: {
      files: {
        create: files.map(file => {
          return {
            fileId: file.id,
            ownerId: options.ownerId
          };
        })
      },
      code: nanoid(6),
      slug: nanoid(10),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      projectId: options.projectId,
      ownerId: options.ownerId
    }
  });

  return result;
}
