import mime from 'mime';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { log } from '@clack/prompts';

import { getClient } from './client';

export async function uploadFile(filepath: string, filename: string) {
  const client = getClient();

  const buffer = fs.readFileSync(filepath, {
    encoding: 'base64'
  });

  const hash = crypto.createHash('md5').update(buffer).digest('base64');
  const type = mime.getType(filepath) || path.extname(filepath);

  const check = await client.file.fileUploadCheckCreate({
    type,
    filename,
    size: buffer.length,
    hash
  });

  if (check.error) {
    throw new Error(check.error.message!);
  }

  if (check.data.data.file) {
    return check.data.data.file;
  }

  const result = await fetch(check.data.data.preSignedUrl, {
    method: 'PUT',
    headers: {
      'Content-MD5': hash,
      'Content-Type': type
    },
    body: buffer
  });

  if (!result.ok) {
    throw new Error('Upload failed: ' + result.statusText);
  }

  const file = await client.file.fileUploadCreate({
    key: check.data.data.key,
    filename,
    type,
    size: buffer.length,
    hash: hash
  });

  if (file.error) {
    log.error(file.error.message!);
  }

  return file.data.data;
}
