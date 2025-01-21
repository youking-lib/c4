import { APIContext } from '@/ctx/adapter';
import { createCode, listCodes, retrieveCodeFiles } from '@/libs/code';

import { route } from './api';
import { codeSchema } from './code.schema';
import { getPageFinder } from './utils';

route.openapi(codeSchema.listCodesRoute, async c => {
  const api = new APIContext(c);
  const { page, pageSize } = c.req.valid('query');
  const { offset, limit } = getPageFinder({ page, pageSize });

  const session = await api.getSession();
  const prisma = await api.getPrismaClient();

  const { list, total } = await listCodes(prisma, {
    projectId: session.projectId,
    offset,
    limit
  });

  return c.json(
    {
      status: 'success' as const,
      data: {
        list: list.map(item => {
          return {
            ...item,
            files: item._count.files
          };
        }),
        total
      }
    },
    200
  );
});

route.openapi(codeSchema.retrieveRoute, async c => {
  const api = new APIContext(c);
  const { codeId } = c.req.valid('param');

  const prisma = await api.getPrismaClient();
  const codeFiles = await retrieveCodeFiles(prisma, codeId);

  return c.json(
    {
      status: 'success',
      data: { code: codeFiles, files: codeFiles.files.map(item => item.file) }
    } as const,
    200
  );
});

route.openapi(codeSchema.createCodeRoute, async c => {
  const api = new APIContext(c);
  const { fileIds } = c.req.valid('json');

  const session = await api.getSession();
  const prisma = await api.getPrismaClient();
  const code = await createCode(prisma, {
    fileIds,
    projectId: session.projectId,
    ownerId: session.uid
  });

  return c.json(
    {
      status: 'success',
      data: {
        code
      }
    } as const,
    200
  );
});
