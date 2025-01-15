import { uploadPreHash, uploadPreSign } from '@/libs/file';
import { route } from './api';
import { uploadCheckRoute } from './upload.schema';
import { APIContext } from '@/ctx/adapter';

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
