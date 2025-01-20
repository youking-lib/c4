import { cac } from 'cac';

import { login } from './login';
import { upload } from './upload';
import { retrieve } from './retrieve';

const cyber = cac('c4');

cyber.version('0.0.1');
// .option("--global, -g", "An example global flag")
// .option("-c, --config", "Provide path to custom config", "foo.config.js");

cyber
  .command('upload', 'Upload files to Cyber')
  .example('cyber upload ./some/file.txt')
  .example('cyber upload ./some/file.txt ./some/other/file.txt')
  .action(filepaths => {
    // console.log(filepaths);

    upload(filepaths);
  });

cyber
  .command('get', 'Get files from cyber by code')
  .example('cyber get 456123')
  .action(code => {
    // console.log(code);
    retrieve(code);
  });

cyber.command('list', 'List files from cyber').action(() => {
  console.log('list');
});

cyber
  .command('delete', 'Delete files from cyber')
  .alias('del')
  .action(() => {
    console.log('delete');
  });

cyber.command('login', 'Login to Cyber').action(async () => {
  login();
});

cyber.command('logout', 'Logout from Cyber').action(() => {
  console.log('logout');
});

cyber.help();
cyber.parse(process.argv);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
