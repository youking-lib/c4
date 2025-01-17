import { APIContext } from '@/ctx/adapter';
import { retrieveCodeFiles } from '@/libs/file';

import { route } from './api';
import { codeSchema } from './code.schema';

route.openapi(codeSchema.retrieveRoute, async c => {
  const api = new APIContext(c);
  const { projectId, codeId } = c.req.param();

  const codeFiles = await retrieveCodeFiles(api, codeId);

  return c.json({ files: codeFiles.files }, 200);
});
