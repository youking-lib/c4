import { createClient } from '@cyber-express/client';
import { getAuthorization } from './conf';

export function getClient() {
  return createClient({
    baseUrl: 'http://127.0.0.1:8787',
    token: getAuthorization()
  });
}

export async function getSession() {
  const client = getClient();
  const user = await client.auth.authMeList();

  if (user.error) {
    throw new Error('Failed to get session');
  }

  return user.data.data;
}
