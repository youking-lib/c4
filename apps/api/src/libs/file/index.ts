import path from 'node:path';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { S3Client } from '@aws-sdk/client-s3';

import { getPreSignedGetUrl, getPreSignedPutUrl } from '../storage';

export async function getDownloadUrl(
  prisma: PrismaClient,
  client: S3Client,
  bucket: string,
  options: {
    fileIds: string[];
    projectId: string;
  }
) {
  const files = await checkFiles(prisma, {
    fileIds: options.fileIds,
    projectId: options.projectId
  });

  const downloads = await Promise.all(
    files.map(async file => {
      // stats
      await prisma.file.update({
        where: {
          id: file.id
        },
        data: {
          downloads: {
            increment: 1
          },
          lastDownloadedAt: new Date()
        }
      });

      return {
        id: file.id,
        downloadUrl: await getPreSignedGetUrl(client, bucket, file.key)
      };
    })
  );

  return downloads;
}

export async function uploadPreSign(
  client: S3Client,
  bucket: string,
  options: {
    md5: string;
    filename: string;
    projectId: string;
  }
) {
  const key = `files/${options.projectId}/${nanoid()}${path.extname(options.filename)}`;

  console.log(`pre-signed url: ${key}`);

  return {
    key,
    preSignedUrl: await getPreSignedPutUrl(client, {
      bucket,
      key,
      md5: options.md5
    })
  };
}

export async function getFileByHash(prisma: PrismaClient, hash: string) {
  const file = await prisma.file.findFirst({
    where: {
      hash
    }
  });

  return file;
}

export async function checkFiles(
  prisma: PrismaClient,
  options: {
    fileIds: string[];
    projectId: string;
  }
) {
  const files = await prisma.file.findMany({
    where: {
      id: { in: options.fileIds },
      disabled: false,
      projectId: options.projectId
    }
  });

  return files;
}
