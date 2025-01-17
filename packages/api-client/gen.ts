import path from 'node:path';
import { fileURLToPath } from 'url';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function gen() {
  await generateApi({
    name: 'index.ts',
    httpClientType: 'axios',
    singleHttpClient: true,
    output: path.resolve(__dirname, 'gen', './node-api'),
    url: 'http://127.0.0.1:3031/api/swagger/doc'
  });
}
