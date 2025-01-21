import fs from 'node:fs/promises';
import path from 'node:path';
import { intro, log, outro, spinner } from '@clack/prompts';
import { getClient } from './libs/client';

export async function retrieve(code: string) {
  intro(`Retrieving`);

  const client = getClient();
  const retrieveRes = await client.code.codeDetail(code);

  if (retrieveRes.error) {
    log.error(retrieveRes.error.message!);
    return;
  }

  const { files } = retrieveRes.data.data;

  const loading = spinner();

  loading.start('Downloading files');

  for (const file of files) {
    loading.message(`Downloading ${file.name}`);

    await downloadFile(file.id, file.name);
  }

  loading.stop('Downloaded files');

  outro('Retrieved files successfully');
}

async function downloadFile(fileId: string, filename: string) {
  const client = getClient();
  const fileRes = await client.file.fileDownloadCreate({ fileIds: [fileId] });

  if (fileRes.error) {
    log.error(fileRes.error.message!);
    return;
  }

  const downloadUrl = fileRes.data.data.downloads[0].downloadUrl;

  try {
    const response = await fetch(downloadUrl);

    const buffer = await response.arrayBuffer();
    const arrayBuffer = new Uint8Array(buffer);
    const output = path.join(process.cwd(), filename);

    await fs.writeFile(output, arrayBuffer);
  } catch (error) {
    log.error(error);
  }
}
