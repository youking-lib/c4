import { Command } from 'commander';

import { list } from './list';
import { login } from './login';
import { logout } from './logout';
import { retrieve } from './retrieve';
import { upload } from './upload';
import { revokeCode } from './revoke';
import { whoami } from './whoami';

const vsh = new Command();

vsh.name('vsh').description('Transfer files easily in cyber space').version('0.0.1');

vsh
  .command('upload')
  .argument('<dirs...>')
  .description('Upload files to vsh, eg: vsh upload ./some/file.txt')
  .action(dirs => {
    upload(dirs).catch(console.error);
  });

vsh
  .command('list')
  .description('List codes from vsh, eg: vsh list')
  .option('-p, --page', 'Page number, default is 1')
  .option('-s, --pageSize', 'Page size, default is 10')
  .action((_, options) => {
    list(options?.page, options?.pageSize);
  });

vsh
  .command('revoke')
  .argument('<code>')
  .description('Revoke code, eg: vsh revoke 123456')
  .action(code => {
    revokeCode(code);
  });

vsh
  .command('login')
  .description('Login to vsh, eg: vsh login')
  .action(() => {
    login();
  });

vsh
  .command('logout')
  .description('Logout from vsh, eg: vsh logout')
  .action(() => {
    logout();
  });

vsh
  .command('whoami')
  .description('Who am I, eg: vsh whoami')
  .action(() => {
    whoami();
  });

vsh
  .argument('<code>')
  .option('-o, --output <dir>', 'Output directory, eg: vsh get 123456 --output ./output')
  .action((code, options) => {
    retrieve(code, options.output || process.cwd());
  });

vsh.addHelpText(
  'after',
  `

Example call:
  $ vsh login
  $ vsh 123456 --output ./output
  $ vsh upload ./some/file.txt
  $ vsh list
  $ vsh delete 123456
  $ vsh logout
`
);

vsh.parse();
