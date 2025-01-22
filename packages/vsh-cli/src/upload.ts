import fs from 'node:fs/promises';
import path from 'node:path';
import { nanoid } from 'nanoid';
import color from 'picocolors';
import { intro, log, outro, spinner, note } from '@clack/prompts';

import { archive } from './libs/utils';
import { uploadFile } from './libs/s3';
import { getClient } from './libs/client';

export async function upload(paths: string[]) {
  intro(`Upload files to Cyber`);

  const cwd = process.cwd();
  const output = path.join(process.cwd(), '.temp');
  const isExists = await fs.stat(output).catch(() => false);

  if (!isExists) {
    await fs.mkdir(output, { recursive: true });
  }

  const loading = spinner();
  const fileIds: string[] = [];

  loading.start(`Uploading`);

  for (const item of paths) {
    const stats = await fs.stat(item);

    if (stats.isFile()) {
      const filename = path.basename(item);

      loading.message(`Start uploading ${filename}`);

      const tempPath = await prepareFile(output, item);
      const file = await uploadFile(tempPath, filename);

      fileIds.push(file.id);

      loading.message(`Uploaded ${filename}`);
    } else if (stats.isDirectory()) {
      const filename = `${path.basename(item)}_archive.zip`;

      loading.message(`Start uploading ${filename}`);

      const abspath = path.resolve(cwd, item);
      const tempPath = await prepareDir(output, abspath);

      const file = await uploadFile(tempPath, filename);

      fileIds.push(file.id);

      loading.message(`Uploaded ${filename}`);
    }
  }

  loading.stop(`Uploaded ${fileIds.length} files`);

  const client = getClient();

  const codeRes = await client.code.codeCreate({
    fileIds: fileIds.filter(Boolean)
  });

  if (codeRes.error) {
    log.error('Failed to create code');
    return;
  }

  const code = codeRes.data.data.code;

  const retrieveUrl = code.slug
    ? `https://c4.top/${code.slug}?code=${code.code}`
    : `https://c4.top/${code.code}`;

  outro(`Cyber Code: ${color.bgCyan(color.black(code.code))}`);

  intro(`Next step, share it to your friends:`);

  log.step(`1. Open link in your browser: ${retrieveUrl}`);
  log.step(`2. Retrieve it in terminal: \`c4 ${code.code}\``);

  outro(`Congratulations!`);
}

export async function prepareFile(output: string, filepath: string) {
  const dest = path.join(output, `${nanoid(4)}_${path.basename(filepath)}`);

  await fs.copyFile(filepath, dest);

  return dest;
}

export async function prepareDir(output: string, dirpath: string) {
  const dest = path.join(output, `${nanoid(4)}_${path.basename(dirpath)}_archive.zip`);

  await archive(dirpath, dest);

  return dest;
}
