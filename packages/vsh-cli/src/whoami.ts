import Table from 'cli-table3';
import { log, spinner } from '@clack/prompts';
import { getClient } from './libs/client';

export async function whoami() {
  const loading = spinner();

  loading.start('Fetching user information...');

  const client = getClient();
  const user = await client.auth.authMeList();

  if (user.error) {
    loading.stop("I'm not yet acquainted with you. Please run 'vsh login' as a first step.");
    return;
  }

  loading.stop('Here is your information:');

  const table = new Table({
    head: ['uid', 'email']
  });

  table.push(user.data.data);

  console.log(table.toString());
}
