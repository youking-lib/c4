import fs from 'node:fs';
import archiver from 'archiver';

export async function archive(dir: string, dest: string) {
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.glob('**/*', {
    cwd: dir,
    ignore: ['node_modules']
  });

  archive.pipe(fs.createWriteStream(dest));

  await archive.finalize();

  return dest;
}
