import { z } from 'zod';
import mime from 'mime';
import fs from 'node:fs';
import path from 'node:path';
import { md5 } from 'js-md5';
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
      log.info(`${path} is a directory`);
    } else {
      log.error(`${path} is not a file or directory`);
    }
  }
}

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

uploadFile('./README.md');

export async function uploadFile(filepath: string) {
  const client = getClient();

  const buffer = fs.readFileSync(filepath, {
    encoding: 'utf8'
  });

  const hash = md5(buffer);
  const type = mime.getType(filepath) || path.extname(filepath);

  const file = await client.file.fileUploadCheckCreate({
    filename: path.basename(filepath),
    type,
    size: buffer.length,
    hash: hash
  });

  if (file.error) {
    log.error(file.error.message);
  }

  console.log(file.data);
}

// export function* readPathAsFile(path: string) {
//   const stats = fs.statSync(path);

//   if (stats.isFile()) {
//     return fs.readFileSync(path);
//   }
// }
