import { Auth } from './api/Auth';
import { Code } from './api/Code';
import { File } from './api/File';
import { HttpClient } from './api/http-client';

export * from './api/data-contracts';
export * from './api/http-client';

export function createClient({
  baseUrl = 'http://127.0.0.1:8787',
  token = ''
}: {
  baseUrl: string;
  token: string;
}) {
  const http = new HttpClient({
    baseUrl,
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  return {
    http,
    auth: new Auth(http),
    code: new Code(http),
    file: new File(http)
  };
}
