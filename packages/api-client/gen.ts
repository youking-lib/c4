import path from 'node:path';
import { fileURLToPath } from 'url';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

gen('http://127.0.0.1:8787/api/swagger/doc', path.resolve(__dirname, './src/api'));

export async function gen(url: string, output: string) {
  await generateApi({
    name: 'index.ts',
    cleanOutput: true,
    generateResponses: true,
    singleHttpClient: true,
    extractRequestBody: true,
    extractRequestParams: true,
    extractResponseBody: true,
    extractResponseError: true,
    moduleNameFirstTag: true,
    hooks: {
      onInit(configuration) {
        configuration.disableThrowOnError = true;

        return configuration;
      }
    },
    modular: true,
    output: path.resolve(__dirname, './src/api'),
    url
  });
}
