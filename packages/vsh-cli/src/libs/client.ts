import { createClient } from 'vsh-client';
import { getAuthorization, getBaseUrl } from './conf';

export function getClient() {
  return createClient({
    baseUrl: getBaseUrl(),
    token: getAuthorization() || ''
  });
}
