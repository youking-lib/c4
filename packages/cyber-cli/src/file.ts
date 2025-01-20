import { z } from 'zod';
import mime from 'mime';
import fs from 'node:fs';
import path from 'node:path';
import { md5 } from 'js-md5';
import archiver from 'archiver';
import { intro, isCancel, log, outro, select, spinner, tasks, text } from '@clack/prompts';
import { getClient, getSession } from './auth';
import { nanoid } from 'nanoid';

upload(['./README.md', './src', './node_modules', './package.json']);

export async function upload(paths: string[]) {
  // const client = getClient();
  // const session = await getSession();
  // const uploadFiles = await client.file.projectFileUploadCheckCreate(session.projectId, {
  //   filename: 'test.txt',
  //   type: 'text/plain',
  //   size: 100,
  //   hash: '1234567890'
  // });

  const output = path.join(process.cwd(), '.temp');
  const isExists = fs.existsSync(output);

  if (!isExists) {
    fs.mkdirSync(output, { recursive: true });
  }

  const uploadPaths: { uploadPath: string; filepath: string }[] = [];

  for (const path of paths) {
    const stats = fs.statSync(path);

    if (stats.isFile()) {
      log.info(` - Move ${path} to temp`);

      const tempPath = prepareFile(output, path);

      uploadPaths.push({
        uploadPath: tempPath,
        filepath: path
      });
    } else if (stats.isDirectory()) {
      log.info(` - Archive ${path}`);

      const tempPath = await prepareDir(output, path);

      uploadPaths.push({
        uploadPath: tempPath,
        filepath: path
      });
    }
  }

  // log.info(`Uploading ${uploadPaths.length} files`);

  const loading = spinner();

  loading.start(`Uploading`);

  for (const path of uploadPaths) {
    loading.message(`Uploading ${path.filepath}`);

    await mockUploadFile(path.uploadPath);
  }

  loading.stop();

  // for (const path of paths) {
  //   // loading.start(`Uploading ${path}`);
  //   // const file = readPathAsFile(path);
  //   const stats = fs.statSync(path);

  //   if (stats.isFile()) {
  //   } else if (stats.isDirectory()) {
  //     log.info(`${path} is a directory`);
  //   } else {
  //     log.error(`${path} is not a file or directory`);
  //   }
  // }
}

export function prepareFile(output: string, filepath: string) {
  const dest = path.join(output, `${nanoid(4)}_${path.basename(filepath)}`);

  fs.copyFileSync(filepath, dest);

  return dest;
}

export async function prepareDir(output: string, dirpath: string) {
  const dest = path.join(output, `${nanoid(4)}_${path.basename(dirpath)}_archive.zip`);

  await archive(dirpath, dest);

  return dest;
}

async function uploadDir(dir: string) {}

async function mockUploadFile(filepath: string) {
  const buffer = fs.readFileSync(filepath, {
    encoding: 'utf8'
  });

  await sleep(1000);

  //   const hash = md5(buffer);
  //   const type = mime.getType(filepath) || path.extname(filepath);

  //   return {
  //     id: '123',
  //     filename: path.basename(filepath),
  //     type,
  //     size: buffer.length,
  //     hash
  //   };
  // }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export async function archive(dir: string, dest: string) {
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.glob('**/*', {
    cwd: dir,
    ignore: ['node_modules']
  });

  archive.pipe(fs.createWriteStream(dest));

  archive.on('finish', () => {
    log.info('Finished');
  });

  await archive.finalize();

  console.log('Archive Finished');

  return dest;
}

// uploadFile('./README.md');

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
