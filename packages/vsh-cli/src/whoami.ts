import Table from 'cli-table3';
import { spinner, intro, outro, log } from '@clack/prompts';
import { getClient } from './libs/client';
import { getBaseUrl } from './libs/conf';

export async function whoami() {
  intro('Guess who I am?');

  const loading = spinner();
  const client = getClient();

  loading.start('Fetching user information...');

  const user = await client.auth.authMeList().catch(() => {
    loading.stop(`Fetch error`);

    log.error(`Failed to get response from ${getBaseUrl()}, Please check your network connection.`);

    outro('vsh is not available');

    return null;
  });

  if (!user) {
    return;
  }

  if (user.error) {
    loading.stop("I'm not yet acquainted with you. Please run 'vsh login' as a first step.");
    return;
  }

  loading.stop('Fetch user information successful');

  outro(`User: ${user.data.data.email}`);

  const table = new Table({
    head: ['uid', 'email']
  });

  table.push(user.data.data);

  console.log(table.toString());
}
