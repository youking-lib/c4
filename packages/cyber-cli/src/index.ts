import { cac } from 'cac';

import { login } from './login';
import { upload } from './upload';
import { retrieve } from './retrieve';
import { logout } from './logout';

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

cyber.command('list', 'List codes from cyber').action(() => {
  console.log('list');
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

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
