import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

gen('http://127.0.0.1:8787/api/swagger/doc', path.resolve(__dirname, './src/api'));

export async function gen(url: string, output: string) {
  rmTarget(output);

  await generateApi({
    name: 'index.ts',
    httpClientType: 'axios',
    singleHttpClient: true,
    extractRequestBody: true,
    extractRequestParams: true,
    extractResponseBody: true,
    moduleNameFirstTag: true,
    modular: true,
    output: path.resolve(__dirname, './src/api'),
    url
  });
}

function rmTarget(path: string) {
  if (!fs.existsSync(path)) {
    return;
  }
  fs.rmdirSync(path, { recursive: true });
}
