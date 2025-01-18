import { z } from 'zod';
import fs from 'node:fs';
import archiver from 'archiver';
import { intro, isCancel, log, outro, spinner, text } from '@clack/prompts';
import { getClient, getSession } from './auth';

export async function upload(paths: string[]) {
  // const client = getClient();
  // const session = await getSession();
  // const uploadFiles = await client.file.projectFileUploadCheckCreate(session.projectId, {
  //   filename: 'test.txt',
  //   type: 'text/plain',
  //   size: 100,
  //   hash: '1234567890'
  // });

  const loading = spinner();

  for (const path of paths) {
    loading.start(`Uploading ${path}`);
    // const file = readPathAsFile(path);
    const stats = fs.statSync(path);

    if (stats.isFile()) {
      // const file = fs.readFileSync(path);
      // console.log(file);
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(path);
    } else {
      log.error(`${path} is not a file or directory`);
    }
  }
}

archive('./');

export function archive(dir: string) {
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.glob('**/*', {
    cwd: dir,
    ignore: ['node_modules']
  });

  archive.pipe(fs.createWriteStream('./archive.zip'));
  archive.finalize();
}

export function uploadFile() {}

// export function* readPathAsFile(path: string) {
//   const stats = fs.statSync(path);

//   if (stats.isFile()) {
//     return fs.readFileSync(path);
//   }
// }
