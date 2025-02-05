import { createClient } from 'vsh-client';
import { getAuthorization } from './conf';

export function getClient() {
  return createClient({
    baseUrl: 'http://127.0.0.1:8787',
    token: getAuthorization()
  });
}
