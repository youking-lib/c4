import { outro } from '@clack/prompts';
import { deleteAuthorization } from './libs/conf';

export function logout() {
  deleteAuthorization();

  outro('Logout successful ~');
}
