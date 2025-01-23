import Conf from 'conf';
import { parse, stringify } from 'yaml';

export const globalConf = new Conf({
  projectName: 'vsh',
  fileExtension: 'yaml',
  serialize: stringify,
  deserialize: parse
});

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
