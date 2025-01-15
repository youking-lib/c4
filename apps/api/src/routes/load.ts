import { APIContext } from '@/ctx/adapter';
import { getDownloadUrl, uploadPreHash, uploadPreSign } from '@/libs/file';

import { route } from './api';
import { downloadRoute, uploadCheckRoute } from './load.schema';

route.openapi(uploadCheckRoute, async c => {
  const api = new APIContext(c);
  const { filename, type, size, hash } = await c.req.json();
  const file = await uploadPreHash(api, { filename, type, size, hash });

  if (file) {
    return c.json(
      {
        file
      },
      200
    );
  }

  const { key, preSignedUrl } = await uploadPreSign(api, { filename });

  return c.json({ key, preSignedUrl }, 200);
});

route.openapi(downloadRoute, async c => {
  const api = new APIContext(c);
  const { fileId } = c.req.param();
  const downloadUrl = await getDownloadUrl(api, fileId);

  return c.json({ downloadUrl }, 200);
});
