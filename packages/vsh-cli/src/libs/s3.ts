import mime from 'mime';
import fs from 'node:fs';
import path from 'node:path';
import { md5 } from 'js-md5';
import { log } from '@clack/prompts';

import { getClient } from './client';

export async function uploadFile(filepath: string, filename: string) {
  const client = getClient();

  const buffer = fs.readFileSync(filepath, {
    encoding: 'utf8'
  });

  const hash = md5(buffer);
  const type = mime.getType(filepath) || path.extname(filepath);

  const check = await client.file.fileUploadCheckCreate({
    type,
    filename,
    size: buffer.length,
    hash: hash
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
