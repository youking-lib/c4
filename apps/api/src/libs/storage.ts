import { S3Client } from '@aws-sdk/client-s3';

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
