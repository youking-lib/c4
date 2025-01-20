import { APIContext } from '@/ctx/adapter';
import { createCode, retrieveCodeFiles } from '@/libs/code';

import { route } from './api';
import { codeSchema } from './code.schema';

route.openapi(codeSchema.retrieveRoute, async c => {
  const api = new APIContext(c);
  const { codeId } = c.req.valid('param');

  const codeFiles = await retrieveCodeFiles(api, codeId);

  return c.json(
    { status: 'success', data: { code: codeFiles.code, files: codeFiles.files } } as const,
    200
  );
});

route.openapi(codeSchema.createCodeRoute, async c => {
  const api = new APIContext(c);
  const { fileIds } = c.req.valid('json');

  const code = await createCode(api, fileIds);

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
