import path from 'node:path';
import { nanoid } from 'nanoid';

import { APIContext } from '@/ctx/adapter';
import { getPreSignedGetUrl, getPreSignedPutUrl } from '../storage';

export async function getDownloadUrl(api: APIContext, fileId: string) {
  const client = await api.getS3Client();
  const env = await api.getEnv();
  const prisma = await api.getPrismaClient();
  const file = await prisma.file.findUnique({
    where: {
      id: fileId
    }
  });

  if (!file) {
    throw new Error('File not found');
  }

  if (file.disabled) {
    throw new Error('File is disabled');
  }

  return getPreSignedGetUrl(client, env.S3_BUCKET_NAME, file.key);
}

export async function uploadPreHash(
  api: APIContext,
  options: { filename: string; type: string; size: number; hash: string }
) {
  const prisma = await api.getPrismaClient();
  const existFile = await getFileByHash(api, options.hash);
  const session = await api.getSession();

  if (existFile) {
    const file = await prisma.file.create({
      data: {
        key: existFile.key,
        hash: options.hash,
        name: options.filename,
        size: options.size,
        type: options.type,
        projectId: session.projectId,
        ownerId: session.uid
      }
    });

    console.log(`pre-hash file created: ${file.id}`);

    return file;
  }

  return null;
}

export async function uploadPreSign(
  api: APIContext,
  options: {
    filename: string;
  }
) {
  const client = await api.getS3Client();
  const env = await api.getEnv();
  const session = await api.getSession();

  const key = `files/${session.projectId}/${nanoid()}${path.extname(options.filename)}`;

  console.log(`pre-signed url: ${key}`);

  return {
    key,
    preSignedUrl: await getPreSignedPutUrl(client, env.S3_BUCKET_NAME, key)
  };
}

export async function getPreSignedUrl(api: APIContext, key: string) {
  const client = await api.getS3Client();
  const env = await api.getEnv();

  return getPreSignedGetUrl(client, env.S3_BUCKET_NAME, key);
}

export async function getFileByHash(api: APIContext, hash: string) {
  const prisma = await api.getPrismaClient();
  const file = await prisma.file.findFirst({
    where: {
      hash
    }
  });

  return file;
}
