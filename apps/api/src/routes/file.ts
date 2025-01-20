import { APIContext } from '@/ctx/adapter';
import { getDownloadUrl, uploadPreHash, uploadPreSign } from '@/libs/file';

import { route } from './api';
import { fileSchema } from './file.schema';

route.openapi(fileSchema.uploadCheckRoute, async c => {
  const api = new APIContext(c);
  const { filename, type, size, hash } = await c.req.json();
  const file = await uploadPreHash(api, { filename, type, size, hash });

  if (file) {
    return c.json(
      {
        status: 'success',
        data: {
          file
        }
      } as const,
      200
    );
  }

  const { key, preSignedUrl } = await uploadPreSign(api, { filename });

  return c.json(
    {
      status: 'success',
      data: {
        key,
        preSignedUrl,
        file: null
      }
    } as const,
    200
  );
});

route.openapi(fileSchema.uploadFileRoute, async c => {
  const api = new APIContext(c);
  const { key, filename, type, size, hash } = c.req.valid('json');

  const session = await api.getSession();
  const prisma = await api.getPrismaClient();

  const file = await prisma.file.create({
    data: {
      key,
      name: filename,
      type,
      size,
      hash,
      projectId: session.projectId,
      ownerId: session.uid
    }
  });

  return c.json(
    {
      status: 'success',
      data: {
        file
      }
    } as const,
    200
  );
});

route.openapi(fileSchema.downloadRoute, async c => {
  const api = new APIContext(c);
  const { fileId } = c.req.param();
  const downloadUrl = await getDownloadUrl(api, fileId);

  return c.json(
    {
      status: 'success',
      data: {
        downloadUrl
      }
    } as const,
    200
  );
});
