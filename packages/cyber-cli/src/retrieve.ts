import fs from 'node:fs/promises';
import path from 'node:path';
import { intro, log } from '@clack/prompts';
import { getClient } from './libs/client';

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
  }

  const { files } = retrieveRes.data.data;

  for (const file of files) {
    const fileRes = await client.file.fileDownloadDetail(file.id);

    console.log('fileRes', fileRes);
  }
}
