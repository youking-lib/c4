import { confirm, log } from '@clack/prompts';
import { getClient } from './libs/client';

export async function revokeCode(codeId: string) {
  const shouldContinue = await confirm({
    message: 'The code will be revoked, and CANNOT RESUME. Are you sure?'
  });

  if (!shouldContinue) {
    return;
  }

  const client = await getClient();
  const response = await client.code.codeDelete(codeId);

  if (response.error) {
    log.error(response.error.message!);
    return;
  }

  log.success('Code revoked successfully');
}
