import { APIContext } from '@/ctx/adapter';
import { getDownloadUrl, getFileByHash, uploadPreSign } from '@/libs/file';

import { route } from './api';
import { fileSchema } from './file.schema';

route.openapi(fileSchema.uploadCheckRoute, async c => {
  const api = new APIContext(c);
  const { filename, type, size, hash } = c.req.valid('json');

  const env = await api.getEnv();
  const session = await api.getSession();
  const prisma = await api.getPrismaClient();
  const existHashFile = await getFileByHash(prisma, hash);

  if (existHashFile) {
    const newFile = await prisma.file.create({
      data: {
        key: existHashFile.key,
        name: filename,
        type,
        size,
        hash,
        projectId: session.projectId,
        ownerId: session.uid
      },
      omit: {
        hash: true,
        key: true
      }
    });

    return c.json(
      {
        status: 'success',
        data: {
          file: newFile
        }
      } as const,
      200
    );
  }

  const { key, preSignedUrl } = await uploadPreSign(await api.getS3Client(), env.S3_BUCKET_NAME, {
    filename,
    md5: hash,
    projectId: session.projectId
  });

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
    },
    omit: {
      hash: true,
      key: true
    }
  });

  return c.json(
    {
      status: 'success' as const,
      data: file
    },
    200
  );
});

route.openapi(fileSchema.downloadRoute, async c => {
  const api = new APIContext(c);
  const { fileIds } = c.req.valid('json');

  const env = await api.getEnv();
  const session = await api.getSession();
  const prisma = await api.getPrismaClient();

  const downloads = await getDownloadUrl(prisma, await api.getS3Client(), env.S3_BUCKET_NAME, {
    fileIds,
    projectId: session.projectId
  });

  return c.json(
    {
      status: 'success',
      data: {
        downloads
      }
    } as const,
    200
  );
});
