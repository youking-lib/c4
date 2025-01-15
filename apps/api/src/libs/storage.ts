import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export function getS3Client(options: {
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
}) {
  return new S3Client({
    region: 'auto',
    endpoint: options.endpoint,
    credentials: {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey
    }
  });
}

export async function getPreSignedGetUrl(client: S3Client, bucket: string, key: string) {
  const preSignedUrl = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: key
    }),
    { expiresIn: 7200 }
  );
  return preSignedUrl;
}

export async function getPreSignedPutUrl(client: S3Client, bucket: string, key: string) {
  const preSignedUrl = await getSignedUrl(
    client,
    new PutObjectCommand({ Bucket: bucket, Key: key }),
    { expiresIn: 3600 }
  );

  return {
    key,
    preSignedUrl
  };
}
