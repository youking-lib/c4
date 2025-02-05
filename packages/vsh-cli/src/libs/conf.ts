import Conf from 'conf';
import { parse, stringify } from 'yaml';

export const globalConf = new Conf<{
  baseUrl: string | null;
  authorization: string | null;
}>({
  projectName: 'vsh',
  fileExtension: 'yaml',
  serialize: stringify,
  deserialize: parse
});

export function getBaseUrl() {
  const baseUrl = globalConf.get('baseUrl');

  if (!baseUrl) {
    return 'https://vsh.cc';
  }

  return baseUrl;
}

export function getAuthorization() {
  const authorization = globalConf.get('authorization');
  if (!authorization) {
    return null;
  }
  return authorization;
}

export function setAuthorization(authorization: string) {
  globalConf.set('authorization', authorization);
}

export function deleteAuthorization() {
  globalConf.delete('authorization');
}
