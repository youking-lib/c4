import fs from 'node:fs/promises';
import path from 'node:path';
import { intro, log } from '@clack/prompts';
import { getClient } from './libs/client';

retrieve('IfmAVk');

export async function retrieve(code: string) {
  intro(`Retrieving`);

  const cwd = process.cwd();
  const output = path.join(process.cwd(), '.temp');
  const isExists = await fs.stat(output).catch(() => false);

  if (!isExists) {
    await fs.mkdir(output, { recursive: true });
  }

  const client = getClient();

  const retrieveRes = await client.code.codeDetail(code);

  if (retrieveRes.error) {
    log.error(retrieveRes.error.message!);
    return;
  }

  const { files } = retrieveRes.data.data;

  console.log('files', files);

  for (const file of files) {
    // const fileRes = await client.file.fileDownloadDetail(file.fileId);
  }
}
