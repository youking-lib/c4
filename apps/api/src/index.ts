
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono();

app.get('/', (c) => c.text('Hello World'));

export default app;
