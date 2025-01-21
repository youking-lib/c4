import { cac } from 'cac';

import { list } from './list';
import { login } from './login';
import { logout } from './logout';
import { retrieve } from './retrieve';
import { upload } from './upload';

const cyber = cac('c4');

cyber.version('0.0.1');

cyber
  .command('[code]', 'Get files from cyber by code')
  .option('-o, --output', 'Output directory')
  .example('cyber 456123')
  .action((code, options) => {
    retrieve(code, options.output || process.cwd());
  });

cyber
  .command('upload [...filepaths]', 'Upload files to Cyber')
  .example('cyber upload ./some/file.txt')
  .example('cyber upload ./some/file.txt ./some/other/file.txt')
  .action(filepaths => {
    upload(filepaths);
  });

cyber
  .command('list', 'List codes from cyber')
  .option('-p, --page', 'Page number')
  .option('-s, --pageSize', 'Page size')
  .action((_, options) => {
    list(options?.page || 1, options?.pageSize || 100);
  });

cyber
  .command('delete [code]', 'Delete code from cyber')
  .alias('del')
  .action(() => {
    console.log('delete');
  });

cyber.command('login', 'Login to Cyber').action(async () => {
  login();
});

cyber.command('logout', 'Logout from Cyber').action(() => {
  logout();
});

cyber.help();
cyber.parse(process.argv);
