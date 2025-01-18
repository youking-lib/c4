import { Auth } from './api/Auth';
import { Code } from './api/Code';
import { File } from './api/File';
import { HttpClient } from './api/http-client';

export * from './api/data-contracts';
export * from './api/http-client';

export type HttpOptions = {
  token: string;
  baseUrl: string;
};

export function createClient({ baseUrl = 'http://127.0.0.1:8787', token = '' }: HttpOptions) {
  const http = new HttpClient({
    baseUrl,
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  const client = {
    setOptions,
    auth: new Auth(http),
    code: new Code(http),
    file: new File(http)
  };

  function setOptions(options: Partial<HttpOptions>) {
    options = {
      baseUrl,
      token,
      ...options
    };

    const http = new HttpClient({
      baseUrl: options.baseUrl,
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${options.token}`
        }
      }
    });

    client.auth.http = http;
    client.code.http = http;
    client.file.http = http;
  }

  return client;
}
