import { APIContext } from '@/ctx/adapter';
import { retrieveCodeFiles } from '@/libs/file';

import { route } from './api';
import { retrieveRoute } from './retrieve.schema';

route.openapi(retrieveRoute, async c => {
  const api = new APIContext(c);
  const { code } = c.req.query();
  const codeFiles = await retrieveCodeFiles(api, code);

  return c.json({ files: codeFiles.files }, 200);
});
